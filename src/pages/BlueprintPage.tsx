import { useState, useEffect, useRef } from 'react'
// useRef kept for EstateAestheticResult forwardRef compatibility
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download } from 'lucide-react'
import { type Blueprint, type EstateFormData } from '../lib/blueprintGenerator'
import { fetchBoardBrief, type BoardBriefResponse } from '../lib/fetchBoardBrief'
import { matchEstateAesthetic } from '../lib/matchEstateAesthetic'
import EstateAestheticResult from '../components/EstateAestheticResult'

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
        <div className="w-14 h-14 border border-[#C5A46D]/40 flex items-center justify-center">
          <span className="font-serif text-[#C5A46D] text-xl tracking-widest">M</span>
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
  const hasInitialized = useRef(false)
  const resultRef      = useRef<HTMLDivElement>(null)

  const aestheticMatch = matchEstateAesthetic(formData)

  const handleDownload = () => {
    window.print()
  }

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

    </div>
  )
}
