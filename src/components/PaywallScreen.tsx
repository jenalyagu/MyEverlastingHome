import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, FileText, ArrowLeft } from 'lucide-react'

interface Props {
  onBack: () => void
}

const INCLUSIONS = [
  { icon: Zap,        text: 'AI-generated estate name, narrative & copy' },
  { icon: FileText,   text: 'Full concept board — hero, 4 floor plans, 18 lifestyle images' },
  { icon: ShieldCheck, text: 'Downloadable PNG — shareable with your architect or builder' },
  { icon: FileText,   text: 'Complete board brief as a markdown document' },
]

export default function PaywallScreen({ onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json() as { url?: string; error?: string }
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Checkout failed')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1614] flex flex-col items-center justify-center px-6">
      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Monogram */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 border border-[#C9A84C]/40 flex items-center justify-center">
            <span className="font-serif text-[#C9A84C] text-xl tracking-widest">M</span>
          </div>
        </div>

        <div className="h-px w-10 bg-[#C9A84C] mx-auto mb-6" />

        <h2 className="font-serif text-3xl md:text-4xl text-[#F7F3EE] text-center leading-tight tracking-wide mb-3">
          Your Estate Board<br />is Ready to Generate
        </h2>
        <p className="text-[#9B9189] text-sm text-center leading-relaxed mb-10">
          One payment. Your complete AI-generated luxury estate concept board — personalized to your family, vision, and property.
        </p>

        {/* Price */}
        <div className="border border-[#C9A84C]/25 bg-[#2C2420]/60 p-6 mb-6">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="text-[#9B9189] text-[10px] tracking-[0.2em] uppercase mb-1">Estate Concept Board</div>
              <div className="font-serif text-4xl text-[#F7F3EE]">$49</div>
              <div className="text-[#9B9189] text-xs mt-0.5">one-time · no subscription</div>
            </div>
            <div className="text-right">
              <div className="text-[#C9A84C] text-[10px] tracking-[0.15em] uppercase">23 AI Images</div>
              <div className="text-[#C9A84C] text-[10px] tracking-[0.15em] uppercase">+ AI Copywriting</div>
            </div>
          </div>

          <div className="space-y-3 border-t border-[#C4BDB5]/10 pt-5">
            {INCLUSIONS.map((item) => (
              <div key={item.text} className="flex items-start gap-3">
                <item.icon size={13} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span className="text-[#C4BDB5] text-xs leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        {error && (
          <p className="text-red-400 text-xs text-center mb-3">{error}</p>
        )}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-[#C9A84C] text-[#1A1614] py-4 font-medium text-sm tracking-wide hover:bg-[#DFC078] transition-colors rounded-sm flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? 'Redirecting to checkout…' : 'Generate My Board — $49'}
          {!loading && <ArrowRight size={15} />}
        </button>

        <p className="text-[#5C4033] text-[10px] text-center mt-3 leading-relaxed">
          Secured by Stripe. Your card details never touch our servers.
        </p>

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#5C4033] hover:text-[#9B9189] text-xs transition-colors mx-auto mt-6"
        >
          <ArrowLeft size={12} />
          Edit my answers
        </button>
      </motion.div>
    </div>
  )
}
