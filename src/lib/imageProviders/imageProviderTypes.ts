export type ProviderName = 'openai' | 'gemini' | 'dalle'
export type ImageStatus = 'generated' | 'failed' | 'placeholder'

export interface GenerateImageRequest {
  prompt: string
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2'
  quality?: 'low' | 'medium' | 'high'
  stylePreset?: string
  referenceImageUrl?: string
  outputType?: 'url' | 'base64'
  sectionName?: string
  formId?: string
}

export interface GenerateImageResult {
  imageUrl: string | null
  provider: ProviderName
  model: string
  prompt: string
  alt: string
  status: ImageStatus
  sectionName?: string
  formId?: string
  createdAt: string
}

export interface ImageProvider {
  name: ProviderName
  model: string
  generate(req: GenerateImageRequest): Promise<GenerateImageResult>
}
