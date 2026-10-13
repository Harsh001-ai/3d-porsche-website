import React, { useState } from 'react';
import { ArrowUpRight, Crosshair, ShieldCheck, Zap } from 'lucide-react';

export default function SignatureShowcase() {
  const [activeAeroPoint, setActiveAeroPoint] = useState('wing');

  const aeroPoints = {
    wing: {
      id: 'wing',
      label: 'SWAN-NECK WING',
      title: 'Swan-Neck Carbon Wing with DRS',
      subtitle: 'REAR DOWNFORCE DYNAMICS',
      detail: 'Towering 1.5-meter wide two-stage carbon wing extending higher than the car roof. The hydraulic upper blade adjusts between low-drag speed mode and a vertical 34° airbrake within 0.3 seconds.',
      stat: '409 KG @ 200 KM/H',
      frame: '/frames/ezgif-frame-190.jpg',
      crop: 'center 45%',
      badge: 'DRS AIRBRAKE CAPABLE',
    },
    louvres: {
      id: 'louvres',
      label: 'FRONT LOUVRES',
      title: 'Front Wheel Arch Ventilation',
      subtitle: 'LATERAL PRESSURE EVACUATION',
      detail: 'Carbon slats above the front wheels reduce air pressure built up by rotating wheels, stabilizing front axle contact pressure and preventing vehicle lift under extreme cornering.',
      stat: '29 MM TRACK INCREASE',
      frame: '/frames/ezgif-frame-075.jpg',
      crop: 'center 50%',
      badge: 'CFRP PRESSURE RELIEF',
    },
    wheels: {
      id: 'wheels',
      label: 'PYRO RED ALLOYS',
      title: 'Forged Magnesium Center-Lock Alloys',
      subtitle: 'UNSPRUNG ROTATIONAL MASS',
      detail: 'Finished in iconic Pyro Red with single motorsport center-lock nut. 20-inch front and 21-inch rear wheels wrapped in Michelin Pilot Sport Cup 2 R track compounds.',
      stat: '-8 KG UNSPRUNG MASS',
      frame: '/frames/ezgif-frame-150.jpg',
      crop: 'center 55%',
      badge: 'MAGNESIUM WEISSACH',
    },
    nostrils: {
      id: 'nostrils',
      label: 'AERO STANCE & DIFFUSER',
      title: 'Underbody Extraction & Central Diffuser',
      subtitle: 'VENTURI GROUND EFFECT',
      detail: 'Engineered for uninterrupted high-speed downforce. Dual titanium exhaust outlets framed by an aggressive rear diffuser generating immense low-pressure suction under the vehicle floor.',
      stat: '860 KG @ 285 KM/H',
      frame: '/frames/ezgif-frame-220.jpg',
      crop: 'center 50%',
      badge: 'TITANIUM & VENTURI',
    },
  };

  const current = aeroPoints[activeAeroPoint];

  return (
    <section id="showcase" className="relative w-full bg-[#050505] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Sub-header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              02 — SIGNATURE SPECIFICATION
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#E8E6E1]">
              PORSCHE 911 <span className="text-red-500">GT3 RS</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-[#9A9FA8] max-w-sm">
            <span className="text-white font-medium block">TYPE 992 WEISSACH SPECIFICATION</span>
            <span>Art-directed aerodynamic architecture engineered for zero compromise on tarmac.</span>
          </div>
        </div>

        {/* Cinematic Main Vehicle Stage with Asymmetrical Technical Layout */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111318] shadow-2xl">
          {/* Angle Perspective Switcher Pill Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-[#090b0e]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="font-mono text-xs text-white uppercase tracking-wider">
                FEATURE FOCUS VECTOR:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.values(aeroPoints).map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setActiveAeroPoint(pt.id)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-[11px] uppercase tracking-wider transition-all border ${
                    activeAeroPoint === pt.id
                      ? 'bg-red-600 text-white font-bold border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                      : 'bg-black/40 text-[#9A9FA8] border-white/5 hover:text-white hover:border-white/20'
                  }`}
                >
                  {pt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Visual Image with Clean Dynamic Frame Angle */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-black">
            <img
              key={current.frame}
              src={current.frame}
              alt={current.title}
              className="w-full h-full object-cover filter brightness-95 contrast-105 transition-all duration-700 animate-fadeIn"
              style={{ objectPosition: current.crop }}
            />
            {/* Dramatic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111318] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111318]/70 via-transparent to-[#111318]/50 pointer-events-none" />

            {/* Feature Tag Floating Pill */}
            <div className="absolute top-6 left-6 pointer-events-none">
              <span className="font-mono text-[10px] tracking-widest uppercase bg-black/80 text-white px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                {current.badge}
              </span>
            </div>
          </div>

          {/* Editorial Inspection Bar Below Image */}
          <div className="p-8 md:p-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d0f14]">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-red-500 font-semibold">
                  {current.subtitle}
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
                <span className="font-space text-xs text-[#E8E6E1] uppercase tracking-wider">
                  ACTIVE AERODYNAMIC CALLOUT
                </span>
              </div>
              <h3 className="font-syncopate text-xl md:text-2xl font-bold uppercase text-white tracking-tight">
                {current.title}
              </h3>
              <p className="text-[#9A9FA8] font-light text-sm md:text-base leading-relaxed pt-1">
                {current.detail}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                VERIFIED BENCHMARK
              </span>
              <span className="font-syncopate text-2xl md:text-3xl font-black text-white text-gradient-red mt-1">
                {current.stat}
              </span>
              <span className="font-mono text-xs text-[#9A9FA8] mt-1">
                Official Weissach Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
