# Estate Board Layout Rules

The board is a single wide horizontal document — cinematic, print-quality, editorial. It reads left-to-right, top-to-bottom through 7 sections. Every section has a defined role; none are decorative padding.

Reference image: `../assets/mock-residence-reference.png`

---

## Section 1 — Masthead

**Purpose:** Establishes the estate identity before the viewer sees the house.

**Layout:**
- Far left: monogram block (1–3 uppercase letters in a bordered square) + estate name in large serif caps with generous letter-spacing
- Below estate name: subtitle in light serif italics, ~14–18 words
- Far right: a short editorial note, right-aligned, italic serif, 8–14 words — handwritten-note energy

**Typography rules:**
- Estate name: Cormorant Garamond, 2.5–3rem, weight 600, tracking 0.25em
- Subtitle: Cormorant Garamond, 1rem, weight 300, italic
- Editorial note: Cormorant Garamond, 0.8rem, weight 300, italic, color `--eb-stone`

**Do not:** center the masthead. It is always left-anchored with the editorial note floating right.

---

## Section 2 — Hero Cinematic Image

**Purpose:** First and only full-width photographic impression of the estate exterior.

**Dimensions:** Full board width, approximately 380–420px tall (at board's native rendering width ~1400px). Aspect ratio approximately 4:1 wide-cinematic.

**Image rules:**
- No text overlaid on the image
- No border or frame — bleeds edge to edge
- Object-fit: cover, focal point on front facade
- Thin gold rule line (`--eb-gold`, 1px) above and below as section separators

**What the image should show:**
- Full exterior front/side elevation at golden hour or soft morning light
- Architecture matches the selected aesthetic style (see `image-prompt-formulas.md`)
- Lush landscaping, motor court if applicable, pool/water feature visible if present
- No people, no cars (unless motor court ambiance is requested)
- Soft natural light — never harsh midday sun

---

## Section 3 — Floor Plans Row

**Purpose:** Communicates the spatial logic of the estate across 4 plan views.

**Layout:** 4 equal-width columns, side by side, no gap or 1px rule between them.

**Each panel contains (top to bottom):**
1. Panel header — floor name in small-caps gold tracking: `MAIN FLOOR`, `UPPER FLOOR`, `LOWER · WELLNESS LEVEL`, `ESTATE SITE PLAN`
2. Room/zone list — 5–12 lines, light serif 0.6–0.65rem, left-aligned, bullet or plain
3. Floor plan drawing — AI-generated watercolor architectural rendering, bird's-eye view (see `image-prompt-formulas.md`)

**Floor plan drawing rules:**
- Cream/warm white background
- Thin black architectural linework
- Soft watercolor wash fills — warm neutrals, no primary colors
- Serif room labels inside rooms
- No photographic textures

**Site plan (4th panel) differs:**
- Shows full property footprint from above
- Includes landscaping, pool zone, driveway, outbuildings, property boundary
- More aerial/topographic feel than the interior plans

---

## Section 4 — Interior Lifestyle Strip ("Life Lived Beautifully")

**Purpose:** Shows the quality of interior life — rooms, light, finish.

**Layout:**
- Section label left-aligned: `LIFE LIVED BEAUTIFULLY` in gold small-caps with a preceding rule line
- 8 images in a single horizontal row, equal-width, minimal gap (4–8px)
- Each image: aspect ratio 3:2, object-fit cover
- Caption below each image: tiny caps, 0.5–0.55rem, centered, 60% opacity

**Image content:**
- Cinematic interior photography style — natural light, no flash
- Rooms: open living, dining, kitchen, primary bath, wellness suite, wine room, outdoor living, library/study
- No people
- Each image must feel like a different room/moment — no repetition of space

---

## Section 5 — Estate Lifestyle Strip ("The Estate Lifestyle")

**Purpose:** Shows the outdoor life, grounds, and lifestyle activities.

**Layout:**
- Section label: `THE [ESTATE NAME] LIFESTYLE` in gold small-caps
- Optional: left-side bullet list of lifestyle pillars (Farm-to-Table, Homeschool, etc.) stacked vertically, tiny sans
- 10 images in a single horizontal row, equal-width, same gap as Section 4
- Captions below each: same spec as Section 4

**Image content:**
- Outdoor/landscape/lifestyle photography style
- Subjects: kitchen garden, orchard, greenhouse, play lawn, pool & spa, tennis court, fire lounge, clean living tableaux
- Golden-hour or early morning light preferred
- No people — lifestyle implied through objects, space, setting

**Key difference from Section 4:** Section 4 is interiors. Section 5 is grounds, outdoors, lifestyle activities.

---

## Section 6 — SCIP Benefits ("Built Better. Built to Last.")

**Purpose:** Communicates the construction technology advantage. Dark section for visual contrast.

**Background:** `--eb-charcoal` (#2F2F2F)

**Layout:**
- Section header centered between two gold rule lines: `BUILT BETTER. BUILT TO LAST.`
- Italic intro paragraph centered, max-width 760px, 1–2 sentences
- 6 benefit cards in a single horizontal row, equal width
- Far right: a standalone SCIP badge box (gold serif "SCIP" + stacked keywords)

**Each benefit card:**
- Geometric icon (Unicode symbol) in gold
- Title: 0.6rem, weight 600, tracking 0.16em, uppercase, cream
- Description: 0.72rem, weight 300, stone color, 1.65 line-height

**Always 6 benefits.** Never orphan a card on a second row — use `grid-template-columns: repeat(6, 1fr)`.

---

## Section 7 — Footer

**Background:** `--eb-charcoal` or very dark, separated from Section 6 by a subtle rule.

**Layout (left to right):**
- Left: monogram block + `[ESTATE NAME]` in serif caps
- Center: footer tagline in gold italic serif — short, 4–7 words, family motto energy
- Right: `BUILT FOR NOW. DESIGNED FOR GENERATIONS.` in tiny caps

**Below the main footer row:**
- Light rule line
- Disclaimer in very small, very low-opacity text: "Conceptual vision board only. Not construction documents."

---

## Global Design Constraints

- **Color palette:** `--eb-cream: #F7F3EE`, `--eb-gold: #C5A46D`, `--eb-charcoal: #2F2F2F`, `--eb-stone: #C4BDB5`, `--eb-linen: #EDE8E1`
- **Typography:** Cormorant Garamond (serif) for all display/label text. Montserrat (sans-serif) for body/utility text.
- **Section rhythm:** Sections 1–3 are cream/light. Section 4–5 alternate cream and off-white. Section 6–7 are dark. This light→dark progression is intentional.
- **No drop shadows** on images. No rounded corners. No card borders on image tiles.
- **All section labels** use the same treatment: thin gold rule + small-caps gold text + thin gold rule (three elements inline).
