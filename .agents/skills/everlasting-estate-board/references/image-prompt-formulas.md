# Image Prompt Formulas

Formulas for generating all image types in the estate board. Every prompt must be specific to the family's form data — no generic prompts. Use the variables defined below.

---

## Style Variables (from `aestheticStyle` form field)

| Style | `adjective` | `materials` | `mood` | `lighting` |
|---|---|---|---|---|
| Modern Organic | organic modern | board-formed concrete, warm cedar, weathered limestone | serene, grounded, luminous | golden hour |
| Traditional / Classic | traditional estate | hand-laid brick, limestone quoins, cedar shake roofing | timeless, dignified, warm | soft morning light |
| Mediterranean / Spanish | Mediterranean villa | terracotta roof tile, smooth white plaster, iron-forged details | sun-drenched, romantic, richly textured | late afternoon golden sun |
| Farmhouse / Agrarian | agrarian estate | white-painted board and batten, black steel windows, reclaimed timber | rooted, honest, quietly beautiful | clear morning light |
| Minimalist / Contemporary | contemporary minimalist | raw concrete, floor-to-ceiling glass, dark Corten steel | bold, precise, quietly monumental | dramatic twilight |

---

## Section 2 — Hero Exterior

**Purpose:** Cinematic wide exterior shot of the full estate.

**Formula:**
```
Cinematic luxury estate exterior photograph, [adjective] architecture, [materials], 
[climate] landscape setting, [outdoor features if present], shot at [lighting], 
architectural photography style, ultra-wide 16:9, no people, soft natural light, 
editorial magazine quality, photorealistic, highly detailed, professional real estate photography
```

**Variables to inject:**
- `[adjective]` and `[materials]` from style table
- `[climate]` — use exact value from form (e.g. "coastal California", "central Texas hill country", "Pacific Northwest forest")
- `[outdoor features]` — comma-list of present features: "infinity pool", "motor court with luxury car", "fruit orchard", "glass greenhouse", "reflecting pond"
- `[lighting]` from style table

**Example (Modern Organic, coastal California, pool + orchard):**
```
Cinematic luxury estate exterior photograph, organic modern architecture, board-formed concrete 
warm cedar and weathered limestone, coastal California landscape setting, infinity pool and fruit 
orchard visible, shot at golden hour, architectural photography style, ultra-wide 16:9, no people, 
soft natural light, editorial magazine quality, photorealistic, highly detailed
```

**Forbidden in hero prompts:**
- "render" or "rendering" (makes it look CGI)
- "cartoon", "illustration", "watercolor"
- People, vehicles (unless motor court ambiance is essential)
- Dramatic storms, night photography (unless Minimalist style with twilight lighting)

---

## Section 3 — Floor Plan Drawings (all 4 panels)

**Base formula (all plans):**
```
Architectural watercolor floor plan rendering, bird's-eye view, soft watercolor wash, 
cream parchment background, thin precise architectural linework, elegant serif room labels, 
subtle warm shadow fills, luxury estate presentation quality, warm neutral palette, 
no photography, illustration only
```

**Per-panel additions:**

### Main Floor
```
[BASE] MAIN FLOOR plan of a [adjective] luxury estate spanning [sqft] square feet. 
Rooms: [room list from main floor zones]. Motor court arrival at top, 
primary suite as largest zone, great room flowing to covered terrace.
```

### Upper Floor
```
[BASE] UPPER FLOOR plan of a [adjective] luxury estate. 
Rooms: [room list from upper floor zones]. Open-to-below atrium as central void, 
children's wing organized to one side, family lounge as hub connecting suites.
```

### Lower / Wellness Level
```
[BASE] LOWER WELLNESS LEVEL floor plan of a [adjective] luxury estate. 
Rooms: [room list from wellness zones]. Gym and spa as anchor spaces at opposite ends, 
wine room adjacent to media lounge, mechanical in corner.
```

### Estate Site Plan
```
[BASE] ESTATE SITE PLAN, full property aerial top-down view. 
Property elements: [site zone list]. Motor court at front, residence footprint central, 
pool zone rear-left, garden/orchard zones rear-right. Include mature trees, 
pathways, property boundary line, north arrow.
```

**Critical rules for floor plan prompts:**
- Always specify bird's-eye / top-down — never perspective
- Always specify "cream parchment background" — prevents dark backgrounds
- Always specify "no photography, illustration only" — prevents photorealistic renders
- Room list must be taken from the actual zone builder output, not generic rooms

---

## Section 4 — Interior Lifestyle Tiles

**Base formula:**
```
[room description], [adjective] interior design, [materials] palette, 
cinematic natural light, no people, editorial interior photography, 
luxury residential, 3:2 aspect ratio, photorealistic
```

**Per-room formulas:**

| Tile | Prompt core |
|---|---|
| Open Living / Kitchen | Open-plan great room and kitchen, vaulted ceiling, [materials], warm natural light flooding through floor-to-ceiling windows |
| The Dining Room | Formal dining room, long walnut table with 10 chairs, statement pendant lighting, [materials] walls, late afternoon sun |
| Wellness Suite | Private wellness room with infrared sauna, cold plunge pool, warm timber walls, soft ambient lighting, spa-like atmosphere |
| Primary Suite Bath | Primary bathroom, freestanding soaking tub at window, honed marble, rainfall shower, morning light |
| Home Theatre | Private home theatre, acoustic panels, deep velvet seating, ambient sconce lighting, projection wall |
| Wine Room | Climate-controlled wine cellar, floor-to-ceiling bottle storage, stone walls, subtle amber lighting |
| Outdoor Living | Covered outdoor living room, teak furniture, fire feature, view of garden or pool, golden hour |
| Library / Study | Home library and study, floor-to-ceiling bookshelves, rolling ladder, leather chairs, warm lamp light |
| Chef's Kitchen | Professional chef's kitchen, [materials] cabinetry, commercial range, marble island, morning light through clerestory |
| Cold Plunge | Cold plunge pool room, polished concrete, timber ceiling, minimal spa aesthetic, soft lighting |

**Always append to every interior tile prompt:**
```
[adjective] interior design, [materials] palette, cinematic natural light, 
no people, editorial interior photography, luxury residential, photorealistic
```

---

## Section 5 — Estate Lifestyle Tiles

**Base formula:**
```
[scene description], [adjective] estate setting, [climate] landscape, 
golden hour or early morning light, no people, editorial lifestyle photography, 
luxury residential grounds, photorealistic
```

**Per-tile formulas:**

| Tile | Prompt core |
|---|---|
| Garden to Table | Overflowing kitchen garden beds with vegetables and herbs, stone pathways, morning dew, abundant and lush |
| Greenhouse | Glass greenhouse interior, rows of herbs and tomatoes, warm filtered light through glass panels, misty morning |
| Living Orchard | Mature fruit orchard, rows of apple or citrus trees, soft morning light, tall grass between rows |
| Play Lawn | Expansive lawn with children's play equipment, mature oak trees, golden afternoon light, inviting and open |
| Pool & Spa | Infinity pool with spa, [materials] pool deck, loungers, lush landscaping, golden hour reflection |
| Fire Lounge | Outdoor fire lounge seating area, stone fire pit, low furniture, evening ambient light, warm glow |
| Sport Court | Tennis or sport court, [adjective] aesthetic surround, mature trees at perimeter, clean lines |
| The Cottage | Cottage outbuilding or bakery kitchen, rustic charm, warm lighting, bread or pastries on counter |
| Clean Living | Morning wellness still life — glass of water, fresh fruit, linen, sunlight through sheer curtains |
| Motor Court | Motor court arrival, stone pavers, manicured edges, [adjective] estate facade glimpsed at entry |
| Reflecting Pond | Formal reflecting pond, water lilies, stone coping, [adjective] architecture reflected, still water |
| Raised Beds | Raised vegetable beds, timber or stone frames, lush planting, garden tools, morning light |

**Always append:**
```
[adjective] estate setting, [climate] landscape, no people, 
editorial lifestyle photography, luxury residential grounds, photorealistic
```

---

## Quality Tiers

| Section | Quality | Rationale |
|---|---|---|
| Hero exterior | `high` | Full-width cinematic centerpiece — quality visible |
| Floor plan drawings | `medium` | Watercolor illustration — detail differences minimal |
| Interior tiles | `medium` | 3:2 small tiles — medium quality sufficient |
| Lifestyle tiles | `medium` | Outdoor photography — medium quality sufficient |

**Cost at these tiers (gpt-image-1):**
- Hero (1×, 1536×1024, high): $0.25
- Floor plans (4×, 1024×1024, medium): $0.168
- Interior tiles (8×, 1536×1024, medium): $0.504
- Lifestyle tiles (10×, 1536×1024, medium): $0.63
- **Total: ~$1.55 per board generation**

---

## Prompt Anti-Patterns

Never include these in any prompt — they produce poor or off-brand results:

- "modern" without qualification (too broad — use `[adjective]` from style table)
- "beautiful home" (AI cliché — triggers stock-photo aesthetic)
- "luxury mansion" (triggers gaudy results — use "luxury estate" or "luxury residence")
- "photorealistic render" for floor plans (triggers 3D software look)
- "CGI" or "3D model" anywhere
- Specific brand names (Apple, BMW, etc.)
- "HD", "4K", "8K" quality modifiers (don't reliably improve output)
- Two conflicting lighting conditions in one prompt
