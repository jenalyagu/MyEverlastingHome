import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react'
import { type EstateFormData } from '../lib/blueprintGenerator'

// ─── Types ───────────────────────────────────────────────────────────────────

type Tier = 'cottage' | 'signature' | 'executive' | 'legacy'
type PlanClimate = 'hot-dry' | 'cold-mountain' | 'coastal' | 'four-season' | 'tropical' | 'performance'
type LifestyleId = 'cars' | 'wellness' | 'entertaining' | 'nature' | 'work' | 'heritage' | 'privacy' | 'adventure'

interface BlueprintPlan {
  style: string
  name: string
  sqft: string
  tagline: string
  imagePath: string
  climate: PlanClimate
  lifestyle: LifestyleId[]
}

interface QuizAnswers {
  familySize: string
  children: string
  multigenerational: boolean
  lifestylePriorities: LifestyleId[]
  climate: PlanClimate | ''
  tier: Tier | null
}

// ─── Data ────────────────────────────────────────────────────────────────────

const LIFESTYLE_OPTIONS: { id: LifestyleId; label: string; icon: string; description: string }[] = [
  { id: 'cars',         label: 'Cars & Performance',      icon: '🏎',  description: 'Your garage is as important as your kitchen' },
  { id: 'wellness',     label: 'Wellness & Retreat',       icon: '🧘',  description: 'Sauna, cold plunge, stillness by design' },
  { id: 'entertaining', label: 'Entertaining & Gathering', icon: '🥂',  description: 'Your home is where people want to be' },
  { id: 'nature',       label: 'Land & Nature',            icon: '🌿',  description: 'Orchards, open sky, room to roam' },
  { id: 'work',         label: 'Work & Creation',          icon: '🎙',  description: 'Studio, office, maker space — built in' },
  { id: 'heritage',     label: 'Heritage & Craft',         icon: '🏛',  description: 'Timeless materials, traditional proportions' },
  { id: 'privacy',      label: 'Privacy & Security',       icon: '🔒',  description: 'Gated, quiet, away from everything' },
  { id: 'adventure',    label: 'Adventure & Self-Reliance', icon: '🏕',  description: 'Off-grid capable, rugged, built for anything' },
]

const FAMILY_SIZES = ['Just us (1–2)', 'Small family (3–4)', 'Growing family (5–6)', 'Large household (7+)']
const CHILDREN_OPTIONS = ['Yes', 'Not yet', 'No']

const TIERS: { id: Tier; label: string; sublabel: string; lot: string }[] = [
  { id: 'cottage',   label: 'Cottage Series',   sublabel: '1,200–1,800 sq ft', lot: 'Standard lot' },
  { id: 'signature', label: 'Signature Series', sublabel: '1,800–3,000 sq ft', lot: '< 1 acre' },
  { id: 'executive', label: 'Executive Series', sublabel: '3,000–4,500 sq ft', lot: '1–3 acres' },
  { id: 'legacy',    label: 'Legacy Series',    sublabel: '4,500–8,000+ sq ft', lot: '3+ acres' },
]

const CLIMATES: { id: PlanClimate; label: string; note: string }[] = [
  { id: 'coastal',       label: 'Coastal',       note: 'Salt air · Wind · Flood' },
  { id: 'four-season',   label: 'Four Seasons',  note: 'Tornadoes · Ice · Snow' },
  { id: 'hot-dry',       label: 'Hot & Dry',     note: 'Extreme Heat · Wildfire' },
  { id: 'tropical',      label: 'Tropical',      note: 'Hurricanes · Mold · Typhoons' },
  { id: 'cold-mountain', label: 'Mountain',      note: 'Snow Load · Freeze-Thaw' },
  { id: 'performance',   label: 'Anywhere',      note: 'Any climate · Maximum resilience' },
]

const ALL_PLANS: BlueprintPlan[] = [
  // Cottage
  { style: 'Banyan 1600',           name: 'Banyan 1600',           sqft: '1,600 sq ft', climate: 'tropical',      lifestyle: ['nature','heritage'],      tagline: 'Multigenerational warmth, deep verandas, communal living at cottage scale',    imagePath: '/EstateAesthetics/CottageTier/Banyan1600.webp' },
  { style: 'Canyon 1500',           name: 'Canyon 1500',           sqft: '1,500 sq ft', climate: 'hot-dry',       lifestyle: ['nature','privacy'],       tagline: 'Southwestern palette, desert canyon character, compact and efficient',         imagePath: '/EstateAesthetics/CottageTier/Canyon1500.webp' },
  { style: 'Cedar 1800',            name: 'Cedar 1800',            sqft: '1,800 sq ft', climate: 'coastal',       lifestyle: ['nature','wellness'],      tagline: 'Warm cedar tones, natural materials, Pacific Northwest character',             imagePath: '/EstateAesthetics/CottageTier/Cedar1800.webp' },
  { style: 'Coastal 1600',          name: 'Coastal 1600',          sqft: '1,600 sq ft', climate: 'coastal',       lifestyle: ['wellness','nature'],      tagline: 'Salt-air resilient, board-and-batten, Pacific coastal character',              imagePath: '/EstateAesthetics/CottageTier/Coastal1600.webp' },
  { style: 'Hearth 1800',           name: 'Hearth 1800',           sqft: '1,800 sq ft', climate: 'four-season',   lifestyle: ['heritage','entertaining'], tagline: 'Farmhouse warmth, fireplace-centered, built for four seasons',                 imagePath: '/EstateAesthetics/CottageTier/Hearth1800.webp' },
  { style: 'Magnolia 1800 Cottage', name: 'Magnolia 1800',         sqft: '1,800 sq ft', climate: 'four-season',   lifestyle: ['heritage','entertaining'], tagline: 'Southern grace, shaded porches, traditional proportions',                     imagePath: '/EstateAesthetics/CottageTier/Magnolia1800.webp' },
  { style: 'Oakmont 1800 Cottage',  name: 'Oakmont 1800',          sqft: '1,800 sq ft', climate: 'four-season',   lifestyle: ['heritage','nature'],      tagline: 'Classic English character, oak millwork, timeless cottage proportions',        imagePath: '/EstateAesthetics/CottageTier/Oakmont1800.webp' },
  { style: 'Prairie 1600',          name: 'Prairie 1600',          sqft: '1,600 sq ft', climate: 'four-season',   lifestyle: ['nature','heritage'],      tagline: 'Prairie horizontal lines, open land character, farmhouse spirit',              imagePath: '/EstateAesthetics/CottageTier/Prairie1600.webp' },
  { style: 'Summit 1800',           name: 'Summit 1800',           sqft: '1,800 sq ft', climate: 'cold-mountain', lifestyle: ['adventure','nature'],     tagline: 'Alpine character, rugged materials, mountain-ready construction',              imagePath: '/EstateAesthetics/CottageTier/Summit1800.webp' },
  { style: 'Velocity 1500',         name: 'Velocity 1500',         sqft: '1,500 sq ft', climate: 'performance',   lifestyle: ['cars','work'],            tagline: 'Sleek and fast-lined, high-performance minimalism at entry footprint',         imagePath: '/EstateAesthetics/CottageTier/Velocity1500.webp' },
  // Signature
  { style: 'Aspen 2800',            name: 'Aspen 2800',            sqft: '2,800 sq ft', climate: 'cold-mountain', lifestyle: ['nature','wellness'],      tagline: 'Mountain modern, aspen grove setting, warm timber and stone',                  imagePath: '/EstateAesthetics/Signature:ResidenceTier/Aspen2800.webp' },
  { style: 'Banyan 2600',           name: 'Banyan 2600',           sqft: '2,600 sq ft', climate: 'tropical',      lifestyle: ['nature','heritage'],      tagline: 'Deep verandas, native hardwoods, multigenerational warmth at family scale',    imagePath: '/EstateAesthetics/Signature:ResidenceTier/Banyan2600.webp' },
  { style: 'California 2000',       name: 'California 2000',       sqft: '2,000 sq ft', climate: 'coastal',       lifestyle: ['wellness','entertaining'], tagline: 'Indoor-outdoor flow, warm oak, open-plan California modern character',         imagePath: '/EstateAesthetics/Signature:ResidenceTier/California2000.webp' },
  { style: 'Canyon 2100',           name: 'Canyon 2100',           sqft: '2,100 sq ft', climate: 'hot-dry',       lifestyle: ['nature','privacy'],       tagline: 'Southwestern character, desert palette, rammed earth and concrete',            imagePath: '/EstateAesthetics/Signature:ResidenceTier/Canyon2100.webp' },
  { style: 'Coastal 2000',          name: 'Coastal 2000',          sqft: '2,000 sq ft', climate: 'coastal',       lifestyle: ['wellness','nature'],      tagline: 'Coastal modern, clean lines, salt-air resilient construction',                 imagePath: '/EstateAesthetics/Signature:ResidenceTier/Coastal2000.webp' },
  { style: 'Harbor 1900',           name: 'Harbor 1900',           sqft: '1,900 sq ft', climate: 'coastal',       lifestyle: ['nature','entertaining'],  tagline: 'Coastal shingle, deep eaves, built for salt air and working harbor views',     imagePath: '/EstateAesthetics/Signature:ResidenceTier/Harbor1900.webp' },
  { style: 'Heritage 2300',         name: 'Heritage 2300',         sqft: '2,300 sq ft', climate: 'four-season',   lifestyle: ['heritage','privacy'],     tagline: 'American heritage proportions, brick and stone, built to be handed down',      imagePath: '/EstateAesthetics/Signature:ResidenceTier/Heritage2300.webp' },
  { style: 'Lone Star 2100',        name: 'Lone Star 2100',        sqft: '2,100 sq ft', climate: 'four-season',   lifestyle: ['heritage','nature'],      tagline: 'Texas limestone, cedar beam, wide-porch living on open land',                  imagePath: '/EstateAesthetics/Signature:ResidenceTier/LoneStar2100.webp' },
  { style: 'Magnolia 2200',         name: 'Magnolia 2200',         sqft: '2,200 sq ft', climate: 'four-season',   lifestyle: ['heritage','entertaining'], tagline: 'Southern grace refined — shaded verandas and classic proportions at family scale', imagePath: '/EstateAesthetics/Signature:ResidenceTier/Magnolia2200.webp' },
  { style: 'Magnolia 2400',         name: 'Magnolia 2400',         sqft: '2,400 sq ft', climate: 'four-season',   lifestyle: ['heritage','entertaining'], tagline: 'Southern grace, traditional proportions, shaded porches and gardens',           imagePath: '/EstateAesthetics/Signature:ResidenceTier/Magnolia2400.webp' },
  { style: 'Mesa 1800',             name: 'Mesa 1800',             sqft: '1,800 sq ft', climate: 'hot-dry',       lifestyle: ['wellness','nature'],      tagline: 'Adobe warmth, rammed earth palette, Southwest mesa character',                  imagePath: '/EstateAesthetics/Signature:ResidenceTier/Mesa1800.webp' },
  { style: 'Oakmont 2600',          name: 'Oakmont 2600',          sqft: '2,600 sq ft', climate: 'four-season',   lifestyle: ['heritage','privacy'],     tagline: 'Classic English character, oak millwork, timeless proportions',                 imagePath: '/EstateAesthetics/Signature:ResidenceTier/Oakmont2600.webp' },
  { style: 'Prairie 2000',          name: 'Prairie 2000',          sqft: '2,000 sq ft', climate: 'four-season',   lifestyle: ['nature','heritage'],      tagline: 'Prairie horizontal lines, farmhouse spirit, open land setting',                 imagePath: '/EstateAesthetics/Signature:ResidenceTier/Prairie2000.webp' },
  { style: 'Summit 2200',           name: 'Summit 2200',           sqft: '2,200 sq ft', climate: 'cold-mountain', lifestyle: ['adventure','nature'],     tagline: 'Mountain modern, dark timber and stone, built for the peaks',                   imagePath: '/EstateAesthetics/Signature:ResidenceTier/Summit2200.webp' },
  { style: 'Velocity 2400',         name: 'Velocity 2400',         sqft: '2,400 sq ft', climate: 'performance',   lifestyle: ['cars','work'],            tagline: 'High-performance aesthetic, precision layout, built for the active family',      imagePath: '/EstateAesthetics/Signature:ResidenceTier/Velocity2400.webp' },
  // Executive
  { style: 'Aegean Estate',         name: 'Aegean Estate',         sqft: '3,000–4,500 sq ft', climate: 'coastal',       lifestyle: ['wellness','entertaining'],  tagline: 'Greek island character, whitewashed stone, coastal breezes',                  imagePath: '/EstateAesthetics/ExecutiveTier/AegeanVertical.webp' },
  { style: 'Alpine Estate',         name: 'Alpine Estate',         sqft: '3,000–4,500 sq ft', climate: 'cold-mountain', lifestyle: ['adventure','nature'],       tagline: 'Rugged timber, stacked stone, built for mountain living',                     imagePath: '/EstateAesthetics/ExecutiveTier/AlpineVertical.webp' },
  { style: 'Backyard Track House',  name: 'Backyard Track House',  sqft: '3,000–4,500 sq ft', climate: 'performance',   lifestyle: ['cars','adventure'],         tagline: 'Performance-first compound, poured concrete, purpose-built precision',         imagePath: '/EstateAesthetics/ExecutiveTier/BackyardTrackHouseVertical.webp' },
  { style: 'Car Vault',             name: 'Car Vault',             sqft: '3,000–4,500 sq ft', climate: 'performance',   lifestyle: ['cars','privacy'],           tagline: 'Museum-grade automotive home, climate-controlled glass vaults',                imagePath: '/EstateAesthetics/ExecutiveTier/CarVaultVertical.webp' },
  { style: 'Creator Estate',        name: 'Creator Estate',        sqft: '3,000–4,500 sq ft', climate: 'four-season',   lifestyle: ['work','heritage'],          tagline: 'Studio-integrated living, maker spaces, acoustic design',                     imagePath: '/EstateAesthetics/ExecutiveTier/CreatorEstateVertical.webp' },
  { style: 'Fjord 3800',            name: 'Fjord 3800',            sqft: '3,800 sq ft',        climate: 'cold-mountain', lifestyle: ['nature','wellness'],        tagline: 'Norwegian scale, dark timber and slate, built for dramatic landscapes',        imagePath: '/EstateAesthetics/ExecutiveTier/Fjord3800.webp' },
  { style: 'French Provence',       name: 'French Provence',       sqft: '3,000–4,500 sq ft', climate: 'coastal',       lifestyle: ['entertaining','heritage'],  tagline: 'Natural limestone, aged oak, unhurried Provençal grace',                      imagePath: '/EstateAesthetics/ExecutiveTier/FrenchProvenceVertical.webp' },
  { style: 'The Lotus',             name: 'The Lotus',             sqft: '3,000–4,500 sq ft', climate: 'hot-dry',       lifestyle: ['wellness','heritage'],      tagline: 'Vastu-aligned, sandstone, hand-carved teak, harmonious living',               imagePath: '/EstateAesthetics/ExecutiveTier/LotusVertical.webp' },
  { style: 'Mediterranean Estate',  name: 'Mediterranean Estate',  sqft: '3,000–4,500 sq ft', climate: 'coastal',       lifestyle: ['entertaining','wellness'],  tagline: 'Sun-warmed plaster, terracotta tile, iron-forged detail',                     imagePath: '/EstateAesthetics/ExecutiveTier/MediterraneanVertical.webp' },
  { style: 'Moroccan Riad',         name: 'Moroccan Riad',         sqft: '3,000–4,500 sq ft', climate: 'hot-dry',       lifestyle: ['wellness','privacy'],       tagline: 'Zellige tile, tadelakt plaster, courtyard-centered sanctuary',                 imagePath: '/EstateAesthetics/ExecutiveTier/MoroccanEstateVertical.webp' },
  { style: 'Nordic Estate',         name: 'Nordic Estate',         sqft: '3,000–4,500 sq ft', climate: 'cold-mountain', lifestyle: ['wellness','nature'],        tagline: 'Hygge warmth, white-painted timber, slow Nordic living',                      imagePath: '/EstateAesthetics/ExecutiveTier/NordicVertical.webp' },
  { style: 'Stealth Wealth',        name: 'Stealth Wealth',        sqft: '3,000–4,500 sq ft', climate: 'four-season',   lifestyle: ['privacy','heritage'],       tagline: 'Quiet luxury, limestone and unlacquered brass, understated mastery',           imagePath: '/EstateAesthetics/ExecutiveTier/StealthWealthVertical.webp' },
  { style: 'Stillwater 3600',       name: 'Stillwater 3600',       sqft: '3,600 sq ft',        climate: 'coastal',       lifestyle: ['wellness','nature'],        tagline: 'Lake-country calm, board-form concrete, built for uninterrupted water views',  imagePath: '/EstateAesthetics/ExecutiveTier/Stillwater3600.webp' },
  { style: 'The Banyan',            name: 'The Banyan',            sqft: '3,000–4,500 sq ft', climate: 'tropical',      lifestyle: ['heritage','nature'],        tagline: 'Multigenerational by design, deep verandas, rooted in family',                imagePath: '/EstateAesthetics/ExecutiveTier/TheBanyanVertical2.webp' },
  { style: 'The Hearth',            name: 'The Hearth',            sqft: '3,000–4,500 sq ft', climate: 'four-season',   lifestyle: ['heritage','entertaining'],  tagline: 'Farmhouse warmth, fireplace as the family anchor, four-season soul',           imagePath: '/EstateAesthetics/ExecutiveTier/TheHearthVertical.webp' },
  { style: 'Hill Country',          name: 'Hill Country',          sqft: '3,000–4,500 sq ft', climate: 'four-season',   lifestyle: ['heritage','nature'],        tagline: 'Native limestone, reclaimed cedar, built for the Texas land',                  imagePath: '/EstateAesthetics/ExecutiveTier/TheHillCountryTXVertical.webp' },
  { style: 'The Patriot',           name: 'The Patriot',           sqft: '3,000–4,500 sq ft', climate: 'four-season',   lifestyle: ['heritage','privacy'],       tagline: 'Red brick, white millwork, American legacy and heritage pride',                imagePath: '/EstateAesthetics/ExecutiveTier/ThePatriotEstateVertical.webp' },
  { style: 'Tropical Modern',       name: 'Tropical Modern',       sqft: '3,000–4,500 sq ft', climate: 'tropical',      lifestyle: ['entertaining','nature'],    tagline: 'Teak, coral stone, open-pavilion living in a lush setting',                   imagePath: '/EstateAesthetics/ExecutiveTier/TropicalModernVertical.webp' },
  { style: 'Villa 4200',            name: 'Villa 4200',            sqft: '4,200 sq ft',        climate: 'coastal',       lifestyle: ['entertaining','heritage'],  tagline: 'Italian villa proportions, arched loggias, estate-scale Mediterranean living',  imagePath: '/EstateAesthetics/ExecutiveTier/Villa4200.webp' },
  { style: 'Wabi-Sabi',             name: 'Wabi-Sabi',             sqft: '3,000–4,500 sq ft', climate: 'four-season',   lifestyle: ['wellness','nature'],        tagline: 'Aged timber, rammed earth, quiet Japanese imperfection',                       imagePath: '/EstateAesthetics/ExecutiveTier/WabiSabiVertical.webp' },
  { style: 'Cars & Coffee',         name: 'Cars & Coffee',         sqft: '3,000–4,500 sq ft', climate: 'performance',   lifestyle: ['cars','entertaining'],      tagline: 'Drive-thru porte-cochère, lounge finishes, weekends with good cars',           imagePath: '/EstateAesthetics/ExecutiveTier/WeekendCoffeeCarsVertical.webp' },
  // Legacy
  { style: "Collector's Compound",  name: "Collector's Compound",  sqft: '4,500–8,000+ sq ft', climate: 'performance',   lifestyle: ['cars','privacy'],           tagline: 'Fortified compound, secured vaults, collector-grade infrastructure',            imagePath: '/EstateAesthetics/LegacyTier/CollectorsCompoundVertical.webp' },
  { style: 'The Crooner',           name: 'The Crooner',           sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['entertaining','heritage'],  tagline: 'Rich walnut, grand entertaining spaces, built for gathering and song',          imagePath: '/EstateAesthetics/LegacyTier/CroonerVertical.webp' },
  { style: 'Dynasty Studio',        name: 'Dynasty Studio',        sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['work','heritage'],          tagline: 'Legacy builder estate, dark timber, built to be passed down',                  imagePath: '/EstateAesthetics/LegacyTier/DynastyStudioVertical.webp' },
  { style: 'Executive Motor Court', name: 'Executive Motor Court', sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['privacy','heritage'],       tagline: 'Gated arrival sequence, limestone, moves without being seen',                  imagePath: '/EstateAesthetics/LegacyTier/ExecutiveMotorCourtVertical.webp' },
  { style: 'Future-Proof',          name: 'Future-Proof',          sqft: '4,500–8,000+ sq ft', climate: 'performance',   lifestyle: ['adventure','privacy'],      tagline: 'Resilience-first design, self-sufficient systems, built for anything',          imagePath: '/EstateAesthetics/LegacyTier/FutureProofVertical.webp' },
  { style: 'Little Drivers',        name: 'Little Drivers',        sqft: '4,500–8,000+ sq ft', climate: 'performance',   lifestyle: ['cars','heritage'],          tagline: 'Next-generation automotive, training spaces, nurturing a lifelong passion',    imagePath: '/EstateAesthetics/LegacyTier/LilDriversVertical.webp' },
  { style: 'Maharaja Estate',       name: 'Maharaja Estate',       sqft: '4,500–8,000+ sq ft', climate: 'hot-dry',       lifestyle: ['heritage','entertaining'],  tagline: 'Marble inlay, carved sandstone, regal South Asian palace living',              imagePath: '/EstateAesthetics/LegacyTier/MaharajaEstateWide.webp' },
  { style: 'The Overland',          name: 'The Overland',          sqft: '4,500–8,000+ sq ft', climate: 'performance',   lifestyle: ['adventure','nature'],       tagline: 'Rugged stone, corrugated steel, self-reliant adventure homestead',              imagePath: '/EstateAesthetics/LegacyTier/OverlandVertical.webp' },
  { style: 'Stealth Wealth II',     name: 'Stealth Wealth II',     sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['privacy','heritage'],       tagline: 'Impeccable restraint at estate scale, hand-selected materials only',           imagePath: '/EstateAesthetics/LegacyTier/StealthWealthVertical2.webp' },
  { style: 'Bahay Legacy',          name: 'Bahay Legacy',          sqft: '4,500–8,000+ sq ft', climate: 'tropical',      lifestyle: ['heritage','nature'],        tagline: 'Filipino heritage, native hardwoods, wide lanais, warmly communal',             imagePath: '/EstateAesthetics/LegacyTier/TheBahayLegacyWide.webp' },
  { style: 'The Banyan Estate',     name: 'The Banyan Estate',     sqft: '4,500–8,000+ sq ft', climate: 'tropical',      lifestyle: ['nature','heritage'],        tagline: 'Full multigenerational compound, rooted for every generation to thrive',        imagePath: '/EstateAesthetics/LegacyTier/TheBanyanEstateWide.webp' },
  { style: 'Desert Oasis',          name: 'Desert Oasis',          sqft: '4,500–8,000+ sq ft', climate: 'hot-dry',       lifestyle: ['wellness','privacy'],       tagline: 'Thermal mass fortress, wildfire-resistant concrete, desert sanctuary',          imagePath: '/EstateAesthetics/LegacyTier/TheDesertOasisVertical.webp' },
  { style: 'The Homestead',         name: 'The Homestead',         sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['nature','adventure'],       tagline: 'Working agrarian estate, orchard-ready land, built for self-reliance',          imagePath: '/EstateAesthetics/LegacyTier/TheHomesteadVertical.webp' },
  { style: 'The Homestead II',      name: 'The Homestead II',      sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['nature','adventure'],       tagline: 'Expanded agrarian compound, barn, workshop, and multi-structure living',        imagePath: '/EstateAesthetics/LegacyTier/TheHomesteadVertical2.webp' },
  { style: 'The Regency',           name: 'The Regency',           sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['heritage','entertaining'],  tagline: 'European manor grandeur, limestone quoins, timeless formal gardens',            imagePath: '/EstateAesthetics/LegacyTier/TheRegencyEstateVertical.webp' },
  { style: 'The Sanctuary',         name: 'The Sanctuary',         sqft: '4,500–8,000+ sq ft', climate: 'coastal',       lifestyle: ['wellness','privacy'],       tagline: 'Wellness legacy estate, spa, cold plunge, meditation — at full scale',          imagePath: '/EstateAesthetics/LegacyTier/TheSanctuaryVertical.webp' },
  { style: 'The Sporting Estate',   name: 'The Sporting Estate',   sqft: '4,500–8,000+ sq ft', climate: 'four-season',   lifestyle: ['adventure','nature'],       tagline: 'Sport courts, trails, outdoor programming — the active family legacy',          imagePath: '/EstateAesthetics/LegacyTier/TheSportingEstateVertical2.webp' },
]

const TIER_ORDER: Record<Tier, number> = { cottage: 0, signature: 1, executive: 2, legacy: 3 }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function deriveEstateSpecs(tier: Tier): Pick<EstateFormData, 'squareFootage' | 'budgetRange' | 'buildTimeline'> {
  switch (tier) {
    case 'cottage':   return { squareFootage: '1,200–1,800', budgetRange: '$350K–$650K',  buildTimeline: '10–14 months' }
    case 'signature': return { squareFootage: '1,800–3,000', budgetRange: '$650K–$1.3M',  buildTimeline: '12–18 months' }
    case 'executive': return { squareFootage: '3,000–4,500', budgetRange: '$1.3M–$2.5M',  buildTimeline: '18–24 months' }
    case 'legacy':    return { squareFootage: '4,500–8,000+', budgetRange: '$2.5M–$6M+',  buildTimeline: '24–36 months' }
  }
}

function scorePlan(plan: BlueprintPlan, answers: QuizAnswers): number {
  let score = 0
  if (answers.climate && (plan.climate === answers.climate || plan.climate === 'performance')) score += 4
  for (const prio of answers.lifestylePriorities) {
    if (plan.lifestyle.includes(prio)) score += 3
  }
  return score
}

function getRecommendations(answers: QuizAnswers): BlueprintPlan[] {
  if (!answers.tier) return []

  const tierPlans = ALL_PLANS.filter(p => {
    const tier = answers.tier!
    if (tier === 'cottage')   return ['Banyan 1600','Canyon 1500','Cedar 1800','Coastal 1600','Hearth 1800','Magnolia 1800 Cottage','Oakmont 1800 Cottage','Prairie 1600','Summit 1800','Velocity 1500'].includes(p.style)
    if (tier === 'signature') return TIER_ORDER[tier] === 1 && !['Banyan 1600','Canyon 1500','Cedar 1800','Coastal 1600','Hearth 1800','Magnolia 1800 Cottage','Oakmont 1800 Cottage','Prairie 1600','Summit 1800','Velocity 1500'].includes(p.style) && !['Aegean Estate','Alpine Estate','Backyard Track House','Car Vault','Creator Estate','Fjord 3800','French Provence','The Lotus','Mediterranean Estate','Moroccan Riad','Nordic Estate','Stealth Wealth','Stillwater 3600','The Banyan','The Hearth','Hill Country','The Patriot','Tropical Modern','Villa 4200','Wabi-Sabi','Cars & Coffee',"Collector's Compound",'The Crooner','Dynasty Studio','Executive Motor Court','Future-Proof','Little Drivers','Maharaja Estate','The Overland','Stealth Wealth II','Bahay Legacy','The Banyan Estate','Desert Oasis','The Homestead','The Homestead II','The Regency','The Sanctuary','The Sporting Estate'].includes(p.style)
    if (tier === 'executive') return ['Aegean Estate','Alpine Estate','Backyard Track House','Car Vault','Creator Estate','Fjord 3800','French Provence','The Lotus','Mediterranean Estate','Moroccan Riad','Nordic Estate','Stealth Wealth','Stillwater 3600','The Banyan','The Hearth','Hill Country','The Patriot','Tropical Modern','Villa 4200','Wabi-Sabi','Cars & Coffee'].includes(p.style)
    return ["Collector's Compound",'The Crooner','Dynasty Studio','Executive Motor Court','Future-Proof','Little Drivers','Maharaja Estate','The Overland','Stealth Wealth II','Bahay Legacy','The Banyan Estate','Desert Oasis','The Homestead','The Homestead II','The Regency','The Sanctuary','The Sporting Estate'].includes(p.style)
  })

  const scored = tierPlans
    .map(p => ({ plan: p, score: scorePlan(p, answers) }))
    .sort((a, b) => b.score - a.score)

  return scored.slice(0, 3).map(s => s.plan)
}

function buildWhyCopy(plan: BlueprintPlan, answers: QuizAnswers): string {
  const lifestyleLabels: Record<LifestyleId, string> = {
    cars:         'automotive passion',
    wellness:     'wellness-centered living',
    entertaining: 'love of gathering and hospitality',
    nature:       'connection to land and nature',
    work:         'creative and professional ambitions',
    heritage:     'appreciation for heritage and craft',
    privacy:      'need for quiet and privacy',
    adventure:    'adventurous, self-reliant spirit',
  }
  const climateLabels: Record<PlanClimate, string> = {
    'coastal':       'coastal setting',
    'four-season':   'four-season landscape',
    'hot-dry':       'arid climate',
    'tropical':      'tropical climate',
    'cold-mountain': 'mountain environment',
    'performance':   'any climate',
  }

  const matchedLifestyle = plan.lifestyle.find(l => answers.lifestylePriorities.includes(l as LifestyleId)) as LifestyleId | undefined
  const climateMatch = answers.climate && (plan.climate === answers.climate || plan.climate === 'performance')

  if (matchedLifestyle && climateMatch && answers.climate) {
    return `Designed for a ${lifestyleLabels[matchedLifestyle]}, built for your ${climateLabels[answers.climate]}.`
  }
  if (matchedLifestyle) {
    return `Tailored to your ${lifestyleLabels[matchedLifestyle]} — a natural fit for the way you want to live.`
  }
  if (climateMatch && answers.climate) {
    return `Engineered for your ${climateLabels[answers.climate]}, with materials that respond to the environment.`
  }
  return `A curated match for your family's scale, vision, and values.`
}

// ─── Component ───────────────────────────────────────────────────────────────

const STEPS = ['Your family', 'Your place', 'Your match'] as const
type Step = 0 | 1 | 2

interface EstateFormProps {
  onComplete: (data: EstateFormData) => void
  initialData?: Partial<EstateFormData>
}

export default function EstateForm({ onComplete }: EstateFormProps) {
  const [step, setStep] = useState<Step>(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [selected, setSelected] = useState<string>('')

  const [answers, setAnswers] = useState<QuizAnswers>({
    familySize: '',
    children: '',
    multigenerational: false,
    lifestylePriorities: [],
    climate: '',
    tier: null,
  })

  const update = <K extends keyof QuizAnswers>(key: K, val: QuizAnswers[K]) =>
    setAnswers(prev => ({ ...prev, [key]: val }))

  const toggleLifestyle = (id: LifestyleId) =>
    setAnswers(prev => {
      const has = prev.lifestylePriorities.includes(id)
      if (has) return { ...prev, lifestylePriorities: prev.lifestylePriorities.filter(l => l !== id) }
      if (prev.lifestylePriorities.length >= 3) return prev
      return { ...prev, lifestylePriorities: [...prev.lifestylePriorities, id] }
    })

  const goTo = (next: Step) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const step0Valid = !!answers.familySize && !!answers.children && answers.lifestylePriorities.length >= 1
  const step1Valid = !!answers.climate && !!answers.tier
  const recommendations = step1Valid ? getRecommendations(answers) : []

  const handleReveal = () => {
    const plan = ALL_PLANS.find(p => p.style === selected)
    if (!plan || !answers.tier) return
    const specs = deriveEstateSpecs(answers.tier)
    const lifestyleLabels: Record<LifestyleId, string> = {
      cars: 'Cars & Performance', wellness: 'Wellness & Retreat', entertaining: 'Entertaining & Gathering',
      nature: 'Land & Nature', work: 'Work & Creation', heritage: 'Heritage & Craft',
      privacy: 'Privacy & Security', adventure: 'Adventure & Self-Reliance',
    }
    onComplete({
      familySize: answers.familySize,
      children: answers.children,
      multigenerational: answers.multigenerational,
      lifestylePriorities: answers.lifestylePriorities.map(l => lifestyleLabels[l]),
      landSize: TIERS.find(t => t.id === answers.tier)?.lot ?? '',
      climate: answers.climate,
      terrain: '',
      views: '',
      privacyNeeds: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: specs.squareFootage,
      garageSpaces: '',
      guestSuite: false, officStudio: false, homeschoolRoom: false, wellnessSuite: answers.lifestylePriorities.includes('wellness'),
      chefKitchen: false, pantry: false, laundryMudroom: false,
      poolSpa: false, reflectingPond: false, outdoorKitchen: answers.lifestylePriorities.includes('entertaining'),
      fireLounge: false, orchard: answers.lifestylePriorities.includes('nature'),
      raisedBeds: false, greenhouse: false, sportCourt: answers.lifestylePriorities.includes('adventure'),
      playLawn: false,
      aestheticStyle: plan.style,
      budgetRange: specs.budgetRange,
      buildTimeline: specs.buildTimeline,
      scipInterest: '',
    })
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  }

  return (
    <section id="intake" className="bg-[#F7F3EE] py-16 lg:py-24 px-4 lg:px-10 border-t border-[#E8E0D5]">
      <div className="max-w-3xl mx-auto">

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 transition-all ${i === step ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                  i < step ? 'bg-[#C9A84C] text-[#1A1614]' : i === step ? 'bg-[#1A1614] text-[#F7F3EE]' : 'bg-[#E8E0D5] text-[#9B9189]'
                }`}>
                  {i < step ? <Check size={10} /> : i + 1}
                </div>
                <span className="text-xs font-medium tracking-wide text-[#1A1614] hidden sm:block">{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-8 h-px bg-[#E8E0D5]" />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#E8E0D5] rounded-sm overflow-hidden">
          <div className="h-0.5 bg-[#C9A84C]" />

          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ── Step 0: Family & Lifestyle ── */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1614] mb-1">Tell us about your family.</h3>
                    <p className="text-[#9B9189] text-sm">We'll use this to match you with the right collections.</p>
                  </div>

                  {/* Family size */}
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#9B9189] block mb-3">How many people will live here?</label>
                    <div className="flex flex-wrap gap-2">
                      {FAMILY_SIZES.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update('familySize', s)}
                          className={`px-4 py-2 rounded-sm text-sm border transition-all ${
                            answers.familySize === s
                              ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                              : 'bg-white border-[#E8E0D5] text-[#6B5D52] hover:border-[#C9A84C]/60'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Children */}
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#9B9189] block mb-3">Do you have children?</label>
                    <div className="flex flex-wrap gap-2">
                      {CHILDREN_OPTIONS.map(o => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => update('children', o)}
                          className={`px-4 py-2 rounded-sm text-sm border transition-all ${
                            answers.children === o
                              ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                              : 'bg-white border-[#E8E0D5] text-[#6B5D52] hover:border-[#C9A84C]/60'
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Multigenerational */}
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#9B9189] block mb-3">Will multiple generations live together?</label>
                    <div className="flex gap-2">
                      {['Yes', 'No'].map(o => (
                        <button
                          key={o}
                          type="button"
                          onClick={() => update('multigenerational', o === 'Yes')}
                          className={`px-4 py-2 rounded-sm text-sm border transition-all ${
                            (o === 'Yes') === answers.multigenerational
                              ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                              : 'bg-white border-[#E8E0D5] text-[#6B5D52] hover:border-[#C9A84C]/60'
                          }`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#9B9189] block mb-1">What defines your ideal home? <span className="normal-case font-normal">(pick up to 3)</span></label>
                    <p className="text-[#C4BDB5] text-xs mb-3">{answers.lifestylePriorities.length}/3 selected</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {LIFESTYLE_OPTIONS.map(opt => {
                        const active = answers.lifestylePriorities.includes(opt.id)
                        const disabled = !active && answers.lifestylePriorities.length >= 3
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleLifestyle(opt.id)}
                            disabled={disabled}
                            className={`flex items-center gap-3 p-3 rounded-sm border text-left transition-all ${
                              active
                                ? 'bg-[#1A1614] border-[#1A1614]'
                                : disabled
                                ? 'opacity-30 cursor-not-allowed border-[#E8E0D5]'
                                : 'border-[#E8E0D5] hover:border-[#C9A84C]/60'
                            }`}
                          >
                            <span className="text-xl leading-none">{opt.icon}</span>
                            <div>
                              <div className={`text-sm font-medium ${active ? 'text-[#F7F3EE]' : 'text-[#1A1614]'}`}>{opt.label}</div>
                              <div className={`text-[10px] mt-0.5 ${active ? 'text-[#9B9189]' : 'text-[#C4BDB5]'}`}>{opt.description}</div>
                            </div>
                            {active && <Check size={13} className="text-[#C9A84C] ml-auto flex-shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => goTo(1)}
                      disabled={!step0Valid}
                      className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-6 py-3 rounded-sm text-sm font-semibold hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Continue <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 1: Climate & Scale ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28 }}
                  className="space-y-8"
                >
                  <div>
                    <h3 className="font-serif text-2xl text-[#1A1614] mb-1">Where and how big?</h3>
                    <p className="text-[#9B9189] text-sm">Climate and scale narrow your perfect match.</p>
                  </div>

                  {/* Climate */}
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#9B9189] block mb-3">Your climate or region</label>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {CLIMATES.map(c => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update('climate', c.id)}
                          className={`p-3 rounded-sm border text-left transition-all ${
                            answers.climate === c.id
                              ? 'bg-[#1A1614] border-[#1A1614]'
                              : 'border-[#E8E0D5] hover:border-[#C9A84C]/60'
                          }`}
                        >
                          <div className={`text-sm font-medium ${answers.climate === c.id ? 'text-[#F7F3EE]' : 'text-[#1A1614]'}`}>{c.label}</div>
                          <div className={`text-[10px] mt-0.5 ${answers.climate === c.id ? 'text-[#9B9189]' : 'text-[#C4BDB5]'}`}>{c.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tier */}
                  <div>
                    <label className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#9B9189] block mb-3">Scale of home</label>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {TIERS.map(t => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => update('tier', t.id)}
                          className={`p-4 rounded-sm border text-left transition-all ${
                            answers.tier === t.id
                              ? 'bg-[#1A1614] border-[#1A1614]'
                              : 'border-[#E8E0D5] hover:border-[#C9A84C]/60'
                          }`}
                        >
                          <div className={`text-xs font-medium tracking-wide ${answers.tier === t.id ? 'text-[#C9A84C]' : 'text-[#9B9189]'}`}>{t.lot}</div>
                          <div className={`font-serif text-base mt-0.5 ${answers.tier === t.id ? 'text-[#F7F3EE]' : 'text-[#1A1614]'}`}>{t.label}</div>
                          <div className={`text-[10px] mt-0.5 ${answers.tier === t.id ? 'text-[#9B9189]' : 'text-[#C4BDB5]'}`}>{t.sublabel}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => goTo(0)}
                      className="flex items-center gap-1.5 text-[#9B9189] text-sm hover:text-[#1A1614] transition-colors"
                    >
                      <ChevronLeft size={15} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => { setSelected(''); goTo(2) }}
                      disabled={!step1Valid}
                      className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-6 py-3 rounded-sm text-sm font-semibold hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Find my match <ChevronRight size={15} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Step 2: Recommendations ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28 }}
                  className="space-y-6"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-px w-6 bg-[#C9A84C]" />
                      <span className="text-[#C9A84C] text-[10px] font-medium tracking-[0.2em] uppercase">Your top matches</span>
                    </div>
                    <h3 className="font-serif text-2xl text-[#1A1614] mb-1">We found your collections.</h3>
                    <p className="text-[#9B9189] text-sm">Select the one that calls to you.</p>
                  </div>

                  <div className="space-y-3">
                    {recommendations.map((plan, i) => (
                      <motion.button
                        key={plan.style}
                        type="button"
                        onClick={() => setSelected(plan.style)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                        className={`w-full flex items-stretch rounded-sm border-2 overflow-hidden text-left transition-all ${
                          selected === plan.style
                            ? 'border-[#C9A84C]'
                            : 'border-[#E8E0D5] hover:border-[#C9A84C]/50'
                        }`}
                      >
                        {/* Image */}
                        <div className="w-28 sm:w-36 flex-shrink-0 relative">
                          <img
                            src={plan.imagePath}
                            alt={plan.name}
                            className="w-full h-full object-cover"
                          />
                          {i === 0 && (
                            <div className="absolute top-2 left-2 bg-[#C9A84C] text-[#1A1614] text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-sm uppercase">
                              Best match
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-4 flex flex-col justify-between">
                          <div>
                            <div className="font-serif text-[#1A1614] text-lg leading-tight">{plan.name}</div>
                            <div className="text-[#C9A84C] text-[10px] tracking-wide mt-0.5">{plan.sqft}</div>
                            <p className="text-[#6B5D52] text-xs mt-2 leading-relaxed">{plan.tagline}</p>
                          </div>
                          <p className="text-[#9B9189] text-[11px] italic mt-3">{buildWhyCopy(plan, answers)}</p>
                        </div>

                        {/* Check */}
                        <div className="flex items-center pr-4">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selected === plan.style
                              ? 'bg-[#C9A84C] border-[#C9A84C]'
                              : 'border-[#E8E0D5]'
                          }`}>
                            {selected === plan.style && <Check size={10} className="text-[#1A1614]" />}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => goTo(1)}
                      className="flex items-center gap-1.5 text-[#9B9189] text-sm hover:text-[#1A1614] transition-colors"
                    >
                      <ChevronLeft size={15} /> Back
                    </button>
                    <motion.button
                      type="button"
                      onClick={handleReveal}
                      disabled={!selected}
                      className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-8 py-3 rounded-sm text-sm font-semibold hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles size={15} />
                      Reveal My Estate Blueprint
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-[#9B9189] text-xs mt-5">No account required · Instant results · Free</p>
      </div>
    </section>
  )
}
