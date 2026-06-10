import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  onDesignEstate: () => void
  onViewSample: () => void
}

export default function Navbar({ onDesignEstate, onViewSample }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#FDFAF6]/95 backdrop-blur-md border-b border-[#E8E0D5]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16 lg:h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2">
            <img src="/Logos/ehbg-logo.png" alt="My Everlasting Home" className="h-9 w-auto" />
          </button>

          <div className={`hidden md:flex items-center gap-8 text-sm font-medium tracking-wide transition-colors duration-500 ${scrolled ? 'text-[#5C4033]' : 'text-[#C4BDB5]'}`}>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#1A1614] transition-colors">How It Works</button>
            <button onClick={() => document.getElementById('scip')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#1A1614] transition-colors">Why SCIP</button>
            <button onClick={onViewSample} className="hover:text-[#1A1614] transition-colors">Sample Estate</button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onViewSample}
              className="text-sm text-[#5C4033] hover:text-[#1A1614] font-medium px-4 py-2 transition-colors"
            >
              View Sample
            </button>
            <button
              onClick={onDesignEstate}
              className="text-sm bg-[#1A1614] text-[#F7F3EE] px-5 py-2.5 rounded-sm font-medium hover:bg-[#3D2B1F] transition-colors tracking-wide"
            >
              Design My Estate
            </button>
          </div>

          <button
            className={`md:hidden transition-colors duration-500 ${scrolled ? 'text-[#1A1614]' : 'text-[#F7F3EE]'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#FDFAF6] border-b border-[#E8E0D5] p-6 flex flex-col gap-4 md:hidden"
          >
            <button onClick={() => { document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }} className="text-left text-[#3D2B1F] font-medium py-2 border-b border-[#E8E0D5]">How It Works</button>
            <button onClick={() => { document.getElementById('scip')?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false) }} className="text-left text-[#3D2B1F] font-medium py-2 border-b border-[#E8E0D5]">Why SCIP</button>
            <button onClick={() => { onViewSample(); setMenuOpen(false) }} className="text-left text-[#3D2B1F] font-medium py-2 border-b border-[#E8E0D5]">Sample Estate</button>
            <button
              onClick={() => { onDesignEstate(); setMenuOpen(false) }}
              className="mt-2 bg-[#1A1614] text-[#F7F3EE] py-3 rounded-sm font-medium text-center"
            >
              Design My Estate
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
