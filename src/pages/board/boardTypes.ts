export interface BoardConfig {
  aestheticStyle: string
  climate: string
  moodWords: string[]
  keySpaces: string[]
  colorDirection: 'warm' | 'cool' | 'neutral' | 'contrast' | ''
  outdoorFocus: string
  lifestyleVibe: string
  promptPackId?: string
}

export interface PromptPack {
  id: string
  name: string
  tagline: string
  swatches: string[]
  config: Partial<BoardConfig>
}

export interface ConceptBoard {
  aestheticVision: string
  architecturalCharacter: string
  materialPalette: Array<{ name: string; hex: string; usage: string }>
  keySpaces: Array<{ name: string; vignette: string; photo?: string | null }>
  outdoorEthos: string
  lightAndMood: string
  signatureDetails: string[]
  moodWords: string[]
  heroPhoto?: string | null
  lifestylePhotos?: Array<string | null>
}

export interface BoardImageSlot {
  id: string
  label: string
  prompt: string
  caption: string
  imageUrl?: string
}

export interface BoardPlanSlot {
  id: string
  label: string
  description: string
  imageUrl?: string
}

export interface Material {
  name: string
  hex: string
  usage: string
  texture?: string
}

export interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}

export interface PresentationBoard {
  id: string
  projectName: string
  boardType: string
  aesthetic: string
  // Copy fields
  title: string
  subtitle: string
  projectNarrative: string
  designPhilosophy: string
  spaceCaptions: string[]
  lifestyleCaptions: string[]
  scipBenefitText: string[]
  footerTagline: string
  disclaimer: string
  // Media sections
  heroExterior: BoardImageSlot
  floorPlanComposite: BoardPlanSlot
  sitePlan: BoardPlanSlot
  keySpacePhotos: BoardImageSlot[]
  lifestylePhotos: BoardImageSlot[]
  materialPalette: Material[]
  scipBenefitsBand: Benefit[]
  footer: {
    monogram: string
    quote: string
  }
}

export const PROMPT_PACKS: PromptPack[] = [
  {
    id: 'desert-sanctuary',
    name: 'Desert Sanctuary',
    tagline: 'Rammed earth, endless sky, deep silence',
    swatches: ['#C4A882', '#8B7355', '#D4C4A8', '#3D3530', '#E8DDD0'],
    config: {
      aestheticStyle: 'Minimalist / Contemporary',
      climate: 'Hot & dry / Desert',
      moodWords: ['Serene', 'Grounded', 'Raw', 'Still'],
      colorDirection: 'warm',
      outdoorFocus: 'Shaded terraces, fire pit, drought-tolerant landscaping',
      lifestyleVibe: 'Slow living, privacy, wellness',
    },
  },
  {
    id: 'coastal-modern',
    name: 'Coastal Modern',
    tagline: 'Light, salt air, and open horizons',
    swatches: ['#B8C9D4', '#7A9DAD', '#E8EEF0', '#2C4A5C', '#F2F6F8'],
    config: {
      aestheticStyle: 'Modern Organic',
      climate: 'Mild / Coastal',
      moodWords: ['Airy', 'Luminous', 'Calm', 'Open'],
      colorDirection: 'cool',
      outdoorFocus: 'Pool, outdoor dining, coastal garden',
      lifestyleVibe: 'Entertaining, luxury, wellness',
    },
  },
  {
    id: 'mountain-lodge',
    name: 'Mountain Lodge',
    tagline: 'Timber, stone, and firelit evenings',
    swatches: ['#6B5A4A', '#3D3028', '#A8967A', '#8B7355', '#C4B8A8'],
    config: {
      aestheticStyle: 'Traditional / Classic',
      climate: 'Cold / Northern',
      moodWords: ['Warm', 'Rooted', 'Rugged', 'Cozy'],
      colorDirection: 'warm',
      outdoorFocus: 'Hot tub, fire lounge, woodland trails',
      lifestyleVibe: 'Slow living, privacy, food & gardening',
    },
  },
  {
    id: 'mediterranean-garden',
    name: 'Mediterranean Garden',
    tagline: 'Terracotta walls, lemon groves, golden hour',
    swatches: ['#C9784A', '#E8B87A', '#7A8C5C', '#A0785A', '#F2E0C8'],
    config: {
      aestheticStyle: 'Mediterranean / Spanish',
      climate: 'Hot & dry / Desert',
      moodWords: ['Romantic', 'Sun-drenched', 'Lush', 'Timeless'],
      colorDirection: 'warm',
      outdoorFocus: 'Reflecting pool, fruit orchard, courtyard dining',
      lifestyleVibe: 'Entertaining, food & gardening, slow living',
    },
  },
  {
    id: 'modern-farmhouse',
    name: 'Modern Farmhouse',
    tagline: 'Clean lines, honest materials, land connection',
    swatches: ['#F2F0EC', '#2C2C2C', '#A8A09A', '#6B8C5A', '#C4BDB5'],
    config: {
      aestheticStyle: 'Farmhouse / Agrarian',
      climate: 'Mixed / Four seasons',
      moodWords: ['Clean', 'Honest', 'Rooted', 'Bright'],
      colorDirection: 'neutral',
      outdoorFocus: 'Kitchen garden, raised beds, open pasture',
      lifestyleVibe: 'Food & gardening, homeschooling, slow living',
    },
  },
  {
    id: 'tropical-retreat',
    name: 'Tropical Retreat',
    tagline: 'Lush canopy, infinity water, indoor-outdoor flow',
    swatches: ['#3D5A48', '#7AAD8A', '#C4A85C', '#2C3D30', '#E8D4A8'],
    config: {
      aestheticStyle: 'Modern Organic',
      climate: 'Hot & humid',
      moodWords: ['Lush', 'Immersive', 'Exotic', 'Alive'],
      colorDirection: 'contrast',
      outdoorFocus: 'Infinity pool, tropical planting, outdoor spa',
      lifestyleVibe: 'Wellness, luxury, travel home base',
    },
  },
]

export const MOOD_WORD_OPTIONS = [
  'Serene', 'Bold', 'Warm', 'Cool', 'Airy', 'Grounded', 'Dramatic',
  'Romantic', 'Minimal', 'Lush', 'Rustic', 'Refined', 'Raw', 'Timeless',
  'Bright', 'Moody', 'Open', 'Intimate', 'Rooted', 'Elevated',
]

export const KEY_SPACE_OPTIONS = [
  'Primary suite', 'Great room', "Chef's kitchen", 'Wine cellar',
  'Home office', 'Wellness suite', 'Library', 'Outdoor dining terrace',
  'Pool pavilion', 'Guest casita', 'Homeschool atelier', 'Garage / motor court',
]

export const OUTDOOR_FOCUS_OPTIONS = [
  'Pool & spa', 'Kitchen garden', 'Fire lounge', 'Orchard',
  'Sport court', 'Reflecting pond', 'Outdoor kitchen', 'Woodland trails',
]

export const LIFESTYLE_VIBE_OPTIONS = [
  'Slow living', 'Entertaining', 'Wellness', 'Food & gardening',
  'Privacy', 'Luxury', 'Family-centered', 'Work from home',
]

export const defaultBoardConfig: BoardConfig = {
  aestheticStyle: '',
  climate: '',
  moodWords: [],
  keySpaces: [],
  colorDirection: '',
  outdoorFocus: '',
  lifestyleVibe: '',
}
