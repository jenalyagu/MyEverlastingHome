import type { EstateFormData } from './blueprintGenerator'
import { generateEstateBlueprint, type EstateBlueprintData, type EstateCopyOverrides } from './generateEstateBlueprint'

export interface BoardBrief {
  // Identity
  estateName: string
  footerMonogram: string
  estateSubtitle: string
  editorialNote: string
  footerTagline: string
  estateNarrative: string

  // Images
  heroImagePrompt: string

  // Floor plans
  mainFloorZones: string[]
  upperFloorZones: string[]
  wellnessLevelZones: string[]
  sitePlanZones: string[]
  mainFloorImagePrompt: string
  upperFloorImagePrompt: string
  wellnessLevelImagePrompt: string
  sitePlanImagePrompt: string

  // Tiles
  interiorTiles: Array<{ label: string; prompt: string }>
  lifestyleTiles: Array<{ label: string; prompt: string }>

  // SCIP
  scipBenefits: Array<{ title: string; description: string }>

  // Raw board data (for generation pipeline)
  boardData: EstateBlueprintData

  // Form echo
  formData: EstateFormData
}

export function buildBoardBrief(formData: EstateFormData, copyOverrides?: EstateCopyOverrides): BoardBrief {
  const boardData = generateEstateBlueprint(formData, copyOverrides)

  return {
    estateName: boardData.estateName,
    footerMonogram: boardData.footerMonogram,
    estateSubtitle: boardData.estateSubtitle,
    editorialNote: boardData.editorialNote,
    footerTagline: boardData.footerTagline,
    estateNarrative: boardData.estateNarrative,

    heroImagePrompt: boardData.heroImagePrompt,

    mainFloorZones: boardData.mainFloorZones.map(z => z.name),
    upperFloorZones: boardData.upperFloorZones.map(z => z.name),
    wellnessLevelZones: boardData.wellnessLevelZones.map(z => z.name),
    sitePlanZones: boardData.sitePlanZones.map(z => z.name),
    mainFloorImagePrompt: boardData.mainFloorImagePrompt,
    upperFloorImagePrompt: boardData.upperFloorImagePrompt,
    wellnessLevelImagePrompt: boardData.wellnessLevelImagePrompt,
    sitePlanImagePrompt: boardData.sitePlanImagePrompt,

    interiorTiles: boardData.interiorLifestyleTiles.map(t => ({ label: t.label, prompt: t.prompt })),
    lifestyleTiles: boardData.estateLifestyleTiles.map(t => ({ label: t.label, prompt: t.prompt })),

    scipBenefits: boardData.scipBenefits.map(b => ({ title: b.title, description: b.description })),

    boardData,
    formData,
  }
}

export function briefToMarkdown(brief: BoardBrief): string {
  const fd = brief.formData

  const interiorTilesMd = brief.interiorTiles
    .map((t, i) => `**Tile ${i + 1} — ${t.label}**\n\`\`\`\n${t.prompt}\n\`\`\``)
    .join('\n\n')

  const lifestyleTilesMd = brief.lifestyleTiles
    .map((t, i) => `**Tile ${i + 1} — ${t.label}**\n\`\`\`\n${t.prompt}\n\`\`\``)
    .join('\n\n')

  const scipMd = brief.scipBenefits
    .map((b, i) => `**${i + 1}. ${b.title}** — ${b.description}`)
    .join('\n')

  return `# Estate Board Brief — ${brief.estateName}

---

## IDENTITY

| Field | Value |
|---|---|
| Estate Name | ${brief.estateName} |
| Monogram | ${brief.footerMonogram} |
| Subtitle | ${brief.estateSubtitle} |
| Editorial Note | ${brief.editorialNote} |
| Footer Tagline | ${brief.footerTagline} |

**Narrative:**
${brief.estateNarrative}

---

## SECTION 2 — HERO IMAGE PROMPT

**Quality:** high · **Size:** 1536×1024 · **Aspect:** 16:9

\`\`\`
${brief.heroImagePrompt}
\`\`\`

---

## SECTION 3 — FLOOR PLAN PROMPTS

### Main Floor
**Zones:** ${brief.mainFloorZones.join(', ')}

\`\`\`
${brief.mainFloorImagePrompt}
\`\`\`

### Upper Floor
**Zones:** ${brief.upperFloorZones.join(', ')}

\`\`\`
${brief.upperFloorImagePrompt}
\`\`\`

### Lower · Wellness Level
**Zones:** ${brief.wellnessLevelZones.join(', ')}

\`\`\`
${brief.wellnessLevelImagePrompt}
\`\`\`

### Estate Site Plan
**Zones:** ${brief.sitePlanZones.join(', ')}

\`\`\`
${brief.sitePlanImagePrompt}
\`\`\`

---

## SECTION 4 — INTERIOR LIFESTYLE TILES (8)

${interiorTilesMd}

---

## SECTION 5 — ESTATE LIFESTYLE TILES (10)

${lifestyleTilesMd}

---

## SECTION 6 — SCIP BENEFITS (6)

${scipMd}

---

## SECTION 7 — FOOTER

| Field | Value |
|---|---|
| Monogram | ${brief.footerMonogram} |
| Estate Name | ${brief.estateName} |
| Tagline | *${brief.footerTagline}* |
| Sub-line | Built for now. Designed for generations. |

---

## FORM DATA SUMMARY

| Field | Value |
|---|---|
| Family size | ${fd.familySize} |
| Children | ${fd.children} |
| Multigenerational | ${fd.multigenerational ? 'Yes' : 'No'} |
| Lifestyle priorities | ${Array.isArray(fd.lifestylePriorities) ? fd.lifestylePriorities.join(', ') : fd.lifestylePriorities} |
| Land size | ${fd.landSize} |
| Climate / Region | ${fd.climate} |
| Terrain | ${fd.terrain} |
| Views | ${fd.views} |
| Bedrooms | ${fd.bedrooms} |
| Bathrooms | ${fd.bathrooms} |
| Square footage | ${fd.squareFootage} sq ft |
| Garage | ${fd.garageSpaces} cars |
| Aesthetic style | ${fd.aestheticStyle} |
| Budget range | ${fd.budgetRange} |
| Build timeline | ${fd.buildTimeline} |
`
}
