import { useState, useEffect } from 'react'
import type { ProviderName } from '../lib/imageProviders/imageProviderTypes'
import { IMAGE_MODELS } from '../lib/imageProviderConfig'

interface ProviderInfo {
  active: { name: ProviderName; model: string; label: string } | null
  available: Record<ProviderName, boolean>
}

interface ImageProviderSwitcherProps {
  selectedProvider: ProviderName
  onChange: (provider: ProviderName) => void
  compact?: boolean
}

const PROVIDERS: ProviderName[] = ['openai', 'gemini', 'dalle']

export default function ImageProviderSwitcher({ selectedProvider, onChange, compact = false }: ImageProviderSwitcherProps) {
  const [serverInfo, setServerInfo] = useState<ProviderInfo | null>(null)

  useEffect(() => {
    fetch('/api/image-provider')
      .then(r => r.json())
      .then(data => setServerInfo(data as ProviderInfo))
      .catch(() => null)
  }, [])

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-[10px] font-medium tracking-widest uppercase text-[#9B9189] hidden sm:block flex-shrink-0">Provider</span>
        <div className="flex gap-1">
          {PROVIDERS.map((p) => {
            const available = serverInfo?.available[p] ?? true
            const active = selectedProvider === p
            const shortLabel = p === 'openai' ? 'GPT' : p === 'gemini' ? 'Gemini' : 'DALL·E'
            return (
              <button
                key={p}
                onClick={() => available && onChange(p)}
                disabled={!available}
                title={IMAGE_MODELS[p].description}
                className={`px-2 py-1 text-[10px] font-medium tracking-wide rounded-sm border transition-all ${
                  active
                    ? 'bg-[#C9A84C] border-[#C9A84C] text-[#1A1614]'
                    : available
                    ? 'bg-transparent border-[#E8E0D5] text-[#5C4033] hover:border-[#C9A84C]/50'
                    : 'bg-transparent border-[#E8E0D5] text-[#C4BDB5] cursor-not-allowed opacity-50'
                }`}
              >
                {shortLabel}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="border border-[#E8E0D5] bg-[#F7F3EE] rounded-sm p-4">
      <div className="text-[10px] font-semibold tracking-widest uppercase text-[#9B9189] mb-3">Image Provider</div>
      <div className="flex flex-col gap-2">
        {PROVIDERS.map((p) => {
          const info = IMAGE_MODELS[p]
          const available = serverInfo?.available[p] ?? true
          const active = selectedProvider === p
          return (
            <button
              key={p}
              onClick={() => available && onChange(p)}
              disabled={!available}
              className={`text-left px-4 py-3 border rounded-sm transition-all ${
                active
                  ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
                  : available
                  ? 'bg-white border-[#E8E0D5] text-[#3D2B1F] hover:border-[#C9A84C]/50'
                  : 'bg-[#F7F3EE] border-[#E8E0D5] text-[#C4BDB5] cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-semibold tracking-wide">{info.label}</span>
                {!available && (
                  <span className="text-[10px] text-[#C4BDB5] tracking-wide">No key</span>
                )}
                {active && available && (
                  <span className="text-[10px] text-[#C9A84C] tracking-wide">Active</span>
                )}
              </div>
              <span className={`text-[11px] font-light leading-relaxed ${active ? 'text-[#C4BDB5]' : 'text-[#9B9189]'}`}>
                {info.description}
              </span>
            </button>
          )
        })}
      </div>
      {serverInfo?.active && (
        <p className="text-[10px] text-[#9B9189] mt-3 leading-relaxed">
          Server default: <span className="text-[#5C4033]">{serverInfo.active.label}</span> — {serverInfo.active.model}
        </p>
      )}
    </div>
  )
}
