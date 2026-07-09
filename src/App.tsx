import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatItDoes from './components/WhatItDoes'
import WhySCIP from './components/WhySCIP'

import EstateForm from './components/EstateForm'
import Footer from './components/Footer'
import BlueprintPage from './pages/BlueprintPage'
import TermsOfService from './pages/legal/TermsOfService'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import Disclaimer from './pages/legal/Disclaimer'
import Contact from './pages/legal/Contact'
import { generateBlueprint, type EstateFormData, type Blueprint } from './lib/blueprintGenerator'

type View = 'landing' | 'blueprint'

function HomePage() {
  const [view, setView] = useState<View>('landing')
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [formData, setFormData] = useState<EstateFormData | null>(null)
  const [sampleModalOpen, setSampleModalOpen] = useState(false)

  const handleFormComplete = (data: EstateFormData) => {
    const bp = generateBlueprint(data)
    setFormData(data)
    setBlueprint(bp)
    setView('blueprint')
    window.scrollTo(0, 0)
  }

  const handleDesignEstate = () => {
    if (view !== 'landing') {
      setView('landing')
      setTimeout(() => {
        document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (view === 'blueprint' && blueprint && formData) {
    return (
      <BlueprintPage
        blueprint={blueprint}
        formData={formData}
        onBack={() => setView('landing')}
      />
    )
  }

  return (
    <>
      <div className="relative">
        <Navbar onDesignEstate={handleDesignEstate} onViewSample={() => setSampleModalOpen(true)} />
        <Hero onDesignEstate={handleDesignEstate} onViewSample={() => setSampleModalOpen(true)} />
        <WhatItDoes />
        <WhySCIP />
        <EstateForm onComplete={handleFormComplete} />
        <Footer />
      </div>

      <AnimatePresence>
        {sampleModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setSampleModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-auto rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSampleModalOpen(false)}
                className="absolute top-3 right-3 z-10 bg-[#1A1614]/80 text-[#F7F3EE] hover:bg-[#1A1614] p-2 rounded-sm transition-colors"
              >
                <X size={18} />
              </button>
              <img
                src="/EstateAesthetics/MyEverlastingHomeVertical.webp"
                alt="My Everlasting Home Sample Blueprint"
                className="w-full h-auto block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
