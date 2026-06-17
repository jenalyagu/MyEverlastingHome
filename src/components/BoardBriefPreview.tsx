import { useState } from 'react'
import { X, Download, ChevronDown, ChevronRight } from 'lucide-react'
import type { BoardBrief } from '../lib/buildBoardBrief'

interface Props {
  brief: BoardBrief
  markdown: string
  onClose: () => void
  onApprove: () => void
}

function Section({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#2C2420] last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#2C2420]/40 transition-colors"
      >
        <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">{title}</span>
        {open ? <ChevronDown size={14} className="text-[#9B9189]" /> : <ChevronRight size={14} className="text-[#9B9189]" />}
      </button>
      {open && <div className="px-6 pb-5">{children}</div>}
    </div>
  )
}

function Prompt({ label, text }: { label: string; text: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="text-[#9B9189] text-[10px] tracking-widest uppercase font-medium mb-1.5">{label}</div>
      <pre className="text-[#C4BDB5] text-[11px] leading-relaxed whitespace-pre-wrap font-mono bg-[#1A1614] border border-[#2C2420] rounded-sm p-3">{text}</pre>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 py-2 border-b border-[#2C2420] last:border-0">
      <span className="text-[#9B9189] text-xs w-32 flex-shrink-0">{label}</span>
      <span className="text-[#F7F3EE] text-xs">{value}</span>
    </div>
  )
}

export default function BoardBriefPreview({ brief, markdown, onClose, onApprove }: Props) {
  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${brief.estateName.replace(/\s+/g, '-').toLowerCase()}-board-brief.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#1A1614] border border-[#2C2420] w-full max-w-3xl max-h-[90vh] flex flex-col rounded-sm overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2C2420] flex-shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-0.5">
              <div className="h-px w-6 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] uppercase font-medium">Board Brief</span>
            </div>
            <h2 className="font-serif text-xl text-[#F7F3EE] tracking-wide">{brief.estateName}</h2>
          </div>
          <button onClick={onClose} className="text-[#9B9189] hover:text-[#F7F3EE] transition-colors p-1">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">

          {/* Identity */}
          <Section title="Identity &amp; Copy" defaultOpen>
            <Field label="Estate Name" value={brief.estateName} />
            <Field label="Monogram" value={brief.footerMonogram} />
            <Field label="Subtitle" value={brief.estateSubtitle} />
            <Field label="Editorial Note" value={brief.editorialNote} />
            <Field label="Footer Tagline" value={brief.footerTagline} />
            <div className="mt-3">
              <div className="text-[#9B9189] text-[10px] tracking-widest uppercase font-medium mb-1.5">Narrative</div>
              <p className="text-[#C4BDB5] text-xs leading-relaxed italic">{brief.estateNarrative}</p>
            </div>
          </Section>

          {/* Hero */}
          <Section title="Section 2 — Hero Exterior">
            <Prompt label="Hero Image Prompt · high quality · 1536×1024" text={brief.heroImagePrompt} />
          </Section>

          {/* Floor Plans */}
          <Section title="Section 3 — Floor Plans">
            <Prompt label={`Main Floor — ${brief.mainFloorZones.join(', ')}`} text={brief.mainFloorImagePrompt} />
            <Prompt label={`Upper Floor — ${brief.upperFloorZones.join(', ')}`} text={brief.upperFloorImagePrompt} />
            <Prompt label={`Wellness Level — ${brief.wellnessLevelZones.join(', ')}`} text={brief.wellnessLevelImagePrompt} />
            <Prompt label={`Site Plan — ${brief.sitePlanZones.join(', ')}`} text={brief.sitePlanImagePrompt} />
          </Section>

          {/* Interior Tiles */}
          <Section title="Section 4 — Interior Tiles (8)">
            {brief.interiorTiles.map((t, i) => (
              <Prompt key={i} label={`Tile ${i + 1} — ${t.label}`} text={t.prompt} />
            ))}
          </Section>

          {/* Lifestyle Tiles */}
          <Section title="Section 5 — Estate Lifestyle Tiles (10)">
            {brief.lifestyleTiles.map((t, i) => (
              <Prompt key={i} label={`Tile ${i + 1} — ${t.label}`} text={t.prompt} />
            ))}
          </Section>

          {/* SCIP */}
          <Section title="Section 6 — SCIP Benefits (6)">
            <div className="space-y-3">
              {brief.scipBenefits.map((b, i) => (
                <div key={i} className="text-xs">
                  <span className="text-[#C9A84C] font-medium">{b.title}</span>
                  <span className="text-[#9B9189]"> — {b.description}</span>
                </div>
              ))}
            </div>
          </Section>

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#2C2420] flex-shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 text-[#9B9189] hover:text-[#C4BDB5] text-xs transition-colors"
          >
            <Download size={13} />
            Download as .md
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 border border-[#2C2420] text-[#9B9189] text-xs hover:border-[#C4BDB5]/40 hover:text-[#C4BDB5] transition-colors rounded-sm"
            >
              Edit Form
            </button>
            <button
              onClick={onApprove}
              className="px-6 py-2 bg-[#C9A84C] text-[#1A1614] text-xs font-medium tracking-wide hover:bg-[#DFC078] transition-colors rounded-sm"
            >
              Generate Board
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
