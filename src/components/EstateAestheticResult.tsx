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

const FLOOR_LABELS = [
  { key: 'mainFloorZones',     label: 'Main Floor' },
  { key: 'upperFloorZones',    label: 'Upper Floor' },
  { key: 'wellnessLevelZones', label: 'Wellness Level' },
  { key: 'sitePlanZones',      label: 'Site Plan' },
] as const

const EstateAestheticResult = forwardRef<HTMLDivElement, Props>(function EstateAestheticResult({ match, brief, formData }, ref) {
  const [showModal, setShowModal] = useState(false)
  const isWide = match.orientation === 'wide'

  const specItems = [
    formData.squareFootage && { label: 'Square Footage', value: `${formData.squareFootage} sf` },
    formData.bedrooms      && { label: 'Bedrooms',       value: formData.bedrooms },
    formData.bathrooms     && { label: 'Bathrooms',      value: formData.bathrooms },
    formData.garageSpaces  && { label: 'Garage',         value: `${formData.garageSpaces}-car` },
    formData.landSize      && { label: 'Land',           value: formData.landSize },
    formData.budgetRange   && { label: 'Budget',         value: formData.budgetRange },
  ].filter(Boolean) as { label: string; value: string }[]

  const featureFlags = [
    formData.wellnessSuite  && 'Wellness Suite',
    formData.chefKitchen    && "Chef's Kitchen",
    formData.poolSpa        && 'Pool & Spa',
    formData.officStudio    && "Founder's Studio",
    formData.homeschoolRoom && 'Learning Atelier',
    formData.guestSuite     && 'Guest Suite',
    formData.outdoorKitchen && 'Outdoor Kitchen',
    formData.fireLounge     && 'Fire Lounge',
    formData.greenhouse     && 'Greenhouse',
    formData.orchard        && 'Orchard',
    formData.reflectingPond && 'Reflecting Pond',
    formData.sportCourt     && 'Sport Court',
    formData.raisedBeds     && 'Kitchen Gardens',
    formData.playLawn       && 'Play Lawn',
    formData.pantry         && 'Walk-In Pantry',
    formData.laundryMudroom && 'Mudroom Hub',
  ].filter(Boolean) as string[]

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 lg:px-10 py-10 space-y-12">

      {/* ── Collection badge ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <div className="h-px w-8 bg-[#C9A84C]" />
        <span className="text-[#C9A84C] text-xs tracking-[0.25em] uppercase font-medium">
          {match.collectionName} — {match.collectionTag}
        </span>
      </motion.div>

      {/* ── Estate name + subtitle ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <h2 className="font-serif text-4xl md:text-6xl text-[#1A1614] leading-tight mb-3">
          {brief.estateName}
        </h2>
        <p className="text-[#6B5D52] text-lg font-light italic">{brief.estateSubtitle}</p>
      </motion.div>

      {/* ── Spec strip ── */}
      {specItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {specItems.map(s => (
            <div key={s.label} className="border border-[#E0D8CE] bg-white px-4 py-2 rounded-sm">
              <div className="text-[#9B9189] text-[10px] tracking-widest uppercase">{s.label}</div>
              <div className="text-[#1A1614] text-sm font-medium mt-0.5">{s.value}</div>
            </div>
          ))}
        </motion.div>
      )}

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

      {/* ── Floor plans + features ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Floor zones */}
        <div className="border border-[#E0D8CE] bg-white rounded-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-[#E0D8CE] bg-[#F7F3EE]">
            <span className="text-[#5C4033] text-xs tracking-[0.2em] uppercase font-medium">Estate Program</span>
          </div>
          <div className="p-5 grid grid-cols-2 gap-5">
            {FLOOR_LABELS.map(({ key, label }) => {
              const zones = brief[key] as string[]
              if (!zones?.length) return null
              return (
                <div key={key}>
                  <div className="text-[#C9A84C] text-[10px] tracking-widest uppercase mb-2">{label}</div>
                  <ul className="space-y-1">
                    {zones.map(z => (
                      <li key={z} className="text-[#3D2F27] text-xs flex items-start gap-1.5">
                        <span className="text-[#C9A84C] mt-0.5 shrink-0">—</span>
                        {z}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* Selected features + SCIP benefits */}
        <div className="space-y-6">

          {featureFlags.length > 0 && (
            <div className="border border-[#E0D8CE] bg-white rounded-sm overflow-hidden">
              <div className="px-5 py-3 border-b border-[#E0D8CE] bg-[#F7F3EE]">
                <span className="text-[#5C4033] text-xs tracking-[0.2em] uppercase font-medium">Estate Features</span>
              </div>
              <div className="p-5 flex flex-wrap gap-2">
                {featureFlags.map(f => (
                  <span
                    key={f}
                    className="border border-[#C9A84C]/40 text-[#5C4033] text-[11px] px-3 py-1 rounded-sm bg-[#FBF8F2]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="border border-[#E0D8CE] bg-white rounded-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E0D8CE] bg-[#F7F3EE]">
              <span className="text-[#5C4033] text-xs tracking-[0.2em] uppercase font-medium">Built with SCIP</span>
            </div>
            <div className="p-5 space-y-4">
              {brief.scipBenefits.map(b => (
                <div key={b.title}>
                  <div className="text-[#1A1614] text-sm font-medium mb-0.5">{b.title}</div>
                  <div className="text-[#6B5D52] text-xs leading-relaxed">{b.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

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
