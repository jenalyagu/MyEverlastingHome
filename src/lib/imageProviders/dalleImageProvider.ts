import type { ImageProvider, GenerateImageRequest, GenerateImageResult } from './imageProviderTypes'
import { IMAGE_MODELS } from '../imageProviderConfig'

export function createDalleImageProvider(apiKey: string, modelOverride?: string): ImageProvider {
  const model = modelOverride ?? IMAGE_MODELS.dalle.defaultModel

  return {
    name: 'dalle',
    model,
    async generate(req: GenerateImageRequest): Promise<GenerateImageResult> {
      const now = new Date().toISOString()

      // DALL-E 3 supports specific sizes only
      const size = req.aspectRatio === '1:1' ? '1024x1024' : '1792x1024'

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          prompt: req.prompt,
          n: 1,
          size,
          quality: 'hd',
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { error?: { message?: string } }
        throw new Error(err.error?.message ?? `DALL-E error ${response.status}`)
      }

      const result = await response.json() as { data: Array<{ url: string }> }
      const imageUrl = result.data?.[0]?.url ?? null

      return {
        imageUrl,
        provider: 'dalle',
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
