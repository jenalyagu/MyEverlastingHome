import type { ImageProvider, GenerateImageRequest, GenerateImageResult } from './imageProviderTypes'
import { IMAGE_MODELS } from '../imageProviderConfig'

export function createGeminiImageProvider(apiKey: string, modelOverride?: string): ImageProvider {
  const model = modelOverride ?? IMAGE_MODELS.gemini.defaultModel

  return {
    name: 'gemini',
    model,
    async generate(req: GenerateImageRequest): Promise<GenerateImageResult> {
      const now = new Date().toISOString()

      const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
        { text: req.prompt },
      ]

      // Support reference image input when provided as base64
      if (req.referenceImageUrl?.startsWith('data:image/')) {
        const [header, data] = req.referenceImageUrl.split(',')
        const mimeType = header.replace('data:', '').replace(';base64', '')
        parts.unshift({ inlineData: { mimeType, data } })
      }

      const body = {
        contents: [{ parts }],
        generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({})) as { error?: { message?: string } }
        throw new Error(err.error?.message ?? `Gemini image error ${response.status}`)
      }

      const result = await response.json() as {
        candidates?: Array<{
          content?: {
            parts?: Array<{
              inlineData?: { mimeType: string; data: string }
              text?: string
            }>
          }
        }>
      }

      const candidate = result.candidates?.[0]?.content?.parts ?? []
      const imagePart = candidate.find(p => p.inlineData?.mimeType?.startsWith('image/'))
      const imageUrl = imagePart?.inlineData
        ? `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
        : null

      return {
        imageUrl,
        provider: 'gemini',
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
