import { type BoardConfig, type ConceptBoard, type PresentationBoard, type Material, type Benefit, type BoardImageSlot, type BoardPlanSlot } from './boardTypes'

function configToApiPayload(config: BoardConfig) {
  return {
    aestheticStyle: config.aestheticStyle,
    climate: config.climate,
    lifestylePriorities: config.lifestyleVibe ? config.lifestyleVibe.split(', ') : [],
    squareFootage: '4,500–6,000 sf',
    familySize: '4 people',
    terrain: 'Level',
    views: 'Natural',
    poolSpa: config.outdoorFocus?.toLowerCase().includes('pool') ?? false,
    outdoorKitchen: config.outdoorFocus?.toLowerCase().includes('kitchen') ?? false,
    fireLounge: config.outdoorFocus?.toLowerCase().includes('fire') ?? false,
    orchard: config.outdoorFocus?.toLowerCase().includes('orchard') ?? false,
    reflectingPond: config.outdoorFocus?.toLowerCase().includes('pond') ?? false,
    wellnessSuite: config.lifestyleVibe?.toLowerCase().includes('wellness') ?? false,
    chefKitchen: config.keySpaces?.includes("Chef's kitchen") ?? false,
    _boardMoodWords: config.moodWords,
    _boardKeySpaces: config.keySpaces,
    _boardColorDirection: config.colorDirection,
  }
}

function makeImageSlot(id: string, label: string, caption: string, imageUrl?: string | null): BoardImageSlot {
  return {
    id,
    label,
    prompt: `${label} — ${caption}`,
    caption,
    imageUrl: imageUrl ?? undefined,
  }
}

function makePlanSlot(id: string, label: string, description: string): BoardPlanSlot {
  return { id, label, description }
}

function deriveBenefits(board: ConceptBoard, config: BoardConfig): Benefit[] {
  const benefits: Benefit[] = [
    {
      id: 'thermal',
      icon: '◈',
      title: 'Thermal Comfort',
      description: 'SCIP construction delivers superior thermal mass for consistent interior temperatures year-round.',
    },
    {
      id: 'acoustic',
      icon: '◉',
      title: 'Acoustic Privacy',
      description: 'Thick insulated panel walls create a quiet, protected interior environment.',
    },
    {
      id: 'resilience',
      icon: '◆',
      title: 'Structural Resilience',
      description: 'Engineered to exceed standard load and seismic requirements for lasting durability.',
    },
    {
      id: 'speed',
      icon: '◇',
      title: 'Faster Enclosure',
      description: 'Panel system compresses time to weather-tight compared to traditional framing.',
    },
  ]

  if (config.lifestyleVibe?.toLowerCase().includes('wellness')) {
    benefits.push({
      id: 'wellness',
      icon: '○',
      title: 'Wellness by Design',
      description: board.signatureDetails[0] ?? 'Intentional spaces support physical and mental wellbeing.',
    })
  }

  if (config.outdoorFocus) {
    benefits.push({
      id: 'outdoor',
      icon: '◎',
      title: 'Indoor–Outdoor Living',
      description: `${config.outdoorFocus} seamlessly integrated into the estate program.`,
    })
  }

  return benefits.slice(0, 5)
}

function toPresentationBoard(board: ConceptBoard, config: BoardConfig): PresentationBoard {
  const aesthetic = config.aestheticStyle || board.moodWords[0] || 'Estate'
  const projectName = `${aesthetic} Residence`

  const keySpaceSlots: BoardImageSlot[] = board.keySpaces.map((s, i) =>
    makeImageSlot(`space-${i}`, s.name, s.vignette, s.photo)
  )

  const lifestyleSlots: BoardImageSlot[] = (board.lifestylePhotos ?? []).map((url, i) =>
    makeImageSlot(`lifestyle-${i}`, `The ${board.moodWords[0] ?? 'Estate'} Lifestyle`, 'Curated living moment', url)
  )

  const materials: Material[] = board.materialPalette.map((m) => ({
    name: m.name,
    hex: m.hex,
    usage: m.usage,
  }))

  const styleTagline: Record<string, string> = {
    'Modern Organic': 'Where organic form meets considered living',
    'Traditional / Classic': 'Timeless architecture, enduring legacy',
    'Mediterranean / Spanish': 'Sun-warmed walls, generations of story',
    'Farmhouse / Agrarian': 'Rooted in land, built for family',
    'Minimalist / Contemporary': 'Precision living, quietly monumental',
  }

  const tagline = styleTagline[config.aestheticStyle] ?? board.moodWords.join(' · ')
  const benefits = deriveBenefits(board, config)

  return {
    id: `board-${Date.now()}`,
    projectName,
    boardType: 'Concept Presentation',
    aesthetic,
    // Copy fields
    title: projectName,
    subtitle: tagline,
    projectNarrative: board.aestheticVision,
    designPhilosophy: board.architecturalCharacter,
    spaceCaptions: board.keySpaces.map((s) => s.vignette),
    lifestyleCaptions: (board.lifestylePhotos ?? []).map(
      (_, i) => board.signatureDetails[i] ?? `${board.moodWords[0] ?? aesthetic} living, curated`
    ),
    scipBenefitText: benefits.map((b) => b.description),
    footerTagline: tagline,
    disclaimer: 'Concept tool only. Not licensed architectural or engineering documentation. All final plans require licensed professionals and local building permits.',
    // Media sections
    heroExterior: makeImageSlot('hero', 'Estate Exterior', board.architecturalCharacter, board.heroPhoto),
    floorPlanComposite: makePlanSlot('floor-plan', 'Floor Plan Composite', 'Integrated main level — great room, kitchen, primary suite wing, and secondary bedrooms'),
    sitePlan: makePlanSlot('site-plan', 'Site Plan', `${config.outdoorFocus || 'Landscape & outdoor zones'}, motor court, property boundaries`),
    keySpacePhotos: keySpaceSlots,
    lifestylePhotos: lifestyleSlots,
    materialPalette: materials,
    scipBenefitsBand: benefits,
    footer: {
      monogram: aesthetic.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 3),
      quote: board.lightAndMood,
    },
  }
}

export async function generateBoard(config: BoardConfig): Promise<PresentationBoard> {
  const payload = configToApiPayload(config)
  const res = await fetch('/api/concept-board', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error((err as { error: string }).error || 'Generation failed')
  }
  const raw = await res.json() as ConceptBoard
  return toPresentationBoard(raw, config)
}

export async function generateRender(config: BoardConfig): Promise<string> {
  const payload = configToApiPayload(config)
  const res = await fetch('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' }))
    throw new Error((err as { error: string }).error || 'Render failed')
  }
  const data = await res.json() as { url: string }
  return data.url
}
