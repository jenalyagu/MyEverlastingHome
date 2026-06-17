import { motion } from 'framer-motion'
import { Sparkles, ChevronLeft } from 'lucide-react'
import {
  type BoardConfig,
  MOOD_WORD_OPTIONS,
  KEY_SPACE_OPTIONS,
  OUTDOOR_FOCUS_OPTIONS,
  LIFESTYLE_VIBE_OPTIONS,
} from './boardTypes'

const CLIMATE_OPTIONS = [
  'Hot & dry / Desert', 'Hot & humid', 'Mild / Coastal',
  'Mixed / Four seasons', 'Cold / Northern',
]

const STYLE_OPTIONS = [
  'Modern Organic', 'Traditional / Classic', 'Mediterranean / Spanish',
  'Farmhouse / Agrarian', 'Minimalist / Contemporary',
]

const COLOR_OPTIONS: { value: BoardConfig['colorDirection']; label: string; desc: string }[] = [
  { value: 'warm', label: 'Warm', desc: 'Earthy, amber, terracotta' },
  { value: 'cool', label: 'Cool', desc: 'Stone, slate, sea glass' },
  { value: 'neutral', label: 'Neutral', desc: 'Cream, linen, chalk' },
  { value: 'contrast', label: 'High Contrast', desc: 'Dark tones with light accents' },
]

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-sm text-sm font-medium transition-all border ${
        selected
          ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
          : 'bg-white border-[#E8E0D5] text-[#5C4033] hover:border-[#C9A84C]/60'
      }`}
    >
      {label}
    </button>
  )
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-[#9B9189] tracking-widest uppercase mb-3">
      {children}
    </label>
  )
}

interface BoardIntakeProps {
  config: BoardConfig
  onChange: (config: BoardConfig) => void
  onBack: () => void
  onGenerate: () => void
  generating: boolean
}

export default function BoardIntake({ config, onChange, onBack, onGenerate, generating }: BoardIntakeProps) {
  const set = <K extends keyof BoardConfig>(key: K, val: BoardConfig[K]) =>
    onChange({ ...config, [key]: val })

  const toggle = (key: 'moodWords' | 'keySpaces', val: string) => {
    const list = config[key] as string[]
    set(key, list.includes(val) ? list.filter((x) => x !== val) : [...list, val])
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#9B9189] hover:text-[#5C4033] text-sm mb-8 transition-colors"
      >
        <ChevronLeft size={14} />
        Back to templates
      </button>

      <h2 className="font-serif text-2xl text-[#1A1614] mb-1">Customize your board</h2>
      <p className="text-[#9B9189] text-sm mb-10">Refine the details — or leave defaults and generate.</p>

      <div className="space-y-10 bg-white border border-[#E8E0D5] rounded-sm p-6 md:p-10">

        {/* Aesthetic style */}
        <div>
          <FieldLabel>Aesthetic style</FieldLabel>
          <div className="grid sm:grid-cols-2 gap-2">
            {STYLE_OPTIONS.map((s) => (
              <Chip key={s} label={s} selected={config.aestheticStyle === s} onClick={() => set('aestheticStyle', s)} />
            ))}
          </div>
        </div>

        {/* Climate */}
        <div>
          <FieldLabel>Climate / setting</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {CLIMATE_OPTIONS.map((c) => (
              <Chip key={c} label={c} selected={config.climate === c} onClick={() => set('climate', c)} />
            ))}
          </div>
        </div>

        {/* Color direction */}
        <div>
          <FieldLabel>Color direction</FieldLabel>
          <div className="grid sm:grid-cols-2 gap-3">
            {COLOR_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => set('colorDirection', opt.value)}
                className={`text-left p-4 rounded-sm border transition-all ${
                  config.colorDirection === opt.value
                    ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                    : 'bg-white border-[#E8E0D5] text-[#3D2B1F] hover:border-[#C9A84C]/50'
                }`}
              >
                <div className={`font-medium text-sm ${config.colorDirection === opt.value ? 'text-[#F7F3EE]' : 'text-[#1A1614]'}`}>
                  {opt.label}
                </div>
                <div className={`text-xs mt-0.5 ${config.colorDirection === opt.value ? 'text-[#C4BDB5]' : 'text-[#9B9189]'}`}>
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mood words */}
        <div>
          <FieldLabel>Mood words (pick up to 5)</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {MOOD_WORD_OPTIONS.map((w) => (
              <Chip
                key={w}
                label={w}
                selected={config.moodWords.includes(w)}
                onClick={() => {
                  if (config.moodWords.includes(w) || config.moodWords.length < 5) toggle('moodWords', w)
                }}
              />
            ))}
          </div>
        </div>

        {/* Key spaces */}
        <div>
          <FieldLabel>Signature spaces to feature</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {KEY_SPACE_OPTIONS.map((s) => (
              <Chip key={s} label={s} selected={config.keySpaces.includes(s)} onClick={() => toggle('keySpaces', s)} />
            ))}
          </div>
        </div>

        {/* Outdoor focus */}
        <div>
          <FieldLabel>Outdoor focus</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {OUTDOOR_FOCUS_OPTIONS.map((o) => (
              <Chip key={o} label={o} selected={config.outdoorFocus === o} onClick={() => set('outdoorFocus', o)} />
            ))}
          </div>
        </div>

        {/* Lifestyle vibe */}
        <div>
          <FieldLabel>Lifestyle vibe</FieldLabel>
          <div className="flex flex-wrap gap-2">
            {LIFESTYLE_VIBE_OPTIONS.map((v) => (
              <Chip key={v} label={v} selected={config.lifestyleVibe === v} onClick={() => set('lifestyleVibe', v)} />
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E0D5]">
          <button
            onClick={onGenerate}
            disabled={generating || !config.aestheticStyle}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#DFC078] disabled:opacity-50 disabled:cursor-not-allowed text-[#1A1614] px-6 py-4 text-sm font-medium tracking-wide rounded-sm transition-all duration-200"
          >
            <Sparkles size={14} />
            {generating ? 'Generating your concept board…' : 'Generate Concept Board'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
