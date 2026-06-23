import type { EstateFormData } from './blueprintGenerator'

export interface AestheticMatch {
  imagePath: string
  collectionName: string
  collectionTag: string
  orientation: 'wide' | 'vertical'
}

const LIBRARY: Record<string, AestheticMatch> = {
  // ── Cottage Tier ──────────────────────────────────────────────────────────
  banyan1600:          { imagePath: '/EstateAesthetics/CottageTier/Banyan1600.webp',                          collectionName: 'Banyan 1600',                     collectionTag: 'Cottage Series · Banyan Collection',              orientation: 'wide' },
  canyon1500:          { imagePath: '/EstateAesthetics/CottageTier/Canyon1500.webp',                          collectionName: 'Canyon 1500',                     collectionTag: 'Cottage Series · Canyon Collection',              orientation: 'wide' },
  cedar1800:           { imagePath: '/EstateAesthetics/CottageTier/Cedar1800.webp',                           collectionName: 'Cedar 1800',                      collectionTag: 'Cottage Series · Cedar Collection',               orientation: 'wide' },
  coastal1600:         { imagePath: '/EstateAesthetics/CottageTier/Coastal1600.webp',                         collectionName: 'Coastal 1600',                    collectionTag: 'Cottage Series · Coastal Collection',             orientation: 'wide' },
  hearth1800:          { imagePath: '/EstateAesthetics/CottageTier/Hearth1800.webp',                          collectionName: 'Hearth 1800',                     collectionTag: 'Cottage Series · Hearth Collection',              orientation: 'wide' },
  magnolia1800Cottage: { imagePath: '/EstateAesthetics/CottageTier/Magnolia1800.webp',                        collectionName: 'Magnolia 1800',                   collectionTag: 'Cottage Series · Magnolia Collection',            orientation: 'wide' },
  oakmont1800Cottage:  { imagePath: '/EstateAesthetics/CottageTier/Oakmont1800.webp',                         collectionName: 'Oakmont 1800',                    collectionTag: 'Cottage Series · Oakmont Collection',             orientation: 'wide' },
  prairie1600:         { imagePath: '/EstateAesthetics/CottageTier/Prairie1600.webp',                         collectionName: 'Prairie 1600',                    collectionTag: 'Cottage Series · Prairie Collection',             orientation: 'wide' },
  summit1800:          { imagePath: '/EstateAesthetics/CottageTier/Summit1800.webp',                          collectionName: 'Summit 1800',                     collectionTag: 'Cottage Series · Summit Collection',              orientation: 'wide' },
  velocity1500:        { imagePath: '/EstateAesthetics/CottageTier/Velocity1500.webp',                        collectionName: 'Velocity 1500',                   collectionTag: 'Cottage Series · Velocity Collection',            orientation: 'wide' },

  // ── Signature Tier ────────────────────────────────────────────────────────
  aspen2800:           { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Aspen2800.webp',               collectionName: 'Aspen 2800',                      collectionTag: 'Signature Series · Aspen Collection',             orientation: 'wide' },
  banyan2600:          { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Banyan2600.webp',              collectionName: 'Banyan 2600',                     collectionTag: 'Signature Series · Banyan Collection',            orientation: 'wide' },
  california2000:      { imagePath: '/EstateAesthetics/Signature:ResidenceTier/California2000.webp',          collectionName: 'California 2000',                 collectionTag: 'Signature Series · California Collection',        orientation: 'wide' },
  canyon2100:          { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Canyon2100.webp',              collectionName: 'Canyon 2100',                     collectionTag: 'Signature Series · Canyon Collection',            orientation: 'wide' },
  coastal2000:         { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Coastal2000.webp',             collectionName: 'Coastal 2000',                    collectionTag: 'Signature Series · Coastal Collection',           orientation: 'wide' },
  harbor1900:          { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Harbor1900.webp',              collectionName: 'Harbor 1900',                     collectionTag: 'Signature Series · Harbor Collection',            orientation: 'wide' },
  heritage2300:        { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Heritage2300.webp',            collectionName: 'Heritage 2300',                   collectionTag: 'Signature Series · Heritage Collection',          orientation: 'wide' },
  loneStar2100:        { imagePath: '/EstateAesthetics/Signature:ResidenceTier/LoneStar2100.webp',            collectionName: 'Lone Star 2100',                  collectionTag: 'Signature Series · Lone Star Collection',         orientation: 'wide' },
  magnolia2200:        { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Magnolia2200.webp',            collectionName: 'Magnolia 2200',                   collectionTag: 'Signature Series · Magnolia Collection',          orientation: 'wide' },
  magnolia2400:        { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Magnolia2400.webp',            collectionName: 'Magnolia 2400',                   collectionTag: 'Signature Series · Magnolia Collection',          orientation: 'wide' },
  mesa1800:            { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Mesa1800.webp',                collectionName: 'Mesa 1800',                       collectionTag: 'Signature Series · Mesa Collection',              orientation: 'wide' },
  oakmont2600:         { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Oakmont2600.webp',             collectionName: 'Oakmont 2600',                    collectionTag: 'Signature Series · Oakmont Collection',           orientation: 'wide' },
  prairie2000:         { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Prairie2000.webp',             collectionName: 'Prairie 2000',                    collectionTag: 'Signature Series · Prairie Collection',           orientation: 'wide' },
  summit2200:          { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Summit2200.webp',              collectionName: 'Summit 2200',                     collectionTag: 'Signature Series · Summit Collection',            orientation: 'wide' },
  velocity2400:        { imagePath: '/EstateAesthetics/Signature:ResidenceTier/Velocity2400.webp',            collectionName: 'Velocity 2400',                   collectionTag: 'Signature Series · Velocity Collection',          orientation: 'wide' },

  // ── Executive Tier ────────────────────────────────────────────────────────
  aegean:              { imagePath: '/EstateAesthetics/ExecutiveTier/AegeanVertical.webp',                    collectionName: 'The Aegean House',                collectionTag: 'Executive Series · Greek Islands Collection',     orientation: 'vertical' },
  alpine:              { imagePath: '/EstateAesthetics/ExecutiveTier/AlpineVertical.webp',                    collectionName: 'The Alpine Estate',               collectionTag: 'Executive Series · Alpine Collection',            orientation: 'vertical' },
  backyardTrack:       { imagePath: '/EstateAesthetics/ExecutiveTier/BackyardTrackHouseVertical.webp',        collectionName: 'The Backyard Track House',         collectionTag: 'Executive Series · Performance Collection',       orientation: 'vertical' },
  carVault:            { imagePath: '/EstateAesthetics/ExecutiveTier/CarVaultVertical.webp',                  collectionName: 'The Car Vault',                   collectionTag: 'Executive Series · Automotive Collection',        orientation: 'vertical' },
  creator:             { imagePath: '/EstateAesthetics/ExecutiveTier/CreatorEstateVertical.webp',             collectionName: 'The Creator Estate',              collectionTag: 'Executive Series · Creative Collection',          orientation: 'vertical' },
  fjord3800:           { imagePath: '/EstateAesthetics/ExecutiveTier/Fjord3800.webp',                         collectionName: 'Fjord 3800',                      collectionTag: 'Executive Series · Fjord Collection',             orientation: 'wide' },
  frenchProvence:      { imagePath: '/EstateAesthetics/ExecutiveTier/FrenchProvenceVertical.webp',            collectionName: 'The Provence Estate',             collectionTag: 'Executive Series · French Collection',            orientation: 'vertical' },
  lotus:               { imagePath: '/EstateAesthetics/ExecutiveTier/LotusVertical.webp',                     collectionName: 'The Lotus Estate',                collectionTag: 'Executive Series · Vastu Collection',             orientation: 'vertical' },
  mediterranean:       { imagePath: '/EstateAesthetics/ExecutiveTier/MediterraneanVertical.webp',             collectionName: 'The Mediterranean Estate',        collectionTag: 'Executive Series · Mediterranean Collection',     orientation: 'vertical' },
  moroccan:            { imagePath: '/EstateAesthetics/ExecutiveTier/MoroccanEstateVertical.webp',            collectionName: 'The Riad Estate',                 collectionTag: 'Executive Series · Moroccan Collection',          orientation: 'vertical' },
  nordic:              { imagePath: '/EstateAesthetics/ExecutiveTier/NordicVertical.webp',                    collectionName: 'The Nordic Estate',               collectionTag: 'Executive Series · Scandinavian Collection',      orientation: 'vertical' },
  stealthWealth:       { imagePath: '/EstateAesthetics/ExecutiveTier/StealthWealthVertical.webp',             collectionName: 'The Steward Estate',              collectionTag: 'Executive Series · Stealth Wealth Collection',    orientation: 'vertical' },
  stillwater3600:      { imagePath: '/EstateAesthetics/ExecutiveTier/Stillwater3600.webp',                    collectionName: 'Stillwater 3600',                 collectionTag: 'Executive Series · Stillwater Collection',        orientation: 'wide' },
  banyanExecutive:     { imagePath: '/EstateAesthetics/ExecutiveTier/TheBanyanVertical2.webp',                collectionName: 'The Banyan Estate',               collectionTag: 'Executive Series · Multigenerational Collection', orientation: 'vertical' },
  hearth:              { imagePath: '/EstateAesthetics/ExecutiveTier/TheHearthVertical.webp',                 collectionName: 'The Hearth',                      collectionTag: 'Executive Series · Family Legacy Collection',     orientation: 'vertical' },
  hillCountry:         { imagePath: '/EstateAesthetics/ExecutiveTier/TheHillCountryTXVertical.webp',          collectionName: 'The Hill Country',                collectionTag: 'Executive Series · Texas Collection',             orientation: 'vertical' },
  patriot:             { imagePath: '/EstateAesthetics/ExecutiveTier/ThePatriotEstateVertical.webp',          collectionName: 'The Patriot Estate',              collectionTag: 'Executive Series · American Legacy Collection',   orientation: 'vertical' },
  tropicalModern:      { imagePath: '/EstateAesthetics/ExecutiveTier/TropicalModernVertical.webp',            collectionName: 'The Tropical Estate',             collectionTag: 'Executive Series · Tropical Collection',          orientation: 'vertical' },
  villa4200:           { imagePath: '/EstateAesthetics/ExecutiveTier/Villa4200.webp',                         collectionName: 'Villa 4200',                      collectionTag: 'Executive Series · Villa Collection',             orientation: 'wide' },
  wabiSabi:            { imagePath: '/EstateAesthetics/ExecutiveTier/WabiSabiVertical.webp',                  collectionName: 'The Wabi Estate',                 collectionTag: 'Executive Series · Wabi-Sabi Collection',         orientation: 'vertical' },
  weekendCoffee:       { imagePath: '/EstateAesthetics/ExecutiveTier/WeekendCoffeeCarsVertical.webp',         collectionName: 'The Weekend Cars & Coffee House', collectionTag: 'Executive Series · Enthusiast Collection',        orientation: 'vertical' },

  // ── Legacy Tier ───────────────────────────────────────────────────────────
  collectorsCompound:  { imagePath: '/EstateAesthetics/LegacyTier/CollectorsCompoundVertical.webp',           collectionName: "The Collector's Compound",         collectionTag: 'Legacy Series · Fortified Collection',           orientation: 'vertical' },
  crooner:             { imagePath: '/EstateAesthetics/LegacyTier/CroonerVertical.webp',                      collectionName: "The Crooner's Residence",          collectionTag: 'Legacy Series · American Songbook Collection',   orientation: 'vertical' },
  dynasty:             { imagePath: '/EstateAesthetics/LegacyTier/DynastyStudioVertical.webp',                collectionName: 'The Dynasty Studio Home',          collectionTag: 'Legacy Series · Legacy Builder Collection',      orientation: 'vertical' },
  executiveMotorCourt: { imagePath: '/EstateAesthetics/LegacyTier/ExecutiveMotorCourtVertical.webp',          collectionName: 'The Executive Motor Court',        collectionTag: 'Legacy Series · Discrete Luxury Collection',     orientation: 'vertical' },
  futureProof:         { imagePath: '/EstateAesthetics/LegacyTier/FutureProofVertical.webp',                  collectionName: 'The Future-Proof Home',            collectionTag: 'Legacy Series · Resilience Collection',          orientation: 'vertical' },
  lilDrivers:          { imagePath: '/EstateAesthetics/LegacyTier/LilDriversVertical.webp',                   collectionName: "The Little Drivers' House",        collectionTag: 'Legacy Series · Next Generation Collection',     orientation: 'vertical' },
  maharaja:            { imagePath: '/EstateAesthetics/LegacyTier/MaharajaEstateWide.webp',                   collectionName: 'The Maharaja Estate',              collectionTag: 'Legacy Series · Royal Fortress Collection',      orientation: 'wide' },
  overland:            { imagePath: '/EstateAesthetics/LegacyTier/OverlandVertical.webp',                     collectionName: 'The Overland Homestead',           collectionTag: 'Legacy Series · Adventure Collection',           orientation: 'vertical' },
  stealthWealth2:      { imagePath: '/EstateAesthetics/LegacyTier/StealthWealthVertical2.webp',               collectionName: 'The Steward Estate II',            collectionTag: 'Legacy Series · Quiet Luxury Collection',        orientation: 'vertical' },
  bahay:               { imagePath: '/EstateAesthetics/LegacyTier/TheBahayLegacyWide.webp',                  collectionName: 'The Bahay Legacy',                 collectionTag: 'Legacy Series · Filipino Collection',            orientation: 'wide' },
  banyan:              { imagePath: '/EstateAesthetics/LegacyTier/TheBanyanEstateWide.webp',                  collectionName: 'The Banyan Estate',                collectionTag: 'Legacy Series · Multigenerational Collection',   orientation: 'wide' },
  desertOasis:         { imagePath: '/EstateAesthetics/LegacyTier/TheDesertOasisVertical.webp',               collectionName: 'The Oasis Estate',                 collectionTag: 'Legacy Series · Desert Collection',              orientation: 'vertical' },
  homestead:           { imagePath: '/EstateAesthetics/LegacyTier/TheHomesteadVertical.webp',                 collectionName: 'The Homestead Estate',             collectionTag: 'Legacy Series · Self-Reliance Collection',       orientation: 'vertical' },
  homestead2:          { imagePath: '/EstateAesthetics/LegacyTier/TheHomesteadVertical2.webp',                collectionName: 'The Homestead Estate II',          collectionTag: 'Legacy Series · Agrarian Collection',            orientation: 'vertical' },
  regency:             { imagePath: '/EstateAesthetics/LegacyTier/TheRegencyEstateVertical.webp',             collectionName: 'The Regency Estate',               collectionTag: 'Legacy Series · European Manor Collection',      orientation: 'vertical' },
  sanctuary:           { imagePath: '/EstateAesthetics/LegacyTier/TheSanctuaryVertical.webp',                 collectionName: 'The Sanctuary Estate',             collectionTag: 'Legacy Series · Wellness Collection',            orientation: 'vertical' },
  sportingEstate:      { imagePath: '/EstateAesthetics/LegacyTier/TheSportingEstateVertical2.webp',           collectionName: 'The Sporting Estate',              collectionTag: 'Legacy Series · Outdoor Collection',             orientation: 'vertical' },

  // ── Root-level fallbacks ──────────────────────────────────────────────────
  modernResidence:     { imagePath: '/MockResModern.webp',                                                     collectionName: 'The Modern Residence',             collectionTag: 'Modern Family Collection',                       orientation: 'wide' },
  zen:                 { imagePath: '/EstateAesthetics/TheZenWide.webp',                                       collectionName: 'The Zen Sanctuary',                collectionTag: 'Japanese Zen Collection',                        orientation: 'wide' },
  oceanLegacy:         { imagePath: '/EstateAesthetics/TheOceanLegacyWide.webp',                               collectionName: 'The Ocean Legacy Estate',          collectionTag: 'Coastal Collection',                             orientation: 'wide' },
  dragon:              { imagePath: '/EstateAesthetics/TheDragonEstateWide.webp',                              collectionName: 'The Dragon Estate',                collectionTag: 'Feng Shui Collection',                           orientation: 'wide' },
}

export function matchEstateAesthetic(data: EstateFormData): AestheticMatch {
  const style    = data.aestheticStyle || ''
  const climate  = data.climate || ''
  const views    = data.views || ''
  const terrain  = data.terrain || ''
  const priorities = Array.isArray(data.lifestylePriorities) ? data.lifestylePriorities : []
  const multi    = !!data.multigenerational

  const hasWellness     = priorities.includes('Wellness')
  const hasSport        = priorities.includes('Cars & motorcycles')
  const hasSlowLiving   = priorities.includes('Slow living')
  const hasHomeschool   = priorities.includes('Homeschooling')
  const hasPrivacy      = priorities.includes('Privacy')
  const hasCreative     = priorities.includes('Creative / Maker')
  const hasEntertaining = priorities.includes('Entertaining')
  const hasResilience   = priorities.includes('Resilience & Preparedness')
  const hasLuxury       = priorities.includes('Luxury')

  // ── 1. Explicit plan selection ───────────────────────────────────────────
  switch (style) {
    // Cottage
    case 'Banyan 1600':          return LIBRARY.banyan1600
    case 'Canyon 1500':          return LIBRARY.canyon1500
    case 'Cedar 1800':           return LIBRARY.cedar1800
    case 'Coastal 1600':         return LIBRARY.coastal1600
    case 'Hearth 1800':          return LIBRARY.hearth1800
    case 'Magnolia 1800 Cottage':return LIBRARY.magnolia1800Cottage
    case 'Oakmont 1800 Cottage': return LIBRARY.oakmont1800Cottage
    case 'Prairie 1600':         return LIBRARY.prairie1600
    case 'Summit 1800':          return LIBRARY.summit1800
    case 'Velocity 1500':        return LIBRARY.velocity1500
    // Signature
    case 'Aspen 2800':           return LIBRARY.aspen2800
    case 'Banyan 2600':          return LIBRARY.banyan2600
    case 'California 2000':      return LIBRARY.california2000
    case 'Canyon 2100':          return LIBRARY.canyon2100
    case 'Coastal 2000':         return LIBRARY.coastal2000
    case 'Harbor 1900':          return LIBRARY.harbor1900
    case 'Heritage 2300':        return LIBRARY.heritage2300
    case 'Lone Star 2100':       return LIBRARY.loneStar2100
    case 'Magnolia 2200':        return LIBRARY.magnolia2200
    case 'Magnolia 2400':        return LIBRARY.magnolia2400
    case 'Mesa 1800':            return LIBRARY.mesa1800
    case 'Oakmont 2600':         return LIBRARY.oakmont2600
    case 'Prairie 2000':         return LIBRARY.prairie2000
    case 'Summit 2200':          return LIBRARY.summit2200
    case 'Velocity 2400':        return LIBRARY.velocity2400
    // Executive
    case 'Aegean Estate':        return LIBRARY.aegean
    case 'Alpine Estate':        return LIBRARY.alpine
    case 'Backyard Track House': return LIBRARY.backyardTrack
    case 'Car Vault':            return LIBRARY.carVault
    case 'Creator Estate':       return LIBRARY.creator
    case 'Fjord 3800':           return LIBRARY.fjord3800
    case 'French Provence':      return LIBRARY.frenchProvence
    case 'The Lotus':            return LIBRARY.lotus
    case 'Mediterranean Estate': return LIBRARY.mediterranean
    case 'Moroccan Riad':        return LIBRARY.moroccan
    case 'Nordic Estate':        return LIBRARY.nordic
    case 'Stealth Wealth':       return LIBRARY.stealthWealth
    case 'Stillwater 3600':      return LIBRARY.stillwater3600
    case 'The Banyan':           return LIBRARY.banyanExecutive
    case 'The Hearth':           return LIBRARY.hearth
    case 'Hill Country':         return LIBRARY.hillCountry
    case 'The Patriot':          return LIBRARY.patriot
    case 'Tropical Modern':      return LIBRARY.tropicalModern
    case 'Villa 4200':           return LIBRARY.villa4200
    case 'Wabi-Sabi':            return LIBRARY.wabiSabi
    case 'Cars & Coffee':        return LIBRARY.weekendCoffee
    // Legacy
    case "Collector's Compound": return LIBRARY.collectorsCompound
    case 'The Crooner':          return LIBRARY.crooner
    case 'Dynasty Studio':       return LIBRARY.dynasty
    case 'Executive Motor Court':return LIBRARY.executiveMotorCourt
    case 'Future-Proof':         return LIBRARY.futureProof
    case 'Little Drivers':       return LIBRARY.lilDrivers
    case 'Maharaja Estate':      return LIBRARY.maharaja
    case 'The Overland':         return LIBRARY.overland
    case 'Stealth Wealth II':    return LIBRARY.stealthWealth2
    case 'Bahay Legacy':         return LIBRARY.bahay
    case 'The Banyan Estate':    return LIBRARY.banyan
    case 'Desert Oasis':         return LIBRARY.desertOasis
    case 'The Homestead':        return LIBRARY.homestead
    case 'The Homestead II':     return LIBRARY.homestead2
    case 'The Regency':          return LIBRARY.regency
    case 'The Sanctuary':        return LIBRARY.sanctuary
    case 'The Sporting Estate':  return LIBRARY.sportingEstate
  }

  // ── 2. Climate fallback ───────────────────────────────────────────────────
  if (climate === 'Hot & dry / Desert')  return LIBRARY.desertOasis
  if (climate === 'Cold / Northern') {
    return (terrain === 'Hilly / Rolling' || views === 'Mountain / Hill') ? LIBRARY.alpine : LIBRARY.nordic
  }
  if (climate === 'Mild / Coastal' || views === 'Water / Lake') return LIBRARY.oceanLegacy
  if (climate === 'Hot & humid') return multi ? LIBRARY.bahay : LIBRARY.tropicalModern

  // ── 3. Lifestyle fallback ─────────────────────────────────────────────────
  if (hasResilience)                return LIBRARY.futureProof
  if (hasCreative)                  return LIBRARY.creator
  if (hasEntertaining && hasLuxury) return LIBRARY.crooner
  if (hasPrivacy && hasLuxury)      return LIBRARY.stealthWealth
  if (hasSport) {
    if (hasPrivacy || hasLuxury)    return LIBRARY.executiveMotorCourt
    if (hasResilience)              return LIBRARY.overland
    if (hasHomeschool)              return LIBRARY.lilDrivers
    if (hasSlowLiving || hasEntertaining) return LIBRARY.weekendCoffee
    if (multi)                      return LIBRARY.collectorsCompound
    return LIBRARY.carVault
  }
  if (hasWellness)                  return LIBRARY.sanctuary
  if (hasSlowLiving)                return LIBRARY.frenchProvence
  if (multi)                        return LIBRARY.banyan

  return LIBRARY.modernResidence
}
