import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Layers, Map, Compass, FileText } from 'lucide-react'

const modules = [
  {
    icon: Compass,
    title: 'Estate Intake',
    description: 'Answer a curated set of lifestyle questions covering family, climate, program needs, outdoor zones, and aesthetic vision.',
  },
  {
    icon: Layers,
    title: 'AI Blueprint Generation',
    description: 'Your answers are processed into a personalized estate concept — room program, outdoor zones, SCIP notes, wellness systems.',
  },
  {
    icon: Map,
    title: 'Zone Planning',
    description: 'From motor court to orchard, wellness suite to casita — every zone of your estate is mapped and described.',
  },
  {
    icon: FileText,
    title: 'Builder Handoff',
    description: 'Receive a structured builder handoff checklist and phased construction roadmap ready to share with your architect.',
  },
]

const lifestyleModules = [
  { name: 'Room Program', detail: 'Bedrooms, suites, offices, ateliers' },
  { name: 'Wellness Systems', detail: 'Sauna, cold plunge, gym, spa' },
  { name: 'Food + Garden', detail: 'Kitchen garden, orchard, greenhouse' },
  { name: 'Water Features', detail: 'Pool, spa, reflecting pond, koi' },
  { name: 'Guest + Casita', detail: 'Separate living, private entry' },
  { name: 'Work + Creation', detail: 'Office, studio, editing suite' },
  { name: 'Learning Spaces', detail: 'Homeschool library, atelier' },
  { name: 'Outdoor Living', detail: 'Fire lounge, kitchen, sport court' },
]

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function WhatItDoes() {
  return (
    <section className="bg-[#FDFAF6] py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">What It Does</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1614] max-w-2xl leading-tight">
            From lifestyle vision to structured estate blueprint.
          </h2>
          <p className="mt-5 text-[#5C4033] text-lg max-w-xl leading-relaxed font-light">
            My Everlasting Home bridges the gap between "I know what I want" and the documents your architect and builder actually need to begin.
          </p>
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, i) => (
            <FadeIn key={m.title} delay={i * 0.1}>
              <div className="p-7 border border-[#E8E0D5] bg-white hover:border-[#C9A84C]/40 transition-colors group rounded-sm">
                <div className="w-10 h-10 bg-[#F7F3EE] rounded-sm flex items-center justify-center mb-5 group-hover:bg-[#C9A84C]/10 transition-colors">
                  <m.icon size={18} className="text-[#C9A84C]" />
                </div>
                <h3 className="font-serif text-xl text-[#1A1614] mb-3">{m.title}</h3>
                <p className="text-[#9B9189] text-sm leading-relaxed">{m.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Lifestyle Modules */}
        <div className="mt-24">
          <FadeIn>
            <h3 className="font-serif text-3xl text-[#1A1614] mb-10">Estate lifestyle modules</h3>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {lifestyleModules.map((mod, i) => (
              <FadeIn key={mod.name} delay={i * 0.07}>
                <div className="p-5 bg-[#F7F3EE] border border-[#E8E0D5] rounded-sm hover:bg-[#E8E0D5] transition-colors">
                  <div className="font-medium text-[#1A1614] text-sm">{mod.name}</div>
                  <div className="text-[#9B9189] text-xs mt-1">{mod.detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Lifestyle photo strip */}
        <div className="mt-16">
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
      </div>
    </section>
  )
}
