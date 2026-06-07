import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
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
    title: 'Tell us about your family & lifestyle',
    description: 'Share your household size, lifestyle priorities, and the ways you\'ll actually live in this home — from slow mornings to entertaining at scale.',
  },
  {
    num: '02',
    title: 'Describe your property & climate',
    description: 'Land size, climate zone, terrain, views, and privacy needs shape your estate\'s orientation and outdoor program.',
  },
  {
    num: '03',
    title: 'Define your home program',
    description: 'Bedrooms, bathrooms, specialty spaces — office, wellness suite, homeschool room, casita. Dial in exactly what your family needs.',
  },
  {
    num: '04',
    title: 'Plan your outdoor estate',
    description: 'Pool, orchard, greenhouse, fire lounge, sport court — your outdoor program is as important as the home itself.',
  },
  {
    num: '05',
    title: 'Set style, budget & timeline',
    description: 'Choose your aesthetic, set your investment range, and align on build timeline and SCIP readiness.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#F7F3EE] py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">How It Works</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1614] leading-tight max-w-lg">
              Five steps to your estate blueprint.
            </h2>
            <p className="text-[#9B9189] max-w-xs text-sm leading-relaxed lg:text-right">
              The whole process takes about 8 minutes. At the end, you receive a complete estate concept document.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-[#E8E0D5] hidden md:block" />

          <div className="space-y-6">
            {steps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="flex gap-8 items-start">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 border-2 border-[#E8E0D5] bg-[#F7F3EE] rounded-sm flex items-center justify-center z-10 relative">
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

        {/* After steps CTA */}
        <FadeIn delay={0.5}>
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
    </section>
  )
}
