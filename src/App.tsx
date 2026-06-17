import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhatItDoes from './components/WhatItDoes'
import WhySCIP from './components/WhySCIP'
import HowItWorks from './components/HowItWorks'
import SamplePreview from './components/SamplePreview'
import EstateForm from './components/EstateForm'
import Footer from './components/Footer'
import BlueprintPage from './pages/BlueprintPage'
import PaywallScreen from './components/PaywallScreen'
import { generateBlueprint, type EstateFormData, type Blueprint } from './lib/blueprintGenerator'

type View = 'landing' | 'paywall' | 'blueprint'

const FORM_STORAGE_KEY = 'meh_pending_form_data'

export default function App() {
  const [view, setView] = useState<View>('landing')
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)
  const [formData, setFormData] = useState<EstateFormData | null>(null)
  const [sampleModalOpen, setSampleModalOpen] = useState(false)
  const [verifyingPayment, setVerifyingPayment] = useState(false)

  // Handle return from Stripe checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentSuccess = params.get('payment_success')
    const sessionId = params.get('session_id')
    const paymentCancelled = params.get('payment_cancelled')

    if (paymentCancelled) {
      // Restore form data, go back to paywall
      const saved = sessionStorage.getItem(FORM_STORAGE_KEY)
      if (saved) {
        try {
          const data = JSON.parse(saved) as EstateFormData
          setFormData(data)
          setBlueprint(generateBlueprint(data))
          setView('paywall')
        } catch { /* ignore */ }
      }
      window.history.replaceState({}, '', '/')
      return
    }

    if (paymentSuccess && sessionId) {
      window.history.replaceState({}, '', '/')
      const saved = sessionStorage.getItem(FORM_STORAGE_KEY)
      if (!saved) return

      setVerifyingPayment(true)
      fetch(`/api/verify-payment?session_id=${sessionId}`)
        .then(r => r.json())
        .then((result: { paid?: boolean }) => {
          if (result.paid) {
            const data = JSON.parse(saved) as EstateFormData
            sessionStorage.removeItem(FORM_STORAGE_KEY)
            const bp = generateBlueprint(data)
            setFormData(data)
            setBlueprint(bp)
            setView('blueprint')
            window.scrollTo(0, 0)
          }
        })
        .catch(() => { /* silently ignore — user stays on landing */ })
        .finally(() => setVerifyingPayment(false))
    }
  }, [])

  const handleFormComplete = (data: EstateFormData) => {
    // Save form data before Stripe redirect
    sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data))
    const bp = generateBlueprint(data)
    setFormData(data)
    setBlueprint(bp)
    setView('paywall')
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

  // Payment verification loading screen
  if (verifyingPayment) {
    return (
      <div className="fixed inset-0 bg-[#1A1614] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border border-[#C9A84C]/40 flex items-center justify-center">
          <span className="font-serif text-[#C9A84C] text-lg">M</span>
        </div>
        <div className="h-px w-8 bg-[#C9A84C]" />
        <p className="text-[#9B9189] text-xs tracking-[0.2em] uppercase">Confirming your payment…</p>
      </div>
    )
  }

  if (view === 'paywall' && formData) {
    return (
      <PaywallScreen
        onBack={() => {
          setView('landing')
          setTimeout(() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' }), 100)
        }}
      />
    )
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
        <HowItWorks />
        <SamplePreview onViewSample={() => setSampleModalOpen(true)} />
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
                src="/EstateAesthetics/MyEverlastingHomeVertical.png"
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
