import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface HeroProps {
  onDesignEstate: () => void
  onViewSample: () => void
}


export default function Hero({ onDesignEstate, onViewSample }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#1A1614]">
      {/* Full-bleed hero image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src="/estate-aerial.png"
          alt=""
          className="h-full w-full object-cover object-[30%_50%]"
        />
      </motion.div>

      {/* Directional overlay — dark left column, opens up on right */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(100deg, #1A1614 0%, #1A1614 35%, rgba(26,22,20,0.65) 52%, rgba(26,22,20,0.15) 72%, rgba(26,22,20,0.05) 100%)',
      }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#1A1614] to-transparent" />

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Left edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/30 to-transparent hidden lg:block" />

      {/* Main layout — two columns on lg+ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 lg:pt-32 pb-20 lg:pb-24">
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-16 xl:gap-24 items-center">

          {/* LEFT — headline + CTAs */}
          <div className="flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">AI-Powered Estate Design</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-[#F7F3EE] leading-[1.05] tracking-tight"
            >
              Design the estate.<br />
              <span className="italic text-[#C9A84C]">Build</span>{' '}
              the life.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 text-[#C4BDB5] text-lg md:text-xl max-w-lg leading-relaxed font-light"
            >
              My Everlasting Home is an AI-powered SCIP estate designer for families building resilient,
              wellness-centered legacy homes. Turn your dream lifestyle into a structured blueprint —
              room by room, zone by zone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={onDesignEstate}
                className="group bg-[#C9A84C] text-[#1A1614] px-8 py-4 font-medium text-base tracking-wide hover:bg-[#DFC078] transition-all duration-300 rounded-sm flex items-center gap-3"
              >
                Design My Estate
                <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform rotate-[-90deg]" />
              </button>
              <button
                onClick={onViewSample}
                className="border border-[#C4BDB5]/40 text-[#C4BDB5] px-8 py-4 font-medium text-base tracking-wide hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300 rounded-sm"
              >
                View Sample Blueprint
              </button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mt-14 pt-8 border-t border-[#C4BDB5]/10 grid grid-cols-2 sm:grid-cols-4 gap-6"
            >
              {[
                { num: '4', label: 'Estate Modules' },
                { num: 'SCIP', label: 'Construction System' },
                { num: '20+', label: 'Lifestyle Parameters' },
                { num: 'PDF', label: 'Builder-Ready Output' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-serif text-2xl text-[#C9A84C]">{stat.num}</span>
                  <span className="text-[#9B9189] text-xs tracking-widest uppercase mt-1">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — empty on desktop, fills grid column */}
          <div className="hidden lg:block" />

        </div>
      </div>

      {/* Room label watermarks — bottom right, all screen sizes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-16 right-6 lg:right-10 z-10 hidden sm:flex flex-col items-end gap-2"
      >
        {['Motor Court', 'Primary Suite', "Chef's Kitchen", 'Pool & Spa', 'Orchard & Gardens'].map((room, i) => (
          <motion.div
            key={room}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          >
            <span className="text-[#C4BDB5]/50 text-[10px] lg:text-[11px] tracking-[0.16em] uppercase font-medium">{room}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={16} className="text-[#9B9189]" />
        </motion.div>
      </motion.div>
    </section>
  )
}
