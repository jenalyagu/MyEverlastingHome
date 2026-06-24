import { useState, useEffect, useRef } from 'react'
// useRef kept for EstateAestheticResult forwardRef compatibility
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, X, Check } from 'lucide-react'
import { type Blueprint, type EstateFormData } from '../lib/blueprintGenerator'
import { fetchBoardBrief, type BoardBriefResponse } from '../lib/fetchBoardBrief'
import { matchEstateAesthetic } from '../lib/matchEstateAesthetic'
import EstateAestheticResult from '../components/EstateAestheticResult'

// ─── Download Gate Modal ──────────────────────────────────────────────────────

const BUILD_TIMELINES = [
  { id: 'now',      label: 'Ready to build now',  note: 'Actively planning or already have land' },
  { id: '1-2yr',    label: '1–2 years out',        note: 'Saving, researching, or in early planning' },
  { id: 'exploring', label: 'Just exploring',      note: 'No timeline yet, getting inspired' },
]

function DownloadGateModal({
  estateName,
  aestheticStyle,
  onClose,
  onConfirm,
}: {
  estateName: string
  aestheticStyle: string
  onClose: () => void
  onConfirm: () => void
}) {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [timeline, setTimeline] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')
  const [done,     setDone]     = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !timeline) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://formspree.io/f/mkolgodd', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          buildTimeline: BUILD_TIMELINES.find(t => t.id === timeline)?.label,
          collection: aestheticStyle,
          estate: estateName,
          _subject: `Blueprint Download — ${estateName} (${aestheticStyle})`,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')
      setDone(true)
      setTimeout(() => { onClose(); onConfirm() }, 1200)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-[#1A1614]/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3 }}
        className="relative bg-[#FDFAF6] max-w-md w-full rounded-sm overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-0.5 bg-[#C9A84C]" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9B9189] hover:text-[#1A1614] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="px-8 py-10">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Check size={20} className="text-[#C9A84C]" />
              </div>
              <p className="font-serif text-[#1A1614] text-lg">Your blueprint is ready.</p>
              <p className="text-[#9B9189] text-sm mt-1">Preparing download…</p>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-6 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-[10px] font-medium tracking-[0.2em] uppercase">Download Blueprint</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1A1614] mb-1">One quick step.</h3>
              <p className="text-[#9B9189] text-sm leading-relaxed mb-7">
                Where should we send updates on your collection and build timeline?
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-medium tracking-widest uppercase text-[#9B9189] block mb-1.5">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="First and last name"
                    className="w-full border border-[#E8E0D5] bg-white rounded-sm px-4 py-3 text-sm text-[#1A1614] placeholder:text-[#C4BDB5] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium tracking-widest uppercase text-[#9B9189] block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-[#E8E0D5] bg-white rounded-sm px-4 py-3 text-sm text-[#1A1614] placeholder:text-[#C4BDB5] focus:outline-none focus:border-[#C9A84C] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-medium tracking-widest uppercase text-[#9B9189] block mb-2">When are you planning to build?</label>
                  <div className="space-y-2">
                    {BUILD_TIMELINES.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTimeline(t.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-sm border text-left transition-all ${
                          timeline === t.id
                            ? 'bg-[#1A1614] border-[#1A1614]'
                            : 'border-[#E8E0D5] hover:border-[#C9A84C]/60'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                          timeline === t.id ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-[#E8E0D5]'
                        }`}>
                          {timeline === t.id && <div className="w-1.5 h-1.5 rounded-full bg-[#1A1614]" />}
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${timeline === t.id ? 'text-[#F7F3EE]' : 'text-[#1A1614]'}`}>{t.label}</div>
                          <div className={`text-[10px] mt-0.5 ${timeline === t.id ? 'text-[#9B9189]' : 'text-[#C4BDB5]'}`}>{t.note}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {error && <p className="text-red-500 text-xs">{error}</p>}

                <button
                  type="submit"
                  disabled={!name || !email || !timeline || loading}
                  className="w-full bg-[#C9A84C] text-[#1A1614] py-3 text-sm font-semibold tracking-wide hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  <Download size={14} />
                  {loading ? 'Saving…' : 'Download My Blueprint'}
                </button>
              </form>
              <p className="text-center text-[#C4BDB5] text-[10px] mt-5">No spam. Your blueprint, on record.</p>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

interface BlueprintPageProps {
  blueprint: Blueprint
  formData: EstateFormData
  onBack: () => void
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1614] flex flex-col items-center justify-center gap-5">
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #C5A46D 0px, #C5A46D 1px, transparent 1px, transparent 60px)' }}
      />
      <div className="relative z-10 flex flex-col items-center text-center gap-5">
        <div className="w-14 h-14 border border-[#C5A46D]/40 flex items-center justify-center p-2">
          <img src="/Logos/ehbg-logo.png" alt="EHBG" className="w-full h-full object-contain" />
        </div>
        <div className="h-px w-10 bg-[#C5A46D]" />
        <p className="text-[#9B9189] text-xs tracking-[0.25em] uppercase">Composing your estate brief…</p>
        <div className="flex gap-1.5 mt-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BlueprintPage({ blueprint, formData, onBack }: BlueprintPageProps) {
  const [loading, setLoading]             = useState(true)
  const [briefResponse, setBriefResponse] = useState<BoardBriefResponse | null>(null)
  const [gateOpen, setGateOpen]           = useState(false)
  const hasInitialized = useRef(false)
  const resultRef      = useRef<HTMLDivElement>(null)

  const aestheticMatch = matchEstateAesthetic(formData)

  const handleDownload = () => setGateOpen(true)

  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    fetchBoardBrief(formData)
      .then(res => setBriefResponse(res))
      .catch(() => {
        // If the API call fails, we still show the matched board — brief is optional
        setBriefResponse(null)
      })
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFAF6]">

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div key="loading" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="no-print bg-[#1A1614] px-4 lg:px-10 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#9B9189] hover:text-[#C4BDB5] text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">
              AI Estate Blueprint — {aestheticMatch.collectionTag}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-serif text-3xl md:text-5xl text-[#F7F3EE] mb-2">
                {briefResponse?.brief?.estateName ?? blueprint.estateName}
              </h1>
              <p className="text-[#C4BDB5] text-base font-light italic">{blueprint.tagline}</p>
            </motion.div>

            {!loading && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={handleDownload}
                className="flex items-center gap-2 border border-[#C9A84C]/50 text-[#C9A84C] hover:bg-[#C9A84C]/10 px-4 py-2.5 rounded-sm text-sm font-medium tracking-wide transition-all flex-shrink-0 mt-1"
              >
                <Download size={14} />
                Download
              </motion.button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {[
              { label: 'Style',    value: formData.aestheticStyle || 'Modern Organic' },
              { label: 'Size',     value: formData.squareFootage  ? `${formData.squareFootage} sf` : '—' },
              { label: 'Budget',   value: formData.budgetRange    || '—' },
              { label: 'Timeline', value: formData.buildTimeline  || '—' },
            ].map(s => (
              <div key={s.label} className="bg-[#2C2420]/60 border border-[#C4BDB5]/10 px-3 py-2 rounded-sm">
                <div className="text-[#9B9189] text-[10px] tracking-widest uppercase">{s.label}</div>
                <div className="text-[#F7F3EE] text-xs font-medium mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="no-print bg-[#F7F3EE] border-b border-[#E8E0D5] px-4 lg:px-10 py-3">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#9B9189] text-[11px] leading-relaxed">
            <strong className="text-[#5C4033]">Concept tool only.</strong> Not licensed architectural documentation.
            All final plans require licensed professionals and local permits.
          </p>
        </div>
      </div>

      {/* Main result */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {briefResponse?.brief ? (
              <EstateAestheticResult
                ref={resultRef}
                match={aestheticMatch}
                brief={briefResponse.brief}
                formData={formData}
              />
            ) : (
              /* Fallback: show the matched board alone if brief failed */
              <div className="max-w-7xl mx-auto px-4 lg:px-10 py-10">
                <div className="border border-[#E0D8CE] bg-white rounded-sm overflow-hidden shadow-sm">
                  <div className="px-5 py-3 border-b border-[#E0D8CE] bg-[#F7F3EE]">
                    <span className="text-[#5C4033] text-xs tracking-[0.2em] uppercase font-medium">
                      {aestheticMatch.collectionName} — {aestheticMatch.collectionTag}
                    </span>
                  </div>
                  <img
                    src={aestheticMatch.imagePath}
                    alt={`${aestheticMatch.collectionName} concept board`}
                    className="w-full object-contain bg-white"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gateOpen && (
          <DownloadGateModal
            estateName={briefResponse?.brief?.estateName ?? blueprint.estateName}
            aestheticStyle={formData.aestheticStyle}
            onClose={() => setGateOpen(false)}
            onConfirm={() => {
              const link = document.createElement('a')
              link.href = aestheticMatch.imagePath
              link.download = `${(briefResponse?.brief?.estateName ?? blueprint.estateName).replace(/\s+/g, '-')}-blueprint.webp`
              link.click()
            }}
          />
        )}
      </AnimatePresence>

    </div>
  )
}
