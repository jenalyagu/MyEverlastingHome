import { useState } from 'react'
import { motion } from 'framer-motion'
import { ImageIcon, Loader2, RotateCcw, ArrowRight, Download } from 'lucide-react'
import { type PresentationBoard, type BoardConfig } from './boardTypes'
import { generateRender } from './boardGenerator'

interface BoardPreviewProps {
  board: PresentationBoard
  config: BoardConfig
  onRegenerate: () => void
  onDesignEstate?: () => void
}

function PlanCard({ label, description, imageUrl }: { label: string; description: string; imageUrl?: string }) {
  return (
    <div className="border border-[#E8E0D5] rounded-sm overflow-hidden">
      <div className="aspect-[4/3] bg-[#F7F3EE] flex items-center justify-center relative">
        {imageUrl ? (
          <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3 p-6 text-center w-full">
            <div className="w-full h-px bg-[#E8E0D5]" />
            <div className="grid grid-cols-4 gap-1 w-full opacity-10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-6 bg-[#C9A84C] rounded-sm" />
              ))}
            </div>
            <div className="w-3/4 h-px bg-[#E8E0D5]" />
            <div className="grid grid-cols-3 gap-1 w-3/4 opacity-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 bg-[#9B9189] rounded-sm" />
              ))}
            </div>
            <div className="w-full h-px bg-[#E8E0D5]" />
          </div>
        )}
      </div>
      <div className="px-4 py-3 bg-white border-t border-[#E8E0D5]">
        <div className="text-[#1A1614] text-xs font-medium tracking-wide uppercase">{label}</div>
        <div className="text-[#9B9189] text-[11px] mt-0.5 leading-relaxed">{description}</div>
      </div>
    </div>
  )
}

function BenefitCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="text-[#C9A84C] text-base flex-shrink-0 w-5 text-center leading-none mt-0.5">{icon}</div>
      <div>
        <div className="text-[#F7F3EE] text-sm font-medium mb-1">{title}</div>
        <div className="text-[#9B9189] text-xs leading-relaxed">{description}</div>
      </div>
    </div>
  )
}

export default function BoardPreview({ board, config, onRegenerate, onDesignEstate }: BoardPreviewProps) {
  const [renderState, setRenderState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [aiRender, setAiRender] = useState<string | null>(null)

  async function handleGenerateRender() {
    setRenderState('loading')
    try {
      const url = await generateRender(config)
      setAiRender(url)
      setRenderState('done')
    } catch {
      setRenderState('error')
    }
  }

  const heroUrl = aiRender ?? board.heroExterior.imageUrl

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto print:max-w-none"
    >
      {/* Download button — hidden in print */}
      <div className="flex justify-end mb-4 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 bg-[#1A1614] hover:bg-[#3D2B1F] text-[#F7F3EE] px-5 py-2.5 rounded-sm text-sm font-medium tracking-wide transition-colors"
        >
          <Download size={14} />
          Download PDF
        </button>
      </div>

      <div className="border border-[#C9A84C]/30 rounded-sm overflow-hidden print:border-0 print:rounded-none">

        {/* Print-only header */}
        <div className="hidden print:flex items-center justify-between px-8 py-5 bg-[#1A1614] border-b border-[#C9A84C]/20">
          <div>
            <div className="font-serif text-3xl text-[#C9A84C]">{board.footer.monogram}</div>
            <div className="text-[#F7F3EE] text-sm mt-0.5 tracking-wide">{board.title}</div>
          </div>
          <div className="text-right">
            <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium">{board.boardType}</div>
            <div className="text-[#9B9189] text-xs mt-1 italic">{board.subtitle}</div>
          </div>
        </div>

        {/* ── Hero exterior ── */}
        <div className="relative h-80 md:h-[480px] print:h-[420px] overflow-hidden bg-[#2C2420] print-section">
          {heroUrl ? (
            <img src={heroUrl} alt={board.heroExterior.label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2C2420] to-[#1A1614]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Board type badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#C9A84C]/90 text-[#1A1614] text-[10px] font-bold tracking-[0.2em] uppercase rounded-sm">
              {board.boardType}
            </span>
          </div>

          {/* AI render button */}
          <div className="absolute top-4 right-4 print:hidden">
            {renderState === 'idle' && (
              <button
                onClick={handleGenerateRender}
                className="flex items-center gap-2 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-sm transition-all"
              >
                <ImageIcon size={12} />
                Generate AI Render
              </button>
            )}
            {renderState === 'loading' && (
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/20 text-white/70 text-xs px-4 py-2 rounded-sm">
                <Loader2 size={12} className="animate-spin" />
                Rendering with DALL-E 3…
              </div>
            )}
            {(renderState === 'done' || renderState === 'error') && (
              <button
                onClick={handleGenerateRender}
                className={`flex items-center gap-2 backdrop-blur-sm text-xs font-medium px-4 py-2 rounded-sm transition-all ${
                  renderState === 'error'
                    ? 'bg-red-900/50 border border-red-400/30 text-red-300'
                    : 'bg-black/50 hover:bg-black/70 border border-[#C9A84C]/40 text-[#C9A84C]'
                }`}
              >
                <ImageIcon size={12} />
                {renderState === 'error' ? 'Retry Render' : 'Regenerate Render'}
              </button>
            )}
          </div>

          {/* Title + narrative */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-2">{board.aesthetic}</div>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-1">{board.title}</h2>
            <p className="text-white/70 text-sm italic mb-4">{board.subtitle}</p>
            <p className="text-white/80 font-light leading-relaxed max-w-2xl text-sm">{board.projectNarrative}</p>
          </div>
        </div>

        {/* ── Design philosophy ── */}
        <div className="px-8 py-7 border-b border-[#E8E0D5] bg-white print-section">
          <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-3">Design Philosophy</div>
          <p className="text-[#3D2B1F] leading-relaxed max-w-3xl">{board.designPhilosophy}</p>
        </div>

        {/* ── Floor plan composite + site plan ── */}
        <div className="px-8 py-8 border-b border-[#E8E0D5] bg-[#FDFAF6] print-section print-break-before">
          <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-5">Floor Plan Program</div>
          <div className="grid sm:grid-cols-2 gap-4">
            <PlanCard
              label={board.floorPlanComposite.label}
              description={board.floorPlanComposite.description}
              imageUrl={board.floorPlanComposite.imageUrl}
            />
            <PlanCard
              label={board.sitePlan.label}
              description={board.sitePlan.description}
              imageUrl={board.sitePlan.imageUrl}
            />
          </div>
          <p className="text-[#C4BDB5] text-xs mt-4">
            Schematic layout only — not to scale. Final drawings require licensed architect and structural engineer.
          </p>
        </div>

        {/* ── Material palette ── */}
        <div className="px-8 py-7 border-b border-[#E8E0D5] bg-white print-section">
          <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-5">Material Palette</div>
          <div className="flex flex-wrap gap-5">
            {board.materialPalette.map((mat) => (
              <div key={mat.name} className="flex flex-col items-center gap-2 min-w-[72px]">
                <div
                  className="w-14 h-14 rounded-sm border border-[#E8E0D5] shadow-sm"
                  style={{ backgroundColor: mat.hex }}
                />
                <div className="text-center">
                  <div className="text-[#1A1614] text-xs font-medium leading-tight">{mat.name}</div>
                  <div className="text-[#C4BDB5] text-[10px] font-mono mt-0.5">{mat.hex}</div>
                  <div className="text-[#9B9189] text-[10px] mt-0.5">{mat.usage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Key space photos ── */}
        {board.keySpacePhotos.length > 0 && (
          <div className="px-8 py-7 border-b border-[#E8E0D5] bg-[#FDFAF6]">
            <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-5">Life Lived Beautifully</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {board.keySpacePhotos.map((slot) => (
                <div key={slot.id} className="group relative overflow-hidden rounded-sm bg-[#2C2420]">
                  <div className="aspect-[4/3] overflow-hidden">
                    {slot.imageUrl ? (
                      <img
                        src={slot.imageUrl}
                        alt={slot.label}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#3C3230] to-[#2C2420]" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="text-white text-xs font-medium tracking-wide uppercase">{slot.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {board.spaceCaptions.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {board.spaceCaptions.map((caption, i) => (
                  <p key={i} className="text-[#9B9189] text-xs leading-relaxed">{caption}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Lifestyle photos ── */}
        {board.lifestylePhotos.some((s) => s.imageUrl) && (
          <div className="px-8 py-7 border-b border-[#E8E0D5] bg-white">
            <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-5">
              The {board.aesthetic} Lifestyle
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {board.lifestylePhotos.map((slot) => (
                <div key={slot.id} className="relative overflow-hidden rounded-sm bg-[#2C2420] aspect-square">
                  {slot.imageUrl ? (
                    <img src={slot.imageUrl} alt={slot.label} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#3C3230] to-[#2C2420]" />
                  )}
                </div>
              ))}
            </div>
            {board.lifestyleCaptions.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {board.lifestyleCaptions.map((caption, i) => (
                  <p key={i} className="text-[#9B9189] text-xs leading-relaxed italic">{caption}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SCIP benefits band ── */}
        <div className="bg-[#1A1614] px-8 py-8 border-b border-[#C9A84C]/20 print-section">
          <div className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase font-medium mb-6">Why This Residence</div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {board.scipBenefitsBand.map((b) => (
              <BenefitCard key={b.id} icon={b.icon} title={b.title} description={b.description} />
            ))}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="bg-[#0F0C0B] px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-serif text-4xl text-[#C9A84C] mb-2">{board.footer.monogram}</div>
              <div className="text-[#F7F3EE] text-sm font-medium mb-1">{board.footerTagline}</div>
              <p className="text-[#5C4033] text-xs italic max-w-sm leading-relaxed">"{board.footer.quote}"</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end print:hidden">
              {onDesignEstate && (
                <button
                  onClick={onDesignEstate}
                  className="flex items-center gap-2 bg-[#C9A84C] hover:bg-[#DFC078] text-[#1A1614] px-6 py-3 rounded-sm text-sm font-medium tracking-wide transition-colors"
                >
                  Design My Estate
                  <ArrowRight size={14} />
                </button>
              )}
              <button
                onClick={onRegenerate}
                className="flex items-center gap-2 text-[#5C4033] hover:text-[#9B9189] text-xs transition-colors"
              >
                <RotateCcw size={11} />
                Start a new board
              </button>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/5">
            <p className="text-[#3D3028] text-[10px] leading-relaxed">{board.disclaimer}</p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
