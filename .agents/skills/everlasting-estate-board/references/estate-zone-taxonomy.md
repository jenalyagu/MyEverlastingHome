# Estate Zone Taxonomy

This taxonomy defines how form data maps to named zones across the four floor plan levels. Use this to build room lists for floor plan rendering and zone label displays.

---

## Zone Categories

| Category | Color code | Description |
|---|---|---|
| `living` | warm cream | Great room, dining, family lounge, media |
| `kitchen` | warm amber | Kitchen, scullery, pantry, butler's pantry |
| `suite` | soft blush | Bedrooms, dressing rooms, primary bath |
| `work` | muted blue-grey | Office, studio, homework loft, learning atelier |
| `wellness` | sage green | Gym, sauna, cold plunge, spa, meditation |
| `utility` | neutral grey | Mudroom, laundry, mechanical, storage, safe room |
| `outdoor` | warm green | Terrace, fire lounge, motor court, pool deck |
| `guest` | soft cream | Guest suite, casita, in-law suite |

---

## Main Floor Zones

Always present:
- Motor Court (`outdoor`, `lg`)
- Entry Foyer (`living`, `md`)
- Great Room (`living`, `xl`)
- Dining Room (`living`, `lg`)
- Primary Suite (`suite`, `xl`) — always on main floor for single-story or accessibility
- Covered Terrace (`outdoor`, `lg`)

Conditional (from form data):
- Chef's Kitchen + Scullery → `chefKitchen: true`
- Walk-In Pantry → `pantry: true`
- Guest Suite → `guestSuite: true`
- Founder's Studio → `officStudio: true`
- Learning Atelier → `homeschoolRoom: true`
- Mudroom Hub → `laundryMudroom: true`
- Outdoor Kitchen → `outdoorKitchen: true`
- Fire Lounge → `fireLounge: true`

---

## Upper Floor Zones

Always present:
- Family Lounge (`living`, `lg`)
- Reading Nook (`living`, `sm`)
- Dressing Room (`suite`, `md`)
- Open to Below (`living`, `md`)
- Playroom (`living`, `md`)
- Homework Loft (`work`, `sm`)

Conditional:
- Children's Suites — one per bedroom count above 1, up to 5 additional
- Senior Suite → replaces first child suite if `multigenerational: true`

Bedroom naming convention:
- Suite 1: always Primary Suite (main floor)
- Suite 2: Senior Suite (if multigenerational) or Children's Suite 1
- Suites 3–6: Children's Suite N

---

## Lower / Wellness Level Zones

Always present:
- Wine Room (`living`, `md`)
- Safe Room (`utility`, `sm`)
- Media Lounge (`living`, `xl`)
- Mechanical / Storage (`utility`, `md`)

Conditional (from `wellnessSuite: true`):
- Fitness Studio (`wellness`, `xl`)
- Infrared Sauna (`wellness`, `md`)
- Cold Plunge (`wellness`, `sm`)
- Spa Suite (`wellness`, `lg`)
- Meditation Room (`wellness`, `md`)

---

## Estate Site Plan Zones

Always present:
- Main Residence (`living`, `xl`) — footprint of main house
- Motor Court (`outdoor`, `lg`)
- N-Car Garage (from `garageSpaces` field)

Conditional:
- Pool & Spa → `poolSpa: true`
- Reflecting Pond → `reflectingPond: true`
- Outdoor Kitchen Pavilion → `outdoorKitchen: true`
- Greenhouse → `greenhouse: true`
- Orchard + Raised Beds → `orchard: true` or `raisedBeds: true`
- Sport Court → `sportCourt: true`
- Play Lawn → `playLawn: true`
- Fire Lounge Terrace → `fireLounge: true`
- Guest Casita → `guestSuite: true`

---

## Zone Size Reference

| Size | Approximate sq ft | Notes |
|---|---|---|
| `sm` | 80–200 | Closets, nooks, powder rooms, utility |
| `md` | 200–450 | Offices, secondary bedrooms, dining |
| `lg` | 450–900 | Primary rooms, suites, garages |
| `xl` | 900–2000+ | Great room, main kitchen, primary suite, gym |

---

## Lifestyle Tiles — Interior (Section 4)

8 tiles per board. Selection and labeling guided by form data:

| Tile | Trigger | Label |
|---|---|---|
| Open Living / Kitchen | always | `Open Living · Kitchen` |
| The Dining Room | always | `The Dining Room` |
| Wellness Suite | `wellnessSuite: true` | `Wellness Suite` |
| Primary Suite Bath | always | `Primary Suite · Bath` |
| Home Theatre / Media | always | `Home Theatre` |
| Wine Room | always | `The Wine Room` |
| Outdoor Living | always | `Outdoor Living` |
| Library / Study | `officStudio` or `homeschoolRoom` | `Library · Study` |
| Chef's Kitchen Detail | `chefKitchen: true` | `Chef's Kitchen` |
| Cold Plunge | `wellnessSuite: true` | `Cold Plunge` |

If more triggers are active than 8 slots, prioritize by lifestyle priority order (Wellness > Luxury > Entertaining > Slow living > Homeschooling).

---

## Lifestyle Tiles — Estate/Outdoor (Section 5)

10 tiles per board. Selection guided by form data:

| Tile | Trigger | Label |
|---|---|---|
| Garden to Table | always | `Garden to Table` |
| Greenhouse | `greenhouse: true` | `Greenhouse` |
| Living Orchard | `orchard: true` | `Living Orchard` |
| Play Lawn | `playLawn: true` | `Play Lawn` |
| Pool & Spa | `poolSpa: true` | `Pool & Spa` |
| Fire Lounge | `fireLounge: true` | `Fire Lounge` |
| Tennis / Sport Court | `sportCourt: true` | `Sport Court` |
| The Cottage Bakery | `homeschoolRoom` or slow living priority | `The Cottage` |
| Clean Living | wellness priority | `Clean Living` |
| Motor Court | always | `Motor Court` |
| Reflecting Pond | `reflectingPond: true` | `Reflecting Pond` |
| Raised Garden Beds | `raisedBeds: true` | `Raised Beds` |

Fill any remaining slots from the full list above, in order.
