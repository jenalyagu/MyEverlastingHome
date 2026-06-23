import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Sparkles, Lock, X } from 'lucide-react'
import { type EstateFormData } from '../lib/blueprintGenerator'
import { matchEstateAesthetic } from '../lib/matchEstateAesthetic'

type Tier = 'cottage' | 'signature' | 'executive' | 'legacy'

const TIERS: { id: Tier; label: string; sublabel: string; lot: string; description: string }[] = [
  {
    id: 'cottage',
    label: 'Cottage Series',
    sublabel: '1,200–1,800 sq ft',
    lot: 'Standard lot',
    description: 'A beautifully finished SCIP home built for first-time buyers and young families. Smart layout, efficient footprint, and the permanence of concrete construction from day one.',
  },
  {
    id: 'signature',
    label: 'Signature Series',
    sublabel: '1,800–3,000 sq ft',
    lot: '< 1 acre',
    description: 'More room to grow. A well-proportioned family home with defined zones for work, play, and rest — SCIP construction delivers the quiet and permanence a growing family deserves.',
  },
  {
    id: 'executive',
    label: 'Executive Series',
    sublabel: '3,000–4,500 sq ft',
    lot: '1–3 acres',
    description: 'A fully custom home with room for every lifestyle priority — chef\'s kitchen, wellness suite, office, outdoor living. SCIP construction enables architectural details that wood frame can\'t match.',
  },
  {
    id: 'legacy',
    label: 'Legacy Series',
    sublabel: '4,500–8,000+ sq ft',
    lot: '3+ acres',
    description: 'The full estate vision — motor courts, guest compounds, wellness wings, working orchards. A property engineered to hold and grow family legacy for generations.',
  },
]


const emptyForm: EstateFormData = {
  familySize: '', children: '', multigenerational: false, lifestylePriorities: [],
  landSize: '', climate: '', terrain: '', views: '', privacyNeeds: '',
  bedrooms: '', bathrooms: '', squareFootage: '', garageSpaces: '',
  guestSuite: false, officStudio: false, homeschoolRoom: false, wellnessSuite: false,
  chefKitchen: false, pantry: false, laundryMudroom: false, poolSpa: false,
  reflectingPond: false, outdoorKitchen: false, fireLounge: false, orchard: false,
  raisedBeds: false, greenhouse: false, sportCourt: false, playLawn: false,
  aestheticStyle: '', budgetRange: '', buildTimeline: '', scipInterest: '',
}

type PlanClimate = 'hot-dry' | 'cold-mountain' | 'coastal' | 'four-season' | 'tropical' | 'performance'

interface BlueprintPlan {
  style: string
  name: string
  sqft: string
  tagline: string
  imagePath: string
  climate: PlanClimate
}

const CLIMATE_FILTERS: { id: PlanClimate; label: string; risk: string }[] = [
  { id: 'hot-dry',       label: 'Hot & Dry',   risk: 'Extreme Heat · Wildfire' },
  { id: 'cold-mountain', label: 'Mountain',     risk: 'Snow Load · Freeze-Thaw' },
  { id: 'coastal',       label: 'Coastal',      risk: 'Salt Air · Wind · Flood' },
  { id: 'four-season',   label: 'Four Seasons', risk: 'Tornadoes · Ice · Swings' },
  { id: 'tropical',      label: 'Tropical',     risk: 'Hurricanes · Mold · Typhoons' },
  { id: 'performance',   label: 'Performance',  risk: 'Any Condition' },
]

const COTTAGE_PLANS: BlueprintPlan[] = [
  { style: 'Banyan 1600',          name: 'Banyan 1600',    sqft: '1,600 sq ft', climate: 'tropical',      tagline: 'Multigenerational warmth, deep verandas, communal living at cottage scale',  imagePath: '/EstateAesthetics/CottageTier/Banyan1600.webp' },
  { style: 'Canyon 1500',          name: 'Canyon 1500',    sqft: '1,500 sq ft', climate: 'hot-dry',       tagline: 'Southwestern palette, desert canyon character, compact and efficient',       imagePath: '/EstateAesthetics/CottageTier/Canyon1500.webp' },
  { style: 'Cedar 1800',           name: 'Cedar 1800',     sqft: '1,800 sq ft', climate: 'coastal',       tagline: 'Warm cedar tones, natural materials, Pacific Northwest character',           imagePath: '/EstateAesthetics/CottageTier/Cedar1800.webp' },
  { style: 'Coastal 1600',         name: 'Coastal 1600',   sqft: '1,600 sq ft', climate: 'coastal',       tagline: 'Salt-air resilient, board-and-batten, Pacific coastal character',            imagePath: '/EstateAesthetics/CottageTier/Coastal1600.webp' },
  { style: 'Hearth 1800',          name: 'Hearth 1800',    sqft: '1,800 sq ft', climate: 'four-season',   tagline: 'Farmhouse warmth, fireplace-centered, built for four seasons',               imagePath: '/EstateAesthetics/CottageTier/Hearth1800.webp' },
  { style: 'Magnolia 1800 Cottage',name: 'Magnolia 1800',  sqft: '1,800 sq ft', climate: 'four-season',   tagline: 'Southern grace, shaded porches, traditional proportions',                   imagePath: '/EstateAesthetics/CottageTier/Magnolia1800.webp' },
  { style: 'Oakmont 1800 Cottage', name: 'Oakmont 1800',   sqft: '1,800 sq ft', climate: 'four-season',   tagline: 'Classic English character, oak millwork, timeless cottage proportions',      imagePath: '/EstateAesthetics/CottageTier/Oakmont1800.webp' },
  { style: 'Prairie 1600',         name: 'Prairie 1600',   sqft: '1,600 sq ft', climate: 'four-season',   tagline: 'Prairie horizontal lines, open land character, farmhouse spirit',            imagePath: '/EstateAesthetics/CottageTier/Prairie1600.webp' },
  { style: 'Summit 1800',          name: 'Summit 1800',    sqft: '1,800 sq ft', climate: 'cold-mountain', tagline: 'Alpine character, rugged materials, mountain-ready construction',            imagePath: '/EstateAesthetics/CottageTier/Summit1800.webp' },
  { style: 'Velocity 1500',        name: 'Velocity 1500',  sqft: '1,500 sq ft', climate: 'performance',   tagline: 'Sleek and fast-lined, high-performance minimalism at entry footprint',       imagePath: '/EstateAesthetics/CottageTier/Velocity1500.webp' },
]

const EXECUTIVE_PLANS: BlueprintPlan[] = [
  { style: 'Aegean Estate',        name: 'Aegean Estate',        sqft: '3,000–4,500 sq ft', climate: 'coastal',       tagline: 'Greek island character, whitewashed stone, coastal breezes',              imagePath: '/EstateAesthetics/ExecutiveTier/AegeanVertical.webp' },
  { style: 'Alpine Estate',        name: 'Alpine Estate',        sqft: '3,000–4,500 sq ft', climate: 'cold-mountain', tagline: 'Rugged timber, stacked stone, built for mountain living',                 imagePath: '/EstateAesthetics/ExecutiveTier/AlpineVertical.webp' },
  { style: 'Backyard Track House', name: 'Backyard Track House', sqft: '3,000–4,500 sq ft', climate: 'performance',   tagline: 'Performance-first compound, poured concrete, purpose-built precision',    imagePath: '/EstateAesthetics/ExecutiveTier/BackyardTrackHouseVertical.webp' },
  { style: 'Car Vault',            name: 'Car Vault',            sqft: '3,000–4,500 sq ft', climate: 'performance',   tagline: 'Museum-grade automotive home, climate-controlled glass vaults',           imagePath: '/EstateAesthetics/ExecutiveTier/CarVaultVertical.webp' },
  { style: 'Creator Estate',       name: 'Creator Estate',       sqft: '3,000–4,500 sq ft', climate: 'four-season',   tagline: 'Studio-integrated living, maker spaces, acoustic design',                 imagePath: '/EstateAesthetics/ExecutiveTier/CreatorEstateVertical.webp' },
  { style: 'Fjord 3800',           name: 'Fjord 3800',           sqft: '3,800 sq ft',        climate: 'cold-mountain', tagline: 'Norwegian scale, dark timber and slate, built for dramatic landscapes',   imagePath: '/EstateAesthetics/ExecutiveTier/Fjord3800.webp' },
  { style: 'French Provence',      name: 'French Provence',      sqft: '3,000–4,500 sq ft', climate: 'coastal',       tagline: 'Natural limestone, aged oak, unhurried Provençal grace',                  imagePath: '/EstateAesthetics/ExecutiveTier/FrenchProvenceVertical.webp' },
  { style: 'The Lotus',            name: 'The Lotus',            sqft: '3,000–4,500 sq ft', climate: 'hot-dry',       tagline: 'Vastu-aligned, sandstone, hand-carved teak, harmonious living',           imagePath: '/EstateAesthetics/ExecutiveTier/LotusVertical.webp' },
  { style: 'Mediterranean Estate', name: 'Mediterranean Estate', sqft: '3,000–4,500 sq ft', climate: 'coastal',       tagline: 'Sun-warmed plaster, terracotta tile, iron-forged detail',                 imagePath: '/EstateAesthetics/ExecutiveTier/MediterraneanVertical.webp' },
  { style: 'Moroccan Riad',        name: 'Moroccan Riad',        sqft: '3,000–4,500 sq ft', climate: 'hot-dry',       tagline: 'Zellige tile, tadelakt plaster, courtyard-centered sanctuary',            imagePath: '/EstateAesthetics/ExecutiveTier/MoroccanEstateVertical.webp' },
  { style: 'Nordic Estate',        name: 'Nordic Estate',        sqft: '3,000–4,500 sq ft', climate: 'cold-mountain', tagline: 'Hygge warmth, white-painted timber, slow Nordic living',                  imagePath: '/EstateAesthetics/ExecutiveTier/NordicVertical.webp' },
  { style: 'Stealth Wealth',       name: 'Stealth Wealth',       sqft: '3,000–4,500 sq ft', climate: 'four-season',   tagline: 'Quiet luxury, limestone and unlacquered brass, understated mastery',      imagePath: '/EstateAesthetics/ExecutiveTier/StealthWealthVertical.webp' },
  { style: 'Stillwater 3600',      name: 'Stillwater 3600',      sqft: '3,600 sq ft',        climate: 'coastal',       tagline: 'Lake-country calm, board-form concrete, built for uninterrupted water views', imagePath: '/EstateAesthetics/ExecutiveTier/Stillwater3600.webp' },
  { style: 'The Banyan',           name: 'The Banyan',           sqft: '3,000–4,500 sq ft', climate: 'tropical',      tagline: 'Multigenerational by design, deep verandas, rooted in family',            imagePath: '/EstateAesthetics/ExecutiveTier/TheBanyanVertical2.webp' },
  { style: 'The Hearth',           name: 'The Hearth',           sqft: '3,000–4,500 sq ft', climate: 'four-season',   tagline: 'Farmhouse warmth, fireplace as the family anchor, four-season soul',      imagePath: '/EstateAesthetics/ExecutiveTier/TheHearthVertical.webp' },
  { style: 'Hill Country',         name: 'Hill Country',         sqft: '3,000–4,500 sq ft', climate: 'four-season',   tagline: 'Native limestone, reclaimed cedar, built for the Texas land',             imagePath: '/EstateAesthetics/ExecutiveTier/TheHillCountryTXVertical.webp' },
  { style: 'The Patriot',          name: 'The Patriot',          sqft: '3,000–4,500 sq ft', climate: 'four-season',   tagline: 'Red brick, white millwork, American legacy and heritage pride',            imagePath: '/EstateAesthetics/ExecutiveTier/ThePatriotEstateVertical.webp' },
  { style: 'Tropical Modern',      name: 'Tropical Modern',      sqft: '3,000–4,500 sq ft', climate: 'tropical',      tagline: 'Teak, coral stone, open-pavilion living in a lush setting',               imagePath: '/EstateAesthetics/ExecutiveTier/TropicalModernVertical.webp' },
  { style: 'Villa 4200',           name: 'Villa 4200',           sqft: '4,200 sq ft',        climate: 'coastal',       tagline: 'Italian villa proportions, arched loggias, estate-scale Mediterranean living', imagePath: '/EstateAesthetics/ExecutiveTier/Villa4200.webp' },
  { style: 'Wabi-Sabi',            name: 'Wabi-Sabi',            sqft: '3,000–4,500 sq ft', climate: 'four-season',   tagline: 'Aged timber, rammed earth, quiet Japanese imperfection',                  imagePath: '/EstateAesthetics/ExecutiveTier/WabiSabiVertical.webp' },
  { style: 'Cars & Coffee',        name: 'Cars & Coffee',        sqft: '3,000–4,500 sq ft', climate: 'performance',   tagline: 'Drive-thru porte-cochère, lounge finishes, weekends with good cars',      imagePath: '/EstateAesthetics/ExecutiveTier/WeekendCoffeeCarsVertical.webp' },
]

const LEGACY_PLANS: BlueprintPlan[] = [
  { style: "Collector's Compound",  name: "Collector's Compound",  sqft: '4,500–8,000+ sq ft', climate: 'performance',   tagline: 'Fortified compound, secured vaults, collector-grade infrastructure',       imagePath: '/EstateAesthetics/LegacyTier/CollectorsCompoundVertical.webp' },
  { style: 'The Crooner',           name: 'The Crooner',           sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Rich walnut, grand entertaining spaces, built for gathering and song',    imagePath: '/EstateAesthetics/LegacyTier/CroonerVertical.webp' },
  { style: 'Dynasty Studio',        name: 'Dynasty Studio',        sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Legacy builder estate, dark timber, built to be passed down',             imagePath: '/EstateAesthetics/LegacyTier/DynastyStudioVertical.webp' },
  { style: 'Executive Motor Court', name: 'Executive Motor Court', sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Gated arrival sequence, limestone, moves without being seen',             imagePath: '/EstateAesthetics/LegacyTier/ExecutiveMotorCourtVertical.webp' },
  { style: 'Future-Proof',          name: 'Future-Proof',          sqft: '4,500–8,000+ sq ft', climate: 'performance',   tagline: 'Resilience-first design, self-sufficient systems, built for anything',     imagePath: '/EstateAesthetics/LegacyTier/FutureProofVertical.webp' },
  { style: 'Little Drivers',        name: 'Little Drivers',        sqft: '4,500–8,000+ sq ft', climate: 'performance',   tagline: 'Next-generation automotive, training spaces, nurturing a lifelong passion', imagePath: '/EstateAesthetics/LegacyTier/LilDriversVertical.webp' },
  { style: 'Maharaja Estate',       name: 'Maharaja Estate',       sqft: '4,500–8,000+ sq ft', climate: 'hot-dry',       tagline: 'Marble inlay, carved sandstone, regal South Asian palace living',          imagePath: '/EstateAesthetics/LegacyTier/MaharajaEstateWide.webp' },
  { style: 'The Overland',          name: 'The Overland',          sqft: '4,500–8,000+ sq ft', climate: 'performance',   tagline: 'Rugged stone, corrugated steel, self-reliant adventure homestead',         imagePath: '/EstateAesthetics/LegacyTier/OverlandVertical.webp' },
  { style: 'Stealth Wealth II',     name: 'Stealth Wealth II',     sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Impeccable restraint at estate scale, hand-selected materials only',       imagePath: '/EstateAesthetics/LegacyTier/StealthWealthVertical2.webp' },
  { style: 'Bahay Legacy',          name: 'Bahay Legacy',          sqft: '4,500–8,000+ sq ft', climate: 'tropical',      tagline: 'Filipino heritage, native hardwoods, wide lanais, warmly communal',        imagePath: '/EstateAesthetics/LegacyTier/TheBahayLegacyWide.webp' },
  { style: 'The Banyan Estate',     name: 'The Banyan Estate',     sqft: '4,500–8,000+ sq ft', climate: 'tropical',      tagline: 'Full multigenerational compound, rooted for every generation to thrive',   imagePath: '/EstateAesthetics/LegacyTier/TheBanyanEstateWide.webp' },
  { style: 'Desert Oasis',          name: 'Desert Oasis',          sqft: '4,500–8,000+ sq ft', climate: 'hot-dry',       tagline: 'Thermal mass fortress, wildfire-resistant concrete, desert sanctuary',     imagePath: '/EstateAesthetics/LegacyTier/TheDesertOasisVertical.webp' },
  { style: 'The Homestead',         name: 'The Homestead',         sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Working agrarian estate, orchard-ready land, built for self-reliance',    imagePath: '/EstateAesthetics/LegacyTier/TheHomesteadVertical.webp' },
  { style: 'The Homestead II',      name: 'The Homestead II',      sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Expanded agrarian compound, barn, workshop, and multi-structure living',   imagePath: '/EstateAesthetics/LegacyTier/TheHomesteadVertical2.webp' },
  { style: 'The Regency',           name: 'The Regency',           sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'European manor grandeur, limestone quoins, timeless formal gardens',       imagePath: '/EstateAesthetics/LegacyTier/TheRegencyEstateVertical.webp' },
  { style: 'The Sanctuary',         name: 'The Sanctuary',         sqft: '4,500–8,000+ sq ft', climate: 'coastal',       tagline: 'Wellness legacy estate, spa, cold plunge, meditation — at full scale',     imagePath: '/EstateAesthetics/LegacyTier/TheSanctuaryVertical.webp' },
  { style: 'The Sporting Estate',   name: 'The Sporting Estate',   sqft: '4,500–8,000+ sq ft', climate: 'four-season',   tagline: 'Sport courts, trails, outdoor programming — the active family legacy',     imagePath: '/EstateAesthetics/LegacyTier/TheSportingEstateVertical2.webp' },
]

const SIGNATURE_PLANS: BlueprintPlan[] = [
  { style: 'Aspen 2800',    name: 'Aspen 2800',    sqft: '2,800 sq ft', climate: 'cold-mountain', tagline: 'Mountain modern, aspen grove setting, warm timber and stone',                       imagePath: '/EstateAesthetics/Signature:ResidenceTier/Aspen2800.webp' },
  { style: 'Banyan 2600',   name: 'Banyan 2600',   sqft: '2,600 sq ft', climate: 'tropical',      tagline: 'Deep verandas, native hardwoods, multigenerational warmth at family scale',         imagePath: '/EstateAesthetics/Signature:ResidenceTier/Banyan2600.webp' },
  { style: 'California 2000',name: 'California 2000',sqft: '2,000 sq ft',climate: 'coastal',      tagline: 'Indoor-outdoor flow, warm oak, open-plan California modern character',               imagePath: '/EstateAesthetics/Signature:ResidenceTier/California2000.webp' },
  { style: 'Canyon 2100',   name: 'Canyon 2100',   sqft: '2,100 sq ft', climate: 'hot-dry',       tagline: 'Southwestern character, desert palette, rammed earth and concrete',                  imagePath: '/EstateAesthetics/Signature:ResidenceTier/Canyon2100.webp' },
  { style: 'Coastal 2000',  name: 'Coastal 2000',  sqft: '2,000 sq ft', climate: 'coastal',       tagline: 'Coastal modern, clean lines, salt-air resilient construction',                      imagePath: '/EstateAesthetics/Signature:ResidenceTier/Coastal2000.webp' },
  { style: 'Harbor 1900',   name: 'Harbor 1900',   sqft: '1,900 sq ft', climate: 'coastal',       tagline: 'Coastal shingle, deep eaves, built for salt air and working harbor views',           imagePath: '/EstateAesthetics/Signature:ResidenceTier/Harbor1900.webp' },
  { style: 'Heritage 2300', name: 'Heritage 2300', sqft: '2,300 sq ft', climate: 'four-season',   tagline: 'American heritage proportions, brick and stone, built to be handed down',             imagePath: '/EstateAesthetics/Signature:ResidenceTier/Heritage2300.webp' },
  { style: 'Lone Star 2100',name: 'Lone Star 2100',sqft: '2,100 sq ft', climate: 'four-season',   tagline: 'Texas limestone, cedar beam, wide-porch living on open land',                        imagePath: '/EstateAesthetics/Signature:ResidenceTier/LoneStar2100.webp' },
  { style: 'Magnolia 2200', name: 'Magnolia 2200', sqft: '2,200 sq ft', climate: 'four-season',   tagline: 'Southern grace refined — shaded verandas and classic proportions at family scale',   imagePath: '/EstateAesthetics/Signature:ResidenceTier/Magnolia2200.webp' },
  { style: 'Magnolia 2400', name: 'Magnolia 2400', sqft: '2,400 sq ft', climate: 'four-season',   tagline: 'Southern grace, traditional proportions, shaded porches and gardens',                 imagePath: '/EstateAesthetics/Signature:ResidenceTier/Magnolia2400.webp' },
  { style: 'Mesa 1800',     name: 'Mesa 1800',     sqft: '1,800 sq ft', climate: 'hot-dry',       tagline: 'Adobe warmth, rammed earth palette, Southwest mesa character',                       imagePath: '/EstateAesthetics/Signature:ResidenceTier/Mesa1800.webp' },
  { style: 'Oakmont 2600',  name: 'Oakmont 2600',  sqft: '2,600 sq ft', climate: 'four-season',   tagline: 'Classic English character, oak millwork, timeless proportions',                      imagePath: '/EstateAesthetics/Signature:ResidenceTier/Oakmont2600.webp' },
  { style: 'Prairie 2000',  name: 'Prairie 2000',  sqft: '2,000 sq ft', climate: 'four-season',   tagline: 'Prairie horizontal lines, farmhouse spirit, open land setting',                      imagePath: '/EstateAesthetics/Signature:ResidenceTier/Prairie2000.webp' },
  { style: 'Summit 2200',   name: 'Summit 2200',   sqft: '2,200 sq ft', climate: 'cold-mountain', tagline: 'Mountain modern, dark timber and stone, built for the peaks',                        imagePath: '/EstateAesthetics/Signature:ResidenceTier/Summit2200.webp' },
  { style: 'Velocity 2400', name: 'Velocity 2400', sqft: '2,400 sq ft', climate: 'performance',   tagline: 'High-performance aesthetic, precision layout, built for the active family',           imagePath: '/EstateAesthetics/Signature:ResidenceTier/Velocity2400.webp' },
]

function deriveEstateSpecs(tier: Tier): Pick<EstateFormData, 'squareFootage' | 'budgetRange' | 'buildTimeline'> {
  switch (tier) {
    case 'cottage':   return { squareFootage: '1,200–1,800', budgetRange: '$350K–$650K',   buildTimeline: '10–14 months' }
    case 'signature': return { squareFootage: '1,800–3,000', budgetRange: '$650K–$1.3M',   buildTimeline: '12–18 months' }
    case 'executive': return { squareFootage: '3,000–4,500', budgetRange: '$1.3M–$2.5M',   buildTimeline: '18–24 months' }
    case 'legacy':    return { squareFootage: '4,500–8,000+', budgetRange: '$2.5M–$6M+',   buildTimeline: '24–36 months' }
  }
}

function CollectionGateModal({ onClose }: { onClose: () => void }) {
  const [name, setName]           = useState('')
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/mkolgodd', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, _subject: 'Collection Unlock Request — Everlasting Homes' }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1614]/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#FDFAF6] max-w-md w-full rounded-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9B9189] hover:text-[#1A1614] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Gold top bar */}
        <div className="h-1 bg-[#C9A84C]" />

        <div className="px-8 py-10">
          {submitted ? (
            <div className="text-center">
              <div className="w-12 h-12 bg-[#C9A84C]/10 rounded-sm flex items-center justify-center mx-auto mb-5">
                <Sparkles size={20} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-serif text-2xl text-[#1A1614] mb-3">We'll be in touch.</h3>
              <p className="text-[#9B9189] text-sm leading-relaxed">
                Thank you, {name}. Our team will reach out shortly with access to the full collection and next steps.
              </p>
              <button
                onClick={onClose}
                className="mt-8 w-full bg-[#1A1614] text-[#F7F3EE] py-3 text-sm font-medium tracking-wide hover:bg-[#3D2B1F] transition-colors rounded-sm"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-6 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] font-medium tracking-[0.2em] uppercase">Full Collection Access</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1A1614] mb-2">Unlock every collection.</h3>
              <p className="text-[#9B9189] text-sm leading-relaxed mb-8">
                Our full estate collection is available to qualified buyers. Leave your contact info and our team will be in touch to walk you through every option.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-medium tracking-widest uppercase text-[#9B9189] block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="First and last name"
                    className="w-full border border-[#E8E0D5] bg-white rounded-sm px-4 py-3 text-sm text-[#1A1614] placeholder:text-[#C4BDB5] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium tracking-widest uppercase text-[#9B9189] block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-[#E8E0D5] bg-white rounded-sm px-4 py-3 text-sm text-[#1A1614] placeholder:text-[#C4BDB5] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={!name || !email || loading}
                  className="w-full bg-[#C9A84C] text-[#1A1614] py-3 text-sm font-semibold tracking-wide hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-sm"
                >
                  {loading ? 'Sending…' : 'Get in Touch'}
                </button>
              </form>
              <p className="text-center text-[#C4BDB5] text-[10px] mt-5">No spam. No pressure. One conversation.</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

interface EstateFormProps {
  onComplete: (data: EstateFormData) => void
  initialData?: Partial<EstateFormData>
}

export default function EstateForm({ onComplete, initialData }: EstateFormProps) {
  const [data, setData] = useState<EstateFormData>({ ...emptyForm, ...initialData })
  const [selectedTier, setSelectedTier]   = useState<Tier | null>(null)
  const [climateFilter, setClimateFilter] = useState<PlanClimate | null>(null)
  const [gateModalOpen, setGateModalOpen] = useState(false)

  const update = <K extends keyof EstateFormData>(key: K, val: EstateFormData[K]) =>
    setData(prev => ({ ...prev, [key]: val }))

  const liveMatch = data.aestheticStyle ? matchEstateAesthetic(data) : null

  return (
    <section id="intake" className="bg-[#F7F3EE] py-16 lg:py-24 px-4 lg:px-10 border-t border-[#E8E0D5]">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white border border-[#E8E0D5] rounded-sm p-5 md:p-10 space-y-8">

          {/* Tier selector */}
          <div>
            <h3 className="font-serif text-2xl text-[#1A1614] mb-1">What scale of home are you building?</h3>
            <p className="text-[#9B9189] text-sm mb-5">This helps us show only the collections that match your land and vision.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {TIERS.map(tier => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => {
                    setSelectedTier(tier.id)
                    setClimateFilter(null)
                    update('landSize', tier.lot)
                    update('aestheticStyle', '')
                  }}
                  className={`text-left p-5 rounded-sm border-2 transition-all ${
                    selectedTier === tier.id
                      ? 'border-[#C9A84C] bg-[#C9A84C]/5'
                      : 'border-[#E8E0D5] bg-white hover:border-[#C9A84C]/40'
                  }`}
                >
                  <div className={`text-xs font-semibold tracking-widest uppercase mb-1 whitespace-nowrap ${selectedTier === tier.id ? 'text-[#C9A84C]' : 'text-[#9B9189]'}`}>
                    {tier.lot}
                  </div>
                  <div className="font-serif text-lg text-[#1A1614]">{tier.label}</div>
                  <div className="text-[10px] text-[#C9A84C] tracking-wide mb-1">{tier.sublabel}</div>
                  <div className="text-xs text-[#9B9189] leading-relaxed">{tier.description}</div>
                  {selectedTier === tier.id && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <Check size={11} className="text-[#C9A84C]" />
                      <span className="text-[#C9A84C] text-[10px] tracking-wide font-medium">Selected</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Collection picker — visual image cards for all tiers */}
          <AnimatePresence mode="wait">
            {selectedTier && (() => {
              const allPlans =
                selectedTier === 'cottage'   ? COTTAGE_PLANS   :
                selectedTier === 'signature' ? SIGNATURE_PLANS :
                selectedTier === 'executive' ? EXECUTIVE_PLANS :
                LEGACY_PLANS
              const availableFilters = CLIMATE_FILTERS.filter(f =>
                allPlans.some(p => p.climate === f.id)
              )
              const plans = climateFilter
                ? allPlans.filter(p => p.climate === climateFilter)
                : allPlans
              const cols = (selectedTier === 'executive' || selectedTier === 'legacy')
                ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-2 sm:grid-cols-3'
              const PREVIEW_LIMIT = (selectedTier === 'executive' || selectedTier === 'legacy') ? 8 : 6
              const visiblePlans = plans.slice(0, PREVIEW_LIMIT)
              const lockedPlans  = plans.slice(PREVIEW_LIMIT)
              return (
                <motion.div
                  key={selectedTier}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-[#E8E0D5] pt-6 space-y-4"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-xs font-medium text-[#9B9189] tracking-widest uppercase">
                      Choose your collection
                      <span className="ml-2 text-[#C9A84C] normal-case font-normal">
                        {plans.length}{climateFilter ? ` of ${allPlans.length}` : ''} plans
                      </span>
                    </p>
                    {availableFilters.length > 1 && (
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => setClimateFilter(null)}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wide transition-all border ${
                            !climateFilter
                              ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                              : 'bg-white border-[#E8E0D5] text-[#9B9189] hover:border-[#C9A84C]/60'
                          }`}
                        >
                          All
                        </button>
                        {availableFilters.map(f => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setClimateFilter(climateFilter === f.id ? null : f.id)}
                            title={f.risk}
                            className={`px-3 py-1 rounded-full text-[10px] font-medium tracking-wide transition-all border ${
                              climateFilter === f.id
                                ? 'bg-[#C9A84C] border-[#C9A84C] text-[#1A1614]'
                                : 'bg-white border-[#E8E0D5] text-[#9B9189] hover:border-[#C9A84C]/60'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {climateFilter && (
                    <p className="text-[10px] text-[#C9A84C] tracking-wide -mt-2">
                      {CLIMATE_FILTERS.find(f => f.id === climateFilter)?.risk}
                    </p>
                  )}
                  <div className={`grid ${cols} gap-3`}>
                    {/* Visible plans */}
                    {visiblePlans.map(plan => (
                      <button
                        key={plan.style}
                        type="button"
                        onClick={() => update('aestheticStyle', plan.style)}
                        className={`group relative rounded-sm overflow-hidden border-2 transition-all text-left ${
                          data.aestheticStyle === plan.style
                            ? 'border-[#C9A84C]'
                            : 'border-transparent hover:border-[#C9A84C]/50'
                        }`}
                      >
                        <img
                          src={plan.imagePath}
                          alt={plan.name}
                          className="w-full aspect-[4/5] object-cover"
                        />
                        <div className={`absolute inset-0 transition-all ${
                          data.aestheticStyle === plan.style
                            ? 'bg-[#1A1614]/50'
                            : 'bg-[#1A1614]/30 group-hover:bg-[#1A1614]/45'
                        }`} />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <div className="font-serif text-[#F7F3EE] text-base leading-tight">{plan.name}</div>
                          <div className="text-[#C9A84C] text-[10px] tracking-wide mt-0.5">{plan.sqft}</div>
                          <div className="text-[#C4BDB5] text-[10px] mt-1 leading-snug hidden group-hover:block">{plan.tagline}</div>
                        </div>
                        {data.aestheticStyle === plan.style && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-[#C9A84C] rounded-full flex items-center justify-center">
                            <Check size={12} className="text-[#1A1614]" />
                          </div>
                        )}
                      </button>
                    ))}

                    {/* Locked plans — blurred with gate overlay */}
                    {lockedPlans.map((plan, idx) => (
                      <button
                        key={plan.style}
                        type="button"
                        onClick={() => setGateModalOpen(true)}
                        className="group relative rounded-sm overflow-hidden border-2 border-transparent text-left"
                      >
                        <img
                          src={plan.imagePath}
                          alt=""
                          className="w-full aspect-[4/5] object-cover blur-sm scale-105"
                        />
                        <div className="absolute inset-0 bg-[#1A1614]/60" />
                        {/* Show the unlock CTA only on the first locked card */}
                        {idx === 0 ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
                            <div className="w-9 h-9 bg-[#C9A84C]/20 border border-[#C9A84C]/40 rounded-sm flex items-center justify-center">
                              <Lock size={14} className="text-[#C9A84C]" />
                            </div>
                            <div className="font-serif text-[#F7F3EE] text-sm leading-tight">
                              {lockedPlans.length} more collection{lockedPlans.length !== 1 ? 's' : ''}
                            </div>
                            <div className="text-[#C9A84C] text-[10px] tracking-wide border border-[#C9A84C]/50 px-3 py-1 rounded-sm group-hover:bg-[#C9A84C]/10 transition-colors">
                              Unlock All
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Lock size={14} className="text-[#F7F3EE]/40" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {liveMatch && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-3 bg-[#1A1614] rounded-sm px-5 py-4"
                      >
                        <Sparkles size={15} className="text-[#C9A84C] flex-shrink-0" />
                        <div>
                          <p className="font-serif text-[#F7F3EE] text-sm">{liveMatch.collectionName}</p>
                          <p className="text-[#9B9189] text-[10px] tracking-wide mt-0.5">{liveMatch.collectionTag}</p>
                        </div>
                        <p className="text-[#C4BDB5] text-xs ml-auto">Ready to reveal →</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })()}
          </AnimatePresence>

          <div className="pt-6 border-t border-[#E8E0D5] flex justify-end">
            <motion.button
              type="button"
              onClick={() => onComplete({ ...data, ...deriveEstateSpecs(selectedTier ?? 'signature') })}
              disabled={!data.aestheticStyle}
              className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-8 py-3 rounded-sm text-sm font-semibold hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Sparkles size={15} />
              Reveal My Estate Collection
            </motion.button>
          </div>
        </div>

        <p className="text-center text-[#9B9189] text-xs mt-5">No account required · Instant results · Free</p>
      </div>

      <AnimatePresence>
        {gateModalOpen && <CollectionGateModal onClose={() => setGateModalOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}
