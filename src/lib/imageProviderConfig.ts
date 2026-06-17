import type { ProviderName } from './imageProviders/imageProviderTypes'

export const IMAGE_MODELS = {
  openai: {
    defaultModel: 'gpt-image-1',
    label: 'OpenAI GPT Image',
    description: 'Best quality for luxury estate renderings and presentation boards',
  },
  gemini: {
    defaultModel: 'gemini-2.5-flash-image',
    label: 'Google Nano Banana',
    description: 'Fast variations, prompt iteration, and conversational image edits',
  },
  dalle: {
    defaultModel: 'dall-e-3',
    label: 'DALL·E Legacy',
    description: 'Proven fallback for standard estate and lifestyle imagery',
  },
} as const satisfies Record<ProviderName, { defaultModel: string; label: string; description: string }>

export const DEFAULT_PROVIDER: ProviderName = 'openai'

export const BLUEPRINT_IMAGE_SECTIONS = [
  'heroEstateExterior',
  'mainFloorConceptPlan',
  'upperFloorConceptPlan',
  'wellnessLevelConceptPlan',
  'estateSitePlan',
  'interiorLifestyleTile',
  'estateLifestyleTile',
] as const

export type BlueprintImageSection = typeof BLUEPRINT_IMAGE_SECTIONS[number]
