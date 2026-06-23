export interface EstateFormData {
  // Step 1
  familySize: string
  children: string
  multigenerational: boolean
  lifestylePriorities: string[]

  // Step 2
  landSize: string
  climate: string
  terrain: string
  views: string
  privacyNeeds: string

  // Step 3
  bedrooms: string
  bathrooms: string
  squareFootage: string
  garageSpaces: string
  guestSuite: boolean
  officStudio: boolean
  homeschoolRoom: boolean
  wellnessSuite: boolean
  chefKitchen: boolean
  pantry: boolean
  laundryMudroom: boolean

  // Step 4
  poolSpa: boolean
  reflectingPond: boolean
  outdoorKitchen: boolean
  fireLounge: boolean
  orchard: boolean
  raisedBeds: boolean
  greenhouse: boolean
  sportCourt: boolean
  playLawn: boolean

  // Step 5
  aestheticStyle: string
  budgetRange: string
  buildTimeline: string
  scipInterest: string

  acreage?: string
}

export interface Blueprint {
  estateName: string
  tagline: string
  lifestyleSummary: string
  rooms: { name: string; notes: string }[]
  outdoorZones: { name: string; notes: string }[]
  scipNotes: string[]
  wellnessFamilyNotes: string[]
  gardenWaterNotes: string[]
  buildPhasing: { phase: string; items: string[] }[]
  builderHandoff: string[]
}

function pickEstateName(data: EstateFormData): { name: string; tagline: string } {
  const styles: Record<string, { name: string; tagline: string }> = {
    // ── Cottage Series ────────────────────────────────────────────────────────
    'Banyan 1600':           { name: 'The Banyan Cottage',          tagline: 'Warmth and welcome, rooted from the first day' },
    'Canyon 1500':           { name: 'The Canyon House',            tagline: 'Desert character, built to last a century' },
    'Cedar 1800':            { name: 'The Cedar House',             tagline: 'Pacific warmth, honest materials, home from day one' },
    'Coastal 1600':          { name: 'The Coastal Cottage',         tagline: 'Salt air and permanence, a home that holds' },
    'Hearth 1800':           { name: 'The Hearth House',            tagline: 'Every season, every generation — gathered here' },
    'Magnolia 1800 Cottage': { name: 'The Magnolia Cottage',        tagline: 'Southern grace, built to endure' },
    'Oakmont 1800 Cottage':  { name: 'The Oakmont',                 tagline: 'Classic proportions, quiet permanence' },
    'Prairie 1600':          { name: 'The Prairie House',           tagline: 'Open land, honest craft, a home on solid ground' },
    'Summit 1800':           { name: 'The Summit Cottage',          tagline: 'Built for the mountain — season after season' },
    'Velocity 1500':         { name: 'The Velocity House',          tagline: 'Precision design, stripped to what matters' },

    // ── Signature Series ──────────────────────────────────────────────────────
    'Aspen 2800':            { name: 'The Aspen Residence',         tagline: 'Mountain modern, where the family comes alive' },
    'Banyan 2600':           { name: 'The Banyan Residence',        tagline: 'Deep roots, wide verandas, room for everyone' },
    'California 2000':       { name: 'The California House',        tagline: 'Indoor and out, effortlessly one' },
    'Canyon 2100':           { name: 'The Canyon Residence',        tagline: 'Rammed earth and sky — a home of the land' },
    'Coastal 2000':          { name: 'The Coastal Residence',       tagline: 'Salt air, clean lines, built to weather everything' },
    'Harbor 1900':           { name: 'The Harbor House',            tagline: 'Shingle and stone, a home earned by the water' },
    'Heritage 2300':         { name: 'The Heritage House',          tagline: 'American proportions, a legacy you can touch' },
    'Lone Star 2100':        { name: 'The Lone Star',               tagline: 'Wide porches, open land, built Texas-strong' },
    'Magnolia 2200':         { name: 'The Magnolia House',          tagline: 'Southern grace refined, for the family growing into itself' },
    'Magnolia 2400':         { name: 'The Magnolia Residence',      tagline: 'Shaded porches and a garden — time lived slowly' },
    'Mesa 1800':             { name: 'The Mesa House',              tagline: 'Adobe warmth, Southwest soul, built for the sun' },
    'Oakmont 2600':          { name: 'The Oakmont Residence',       tagline: 'Oak millwork and timeless form — a home that ages well' },
    'Prairie 2000':          { name: 'The Prairie Residence',       tagline: 'Horizontal lines, open land, a family in full stride' },
    'Summit 2200':           { name: 'The Summit Residence',        tagline: 'Dark timber and stone, built for the peaks' },
    'Velocity 2400':         { name: 'The Velocity Residence',      tagline: 'High-performance living, precision at every scale' },

    // ── Executive Series ──────────────────────────────────────────────────────
    'Aegean Estate':         { name: 'The Aegean Estate',           tagline: 'Whitewashed stone and sea light — a home outside time' },
    'Alpine Estate':         { name: 'The Alpine Estate',           tagline: 'Timber, stone, and altitude — built for the long seasons' },
    'Backyard Track House':  { name: 'The Track House',             tagline: 'Engineered for those who live at full speed' },
    'Car Vault':             { name: 'The Vault Estate',            tagline: 'Where the collection lives, and so does the family' },
    'Creator Estate':        { name: 'The Creator Estate',          tagline: 'Built for the work that defines you' },
    'Fjord 3800':            { name: 'The Fjord Estate',            tagline: 'Dark timber, still water, the drama of the north' },
    'French Provence':       { name: 'The Provençal Estate',        tagline: 'Limestone and lavender, a life lived without hurry' },
    'The Lotus':             { name: 'The Lotus Estate',            tagline: 'Vastu-aligned, in harmony with the land and sky' },
    'Mediterranean Estate':  { name: 'The Mediterranean Estate',    tagline: 'Sun-warmed walls, iron gates, generations of story' },
    'Moroccan Riad':         { name: 'The Riad Estate',             tagline: 'Courtyard, tile, and silence — the art of the threshold' },
    'Nordic Estate':         { name: 'The Nordic Estate',           tagline: 'White timber and long winters — a home that holds the light' },
    'Stealth Wealth':        { name: 'The Steward Estate',          tagline: 'Restraint as a statement — quality that speaks quietly' },
    'Stillwater 3600':       { name: 'The Stillwater Estate',       tagline: 'Calm at the water\'s edge, built to last lifetimes' },
    'The Banyan':            { name: 'The Banyan Estate',           tagline: 'Roots deep enough for everyone who calls this home' },
    'The Hearth':            { name: 'The Hearth Estate',           tagline: 'The fire at the center — a home built around living' },
    'Hill Country':          { name: 'The Hill Country Estate',     tagline: 'Limestone and cedar on Texas land, built to endure' },
    'The Patriot':           { name: 'The Patriot Estate',          tagline: 'Brick, millwork, and heritage — an American legacy' },
    'Tropical Modern':       { name: 'The Tropical Estate',         tagline: 'Teak and coral stone, open to the sky' },
    'Villa 4200':            { name: 'Villa Dorata',                tagline: 'Italian proportion, estate scale, a life fully lived' },
    'Wabi-Sabi':             { name: 'The Wabi Estate',             tagline: 'Aged timber and rammed earth — beauty in impermanence' },
    'Cars & Coffee':         { name: 'The Cars & Coffee Estate',    tagline: 'The weekend ritual, elevated to a way of life' },

    // ── Legacy Series ─────────────────────────────────────────────────────────
    "Collector's Compound":  { name: "The Collector's Compound",    tagline: 'The collection, the family, and the compound — all of it' },
    'The Crooner':           { name: 'The Crooner\'s Estate',       tagline: 'Grand rooms, great music, a house built for gathering' },
    'Dynasty Studio':        { name: 'The Dynasty Estate',          tagline: 'Dark timber, deep intention — built to be handed down' },
    'Executive Motor Court': { name: 'The Motor Court Estate',      tagline: 'The arrival says everything — quiet, powerful, precise' },
    'Future-Proof':          { name: 'The Fortified Estate',        tagline: 'Resilient by design, ready for whatever comes' },
    'Little Drivers':        { name: 'The Little Drivers\' Estate', tagline: 'Where the next generation learns what matters' },
    'Maharaja Estate':       { name: 'The Maharaja Estate',         tagline: 'Marble inlay and carved stone — a palace for the ages' },
    'The Overland':          { name: 'The Overland Estate',         tagline: 'Stone, steel, and self-reliance — the adventure homestead' },
    'Stealth Wealth II':     { name: 'The Steward Legacy',          tagline: 'Estate scale, zero noise — mastery in every detail' },
    'Bahay Legacy':          { name: 'The Bahay Legacy Estate',     tagline: 'Filipino warmth at full estate scale — every generation welcome' },
    'The Banyan Estate':     { name: 'The Banyan Legacy',           tagline: 'A compound grown for family — every branch has a home' },
    'Desert Oasis':          { name: 'The Oasis Estate',            tagline: 'Thermal mass and desert sky — fortress and sanctuary at once' },
    'The Homestead':         { name: 'The Homestead Estate',        tagline: 'Working land, rooted living, a legacy you can harvest' },
    'The Homestead II':      { name: 'The Homestead Compound',      tagline: 'The full agrarian vision — barn, orchard, and family under one sky' },
    'The Regency':           { name: 'The Regency Estate',          tagline: 'European grandeur, formal gardens, built for the centuries' },
    'The Sanctuary':         { name: 'The Sanctuary Estate',        tagline: 'Spa, cold plunge, garden — rest engineered into the walls' },
    'The Sporting Estate':   { name: 'The Sporting Estate',         tagline: 'Courts, trails, and open sky — the active family at full scale' },
  }
  return styles[data.aestheticStyle] ?? { name: 'My Everlasting Home', tagline: 'A legacy built to last' }
}

export function generateBlueprint(data: EstateFormData): Blueprint {
  const { name, tagline } = pickEstateName(data)

  const lifestylePriorities = data.lifestylePriorities.join(', ')

  const lifestyleSummary = `This ${data.squareFootage || '5,000–7,000'} sq ft estate is designed for a family of ${data.familySize || 'four to six'} with a lifestyle centered on ${lifestylePriorities || 'wellness, privacy, and slow living'}. Set on ${data.landSize || 'a generous plot'} of land with ${data.terrain || 'level'} terrain and ${data.views || 'natural'} views, the property balances architectural beauty with functional family systems. The SCIP structural approach enables thick, thermally efficient walls, quiet interiors, and a construction timeline suited to your ${data.buildTimeline || '18–24 month'} build target.`

  const rooms: { name: string; notes: string }[] = [
    { name: 'Entry Hall & Motor Court Arrival', notes: 'Gracious covered entry with stone flooring and lantern lighting' },
    { name: `Primary Suite (${data.bedrooms ? 'Bed 1' : "Owner's Retreat"})`, notes: 'Private wing with morning terrace, dressing room, and spa bath' },
  ]

  const bed = parseInt(data.bedrooms) || 4
  for (let i = 2; i <= Math.min(bed, 6); i++) {
    rooms.push({
      name: `Bedroom ${i}${i === 2 ? ' (Senior / Multigenerational)' : i === bed ? ' (Junior Suite)' : ''}`,
      notes: i === 2 && data.multigenerational ? 'En-suite with accessible bath, separate entrance optional' : 'En-suite, built-in storage, generous natural light',
    })
  }

  if (data.chefKitchen) {
    rooms.push({ name: "Chef's Kitchen", notes: 'Professional-grade with island, adjacent scullery and walk-in pantry' })
    rooms.push({ name: 'Scullery / Back Kitchen', notes: "Secondary prep zone, appliance storage, butler's pass-through" })
  }
  if (data.pantry) rooms.push({ name: 'Walk-In Pantry', notes: 'Floor-to-ceiling shelving, dedicated coffee station' })
  if (data.wellnessSuite) rooms.push({ name: 'Wellness Suite', notes: 'Gym, infrared sauna, cold plunge, private outdoor access' })
  if (data.homeschoolRoom) rooms.push({ name: 'Homeschool Library / Atelier', notes: 'Dedicated learning space with built-in shelving, art corner, and natural light' })
  if (data.officStudio) rooms.push({ name: "Founder's Office / Studio", notes: 'Quiet wing with fiber connectivity, custom millwork, recording-ready acoustics optional' })
  if (data.guestSuite) rooms.push({ name: 'Guest Suite / Casita', notes: 'Separate entrance, kitchenette, private terrace for extended stays' })
  if (data.laundryMudroom) rooms.push({ name: 'Laundry & Mudroom Hub', notes: 'Double washers, drying room, boot storage, family drop zone' })
  rooms.push({ name: 'Great Room / Living Hall', notes: 'Volume ceiling, stone fireplace, indoor-outdoor flow to main terrace' })
  rooms.push({ name: 'Dining Room', notes: 'Formal and everyday combined, seated for 12+, adjacent to kitchen' })

  const outdoorZones: { name: string; notes: string }[] = []
  if (data.poolSpa) outdoorZones.push({ name: 'Pool & Spa', notes: 'Infinity or geometric pool with heated spa, travertine decking, cabana structure' })
  if (data.reflectingPond) outdoorZones.push({ name: 'Reflecting Pond / Water Feature', notes: 'Formal water axis framing the main arrival or garden view' })
  if (data.outdoorKitchen) outdoorZones.push({ name: 'Outdoor Kitchen & Dining Terrace', notes: 'Built-in grill, pizza oven, bar seating, covered loggia' })
  if (data.fireLounge) outdoorZones.push({ name: 'Fire Lounge', notes: 'Sunken conversation pit or raised firepit with perennial planting surround' })
  if (data.orchard) outdoorZones.push({ name: 'Citrus & Fruit Orchard', notes: 'Productive grove integrated into estate landscape, irrigation-fed' })
  if (data.raisedBeds) outdoorZones.push({ name: 'Kitchen Garden / Raised Beds', notes: "Culinary garden near chef's kitchen for herbs, vegetables, cut flowers" })
  if (data.greenhouse) outdoorZones.push({ name: 'Greenhouse', notes: 'Year-round growing, propagation, seed starting, attached potting shed' })
  if (data.sportCourt) outdoorZones.push({ name: 'Sport Court', notes: 'Multipurpose pickleball/basketball court with night lighting' })
  if (data.playLawn) outdoorZones.push({ name: 'Play Lawn', notes: 'Open turf for family recreation, gentle grading for drainage' })
  outdoorZones.push({ name: 'Motor Court', notes: 'Paved arrival court with turning radius for multiple vehicles' })

  const scipNotes = [
    `SCIP (Structural Concrete Insulated Panels) are ideal for this ${data.climate || 'mixed'} climate, providing superior thermal mass and R-value performance.`,
    `Expected wall thickness of 8–10" creates deep window reveals and sill details characteristic of estate architecture — a natural fit for the ${data.aestheticStyle || 'organic modern'} style.`,
    'SCIP construction compresses build time vs. traditional framing, allowing faster weather-tight enclosure before finish work begins.',
    `With a ${data.budgetRange || 'premium'} budget, SCIP can be combined with structural steel moments at key spans (great room, motor court canopy) for architectural drama.`,
    'All structural engineering, stamped drawings, and local permitting must be completed by licensed architects and structural engineers in your jurisdiction.',
  ]

  const wellnessFamilyNotes = data.lifestylePriorities.includes('wellness')
    ? [
        'Wellness suite placement on the ground floor with direct garden egress is recommended for morning routines.',
        'Cold plunge and sauna adjacency creates efficient hydrotherapy circuits.',
        'Natural light from clerestory windows in the gym space supports circadian rhythm.',
        data.homeschoolRoom ? 'Homeschool atelier positioned near the kitchen garden reinforces experiential learning loops.' : '',
      ].filter(Boolean)
    : [
        "Primary suite wing separation from children's bedrooms enables genuine rest for parents.",
        data.multigenerational ? 'Multigenerational suite with private access supports family without sacrificing privacy.' : '',
        data.guestSuite ? 'Detached casita prevents household disruption during extended guest stays.' : '',
      ].filter(Boolean)

  const gardenWaterNotes = []
  if (data.orchard) gardenWaterNotes.push('Citrus orchard sited on south/southwest exposure for maximum solar gain. Plan for 12–20 trees minimum for productive yield.')
  if (data.raisedBeds) gardenWaterNotes.push("Kitchen garden ideally placed within 50 ft of chef's kitchen with drip irrigation and compost bay.")
  if (data.greenhouse) gardenWaterNotes.push('Attached or detached greenhouse to extend growing season. Consider passive solar orientation and thermal mass flooring.')
  if (data.reflectingPond) gardenWaterNotes.push('Reflecting pond as a formal axis creates year-round visual depth and supports local wildlife ecology.')
  if (data.poolSpa) gardenWaterNotes.push('Pool water management should integrate with gray water systems where code allows for irrigation reuse.')
  if (gardenWaterNotes.length === 0) gardenWaterNotes.push('A simple herb garden and specimen tree program can anchor outdoor spaces beautifully without heavy infrastructure.')

  const buildPhasing: { phase: string; items: string[] }[] = [
    {
      phase: 'Phase 1 — Site & Foundation (Months 1–4)',
      items: ['Site survey, soil analysis, and civil engineering', 'Grading, drainage, and underground utilities rough-in', 'Foundation slab with SCIP panel system begin'],
    },
    {
      phase: 'Phase 2 — Structure & Enclosure (Months 4–9)',
      items: ['SCIP wall panels erected and tied', 'Roof structure and weather-tight membrane', 'Windows, exterior doors, and motor court shell'],
    },
    {
      phase: 'Phase 3 — MEP & Systems (Months 9–14)',
      items: ['Mechanical, electrical, and plumbing rough-in', 'Smart home pre-wire, AV, and security', 'HVAC zoning and radiant floor preparation'],
    },
    {
      phase: 'Phase 4 — Finishes & Landscape (Months 14–20)',
      items: ['Interior finish carpentry, tile, and millwork', 'Kitchen and bath installations', 'Landscape install: pool, orchard, garden, hardscape'],
    },
    {
      phase: 'Phase 5 — Completion & Handoff',
      items: ['Final inspections and certificate of occupancy', 'Commissioning of all systems', 'Builder handoff documentation and warranties'],
    },
  ]

  const builderHandoff = [
    'Signed architectural drawings (stamped by licensed architect)',
    'Structural engineering package (stamped by licensed structural engineer)',
    'SCIP panel shop drawings and manufacturer specifications',
    'Soils / geotechnical report',
    'Civil engineering: grading, drainage, utilities',
    'MEP (mechanical, electrical, plumbing) engineered drawings',
    'Title 24 / energy compliance report (or local equivalent)',
    'Landscape architectural plan',
    'Pool and water feature engineering',
    'Smart home and AV system pre-wire specification',
    "Builder's risk insurance and bonding documentation",
    'HOA / CC&R approval (if applicable)',
    'Local building department permit set and approvals',
    'Material and finish specification schedule',
    'Construction schedule and milestone calendar',
  ]

  return {
    estateName: name,
    tagline,
    lifestyleSummary,
    rooms,
    outdoorZones,
    scipNotes,
    wellnessFamilyNotes,
    gardenWaterNotes,
    buildPhasing,
    builderHandoff,
  }
}
