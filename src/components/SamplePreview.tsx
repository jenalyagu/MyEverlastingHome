import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'

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

        <FadeIn delay={0.1}>
          <div
            className="w-full rounded-sm overflow-hidden border border-[#E8E0D5] shadow-sm cursor-pointer"
            onClick={onViewSample}
          >
            <img
              src="/EstateAesthetics/MyEverlastingHomeVertical.webp"
              alt="My Everlasting Home — Sample Estate Blueprint"
              className="w-full object-contain"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center mt-10">
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
