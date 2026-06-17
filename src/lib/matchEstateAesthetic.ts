import type { EstateFormData } from './blueprintGenerator'

export interface AestheticMatch {
  imagePath: string
  collectionName: string
  collectionTag: string
  orientation: 'wide' | 'vertical'
}

const LIBRARY: Record<string, AestheticMatch> = {
  modernResidence:       { imagePath: '/MockResModern.png',                                  collectionName: 'The Modern Residence',       collectionTag: 'Modern Family Collection',            orientation: 'wide' },
  zen:                   { imagePath: '/EstateAesthetics/TheZenWide.PNG',                    collectionName: 'The Zen Sanctuary',           collectionTag: 'Japanese Zen Collection',             orientation: 'wide' },
  wabiSabi:              { imagePath: '/EstateAesthetics/WabiSabiVertical.png',              collectionName: 'The Wabi Estate',             collectionTag: 'Wabi-Sabi Collection',                orientation: 'vertical' },
  sanctuary:             { imagePath: '/EstateAesthetics/TheSanctuaryVertical.PNG',          collectionName: 'The Sanctuary Estate',        collectionTag: 'Wellness Legacy Collection',          orientation: 'vertical' },
  sanctuary2:            { imagePath: '/EstateAesthetics/TheSanctuaryVertical2.PNG',         collectionName: 'The Sanctuary Estate',        collectionTag: 'Wellness Legacy Collection',          orientation: 'vertical' },
  desertOasis:           { imagePath: '/EstateAesthetics/TheDesertOasisVertical.PNG',        collectionName: 'The Oasis Estate',            collectionTag: 'Desert Collection',                   orientation: 'vertical' },
  oceanLegacy:           { imagePath: '/EstateAesthetics/TheOceanLegacyWide.PNG',            collectionName: 'The Ocean Legacy Estate',     collectionTag: 'Coastal Collection',                  orientation: 'wide' },
  aegean:                { imagePath: '/EstateAesthetics/AegeanVertical.png',                collectionName: 'The Aegean House',            collectionTag: 'Greek Islands Collection',            orientation: 'vertical' },
  mediterranean:         { imagePath: '/EstateAesthetics/MediterraneanVertical.png',         collectionName: 'The Mediterranean Estate',    collectionTag: 'Mediterranean Collection',            orientation: 'vertical' },
  moroccan:              { imagePath: '/EstateAesthetics/MoroccanEstateVertical.png',        collectionName: 'The Riad Estate',             collectionTag: 'Moroccan Collection',                 orientation: 'vertical' },
  banyan:                { imagePath: '/EstateAesthetics/TheBanyanEstateWide.PNG',           collectionName: 'The Banyan Estate',           collectionTag: 'Multigenerational Collection',        orientation: 'wide' },
  bahay:                 { imagePath: '/EstateAesthetics/TheBahayLegacyWide.PNG',            collectionName: 'The Bahay Legacy',            collectionTag: 'Filipino Collection',                 orientation: 'wide' },
  tropicalModern:        { imagePath: '/EstateAesthetics/TropicalModernVertical.png',        collectionName: 'The Tropical Estate',         collectionTag: 'Tropical Modern Collection',          orientation: 'vertical' },
  sporting:              { imagePath: '/EstateAesthetics/TheSportingEstateWide.PNG',         collectionName: 'The Sporting Estate',         collectionTag: 'Outdoor Collection',                  orientation: 'wide' },
  regency:               { imagePath: '/EstateAesthetics/TheRegencyEstateVertical.PNG',      collectionName: 'The Regency Estate',          collectionTag: 'European Manor Collection',           orientation: 'vertical' },
  patriot:               { imagePath: '/EstateAesthetics/ThePatriotEstateVertical.PNG',      collectionName: 'The Patriot Estate',          collectionTag: 'American Legacy Collection',          orientation: 'vertical' },
  lotus:                 { imagePath: '/EstateAesthetics/LotusVertical.png',                 collectionName: 'The Lotus Estate',            collectionTag: 'Vastu Collection',                    orientation: 'vertical' },
  homestead:             { imagePath: '/EstateAesthetics/TheHomesteadVertical.PNG',          collectionName: 'The Homestead Estate',        collectionTag: 'Self-Reliance Collection',            orientation: 'vertical' },
  hearth:                { imagePath: '/EstateAesthetics/TheHearthVertical.PNG',             collectionName: 'The Hearth',                  collectionTag: 'Family Legacy Collection',            orientation: 'vertical' },
  hillCountry:           { imagePath: '/EstateAesthetics/TheHillCountryTXVertical.PNG',      collectionName: 'The Hill Country',            collectionTag: 'Texas Collection',                    orientation: 'vertical' },
  frenchProvence:        { imagePath: '/EstateAesthetics/FrenchProvenceVertical.png',        collectionName: 'The Provence Estate',         collectionTag: 'French Countryside Collection',       orientation: 'vertical' },
  alpine:                { imagePath: '/EstateAesthetics/AlpineVertical.png',                collectionName: 'The Alpine Estate',           collectionTag: 'Alpine Collection',                   orientation: 'vertical' },
  nordic:                { imagePath: '/EstateAesthetics/NordicVertical.png',                collectionName: 'The Nordic Estate',           collectionTag: 'Scandinavian Slow Living Collection', orientation: 'vertical' },
  stealthWealth:         { imagePath: '/EstateAesthetics/StealthWealthVertical.png',         collectionName: 'The Steward Estate',          collectionTag: 'Stealth Wealth Collection',           orientation: 'vertical' },
  creator:               { imagePath: '/EstateAesthetics/CreatorEstateVertical.png',         collectionName: 'The Creator Estate',          collectionTag: 'Creative Family Collection',          orientation: 'vertical' },
  crooner:               { imagePath: '/EstateAesthetics/CroonerVertical.png',               collectionName: "The Crooner's Residence",     collectionTag: 'American Songbook Collection',        orientation: 'vertical' },
  dynasty:               { imagePath: '/EstateAesthetics/DynastyStudioVertical.png',         collectionName: 'The Dynasty Studio Home',     collectionTag: 'Legacy Builder Collection',           orientation: 'vertical' },
  futureProof:           { imagePath: '/EstateAesthetics/FutureProofVertical.png',           collectionName: 'The Future-Proof Home',       collectionTag: 'Resilience Collection',               orientation: 'vertical' },
  celestial:             { imagePath: '/EstateAesthetics/TheCelestialEstateVertical.PNG',    collectionName: 'The Celestial Estate',        collectionTag: 'Cosmic Collection',                   orientation: 'vertical' },
  dragon:                { imagePath: '/EstateAesthetics/TheDragonEstateWide.PNG',           collectionName: 'The Dragon Estate',           collectionTag: 'Feng Shui Collection',                orientation: 'wide' },
  maharaja:              { imagePath: '/EstateAesthetics/MaharajaEstateWide.PNG',            collectionName: 'The Maharaja Estate',         collectionTag: 'Royal Fortress Collection',           orientation: 'wide' },
  carVault:              { imagePath: '/EstateAesthetics/CarVaultVertical.png',              collectionName: 'The Car Vault Residence',     collectionTag: 'Automotive Collection',               orientation: 'vertical' },
  collectorsCompound:    { imagePath: '/EstateAesthetics/CollectorsCompoundVertical.png',    collectionName: "The Collector's Compound",    collectionTag: 'Fortified Legacy Collection',         orientation: 'vertical' },
  executiveMotorCourt:   { imagePath: '/EstateAesthetics/ExecutiveMotorCourtVertical.png',   collectionName: 'The Executive Motor Court',   collectionTag: 'Discrete Luxury Collection',          orientation: 'vertical' },
  overland:              { imagePath: '/EstateAesthetics/OverlandVertical.png',              collectionName: 'The Overland Homestead',      collectionTag: 'Adventure Collection',                orientation: 'vertical' },
  backyardTrack:         { imagePath: '/EstateAesthetics/BackyardTrackHouseVertical.png',    collectionName: 'The Backyard Track House',     collectionTag: 'Performance Collection',              orientation: 'vertical' },
  lilDrivers:            { imagePath: '/EstateAesthetics/LilDriversVertical.png',            collectionName: "The Little Drivers' House",   collectionTag: 'Next Generation Collection',          orientation: 'vertical' },
  weekendCoffee:         { imagePath: '/EstateAesthetics/WeekendCoffeeCarsVertical.png',     collectionName: 'The Weekend Cars & Coffee House', collectionTag: 'Enthusiast Collection',           orientation: 'vertical' },
}

export function matchEstateAesthetic(data: EstateFormData): AestheticMatch {
  const style     = data.aestheticStyle || ''
  const climate   = data.climate || ''
  const views     = data.views || ''
  const terrain   = data.terrain || ''
  const priorities = Array.isArray(data.lifestylePriorities) ? data.lifestylePriorities : []
  const multi     = !!data.multigenerational

  const hasWellness     = priorities.includes('Wellness')
  const hasSport        = priorities.includes('Cars & motorcycles')
  const hasSlowLiving   = priorities.includes('Slow living')
  const hasHomeschool   = priorities.includes('Homeschooling')
  const hasPrivacy      = priorities.includes('Privacy')
  const hasCreative     = priorities.includes('Creative / Maker')
  const hasEntertaining = priorities.includes('Entertaining')
  const hasResilience   = priorities.includes('Resilience & Preparedness')
  const hasLuxury       = priorities.includes('Luxury')

  // ── 1. Explicit aesthetic style selection — highest fidelity signal ─────────
  switch (style) {
    case 'Wabi-Sabi / Japanese':      return LIBRARY.wabiSabi
    case 'Alpine / Mountain':         return LIBRARY.alpine
    case 'Scandinavian / Nordic':     return LIBRARY.nordic
    case 'French Countryside':        return LIBRARY.frenchProvence
    case 'Moroccan / Riad':           return LIBRARY.moroccan
    case 'Greek / Aegean':            return LIBRARY.aegean
    case 'Tropical Modern':           return LIBRARY.tropicalModern
    case 'Vastu / Indian':            return LIBRARY.lotus
    case 'Maharaja / South Asian':    return LIBRARY.maharaja
    case 'Feng Shui / Chinese':       return LIBRARY.dragon
    case 'Filipino / Bahay Legacy':   return LIBRARY.bahay
    case 'Multigenerational / Banyan':return LIBRARY.banyan
    case 'Dynasty / Legacy Builder':  return LIBRARY.dynasty
    case 'Music & Entertainment':     return LIBRARY.crooner
    case 'Stealth Wealth':            return LIBRARY.stealthWealth
    case 'Texas Hill Country':        return LIBRARY.hillCountry
    case 'American / Patriot':        return LIBRARY.patriot
    case 'Celestial / Cosmic':           return LIBRARY.celestial
    case 'Car Vault / Collector':          return LIBRARY.carVault
    case 'Executive Motor Court':          return LIBRARY.executiveMotorCourt
    case 'Backyard Track House':           return LIBRARY.backyardTrack
    case 'Little Drivers\' House':         return LIBRARY.lilDrivers
    case 'Weekend Cars & Coffee':          return LIBRARY.weekendCoffee
    case 'Overland / Adventure Homestead': return LIBRARY.overland
    case 'Mediterranean / Spanish':
      return (climate === 'Mild / Coastal' || views === 'Water / Lake')
        ? LIBRARY.aegean
        : LIBRARY.mediterranean
    case 'Traditional / Classic':
      return LIBRARY.regency
    case 'Farmhouse / Agrarian':
      if (hasSlowLiving || hasHomeschool) return LIBRARY.hearth
      return LIBRARY.homestead
    case 'Minimalist / Contemporary':
      return hasPrivacy ? LIBRARY.stealthWealth : LIBRARY.zen
    case 'Modern Organic':
      // Fall through to lifestyle/climate logic below
      break
  }

  // ── 2. Climate — strong environment overrides ──────────────────────────────
  if (climate === 'Hot & dry / Desert') return LIBRARY.desertOasis

  if (climate === 'Cold / Northern') {
    return terrain === 'Hilly / Rolling' || views === 'Mountain / Hill'
      ? LIBRARY.alpine
      : LIBRARY.nordic
  }

  if (climate === 'Mild / Coastal' || views === 'Water / Lake') {
    return style === 'Mediterranean / Spanish' || style === 'Greek / Aegean'
      ? LIBRARY.aegean
      : LIBRARY.oceanLegacy
  }

  if (climate === 'Hot & humid') {
    return multi ? LIBRARY.bahay : LIBRARY.tropicalModern
  }

  // ── 3. Lifestyle priority overrides ───────────────────────────────────────
  if (hasResilience)                              return LIBRARY.futureProof
  if (hasCreative)                                return LIBRARY.creator
  if (hasEntertaining && hasLuxury)               return LIBRARY.crooner
  if (hasPrivacy && hasLuxury)                    return LIBRARY.stealthWealth
  if (hasSport) {
    if (hasPrivacy || hasLuxury)                      return LIBRARY.executiveMotorCourt
    if (hasResilience)                                return LIBRARY.overland
    if (hasHomeschool || priorities.includes('Homeschooling')) return LIBRARY.lilDrivers
    if (priorities.includes('Slow living') || priorities.includes('Entertaining')) return LIBRARY.weekendCoffee
    if (multi || priorities.includes('Food & gardening')) return LIBRARY.collectorsCompound
    return LIBRARY.carVault
  }
  if (hasWellness)                                return LIBRARY.sanctuary
  if (hasSlowLiving && !hasHomeschool)            return LIBRARY.frenchProvence

  // ── 4. Multigenerational ──────────────────────────────────────────────────
  if (multi) return LIBRARY.banyan

  // ── 5. Default (Modern Organic or no selection) ───────────────────────────
  return LIBRARY.modernResidence
}
