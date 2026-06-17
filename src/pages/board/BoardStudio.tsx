import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { type BoardConfig, type PresentationBoard, type PromptPack, defaultBoardConfig, PROMPT_PACKS } from './boardTypes'
import { generateBoard } from './boardGenerator'
import BoardTemplateSelector from './BoardTemplateSelector'
import BoardIntake from './BoardIntake'
import BoardPreview from './BoardPreview'
import { type EstateFormData } from '../../lib/blueprintGenerator'

type Phase = 'select' | 'intake' | 'generating' | 'preview' | 'error'

interface BoardStudioProps {
  onBack: () => void
  prefill?: EstateFormData
  onDesignEstate?: (board: PresentationBoard, config: BoardConfig) => void
}

function configFromFormData(data: EstateFormData): BoardConfig {
  const outdoorParts: string[] = []
  if (data.poolSpa) outdoorParts.push('Pool & spa')
  if (data.orchard) outdoorParts.push('Orchard')
  if (data.fireLounge) outdoorParts.push('Fire lounge')
  if (data.outdoorKitchen) outdoorParts.push('Outdoor kitchen')
  if (data.reflectingPond) outdoorParts.push('Reflecting pond')
  if (data.sportCourt) outdoorParts.push('Sport court')

  const keySpaces: string[] = []
  if (data.wellnessSuite) keySpaces.push('Wellness suite')
  if (data.chefKitchen) keySpaces.push("Chef's kitchen")
  if (data.officStudio) keySpaces.push('Home office')
  if (data.homeschoolRoom) keySpaces.push('Homeschool atelier')
  if (data.guestSuite) keySpaces.push('Guest casita')
  keySpaces.push('Primary suite', 'Great room')

  const lifestyleMap: Record<string, string> = {
    'Wellness & health': 'Wellness',
    'Entertaining & hospitality': 'Entertaining',
    'Privacy & retreat': 'Privacy',
    'Food & garden': 'Food & gardening',
    'Family & education': 'Family-centered',
  }
  const lifestyleVibe = data.lifestylePriorities
    .map((p) => lifestyleMap[p] ?? p)
    .find((p) => ['Wellness', 'Entertaining', 'Privacy', 'Food & gardening', 'Family-centered', 'Luxury', 'Slow living', 'Work from home'].includes(p)) ?? ''

  return {
    aestheticStyle: data.aestheticStyle || '',
    climate: data.climate || '',
    moodWords: [],
    keySpaces: keySpaces.slice(0, 6),
    colorDirection: '',
    outdoorFocus: outdoorParts[0] ?? '',
    lifestyleVibe,
  }
}

export default function BoardStudio({ onBack, prefill, onDesignEstate }: BoardStudioProps) {
  const initialConfig = prefill ? configFromFormData(prefill) : defaultBoardConfig
  const [phase, setPhase] = useState<Phase>(prefill ? 'generating' : 'select')
  const [config, setConfig] = useState<BoardConfig>(initialConfig)
  const [board, setBoard] = useState<PresentationBoard | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (prefill) {
      handleGenerate(initialConfig)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function handleStyleSelect(style: string) {
    setConfig((prev) => ({ ...prev, aestheticStyle: style, promptPackId: undefined }))
  }

  function handlePackSelect(pack: PromptPack) {
    setConfig((prev) => ({
      ...prev,
      ...pack.config,
      promptPackId: pack.id,
    }))
  }

  async function handleGenerate(cfg: BoardConfig = config) {
    setPhase('generating')
    setErrorMsg('')
    try {
      const result = await generateBoard(cfg)
      setBoard(result)
      setPhase('preview')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setPhase('error')
    }
  }

  function handleRestart() {
    setConfig(defaultBoardConfig)
    setBoard(null)
    setPhase('select')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Page header */}
      <div className="bg-[#1A1614] px-6 lg:px-10 py-10 print:hidden">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#9B9189] hover:text-[#C4BDB5] text-sm mb-8 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Estate Designer
          </button>

          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Board Studio</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-serif text-4xl md:text-5xl text-[#F7F3EE] mb-2">
              {prefill ? 'Your Estate, Presented.' : 'Design Your Vision'}
            </h1>
            <p className="text-[#9B9189] font-light max-w-xl">
              {prefill
                ? 'Your blueprint details are pre-loaded. Refine the aesthetic, then generate your luxury presentation board.'
                : 'Choose a style or prompt pack, refine your aesthetic, and let Claude generate a bespoke concept board for your dream residence.'}
            </p>
          </motion.div>

          {/* Phase indicator */}
          {phase !== 'select' && phase !== 'error' && (
            <div className="mt-6 flex items-center gap-6">
              {(['select', 'intake', 'preview'] as const).map((p, i) => {
                const phaseOrder = { select: 0, intake: 1, generating: 2, preview: 2, error: 0 }
                const current = phaseOrder[phase]
                const done = i < current || (!!prefill && i === 0)
                const active = i === Math.min(current, 2) && (!prefill || i > 0)
                return (
                  <div key={p} className="flex items-center gap-2">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      done ? 'bg-[#C9A84C] text-[#1A1614]' : active ? 'bg-[#C9A84C]/30 border border-[#C9A84C] text-[#C9A84C]' : 'bg-white/10 text-white/30'
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs capitalize tracking-wide ${active || done ? 'text-[#C4BDB5]' : 'text-[#5C4033]'}`}>
                      {p === 'select' ? 'Template' : p === 'intake' ? 'Details' : 'Board'}
                    </span>
                    {i < 2 && <div className="w-8 h-px bg-white/10" />}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-14 print:max-w-none print:px-0 print:py-0">
        <AnimatePresence mode="wait">

          {/* Select phase */}
          {phase === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BoardTemplateSelector
                config={config}
                onStyleSelect={handleStyleSelect}
                onPackSelect={handlePackSelect}
                onCustomize={() => setPhase('intake')}
                onGenerate={() => handleGenerate()}
              />
            </motion.div>
          )}

          {/* Intake phase */}
          {phase === 'intake' && (
            <motion.div key="intake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <BoardIntake
                config={config}
                onChange={setConfig}
                onBack={() => setPhase('select')}
                onGenerate={() => handleGenerate()}
                generating={false}
              />
            </motion.div>
          )}

          {/* Generating */}
          {phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2.5 h-2.5 bg-[#C9A84C] rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <div className="text-center">
                <p className="text-[#5C4033] font-serif text-xl mb-1">Crafting your concept board</p>
                <p className="text-[#9B9189] text-sm">Claude is generating your bespoke aesthetic vision…</p>
              </div>
            </motion.div>
          )}

          {/* Error */}
          {phase === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <p className="text-[#1A1614] font-serif text-xl mb-2">Something went wrong</p>
              <p className="text-red-700 text-sm mb-6">{errorMsg}</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => handleGenerate()} className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-6 py-3 rounded-sm text-sm font-medium hover:bg-[#DFC078] transition-colors">
                  <Loader2 size={14} />
                  Try again
                </button>
                <button onClick={handleRestart} className="px-6 py-3 rounded-sm border border-[#E8E0D5] text-sm text-[#5C4033] hover:border-[#C9A84C]/50 transition-colors">
                  Start over
                </button>
              </div>
            </motion.div>
          )}

          {/* Preview */}
          {phase === 'preview' && board && (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Board header */}
              <div className="mb-8 flex items-start justify-between gap-4 print:hidden">
                <div>
                  <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-1">
                    {config.promptPackId
                      ? PROMPT_PACKS.find((p) => p.id === config.promptPackId)?.name
                      : config.aestheticStyle}
                  </div>
                  <h2 className="font-serif text-3xl text-[#1A1614]">Your Concept Board</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {config.moodWords.map((w) => (
                      <span key={w} className="px-2 py-0.5 border border-[#E8E0D5] text-[#9B9189] text-xs rounded-sm">{w}</span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setPhase('intake')}
                  className="flex-shrink-0 text-xs text-[#9B9189] hover:text-[#5C4033] border border-[#E8E0D5] px-4 py-2 rounded-sm transition-colors"
                >
                  Edit preferences
                </button>
              </div>

              <BoardPreview
                board={board}
                config={config}
                onRegenerate={handleRestart}
                onDesignEstate={onDesignEstate && !prefill ? () => onDesignEstate(board, config) : undefined}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
