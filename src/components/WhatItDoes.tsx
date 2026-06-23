import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

const steps = [
  {
    num: '01',
    title: 'Choose your series',
    description: 'Select the tier that matches your land and vision. Size, budget, and build timeline are set automatically.',
  },
  {
    num: '02',
    title: 'Pick your collection',
    description: 'Browse visual concept boards across every aesthetic. Filter by climate and risk profile to find the design built for your land.',
  },
  {
    num: '03',
    title: 'Describe how you live',
    description: 'Family, lifestyle priorities, room program, specialty spaces, and outdoor zones. This shapes everything in your blueprint.',
  },
  {
    num: '04',
    title: 'Receive your estate blueprint',
    description: 'A complete AI-generated concept document: room program, outdoor zones, SCIP construction notes, build phasing, and builder handoff checklist.',
  },
]

const tierPrograms: {
  tier: string
  range: string
  color: string
  program: string[]
  outdoor: string[]
}[] = [
  {
    tier: 'Cottage',
    range: '1,200–1,800 sq ft',
    color: '#9B9189',
    program: [
      '3–4 Bedrooms',
      'Open-plan great room',
      'Chef-ready kitchen',
      'Laundry & mudroom hub',
      'Home office alcove',
      'Homeschool-ready flex room',
    ],
    outdoor: [
      'Covered porch or patio',
      'Kitchen garden beds',
      'Fire pit & seating area',
      'Utility garage (1–2 bays)',
    ],
  },
  {
    tier: 'Signature',
    range: '1,800–3,000 sq ft',
    color: '#C9A84C',
    program: [
      '4–5 Bedrooms',
      'Defined great room + dining',
      "Chef's kitchen & pantry",
      'Dedicated home office',
      'Guest suite or casita',
      'Homeschool library / atelier',
    ],
    outdoor: [
      'Outdoor kitchen & dining',
      'Fire lounge',
      'Kitchen garden & raised beds',
      '2-car garage',
    ],
  },
  {
    tier: 'Executive',
    range: '3,000–4,500 sq ft',
    color: '#8B7355',
    program: [
      '5–6 Bedrooms',
      'Primary suite wing',
      "Chef's kitchen + scullery",
      'Wellness suite (gym, sauna)',
      "Founder's office / studio",
      'Attached or detached casita',
    ],
    outdoor: [
      'Pool & spa',
      'Outdoor kitchen & loggia',
      'Orchard & kitchen garden',
      'Sport court',
      '3-car garage',
    ],
  },
  {
    tier: 'Legacy',
    range: '4,500–8,000+ sq ft',
    color: '#5C4033',
    program: [
      '6+ Bedrooms across wings',
      'Primary suite compound',
      'Full wellness wing',
      'Professional studio or vault',
      'Guest compound',
      'Multigenerational suite',
    ],
    outdoor: [
      'Motor court & porte-cochère',
      "Car vault / collector's garage",
      'Full pool & reflecting pond',
      'Working orchard & greenhouse',
      'Sport courts & trail system',
    ],
  },
]

export default function WhatItDoes() {
  return (
    <section className="bg-[#FDFAF6] py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-28">

        {/* ── How It Works ───────────────────────────────────────────── */}
        <div>
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">How It Works</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1614] leading-tight max-w-lg">
                Four steps to your estate blueprint.
              </h2>
              <p className="text-[#9B9189] max-w-xs text-sm leading-relaxed lg:text-right">
                The whole process takes about 5 minutes. At the end, you receive a complete estate concept document.
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-[#E8E0D5] hidden md:block" />
            <div className="space-y-6">
              {steps.map((step, i) => (
                <FadeIn key={step.num} delay={i * 0.1}>
                  <div className="flex gap-5 md:gap-8 items-start">
                    <div className="relative flex-shrink-0">
                      <div className="w-14 h-14 border-2 border-[#E8E0D5] bg-[#FDFAF6] rounded-sm flex items-center justify-center z-10 relative">
                        <span className="font-serif text-[#C9A84C] text-lg font-medium">{step.num}</span>
                      </div>
                    </div>
                    <div className="pt-3 pb-6">
                      <h3 className="font-serif text-xl md:text-2xl text-[#1A1614] mb-2">{step.title}</h3>
                      <p className="text-[#9B9189] leading-relaxed max-w-xl">{step.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.4}>
            <div className="mt-12 pt-12 border-t border-[#E8E0D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="font-serif text-2xl text-[#1A1614] mb-1">Your blueprint, ready in minutes.</div>
                <div className="text-[#9B9189] text-sm">Downloadable, shareable, architect-ready concept document.</div>
              </div>
              <button
                onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#1A1614] text-[#F7F3EE] px-8 py-3.5 font-medium text-sm tracking-wide hover:bg-[#3D2B1F] transition-colors rounded-sm whitespace-nowrap"
              >
                Start Your Blueprint
              </button>
            </div>
          </FadeIn>
        </div>

        {/* ── Estate Program by Tier ──────────────────────────────────── */}
        <div>
          <FadeIn>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Estate Program</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1614] leading-tight max-w-2xl mb-4">
              Every tier, a different kind of home.
            </h2>
            <p className="text-[#9B9189] text-base max-w-xl leading-relaxed mb-16">
              Your estate program — the rooms, zones, and systems that make up your home — scales with your series. A Signature home and a Legacy estate are fundamentally different buildings.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tierPrograms.map((t, i) => (
              <FadeIn key={t.tier} delay={i * 0.1}>
                <div className="border border-[#E8E0D5] bg-white rounded-sm overflow-hidden h-full flex flex-col">
                  <div className="px-5 py-4 border-b border-[#E8E0D5]" style={{ borderLeftWidth: 3, borderLeftColor: t.color }}>
                    <div className="font-serif text-lg text-[#1A1614]">{t.tier} Series</div>
                    <div className="text-[10px] tracking-wide mt-0.5" style={{ color: t.color }}>{t.range}</div>
                  </div>
                  <div className="px-5 py-4 flex-1 space-y-4">
                    <div>
                      <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9B9189] mb-2">Home Program</div>
                      <ul className="space-y-1.5">
                        {t.program.map(item => (
                          <li key={item} className="flex items-start gap-2 text-xs text-[#5C4033]">
                            <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-3 border-t border-[#E8E0D5]">
                      <div className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#9B9189] mb-2">Outdoor & Grounds</div>
                      <ul className="space-y-1.5">
                        {t.outdoor.map(item => (
                          <li key={item} className="flex items-start gap-2 text-xs text-[#5C4033]">
                            <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── Lifestyle Photo Strip ───────────────────────────────────── */}
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { src: '/lifestyle-fire-pit.png', label: 'Family & Entertaining' },
              { src: '/lifestyle-terrace.png', label: 'Morning Rituals' },
              { src: '/lifestyle-garden.png', label: 'Food & Garden' },
              { src: '/lifestyle-library.png', label: 'Learning & Legacy' },
            ].map((photo, i) => (
              <FadeIn key={photo.label} delay={i * 0.08}>
                <div className="relative overflow-hidden rounded-sm aspect-[4/3] group">
                  <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614]/70 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white/80 text-xs tracking-widest uppercase font-medium">{photo.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  )
}
