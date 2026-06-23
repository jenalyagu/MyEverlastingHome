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
  // ── Cottage Series ──────────────────────────────────────────────────────
  'Banyan 1600':          { adjective: 'multigenerational Banyan cottage',       material: 'native hardwoods, woven capiz accents, wide covered veranda, and warm tropical stone',                              mood: 'warmly communal, rooted, and deeply family-first',                                 timeOfDay: 'golden tropical afternoon' },
  'Canyon 1500':          { adjective: 'Southwestern canyon cottage',            material: 'rammed earth, adobe plaster, terracotta accents, and desert-sourced stone',                                        mood: 'earthy, sun-warmed, and intimately connected to the desert land',                  timeOfDay: 'golden canyon hour' },
  'Cedar 1800':           { adjective: 'Pacific Northwest cedar cottage',        material: 'cedar board and batten, natural stone, standing seam metal roof, and deep-set windows',                            mood: 'warm, honest, and quietly beautiful against the treeline',                         timeOfDay: 'soft coastal morning light' },
  'Coastal 1600':         { adjective: 'coastal cottage',                        material: 'white-painted board and batten, cedar trim, deep-set windows, and salt-air-rated hardware',                        mood: 'crisp, light-filled, and effortlessly connected to the sea',                       timeOfDay: 'bright coastal noon' },
  'Hearth 1800':          { adjective: 'farmhouse hearth cottage',               material: 'white-painted wood, reclaimed timber beams, stone fireplace surround, and black steel windows',                    mood: 'cozy, family-first, and grounded through four seasons',                            timeOfDay: 'warm winter morning light' },
  'Magnolia 1800 Cottage':{ adjective: 'Southern magnolia cottage',              material: 'painted column porch, shiplap siding, wide covered entry, and traditional millwork',                               mood: 'graceful, unhurried, and rooted in Southern hospitality',                           timeOfDay: 'soft Southern afternoon' },
  'Oakmont 1800 Cottage': { adjective: 'English cottage',                        material: 'oak millwork, plaster render, bay window, and traditional masonry detailing',                                      mood: 'timeless, settled, and quietly classical',                                         timeOfDay: 'soft overcast English morning' },
  'Prairie 1600':         { adjective: 'prairie farmhouse cottage',              material: 'horizontal cedar, fieldstone base, low-slung roofline, and wide front porch',                                     mood: 'grounded, open, and connected to the land',                                        timeOfDay: 'clear prairie morning' },
  'Summit 1800':          { adjective: 'alpine summit cottage',                  material: 'rough-hewn timber, stacked stone, standing seam metal roof, and triple-glazed windows',                            mood: 'rugged, warm, and built for the mountain',                                         timeOfDay: 'golden alpenglow' },
  'Velocity 1500':        { adjective: 'high-performance minimalist cottage',    material: 'board-formed concrete, dark steel, floor-to-ceiling glass, and precision-engineered surfaces',                     mood: 'bold, precise, and built for the performance-minded family',                       timeOfDay: 'dramatic dusk' },
  // ── Signature Series ────────────────────────────────────────────────────
  'Aspen 2800':           { adjective: 'mountain modern Aspen residence',        material: 'warm timber, stacked stone, aspen grove framing, and triple-glazed windows',                                       mood: 'serene, refined, and deeply connected to the mountain landscape',                  timeOfDay: 'golden alpenglow' },
  'Banyan 2600':          { adjective: 'multigenerational Banyan residence',     material: 'native hardwoods, wide covered verandas, tropical stone, and woven-screen details',                                mood: 'warmly communal, deeply family-first, and rooted for generations',                 timeOfDay: 'golden tropical afternoon' },
  'California 2000':      { adjective: 'California modern',                      material: 'warm oak, floor-to-ceiling glass, board-form concrete accents, and native stone',                                  mood: 'open, effortless, and bathed in natural California light',                         timeOfDay: 'golden California afternoon' },
  'Canyon 2100':          { adjective: 'Southwestern canyon residence',          material: 'rammed earth walls, adobe plaster, terracotta tile accents, and desert stone',                                     mood: 'earthy, strong, and sun-warmed',                                                   timeOfDay: 'golden desert hour' },
  'Coastal 2000':         { adjective: 'coastal modern residence',               material: 'board-and-batten with clean modern lines, painted cedar, and salt-air-rated hardware',                             mood: 'crisp, refined, and intimately connected to the sea',                              timeOfDay: 'bright coastal noon' },
  'Harbor 1900':          { adjective: 'coastal shingle residence',              material: 'cedar shingle, painted trim, deep eaves, and classic harbor-town detailing',                                       mood: 'settled, earned, and gracefully weathered by salt air',                            timeOfDay: 'soft coastal morning light' },
  'Heritage 2300':        { adjective: 'American heritage residence',            material: 'hand-laid brick, limestone quoins, painted millwork, and slate accents',                                           mood: 'dignified, heritage-proud, and built to be passed down',                           timeOfDay: 'soft morning light' },
  'Lone Star 2100':       { adjective: 'Texas Hill Country residence',           material: 'native limestone, reclaimed cedar, metal roof, and wide covered porches',                                          mood: 'strong, rooted, family-first, and built for the land',                             timeOfDay: 'warm Texas golden hour' },
  'Magnolia 2200':        { adjective: 'Southern magnolia residence',            material: 'painted columns, shiplap siding, wide veranda, and traditional millwork',                                          mood: 'gracious, settled, and rooted in Southern hospitality',                            timeOfDay: 'soft Southern afternoon' },
  'Magnolia 2400':        { adjective: 'Southern magnolia estate residence',     material: 'wide painted columns, extended porch, shiplap and millwork, and traditional proportions',                          mood: 'graceful, unhurried, and deeply Southern',                                         timeOfDay: 'warm afternoon light' },
  'Mesa 1800':            { adjective: 'Southwest mesa residence',               material: 'adobe-finish plaster, rammed earth palette, terracotta tile, and hand-forged iron details',                        mood: 'earthy, sun-soaked, and quietly powerful',                                         timeOfDay: 'warm desert afternoon' },
  'Oakmont 2600':         { adjective: 'English family estate',                  material: 'oak millwork, plaster render, bay windows, and traditional masonry with mature garden',                            mood: 'timeless, settled, and quietly classical',                                         timeOfDay: 'soft overcast morning light' },
  'Prairie 2000':         { adjective: 'prairie family residence',               material: 'horizontal cedar, fieldstone base, wide-span roofline, and native plantings',                                     mood: 'grounded, open, and deeply connected to the land',                                 timeOfDay: 'clear prairie morning light' },
  'Summit 2200':          { adjective: 'mountain family residence',              material: 'dark timber, stacked stone, standing seam metal roof, and triple-glazed windows',                                  mood: 'rugged, warm, and powerfully rooted in the mountain landscape',                    timeOfDay: 'golden alpenglow' },
  'Velocity 2400':        { adjective: 'high-performance family residence',      material: 'board-formed concrete, dark steel, floor-to-ceiling glass, and precision surfaces',                               mood: 'precise, energetic, and built for those who live at the apex',                     timeOfDay: 'dramatic dusk' },
  // ── Executive Series ────────────────────────────────────────────────────
  'Aegean Estate':        { adjective: 'Aegean island estate',                   material: 'whitewashed plaster, local stone, driftwood timber, and deep-set arched openings',                                mood: 'sun-bleached, breezy, and effortlessly elegant',                                   timeOfDay: 'bright midday Mediterranean sun' },
  'Alpine Estate':        { adjective: 'alpine estate',                          material: 'rough-hewn timber, stacked stone, standing seam metal roof, and triple-glazed windows',                            mood: 'rugged, warm, and powerfully connected to the mountain landscape',                 timeOfDay: 'golden alpenglow' },
  'Creator Estate':       { adjective: 'creator estate',                         material: 'rich walnut, acoustic limestone panels, dramatic archways, and custom lighting installations',                     mood: 'celebratory, alive with creative purpose, and built for those who make things',    timeOfDay: 'golden evening with warm interior glow' },
  'Fjord 3800':           { adjective: 'Norwegian fjord estate',                 material: 'dark charred timber, slate cladding, cantilevered glass walls over water, and raw concrete',                      mood: 'dramatic, elemental, and deeply connected to the northern landscape',              timeOfDay: 'dramatic Nordic dusk' },
  'French Provence':      { adjective: 'French Provençal estate',               material: 'natural limestone, terracotta tile, aged oak, and iron-forged hardware',                                           mood: 'unhurried, gracious, and deeply connected to the land',                            timeOfDay: 'warm afternoon light' },
  'The Lotus':            { adjective: 'Vastu-aligned Indian estate',            material: 'sandstone, hand-carved teak, lotus-pond water features, and terracotta accents',                                  mood: 'harmonious, prosperous, and deeply rooted in ancient design wisdom',               timeOfDay: 'warm afternoon light' },
  'Mediterranean Estate': { adjective: 'Mediterranean estate',                   material: 'terracotta roof tile, smooth plaster, and iron-forged details',                                                   mood: 'sun-drenched, romantic, and richly textured',                                      timeOfDay: 'late afternoon golden sun' },
  'Moroccan Riad':        { adjective: 'Moroccan riad estate',                   material: 'zellige tile, tadelakt plaster, carved cedar, and hand-forged brass lanterns',                                    mood: 'layered, sensory, hospitable, and richly ornamented',                              timeOfDay: 'warm lantern evening light' },
  'Nordic Estate':        { adjective: 'Nordic estate',                          material: 'white-painted timber, dark steel, natural birch, and textured render',                                            mood: 'hygge warmth, honest simplicity, and enduring calm',                               timeOfDay: 'soft northern light' },
  'Stillwater 3600':      { adjective: 'lakeside stillwater estate',             material: 'board-formed concrete, warm timber, full-height glass facing water, and fieldstone accents',                      mood: 'serene, contemplative, and uninterrupted by the outside world',                    timeOfDay: 'soft overcast noon with water reflection' },
  'The Banyan':           { adjective: 'multigenerational Banyan estate',        material: 'natural stone, warm timber, deep-shaded verandas, and lush courtyard gardens',                                    mood: 'rooted, connected, and built for every generation to thrive together',             timeOfDay: 'warm late afternoon' },
  'The Hearth':           { adjective: 'agrarian hearth estate',                 material: 'white-painted board and batten, black steel windows, reclaimed timber, and stone fireplace',                      mood: 'rooted, honest, and quietly beautiful',                                            timeOfDay: 'clear morning light' },
  'Hill Country':         { adjective: 'Texas Hill Country estate',              material: 'native limestone, reclaimed cedar, metal roof, and wide covered porches',                                          mood: 'strong, rooted, family-first, and built for the land',                             timeOfDay: 'warm Texas golden hour' },
  'The Patriot':          { adjective: 'American legacy estate',                 material: 'red brick, white-painted millwork, slate roof, and mature tree canopy',                                           mood: 'dignified, heritage-proud, and built for freedom and family',                      timeOfDay: 'soft morning light' },
  'Villa 4200':           { adjective: 'Italian villa estate',                   material: 'warm travertine, arched loggias, terracotta accents, cypress allée, and iron-forged gates',                      mood: 'gracious, timeless, and built for a life fully lived',                             timeOfDay: 'warm golden afternoon' },
  'Wabi-Sabi':            { adjective: 'wabi-sabi Japanese estate',              material: 'aged timber, rammed earth, natural stone, and shoji-inspired glazing',                                            mood: 'quietly imperfect, deeply calming, and timeless',                                  timeOfDay: 'soft overcast morning light' },
  'Cars & Coffee':        { adjective: 'cars and coffee estate',                 material: 'warm stone, drive-thru porte-cochère, lounge timber, and barista-grade finishes',                                mood: 'convivial, passionate, and built for weekends with good cars and good people',     timeOfDay: 'crisp weekend morning light' },
  // ── Legacy Series ────────────────────────────────────────────────────────
  "Collector's Compound": { adjective: 'automotive collector compound',          material: 'polished concrete, museum-grade lighting, dark steel, secured vaults, and climate-controlled glass',              mood: 'precise, fortified, and built around what matters most',                           timeOfDay: 'dramatic evening showroom light' },
  'The Crooner':          { adjective: 'entertainer legacy estate',              material: 'rich walnut, acoustic limestone, dramatic archways, and custom lighting installations',                            mood: 'celebratory, warm, and alive with the spirit of gathering',                        timeOfDay: 'golden evening with warm interior glow' },
  'Dynasty Studio':       { adjective: 'dynasty legacy estate',                  material: 'rich dark timber, limestone, bespoke millwork, and dramatic lighting',                                            mood: 'ambitious, purposeful, and built to be passed down',                               timeOfDay: 'dramatic evening light' },
  'Future-Proof':         { adjective: 'resilience-first legacy estate',         material: 'board-formed concrete, storm-rated glass, solar arrays, and integrated self-sufficient systems',                  mood: 'powerful, fortress-like, and built for whatever comes next',                       timeOfDay: 'dramatic dusk' },
  'Little Drivers':       { adjective: 'next-generation automotive estate',      material: 'warm timber, polished concrete, safety-grade surfaces, and purpose-built training spaces',                        mood: 'inspiring, nurturing, and built to grow a lifelong passion',                       timeOfDay: 'bright energetic morning light' },
  'Maharaja Estate':      { adjective: 'South Asian palace estate',              material: 'marble inlay, hand-carved sandstone, gilded lattice screens, and ornate ironwork',                               mood: 'regal, commanding, and built for generations of legacy',                           timeOfDay: 'dramatic golden dusk' },
  'The Overland':         { adjective: 'overland adventure compound',            material: 'rugged stone, corrugated steel, reclaimed timber, and industrial-grade workshop finishes',                        mood: 'capable, self-reliant, and always ready for the next adventure',                   timeOfDay: 'golden pre-dawn departure light' },
  'Stealth Wealth II':    { adjective: 'quiet luxury legacy estate',             material: 'hand-selected limestone, aged oak, unlacquered brass, and custom plaster at monumental scale',                   mood: 'impeccably restrained, deeply crafted, and quietly extraordinary',                 timeOfDay: 'soft overcast afternoon' },
  'Bahay Legacy':         { adjective: 'Filipino heritage legacy estate',        material: 'native hardwoods, woven capiz shell, volcanic stone, and wide covered lanais',                                   mood: 'warm, communal, deeply family-rooted, and graciously hospitable',                  timeOfDay: 'golden tropical afternoon' },
  'The Banyan Estate':    { adjective: 'multigenerational Banyan compound',      material: 'natural stone, warm timber, expansive courtyard gardens, and deep-shaded verandas',                              mood: 'rooted for every generation, deeply connected, and built for the long arc of family life', timeOfDay: 'warm late afternoon' },
  'Desert Oasis':         { adjective: 'desert oasis estate',                    material: 'thermal mass adobe, rammed earth walls, courtyard pool, and wildfire-resistant concrete shell',                  mood: 'contemplative, cool against the desert heat, and a true sanctuary',                timeOfDay: 'dramatic desert dusk' },
  'The Homestead':        { adjective: 'agrarian homestead estate',              material: 'white board and batten, stone foundation, timber barn framing, and orchard-edged grounds',                       mood: 'rooted, self-reliant, and built for the rhythms of agrarian family life',           timeOfDay: 'clear golden morning' },
  'The Homestead II':     { adjective: 'expanded agrarian compound',             material: 'white board and batten, stone foundation, working barn, and multi-structure agrarian campus',                    mood: 'industrious, deeply beautiful, and built for a life lived close to the land',       timeOfDay: 'golden harvest morning' },
  'The Regency':          { adjective: 'European manor estate',                  material: 'limestone ashlar, mullioned windows, formal parterre gardens, and carved stone balustrade',                       mood: 'grand, timeless, and built for the enduring legacy of an exceptional family',       timeOfDay: 'soft grey European morning' },
  'The Sanctuary':        { adjective: 'wellness legacy estate',                 material: 'natural stone, glass walls integrating the landscape, spa-grade finishes, and restorative garden design',        mood: 'serene, restorative, and built around the practice of living well',                timeOfDay: 'soft overcast golden noon' },
  'The Sporting Estate':  { adjective: 'sporting estate',                        material: 'clean limestone, crisp glass, sport courts, trail network, and active outdoor programming',                      mood: 'energetic, purposeful, and built for the family that lives fully',                 timeOfDay: 'bright active afternoon' },
}

function inferTier(data: EstateFormData): 'cottage' | 'signature' | 'executive' | 'legacy' {
  const sf = data.squareFootage
  if (sf === '1,200–1,800') return 'cottage'
  if (sf === '1,800–3,000') return 'signature'
  if (sf === '3,000–4,500') return 'executive'
  if (sf === '4,500–8,000+') return 'legacy'
  return 'executive'
}

function pickEstateName(data: EstateFormData): { name: string; monogram: string } {
  const style = data.aestheticStyle
  const names: Record<string, { name: string; monogram: string }> = {
    // Legacy style keys
    'Modern Organic':                  { name: 'The Verdant Residence',        monogram: 'VR'  },
    'Traditional / Classic':           { name: 'The Ashwood Estate',           monogram: 'AE'  },
    'Mediterranean / Spanish':         { name: 'La Casa Dorada',               monogram: 'LCD' },
    'Farmhouse / Agrarian':            { name: 'The Harvest House',            monogram: 'HH'  },
    'Minimalist / Contemporary':       { name: 'The Limen Estate',             monogram: 'LE'  },
    'Wabi-Sabi / Japanese':            { name: 'The Wabi Residence',           monogram: 'WR'  },
    'Alpine / Mountain':               { name: 'The Ridge Estate',             monogram: 'RE'  },
    'Scandinavian / Nordic':           { name: 'The Nordic House',             monogram: 'NH'  },
    'French Countryside':              { name: 'Domaine du Soleil',            monogram: 'DS'  },
    'Moroccan / Riad':                 { name: 'The Riad Residence',           monogram: 'RR'  },
    'Greek / Aegean':                  { name: 'The Aegean House',             monogram: 'AH'  },
    'Tropical Modern':                 { name: 'The Palm Estate',              monogram: 'PE'  },
    'Vastu / Indian':                  { name: 'The Lotus Estate',             monogram: 'LE'  },
    'Maharaja / South Asian':          { name: 'The Maharaja Residence',       monogram: 'MR'  },
    'Feng Shui / Chinese':             { name: 'The Dragon Estate',            monogram: 'DE'  },
    'Filipino / Bahay Legacy':         { name: 'The Bahay Legacy',             monogram: 'BL'  },
    'Multigenerational / Banyan':      { name: 'The Banyan Estate',            monogram: 'BE'  },
    'Dynasty / Legacy Builder':        { name: 'The Dynasty Estate',           monogram: 'DY'  },
    'Music & Entertainment':           { name: "The Crooner's Residence",      monogram: 'CR'  },
    'Stealth Wealth':                  { name: 'The Steward Estate',           monogram: 'SE'  },
    'Texas Hill Country':              { name: 'The Hill Country House',       monogram: 'HC'  },
    'American / Patriot':              { name: 'The Patriot Estate',           monogram: 'PE'  },
    'Celestial / Cosmic':              { name: 'The Celestial Estate',         monogram: 'CE'  },
    'Car Vault / Collector':           { name: 'The Car Vault Residence',      monogram: 'CV'  },
    'Executive Motor Court':           { name: 'The Motor Court Estate',       monogram: 'MC'  },
    'Overland / Adventure Homestead':  { name: 'The Overland Homestead',       monogram: 'OH'  },
    'Backyard Track House':            { name: 'The Track House',              monogram: 'TH'  },
    "Little Drivers' House":           { name: "The Little Drivers' House",    monogram: 'LD'  },
    'Weekend Cars & Coffee':           { name: 'The Cars & Coffee House',      monogram: 'CC'  },
    // Cottage Series
    'Banyan 1600':                     { name: 'The Banyan Cottage',           monogram: 'BC'  },
    'Canyon 1500':                     { name: 'Canyon Cottage',               monogram: 'CC'  },
    'Cedar 1800':                      { name: 'The Cedar House',              monogram: 'CH'  },
    'Coastal 1600':                    { name: 'The Coastal Cottage',          monogram: 'CC'  },
    'Hearth 1800':                     { name: 'The Hearth Cottage',           monogram: 'HC'  },
    'Magnolia 1800 Cottage':           { name: 'The Magnolia House',           monogram: 'MH'  },
    'Oakmont 1800 Cottage':            { name: 'Oakmont Cottage',              monogram: 'OC'  },
    'Prairie 1600':                    { name: 'Prairie House',                monogram: 'PH'  },
    'Summit 1800':                     { name: 'The Summit Cottage',           monogram: 'SC'  },
    'Velocity 1500':                   { name: 'The Velocity House',           monogram: 'VH'  },
    // Signature Series
    'Aspen 2800':                      { name: 'The Aspen Residence',          monogram: 'AR'  },
    'Banyan 2600':                     { name: 'The Banyan Residence',         monogram: 'BR'  },
    'California 2000':                 { name: 'The California House',         monogram: 'CH'  },
    'Canyon 2100':                     { name: 'The Canyon Residence',         monogram: 'CR'  },
    'Coastal 2000':                    { name: 'The Coastal Residence',        monogram: 'CR'  },
    'Harbor 1900':                     { name: 'The Harbor House',             monogram: 'HH'  },
    'Heritage 2300':                   { name: 'The Heritage Residence',       monogram: 'HR'  },
    'Lone Star 2100':                  { name: 'The Lone Star',                monogram: 'LS'  },
    'Magnolia 2200':                   { name: 'The Magnolia Residence',       monogram: 'MR'  },
    'Magnolia 2400':                   { name: 'Magnolia House',               monogram: 'MH'  },
    'Mesa 1800':                       { name: 'The Mesa House',               monogram: 'MH'  },
    'Oakmont 2600':                    { name: 'The Oakmont',                  monogram: 'OA'  },
    'Prairie 2000':                    { name: 'The Prairie House',            monogram: 'PH'  },
    'Summit 2200':                     { name: 'The Summit Residence',         monogram: 'SR'  },
    'Velocity 2400':                   { name: 'The Velocity Residence',       monogram: 'VR'  },
    // Executive Series
    'Aegean Estate':                   { name: 'The Aegean Estate',            monogram: 'AE'  },
    'Alpine Estate':                   { name: 'The Alpine Estate',            monogram: 'AE'  },
    'Car Vault':                       { name: 'The Car Vault Estate',         monogram: 'CV'  },
    'Creator Estate':                  { name: 'The Creator Estate',           monogram: 'CE'  },
    'Fjord 3800':                      { name: 'Fjord House',                  monogram: 'FH'  },
    'French Provence':                 { name: 'Domaine Provençal',            monogram: 'DP'  },
    'The Lotus':                       { name: 'The Lotus Estate',             monogram: 'LE'  },
    'Mediterranean Estate':            { name: 'La Villa Dorada',              monogram: 'VD'  },
    'Moroccan Riad':                   { name: 'The Riad Estate',              monogram: 'RE'  },
    'Nordic Estate':                   { name: 'The Nordic Estate',            monogram: 'NE'  },
    'Stillwater 3600':                 { name: 'Stillwater House',             monogram: 'SW'  },
    'The Banyan':                      { name: 'The Banyan',                   monogram: 'TB'  },
    'The Hearth':                      { name: 'The Hearth Estate',            monogram: 'HE'  },
    'Hill Country':                    { name: 'The Hill Country Estate',      monogram: 'HC'  },
    'The Patriot':                     { name: 'The Patriot Estate',           monogram: 'PE'  },
    'Villa 4200':                      { name: 'Villa Dorata',                 monogram: 'VD'  },
    'Wabi-Sabi':                       { name: 'The Wabi Estate',              monogram: 'WE'  },
    'Cars & Coffee':                   { name: 'The Cars & Coffee Estate',     monogram: 'CC'  },
    // Legacy Series
    "Collector's Compound":            { name: "The Collector's Compound",     monogram: 'CC'  },
    'The Crooner':                     { name: 'The Crooner Estate',           monogram: 'CE'  },
    'Dynasty Studio':                  { name: 'The Dynasty',                  monogram: 'DY'  },
    'Future-Proof':                    { name: 'The Fortress Estate',          monogram: 'FE'  },
    'Little Drivers':                  { name: "The Little Drivers' Estate",   monogram: 'LD'  },
    'Maharaja Estate':                 { name: 'The Maharaja Estate',          monogram: 'ME'  },
    'The Overland':                    { name: 'The Overland Estate',          monogram: 'OE'  },
    'Stealth Wealth II':               { name: 'The Steward Legacy',           monogram: 'SL'  },
    'Bahay Legacy':                    { name: 'The Bahay Legacy',             monogram: 'BL'  },
    'The Banyan Estate':               { name: 'The Banyan Estate',            monogram: 'BE'  },
    'Desert Oasis':                    { name: 'The Oasis Estate',             monogram: 'OE'  },
    'The Homestead':                   { name: 'The Homestead',                monogram: 'HS'  },
    'The Homestead II':                { name: 'The Homestead Compound',       monogram: 'HC'  },
    'The Regency':                     { name: 'The Regency',                  monogram: 'RG'  },
    'The Sanctuary':                   { name: 'The Sanctuary',                monogram: 'TS'  },
    'The Sporting Estate':             { name: 'The Sporting Estate',          monogram: 'SE'  },
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

// ── Aesthetic-specific floor programs ──────────────────────────────────────
// For aesthetics whose room program fundamentally differs from a standard home.
// Each entry can override any combination of floors. Absent floors fall back to tier defaults.
const AESTHETIC_PROGRAMS: Record<string, {
  main?:     FloorZone[]
  upper?:    FloorZone[]
  wellness?: FloorZone[]
  site?:     FloorZone[]
}> = {
  'Car Vault': {
    main: [
      { id: 'entry',    name: 'Entry Foyer',              category: 'living',   size: 'md' },
      { id: 'showroom', name: "Collector's Showroom",     category: 'living',   size: 'xl' },
      { id: 'vault',    name: 'Climate-Controlled Vault', category: 'utility',  size: 'xl' },
      { id: 'lift',     name: 'Car Lift Bay',             category: 'utility',  size: 'lg' },
      { id: 'workshop', name: 'Workshop',                 category: 'work',     size: 'lg' },
      { id: 'detail',   name: 'Detail Bay',               category: 'utility',  size: 'md' },
      { id: 'lounge',   name: "Owner's Lounge",           category: 'living',   size: 'lg' },
      { id: 'primary',  name: 'Primary Suite',            category: 'suite',    size: 'xl' },
      { id: 'terrace',  name: 'Covered Terrace',          category: 'outdoor',  size: 'md' },
    ],
    upper: [
      { id: 'dressing', name: 'Dressing Room',            category: 'suite',    size: 'md' },
      { id: 'guest',    name: 'Guest Suite',              category: 'guest',    size: 'lg' },
      { id: 'reading',  name: 'Reading Nook',             category: 'living',   size: 'sm' },
      { id: 'mezzanine',name: 'Mezzanine Overlook',       category: 'living',   size: 'lg' },
    ],
    wellness: [
      { id: 'theater',  name: 'Home Theater',             category: 'living',   size: 'xl' },
      { id: 'bar',      name: 'Bar Lounge',               category: 'living',   size: 'lg' },
      { id: 'trophy',   name: 'Trophy Room',              category: 'work',     size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '6-Car Garage',       category: 'utility',  size: 'xl' },
      { id: 'wash-bay',       name: 'Car Wash Bay',       category: 'utility',  size: 'md' },
      { id: 'service-drive',  name: 'Service Drive',      category: 'outdoor',  size: 'md' },
      { id: 'display-court',  name: 'Display Court',      category: 'outdoor',  size: 'lg' },
    ],
  },
  "Collector's Compound": {
    main: [
      { id: 'entry',    name: 'Secured Entry Vestibule',  category: 'living',   size: 'md' },
      { id: 'showroom', name: "Collector's Gallery",      category: 'living',   size: 'xl' },
      { id: 'vault1',   name: 'Primary Vault',            category: 'utility',  size: 'xl' },
      { id: 'vault2',   name: 'Secondary Vault',          category: 'utility',  size: 'lg' },
      { id: 'workshop', name: 'Restoration Workshop',     category: 'work',     size: 'lg' },
      { id: 'lift',     name: 'Car Lift Bays × 4',       category: 'utility',  size: 'xl' },
      { id: 'lounge',   name: 'Collector Lounge',         category: 'living',   size: 'lg' },
      { id: 'primary',  name: 'Primary Suite',            category: 'suite',    size: 'xl' },
    ],
    upper: [
      { id: 'command',  name: 'Command Center',           category: 'work',     size: 'lg' },
      { id: 'guest',    name: 'Guest Suite',              category: 'guest',    size: 'lg' },
      { id: 'library',  name: 'Reference Library',        category: 'work',     size: 'md' },
      { id: 'mezzanine',name: 'Gallery Mezzanine',        category: 'living',   size: 'lg' },
    ],
    wellness: [
      { id: 'theater',  name: 'Private Theater',          category: 'living',   size: 'xl' },
      { id: 'trophy',   name: 'Trophy & Archive Room',    category: 'work',     size: 'lg' },
      { id: 'safe',     name: 'Safe Room',                category: 'utility',  size: 'sm' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Secured Motor Court',category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '8+ Car Compound',    category: 'utility',  size: 'xl' },
      { id: 'service-drive',  name: 'Service Drive',      category: 'outdoor',  size: 'lg' },
      { id: 'perimeter',      name: 'Perimeter Security', category: 'utility',  size: 'lg' },
    ],
  },
  'Cars & Coffee': {
    main: [
      { id: 'entry',       name: 'Entry Foyer',           category: 'living',   size: 'md' },
      { id: 'cochere',     name: 'Drive-Through Porte-Cochère', category: 'outdoor', size: 'lg' },
      { id: 'display',     name: 'Car Display Court',     category: 'outdoor',  size: 'xl' },
      { id: 'lounge',      name: 'Coffee Lounge',         category: 'living',   size: 'xl' },
      { id: 'barista',     name: 'Barista Bar',           category: 'kitchen',  size: 'md' },
      { id: 'great-room',  name: 'Great Room',            category: 'living',   size: 'lg' },
      { id: 'kitchen',     name: "Chef's Kitchen",        category: 'kitchen',  size: 'lg' },
      { id: 'primary',     name: 'Primary Suite',         category: 'suite',    size: 'xl' },
      { id: 'terrace',     name: 'Show Terrace',          category: 'outdoor',  size: 'lg' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'cochere',        name: 'Porte-Cochère',      category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
      { id: 'display-court',  name: 'Display & Event Court', category: 'outdoor', size: 'xl' },
      { id: 'overflow',       name: 'Guest Parking',      category: 'outdoor',  size: 'lg' },
    ],
  },
  'Backyard Track House': {
    main: [
      { id: 'entry',     name: 'Entry',                   category: 'living',   size: 'sm' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: 'Kitchen',                 category: 'kitchen',  size: 'lg' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'paddock',   name: 'Paddock Lounge',          category: 'living',   size: 'lg' },
      { id: 'prep',      name: 'Track Prep Bay',          category: 'utility',  size: 'lg' },
      { id: 'gear',      name: 'Gear & Suit Storage',     category: 'utility',  size: 'md' },
      { id: 'terrace',   name: 'Track View Terrace',      category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'timing',    name: 'Timing Booth & Overlook', category: 'work',     size: 'lg' },
      { id: 'guest',     name: 'Guest Suite',             category: 'guest',    size: 'lg' },
      { id: 'reading',   name: 'Reading Nook',            category: 'living',   size: 'sm' },
    ],
    wellness: [
      { id: 'simulator', name: 'Race Simulator Room',     category: 'wellness', size: 'xl' },
      { id: 'gym',       name: 'Athlete Fitness Studio',  category: 'wellness', size: 'lg' },
      { id: 'recovery',  name: 'Recovery Room',           category: 'wellness', size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'track',          name: 'Private Track',      category: 'outdoor',  size: 'xl' },
      { id: 'paddock-site',   name: 'Paddock',            category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
      { id: 'pit',            name: 'Pit Lane',           category: 'outdoor',  size: 'lg' },
    ],
  },
  'Little Drivers': {
    main: [
      { id: 'entry',     name: 'Entry',                   category: 'living',   size: 'sm' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'lg' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'training',  name: 'Training Lounge',         category: 'work',     size: 'lg' },
      { id: 'prep',      name: 'Kart Prep Bay',           category: 'utility',  size: 'lg' },
      { id: 'terrace',   name: 'Viewing Terrace',         category: 'outdoor',  size: 'lg' },
    ],
    wellness: [
      { id: 'simulator', name: 'Race Simulator',          category: 'wellness', size: 'xl' },
      { id: 'gym',       name: 'Youth Athletic Studio',   category: 'wellness', size: 'lg' },
      { id: 'trophy',    name: 'Trophy Room',             category: 'work',     size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'kart-track',     name: 'Junior Karting Track', category: 'outdoor', size: 'xl' },
      { id: 'paddock',        name: 'Kart Paddock',       category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
    ],
  },
  'The Crooner': {
    main: [
      { id: 'entry',     name: 'Grand Entry Foyer',       category: 'living',   size: 'lg' },
      { id: 'great-room',name: 'Great Hall',              category: 'living',   size: 'xl' },
      { id: 'studio',    name: 'Recording Studio',        category: 'work',     size: 'xl' },
      { id: 'lounge',    name: 'Performance Lounge',      category: 'living',   size: 'xl' },
      { id: 'dining',    name: 'Dining Room',             category: 'living',   size: 'lg' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'primary',   name: 'Primary Suite Wing',      category: 'suite',    size: 'xl' },
      { id: 'guest',     name: 'Guest Suite',             category: 'guest',    size: 'lg' },
      { id: 'terrace',   name: 'Covered Terrace',         category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'mixing',    name: 'Mixing Suite / Producer Loft', category: 'work', size: 'lg' },
      { id: 'family',    name: 'Family Lounge',           category: 'living',   size: 'lg' },
      { id: 'guest-2',   name: 'Guest Suite 2',           category: 'guest',    size: 'lg' },
      { id: 'dressing',  name: 'Dressing Room',           category: 'suite',    size: 'md' },
    ],
    wellness: [
      { id: 'rehearsal', name: 'Rehearsal Room',          category: 'wellness', size: 'xl' },
      { id: 'instrument',name: 'Instrument Vault',        category: 'utility',  size: 'lg' },
      { id: 'wine',      name: 'Wine Room',               category: 'living',   size: 'md' },
      { id: 'media',     name: 'Media Lounge',            category: 'living',   size: 'xl' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
      { id: 'amphitheater',   name: 'Outdoor Amphitheater', category: 'outdoor', size: 'xl' },
      { id: 'pool-site',      name: 'Pool & Spa',         category: 'wellness', size: 'lg' },
    ],
  },
  'Creator Estate': {
    main: [
      { id: 'entry',     name: 'Entry Foyer',             category: 'living',   size: 'md' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'studio',    name: 'Content Studio',          category: 'work',     size: 'xl' },
      { id: 'podcast',   name: 'Podcast / Broadcast Suite', category: 'work',   size: 'lg' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'scullery',  name: 'Scullery',                category: 'kitchen',  size: 'md' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'office',    name: "Founder's Office",        category: 'work',     size: 'lg' },
      { id: 'terrace',   name: 'Covered Terrace',         category: 'outdoor',  size: 'lg' },
    ],
    wellness: [
      { id: 'editing',   name: 'Editing Suite',           category: 'work',     size: 'xl' },
      { id: 'gym',       name: 'Fitness Studio',          category: 'wellness', size: 'lg' },
      { id: 'media',     name: 'Screening Lounge',        category: 'living',   size: 'xl' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
  },
  'The Sanctuary': {
    main: [
      { id: 'entry',       name: 'Entry Foyer',           category: 'living',   size: 'md' },
      { id: 'great-room',  name: 'Great Room',            category: 'living',   size: 'xl' },
      { id: 'dining',      name: 'Dining Room',           category: 'living',   size: 'lg' },
      { id: 'kitchen',     name: "Chef's Kitchen",        category: 'kitchen',  size: 'xl' },
      { id: 'primary',     name: 'Primary Suite Wing',    category: 'suite',    size: 'xl' },
      { id: 'meditation',  name: 'Meditation Pavilion',   category: 'wellness', size: 'lg' },
      { id: 'yoga',        name: 'Yoga & Movement Studio',category: 'wellness', size: 'lg' },
      { id: 'terrace',     name: 'Covered Terrace',       category: 'outdoor',  size: 'xl' },
      { id: 'fire',        name: 'Fire Lounge',           category: 'outdoor',  size: 'md' },
    ],
    upper: [
      { id: 'reading',     name: 'Reading Retreat',       category: 'living',   size: 'md' },
      { id: 'guest-1',     name: 'Guest Suite 1',         category: 'guest',    size: 'lg' },
      { id: 'guest-2',     name: 'Guest Suite 2',         category: 'guest',    size: 'lg' },
      { id: 'dressing',    name: 'Dressing Suite',        category: 'suite',    size: 'lg' },
      { id: 'open-below',  name: 'Open to Below',         category: 'living',   size: 'md' },
    ],
    wellness: [
      { id: 'spa',         name: 'Full Spa Suite',        category: 'wellness', size: 'xl' },
      { id: 'hydro',       name: 'Hydrotherapy Pool',     category: 'wellness', size: 'lg' },
      { id: 'sauna',       name: 'Infrared Sauna',        category: 'wellness', size: 'md' },
      { id: 'cold-plunge', name: 'Cold Plunge',           category: 'wellness', size: 'sm' },
      { id: 'meditation',  name: 'Meditation Room',       category: 'wellness', size: 'md' },
      { id: 'sound',       name: 'Sound Healing Room',    category: 'wellness', size: 'md' },
      { id: 'wine',        name: 'Wine Room',             category: 'living',   size: 'md' },
      { id: 'mechanical',  name: 'Mechanical / Storage',  category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'pool-site',      name: 'Pool & Spa',         category: 'wellness', size: 'xl' },
      { id: 'reflection',     name: 'Reflection Garden',  category: 'outdoor',  size: 'lg' },
      { id: 'labyrinth',      name: 'Garden Labyrinth',   category: 'outdoor',  size: 'lg' },
      { id: 'orchard',        name: 'Orchard',            category: 'outdoor',  size: 'lg' },
      { id: 'garden',         name: 'Kitchen Gardens',    category: 'outdoor',  size: 'md' },
      { id: 'trails',         name: 'Walking Trails',     category: 'outdoor',  size: 'lg' },
    ],
  },
  'The Homestead': {
    main: [
      { id: 'entry',     name: 'Entry',                   category: 'living',   size: 'sm' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: 'Farmhouse Kitchen',       category: 'kitchen',  size: 'xl' },
      { id: 'larder',    name: 'Larder & Pantry',         category: 'kitchen',  size: 'md' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'guest',     name: 'Guest Suite',             category: 'guest',    size: 'lg' },
      { id: 'mudroom',   name: 'Mudroom & Boot Room',     category: 'utility',  size: 'lg' },
      { id: 'porch',     name: 'Covered Porch',           category: 'outdoor',  size: 'xl' },
    ],
    wellness: [
      { id: 'root',      name: 'Root Cellar',             category: 'utility',  size: 'md' },
      { id: 'canning',   name: 'Canning & Preserving Room', category: 'utility', size: 'md' },
      { id: 'wine',      name: 'Wine Room',               category: 'living',   size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'barn',           name: 'Working Barn',       category: 'utility',  size: 'xl' },
      { id: 'greenhouse',     name: 'Greenhouse',         category: 'outdoor',  size: 'lg' },
      { id: 'tool-storage',   name: 'Tool & Equipment Storage', category: 'utility', size: 'md' },
      { id: 'garden',         name: 'Kitchen Gardens',    category: 'outdoor',  size: 'lg' },
      { id: 'orchard',        name: 'Orchard',            category: 'outdoor',  size: 'xl' },
      { id: 'garage',         name: '2-Car Garage',       category: 'utility',  size: 'md' },
    ],
  },
  'The Homestead II': {
    main: [
      { id: 'entry',     name: 'Entry',                   category: 'living',   size: 'sm' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: 'Farmhouse Kitchen',       category: 'kitchen',  size: 'xl' },
      { id: 'larder',    name: 'Larder & Pantry',         category: 'kitchen',  size: 'md' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'guest',     name: 'Guest Suite',             category: 'guest',    size: 'lg' },
      { id: 'office',    name: 'Farm Office',             category: 'work',     size: 'md' },
      { id: 'mudroom',   name: 'Mudroom & Boot Room',     category: 'utility',  size: 'lg' },
      { id: 'porch',     name: 'Covered Porch',           category: 'outdoor',  size: 'xl' },
    ],
    wellness: [
      { id: 'root',      name: 'Root Cellar',             category: 'utility',  size: 'md' },
      { id: 'canning',   name: 'Canning & Preserving Room', category: 'utility', size: 'md' },
      { id: 'smoke',     name: 'Smokehouse',              category: 'utility',  size: 'sm' },
      { id: 'wine',      name: 'Wine Room',               category: 'living',   size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'barn',           name: 'Working Barn',       category: 'utility',  size: 'xl' },
      { id: 'workshop',       name: 'Workshop',           category: 'utility',  size: 'lg' },
      { id: 'greenhouse',     name: 'Greenhouse',         category: 'outdoor',  size: 'lg' },
      { id: 'animal-barn',    name: 'Animal Barn',        category: 'utility',  size: 'lg' },
      { id: 'garden',         name: 'Kitchen Gardens',    category: 'outdoor',  size: 'lg' },
      { id: 'orchard',        name: 'Orchard',            category: 'outdoor',  size: 'xl' },
      { id: 'pasture',        name: 'Pasture',            category: 'outdoor',  size: 'xl' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
    ],
  },
  'Desert Oasis': {
    main: [
      { id: 'entry',     name: 'Entry Courtyard',         category: 'outdoor',  size: 'lg' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'dining',    name: 'Formal Dining Room',      category: 'living',   size: 'lg' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'primary',   name: 'Primary Suite Wing',      category: 'suite',    size: 'xl' },
      { id: 'guest',     name: 'Guest Suite',             category: 'guest',    size: 'lg' },
      { id: 'shade',     name: 'Shade Pavilion',          category: 'outdoor',  size: 'lg' },
      { id: 'courtyard', name: 'Courtyard Pool Terrace',  category: 'outdoor',  size: 'xl' },
    ],
    upper: [
      { id: 'dressing',  name: 'Dressing Suite',          category: 'suite',    size: 'lg' },
      { id: 'guest-2',   name: 'Guest Suite 2',           category: 'guest',    size: 'lg' },
      { id: 'breezeway', name: 'Open Breezeway',          category: 'outdoor',  size: 'md' },
    ],
    wellness: [
      { id: 'hammam',    name: 'Hammam',                  category: 'wellness', size: 'lg' },
      { id: 'meditation',name: 'Meditation Room',         category: 'wellness', size: 'md' },
      { id: 'wine',      name: 'Wine Room',               category: 'living',   size: 'md' },
      { id: 'media',     name: 'Media Lounge',            category: 'living',   size: 'xl' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'walled-court',   name: 'Walled Courtyard',   category: 'outdoor',  size: 'xl' },
      { id: 'pool-site',      name: 'Pool & Spa',         category: 'wellness', size: 'xl' },
      { id: 'desert-garden',  name: 'Desert Garden',      category: 'outdoor',  size: 'lg' },
      { id: 'fire-site',      name: 'Fire Lounge',        category: 'outdoor',  size: 'md' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
    ],
  },
  'The Regency': {
    main: [
      { id: 'entry',     name: 'Grand Entry Hall',        category: 'living',   size: 'lg' },
      { id: 'drawing',   name: 'Drawing Room',            category: 'living',   size: 'xl' },
      { id: 'dining',    name: 'Formal Dining Room',      category: 'living',   size: 'xl' },
      { id: 'morning',   name: 'Morning Room',            category: 'living',   size: 'md' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'scullery',  name: 'Scullery',                category: 'kitchen',  size: 'md' },
      { id: 'library',   name: 'Library',                 category: 'work',     size: 'lg' },
      { id: 'primary',   name: 'Primary Suite Wing',      category: 'suite',    size: 'xl' },
      { id: 'loggia',    name: 'Covered Loggia',          category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'salon',     name: 'Family Salon',            category: 'living',   size: 'lg' },
      { id: 'dressing',  name: 'Dressing Suite',          category: 'suite',    size: 'lg' },
      { id: 'guest-1',   name: 'Guest Suite 1',           category: 'guest',    size: 'lg' },
      { id: 'guest-2',   name: 'Guest Suite 2',           category: 'guest',    size: 'lg' },
      { id: 'guest-3',   name: 'Guest Suite 3',           category: 'guest',    size: 'lg' },
      { id: 'gallery',   name: 'Open Gallery',            category: 'living',   size: 'md' },
    ],
    wellness: [
      { id: 'billiard',  name: 'Billiard Room',           category: 'living',   size: 'lg' },
      { id: 'wine',      name: 'Wine Cellar',             category: 'living',   size: 'lg' },
      { id: 'safe',      name: 'Safe Room',               category: 'utility',  size: 'sm' },
      { id: 'media',     name: 'Media Room',              category: 'living',   size: 'xl' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
      { id: 'parterre',       name: 'Formal Parterre Garden', category: 'outdoor', size: 'xl' },
      { id: 'pool-site',      name: 'Pool & Spa',         category: 'wellness', size: 'lg' },
      { id: 'guest-cottage',  name: 'Guest Cottage',      category: 'guest',    size: 'md' },
      { id: 'orchard',        name: 'Kitchen Garden & Orchard', category: 'outdoor', size: 'lg' },
    ],
  },
  'Maharaja Estate': {
    main: [
      { id: 'entry',     name: 'Ceremonial Entry',        category: 'living',   size: 'lg' },
      { id: 'reception', name: 'Reception Hall',          category: 'living',   size: 'xl' },
      { id: 'dining',    name: 'Grand Dining Hall',       category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'primary',   name: 'Primary Suite Compound',  category: 'suite',    size: 'xl' },
      { id: 'puja',      name: 'Puja Room',               category: 'wellness', size: 'md' },
      { id: 'guest',     name: 'Guest Wing',              category: 'guest',    size: 'xl' },
      { id: 'loggia',    name: 'Covered Loggia',          category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'zenana',    name: 'Zenana Wing',             category: 'suite',    size: 'xl' },
      { id: 'gallery',   name: 'Gallery & Library',       category: 'living',   size: 'lg' },
      { id: 'guest-up',  name: 'Upper Guest Suites',      category: 'guest',    size: 'lg' },
      { id: 'veranda',   name: 'Open Veranda',            category: 'outdoor',  size: 'lg' },
    ],
    wellness: [
      { id: 'ayurveda',  name: 'Ayurvedic Spa',          category: 'wellness', size: 'xl' },
      { id: 'yoga',      name: 'Yoga Pavilion',           category: 'wellness', size: 'lg' },
      { id: 'meditation',name: 'Meditation Room',         category: 'wellness', size: 'md' },
      { id: 'wine',      name: 'Wine Room',               category: 'living',   size: 'md' },
      { id: 'safe',      name: 'Safe Room',               category: 'utility',  size: 'sm' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '6-Car Garage',       category: 'utility',  size: 'xl' },
      { id: 'lotus-pond',     name: 'Reflecting Pool & Lotus Pond', category: 'outdoor', size: 'xl' },
      { id: 'guest-compound', name: 'Guest Compound',     category: 'guest',    size: 'lg' },
      { id: 'formal-garden',  name: 'Formal Gardens',     category: 'outdoor',  size: 'xl' },
      { id: 'trails',         name: 'Walking Trails',     category: 'outdoor',  size: 'lg' },
    ],
  },
  'Future-Proof': {
    main: [
      { id: 'entry',     name: 'Secure Entry Vestibule',  category: 'utility',  size: 'md' },
      { id: 'command',   name: 'Command Center',          category: 'work',     size: 'lg' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'shelter',   name: 'Storm Shelter',           category: 'utility',  size: 'md' },
      { id: 'generator', name: 'Generator Room',          category: 'utility',  size: 'md' },
      { id: 'terrace',   name: 'Covered Terrace',         category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'comms',     name: 'Communications Hub',      category: 'work',     size: 'lg' },
      { id: 'guest-1',   name: 'Guest Suite 1',           category: 'guest',    size: 'lg' },
      { id: 'guest-2',   name: 'Guest Suite 2',           category: 'guest',    size: 'lg' },
      { id: 'family',    name: 'Family Lounge',           category: 'living',   size: 'lg' },
    ],
    wellness: [
      { id: 'water',     name: 'Water Storage & Filtration', category: 'utility', size: 'lg' },
      { id: 'food',      name: 'Long-Term Food Storage',  category: 'utility',  size: 'lg' },
      { id: 'medical',   name: 'Medical Bay',             category: 'wellness', size: 'md' },
      { id: 'power',     name: 'Power & Battery Room',    category: 'utility',  size: 'lg' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage + EV Charging', category: 'utility', size: 'lg' },
      { id: 'solar',          name: 'Solar Array',        category: 'utility',  size: 'lg' },
      { id: 'cistern',        name: 'Water Cistern',      category: 'utility',  size: 'md' },
      { id: 'greenhouse',     name: 'Greenhouse',         category: 'outdoor',  size: 'lg' },
      { id: 'garden',         name: 'Food Garden',        category: 'outdoor',  size: 'lg' },
    ],
  },
  'The Sporting Estate': {
    main: [
      { id: 'entry',     name: 'Entry Foyer',             category: 'living',   size: 'md' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'dining',    name: 'Dining Room',             category: 'living',   size: 'lg' },
      { id: 'kitchen',   name: "Chef's Kitchen",          category: 'kitchen',  size: 'xl' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'mudroom',   name: 'Mudroom & Sports Locker', category: 'utility',  size: 'lg' },
      { id: 'equipment', name: 'Equipment Storage',       category: 'utility',  size: 'md' },
      { id: 'terrace',   name: 'Covered Terrace',         category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'family',    name: 'Family Lounge',           category: 'living',   size: 'lg' },
      { id: 'guest-1',   name: 'Guest Suite 1',           category: 'guest',    size: 'lg' },
      { id: 'guest-2',   name: 'Guest Suite 2',           category: 'guest',    size: 'lg' },
      { id: 'trophy',    name: 'Trophy Room',             category: 'work',     size: 'md' },
    ],
    wellness: [
      { id: 'gym',       name: 'Fitness Studio',          category: 'wellness', size: 'xl' },
      { id: 'recovery',  name: 'Recovery Room',           category: 'wellness', size: 'md' },
      { id: 'sauna',     name: 'Sauna',                   category: 'wellness', size: 'md' },
      { id: 'cold-plunge',name: 'Cold Plunge',            category: 'wellness', size: 'sm' },
      { id: 'media',     name: 'Media Lounge',            category: 'living',   size: 'xl' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
      { id: 'tennis',         name: 'Tennis Court',       category: 'outdoor',  size: 'lg' },
      { id: 'basketball',     name: 'Basketball Court',   category: 'outdoor',  size: 'lg' },
      { id: 'pool-site',      name: 'Pool & Spa',         category: 'wellness', size: 'xl' },
      { id: 'running-track',  name: 'Running Track',      category: 'outdoor',  size: 'lg' },
      { id: 'trails',         name: 'Walking Trails',     category: 'outdoor',  size: 'lg' },
    ],
  },
  'Moroccan Riad': {
    main: [
      { id: 'entry',     name: 'Arched Entry',            category: 'living',   size: 'md' },
      { id: 'riad',      name: 'Central Courtyard (Riad)',category: 'outdoor',  size: 'xl' },
      { id: 'salon',     name: 'Mosaic Salon',            category: 'living',   size: 'xl' },
      { id: 'dining',    name: 'Formal Dining Room',      category: 'living',   size: 'lg' },
      { id: 'kitchen',   name: 'Kitchen',                 category: 'kitchen',  size: 'lg' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'hammam',    name: 'Hammam',                  category: 'wellness', size: 'lg' },
      { id: 'terrace',   name: 'Shaded Terrace',          category: 'outdoor',  size: 'lg' },
    ],
    upper: [
      { id: 'rooftop',   name: 'Rooftop Terrace',         category: 'outdoor',  size: 'xl' },
      { id: 'guest-1',   name: 'Guest Suite 1',           category: 'guest',    size: 'lg' },
      { id: 'guest-2',   name: 'Guest Suite 2',           category: 'guest',    size: 'lg' },
      { id: 'reading',   name: 'Reading Alcove',          category: 'living',   size: 'sm' },
    ],
    wellness: [
      { id: 'hammam-2',  name: 'Hammam & Steam Room',     category: 'wellness', size: 'lg' },
      { id: 'meditation',name: 'Meditation Room',         category: 'wellness', size: 'md' },
      { id: 'wine',      name: 'Wine Room',               category: 'living',   size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Motor Court',        category: 'outdoor',  size: 'lg' },
      { id: 'walled-garden',  name: 'Walled Garden',      category: 'outdoor',  size: 'xl' },
      { id: 'courtyard-pool', name: 'Courtyard Pool',     category: 'wellness', size: 'lg' },
      { id: 'garage',         name: '3-Car Garage',       category: 'utility',  size: 'md' },
    ],
  },
  'Executive Motor Court': {
    main: [
      { id: 'motor-court', name: 'Motor Court Arrival',   category: 'outdoor',  size: 'xl' },
      { id: 'entry',       name: 'Grand Entry Foyer',     category: 'living',   size: 'lg' },
      { id: 'great-room',  name: 'Great Room',            category: 'living',   size: 'xl' },
      { id: 'dining',      name: 'Dining Room',           category: 'living',   size: 'lg' },
      { id: 'kitchen',     name: "Chef's Kitchen",        category: 'kitchen',  size: 'xl' },
      { id: 'primary',     name: 'Primary Suite Wing',    category: 'suite',    size: 'xl' },
      { id: 'office',      name: "Executive Office",      category: 'work',     size: 'lg' },
      { id: 'security',    name: 'Security Station',      category: 'utility',  size: 'sm' },
      { id: 'terrace',     name: 'Covered Terrace',       category: 'outdoor',  size: 'lg' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'motor-court',    name: 'Gated Motor Court',  category: 'outdoor',  size: 'xl' },
      { id: 'garage',         name: '4-Car Garage',       category: 'utility',  size: 'lg' },
      { id: 'guardhouse',     name: 'Gatehouse',          category: 'utility',  size: 'sm' },
      { id: 'pool-site',      name: 'Pool & Spa',         category: 'wellness', size: 'lg' },
      { id: 'service-drive',  name: 'Service Drive',      category: 'outdoor',  size: 'md' },
      { id: 'trails',         name: 'Walking Trails',     category: 'outdoor',  size: 'lg' },
    ],
  },
  'Dynasty Studio': {
    main: [
      { id: 'motor-court', name: 'Motor Court Arrival',   category: 'outdoor',  size: 'lg' },
      { id: 'entry',       name: 'Grand Entry Foyer',     category: 'living',   size: 'lg' },
      { id: 'great-room',  name: 'Great Hall',            category: 'living',   size: 'xl' },
      { id: 'dining',      name: 'Formal Dining Room',    category: 'living',   size: 'lg' },
      { id: 'kitchen',     name: "Chef's Kitchen",        category: 'kitchen',  size: 'xl' },
      { id: 'studio',      name: 'Dynasty Studio',        category: 'work',     size: 'xl' },
      { id: 'primary',     name: 'Primary Suite Wing',    category: 'suite',    size: 'xl' },
      { id: 'guest',       name: 'Guest Suite',           category: 'guest',    size: 'lg' },
      { id: 'terrace',     name: 'Covered Terrace',       category: 'outdoor',  size: 'lg' },
    ],
  },
  'The Overland': {
    main: [
      { id: 'entry',     name: 'Entry',                   category: 'living',   size: 'sm' },
      { id: 'great-room',name: 'Great Room',              category: 'living',   size: 'xl' },
      { id: 'kitchen',   name: 'Kitchen',                 category: 'kitchen',  size: 'lg' },
      { id: 'primary',   name: 'Primary Suite',           category: 'suite',    size: 'xl' },
      { id: 'workshop',  name: 'Vehicle Workshop',        category: 'utility',  size: 'xl' },
      { id: 'gear',      name: 'Expedition Gear Storage', category: 'utility',  size: 'lg' },
      { id: 'mudroom',   name: 'Mudroom & Boot Room',     category: 'utility',  size: 'md' },
      { id: 'terrace',   name: 'Covered Terrace',         category: 'outdoor',  size: 'lg' },
    ],
    wellness: [
      { id: 'gym',       name: 'Athlete Fitness Studio',  category: 'wellness', size: 'lg' },
      { id: 'recovery',  name: 'Recovery Room',           category: 'wellness', size: 'md' },
      { id: 'mechanical',name: 'Mechanical / Storage',    category: 'utility',  size: 'md' },
    ],
    site: [
      { id: 'main-residence', name: 'Main Residence',     category: 'living',   size: 'xl' },
      { id: 'workshop',       name: 'Overland Workshop',  category: 'utility',  size: 'xl' },
      { id: 'vehicle-court',  name: 'Vehicle Court',      category: 'outdoor',  size: 'xl' },
      { id: 'garage',         name: '4+ Car Garage',      category: 'utility',  size: 'lg' },
      { id: 'fuel-storage',   name: 'Fuel & Supply Storage', category: 'utility', size: 'md' },
      { id: 'trails',         name: 'Access Trails',      category: 'outdoor',  size: 'xl' },
    ],
  },
}

function buildMainFloor(data: EstateFormData): FloorZone[] {
  const override = AESTHETIC_PROGRAMS[data.aestheticStyle]?.main
  if (override) return override
  const tier = inferTier(data)

  if (tier === 'legacy') {
    return [
      { id: 'motor-court', name: 'Motor Court Arrival', category: 'outdoor', size: 'lg' },
      { id: 'entry', name: 'Grand Entry Foyer', category: 'living', size: 'lg' },
      { id: 'great-room', name: 'Great Hall', category: 'living', size: 'xl' },
      { id: 'dining', name: 'Formal Dining Room', category: 'living', size: 'lg' },
      { id: 'kitchen', name: "Chef's Kitchen", category: 'kitchen', size: 'xl' },
      { id: 'scullery', name: 'Scullery', category: 'kitchen', size: 'md' },
      { id: 'pantry', name: 'Walk-In Pantry', category: 'kitchen', size: 'sm' },
      { id: 'primary', name: 'Primary Suite Wing', category: 'suite', size: 'xl' },
      { id: 'guest', name: 'Guest Suite', category: 'guest', size: 'lg' },
      { id: 'office', name: "Founder's Studio", category: 'work', size: 'lg' },
      { id: 'mudroom', name: 'Mudroom Hub', category: 'utility', size: 'md' },
      { id: 'outdoor-kitchen', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' },
      { id: 'terrace', name: 'Covered Terrace', category: 'outdoor', size: 'xl' },
      { id: 'fire', name: 'Fire Lounge', category: 'outdoor', size: 'md' },
    ]
  }

  if (tier === 'executive') {
    return [
      { id: 'entry', name: 'Entry Foyer', category: 'living', size: 'md' },
      { id: 'great-room', name: 'Great Room', category: 'living', size: 'xl' },
      { id: 'dining', name: 'Dining Room', category: 'living', size: 'lg' },
      { id: 'kitchen', name: "Chef's Kitchen", category: 'kitchen', size: 'xl' },
      { id: 'scullery', name: 'Scullery', category: 'kitchen', size: 'md' },
      { id: 'pantry', name: 'Walk-In Pantry', category: 'kitchen', size: 'sm' },
      { id: 'primary', name: 'Primary Suite', category: 'suite', size: 'xl' },
      { id: 'guest', name: 'Guest Suite', category: 'guest', size: 'lg' },
      { id: 'office', name: "Founder's Studio", category: 'work', size: 'lg' },
      { id: 'mudroom', name: 'Mudroom Hub', category: 'utility', size: 'sm' },
      { id: 'outdoor-kitchen', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' },
      { id: 'terrace', name: 'Covered Terrace', category: 'outdoor', size: 'lg' },
      { id: 'fire', name: 'Fire Lounge', category: 'outdoor', size: 'md' },
    ]
  }

  if (tier === 'signature') {
    return [
      { id: 'entry', name: 'Entry Foyer', category: 'living', size: 'md' },
      { id: 'great-room', name: 'Great Room', category: 'living', size: 'xl' },
      { id: 'dining', name: 'Dining Room', category: 'living', size: 'lg' },
      { id: 'kitchen', name: "Chef's Kitchen & Pantry", category: 'kitchen', size: 'xl' },
      { id: 'primary', name: 'Primary Suite', category: 'suite', size: 'xl' },
      { id: 'guest', name: 'Guest Suite', category: 'guest', size: 'md' },
      { id: 'office', name: 'Home Office', category: 'work', size: 'md' },
      { id: 'mudroom', name: 'Mudroom', category: 'utility', size: 'sm' },
      { id: 'terrace', name: 'Covered Porch / Terrace', category: 'outdoor', size: 'lg' },
    ]
  }

  // Cottage
  return [
    { id: 'entry', name: 'Entry', category: 'living', size: 'sm' },
    { id: 'great-room', name: 'Open Living + Dining', category: 'living', size: 'xl' },
    { id: 'kitchen', name: 'Kitchen', category: 'kitchen', size: 'lg' },
    { id: 'primary', name: 'Primary Bedroom', category: 'suite', size: 'lg' },
    { id: 'bed-2', name: 'Bedroom 2', category: 'suite', size: 'md' },
    { id: 'bed-3', name: 'Bedroom 3', category: 'suite', size: 'md' },
    { id: 'laundry', name: 'Laundry + Mudroom', category: 'utility', size: 'sm' },
    { id: 'porch', name: 'Covered Porch', category: 'outdoor', size: 'md' },
  ]
}

function buildUpperFloor(data: EstateFormData): FloorZone[] {
  const override = AESTHETIC_PROGRAMS[data.aestheticStyle]?.upper
  if (override !== undefined) return override
  const tier = inferTier(data)

  if (tier === 'cottage') return []

  if (tier === 'signature') {
    return [
      { id: 'dressing', name: 'Dressing Room', category: 'suite', size: 'md' },
      { id: 'bed-2', name: "Children's Suite 1", category: 'suite', size: 'lg' },
      { id: 'bed-3', name: "Children's Suite 2", category: 'suite', size: 'lg' },
      { id: 'reading-nook', name: 'Reading Nook', category: 'living', size: 'sm' },
      { id: 'homework-loft', name: 'Homework Loft', category: 'work', size: 'sm' },
    ]
  }

  if (tier === 'executive') {
    return [
      { id: 'family-lounge', name: 'Family Lounge', category: 'living', size: 'lg' },
      { id: 'reading-nook', name: 'Reading Nook', category: 'living', size: 'sm' },
      { id: 'dressing', name: 'Dressing Room', category: 'suite', size: 'md' },
      { id: 'bed-2', name: "Children's Suite 1", category: 'suite', size: 'lg' },
      { id: 'bed-3', name: "Children's Suite 2", category: 'suite', size: 'lg' },
      { id: 'bed-4', name: "Children's Suite 3", category: 'suite', size: 'lg' },
      { id: 'homework-loft', name: 'Homework Loft', category: 'work', size: 'sm' },
      { id: 'open-below', name: 'Open to Below', category: 'living', size: 'md' },
    ]
  }

  // Legacy
  return [
    { id: 'family-lounge', name: 'Family Lounge', category: 'living', size: 'lg' },
    { id: 'reading-nook', name: 'Reading Nook', category: 'living', size: 'sm' },
    { id: 'dressing', name: 'Dressing Suite', category: 'suite', size: 'lg' },
    { id: 'bed-2', name: "Children's Suite 1", category: 'suite', size: 'lg' },
    { id: 'bed-3', name: "Children's Suite 2", category: 'suite', size: 'lg' },
    { id: 'bed-4', name: "Children's Suite 3", category: 'suite', size: 'lg' },
    { id: 'playroom', name: 'Playroom', category: 'living', size: 'md' },
    { id: 'homework-loft', name: 'Homework Loft', category: 'work', size: 'sm' },
    { id: 'open-below', name: 'Open to Below', category: 'living', size: 'md' },
  ]
}

function buildWellnessLevel(data: EstateFormData): FloorZone[] {
  const override = AESTHETIC_PROGRAMS[data.aestheticStyle]?.wellness
  if (override !== undefined) return override
  const tier = inferTier(data)

  if (tier === 'cottage') return []

  if (tier === 'signature') {
    return [
      { id: 'media', name: 'Media Room', category: 'living', size: 'lg' },
      { id: 'mechanical', name: 'Mechanical / Storage', category: 'utility', size: 'md' },
    ]
  }

  if (tier === 'executive') {
    return [
      { id: 'gym', name: 'Fitness Studio', category: 'wellness', size: 'xl' },
      { id: 'sauna', name: 'Infrared Sauna', category: 'wellness', size: 'md' },
      { id: 'cold-plunge', name: 'Cold Plunge', category: 'wellness', size: 'sm' },
      { id: 'wine', name: 'Wine Room', category: 'living', size: 'md' },
      { id: 'media', name: 'Media Lounge', category: 'living', size: 'xl' },
      { id: 'mechanical', name: 'Mechanical / Storage', category: 'utility', size: 'md' },
    ]
  }

  // Legacy — full wellness wing
  return [
    { id: 'gym', name: 'Fitness Studio', category: 'wellness', size: 'xl' },
    { id: 'sauna', name: 'Infrared Sauna', category: 'wellness', size: 'md' },
    { id: 'cold-plunge', name: 'Cold Plunge', category: 'wellness', size: 'sm' },
    { id: 'spa', name: 'Spa Suite', category: 'wellness', size: 'lg' },
    { id: 'meditation', name: 'Meditation Room', category: 'wellness', size: 'md' },
    { id: 'wine', name: 'Wine Room', category: 'living', size: 'md' },
    { id: 'safe', name: 'Safe Room', category: 'utility', size: 'sm' },
    { id: 'media', name: 'Media Lounge', category: 'living', size: 'xl' },
    { id: 'mechanical', name: 'Mechanical / Storage', category: 'utility', size: 'md' },
  ]
}

function buildSitePlan(data: EstateFormData): FloorZone[] {
  const override = AESTHETIC_PROGRAMS[data.aestheticStyle]?.site
  if (override) return override
  const tier = inferTier(data)

  if (tier === 'cottage') {
    return [
      { id: 'main-residence', name: 'Main Residence', category: 'living', size: 'xl' },
      { id: 'garage', name: '1–2 Car Garage', category: 'utility', size: 'md' },
      { id: 'backyard', name: 'Backyard + Patio', category: 'outdoor', size: 'lg' },
      { id: 'garden', name: 'Kitchen Garden', category: 'outdoor', size: 'md' },
    ]
  }

  if (tier === 'signature') {
    return [
      { id: 'main-residence', name: 'Main Residence', category: 'living', size: 'xl' },
      { id: 'garage', name: '2-Car Garage', category: 'utility', size: 'md' },
      { id: 'pool-site', name: 'Pool & Spa', category: 'wellness', size: 'lg' },
      { id: 'outdoor-kitchen', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' },
      { id: 'garden', name: 'Kitchen Garden', category: 'outdoor', size: 'md' },
      { id: 'fire-site', name: 'Fire Lounge', category: 'outdoor', size: 'md' },
    ]
  }

  if (tier === 'executive') {
    return [
      { id: 'main-residence', name: 'Main Residence', category: 'living', size: 'xl' },
      { id: 'motor-court-site', name: 'Motor Court', category: 'outdoor', size: 'lg' },
      { id: 'garage', name: '3-Car Garage', category: 'utility', size: 'lg' },
      { id: 'pool-site', name: 'Pool & Spa', category: 'wellness', size: 'xl' },
      { id: 'outdoor-kitchen', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' },
      { id: 'garden', name: 'Kitchen Gardens', category: 'outdoor', size: 'md' },
      { id: 'sport', name: 'Sport Court', category: 'outdoor', size: 'lg' },
      { id: 'trails', name: 'Walking Trails', category: 'outdoor', size: 'lg' },
    ]
  }

  // Legacy — full site program
  return [
    { id: 'main-residence', name: 'Main Residence', category: 'living', size: 'xl' },
    { id: 'motor-court-site', name: 'Motor Court', category: 'outdoor', size: 'lg' },
    { id: 'garage', name: '4-Car Garage', category: 'utility', size: 'lg' },
    { id: 'guest-compound', name: 'Guest Compound', category: 'guest', size: 'lg' },
    { id: 'pool-site', name: 'Pool & Spa', category: 'wellness', size: 'xl' },
    { id: 'pond', name: 'Reflecting Pond', category: 'outdoor', size: 'lg' },
    { id: 'outdoor-kitchen', name: 'Outdoor Kitchen', category: 'outdoor', size: 'md' },
    { id: 'orchard-site', name: 'Orchard', category: 'outdoor', size: 'lg' },
    { id: 'garden', name: 'Kitchen Gardens', category: 'outdoor', size: 'md' },
    { id: 'sport', name: 'Sport Courts', category: 'outdoor', size: 'lg' },
    { id: 'trails', name: 'Walking Trails', category: 'outdoor', size: 'lg' },
  ]
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
  const tier = inferTier(data)
  const stories = tier === 'cottage' ? 'single-story (main floor only)' : tier === 'signature' ? 'two-story (main floor, upper floor)' : 'three-story (main floor, upper floor, lower wellness level)'
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
    mainFloorImagePrompt: `${identity} ${base} THIS IMAGE IS THE MAIN FLOOR PLAN ONLY — the ground level. Labeled spaces within the single plan: ${mainRooms}. ${inferTier(data) === 'legacy' || inferTier(data) === 'executive' ? 'Motor court entry at the top of the drawing.' : 'Entry from front at the top of the drawing.'} Primary suite occupies the largest zone. Living area flows to covered outdoor zone at the bottom. One floor, one plan, one image.`,
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
