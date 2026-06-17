import type { ImageProvider, GenerateImageRequest, GenerateImageResult } from './imageProviderTypes'
import { IMAGE_MODELS } from '../imageProviderConfig'

const SIZE_MAP: Record<string, string> = {
  '16:9': '1536x1024',
  '4:3': '1024x1024',
  '1:1': '1024x1024',
  '3:2': '1536x1024',
}

async function base64FromUrl(url: string): Promise<{ b64: string; mime: string }> {
  // gpt-image-1 returns data URIs — parse directly without fetching
  if (url.startsWith('data:')) {
    const [header, b64] = url.split(',')
    const mime = header.replace('data:', '').replace(';base64', '')
    return { b64, mime }
  }
  const res = await fetch(url)
  const buffer = await res.arrayBuffer()
  const mime = res.headers.get('content-type') ?? 'image/png'
  const b64 = Buffer.from(buffer).toString('base64')
  return { b64, mime }
}

export function createOpenAIImageProvider(apiKey: string, modelOverride?: string): ImageProvider {
  const model = modelOverride ?? IMAGE_MODELS.openai.defaultModel

  return {
    name: 'openai',
    model,
    async generate(req: GenerateImageRequest): Promise<GenerateImageResult> {
      const size = SIZE_MAP[req.aspectRatio ?? '16:9'] ?? '1024x1024'
      const now = new Date().toISOString()
      const quality = req.quality ?? 'medium'

      let response: Response

      if (req.referenceImageUrl) {
        // Use images.edit to chain from a reference image (floor plan consistency)
        try {
          const { b64, mime } = await base64FromUrl(req.referenceImageUrl)
          console.log(`[openai] images.edit [${req.sectionName}] ref mime=${mime} b64len=${b64.length}`)
          const imageBuffer = Buffer.from(b64, 'base64')
          const blob = new Blob([imageBuffer], { type: mime })

          const form = new FormData()
          form.append('model', model)
          form.append('prompt', req.prompt)
          form.append('image[]', blob, 'reference.png')
          form.append('n', '1')
          form.append('size', size)
          form.append('quality', quality)
          form.append('output_format', 'png')

          response = await fetch('https://api.openai.com/v1/images/edits', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            body: form,
          })
        } catch (editErr) {
          console.error(`[openai] images.edit THREW before fetch [${req.sectionName}]:`, editErr)
          throw editErr
        }
      } else {
        // Standard generation
        response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ model, prompt: req.prompt, n: 1, size, quality, output_format: 'png' }),
        })
      }

      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { error?: { message?: string } }
        const msg = err.error?.message ?? `OpenAI image error ${response.status}`
        console.error(`[openai] ${req.referenceImageUrl ? 'images.edit' : 'images.generate'} FAILED [${req.sectionName}]:`, msg)
        throw new Error(msg)
      }

      const result = await response.json() as {
        data: Array<{ url?: string; b64_json?: string }>
      }

      const item = result.data?.[0]
      const imageUrl = item?.url ?? (item?.b64_json ? `data:image/png;base64,${item.b64_json}` : null)

      return {
        imageUrl,
        provider: 'openai',
        model,
        prompt: req.prompt,
        alt: req.sectionName ?? 'Estate rendering',
        status: imageUrl ? 'generated' : 'failed',
        sectionName: req.sectionName,
        formId: req.formId,
        createdAt: now,
      }
    },
  }
}
