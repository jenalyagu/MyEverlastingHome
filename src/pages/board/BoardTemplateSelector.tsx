import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { type BoardConfig, type PromptPack, PROMPT_PACKS } from './boardTypes'
import BoardPromptPack from './BoardPromptPack'

const STYLE_OPTIONS = [
  { label: 'Modern Organic', description: 'Natural materials, fluid forms, biophilic details' },
  { label: 'Traditional / Classic', description: 'Symmetry, fine millwork, enduring elegance' },
  { label: 'Mediterranean / Spanish', description: 'Terracotta, arches, sun-drenched courtyards' },
  { label: 'Farmhouse / Agrarian', description: 'Honest materials, pitched roofs, land connection' },
  { label: 'Minimalist / Contemporary', description: 'Precision, restraint, quietly monumental' },
]

interface BoardTemplateSelectorProps {
  config: BoardConfig
  onStyleSelect: (style: string) => void
  onPackSelect: (pack: PromptPack) => void
  onCustomize: () => void
  onGenerate: () => void
}

export default function BoardTemplateSelector({
  config,
  onStyleSelect,
  onPackSelect,
  onCustomize,
  onGenerate,
}: BoardTemplateSelectorProps) {
  const canGenerate = !!config.aestheticStyle || !!config.promptPackId

  return (
    <div className="max-w-4xl mx-auto">
      {/* Style selector */}
      <div className="mb-10">
        <h2 className="font-serif text-2xl text-[#1A1614] mb-1">Choose a base style</h2>
        <p className="text-[#9B9189] text-sm mb-6">This sets the architectural DNA of your board.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {STYLE_OPTIONS.map((opt, i) => {
            const selected = config.aestheticStyle === opt.label
            return (
              <motion.button
                key={opt.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => onStyleSelect(opt.label)}
                className={`text-left p-5 rounded-sm border transition-all duration-200 ${
                  selected
                    ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                    : 'bg-white border-[#E8E0D5] text-[#3D2B1F] hover:border-[#C9A84C]/50'
                }`}
              >
                <div className={`font-medium text-sm mb-1 ${selected ? 'text-[#F7F3EE]' : 'text-[#1A1614]'}`}>
                  {opt.label}
                </div>
                <div className={`text-xs leading-relaxed ${selected ? 'text-[#C4BDB5]' : 'text-[#9B9189]'}`}>
                  {opt.description}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Prompt packs */}
      <div className="mb-10">
        <BoardPromptPack
          selectedId={config.promptPackId}
          onSelect={onPackSelect}
        />
      </div>

      {/* CTA row */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E8E0D5]">
        <button
          onClick={onCustomize}
          disabled={!canGenerate}
          className="flex-1 px-6 py-3 rounded-sm border border-[#E8E0D5] text-sm font-medium text-[#5C4033] hover:border-[#C9A84C]/60 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          Customize Details
        </button>
        <button
          onClick={onGenerate}
          disabled={!canGenerate}
          className="flex-1 flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#DFC078] disabled:opacity-40 disabled:cursor-not-allowed text-[#1A1614] px-6 py-3 rounded-sm text-sm font-medium tracking-wide transition-all duration-200"
        >
          <Sparkles size={14} />
          Generate Concept Board
        </button>
      </div>
      {!canGenerate && (
        <p className="text-[#C4BDB5] text-xs text-center mt-3">Select a style or prompt pack above to continue.</p>
      )}

      {/* Pack details preview */}
      {config.promptPackId && (() => {
        const pack = PROMPT_PACKS.find((p) => p.id === config.promptPackId)
        if (!pack) return null
        return (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-5 bg-[#FDFAF6] border border-[#E8E0D5] rounded-sm"
          >
            <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-2">{pack.name} — Pre-filled Settings</div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-[#5C4033]">
              <div><span className="text-[#9B9189]">Style:</span> {pack.config.aestheticStyle}</div>
              <div><span className="text-[#9B9189]">Climate:</span> {pack.config.climate}</div>
              <div><span className="text-[#9B9189]">Mood:</span> {pack.config.moodWords?.join(', ')}</div>
              <div><span className="text-[#9B9189]">Lifestyle:</span> {pack.config.lifestyleVibe}</div>
            </div>
          </motion.div>
        )
      })()}
    </div>
  )
}
