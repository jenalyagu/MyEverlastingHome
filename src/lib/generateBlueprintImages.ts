import type { ProviderName, GenerateImageResult } from './imageProviders/imageProviderTypes'
import type { EstateBlueprintData } from './generateEstateBlueprint'

export interface BlueprintImageBatch {
  hero: GenerateImageResult | null
  mainFloor: GenerateImageResult | null
  upperFloor: GenerateImageResult | null
  wellnessLevel: GenerateImageResult | null
  sitePlan: GenerateImageResult | null
  interiorTiles: Array<GenerateImageResult | null>
  estateLifestyleTiles: Array<GenerateImageResult | null>
}

async function generateImage(
  prompt: string,
  sectionName: string,
  aspectRatio: '16:9' | '3:2' | '1:1',
  quality: 'low' | 'medium' | 'high',
  provider?: ProviderName,
  formId?: string,
  referenceImageUrl?: string,
): Promise<GenerateImageResult> {
  const response = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, aspectRatio, quality, sectionName, provider, formId, referenceImageUrl }),
  })
  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: 'Unknown error' })) as { error?: string }
    throw new Error(err.error ?? `Image generation failed (${response.status})`)
  }
  return response.json() as Promise<GenerateImageResult>
}

function safe(p: Promise<GenerateImageResult>): Promise<GenerateImageResult | null> {
  return p.catch(() => null)
}

export async function generateAllBlueprintImages(
  blueprintData: EstateBlueprintData,
  provider?: ProviderName,
  formId?: string,
  onProgress?: (completed: number, total: number, section: string) => void,
): Promise<BlueprintImageBatch> {
  const { interiorLifestyleTiles, estateLifestyleTiles } = blueprintData
  const tileJobs = [
    ...interiorLifestyleTiles.map(t => ({ prompt: t.prompt, section: 'interiorLifestyleTile', ratio: '3:2' as const, quality: 'medium' as const })),
    ...estateLifestyleTiles.map(t => ({ prompt: t.prompt, section: 'estateLifestyleTile',   ratio: '3:2' as const, quality: 'medium' as const })),
  ]

  // Total = hero + main floor + 3 chained floor plans + tiles
  const total = 1 + 1 + 3 + tileJobs.length
  let completed = 0

  const track = (p: Promise<GenerateImageResult | null>, section: string) =>
    p.then(r => { onProgress?.(++completed, total, section); return r })

  // Stage 1 — hero and main floor in parallel (main floor is the reference anchor)
  const [hero, mainFloor] = await Promise.all([
    track(safe(generateImage(blueprintData.heroImagePrompt,      'heroEstateExterior',   '16:9', 'high',   provider, formId)), 'heroEstateExterior'),
    track(safe(generateImage(blueprintData.mainFloorImagePrompt, 'mainFloorConceptPlan', '1:1',  'medium', provider, formId)), 'mainFloorConceptPlan'),
  ])

  // Stage 2 — upper floor, wellness level, site plan all reference the main floor image
  // Falls back to standalone generation if main floor failed
  const mainFloorRef = mainFloor?.imageUrl ?? undefined

  const [upperFloor, wellnessLevel, sitePlan, ...tileResults] = await Promise.all([
    track(safe(generateImage(blueprintData.upperFloorImagePrompt,    'upperFloorConceptPlan',    '1:1', 'medium', provider, formId, mainFloorRef)), 'upperFloorConceptPlan'),
    track(safe(generateImage(blueprintData.wellnessLevelImagePrompt, 'wellnessLevelConceptPlan', '1:1', 'medium', provider, formId, mainFloorRef)), 'wellnessLevelConceptPlan'),
    track(safe(generateImage(blueprintData.sitePlanImagePrompt,      'estateSitePlan',           '1:1', 'medium', provider, formId, mainFloorRef)), 'estateSitePlan'),
    ...tileJobs.map(j =>
      track(safe(generateImage(j.prompt, j.section, j.ratio, j.quality, provider, formId)), j.section)
    ),
  ])

  const interiorCount = interiorLifestyleTiles.length

  return {
    hero,
    mainFloor,
    upperFloor,
    wellnessLevel,
    sitePlan,
    interiorTiles: tileResults.slice(0, interiorCount),
    estateLifestyleTiles: tileResults.slice(interiorCount),
  }
}
