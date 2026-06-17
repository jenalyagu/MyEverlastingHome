import { useRef, useState } from 'react'
import { Download, Loader2 } from 'lucide-react'
import { type EstateBlueprintData, type FloorZone, type ImageTile, type ScipBenefit } from '../lib/generateEstateBlueprint'
import '../styles/estateBlueprint.css'

interface EstateBlueprintBoardProps {
  data: EstateBlueprintData
  devMode?: boolean
}

const ZONE_COLORS: Record<FloorZone['category'], string> = {
  living: '#EDE7DC',
  kitchen: '#E8D9C8',
  suite: '#E4DCF0',
  work: '#D8E8E0',
  wellness: '#D4E4F0',
  utility: '#E0DDD8',
  outdoor: '#D8EAD4',
  guest: '#EAE0D4',
}

const ZONE_BORDER: Record<FloorZone['category'], string> = {
  living: '#C8BAA8',
  kitchen: '#C8A88C',
  suite: '#B8A8CC',
  work: '#90B8A0',
  wellness: '#90B4CC',
  utility: '#B0ACA8',
  outdoor: '#90B890',
  guest: '#C0A890',
}

function FloorPlanPanel({ title, subtitle, zones, imageUrl, devMode, prompt }: {
  title: string
  subtitle: string
  zones: FloorZone[]
  imageUrl?: string
  devMode?: boolean
  prompt?: string
}) {
  return (
    <div className="eb-plan-panel">
      <div className="eb-plan-header">
        <div className="eb-plan-label">{title}</div>
        <div className="eb-plan-sublabel">{subtitle}</div>
      </div>

      {imageUrl ? (
        <img src={imageUrl} alt={`${subtitle} floor plan`} className="eb-plan-image" />
      ) : (
        <div className="eb-plan-grid">
          {devMode && prompt ? (
            <div className="eb-plan-prompt-placeholder">
              <p className="eb-tile-prompt">{prompt}</p>
            </div>
          ) : (
            zones.map((zone) => (
              <div
                key={zone.id}
                className={`eb-zone eb-zone--${zone.size ?? 'md'}`}
                style={{
                  background: ZONE_COLORS[zone.category],
                  borderColor: ZONE_BORDER[zone.category],
                }}
              >
                <span className="eb-zone-name">{zone.name}</span>
              </div>
            ))
          )}
        </div>
      )}

      <div className="eb-plan-disclaimer">Conceptual estate zoning only</div>
    </div>
  )
}

function ImageTileCard({ tile, devMode }: { tile: ImageTile; devMode?: boolean }) {
  return (
    <div className="eb-tile">
      {tile.imageUrl ? (
        <img src={tile.imageUrl} alt={tile.title} className="eb-tile-img" />
      ) : (
        <div className="eb-tile-placeholder">
          {devMode && (
            <p className="eb-tile-prompt">{tile.prompt}</p>
          )}
          {!devMode && (
            <div className="eb-tile-placeholder-inner">
              <div className="eb-tile-placeholder-icon">⬜</div>
            </div>
          )}
        </div>
      )}
      <div className="eb-tile-label">{tile.label}</div>
    </div>
  )
}

function ScipBenefitCard({ benefit }: { benefit: ScipBenefit }) {
  return (
    <div className="eb-benefit">
      <div className="eb-benefit-icon">{benefit.icon}</div>
      <div className="eb-benefit-title">{benefit.title}</div>
      <div className="eb-benefit-desc">{benefit.description}</div>
    </div>
  )
}

async function exportBoardAsPng(el: HTMLElement, fileName: string) {
  const html2canvas = (await import('html2canvas')).default
  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#F7F3EE',
    logging: false,
  })
  const link = document.createElement('a')
  link.download = fileName
  link.href = canvas.toDataURL('image/png')
  link.click()
}

export default function EstateBlueprintBoard({ data, devMode = false }: EstateBlueprintBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    if (!boardRef.current) return
    setExporting(true)
    try {
      await exportBoardAsPng(boardRef.current, `${data.estateName.replace(/\s+/g, '-')}-concept-board.png`)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div>
    {/* Export toolbar */}
    <div className="eb-export-bar">
      <span className="eb-export-label">Concept Board</span>
      <button
        onClick={handleExport}
        disabled={exporting}
        className="eb-export-btn"
      >
        {exporting
          ? <><Loader2 size={12} className="eb-spin" /> Exporting…</>
          : <><Download size={12} /> Download PNG</>
        }
      </button>
    </div>

    <div className="eb-board" ref={boardRef}>

      {/* ── 1. HERO ── */}
      <section className="eb-hero">
        <div className="eb-hero-image-wrap">
          {data.heroImageUrl ? (
            <img src={data.heroImageUrl} alt={data.estateName} className="eb-hero-image" />
          ) : (
            <div className="eb-hero-image-placeholder">
              {devMode && (
                <p className="eb-hero-prompt">{data.heroImagePrompt}</p>
              )}
            </div>
          )}
          <div className="eb-hero-overlay" />
        </div>
        <div className="eb-hero-content">
          <div className="eb-hero-rule" />
          <h1 className="eb-hero-name">{data.estateName.toUpperCase()}</h1>
          <div className="eb-hero-divider" />
          <p className="eb-hero-subtitle">{data.estateSubtitle.toUpperCase()}</p>
          <p className="eb-hero-narrative">{data.estateNarrative}</p>
          <p className="eb-hero-note">"{data.editorialNote}"</p>
        </div>
      </section>

      {/* ── 2. FLOOR PLANS ── */}
      <section className="eb-section eb-plans-section">
        <div className="eb-section-header">
          <div className="eb-section-rule" />
          <span className="eb-section-label">Estate Floor Plan — Conceptual Vision</span>
          <div className="eb-section-rule" />
        </div>
        <div className="eb-plans-row">
          <FloorPlanPanel title="Panel A" subtitle="Main Floor"
            zones={data.mainFloorZones} imageUrl={data.mainFloorImageUrl}
            devMode={devMode} prompt={data.mainFloorImagePrompt} />
          <FloorPlanPanel title="Panel B" subtitle="Upper Floor"
            zones={data.upperFloorZones} imageUrl={data.upperFloorImageUrl}
            devMode={devMode} prompt={data.upperFloorImagePrompt} />
          <FloorPlanPanel title="Panel C" subtitle="Wellness Level"
            zones={data.wellnessLevelZones} imageUrl={data.wellnessLevelImageUrl}
            devMode={devMode} prompt={data.wellnessLevelImagePrompt} />
          <FloorPlanPanel title="Panel D" subtitle="Estate Site Plan"
            zones={data.sitePlanZones} imageUrl={data.sitePlanImageUrl}
            devMode={devMode} prompt={data.sitePlanImagePrompt} />
        </div>
      </section>

      {/* ── 3. INTERIOR LIFESTYLE STRIP ── */}
      <section className="eb-section eb-strip-section">
        <div className="eb-section-header">
          <div className="eb-section-rule" />
          <span className="eb-section-label">Life Lived Beautifully</span>
          <div className="eb-section-rule" />
        </div>
        <div className="eb-tiles-row">
          {data.interiorLifestyleTiles.map((tile) => (
            <ImageTileCard key={tile.id} tile={tile} devMode={devMode} />
          ))}
        </div>
      </section>

      {/* ── 4. ESTATE LIFESTYLE STRIP ── */}
      <section className="eb-section eb-strip-section eb-strip-section--alt">
        <div className="eb-section-header">
          <div className="eb-section-rule" />
          <span className="eb-section-label">The Estate Lifestyle</span>
          <div className="eb-section-rule" />
        </div>
        <div className="eb-tiles-row">
          {data.estateLifestyleTiles.map((tile) => (
            <ImageTileCard key={tile.id} tile={tile} devMode={devMode} />
          ))}
        </div>
      </section>

      {/* ── 5. SCIP ADVANTAGE ── */}
      <section className="eb-section eb-scip-section">
        <div className="eb-section-header">
          <div className="eb-section-rule eb-section-rule--gold" />
          <span className="eb-section-label eb-section-label--dark">Built Better. Built to Last.</span>
          <div className="eb-section-rule eb-section-rule--gold" />
        </div>
        <p className="eb-scip-intro">
          This estate is built with Structural Concrete Insulated Panel technology — an advanced building system that delivers
          exceptional performance, comfort, and peace of mind for generations to come.
        </p>
        <div className="eb-benefits-row">
          {data.scipBenefits.map((b) => (
            <ScipBenefitCard key={b.id} benefit={b} />
          ))}
        </div>
        <div className="eb-scip-badge">
          <div className="eb-scip-badge-name">SCIP</div>
          <div className="eb-scip-badge-lines">
            <span>Stronger.</span>
            <span>Smarter.</span>
            <span>Quieter.</span>
            <span>Built for generations.</span>
          </div>
        </div>
      </section>

      {/* ── 6. FOOTER ── */}
      <footer className="eb-footer">
        <div className="eb-footer-monogram">{data.footerMonogram}</div>
        <div className="eb-footer-name">{data.estateName}</div>
        <div className="eb-footer-tagline">{data.footerTagline}</div>
        <div className="eb-footer-rule" />
        <div className="eb-footer-sub">Built for now. Designed for generations.</div>
        <div className="eb-disclaimer">Conceptual vision board only. Not construction documents.</div>
      </footer>

    </div>
    </div>
  )
}
