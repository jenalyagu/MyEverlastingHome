import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { type EstateFormData } from '../lib/blueprintGenerator'

const LIFESTYLE_OPTIONS = [
  'Slow living', 'Entertaining', 'Wellness', 'Food & gardening',
  'Homeschooling', 'Luxury', 'Privacy', 'Cars & motorcycles',
  'Creative / Maker', 'Resilience & Preparedness',
]

const AESTHETIC_OPTIONS = [
  // Western / European
  'Modern Organic',
  'Traditional / Classic',
  'Mediterranean / Spanish',
  'Greek / Aegean',
  'French Countryside',
  'Farmhouse / Agrarian',
  'Texas Hill Country',
  'American / Patriot',
  // Contemporary
  'Minimalist / Contemporary',
  'Stealth Wealth',
  'Dynasty / Legacy Builder',
  'Music & Entertainment',
  // Automotive / Adventure
  'Car Vault / Collector',
  'Executive Motor Court',
  'Backyard Track House',
  'Little Drivers\' House',
  'Weekend Cars & Coffee',
  'Overland / Adventure Homestead',
  // Nature / Climate
  'Alpine / Mountain',
  'Scandinavian / Nordic',
  'Tropical Modern',
  'Wabi-Sabi / Japanese',
  // Global / Cultural
  'Moroccan / Riad',
  'Vastu / Indian',
  'Maharaja / South Asian',
  'Feng Shui / Chinese',
  'Filipino / Bahay Legacy',
  'Multigenerational / Banyan',
  // Unique
  'Celestial / Cosmic',
]

const BUDGET_OPTIONS = [
  'Under $1.5M', '$1.5M–$2.5M', '$2.5M–$4M', '$4M–$7M', '$7M–$12M', '$12M+',
]

const stepLabels = ['Family & Lifestyle', 'Style & Setting', 'Home Details']

const emptyForm: EstateFormData = {
  familySize: '',
  children: '',
  multigenerational: false,
  lifestylePriorities: [],
  landSize: '',
  climate: '',
  terrain: '',
  views: '',
  privacyNeeds: '',
  bedrooms: '',
  bathrooms: '',
  squareFootage: '',
  garageSpaces: '',
  guestSuite: false,
  officStudio: false,
  homeschoolRoom: false,
  wellnessSuite: false,
  chefKitchen: false,
  pantry: false,
  laundryMudroom: false,
  poolSpa: false,
  reflectingPond: false,
  outdoorKitchen: false,
  fireLounge: false,
  orchard: false,
  raisedBeds: false,
  greenhouse: false,
  sportCourt: false,
  playLawn: false,
  aestheticStyle: '',
  budgetRange: '',
  buildTimeline: '',
  scipInterest: '',
}

function ToggleChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
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
      {selected && <Check size={12} className="inline mr-1.5" />}
      {label}
    </button>
  )
}

function OptionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-3.5 rounded-sm text-sm font-medium transition-all border text-left w-full ${
        selected
          ? 'bg-[#1A1614] border-[#1A1614] text-[#F7F3EE]'
          : 'bg-white border-[#E8E0D5] text-[#3D2B1F] hover:border-[#C9A84C]/60'
      }`}
    >
      {selected && <Check size={12} className="inline mr-2 flex-shrink-0" />}
      {label}
    </button>
  )
}

function Toggle({ label, checked, onChange, description }: { label: string; checked: boolean; onChange: (v: boolean) => void; description?: string }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between p-4 rounded-sm border transition-all text-left ${
        checked ? 'bg-[#F7F3EE] border-[#C9A84C]/60' : 'bg-white border-[#E8E0D5] hover:border-[#C9A84C]/30'
      }`}
    >
      <div>
        <div className="font-medium text-sm text-[#1A1614]">{label}</div>
        {description && <div className="text-xs text-[#9B9189] mt-0.5">{description}</div>}
      </div>
      <div className={`w-10 h-5.5 rounded-full flex items-center transition-all flex-shrink-0 ml-4 ${checked ? 'bg-[#1A1614]' : 'bg-[#E8E0D5]'}`}
        style={{ padding: '2px' }}>
        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-[#9B9189] tracking-widest uppercase">{label}</label>
      {children}
    </div>
  )
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-[#E8E0D5] text-[#3D2B1F] px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

interface EstateFormProps {
  onComplete: (data: EstateFormData) => void
  initialData?: Partial<EstateFormData>
}

export default function EstateForm({ onComplete, initialData }: EstateFormProps) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<EstateFormData>({ ...emptyForm, ...initialData })
  const [dir, setDir] = useState(1)

  const update = <K extends keyof EstateFormData>(key: K, val: EstateFormData[K]) =>
    setData((prev) => ({ ...prev, [key]: val }))

  const toggleList = (key: 'lifestylePriorities', val: string) => {
    setData((prev) => {
      const list = prev[key] as string[]
      return { ...prev, [key]: list.includes(val) ? list.filter((x) => x !== val) : [...list, val] }
    })
  }

  const next = () => { setDir(1); setStep((s) => Math.min(s + 1, 2)) }
  const prev = () => { setDir(-1); setStep((s) => Math.max(s - 1, 0)) }

  const steps = [
    // Step 1 — Family & Lifestyle
    <div key="step1" className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1614] mb-1">Family & Lifestyle</h3>
        <p className="text-[#9B9189] text-sm">Help us understand how you'll live in this home.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Family Size">
          <Select value={data.familySize} onChange={(v) => update('familySize', v)} options={['2 people', '3–4 people', '5–6 people', '7+ people']} placeholder="Select..." />
        </Field>
        <Field label="Children">
          <Select value={data.children} onChange={(v) => update('children', v)} options={['No children', '1 child', '2 children', '3 children', '4+ children']} placeholder="Select..." />
        </Field>
      </div>

      <Field label="Multigenerational needs">
        <Toggle
          label="Include space for parents or in-laws"
          description="Adds multigenerational suite or casita to program"
          checked={data.multigenerational}
          onChange={(v) => update('multigenerational', v)}
        />
      </Field>

      <Field label="Lifestyle priorities (select all that apply)">
        <div className="flex flex-wrap gap-2">
          {LIFESTYLE_OPTIONS.map((opt) => (
            <ToggleChip key={opt} label={opt} selected={data.lifestylePriorities.includes(opt)} onClick={() => toggleList('lifestylePriorities', opt)} />
          ))}
        </div>
      </Field>
    </div>,

    // Step 2 — Style & Setting
    <div key="step2" className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1614] mb-1">Style & Setting</h3>
        <p className="text-[#9B9189] text-sm">Choose your aesthetic and where this estate will be built.</p>
      </div>

      <Field label="Aesthetic style">
        <div className="grid sm:grid-cols-2 gap-2">
          {AESTHETIC_OPTIONS.map((opt) => (
            <OptionCard key={opt} label={opt} selected={data.aestheticStyle === opt} onClick={() => update('aestheticStyle', opt)} />
          ))}
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Climate Zone">
          <Select value={data.climate} onChange={(v) => update('climate', v)} options={['Hot & humid', 'Hot & dry / Desert', 'Mixed / Four seasons', 'Mild / Coastal', 'Cold / Northern']} placeholder="Select..." />
        </Field>
        <Field label="Land Size">
          <Select value={data.landSize} onChange={(v) => update('landSize', v)} options={['Under 1 acre', '1–2 acres', '2–5 acres', '5–10 acres', '10–20 acres', '20+ acres']} placeholder="Select..." />
        </Field>
      </div>
    </div>,

    // Step 3 — Home Details
    <div key="step3" className="space-y-8">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1614] mb-1">Home Details</h3>
        <p className="text-[#9B9189] text-sm">Size, budget, and the spaces that matter most.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Field label="Bedrooms">
          <Select value={data.bedrooms} onChange={(v) => update('bedrooms', v)} options={['3', '4', '5', '6', '7+']} placeholder="#" />
        </Field>
        <Field label="Bathrooms">
          <Select value={data.bathrooms} onChange={(v) => update('bathrooms', v)} options={['3', '4', '5', '6', '7+']} placeholder="#" />
        </Field>
        <Field label="Square Footage">
          <Select value={data.squareFootage} onChange={(v) => update('squareFootage', v)} options={['3,000–4,500 sf', '4,500–6,000 sf', '6,000–8,000 sf', '8,000–12,000 sf', '12,000+ sf']} placeholder="Range" />
        </Field>
        <Field label="Garage Spaces">
          <Select value={data.garageSpaces} onChange={(v) => update('garageSpaces', v)} options={['1–2', '3', '4', '5–6', '7+']} placeholder="#" />
        </Field>
      </div>

      <Field label="Total budget range">
        <div className="grid sm:grid-cols-3 gap-2">
          {BUDGET_OPTIONS.map((opt) => (
            <OptionCard key={opt} label={opt} selected={data.budgetRange === opt} onClick={() => update('budgetRange', opt)} />
          ))}
        </div>
      </Field>

      <Field label="Must-have spaces (select all that apply)">
        <div className="grid sm:grid-cols-2 gap-3">
          <Toggle label="Pool & Spa" checked={data.poolSpa} onChange={(v) => update('poolSpa', v)} />
          <Toggle label="Wellness Suite" description="Gym, sauna, cold plunge" checked={data.wellnessSuite} onChange={(v) => update('wellnessSuite', v)} />
          <Toggle label="Chef's Kitchen + Scullery" checked={data.chefKitchen} onChange={(v) => update('chefKitchen', v)} />
          <Toggle label="Homeschool Room" checked={data.homeschoolRoom} onChange={(v) => update('homeschoolRoom', v)} />
          <Toggle label="Guest Suite / Casita" checked={data.guestSuite} onChange={(v) => update('guestSuite', v)} />
          <Toggle label="Office / Studio" checked={data.officStudio} onChange={(v) => update('officStudio', v)} />
          <Toggle label="Outdoor Kitchen" checked={data.outdoorKitchen} onChange={(v) => update('outdoorKitchen', v)} />
          <Toggle label="Orchard / Kitchen Garden" checked={data.orchard} onChange={(v) => update('orchard', v)} />
        </div>
      </Field>
    </div>,
  ]

  return (
    <section id="intake" className="bg-[#F7F3EE] py-16 lg:py-24 px-4 lg:px-10 border-t border-[#E8E0D5]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-medium tracking-[0.2em] uppercase">Estate Intake</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#1A1614] leading-tight">
            Design your estate.
          </h2>
          <p className="mt-3 text-[#9B9189] max-w-lg">
            Answer a few questions about your family, lifestyle, and vision. We'll match you with your perfect estate collection.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {stepLabels.map((label, i) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1 cursor-pointer ${i <= step ? 'opacity-100' : 'opacity-40'}`}
                onClick={() => i < step && setStep(i)}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  i < step ? 'bg-[#1A1614] text-[#F7F3EE]' : i === step ? 'bg-[#C9A84C] text-[#1A1614]' : 'bg-[#E8E0D5] text-[#9B9189]'
                }`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </div>
                <span className="text-[0.6rem] font-medium tracking-wide uppercase text-[#9B9189] hidden sm:block text-center max-w-20 leading-tight">{label}</span>
              </div>
            ))}
          </div>
          <div className="h-1 bg-[#E8E0D5] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#C9A84C] rounded-full"
              animate={{ width: `${((step + 1) / 3) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#E8E0D5] rounded-sm p-5 md:p-10">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={step}
                custom={dir}
                initial={{ x: dir > 0 ? 40 : -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: dir > 0 ? -40 : 40, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {steps[step]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E8E0D5]">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-2 text-sm font-medium text-[#9B9189] hover:text-[#1A1614] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
              Previous
            </button>

            {step < 2 ? (
              <button
                type="button"
                onClick={next}
                className="flex items-center gap-2 bg-[#1A1614] text-[#F7F3EE] px-7 py-3 rounded-sm text-sm font-medium hover:bg-[#3D2B1F] transition-colors"
              >
                Continue
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onComplete(data)}
                className="flex items-center gap-2 bg-[#C9A84C] text-[#1A1614] px-8 py-3 rounded-sm text-sm font-medium hover:bg-[#DFC078] transition-colors"
              >
                Generate My Blueprint
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
