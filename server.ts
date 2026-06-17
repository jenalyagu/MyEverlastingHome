import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import Anthropic from '@anthropic-ai/sdk'
import Stripe from 'stripe'
import { createOpenAIImageProvider } from './src/lib/imageProviders/openaiImageProvider.js'
import { createGeminiImageProvider } from './src/lib/imageProviders/geminiImageProvider.js'
import { createDalleImageProvider } from './src/lib/imageProviders/dalleImageProvider.js'
import { IMAGE_MODELS, DEFAULT_PROVIDER } from './src/lib/imageProviderConfig.js'
import type { ProviderName, GenerateImageRequest, GenerateImageResult } from './src/lib/imageProviders/imageProviderTypes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001
const IS_PROD = process.env.NODE_ENV === 'production'

app.use(cors())
app.use(express.json({ limit: '10mb' }))

if (IS_PROD) {
  const distPath = path.join(__dirname, 'dist')
  app.use(express.static(distPath))
}

// ---------------------------------------------------------------------------
// Deterministic concept context builder
// Converts raw form data into design-language directives before Gemini sees it
// ---------------------------------------------------------------------------

interface ConceptContext {
  paletteAnchors: string[]
  landscapeElements: string[]
  spaceArchetypes: string[]
  imageryTerms: string[]     // feeds Pexels hero query
  lifestyleImagery: string[] // feeds Pexels lifestyle strip
  designDirectives: string[] // plain-language design rules for the prompt
}

function buildConceptContext(data: Record<string, unknown>): ConceptContext {
  const priorities = Array.isArray(data.lifestylePriorities) ? data.lifestylePriorities as string[] : []
  const style = (data.aestheticStyle as string) || 'Modern Organic'
  const climate = (data.climate as string) || 'temperate'
  const terrain = (data.terrain as string) || 'level'
  const views = (data.views as string) || 'natural landscape'

  const paletteAnchors: string[] = []
  const landscapeElements: string[] = []
  const spaceArchetypes: string[] = []
  const imageryTerms: string[] = []
  const lifestyleImagery: string[] = []
  const designDirectives: string[] = []

  // --- Aesthetic style ---
  const styleMap: Record<string, { palette: string[]; imagery: string[]; directive: string }> = {
    'Modern Organic': {
      palette: ['Warm Linen', 'Raw Travertine', 'Matte Bronze', 'Sage Plaster', 'Bleached Oak'],
      imagery: ['modern organic luxury estate exterior stone wood'],
      directive: 'Forms are soft and sculptural. Materials are raw and warm. No cold grays or sharp edges.',
    },
    'Traditional / Classic': {
      palette: ['Aged Cream', 'Deep Walnut', 'Antiqued Brass', 'Forest Green', 'Charcoal Slate'],
      imagery: ['traditional luxury estate exterior brick column'],
      directive: 'Architecture draws from European classical tradition — symmetry, proportion, permanence.',
    },
    'Mediterranean / Spanish': {
      palette: ['Terra Cotta', 'Whitewash Plaster', 'Cobalt Tile', 'Ochre', 'Wrought Iron Black'],
      imagery: ['mediterranean spanish villa exterior courtyard tile'],
      directive: 'Arched openings, clay tile roofs, interior courtyards, and sun-baked plaster walls define the character.',
    },
    'Farmhouse / Agrarian': {
      palette: ['Shiplap White', 'Barn Red', 'Aged Timber', 'Slate Gray', 'Moss Green'],
      imagery: ['modern farmhouse luxury exterior black white barn'],
      directive: 'Honest materials, pitched rooflines, wraparound porches. Beauty through simplicity and craft.',
    },
    'Minimalist / Contemporary': {
      palette: ['Concrete White', 'Matte Black', 'Pale Ash', 'Steel', 'Frosted Glass'],
      imagery: ['minimalist contemporary luxury house exterior concrete glass'],
      directive: 'Every element earns its place. Flush surfaces, concealed hardware, monolithic volumes.',
    },
  }
  const styleConfig = styleMap[style] ?? styleMap['Modern Organic']
  paletteAnchors.push(...styleConfig.palette)
  imageryTerms.push(...styleConfig.imagery)
  designDirectives.push(styleConfig.directive)

  // --- Climate ---
  const climateMap: Record<string, string> = {
    'Arid / Desert': 'Thick walls for thermal mass, deep overhangs for shade, drought-tolerant planting with dramatic stone.',
    'Tropical / Humid': 'Elevated ventilation, deep verandas, tropical hardwoods, and lush water features.',
    'Cold / Alpine': 'Warm insulating materials, steeply pitched roofs, fireplace as central hearth, heavy timber.',
    'Temperate': 'Balanced indoor-outdoor flow, four-season materials, natural stone and wood.',
    'Coastal': 'Salt-resistant materials, expansive glazing toward water, bleached wood and sea glass tones.',
  }
  if (climateMap[climate]) designDirectives.push(climateMap[climate])

  // --- Terrain & views ---
  if (terrain === 'sloped' || terrain === 'hillside') {
    designDirectives.push('Multi-level architecture that steps with the terrain. Cantilevers and terraced gardens.')
    landscapeElements.push('terraced garden', 'hillside retaining walls', 'stair-stepped outdoor rooms')
  }
  if (views.toLowerCase().includes('mountain')) {
    imageryTerms.push('luxury mountain view estate')
    designDirectives.push('Architecture frames mountain views as living art — picture windows, view corridors, observation deck.')
  }
  if (views.toLowerCase().includes('ocean') || views.toLowerCase().includes('water')) {
    imageryTerms.push('luxury coastal estate ocean view')
    paletteAnchors.push('Sea Glass', 'Driftwood')
    designDirectives.push('Every primary room orients toward the water. Glass walls dissolve the boundary.')
  }

  // --- Lifestyle priorities ---
  if (priorities.includes('wellness')) {
    spaceArchetypes.push('Wellness Sanctuary')
    designDirectives.push('Wellness is woven into the architecture — a dedicated suite with sauna, cold plunge, and private garden access.')
    lifestyleImagery.push('luxury spa wellness interior natural light')
  }
  if (priorities.includes('entertaining')) {
    spaceArchetypes.push('Grand Entertainment Pavilion')
    designDirectives.push('The home is built for gathering — a great room that opens fully to the outdoor terrace, a chef\'s kitchen visible to guests.')
    lifestyleImagery.push('luxury outdoor entertaining terrace dinner')
  }
  if (priorities.includes('privacy')) {
    designDirectives.push('Privacy is architecture: dense screening planting, no sightlines between zones, gated motor court.')
    landscapeElements.push('dense hedgerow screening', 'walled garden', 'gated entry sequence')
  }
  if (priorities.includes('family')) {
    spaceArchetypes.push('Family Heart Room')
    designDirectives.push('Family life is celebrated — a warm kitchen-family room hub, a play lawn visible from the kitchen, rooms that connect.')
  }
  if (priorities.includes('productivity') || priorities.includes('work from home')) {
    spaceArchetypes.push("Founder's Studio")
    designDirectives.push('A dedicated creative studio or founder\'s office — acoustically isolated, with fiber, custom millwork, and a private entrance.')
    lifestyleImagery.push('luxury home office studio wood design')
  }
  if (priorities.includes('sustainability') || priorities.includes('off-grid')) {
    paletteAnchors.push('Reclaimed Wood', 'Rammed Earth')
    designDirectives.push('Sustainable systems are integrated: passive solar, rainwater harvesting, solar array, living walls.')
    lifestyleImagery.push('sustainable luxury home solar green roof')
  }

  // --- Rooms ---
  if (data.chefKitchen) {
    spaceArchetypes.push("Chef's Kitchen & Scullery")
    lifestyleImagery.push('luxury chef kitchen marble island professional')
  }
  if (data.wellnessSuite) {
    spaceArchetypes.push('Wellness Suite with Cold Plunge')
    lifestyleImagery.push('luxury spa interior sauna cold plunge')
  }
  if (data.officStudio) spaceArchetypes.push("Founder's Office")
  if (data.homeschoolRoom) {
    spaceArchetypes.push('Homeschool Atelier')
    designDirectives.push('The homeschool atelier has natural north light, built-in shelving, an art corner, and views to the garden.')
  }
  if (data.guestSuite) {
    spaceArchetypes.push('Guest Casita')
    designDirectives.push('Guest casita is architecturally connected but privately separated — its own entrance, kitchenette, and terrace.')
  }

  // --- Outdoor features ---
  if (data.poolSpa) {
    landscapeElements.push('infinity pool', 'heated spa', 'travertine pool deck', 'cabana')
    lifestyleImagery.push('luxury infinity pool sunset estate')
  }
  if (data.reflectingPond) {
    paletteAnchors.push('Water Blue-Green')
    landscapeElements.push('reflecting pond', 'courtyard fountain', 'formal water axis')
    spaceArchetypes.push('Water Courtyard')
    designDirectives.push('A formal water axis — reflecting pond or courtyard fountain — creates a meditative heart to the estate grounds.')
    lifestyleImagery.push('formal reflecting pool garden estate courtyard')
  }
  if (data.outdoorKitchen) {
    landscapeElements.push('outdoor kitchen', 'covered loggia', 'pizza oven', 'al fresco dining terrace')
    lifestyleImagery.push('luxury outdoor kitchen loggia terrace dining')
  }
  if (data.fireLounge) {
    landscapeElements.push('sunken fire lounge', 'firepit', 'perennial planting surround')
    lifestyleImagery.push('outdoor fire pit lounge luxury evening')
  }
  if (data.orchard) {
    landscapeElements.push('citrus orchard', 'fruit grove', 'orchard pathways')
    lifestyleImagery.push('citrus orchard garden estate fruit trees')
  }
  if (data.raisedBeds) {
    landscapeElements.push('kitchen garden', 'raised vegetable beds', 'cutting flower garden', 'compost bay')
    lifestyleImagery.push('raised garden beds vegetables herbs luxury')
  }
  if (data.greenhouse) {
    landscapeElements.push('greenhouse', 'potting shed', 'propagation benches')
    lifestyleImagery.push('luxury greenhouse interior plants glass')
  }
  if (data.sportCourt) {
    landscapeElements.push('pickleball court', 'sport court with night lighting')
    lifestyleImagery.push('luxury sport court pickleball estate')
  }
  if (data.playLawn) {
    landscapeElements.push('open play lawn', 'turf for recreation')
    lifestyleImagery.push('luxury estate lawn children family outdoor')
  }

  // Deduplicate
  const unique = <T>(arr: T[]) => [...new Set(arr)]

  return {
    paletteAnchors: unique(paletteAnchors),
    landscapeElements: unique(landscapeElements),
    spaceArchetypes: unique(spaceArchetypes),
    imageryTerms: unique(imageryTerms),
    lifestyleImagery: unique(lifestyleImagery).slice(0, 4),
    designDirectives: unique(designDirectives),
  }
}

// ---------------------------------------------------------------------------
// Dream home image generation prompt — built server-side, never sent to client
// ---------------------------------------------------------------------------

const STYLE_DESCRIPTORS: Record<string, string> = {
  'Modern Organic': 'modern organic architecture, raw travertine, bleached white oak, tadelakt plaster, bronze hardware, floor-to-ceiling steel windows',
  'California Hacienda': 'California hacienda architecture, thick adobe walls, clay tile roof, saltillo tile floors, rough-hewn timber beams, wrought iron details, bougainvillea-draped courtyard',
  'Modern Mediterranean': 'modern Mediterranean villa, crisp white plaster volumes, arched loggias, barrel tile roof, travertine floors, cypress tree allée',
  'Old Money Estate': 'old money estate, symmetrical limestone facade, slate roof, dark walnut millwork, antique brass hardware, mature tree canopy, commanding entry portico',
  'Ranch Modern': 'ranch modern estate, black board-and-batten siding, standing seam metal roof, stone fireplace, reclaimed oak, panoramic land views, wide covered porch',
  'Resort Villa': 'resort-style villa, open pavilion living, teak decking, coral stone, lush tropical screening, infinity pool as central architecture',
  'Organic Modern': 'organic modern home, rammed earth walls, raw travertine, natural plaster, deep overhanging eaves, minimal sightline steel windows, natural material palette',
}

const CLIMATE_DESCRIPTORS: Record<string, string> = {
  'Bay Area': 'coastal California, eucalyptus and olive trees, soft fog light, native California landscape',
  'Texas': 'Texas Hill Country, live oak canopy, native wildflower meadow, warm golden light, generous covered porches',
  'Desert': 'desert Southwest, saguaro cacti, agave landscape, dramatic sky, adobe earth tones, xeriscape grounds',
  'Coastal': 'oceanfront property, sea grasses, dune planting, salt air, morning mist, coastal light',
  'Mountain': 'mountain setting, aspen grove, native wildflower meadow, dramatic mountain views, snow-capable roof',
  'Tropical': 'tropical estate, dense palm screening, heliconias, frangipani, lush canopy, open-air pavilions',
  'Ranch acreage': 'working ranch acreage, native meadow grasses, open sky, productive orchard, pastoral landscape',
  'Suburban acreage': 'private suburban estate, dense evergreen screening, formal gated entry, curated grounds',
  'Lakeside': 'lakeside property, naturalistic shoreline, dock and boathouse, water reflection, native plantings',
}

const BUDGET_QUALITY: Record<string, string> = {
  'Under $1M': 'refined, well-crafted estate home',
  '$1M–$2M': 'luxury estate home, premium finishes throughout',
  '$2M–$5M': 'ultra-luxury estate, bespoke details, custom millwork',
  '$5M–$10M': 'trophy estate, world-class finishes, architectural landmark quality',
  '$10M+': 'billionaire compound, museum-quality craftsmanship, one-of-a-kind architectural statement',
}

function buildDreamHomePrompt(data: Record<string, unknown>): string {
  const aestheticStyle = (data.aestheticStyle as string) || 'Modern Organic'
  const climate = (data.climate as string) || ''
  const budgetRange = (data.budgetRange as string) || ''
  const squareFootage = (data.squareFootage as string) || ''
  const lifestylePriorities = Array.isArray(data.lifestylePriorities) ? data.lifestylePriorities as string[] : []

  const style = STYLE_DESCRIPTORS[aestheticStyle] ?? `${aestheticStyle} architecture`
  const climateDesc = climate ? (CLIMATE_DESCRIPTORS[climate] ?? climate.toLowerCase()) : 'private estate grounds'
  const quality = BUDGET_QUALITY[budgetRange] ?? 'luxury estate'
  const sqft = squareFootage ? `${squareFootage} square foot` : 'expansive'

  const outdoorFeatures: string[] = []
  if (data.poolSpa) outdoorFeatures.push('resort-quality infinity pool and spa')
  if (data.reflectingPond) outdoorFeatures.push('formal reflecting pond with water axis')
  if (data.outdoorKitchen) outdoorFeatures.push('fully equipped outdoor kitchen under covered loggia')
  if (data.fireLounge) outdoorFeatures.push('sunken fire lounge with built-in firepit')
  if (data.orchard) outdoorFeatures.push('citrus and fruit orchard')
  if (data.greenhouse) outdoorFeatures.push('estate greenhouse and potting shed')
  if (data.sportCourt) outdoorFeatures.push('sport court')

  const indoorFeatures: string[] = []
  if (data.wellnessSuite) indoorFeatures.push('private wellness suite with sauna and cold plunge')
  if (data.chefKitchen) indoorFeatures.push("chef's kitchen with professional appliances")
  if (data.homeschoolRoom) indoorFeatures.push('dedicated homeschool atelier with north light')
  if (data.guestSuite) indoorFeatures.push('detached guest casita')
  if (data.garageSpaces && parseInt(data.garageSpaces as string) >= 4) indoorFeatures.push('show garage with polished concrete floors')

  const parts: string[] = [
    `Photorealistic architectural visualization of a ${sqft} ${quality},`,
    style + ',',
    `set in a ${climateDesc}.`,
  ]
  if (outdoorFeatures.length) parts.push(`Outdoor estate features include ${outdoorFeatures.join(', ')}.`)
  if (indoorFeatures.length) parts.push(`Interior highlights: ${indoorFeatures.join(', ')}.`)
  if (lifestylePriorities.length) parts.push(`Designed for ${lifestylePriorities.slice(0, 4).map(p => p.toLowerCase()).join(', ')}.`)
  parts.push(
    'Golden hour lighting, Architectural Digest editorial quality, ultra-detailed, 8K resolution.',
    'Photographed by a luxury real estate photographer. No watermarks, no people.',
  )

  return parts.join(' ')
}

// ---------------------------------------------------------------------------
// Gemini prompt — injected with pre-built concept context + dream home prompt
// ---------------------------------------------------------------------------

function buildConceptBoardPrompt(data: Record<string, unknown>, ctx: ConceptContext): string {
  return `You are an elite luxury estate designer and architectural creative director. Generate a bespoke dream home concept board.

ESTATE PROFILE:
- Aesthetic style: ${data.aestheticStyle || 'Modern Organic'}
- Family size: ${data.familySize || '4-6'}, children: ${data.children || 'yes'}
- Lifestyle priorities: ${Array.isArray(data.lifestylePriorities) ? (data.lifestylePriorities as string[]).join(', ') : 'wellness, privacy'}
- Climate: ${data.climate || 'temperate'} | Terrain: ${data.terrain || 'level'} | Views: ${data.views || 'natural landscape'}
- Size: ${data.squareFootage || '5,000–7,000 sf'} | Budget: ${data.budgetRange || 'Premium'}
- Multigenerational: ${data.multigenerational || false}

DESIGN DIRECTIVES (follow these exactly — they reflect the client's actual selections):
${ctx.designDirectives.map((d, i) => `${i + 1}. ${d}`).join('\n')}

MATERIAL PALETTE ANCHORS (incorporate these into materialPalette — use exact names, add 1-2 supporting materials):
${ctx.paletteAnchors.join(', ')}

LANDSCAPE ELEMENTS (these specific features must appear in outdoorEthos and keySpaces where relevant):
${ctx.landscapeElements.length ? ctx.landscapeElements.join(', ') : 'curated estate grounds'}

SPACE ARCHETYPES (these specific spaces must be included in keySpaces):
${ctx.spaceArchetypes.length ? ctx.spaceArchetypes.join(', ') : 'primary suite, great room, chef kitchen'}

Generate the concept board as JSON:
{
  "aestheticVision": "2-3 sentence evocative description — must reflect the specific style, climate, and priorities above",
  "architecturalCharacter": "1-2 sentences on architectural form — must be specific to this style, not generic",
  "materialPalette": [
    { "name": "material name from anchors above", "hex": "#hexcode", "usage": "specific location on this estate" }
  ],
  "keySpaces": [
    { "name": "space name from archetypes above", "vignette": "2-sentence cinematic description specific to these inputs", "unsplashQuery": "3-5 word Pexels photo search for this exact space" }
  ],
  "outdoorEthos": "2 sentences — must name specific landscape elements from the list above",
  "lightAndMood": "1-2 sentences — light quality specific to this climate and aesthetic",
  "signatureDetails": ["detail 1", "detail 2", "detail 3", "detail 4", "detail 5"],
  "moodWords": ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8"],
  "heroQuery": "${ctx.imageryTerms[0] ?? 'luxury estate exterior'}",
  "lifestyleQueries": ${JSON.stringify(ctx.lifestyleImagery)}
}

Rules:
- materialPalette: use the palette anchors provided — 5-6 entries with accurate hex codes
- keySpaces: 4-5 spaces, ALL drawn from the space archetypes list above
- signatureDetails: 5 details unique to THIS estate's combination of style + features — not generic
- moodWords: 8 words that capture THIS estate's emotional essence
- heroQuery and lifestyleQueries are already set above — use them verbatim
- Write with the gravitas of Architectural Digest — precise, warm, aspirational
- Respond ONLY with the JSON, no preamble`
}

// ---------------------------------------------------------------------------
// Pexels photo fetcher
// ---------------------------------------------------------------------------

async function fetchPexelsPhoto(query: string, pexelsKey: string): Promise<string | null> {
  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`
    const res = await fetch(url, { headers: { Authorization: pexelsKey } })
    if (!res.ok) return null
    const data = await res.json() as { photos?: Array<{ src: { large: string } }> }
    const photos = data.photos ?? []
    if (!photos.length) return null
    const pick = photos[Math.floor(Math.random() * photos.length)]
    return pick.src.large
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// API endpoint
// ---------------------------------------------------------------------------

app.post('/api/concept-board', async (req, res) => {
  const geminiKey = process.env.GEMINI_API_KEY
  if (!geminiKey) {
    res.status(500).json({ error: 'GEMINI_API_KEY is not set. Add it to your .env file.' })
    return
  }

  try {
    const ctx = buildConceptContext(req.body)
    const dreamHomePrompt = buildDreamHomePrompt(req.body)
    console.log('\n--- DREAM HOME PROMPT ---\n' + dreamHomePrompt + '\n---\n')

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: buildConceptBoardPrompt(req.body, ctx) + `\n\nDREAM HOME VISUAL PROMPT (use this as additional creative direction for aestheticVision, moodWords, and signatureDetails):\n${dreamHomePrompt}` }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    )

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error((err as { error?: { message?: string } }).error?.message || `Gemini error ${response.status}`)
    }

    const result = await response.json() as {
      candidates: Array<{ content: { parts: Array<{ text: string }> } }>
    }
    const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
    const jsonMatch = rawText.match(/```json\s*([\s\S]*?)```/) || rawText.match(/(\{[\s\S]*\})/)
    const jsonStr = jsonMatch ? jsonMatch[1] : rawText.trim()
    const conceptBoard = JSON.parse(jsonStr) as {
      heroQuery?: string
      lifestyleQueries?: string[]
      keySpaces?: Array<{ unsplashQuery?: string }>
    }

    // Fetch Pexels photos
    const pexelsKey = process.env.PEXELS_API_KEY
    if (pexelsKey) {
      // Use our pre-built imagery terms for the hero — more reliable than Gemini's query
      const heroQuery = ctx.imageryTerms[0] ?? conceptBoard.heroQuery ?? 'luxury estate exterior'
      const lifestyleQueries = ctx.lifestyleImagery.length
        ? ctx.lifestyleImagery
        : (conceptBoard.lifestyleQueries ?? [])

      const [heroPhoto, ...spaceAndLifestylePhotos] = await Promise.all([
        fetchPexelsPhoto(heroQuery, pexelsKey),
        ...(conceptBoard.keySpaces ?? []).map((s) =>
          fetchPexelsPhoto(s.unsplashQuery ?? 'luxury interior', pexelsKey)
        ),
        ...lifestyleQueries.map((q) => fetchPexelsPhoto(q, pexelsKey)),
      ])

      const spaceCount = (conceptBoard.keySpaces ?? []).length
      const spacePhotos = spaceAndLifestylePhotos.slice(0, spaceCount)
      const lifestylePhotos = spaceAndLifestylePhotos.slice(spaceCount)

      res.json({
        ...conceptBoard,
        heroPhoto,
        keySpaces: (conceptBoard.keySpaces ?? []).map((s, i) => ({
          ...s,
          photo: spacePhotos[i] ?? null,
        })),
        lifestylePhotos,
      })
      return
    }

    res.json(conceptBoard)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Concept board error:', message)
    res.status(500).json({ error: message })
  }
})

// ---------------------------------------------------------------------------
// Rate-limited image queue (respects OpenAI's 5 imgs/min limit)
// ---------------------------------------------------------------------------

interface QueuedJob {
  resolve: (result: GenerateImageResult) => void
  reject: (err: Error) => void
  run: () => Promise<GenerateImageResult>
}

const imageQueue: QueuedJob[] = []
let activeJobs = 0
const MAX_CONCURRENT = 4          // stay under 5/min with breathing room
const RETRY_DELAY_MS = 15_000     // wait 15s after a rate-limit error

async function drainQueue() {
  while (imageQueue.length > 0 && activeJobs < MAX_CONCURRENT) {
    const job = imageQueue.shift()!
    activeJobs++
    job.run()
      .then(result => { job.resolve(result); activeJobs--; drainQueue() })
      .catch(async (err: Error) => {
        const isRateLimit = err.message?.toLowerCase().includes('rate limit') ||
                            err.message?.toLowerCase().includes('429')
        if (isRateLimit) {
          // Put the job back at the front and pause the queue
          imageQueue.unshift(job)
          activeJobs--
          console.log(`Rate limit hit — pausing queue ${RETRY_DELAY_MS / 1000}s`)
          await new Promise(r => setTimeout(r, RETRY_DELAY_MS))
          drainQueue()
        } else {
          job.reject(err)
          activeJobs--
          drainQueue()
        }
      })
  }
}

function enqueueImageJob(run: () => Promise<GenerateImageResult>): Promise<GenerateImageResult> {
  return new Promise((resolve, reject) => {
    imageQueue.push({ resolve, reject, run })
    drainQueue()
  })
}

// ---------------------------------------------------------------------------
// Provider-agnostic image generation endpoint
// ---------------------------------------------------------------------------

function resolveProvider(requestedProvider: ProviderName | undefined) {
  const selected: ProviderName = requestedProvider ?? (process.env.IMAGE_PROVIDER as ProviderName) ?? DEFAULT_PROVIDER
  const openaiKey = process.env.OPENAI_API_KEY
  const geminiKey = process.env.GOOGLE_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY

  if (selected === 'openai' && openaiKey) {
    const model = process.env.OPENAI_IMAGE_MODEL ?? IMAGE_MODELS.openai.defaultModel
    return createOpenAIImageProvider(openaiKey, model)
  }
  if (selected === 'gemini' && geminiKey) {
    const model = process.env.GEMINI_IMAGE_MODEL ?? IMAGE_MODELS.gemini.defaultModel
    return createGeminiImageProvider(geminiKey, model)
  }
  if (selected === 'dalle' && openaiKey) {
    return createDalleImageProvider(openaiKey)
  }

  // Auto-fallback chain: openai → dalle → gemini
  if (openaiKey) return createDalleImageProvider(openaiKey)
  if (geminiKey) {
    const model = process.env.GEMINI_IMAGE_MODEL ?? IMAGE_MODELS.gemini.defaultModel
    return createGeminiImageProvider(geminiKey, model)
  }

  return null
}

app.post('/api/generate-image', async (req, res) => {
  const body = req.body as GenerateImageRequest & { provider?: ProviderName; formData?: Record<string, unknown> }

  // Support legacy calls that pass raw form data (uses buildDreamHomePrompt)
  const prompt: string = body.prompt ?? (body.formData ? buildDreamHomePrompt(body.formData) : '')
  if (!prompt) {
    res.status(400).json({ error: 'prompt is required' })
    return
  }

  const provider = resolveProvider(body.provider)
  if (!provider) {
    res.status(500).json({ error: 'No image provider is configured. Set OPENAI_API_KEY or GOOGLE_GEMINI_API_KEY in .env' })
    return
  }

  console.log(`\n--- IMAGE GENERATION [${provider.name}/${provider.model}] section:${body.sectionName ?? '?'} ---`)

  try {
    const req = {
      prompt,
      aspectRatio: body.aspectRatio ?? '16:9' as const,
      quality: body.quality ?? 'medium' as const,
      referenceImageUrl: body.referenceImageUrl,
      outputType: 'url' as const,
      sectionName: body.sectionName,
      formId: body.formId,
    }
    const result: GenerateImageResult = await enqueueImageJob(() => provider.generate(req))
    res.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`Image generation error [${provider.name}]:`, message)
    res.status(500).json({ error: message })
  }
})

// Active provider info (for admin UI)
app.get('/api/image-provider', (_req, res) => {
  const selected: ProviderName = (process.env.IMAGE_PROVIDER as ProviderName) ?? DEFAULT_PROVIDER
  const provider = resolveProvider(selected)
  res.json({
    active: provider ? { name: provider.name, model: provider.model, label: IMAGE_MODELS[provider.name].label } : null,
    available: {
      openai: !!process.env.OPENAI_API_KEY,
      gemini: !!(process.env.GOOGLE_GEMINI_API_KEY ?? process.env.GEMINI_API_KEY),
      dalle: !!process.env.OPENAI_API_KEY,
    },
  })
})

// ---------------------------------------------------------------------------
// Copy generation — Claude writes personalized estate name, narrative, etc.
// ---------------------------------------------------------------------------
app.post('/api/generate-copy', async (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY is not configured' })
    return
  }

  const formData = req.body?.formData
  if (!formData) {
    res.status(400).json({ error: 'formData is required' })
    return
  }

  const client = new Anthropic({ apiKey })

  const outdoorFeatures = [
    formData.poolSpa && 'pool & spa',
    formData.orchard && 'fruit orchard',
    formData.greenhouse && 'greenhouse',
    formData.reflectingPond && 'reflecting pond',
    formData.outdoorKitchen && 'outdoor kitchen',
    formData.fireLounge && 'fire lounge',
    formData.sportCourt && 'sport court',
    formData.playLawn && 'play lawn',
    formData.raisedBeds && 'raised garden beds',
  ].filter(Boolean).join(', ') || 'curated landscaping'

  const interiorFeatures = [
    formData.wellnessSuite && 'wellness suite (sauna, cold plunge, spa)',
    formData.chefKitchen && "chef's kitchen",
    formData.homeschoolRoom && 'learning atelier',
    formData.officStudio && "founder's studio",
    formData.guestSuite && 'guest suite',
    formData.pantry && 'walk-in pantry',
  ].filter(Boolean).join(', ') || 'thoughtfully appointed rooms'

  const prompt = `You are writing luxury real estate copy for a personalized AI-generated estate concept board for My Everlasting Home — a SCIP (Structural Concrete Insulated Panel) custom estate builder.

CRITICAL CONTEXT — THIS IS A SCIP HOME:
SCIP construction uses a structural concrete core reinforced with steel mesh, sandwiched between insulating EPS foam panels, finished with reinforced concrete render on both faces. The result is a monolithic, fortress-like structure with walls 8–12 inches thick, exceptional thermal mass, near-silent interiors, and a build quality that outlasts wood-frame construction by generations. SCIP homes are disaster-resistant (hurricane, seismic, fire), energy-efficient, and built without the off-gassing, mold vulnerability, or pest risk of conventional framing. This is not a green gimmick — it is a fundamentally different class of building.

Your copy must reflect this. The estate narrative should reference the permanence, solidity, and performance of the build — not just the aesthetics. Words like "built to last generations," "fortress-like serenity," "thermal mass," "monolithic construction," "concrete core," "indestructible," "silent walls," "legacy build" are appropriate. Avoid generic luxury real estate phrases like "open concept," "smart home," or "turnkey."

Generate the following fields for this specific family's dream estate:

FAMILY & LIFESTYLE:
- Family size: ${formData.familySize}
- Children: ${formData.children}
- Multigenerational: ${formData.multigenerational ? 'yes' : 'no'}
- Lifestyle priorities: ${formData.lifestylePriorities?.join(', ') || 'beauty, wellness, legacy'}

PROPERTY:
- Land size: ${formData.landSize}
- Climate / region: ${formData.climate}
- Terrain: ${formData.terrain}
- Views: ${formData.views}

HOME PROGRAM:
- Bedrooms: ${formData.bedrooms}, Bathrooms: ${formData.bathrooms}
- Square footage: ${formData.squareFootage} sq ft
- Garage: ${formData.garageSpaces} cars
- Interior features: ${interiorFeatures}

OUTDOOR ESTATE:
- ${outdoorFeatures}

STYLE & BUILD:
- Aesthetic: ${formData.aestheticStyle}
- Budget range: ${formData.budgetRange}
- Timeline: ${formData.buildTimeline}

Return ONLY a valid JSON object with these exact keys:
{
  "estateName": "A unique, elegant estate name (e.g. 'The Hawthorn Reserve', 'Casa del Viento', 'Ridgeline House'). 2–4 words. Should reflect the aesthetic style, climate, or family character. Not generic.",
  "estateSubtitle": "One sentence, 10–18 words. Describes the essence of this specific estate — what makes it theirs. Mentions family, lifestyle priority, or setting.",
  "estateNarrative": "Two sentences, 40–60 words total. Evocative, grounded, specific to their form answers. Mentions the climate/region, aesthetic materials, and their top lifestyle priority. Reads like editorial copy in a luxury architecture magazine.",
  "editorialNote": "One short line, 8–14 words, handwritten-note style. Warm, personal, aspirational. Like a caption on a mood board. No quotes.",
  "footerTagline": "4–7 words. Gold italic serif. A quiet family motto or generational sentiment. E.g. 'This is our legacy' or 'Rooted in beauty. Built to last.'",
  "footerMonogram": "2–3 uppercase letters derived from the estate name initials."
}

No explanation. No markdown. Return only the raw JSON object.`

  console.log('\n--- COPY GENERATION [Claude] ---')

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in Claude response')

    const copy = JSON.parse(jsonMatch[0])
    console.log(`Estate name: "${copy.estateName}"`)
    res.json(copy)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Copy generation error:', message)
    res.status(500).json({ error: message })
  }
})

// ---------------------------------------------------------------------------
// Stripe — $49 pay-per-board checkout
// ---------------------------------------------------------------------------
app.post('/api/create-checkout-session', async (req, res) => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey || secretKey.includes('YOUR_SECRET_KEY')) {
    res.status(500).json({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY to .env' })
    return
  }

  const stripe = new Stripe(secretKey)
  const price = parseInt(process.env.BOARD_PRICE_CENTS ?? '4900')
  const origin = req.headers.origin ?? `http://localhost:${PORT}`

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: price,
          product_data: {
            name: 'Estate Concept Board',
            description: 'AI-generated luxury estate concept board — personalized to your family, lifestyle, and property.',
          },
        },
        quantity: 1,
      }],
      success_url: `${origin}/?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?payment_cancelled=true`,
    })
    res.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Stripe checkout error:', message)
    res.status(500).json({ error: message })
  }
})

app.get('/api/verify-payment', async (req, res) => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey || secretKey.includes('YOUR_SECRET_KEY')) {
    res.status(500).json({ error: 'Stripe is not configured' })
    return
  }

  const sessionId = req.query.session_id as string
  if (!sessionId) {
    res.status(400).json({ error: 'session_id is required' })
    return
  }

  try {
    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const paid = session.payment_status === 'paid'
    res.json({ paid, status: session.payment_status, sessionId })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    res.status(500).json({ error: message })
  }
})

// ---------------------------------------------------------------------------
// Board brief — generates copy via Claude, fills all template slots, returns
// the complete brief as JSON + markdown string
// ---------------------------------------------------------------------------
app.post('/api/generate-brief', async (req, res) => {
  const formData = req.body?.formData
  if (!formData) {
    res.status(400).json({ error: 'formData is required' })
    return
  }

  // Step 1: generate AI copy (same logic as /api/generate-copy)
  let copyOverrides: Record<string, string> = {}
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (apiKey) {
    try {
      const copyRes = await fetch(`http://localhost:${PORT}/api/generate-copy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData }),
      })
      if (copyRes.ok) {
        copyOverrides = await copyRes.json() as Record<string, string>
      }
    } catch {
      // Proceed with template fallbacks if copy generation fails
    }
  }

  // Step 2: build full brief using deterministic formulas + AI copy
  try {
    const { buildBoardBrief, briefToMarkdown } = await import('./src/lib/buildBoardBrief.js')
    const brief = buildBoardBrief(formData, copyOverrides)
    const markdown = briefToMarkdown(brief)
    console.log(`\n--- BOARD BRIEF generated for "${brief.estateName}" ---`)
    res.json({ brief, markdown })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('Brief generation error:', message)
    res.status(500).json({ error: message })
  }
})

if (IS_PROD) {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  if (!IS_PROD) {
    console.log('API available at http://localhost:' + PORT + '/api/concept-board')
  }
})
