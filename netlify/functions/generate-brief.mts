import type { Handler } from '@netlify/functions'
import Anthropic from '@anthropic-ai/sdk'

// Inline buildBoardBrief via dynamic import — Netlify esbuild will bundle it
const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' }
  }

  const body = JSON.parse(event.body ?? '{}')
  const formData = body.formData
  if (!formData) {
    return { statusCode: 400, body: JSON.stringify({ error: 'formData is required' }) }
  }

  // Step 1 — Claude copy generation
  let copyOverrides: Record<string, string> = {}
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (apiKey) {
    try {
      const client = new Anthropic({ apiKey })

      const outdoorFeatures = [
        formData.poolSpa && 'pool & spa',
        formData.orchard && 'fruit orchard',
        formData.greenhouse && 'greenhouse',
        formData.reflectingPond && 'reflecting pond',
        formData.outdoorKitchen && 'outdoor kitchen',
        formData.fireLounge && 'fire lounge',
        formData.sportCourt && 'sport court',
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
SCIP construction uses a structural concrete core reinforced with steel mesh, sandwiched between insulating EPS foam panels, finished with reinforced concrete render on both faces. The result is a monolithic, fortress-like structure with walls 8–12 inches thick, exceptional thermal mass, near-silent interiors, and a build quality that outlasts wood-frame construction by generations. SCIP homes are disaster-resistant (hurricane, seismic, fire), energy-efficient, and built without the off-gassing, mold vulnerability, or pest risk of conventional framing.

Your copy must reflect this permanence, solidity, and performance. Words like "built to last generations," "fortress-like serenity," "thermal mass," "monolithic construction," "concrete core," "indestructible," "silent walls," "legacy build" are appropriate.

Generate the following fields for this specific family's dream estate:

FAMILY & LIFESTYLE:
- Family size: ${formData.familySize}
- Children: ${formData.children}
- Multigenerational: ${formData.multigenerational ? 'yes' : 'no'}
- Lifestyle priorities: ${formData.lifestylePriorities?.join(', ') || 'beauty, wellness, legacy'}

PROPERTY:
- Land size: ${formData.landSize}
- Climate / region: ${formData.climate}
- Aesthetic: ${formData.aestheticStyle}
- Square footage: ${formData.squareFootage} sq ft
- Budget range: ${formData.budgetRange}

HOME PROGRAM:
- Interior features: ${interiorFeatures}

OUTDOOR ESTATE:
- ${outdoorFeatures}

Return ONLY a valid JSON object with these exact keys:
{
  "estateName": "A unique, elegant estate name (2–4 words). Should reflect the aesthetic style, climate, or family character. Not generic.",
  "estateSubtitle": "One sentence, 10–18 words. Describes the essence of this specific estate.",
  "estateNarrative": "Two sentences, 40–60 words total. Evocative, grounded, specific to their form answers. Mentions the climate/region, aesthetic materials, and their top lifestyle priority. Reads like editorial copy in a luxury architecture magazine.",
  "editorialNote": "One short line, 8–14 words, handwritten-note style. Warm, personal, aspirational.",
  "footerTagline": "4–7 words. A quiet family motto or generational sentiment.",
  "footerMonogram": "2–3 uppercase letters derived from the estate name initials."
}

No explanation. No markdown. Return only the raw JSON object.`

      const message = await client.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 800,
        messages: [{ role: 'user', content: prompt }],
      })

      const text = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) copyOverrides = JSON.parse(jsonMatch[0])
    } catch {
      // Fallback to template copy if Claude fails
    }
  }

  // Step 2 — build full brief
  try {
    const { buildBoardBrief, briefToMarkdown } = await import('../../src/lib/buildBoardBrief.js')
    const brief = buildBoardBrief(formData, copyOverrides)
    const markdown = briefToMarkdown(brief)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief, markdown }),
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { statusCode: 500, body: JSON.stringify({ error: message }) }
  }
}

export { handler }
