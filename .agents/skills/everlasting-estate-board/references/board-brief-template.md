# Estate Board Brief — {{estateName}}

Generated from intake form. All `{{variable}}` slots are filled automatically.
This document is the complete specification for generating the board.

---

## IDENTITY

| Field | Value |
|---|---|
| Estate Name | {{estateName}} |
| Monogram | {{footerMonogram}} |
| Subtitle | {{estateSubtitle}} |
| Editorial Note | {{editorialNote}} |
| Footer Tagline | {{footerTagline}} |

**Narrative:**
{{estateNarrative}}

---

## SECTION 2 — HERO IMAGE PROMPT

**Quality:** high · **Size:** 1536×1024 · **Aspect:** 16:9

```
{{heroImagePrompt}}
```

---

## SECTION 3 — FLOOR PLAN PROMPTS

### Main Floor
**Quality:** medium · **Size:** 1024×1024 · **Aspect:** 1:1

Zones: {{mainFloorZones}}

```
{{mainFloorImagePrompt}}
```

---

### Upper Floor
**Quality:** medium · **Size:** 1024×1024 · **Aspect:** 1:1

Zones: {{upperFloorZones}}

```
{{upperFloorImagePrompt}}
```

---

### Lower · Wellness Level
**Quality:** medium · **Size:** 1024×1024 · **Aspect:** 1:1

Zones: {{wellnessLevelZones}}

```
{{wellnessLevelImagePrompt}}
```

---

### Estate Site Plan
**Quality:** medium · **Size:** 1024×1024 · **Aspect:** 1:1

Zones: {{sitePlanZones}}

```
{{sitePlanImagePrompt}}
```

---

## SECTION 4 — INTERIOR LIFESTYLE TILES (8)

Label: `LIFE LIVED BEAUTIFULLY`

{{interiorTiles}}

---

## SECTION 5 — ESTATE LIFESTYLE TILES (10)

Label: `THE {{estateNameUpper}} LIFESTYLE`

{{lifestyleTiles}}

---

## SECTION 6 — SCIP BENEFITS (6)

Header: `BUILT BETTER. BUILT TO LAST.`

{{scipBenefits}}

---

## SECTION 7 — FOOTER

| Field | Value |
|---|---|
| Monogram | {{footerMonogram}} |
| Estate Name | {{estateName}} |
| Tagline | {{footerTagline}} |
| Sub-line | Built for now. Designed for generations. |
| Disclaimer | Conceptual vision board only. Not construction documents. |

---

## FORM DATA SUMMARY

| Field | Value |
|---|---|
| Family size | {{familySize}} |
| Children | {{children}} |
| Multigenerational | {{multigenerational}} |
| Lifestyle priorities | {{lifestylePriorities}} |
| Land size | {{landSize}} |
| Climate / Region | {{climate}} |
| Terrain | {{terrain}} |
| Views | {{views}} |
| Bedrooms | {{bedrooms}} |
| Bathrooms | {{bathrooms}} |
| Square footage | {{squareFootage}} sq ft |
| Garage | {{garageSpaces}} cars |
| Aesthetic style | {{aestheticStyle}} |
| Budget range | {{budgetRange}} |
| Build timeline | {{buildTimeline}} |
