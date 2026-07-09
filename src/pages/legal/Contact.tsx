import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import LegalPageLayout from './LegalPageLayout'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('https://formspree.io/f/mnjkeabb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Website Contact — ${name}`,
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as { errors?: Array<{ message: string }> }
        throw new Error(err.errors?.map(e => e.message).join(', ') || 'Submission failed')
      }

      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  return (
    <LegalPageLayout title="Contact" lastUpdated="July 9, 2026">
      <p>
        Have a question about your estate blueprint, a partnership inquiry, or something else? Send us a
        message and the EHBG team will get back to you, or email us directly at{' '}
        <a href="mailto:info@everlastinghomesgroup.com">info@everlastinghomesgroup.com</a>.
      </p>

      {status === 'success' ? (
        <div className="flex flex-col items-center text-center gap-3 py-10 border border-[#E8E0D5] rounded-sm bg-white">
          <CheckCircle size={32} className="text-[#C9A84C]" />
          <p className="font-serif text-xl text-[#1A1614]">Message sent</p>
          <p className="text-[#6B5D52] text-sm max-w-sm">
            Thanks for reaching out — we'll get back to you within 24–48 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 not-prose">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Full Name *</label>
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jane Smith"
                className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
            <div>
              <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Email *</label>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@family.com"
                className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[#9B9189] text-[10px] tracking-widest uppercase block mb-1.5">Message *</label>
            <textarea
              required
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={5}
              className="w-full border border-[#E0D8CE] bg-white px-3 py-2.5 text-sm text-[#1A1614] placeholder-[#C4BDB5] rounded-sm focus:outline-none focus:border-[#C9A84C] transition-colors resize-none"
            />
          </div>

          {status === 'error' && <p className="text-red-600 text-xs">{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="flex items-center gap-2 bg-[#1A1614] text-[#F7F3EE] px-6 py-2.5 text-sm font-medium tracking-wide hover:bg-[#2C2420] disabled:opacity-50 transition-all rounded-sm"
          >
            <Send size={13} className={status === 'sending' ? 'animate-pulse' : ''} />
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      )}
    </LegalPageLayout>
  )
}
