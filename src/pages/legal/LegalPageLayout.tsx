import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Footer from '../../components/Footer'

interface Props {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalPageLayout({ title, lastUpdated, children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFAF6]">
      <div className="border-b border-[#E8E0D5]">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/Logos/ehbg-logo.png" alt="My Everlasting Home" className="h-9 md:h-11 w-auto object-contain" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-[#5C4033] hover:text-[#1A1614] font-medium transition-colors"
          >
            <ArrowLeft size={15} />
            Back to Home
          </Link>
        </div>
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto px-6 lg:px-10 py-16 md:py-20">
        <div className="mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-[#1A1614] mb-2">{title}</h1>
          <p className="text-[#9B9189] text-sm">Last updated {lastUpdated}</p>
        </div>

        <div className="space-y-8 text-[#3D2B1F] text-[15px] leading-relaxed [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-[#1A1614] [&_h2]:mb-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-[#C9A84C] [&_a]:hover:underline">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
