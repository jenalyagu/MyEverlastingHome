import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckSquare, Layers, Leaf, Droplets, Building2, Heart, Sparkles, Loader2 } from 'lucide-react'
import { type Blueprint } from '../lib/blueprintGenerator'
import { type EstateFormData } from '../lib/blueprintGenerator'

interface BlueprintPageProps {
  blueprint: Blueprint
  formData: EstateFormData
  onBack: () => void
}

interface ConceptBoard {
  aestheticVision: string
  architecturalCharacter: string
  materialPalette: Array<{ name: string; hex: string; usage: string }>
  keySpaces: Array<{ name: string; vignette: string; photo?: string | null }>
  outdoorEthos: string
  lightAndMood: string
  signatureDetails: string[]
  moodWords: string[]
  heroPhoto?: string | null
  lifestylePhotos?: Array<string | null>
  lifestyleQueries?: string[]
}


function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="border border-[#E8E0D5] bg-white rounded-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#E8E0D5] bg-[#F7F3EE]">
        <Icon size={16} className="text-[#C9A84C]" />
        <h3 className="font-serif text-lg text-[#1A1614]">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function ConceptBoardPanel({ formData }: { formData: EstateFormData }) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [board, setBoard] = useState<ConceptBoard | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function generate() {
    setState('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/concept-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(err.error || 'Generation failed')
      }
      const data: ConceptBoard = await res.json()
      setBoard(data)
      setState('done')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setState('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="lg:col-span-3"
    >
      <div className="border border-[#C9A84C]/30 rounded-sm overflow-hidden">
        {/* Panel header */}
        <div className="bg-gradient-to-r from-[#1A1614] to-[#2C2420] px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} className="text-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">AI Concept Board</span>
            </div>
            <h3 className="font-serif text-2xl text-[#F7F3EE]">Dream Home Vision</h3>
            <p className="text-[#9B9189] text-sm mt-1">Claude generates a bespoke aesthetic concept from your estate profile</p>
          </div>

          {state !== 'done' && (
            <button
              onClick={generate}
              disabled={state === 'loading'}
              className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#DFC078] disabled:opacity-50 disabled:cursor-not-allowed text-[#1A1614] px-6 py-3 text-sm font-medium tracking-wide rounded-sm transition-all duration-200 flex-shrink-0"
            >
              {state === 'loading' ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Generate Concept Board
                </>
              )}
            </button>
          )}
        </div>

        {/* Error state */}
        {state === 'error' && (
          <div className="bg-[#FDFAF6] px-8 py-6">
            <p className="text-red-700 text-sm mb-3">{errorMsg}</p>
            <button onClick={generate} className="text-[#C9A84C] text-sm underline underline-offset-2">Try again</button>
          </div>
        )}

        {/* Idle placeholder */}
        {state === 'idle' && (
          <div className="bg-[#FDFAF6] px-8 py-10 flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full border border-[#E8E0D5] flex items-center justify-center">
              <Sparkles size={20} className="text-[#C4BDB5]" />
            </div>
            <p className="text-[#9B9189] text-sm max-w-md">Generate a visual mood board for your estate — curated photography, material palette, space vignettes, and bespoke aesthetic vision.</p>
          </div>
        )}

        {/* Loading state */}
        {state === 'loading' && (
          <div className="bg-[#FDFAF6] px-8 py-10 flex flex-col items-center gap-4">
            <div className="flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#C9A84C] rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
            <p className="text-[#9B9189] text-sm">Crafting your estate concept board…</p>
          </div>
        )}

        {/* Concept board results */}
        <AnimatePresence>
          {state === 'done' && board && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero image */}
              <div className="relative h-80 md:h-[420px] overflow-hidden bg-[#2C2420]">
                {board.heroPhoto ? (
                  <img src={board.heroPhoto} alt="Estate exterior" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#2C2420] to-[#1A1614]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                {/* Mood words over hero */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {board.moodWords.map((word) => (
                      <span key={word} className="px-3 py-1 border border-white/30 text-white/80 text-xs tracking-widest uppercase font-medium backdrop-blur-sm bg-white/10">
                        {word}
                      </span>
                    ))}
                  </div>
                  <p className="text-white/90 font-light leading-relaxed max-w-3xl text-sm md:text-base">{board.aestheticVision}</p>
                </div>
              </div>

              {/* Architectural character + light & mood */}
              <div className="grid md:grid-cols-2 border-b border-[#E8E0D5]">
                <div className="px-8 py-6 border-r border-[#E8E0D5]">
                  <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-2">Architectural Character</div>
                  <p className="text-[#2C2420] leading-relaxed text-sm">{board.architecturalCharacter}</p>
                </div>
                <div className="px-8 py-6">
                  <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-2">Light & Mood</div>
                  <p className="text-[#5C4033] leading-relaxed text-sm italic">{board.lightAndMood}</p>
                </div>
              </div>

              {/* Material palette */}
              <div className="px-8 py-6 border-b border-[#E8E0D5] bg-white">
                <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">Material Palette</div>
                <div className="flex flex-wrap gap-4">
                  {board.materialPalette.map((mat) => (
                    <div key={mat.name} className="flex flex-col items-center gap-2 min-w-[72px]">
                      <div
                        className="w-14 h-14 rounded-sm border border-[#E8E0D5] shadow-sm"
                        style={{ backgroundColor: mat.hex }}
                      />
                      <div className="text-center">
                        <div className="text-[#1A1614] text-xs font-medium leading-tight">{mat.name}</div>
                        <div className="text-[#C4BDB5] text-[10px] font-mono mt-0.5">{mat.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key spaces photo grid */}
              <div className="px-8 py-6 border-b border-[#E8E0D5] bg-[#FDFAF6]">
                <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">Life Lived Beautifully</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {board.keySpaces.map((space) => (
                    <div key={space.name} className="group relative overflow-hidden rounded-sm bg-[#2C2420]">
                      <div className="aspect-[4/3] overflow-hidden">
                        {space.photo ? (
                          <img
                            src={space.photo}
                            alt={space.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#3C3230] to-[#2C2420]" />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <div className="text-white text-xs font-medium tracking-wide uppercase">{space.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Space vignette text below grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  {board.keySpaces.map((space) => (
                    <p key={space.name + '-text'} className="text-[#9B9189] text-xs leading-relaxed">{space.vignette}</p>
                  ))}
                </div>
              </div>

              {/* Lifestyle photo strip */}
              {board.lifestylePhotos && board.lifestylePhotos.some(Boolean) && (
                <div className="px-8 py-6 border-b border-[#E8E0D5] bg-white">
                  <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-4">The {(board.moodWords?.[0] ?? 'Estate')} Lifestyle</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {board.lifestylePhotos.map((photo, i) => (
                      <div key={i} className="relative overflow-hidden rounded-sm bg-[#2C2420] aspect-square">
                        {photo ? (
                          <img src={photo} alt="Lifestyle" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#3C3230] to-[#2C2420]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Outdoor ethos + signature details */}
              <div className="grid md:grid-cols-2 border-b border-[#E8E0D5]">
                <div className="px-8 py-6 bg-[#FDFAF6] border-r border-[#E8E0D5]">
                  <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-3">Estate Grounds</div>
                  <p className="text-[#5C4033] leading-relaxed text-sm">{board.outdoorEthos}</p>
                </div>
                <div className="px-8 py-6 bg-white">
                  <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-3">Signature Details</div>
                  <ul className="space-y-2">
                    {board.signatureDetails.map((detail, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#5C4033] leading-relaxed">
                        <span className="font-serif text-[#C9A84C] flex-shrink-0">{i + 1}.</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Regenerate */}
              <div className="px-8 py-5 flex justify-end bg-[#FDFAF6]">
                <button
                  onClick={generate}
                  className="flex items-center gap-2 text-[#9B9189] hover:text-[#C9A84C] text-xs tracking-wide transition-colors"
                >
                  <Sparkles size={12} />
                  Regenerate concept board
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function BlueprintPage({ blueprint, formData, onBack }: BlueprintPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Header */}
      <div className="bg-[#1A1614] px-6 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#9B9189] hover:text-[#C4BDB5] text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Estate Designer
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">AI Estate Blueprint</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-4xl md:text-5xl text-[#F7F3EE] mb-2">{blueprint.estateName}</h1>
            <p className="text-[#C4BDB5] text-lg font-light italic">{blueprint.tagline}</p>
          </motion.div>

          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { label: 'Style', value: formData.aestheticStyle || 'Modern Organic' },
              { label: 'Size', value: formData.squareFootage || '5,000–7,000 sf' },
              { label: 'Budget', value: formData.budgetRange || 'Premium' },
              { label: 'Timeline', value: formData.buildTimeline || '18–24 months' },
            ].map((s) => (
              <div key={s.label} className="bg-[#2C2420]/60 border border-[#C4BDB5]/10 px-4 py-2 rounded-sm">
                <div className="text-[#9B9189] text-xs tracking-widest uppercase">{s.label}</div>
                <div className="text-[#F7F3EE] text-sm font-medium mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#F7F3EE] border-b border-[#E8E0D5] px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#9B9189] text-xs leading-relaxed">
            <strong className="text-[#5C4033]">Concept tool only.</strong> This blueprint is a pre-design planning concept, not licensed architectural or engineering documentation. All final plans require licensed architects, structural engineers, MEP engineers, and local building permits. My Everlasting Home is not responsible for construction decisions made based on this concept.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Concept Board — full width at top */}
          <ConceptBoardPanel formData={formData} />

          {/* Left column — wide */}
          <div className="lg:col-span-2 space-y-6">

            {/* Lifestyle Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="bg-[#1A1614] rounded-sm p-8">
                <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-3">Lifestyle Summary</div>
                <p className="text-[#C4BDB5] leading-relaxed">{blueprint.lifestyleSummary}</p>
              </div>
            </motion.div>

            {/* Room Program */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section title="Room Program" icon={Building2}>
                <div className="space-y-3">
                  {blueprint.rooms.map((room) => (
                    <div key={room.name} className="flex gap-4 py-3 border-b border-[#E8E0D5] last:border-0">
                      <div className="w-2 h-2 bg-[#C9A84C] rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm text-[#1A1614]">{room.name}</div>
                        <div className="text-[#9B9189] text-sm mt-0.5">{room.notes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>

            {/* Outdoor Zones */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Outdoor Zone Plan" icon={Leaf}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {blueprint.outdoorZones.map((zone) => (
                    <div key={zone.name} className="p-4 bg-[#F7F3EE] rounded-sm border border-[#E8E0D5]">
                      <div className="font-medium text-sm text-[#1A1614] mb-1">{zone.name}</div>
                      <div className="text-[#9B9189] text-xs leading-relaxed">{zone.notes}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>

            {/* Garden & Water */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Section title="Garden & Water Recommendations" icon={Droplets}>
                <ul className="space-y-3">
                  {blueprint.gardenWaterNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#5C4033] leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-[#6B7C4B] rounded-full mt-2 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </Section>
            </motion.div>

            {/* Build Phasing */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Section title="Build Phasing Roadmap" icon={Layers}>
                <div className="space-y-6">
                  {blueprint.buildPhasing.map((phase, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-[#E8E0D5]">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-[#C9A84C] rounded-full" />
                      <div className="font-medium text-sm text-[#1A1614] mb-2">{phase.phase}</div>
                      <ul className="space-y-1">
                        {phase.items.map((item) => (
                          <li key={item} className="text-sm text-[#9B9189] flex gap-2">
                            <span className="text-[#C9A84C] flex-shrink-0">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">

            {/* SCIP Notes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="border border-[#C9A84C]/30 bg-[#1A1614] rounded-sm p-6">
                <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-4">SCIP Construction Notes</div>
                <ul className="space-y-4">
                  {blueprint.scipNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#C4BDB5] leading-relaxed">
                      <span className="text-[#C9A84C] flex-shrink-0 font-serif">{i + 1}.</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Wellness Notes */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Wellness & Family Systems" icon={Heart}>
                <ul className="space-y-3">
                  {blueprint.wellnessFamilyNotes.map((note, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#5C4033] leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full mt-2 flex-shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </Section>
            </motion.div>

            {/* Builder Handoff */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <Section title="Builder Handoff Checklist" icon={CheckSquare}>
                <ul className="space-y-2">
                  {blueprint.builderHandoff.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-[#5C4033]">
                      <div className="w-4 h-4 border border-[#E8E0D5] rounded-sm mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Section>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}
