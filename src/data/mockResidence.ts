export const mockResidenceData = {
  name: 'My Everlasting Home',
  tagline: 'A founder\'s legacy home — SCIP-built, wellness-centered, generationally considered.',
  location: 'Texas Hill Country',
  landSize: '5.2 Acres',
  squareFootage: '8,400 sq ft (main) + 1,200 sq ft (casita)',
  style: 'Modern Organic / Texas Ranch Contemporary',
  status: 'Concept Blueprint',

  stats: [
    { label: 'Bedrooms', value: '6' },
    { label: 'Bathrooms', value: '7.5' },
    { label: 'Garage', value: '4-Car' },
    { label: 'Acres', value: '5.2' },
    { label: 'Main House', value: '8,400 sf' },
    { label: 'Casita', value: '1,200 sf' },
  ],

  rooms: [
    { name: 'Motor Court & Arrival Hall', category: 'Arrival', notes: 'Gated motor court with crushed limestone paving, 4-car garage, and a covered porte-cochère entry with 14-ft limestone columns.' },
    { name: 'Primary Suite', category: 'Private Wing', notes: 'Owner\'s retreat with morning terrace, fireplace, spa bath with soaking tub, and a fashion closet designed as a gallery.', photo: '/room-primary-suite.png' },
    { name: 'Daughter Suite I', category: 'Private Wing', notes: 'En-suite bedroom with reading nook, custom built-ins, and private terrace access.' },
    { name: 'Daughter Suite II', category: 'Private Wing', notes: 'Mirror of Suite I with distinct design character — warm walnut tones, barrel ceiling.' },
    { name: 'Guest Suite', category: 'Private Wing', notes: 'Ground-floor suite with private courtyard access and hotel-quality bath.' },
    { name: "Chef's Kitchen", category: 'Heart of Home', notes: 'Professional 48" range, dual dishwashers, marble island for 8, and direct scullery pass-through.', photo: '/room-kitchen.png' },
    { name: 'Scullery', category: 'Heart of Home', notes: 'Back-of-house prep kitchen with second sink, appliance wall, and service entry.' },
    { name: 'Walk-In Pantry', category: 'Heart of Home', notes: '200 sq ft dedicated pantry with coffee bar, dry storage, and beverage fridges.' },
    { name: 'Great Room', category: 'Living', notes: '22-ft volume ceiling, steel-framed glass wall to main terrace, stone fireplace anchoring the west wall.' },
    { name: 'Dining Room', category: 'Living', notes: 'Formal dining for 16 under a dramatic iron chandelier, connected to kitchen and wine room.' },
    { name: 'Founder\'s Office', category: 'Work + Creation', notes: 'Dedicated work wing with custom millwork, acoustic wall panels, and private garden view.' },
    { name: 'Editing Suite', category: 'Work + Creation', notes: 'Color-calibrated room for media production, adjacent to office with blackout capability.' },
    { name: 'Homeschool Library / Atelier', category: 'Learning', notes: 'Light-filled learning space with rolling library ladder, art station, and views to the kitchen garden.' },
    { name: 'Wellness Suite', category: 'Wellness', notes: 'Full gym, infrared sauna, cold plunge, massage room, and outdoor shower with garden access.', photo: '/room-wellness.png' },
    { name: 'Laundry & Mudroom Hub', category: 'Utility', notes: 'Dual laundry pairs, drying room, boot bench, and family drop zone connecting garage to kitchen.' },
    { name: 'Casita / Pool House', category: 'Guest + Pool', notes: '1,200 sq ft detached guest residence with full kitchen, living room, bedroom, bath, and covered patio.' },
  ],

  outdoorZones: [
    { name: 'Pool & Spa', notes: 'Zero-edge pool with tanning shelf, heated spa, and travertine deck. Night lighting and underwater LED.' },
    { name: 'Reflecting Pond', notes: '60 ft formal water feature on the south axis, edged in native plantings and limestone coping.' },
    { name: 'Outdoor Kitchen & Loggia', notes: 'Covered loggia with professional grill, pizza oven, bar seating for 12, dining for 20.' },
    { name: 'Fire Lounge', notes: 'Sunken conversation pit with built-in gas firepit and perennial shrub screening.' },
    { name: 'Citrus Orchard', notes: '20-tree grove of lemon, lime, orange, and grapefruit on the east portion of the property.' },
    { name: 'Kitchen Garden', notes: '12 raised cedar beds adjacent to chef\'s kitchen with herb spiral and cutting garden.' },
    { name: 'Greenhouse', notes: '400 sq ft glass greenhouse with passive solar mass floor, propagation bench, and attached potting shed.' },
    { name: 'Motor Court', notes: 'Gated arrival court with turning radius for multiple vehicles, limestone pavers, flanking olive trees.' },
  ],

  sciPNotes: [
    'Exterior walls: 8" SCIP panels (R-26 base value) with 2" exterior limestone cladding system.',
    'Roof: SCIP panel roof deck with standing seam metal over air barrier — simplified trades coordination.',
    'SCIP enables 12–14 week faster enclosure vs. conventional framing, reducing weather exposure risk.',
    'Deep window reveals (10–12") created by SCIP wall thickness add architectural depth and passive shading.',
    'All structural calculations by licensed structural engineer; all drawings stamped per Texas building code requirements.',
  ],

  buildPhasing: [
    { phase: 'Phase 1', period: 'Months 1–5', title: 'Site, Foundation & Utilities' },
    { phase: 'Phase 2', period: 'Months 5–10', title: 'SCIP Structure & Enclosure' },
    { phase: 'Phase 3', period: 'Months 10–16', title: 'MEP Systems & Smart Home' },
    { phase: 'Phase 4', period: 'Months 16–22', title: 'Interiors, Finishes & Landscape' },
    { phase: 'Phase 5', period: 'Months 22–24', title: 'Completion, Punch & CO' },
  ],

  aestheticPalette: [
    { name: 'Limestone Exterior', color: '#D4C9B8' },
    { name: 'Walnut Millwork', color: '#3D2B1F' },
    { name: 'Warm White Plaster', color: '#F5F0E8' },
    { name: 'Aged Bronze Metal', color: '#7C6545' },
    { name: 'Olive Landscape', color: '#6B7C4B' },
    { name: 'Soft Black Steel', color: '#2C2420' },
  ],
}
