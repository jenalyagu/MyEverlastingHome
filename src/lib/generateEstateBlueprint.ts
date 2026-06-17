import { type EstateFormData } from './blueprintGenerator'

export interface ImageTile {
  id: string
  title: string
  label: string
  prompt: string
  imageUrl?: string
}

export interface FloorZone {
  id: string
  name: string
  category: 'living' | 'kitchen' | 'suite' | 'work' | 'wellness' | 'utility' | 'outdoor' | 'guest'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface ScipBenefit {
  id: string
  icon: string
  title: string
  description: string
}

export interface EstateBlueprintData {
  estateName: string
  estateSubtitle: string
  estateNarrative: string
  heroImagePrompt: string
  heroImageUrl?: string
  editorialNote: string
  mainFloorZones: FloorZone[]
  upperFloorZones: FloorZone[]
  wellnessLevelZones: FloorZone[]
  sitePlanZones: FloorZone[]
  mainFloorImagePrompt: string
  upperFloorImagePrompt: string
  wellnessLevelImagePrompt: string
  sitePlanImagePrompt: string
  mainFloorImageUrl?: string
  upperFloorImageUrl?: string
  wellnessLevelImageUrl?: string
  sitePlanImageUrl?: string
  interiorLifestyleTiles: ImageTile[]
  estateLifestyleTiles: ImageTile[]
  scipBenefits: ScipBenefit[]
  footerTagline: string
  footerMonogram: string
}

const STYLE_CONFIGS: Record<string, { adjective: string; material: string; mood: string; timeOfDay: string }> = {
  'Modern Organic': {
    adjective: 'organic modern',
    material: 'board-formed concrete, warm cedar, and weathered limestone',
    mood: 'serene, grounded, and luminous',
    timeOfDay: 'golden hour',
  },
  'Traditional / Classic': {
    adjective: 'traditional estate',
    material: 'hand-laid brick, limestone quoins, and cedar shake roofing',
    mood: 'timeless, dignified, and warm',
    timeOfDay: 'soft morning light',
  },
  'Mediterranean / Spanish': {
    adjective: 'Mediterranean villa',
    material: 'terracotta roof tile, smooth plaster, and iron forged details',
    mood: 'sun-drenched, romantic, and richly textured',
    timeOfDay: 'late afternoon golden sun',
  },
  'Farmhouse / Agrarian': {
    adjective: 'agrarian estate',
    material: 'white-painted board and batten, black steel windows, and reclaimed timber',
    mood: 'rooted, honest, and quietly beautiful',
    timeOfDay: 'clear morning light',
  },
  'Minimalist / Contemporary': {
    adjective: 'contemporary minimalist',
    material: 'raw concrete, floor-to-ceiling glass, and dark Corten steel',
    mood: 'bold, precise, and quietly monumental',
    timeOfDay: 'dramatic twilight',
  },
  'Wabi-Sabi / Japanese': {
    adjective: 'wabi-sabi Japanese',
    material: 'aged timber, rammed earth, natural stone, and shoji-inspired glazing',
    mood: 'quietly imperfect, deeply calming, and timeless',
    timeOfDay: 'soft overcast morning light',
  },
  'Alpine / Mountain': {
    adjective: 'alpine estate',
    material: 'rough-hewn timber, stacked stone, standing seam metal roof, and triple-glazed windows',
    mood: 'rugged, warm, and powerfully connected to the mountain landscape',
    timeOfDay: 'golden alpenglow',
  },
  'Scandinavian / Nordic': {
    adjective: 'Nordic slow-living',
    material: 'white-painted timber, dark steel, natural birch, and textured render',
    mood: 'hygge warmth, honest simplicity, and enduring calm',
    timeOfDay: 'soft northern light',
  },
  'French Countryside': {
    adjective: 'French Provençal',
    material: 'natural limestone, terracotta tile, aged oak, and iron-forged hardware',
    mood: 'unhurried, gracious, and deeply connected to the land',
    timeOfDay: 'warm afternoon light',
  },
  'Moroccan / Riad': {
    adjective: 'Moroccan riad',
    material: 'zellige tile, tadelakt plaster, carved cedar, and hand-forged brass lanterns',
    mood: 'layered, sensory, hospitable, and richly ornamented',
    timeOfDay: 'warm lantern evening light',
  },
  'Greek / Aegean': {
    adjective: 'Aegean island',
    material: 'whitewashed plaster, local stone, driftwood timber, and deep-set arched openings',
    mood: 'sun-bleached, breezy, and effortlessly elegant',
    timeOfDay: 'bright midday Mediterranean sun',
  },
  'Tropical Modern': {
    adjective: 'tropical modern',
    material: 'teak decking, coral stone, open-pavilion steel structure, and tropical hardwoods',
    mood: 'lush, open, resort-like, and deeply relaxed',
    timeOfDay: 'golden tropical sunset',
  },
  'Vastu / Indian': {
    adjective: 'Vastu-aligned Indian',
    material: 'sandstone, hand-carved teak, lotus-pond water features, and terracotta accents',
    mood: 'harmonious, prosperous, and deeply rooted in ancient design wisdom',
    timeOfDay: 'warm afternoon light',
  },
  'Maharaja / South Asian': {
    adjective: 'South Asian palace',
    material: 'marble inlay, hand-carved sandstone, gilded lattice screens, and ornate ironwork',
    mood: 'regal, commanding, and built for generations of legacy',
    timeOfDay: 'dramatic golden dusk',
  },
  'Feng Shui / Chinese': {
    adjective: 'Feng Shui-aligned Chinese',
    material: 'polished granite, dark lacquered timber, bamboo screening, and glazed ceramic tile',
    mood: 'balanced, prosperous, and energetically harmonious',
    timeOfDay: 'soft morning light',
  },
  'Filipino / Bahay Legacy': {
    adjective: 'Filipino heritage',
    material: 'native hardwoods, woven capiz shell, volcanic stone, and wide covered lanais',
    mood: 'warm, communal, deeply family-rooted, and graciously hospitable',
    timeOfDay: 'golden tropical afternoon',
  },
  'Multigenerational / Banyan': {
    adjective: 'multigenerational Banyan estate',
    material: 'natural stone, warm timber, deep-shaded verandas, and lush courtyard gardens',
    mood: 'rooted, connected, and built for every generation to thrive together',
    timeOfDay: 'warm late afternoon',
  },
  'Dynasty / Legacy Builder': {
    adjective: 'dynasty legacy',
    material: 'rich dark timber, limestone, bespoke millwork, and dramatic lighting',
    mood: 'ambitious, purposeful, and built to be passed down',
    timeOfDay: 'dramatic evening light',
  },
  'Music & Entertainment': {
    adjective: 'entertainer estate',
    material: 'rich walnut, acoustic limestone, dramatic archways, and custom lighting installations',
    mood: 'celebratory, warm, and alive with the spirit of gathering',
    timeOfDay: 'golden evening with warm interior glow',
  },
  'Stealth Wealth': {
    adjective: 'quiet luxury',
    material: 'hand-selected limestone, aged oak, unlacquered brass, and custom plaster',
    mood: 'understated, impeccably crafted, and quietly extraordinary',
    timeOfDay: 'soft overcast afternoon',
  },
  'Texas Hill Country': {
    adjective: 'Texas Hill Country',
    material: 'native limestone, reclaimed cedar, metal roof, and wide covered porches',
    mood: 'strong, rooted, family-first, and built for the land',
    timeOfDay: 'warm Texas golden hour',
  },
  'American / Patriot': {
    adjective: 'American legacy estate',
    material: 'red brick, white-painted millwork, slate roof, and mature tree canopy',
    mood: 'dignified, heritage-proud, and built for freedom and family',
    timeOfDay: 'soft morning light',
  },
  'Celestial / Cosmic': {
    adjective: 'celestial cosmic',
    material: 'dark stone, observatory domes, constellation-inspired metalwork, and dramatic glazing',
    mood: 'visionary, otherworldly, and deeply connected to the cosmos',
    timeOfDay: 'dramatic twilight into starlight',
  },
  'Car Vault / Collector': {
    adjective: 'automotive collector estate',
    material: 'polished concrete, museum-grade lighting, dark steel, and climate-controlled glass vaults',
    mood: 'precise, purposeful, and built around what you love most',
    timeOfDay: 'dramatic evening showroom light',
  },
  'Executive Motor Court': {
    adjective: 'executive motor court',
    material: 'limestone, private garage pavillon, discreet hardscape, and gated arrival sequence',
    mood: 'quietly powerful, security-forward, and built for those who move without being seen',
    timeOfDay: 'dusk with warm gate lighting',
  },
  'Overland / Adventure Homestead': {
    adjective: 'overland adventure homestead',
    material: 'rugged stone, corrugated steel, reclaimed timber, and industrial-grade workshop finishes',
    mood: 'capable, self-reliant, and always ready for the next adventure',
    timeOfDay: 'golden pre-dawn departure light',
  },
  'Backyard Track House': {
    adjective: 'performance track estate',
    material: 'poured concrete, carbon fiber accents, museum-grade lighting, and precision-engineered surfaces',
    mood: 'purposeful, high-performance, and built for those who live at the apex',
    timeOfDay: 'dramatic dusk with track lighting',
  },
  'Little Drivers\' House': {
    adjective: 'next-generation automotive',
    material: 'warm timber, polished concrete, safety-grade surfaces, and purpose-built training spaces',
    mood: 'inspiring, nurturing, and built to grow a lifelong passion',
    timeOfDay: 'bright energetic morning light',
  },
  'Weekend Cars & Coffee': {
    adjective: 'cars and coffee enthusiast',
    material: 'warm stone, drive-thru porte-cochère, lounge timber, and barista-grade finishes',
    mood: 'convivial, passionate, and built for weekends with good cars and good people',
    timeOfDay: 'crisp weekend morning light',
  },
}

function pickEstateName(data: EstateFormData): { name: string; monogram: string } {
  const style = data.aestheticStyle
  const names: Record<string, { name: string; monogram: string }> = {
    'Modern Organic':           { name: 'The Verdant Residence',   monogram: 'VR'  },
    'Traditional / Classic':    { name: 'The Ashwood Estate',      monogram: 'AE'  },
    'Mediterranean / Spanish':  { name: 'La Casa Dorada',          monogram: 'LCD' },
    'Farmhouse / Agrarian':     { name: 'The Harvest House',       monogram: 'HH'  },
    'Minimalist / Contemporary':{ name: 'The Limen Estate',        monogram: 'LE'  },
    'Wabi-Sabi / Japanese':     { name: 'The Wabi Residence',      monogram: 'WR'  },
    'Alpine / Mountain':        { name: 'The Ridge Estate',        monogram: 'RE'  },
    'Scandinavian / Nordic':    { name: 'The Nordic House',        monogram: 'NH'  },
    'French Countryside':       { name: 'Domaine du Soleil',       monogram: 'DS'  },
    'Moroccan / Riad':          { name: 'The Riad Residence',      monogram: 'RR'  },
    'Greek / Aegean':           { name: 'The Aegean House',        monogram: 'AH'  },
    'Tropical Modern':             { name: 'The Palm Estate',          monogram: 'PE'  },
    'Vastu / Indian':              { name: 'The Lotus Estate',         monogram: 'LE'  },
    'Maharaja / South Asian':      { name: 'The Maharaja Residence',   monogram: 'MR'  },
    'Feng Shui / Chinese':         { name: 'The Dragon Estate',        monogram: 'DE'  },
    'Filipino / Bahay Legacy':     { name: 'The Bahay Legacy',         monogram: 'BL'  },
    'Multigenerational / Banyan':  { name: 'The Banyan Estate',        monogram: 'BE'  },
    'Dynasty / Legacy Builder':    { name: 'The Dynasty Estate',       monogram: 'DY'  },
    'Music & Entertainment':       { name: "The Crooner's Residence",  monogram: 'CR'  },
    'Stealth Wealth':              { name: 'The Steward Estate',       monogram: 'SE'  },
    'Texas Hill Country':          { name: 'The Hill Country House',   monogram: 'HC'  },
    'American / Patriot':          { name: 'The Patriot Estate',       monogram: 'PE'  },
    'Celestial / Cosmic':              { name: 'The Celestial Estate',       monogram: 'CE'  },
    'Car Vault / Collector':           { name: 'The Car Vault Residence',    monogram: 'CV'  },
    'Executive Motor Court':           { name: 'The Motor Court Estate',     monogram: 'MC'  },
    'Overland / Adventure Homestead':  { name: 'The Overland Homestead',     monogram: 'OH'  },
    'Backyard Track House':            { name: 'The Track House',             monogram: 'TH'  },
    'Little Drivers\' House':          { name: "The Little Drivers' House",   monogram: 'LD'  },
    'Weekend Cars & Coffee':           { name: 'The Cars & Coffee House',     monogram: 'CC'  },
  }
  return names[style] ?? { name: 'My Everlasting Home', monogram: 'MEH' }
}

function buildSubtitle(data: EstateFormData): string {
  const priorities = data.lifestylePriorities
  if (priorities.includes('Wellness') && priorities.includes('Entertaining')) {
    return 'A private wellness estate built for gathering, beauty, and legacy'
  }
  if (priorities.includes('Wellness')) {
    return 'A private wellness estate built for family, comfort, and connection'
  }
  if (priorities.includes('Homeschooling') || priorities.includes('Slow living')) {
    return 'A resilient multigenerational retreat designed for slow living'
  }
  if (data.multigenerational) {
    return 'A multigenerational family estate rooted in legacy and enduring design'
  }
  return 'A modern family estate built for beauty, wellness, and legacy'
}

function buildNarrative(data: EstateFormData): string {
  const style = STYLE_CONFIGS[data.aestheticStyle] ?? STYLE_CONFIGS['Modern Organic']
  const climate = data.climate || 'a temperate, sun-rich region'
  const size = data.squareFootage || '5,000–7,000'
  const priorities = data.lifestylePriorities.slice(0, 3).join(', ').toLowerCase() || 'wellness, beauty, and slow living'

  return `Set in ${climate}, this ${style.adjective} estate spans ${size} square feet of intentionally designed living — a home built around the rhythms of family life, the dignity of private retreat, and the enduring value of legacy architecture. Clad in ${style.material}, the residence achieves a ${style.mood} character that deepens with age. Anchored by a commitment to ${priorities}, every room has been conceived as a place of genuine daily pleasure.`
}

const SCIP_VISUAL_SIGNATURE = `monolithic concrete construction, thick solid walls with deep-set window reveals, heavy masonry massing, fortress-like permanence, smooth rendered concrete exterior finish, no visible wood framing, walls appear 10–12 inches thick, sense of indestructible solidity`

const SCIP_INTERIOR_SIGNATURE = `thick plaster walls, deep-set windows with wide sills, solid concrete ceiling reveals, sense of thermal mass and permanence, no hollow drywall look — walls feel solid and heavy, quiet sanctuary atmosphere`

function buildHeroPrompt(data: EstateFormData): string {
  const style = STYLE_CONFIGS[data.aestheticStyle] ?? STYLE_CONFIGS['Modern Organic']
  const climate = data.climate || 'temperate'

  // Pick one dominant outdoor feature as a compositional anchor — listing multiple causes fragmentation
  const outdoorAnchor = data.poolSpa
    ? 'a resort-quality infinity pool visible in the foreground'
    : data.reflectingPond
    ? 'a formal reflecting pond along the arrival axis'
    : data.orchard
    ? 'a mature fruit orchard framing the estate grounds'
    : 'lush manicured estate grounds'

  return `Architectural photography of a single private estate residence — one cohesive home, one building, one unified property. ${style.adjective} architecture clad in ${style.material}. ${SCIP_VISUAL_SIGNATURE}. Set in a ${climate} climate with ${outdoorAnchor}. Camera positioned at the motor court approach, full facade in frame. Shot at ${style.timeOfDay}. Luxury architectural photography, editorial quality, 16:9 ultra-wide. No multiple buildings, no collage, no split views — one home only.`
}

function buildMainFloor(data: EstateFormData): FloorZone[] {
  const zones: FloorZone[] = [
    { id: 'motor-court', name: 'Motor Court', category: 'outdoor', size: 'lg' },
    { id: 'entry', name: 'Entry Foyer', category: 'living', size: 'md' },
    { id: 'great-room', name: 'Great Room', category: 'living', size: 'xl' },
    { id: 'dining', name: 'Dining Room', category: 'living', size: 'lg' },
  ]
  if (data.chefKitchen) {
    zones.push({ id: 'kitchen', name: "Chef's Kitchen", category: 'kitchen', size: 'xl' })
    zones.push({ id: 'scullery', name: 'Scullery', category: 'kitchen', size: 'md' })
  }
  if (data.pantry) zones.push({ id: 'pantry', name: 'Walk-In Pantry', category: 'kitchen', size: 'sm' })
  zones.push({ id: 'primary', name: 'Primary Suite', category: 'suite', size: 'xl' })
  if (data.guestSuite) zones.push({ id: 'guest', name: 'Guest Suite', category: 'guest', size: 'lg' })
  if (data.officStudio) zones.push({ id: 'office', name: "Founder's Studio", category: 'work', size: 'lg' })
  if (data.homeschoolRoom) zones.push({ id: 'school', name: 'Learning Atelier', category: 'work', size: 'md' })
  if (data.laundryMudroom) zones.push({ id: 'mudroom', name: 'Mudroom Hub', category: 'utility', size: 'sm' })
  if (data.outdoorKitchen) zones.push({ id: 'outdoor-kitchen', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' })
  zones.push({ id: 'terrace', name: 'Covered Terrace', category: 'outdoor', size: 'lg' })
  if (data.fireLounge) zones.push({ id: 'fire', name: 'Fire Lounge', category: 'outdoor', size: 'md' })
  return zones
}

function buildUpperFloor(data: EstateFormData): FloorZone[] {
  const zones: FloorZone[] = [
    { id: 'family-lounge', name: 'Family Lounge', category: 'living', size: 'lg' },
    { id: 'reading-nook', name: 'Reading Nook', category: 'living', size: 'sm' },
    { id: 'dressing', name: 'Dressing Room', category: 'suite', size: 'md' },
  ]
  const beds = Math.min(parseInt(data.bedrooms) || 4, 6)
  for (let i = 2; i <= beds; i++) {
    zones.push({ id: `bed-${i}`, name: i === 2 && data.multigenerational ? 'Senior Suite' : `Children's Suite ${i - 1}`, category: 'suite', size: 'lg' })
  }
  zones.push({ id: 'playroom', name: 'Playroom', category: 'living', size: 'md' })
  zones.push({ id: 'homework-loft', name: 'Homework Loft', category: 'work', size: 'sm' })
  zones.push({ id: 'open-below', name: 'Open to Below', category: 'living', size: 'md' })
  return zones
}

function buildWellnessLevel(data: EstateFormData): FloorZone[] {
  const zones: FloorZone[] = []
  if (data.wellnessSuite) {
    zones.push({ id: 'gym', name: 'Fitness Studio', category: 'wellness', size: 'xl' })
    zones.push({ id: 'sauna', name: 'Infrared Sauna', category: 'wellness', size: 'md' })
    zones.push({ id: 'cold-plunge', name: 'Cold Plunge', category: 'wellness', size: 'sm' })
    zones.push({ id: 'spa', name: 'Spa Suite', category: 'wellness', size: 'lg' })
    zones.push({ id: 'meditation', name: 'Meditation Room', category: 'wellness', size: 'md' })
  }
  zones.push({ id: 'wine', name: 'Wine Room', category: 'living', size: 'md' })
  zones.push({ id: 'safe', name: 'Safe Room', category: 'utility', size: 'sm' })
  zones.push({ id: 'media', name: 'Media Lounge', category: 'living', size: 'xl' })
  zones.push({ id: 'mechanical', name: 'Mechanical / Storage', category: 'utility', size: 'md' })
  return zones
}

function buildSitePlan(data: EstateFormData): FloorZone[] {
  const zones: FloorZone[] = [
    { id: 'main-residence', name: 'Main Residence', category: 'living', size: 'xl' },
    { id: 'motor-court-site', name: 'Motor Court', category: 'outdoor', size: 'lg' },
    { id: 'garage', name: `${data.garageSpaces || '4'}-Car Garage`, category: 'utility', size: 'lg' },
  ]
  if (data.poolSpa) zones.push({ id: 'pool-site', name: 'Pool & Spa', category: 'wellness', size: 'xl' })
  if (data.reflectingPond) zones.push({ id: 'pond', name: 'Reflecting Pond', category: 'outdoor', size: 'lg' })
  if (data.outdoorKitchen) zones.push({ id: 'ok-site', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' })
  if (data.greenhouse) zones.push({ id: 'greenhouse-site', name: 'Greenhouse', category: 'outdoor', size: 'md' })
  if (data.raisedBeds) zones.push({ id: 'garden', name: 'Kitchen Gardens', category: 'outdoor', size: 'md' })
  if (data.orchard) zones.push({ id: 'orchard-site', name: 'Orchard', category: 'outdoor', size: 'lg' })
  if (data.playLawn) zones.push({ id: 'play-lawn', name: 'Play Lawn', category: 'outdoor', size: 'lg' })
  if (data.sportCourt) zones.push({ id: 'sport', name: 'Sport Court', category: 'outdoor', size: 'lg' })
  if (data.guestSuite) zones.push({ id: 'casita', name: 'Guest Casita', category: 'guest', size: 'md' })
  if (data.fireLounge) zones.push({ id: 'fire-site', name: 'Fire Lounge', category: 'outdoor', size: 'md' })
  zones.push({ id: 'trails', name: 'Walking Trails', category: 'outdoor', size: 'lg' })
  return zones
}

function buildInteriorTiles(data: EstateFormData): ImageTile[] {
  const s = data.aestheticStyle || 'modern organic'
  const sci = SCIP_INTERIOR_SIGNATURE
  // Anchor phrase: keeps the model focused on a single room within one house
  const anchor = `Interior architectural photography of a single room inside one private estate home`
  const tiles: ImageTile[] = [
    {
      id: 'great-room',
      title: 'Great Room',
      label: 'The Living Hall',
      prompt: `${anchor}. The great room: ${s} style, ${sci}, soaring volume ceilings, stone fireplace, glass doors opening to the rear terrace, warm natural light flooding in. One room, one frame. Luxury editorial photography.`,
    },
  ]
  if (data.chefKitchen) {
    tiles.push({
      id: 'kitchen',
      title: "Chef's Kitchen",
      label: 'Culinary Heart',
      prompt: `${anchor}. The chef's kitchen: ${s} style, ${sci}, oversized island in natural stone, professional range, scullery doorway visible at rear, morning light through deep-set windows. One room, one frame. Luxury editorial photography.`,
    })
  }
  if (data.officStudio) {
    tiles.push({
      id: 'office',
      title: "Founder's Studio",
      label: 'The Work Sanctuary',
      prompt: `${anchor}. The founder's studio: ${s} style, ${sci}, floor-to-ceiling custom bookshelves, deep-set window with window seat, leather and linen furnishings. One room, one frame. Luxury editorial photography.`,
    })
  }
  tiles.push({
    id: 'primary',
    title: 'Primary Suite',
    label: 'The Owner\'s Retreat',
    prompt: `${anchor}. The primary suite: ${s} style, ${sci}, king bed centered on the far wall, terrace doors open to soft morning light, linen drapery, no clutter. One room, one frame. Luxury editorial photography.`,
  })
  if (data.wellnessSuite) {
    tiles.push({
      id: 'wellness',
      title: 'Wellness Suite',
      label: 'Body & Mind',
      prompt: `${anchor}. The wellness studio: ${s} style, ${sci}, mirrored gym space with natural light, infrared sauna visible through glass partition, natural materials and stone. One room, one frame. Luxury editorial photography.`,
    })
    tiles.push({
      id: 'spa-bath',
      title: 'Spa Bath',
      label: 'The Spa Retreat',
      prompt: `${anchor}. The spa bathroom: ${s} style, ${sci}, freestanding stone soaking tub beside a tall window, oversized rain shower in honed stone, warm indirect light. One room, one frame. Luxury editorial photography.`,
    })
  }
  tiles.push({
    id: 'wine',
    title: 'Wine Room',
    label: 'The Cellar',
    prompt: `${anchor}. The wine room: ${sci}, floor-to-ceiling custom bottle racking in dark steel and stone, soft amber accent lighting, herringbone stone floor. One room, one frame. Luxury editorial photography.`,
  })
  if (data.outdoorKitchen || data.fireLounge) {
    tiles.push({
      id: 'outdoor-living',
      title: 'Outdoor Living Room',
      label: 'Life Under the Sky',
      prompt: `${anchor}. The covered outdoor terrace: ${s} style, monolithic concrete columns, deep overhanging eaves, fire feature as focal point, relaxed lounge seating, warm evening light. One space, one frame. Luxury editorial photography.`,
    })
  }
  return tiles.slice(0, 8)
}

function buildEstateTiles(data: EstateFormData): ImageTile[] {
  // Anchor phrase: grounds the model on a specific feature of one property
  const groundsAnchor = `Lifestyle editorial photography on the grounds of a single private luxury estate — one location, one frame, no montage`
  const s = data.aestheticStyle || 'modern organic'
  const tiles: ImageTile[] = []
  if (data.raisedBeds || data.greenhouse) {
    tiles.push({
      id: 'garden-table',
      title: 'Garden to Table',
      label: 'The Kitchen Garden',
      prompt: `${groundsAnchor}. The kitchen garden: raised vegetable beds overflowing with herbs and greens, morning dew on the leaves, stone pathway between rows, warm early light. One garden, one frame.`,
    })
  }
  if (data.greenhouse) {
    tiles.push({
      id: 'greenhouse',
      title: 'Greenhouse',
      label: 'The Growing House',
      prompt: `${groundsAnchor}. The estate greenhouse: single glass and steel structure with arched roof, propagation benches inside, lush plants, morning light streaming through the panels. One structure, one frame.`,
    })
  }
  if (data.orchard) {
    tiles.push({
      id: 'orchard',
      title: 'Citrus Orchard',
      label: 'The Grove',
      prompt: `${groundsAnchor}. The fruit orchard: a single row of mature citrus trees receding into the distance, dappled golden hour light through the canopy, grass underfoot. One grove, one frame.`,
    })
  }
  if (data.playLawn) {
    tiles.push({
      id: 'play-lawn',
      title: 'Play Lawn',
      label: 'Room to Run',
      prompt: `${groundsAnchor}. The play lawn: an open manicured grass expanse with the main estate residence visible in the soft background, children running in afternoon light. One lawn, one frame.`,
    })
  }
  if (data.fireLounge) {
    tiles.push({
      id: 'fire-lounge',
      title: 'Fire Lounge Nights',
      label: 'The Gathering Place',
      prompt: `${groundsAnchor}. The fire lounge: a sunken circular fire pit surrounded by built-in stone seating, evening light, warm orange flame glow, stars beginning to appear. One space, one frame.`,
    })
  }
  if (data.poolSpa) {
    tiles.push({
      id: 'pool',
      title: 'Pool & Spa',
      label: 'The Water Garden',
      prompt: `${groundsAnchor}. The pool terrace: a single infinity-edge pool with integrated spa, ${s} style, travertine decking, main residence reflected in the water at golden hour. One pool, one frame.`,
    })
  }
  if (data.sportCourt) {
    tiles.push({
      id: 'sport',
      title: 'Sport Court',
      label: 'Active Life',
      prompt: `${groundsAnchor}. The sport court: a single illuminated private court with crisp painted lines, evening perimeter lighting, surrounding hedge screening. One court, one frame.`,
    })
  }
  tiles.push({
    id: 'morning-coffee',
    title: 'Morning Coffee Terrace',
    label: 'The Morning Ritual',
    prompt: `${groundsAnchor}. The morning terrace: a single table and two chairs, steam rising from a coffee cup, soft early light, the estate grounds visible beyond a low balustrade. One moment, one frame.`,
  })
  tiles.push({
    id: 'family-dinner',
    title: 'Family Dinner Under Lights',
    label: 'The Long Table',
    prompt: `${groundsAnchor}. The outdoor dining terrace: a long table set for family dinner under draped string lights, warm summer evening, lush garden border. One table, one moment, one frame.`,
  })
  if (data.homeschoolRoom) {
    tiles.push({
      id: 'homeschool',
      title: 'Learning at Home',
      label: 'The Atelier Life',
      prompt: `Interior lifestyle editorial photography inside a single private estate home. The learning atelier: children at a wide worktable with books and art supplies, built-in bookshelves, north-facing windows, soft natural light. One room, one frame.`,
    })
  }
  if (data.multigenerational) {
    tiles.push({
      id: 'multigenerational',
      title: 'Multigenerational Gathering',
      label: 'All Generations',
      prompt: `Interior lifestyle editorial photography inside a single private estate home. The great room: three generations gathered around one table — grandparents, parents, young children — warm firelight, relaxed and genuine. One room, one frame.`,
    })
  }
  tiles.push({
    id: 'garage',
    title: 'Motor Court',
    label: 'The Garage Estate',
    prompt: `${groundsAnchor}. The motor court: a single ${s} style four-car garage with wide timber doors, polished concrete apron, one vehicle parked facing camera. One building, one frame.`,
  })
  return tiles.slice(0, 10)
}

function buildScipBenefits(data: EstateFormData): ScipBenefit[] {
  const all: ScipBenefit[] = [
    {
      id: 'energy',
      icon: '◈',
      title: 'Energy Efficiency',
      description: 'Continuous insulation eliminates thermal bridging, dramatically reducing heating and cooling loads year-round.',
    },
    {
      id: 'strength',
      icon: '◆',
      title: 'Strength & Resilience',
      description: 'Structural concrete core withstands extreme loads, seismic forces, and high-wind events far beyond wood-frame standards.',
    },
    {
      id: 'quiet',
      icon: '◉',
      title: 'Quiet & Comfortable',
      description: 'Thick insulated walls create exceptional sound attenuation — a genuinely quiet interior sanctuary.',
    },
    {
      id: 'healthy',
      icon: '○',
      title: 'Healthy Living',
      description: 'Inert concrete panel system does not off-gas, harbor mold, or support pest infiltration.',
    },
    {
      id: 'fire',
      icon: '◇',
      title: 'Fire Resistance',
      description: 'Concrete panel construction achieves exceptional fire ratings, protecting the estate and its occupants.',
    },
    {
      id: 'storm',
      icon: '◎',
      title: 'Storm Resistance',
      description: 'Engineered to exceed wind load requirements for hurricane and tornado zones.',
    },
    {
      id: 'durability',
      icon: '▣',
      title: 'Generational Durability',
      description: 'Built to outlast conventional construction by generations — a true legacy structure.',
    },
    {
      id: 'maintenance',
      icon: '▷',
      title: 'Lower Maintenance',
      description: 'Concrete panels do not rot, warp, or require the ongoing maintenance of wood-frame construction.',
    },
  ]

  // Prioritize based on user concerns
  const priorities: string[] = []
  if (data.climate?.toLowerCase().includes('hot') || data.climate?.toLowerCase().includes('desert')) {
    priorities.push('energy', 'fire')
  }
  if (data.climate?.toLowerCase().includes('humid') || data.climate?.toLowerCase().includes('coastal')) {
    priorities.push('storm', 'healthy')
  }
  if (data.climate?.toLowerCase().includes('cold')) {
    priorities.push('energy', 'quiet')
  }
  if (data.lifestylePriorities.includes('Wellness')) priorities.push('healthy', 'quiet')
  if (data.lifestylePriorities.includes('Luxury')) priorities.push('quiet', 'durability')

  const sorted = [
    ...all.filter(b => priorities.includes(b.id)),
    ...all.filter(b => !priorities.includes(b.id)),
  ]

  return sorted.slice(0, 6)
}

function buildEstateIdentityAnchor(data: EstateFormData): string {
  const style = STYLE_CONFIGS[data.aestheticStyle] ?? STYLE_CONFIGS['Modern Organic']
  const sqft = data.squareFootage || '6,000'
  const acreage = data.acreage || '2'
  const stories = data.wellnessSuite ? 'three-story (main floor, upper floor, lower wellness level)' : 'two-story (main floor, upper floor)'
  const footprint = data.squareFootage
    ? parseInt(data.squareFootage.replace(/[^0-9]/g, '')) > 7000 ? 'large H-shaped footprint' : 'rectangular with rear wing'
    : 'L-shaped footprint with rear terrace wing'
  return `THIS IS ONE SPECIFIC SCIP ESTATE: a ${sqft} sq ft ${stories} ${style.adjective} residence on ${acreage} acres, ${footprint}, built with Structural Concrete Insulated Panel (SCIP) construction — monolithic poured concrete walls 10–12 inches thick, shown in floor plan as thick solid wall lines. Every floor plan is a different level of THIS SAME BUILDING — identical structural footprint, same wall thickness, same exterior envelope, same architectural character throughout.`
}

function buildFloorPlanPrompts(data: EstateFormData) {
  const identity = buildEstateIdentityAnchor(data)
  // One single plan per image — list rooms as labels within one drawing, not as separate subjects
  const base = `One single architectural floor plan drawing. Watercolor wash presentation style, cream background, thin black linework, labeled rooms in elegant serif font, north arrow, scale bar, luxury estate architecture firm quality. One plan, one page, no multiple drawings, no side-by-side views.`

  const mainRooms = buildMainFloor(data).map(z => z.name).join(' · ')
  const upperRooms = buildUpperFloor(data).map(z => z.name).join(' · ')
  const wellnessRooms = buildWellnessLevel(data).map(z => z.name).join(' · ')
  const siteElements = buildSitePlan(data).map(z => z.name).join(' · ')

  return {
    mainFloorImagePrompt: `${identity} ${base} THIS IMAGE IS THE MAIN FLOOR PLAN ONLY — the ground level. Labeled spaces within the single plan: ${mainRooms}. Motor court entry at the top of the drawing. Primary suite occupies the largest zone. Great room flows to a covered rear terrace at the bottom. One floor, one plan, one image.`,
    upperFloorImagePrompt: `${identity} ${base} THIS IMAGE IS THE UPPER FLOOR PLAN ONLY — the second level of the same building, identical structural footprint to the main floor. Labeled spaces: ${upperRooms}. Atrium opening over great room shown as void. Children's wing clusters to one side. One floor, one plan, one image.`,
    wellnessLevelImagePrompt: `${identity} ${base} THIS IMAGE IS THE LOWER WELLNESS LEVEL PLAN ONLY — the basement floor of the same building, same structural footprint as floors above. Labeled spaces: ${wellnessRooms}. Fitness studio and spa as the anchor zones. One floor, one plan, one image.`,
    sitePlanImagePrompt: `${identity} ${base} THIS IMAGE IS THE SITE PLAN ONLY — top-down view of the entire property at landscape scale. The single building footprint sits centered on the site. Labeled site elements: ${siteElements}. Driveway and motor court at the top. Pool zone at the rear. Landscaping shown as watercolor wash. One property, one plan, one image.`,
  }
}

export interface EstateCopyOverrides {
  estateName?: string
  estateSubtitle?: string
  estateNarrative?: string
  editorialNote?: string
  footerTagline?: string
  footerMonogram?: string
}

export function generateEstateBlueprint(data: EstateFormData, copyOverrides?: EstateCopyOverrides): EstateBlueprintData {
  const { name, monogram } = pickEstateName(data)
  const floorPlanPrompts = buildFloorPlanPrompts(data)

  return {
    estateName: copyOverrides?.estateName ?? name,
    estateSubtitle: copyOverrides?.estateSubtitle ?? buildSubtitle(data),
    estateNarrative: copyOverrides?.estateNarrative ?? buildNarrative(data),
    heroImagePrompt: buildHeroPrompt(data),
    editorialNote: copyOverrides?.editorialNote ?? 'Built for a life well lived.',
    mainFloorZones: buildMainFloor(data),
    upperFloorZones: buildUpperFloor(data),
    wellnessLevelZones: buildWellnessLevel(data),
    sitePlanZones: buildSitePlan(data),
    ...floorPlanPrompts,
    interiorLifestyleTiles: buildInteriorTiles(data),
    estateLifestyleTiles: buildEstateTiles(data),
    scipBenefits: buildScipBenefits(data),
    footerTagline: copyOverrides?.footerTagline ?? 'A family legacy of beauty, wellness & meaning',
    footerMonogram: copyOverrides?.footerMonogram ?? monogram,
  }
}
