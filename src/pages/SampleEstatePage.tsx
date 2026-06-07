import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { mockResidenceData } from '../data/mockResidence'

interface SampleEstatePageProps {
  onBack: () => void
}

export default function SampleEstatePage({ onBack }: SampleEstatePageProps) {
  const d = mockResidenceData
  const categories = [...new Set(d.rooms.map((r) => r.category))]

  return (
    <div className="min-h-screen bg-[#FDFAF6]">
      {/* Hero */}
      <div className="bg-[#1A1614] min-h-[60vh] flex flex-col justify-end px-6 lg:px-10 py-16 relative overflow-hidden">
        <img src="/estate-motor-court.png" alt="Estate motor court" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1614] via-[#1A1614]/70 to-[#1A1614]/30" />

        <div className="relative max-w-7xl mx-auto w-full">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#9B9189] hover:text-[#C4BDB5] text-sm mb-12 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Sample Blueprint</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl md:text-7xl text-[#F7F3EE] leading-tight mb-4"
          >
            {d.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#C4BDB5] text-lg font-light italic mb-8 max-w-2xl"
          >
            {d.tagline}
          </motion.p>

          <div className="flex flex-wrap gap-3 mb-2">
            <span className="text-[#9B9189] text-sm">{d.location}</span>
            <span className="text-[#5C4033]">·</span>
            <span className="text-[#9B9189] text-sm">{d.style}</span>
            <span className="text-[#5C4033]">·</span>
            <span className="text-[#9B9189] text-sm">{d.status}</span>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-4">
            {d.stats.map((s) => (
              <div key={s.label} className="bg-[#2C2420]/70 border border-[#C4BDB5]/10 px-5 py-3 rounded-sm">
                <div className="font-serif text-2xl text-[#C9A84C]">{s.value}</div>
                <div className="text-[#9B9189] text-xs tracking-widest uppercase mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#F7F3EE] border-b border-[#E8E0D5] px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#9B9189] text-xs">
            <strong className="text-[#5C4033]">Concept only.</strong> This is a sample estate blueprint for demonstration. Not licensed architecture or engineering. All construction requires licensed professionals and local permits.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-16">

        {/* Rooms by category */}
        {categories.map((cat) => (
          <div key={cat}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-6 bg-[#C9A84C]" />
              <h2 className="font-serif text-2xl text-[#1A1614]">{cat}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {d.rooms.filter((r) => r.category === cat).map((room) => (
                <motion.div
                  key={room.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-[#E8E0D5] bg-white hover:border-[#C9A84C]/40 rounded-sm transition-colors overflow-hidden"
                >
                  {room.photo && (
                    <div className="h-48 overflow-hidden">
                      <img src={room.photo} alt={room.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className={room.photo ? 'p-5' : 'p-5'}>
                    <div className="font-serif text-lg text-[#1A1614] mb-2">{room.name}</div>
                    <div className="text-[#9B9189] text-sm leading-relaxed">{room.notes}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Outdoor Zones */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-6 bg-[#C9A84C]" />
            <h2 className="font-serif text-2xl text-[#1A1614]">Outdoor Estate Zones</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {d.outdoorZones.map((zone) => (
              <motion.div
                key={zone.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-5 bg-[#F7F3EE] border border-[#E8E0D5] rounded-sm"
              >
                <div className="font-medium text-sm text-[#1A1614] mb-1.5">{zone.name}</div>
                <div className="text-[#9B9189] text-xs leading-relaxed">{zone.notes}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SCIP Notes */}
        <div className="bg-[#1A1614] rounded-sm p-8 md:p-12">
          <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-6">SCIP Construction Notes</div>
          <div className="grid md:grid-cols-2 gap-6">
            {d.sciPNotes.map((note, i) => (
              <div key={i} className="flex gap-4">
                <span className="font-serif text-[#C9A84C] text-lg flex-shrink-0">{i + 1}.</span>
                <p className="text-[#C4BDB5] text-sm leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Build Timeline */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-6 bg-[#C9A84C]" />
            <h2 className="font-serif text-2xl text-[#1A1614]">Build Timeline</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-0">
            {d.buildPhasing.map((p, i) => (
              <div key={p.phase} className={`flex-1 p-6 border border-[#E8E0D5] ${i > 0 ? 'border-l-0 md:border-l-0' : ''} bg-white`}>
                <div className="text-[#C9A84C] text-xs font-medium tracking-widest uppercase mb-1">{p.phase}</div>
                <div className="text-[#9B9189] text-xs mb-3">{p.period}</div>
                <div className="font-serif text-[#1A1614] text-base">{p.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Palette */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-6 bg-[#C9A84C]" />
            <h2 className="font-serif text-2xl text-[#1A1614]">Aesthetic Palette</h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {d.aestheticPalette.map((p) => (
              <div key={p.name} className="flex items-center gap-3 p-3 border border-[#E8E0D5] bg-white rounded-sm">
                <div className="w-8 h-8 rounded-sm border border-[#E8E0D5]" style={{ backgroundColor: p.color }} />
                <span className="text-sm text-[#5C4033]">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
