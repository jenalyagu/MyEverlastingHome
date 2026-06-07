import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { mockResidenceData } from '../data/mockResidence'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

interface SamplePreviewProps {
  onViewSample: () => void
}

export default function SamplePreview({ onViewSample }: SamplePreviewProps) {
  return (
    <section className="bg-[#FDFAF6] py-28 px-6 lg:px-10 border-t border-[#E8E0D5]">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Sample Estate</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1614] leading-tight max-w-lg">
              My Everlasting Home.
            </h2>
            <button
              onClick={onViewSample}
              className="flex items-center gap-2 text-[#C9A84C] text-sm font-medium tracking-wide hover:gap-3 transition-all group"
            >
              View Full Blueprint
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeIn>

        {/* Hero card */}
        <FadeIn delay={0.1}>
          <div className="relative bg-[#1A1614] rounded-sm overflow-hidden mb-8">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 30% 60%, #3D2B1F 0%, transparent 60%), radial-gradient(circle at 80% 20%, #2C2420 0%, transparent 50%)',
            }} />
            <div className="relative p-8 md:p-12 lg:p-16">
              <div className="flex flex-wrap gap-4 mb-8">
                {mockResidenceData.stats.map((s) => (
                  <div key={s.label} className="bg-[#2C2420]/60 border border-[#C4BDB5]/10 px-4 py-2 rounded-sm">
                    <div className="font-serif text-xl text-[#C9A84C]">{s.value}</div>
                    <div className="text-[#9B9189] text-xs tracking-widest uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#F7F3EE] mb-3">{mockResidenceData.name}</h3>
              <p className="text-[#C4BDB5] max-w-2xl leading-relaxed">{mockResidenceData.tagline}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#9B9189]">
                <span>{mockResidenceData.location}</span>
                <span className="text-[#C4BDB5]/30">·</span>
                <span>{mockResidenceData.style}</span>
                <span className="text-[#C4BDB5]/30">·</span>
                <span>{mockResidenceData.squareFootage}</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Room grid preview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {mockResidenceData.rooms.slice(0, 6).map((room, i) => (
            <FadeIn key={room.name} delay={0.05 * i}>
              <div className="p-5 border border-[#E8E0D5] bg-white hover:border-[#C9A84C]/30 transition-colors group rounded-sm">
                <div className="text-[#9B9189] text-xs tracking-widest uppercase font-medium mb-1">{room.category}</div>
                <div className="font-serif text-lg text-[#1A1614] mb-2">{room.name}</div>
                <div className="text-[#9B9189] text-sm leading-relaxed">{room.notes}</div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="text-center">
            <button
              onClick={onViewSample}
              className="border border-[#1A1614] text-[#1A1614] px-8 py-3.5 font-medium text-sm tracking-wide hover:bg-[#1A1614] hover:text-[#F7F3EE] transition-all duration-300 rounded-sm"
            >
              View Complete Sample Blueprint
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
