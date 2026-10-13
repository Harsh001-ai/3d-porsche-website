import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#08090c] text-zinc-400 py-16 px-6 md:px-12 lg:px-20 border-t border-white/5 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/5">
          <div>
            <span className="font-syncopate text-xs tracking-[0.4em] text-white/70 block mb-1">
              DR. ING. H.C. F. PORSCHE AG
            </span>
            <span className="font-syncopate text-xl font-bold tracking-wider text-white">
              911 GT3 RS (TYPE 992)
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 self-end md:self-auto"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-red-500" />
          </button>
        </div>

        {/* Environmental WLTP Data Disclaimer */}
        <div className="bg-black/40 p-6 rounded-xl border border-white/5 space-y-2 text-[11px] leading-relaxed text-zinc-500">
          <div className="flex items-center gap-2 text-zinc-400 font-semibold uppercase">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            <span>OFFICIAL WLTP FUEL CONSUMPTION & EMISSIONS DISCLOSURE</span>
          </div>
          <p>
            Porsche 911 GT3 RS: Combined fuel consumption: 13.4 l/100 km (WLTP); Combined CO2 emissions: 305 g/km (WLTP); CO2 class: G. Values determined using the Worldwide Harmonized Light Vehicles Test Procedure (WLTP).
          </p>
          <p>
            Further information on official fuel consumption and official specific CO2 emissions of new passenger cars is available in the “Guidelines on fuel consumption, CO2 emissions and electricity consumption of new passenger cars”.
          </p>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 text-[11px] text-zinc-600">
          <div className="flex flex-wrap gap-6">
            <a href="#hero" className="hover:text-white transition-colors">Overview</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
            <a href="#engineering" className="hover:text-white transition-colors">Engineering</a>
            <a href="#gallery" className="hover:text-white transition-colors">Craftsmanship</a>
            <a href="#interactive-3d" className="hover:text-white transition-colors">360° Inspection</a>
            <a href="#philosophy" className="hover:text-white transition-colors">Philosophy</a>
            <a href="#cockpit" className="hover:text-white transition-colors">Cockpit</a>
            <a href="#telemetry" className="hover:text-white transition-colors">Telemetry</a>
            <a href="#cta" className="hover:text-white transition-colors">Allocation</a>
          </div>

          <div>
            © {new Date().getFullYear()} Porsche AG. Crafted for cinematic scrollytelling.
          </div>
        </div>
      </div>
    </footer>
  );
}
