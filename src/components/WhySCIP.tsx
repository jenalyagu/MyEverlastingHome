import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ShieldCheck, Thermometer, Clock, AlertCircle } from 'lucide-react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Resilient Structure',
    description: 'SCIP panels provide superior resistance to wind, fire, and pests compared to wood-frame construction — ideal for legacy homes.',
  },
  {
    icon: Thermometer,
    title: 'Thermal Performance',
    description: 'Built-in insulation delivers R-26+ wall performance, dramatically reducing heating and cooling loads across all climates.',
  },
  {
    icon: Clock,
    title: 'Faster Build',
    description: 'SCIP systems allow faster enclosure than traditional framing, compressing your schedule by weeks to months.',
  },
]

export default function WhySCIP() {
  return (
    <section id="scip" className="bg-[#1A1614] py-16 lg:py-28 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Why SCIP</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#F7F3EE] leading-tight">
                Structural Concrete Insulated Panels.
              </h2>
              <p className="mt-6 text-[#C4BDB5] text-lg leading-relaxed font-light">
                SCIP panels are an engineered wall and roof system consisting of a polystyrene insulation core bonded between two layers of steel mesh, finished with shotcrete on both sides. The result is a monolithic, thermally superior, structurally resilient building system.
              </p>
              <p className="mt-4 text-[#9B9189] text-base leading-relaxed">
                This is the construction technology we believe represents the future of legacy residential building — and it's the system at the heart of every My Everlasting Home blueprint.
              </p>
            </FadeIn>

            <div className="mt-12 space-y-6">
              {benefits.map((b, i) => (
                <FadeIn key={b.title} delay={0.1 + i * 0.1}>
                  <div className="flex gap-5 p-5 border border-[#C4BDB5]/10 hover:border-[#C9A84C]/30 transition-colors rounded-sm">
                    <div className="w-9 h-9 bg-[#C9A84C]/10 rounded-sm flex items-center justify-center flex-shrink-0">
                      <b.icon size={16} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <div className="text-[#F7F3EE] font-medium text-sm mb-1">{b.title}</div>
                      <div className="text-[#9B9189] text-sm leading-relaxed">{b.description}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.2}>
            <div className="lg:sticky lg:top-28">
              {/* Disclaimer card */}
              <div className="bg-[#2C2420] border border-[#C9A84C]/20 p-5 md:p-8 rounded-sm mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle size={18} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                  <span className="text-[#C9A84C] text-sm font-medium tracking-wide">Important Disclaimer</span>
                </div>
                <p className="text-[#C4BDB5] text-sm leading-relaxed">
                  My Everlasting Home provides <strong className="text-[#F7F3EE]">pre-design guidance only</strong> — not engineering, architectural, or permit-ready plans.
                </p>
                <p className="text-[#9B9189] text-sm leading-relaxed mt-3">
                  All final drawings, structural calculations, and construction documents must be prepared, stamped, and sealed by licensed architects, structural engineers, and MEP engineers in your jurisdiction. Local building permits and approvals are required before any construction begins.
                </p>
                <p className="text-[#9B9189] text-sm leading-relaxed mt-3">
                  This platform is a concept and planning tool. My Everlasting Home is not responsible for any construction decisions made based on blueprint concepts generated here.
                </p>
              </div>

              {/* SCIP specs visual */}
              <div className="border border-[#C4BDB5]/10 p-6 rounded-sm">
                <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-5">SCIP Panel Composition</div>
                <div className="space-y-3">
                  {[
                    { layer: 'Exterior Shotcrete', thickness: '1.5"', color: '#9B9189' },
                    { layer: 'Steel Wire Mesh', thickness: '—', color: '#C9A84C' },
                    { layer: 'EPS Insulation Core', thickness: '4–6"', color: '#6B7C4B' },
                    { layer: 'Steel Wire Mesh', thickness: '—', color: '#C9A84C' },
                    { layer: 'Interior Shotcrete', thickness: '1.5"', color: '#9B9189' },
                  ].map((layer) => (
                    <div key={layer.layer} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
                        <span className="text-[#C4BDB5] text-sm">{layer.layer}</span>
                      </div>
                      <span className="text-[#9B9189] text-xs font-mono">{layer.thickness}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-[#C4BDB5]/10">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#9B9189]">Total wall assembly</span>
                    <span className="text-[#C9A84C] font-medium">8–10" / R-26+</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
