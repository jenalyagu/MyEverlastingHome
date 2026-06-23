export default function Footer() {
  return (
    <footer className="bg-[#1A1614] py-16 px-6 lg:px-10 border-t border-[#C4BDB5]/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <img src="/Logos/ehbg-logo.png" alt="EHBG" className="h-7 w-auto object-contain" />
              <span className="font-serif text-[#F7F3EE] text-lg tracking-wide">My Everlasting Home</span>
            </div>
            <p className="text-[#9B9189] text-sm leading-relaxed">
              An AI-powered SCIP estate designer for families building resilient, wellness-centered legacy homes.
            </p>
            <p className="text-[#5C4033] text-xs leading-relaxed mt-4">
              This platform provides pre-design concept guidance only. All construction documents must be prepared by licensed architects, engineers, and local building authorities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-4">Platform</div>
              <ul className="space-y-2.5 text-[#9B9189] text-sm">
                <li><button onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#C4BDB5] transition-colors">Design My Estate</button></li>
                <li><button onClick={() => document.getElementById('scip')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#C4BDB5] transition-colors">Why SCIP</button></li>
                <li><button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#C4BDB5] transition-colors">How It Works</button></li>
              </ul>
            </div>
            <div>
              <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-4">Estate</div>
              <ul className="space-y-2.5 text-[#9B9189] text-sm">
                <li>Room Planning</li>
                <li>Outdoor Zones</li>
                <li>Wellness Systems</li>
                <li>Garden & Water</li>
                <li>Builder Handoff</li>
              </ul>
            </div>
            <div>
              <div className="text-[#C9A84C] text-xs tracking-widest uppercase font-medium mb-4">Legal</div>
              <ul className="space-y-2.5 text-[#9B9189] text-sm">
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Disclaimer</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#C4BDB5]/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[#5C4033] text-xs">
            © {new Date().getFullYear()} My Everlasting Home. All rights reserved. Concept tool — not licensed architecture or engineering.
          </p>
          <p className="text-[#5C4033] text-xs">
            Built for families building legacy.
          </p>
        </div>
      </div>
    </footer>
  )
}
