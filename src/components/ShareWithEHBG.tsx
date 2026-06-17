import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, CheckCircle } from 'lucide-react'
import type { BoardBrief } from '../lib/buildBoardBrief'
import type { AestheticMatch } from '../lib/matchEstateAesthetic'
import type { EstateFormData } from '../lib/blueprintGenerator'

interface Props {
  brief: BoardBrief
  match: AestheticMatch
  formData: EstateFormData
  onClose: () => void
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function ShareWithEHBG({ brief, match, formData, onClose }: Props) {
  const [name, setName]   = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote]   = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/share-with-ehbg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: { name, email, phone: phone || undefined, note: note || undefined },
          brief,
          formData,
          matchedCollection: `${match.collectionName} — ${match.collectionTag}`,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Something went wrong' })) as { error?: string }
        throw new Error(err.error ?? 'Submission failed')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-[#1A1614]/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="relative bg-[#FDFAF6] w-full max-w-lg rounded-sm shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-[#1A1614] px-8 py-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#9B9189] hover:text-[#F7F3EE] transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-6 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase">EHBG · Protected Legacy Estates</span>
          </div>
          <h2 className="font-serif text-2xl text-[#F7F3EE] mb-1">Connect with Our Team</h2>
          <p className="text-[#9B9189] text-sm">{brief.estateName} — {match.collectionTag}</p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-8 py-12 flex flex-col items-center text-center gap-4"
            >
              <CheckCircle size={40} className="text-[#C9A84C]" />
              <h3 className="font-serif text-2xl text-[#1A1614]">Blueprint Shared</h3>
              <p className="text-[#6B5D52] leading-relaxed max-w-sm">
                Your estate blueprint has been sent to the EHBG team. Check your inbox — we'll be in touch within 24–48 hours to schedule your consultation.
              </p>
              <p className="font-serif text-[#C9A84C] italic text-sm mt-2">{brief.footerTagline}</p>
              <button
                onClick={onClose}
                className="mt-4 border border-[#1A1614] text-[#1A1614] px-8 py-2.5 text-sm font-medium tracking-wide hover:bg-[#1A1614] hover:text-[#F7F3EE] transition-all rounded-sm"
              >
                Done
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="px-8 py-6 space-y-4"
            >
              <p className="text-[#6B5D52] text-sm leading-relaxed">
                Share your blueprint with the EHBG team to schedule a complimentary design consultation. We'll reach out within 24–48 hours.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Full Name *</label>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Email *</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jane@family.com"
                    className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Phone <span className="normal-case text-[#C4BDB5]">(optional)</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>

              <div>
                <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Message <span className="normal-case text-[#C4BDB5]">(optional)</span></label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Tell us about your timeline, land, or any questions…"
                  rows={3}
                  className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
                />
              </div>

              {status === 'error' && (
                <p className="text-red-600 text-xs">{errorMsg}</p>
              )}

              <div className="flex items-center justify-between pt-2">
                <p className="text-[#9B9189] text-[11px] leading-relaxed max-w-[200px]">
                  Your blueprint and selections will be included automatically.
                </p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center gap-2 bg-[#1A1614] text-[#F7F3EE] px-6 py-2.5 text-sm font-medium tracking-wide hover:bg-[#2C2420] disabled:opacity-50 transition-all rounded-sm"
                >
                  <Send size={13} className={status === 'sending' ? 'animate-pulse' : ''} />
                  {status === 'sending' ? 'Sending…' : 'Share Blueprint'}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
