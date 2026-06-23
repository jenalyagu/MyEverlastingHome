import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { BoardBrief } from '../lib/buildBoardBrief'
import type { AestheticMatch } from '../lib/matchEstateAesthetic'
import type { EstateFormData } from '../lib/blueprintGenerator'
import ShareWithEHBG from './ShareWithEHBG'

interface Props {
  match: AestheticMatch
  brief: BoardBrief
  formData: EstateFormData
}


const EstateAestheticResult = forwardRef<HTMLDivElement, Props>(function EstateAestheticResult({ match, brief, formData }, ref) {
  const [showModal, setShowModal] = useState(false)
  const isWide = match.orientation === 'wide'

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 lg:px-10 py-10 space-y-12">

      {/* ── Matched aesthetic board ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="w-full"
      >
        <div className="border border-[#E0D8CE] bg-white rounded-sm overflow-hidden shadow-sm">
          <div className="px-5 py-3 border-b border-[#E0D8CE] bg-[#F7F3EE] flex items-center justify-between">
            <span className="text-[#5C4033] text-xs tracking-[0.2em] uppercase font-medium">
              Your Aesthetic Blueprint
            </span>
            <span className="text-[#9B9189] text-[11px]">{match.collectionTag}</span>
          </div>
          <img
            src={match.imagePath}
            alt={`${match.collectionName} concept board`}
            className={`w-full object-contain bg-white ${isWide ? '' : 'max-h-[80vh] object-top'}`}
          />
        </div>
      </motion.div>

      {/* ── Estate narrative ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-l-2 border-[#C9A84C] pl-6"
      >
        <p className="font-serif text-xl text-[#1A1614] leading-relaxed">{brief.estateNarrative}</p>
        <p className="mt-3 text-[#9B9189] text-sm italic">{brief.editorialNote}</p>
      </motion.div>

      {/* ── SCIP benefits ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Built with SCIP</span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {brief.scipBenefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
              className="border border-[#E0D8CE] bg-white rounded-sm p-5"
            >
              <div className="text-[#C9A84C] text-lg mb-2">{b.icon}</div>
              <div className="font-serif text-[#1A1614] text-sm mb-1">{b.title}</div>
              <div className="text-[#6B5D52] text-xs leading-relaxed">{b.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Footer tagline ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex items-center justify-between pt-6 border-t border-[#E0D8CE]"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[#C9A84C]/50 flex items-center justify-center">
            <span className="font-serif text-[#C9A84C] text-sm tracking-widest">{brief.footerMonogram}</span>
          </div>
          <div>
            <div className="font-serif text-[#1A1614] text-sm">{brief.estateName}</div>
            <div className="text-[#9B9189] text-[11px]">My Everlasting Home · SCIP Estate</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-serif text-[#6B5D52] text-sm italic text-right max-w-xs">{brief.footerTagline}</p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-5 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase hover:bg-[#B8973B] transition-colors rounded-sm"
          >
            Connect with EHBG
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <ShareWithEHBG
            brief={brief}
            match={match}
            formData={formData}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>

    </div>
  )
})

export default EstateAestheticResult
