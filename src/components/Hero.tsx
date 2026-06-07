import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface HeroProps {
  onDesignEstate: () => void
  onViewSample: () => void
}

export default function Hero({ onDesignEstate, onViewSample }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#1A1614]">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #3D2B1F 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, #2C2420 0%, transparent 50%),
                           radial-gradient(circle at 60% 80%, #1A1614 0%, transparent 40%)`,
        }} />
      </div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Side accents */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent hidden lg:block" />
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A84C]/20 to-transparent hidden lg:block" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">AI-Powered Estate Design</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#F7F3EE] leading-[1.05] tracking-tight max-w-5xl"
        >
          Design the estate.<br />
          <span className="italic text-[#C9A84C]">Build</span>{' '}
          the life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 text-[#C4BDB5] text-lg md:text-xl max-w-2xl leading-relaxed font-light"
        >
          My Everlasting Home is an AI-powered SCIP estate designer for families building resilient,
          wellness-centered legacy homes. Turn your dream lifestyle into a structured blueprint —
          room by room, zone by zone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
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
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 pt-10 border-t border-[#C4BDB5]/10 flex flex-wrap gap-10"
        >
          {[
            { num: '5', label: 'Estate Modules' },
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

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={16} className="text-[#9B9189]" />
        </motion.div>
      </motion.div>

      {/* Image block — right side decorative */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute right-0 top-0 bottom-0 w-1/3 hidden xl:block overflow-hidden"
      >
        <img src="/estate-aerial.png" alt="Estate aerial view" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1A1614]/10 via-[#1A1614]/30 to-[#1A1614]" />
        <div className="absolute inset-0 flex flex-col justify-end p-10 gap-3">
          {['Motor Court', 'Primary Suite', 'Chef\'s Kitchen', 'Pool & Spa', 'Orchard & Gardens'].map((room, i) => (
            <motion.div
              key={room}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="text-right"
            >
              <span className="text-[#C4BDB5]/60 text-xs tracking-[0.15em] uppercase font-medium">{room}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
