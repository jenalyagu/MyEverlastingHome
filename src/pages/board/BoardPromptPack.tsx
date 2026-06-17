import { motion } from 'framer-motion'
import { PROMPT_PACKS, type PromptPack } from './boardTypes'

interface BoardPromptPackProps {
  selectedId: string | undefined
  onSelect: (pack: PromptPack) => void
}

export default function BoardPromptPack({ selectedId, onSelect }: BoardPromptPackProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-[#E8E0D5]" />
        <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Prompt Packs</span>
        <div className="h-px flex-1 bg-[#E8E0D5]" />
      </div>
      <p className="text-[#9B9189] text-sm text-center mb-6">
        Start with a curated aesthetic vision — all settings pre-filled, fully customizable.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {PROMPT_PACKS.map((pack, i) => {
          const selected = selectedId === pack.id
          return (
            <motion.button
              key={pack.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(pack)}
              className={`group text-left rounded-sm border overflow-hidden transition-all duration-200 ${
                selected
                  ? 'border-[#C9A84C] shadow-md shadow-[#C9A84C]/10'
                  : 'border-[#E8E0D5] hover:border-[#C9A84C]/50'
              }`}
            >
              {/* Swatch bar */}
              <div className="flex h-10">
                {pack.swatches.map((hex) => (
                  <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
                ))}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-serif text-base text-[#1A1614] leading-tight">{pack.name}</div>
                    <div className="text-[#9B9189] text-xs mt-1 leading-relaxed">{pack.tagline}</div>
                  </div>
                  {selected && (
                    <div className="w-4 h-4 rounded-full bg-[#C9A84C] flex-shrink-0 mt-0.5" />
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
