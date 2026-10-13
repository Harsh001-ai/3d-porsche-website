import React, { useState } from 'react';
import { ArrowUpRight, Crosshair, ShieldCheck, Zap } from 'lucide-react';

export default function SignatureShowcase() {
  const [activeAeroPoint, setActiveAeroPoint] = useState('wing');

  const aeroPoints = {
    wing: {
      title: 'Swan-Neck Carbon Wing with DRS',
      subtitle: 'REAR DOWNFORCE DYNAMICS',
      detail: 'Towering 1.5-meter wide two-stage carbon wing extending higher than the car roof. The hydraulic upper blade adjusts between low-drag speed mode and a vertical 34° airbrake within 0.3 seconds.',
      stat: '409 KG @ 200 KM/H',
    },
    louvres: {
      title: 'Front Wheel Arch Ventilation',
      subtitle: 'LATERAL PRESSURE EVACUATION',
      detail: 'Carbon slats above the front wheels reduce air pressure built up by rotating wheels, stabilizing front axle contact pressure and preventing vehicle lift under extreme cornering.',
      stat: '29 MM TRACK INCREASE',
    },
    nostrils: {
      title: 'Active Bonnet Airflow Channels',
      subtitle: 'CENTRAL RADIATOR EXHAUST',
      detail: 'Hot air exiting the nose radiator is ducted through two massive nostrils on the carbon front lid, guided over the roof by black roof fins so warm air never enters the rear engine intake.',
      stat: '-15 KG CHASSIS WEIGHT',
    },
    wheels: {
      title: 'Forged Magnesium Center-Lock Alloys',
      subtitle: 'UNSPRUNG ROTATIONAL MASS',
      detail: 'Finished in iconic Pyro Red with single motorsport center-lock nut. 20-inch front and 21-inch rear wheels wrapped in Michelin Pilot Sport Cup 2 R track compounds.',
      stat: '-8 KG UNSPRUNG MASS',
    },
  };

  const current = aeroPoints[activeAeroPoint];

  return (
    <section id="showcase" className="relative w-full bg-[#08090c] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Sub-header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              02 — SIGNATURE SPECIFICATION
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              PORSCHE 911 <span className="text-red-500">GT3 RS</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-sm">
            <span className="text-white font-medium block">TYPE 992 WEISSACH PACKAGE</span>
            <span>Art-directed aerodynamic composition engineered for zero compromise on tarmac.</span>
          </div>
        </div>

        {/* Cinematic Main Vehicle Stage with Asymmetrical Technical Layout */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0f14] shadow-2xl">
          {/* Main Visual Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <img
              src="/frames/ezgif-frame-001.jpg"
              alt="Porsche 911 GT3 RS Profile Specification"
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Dramatic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#08090c]/80 via-transparent to-[#08090c]/60 pointer-events-none" />

            {/* Interactive Feature Hotspot Pins on the Car */}
            <button
              onClick={() => setActiveAeroPoint('wing')}
              className={`absolute top-[28%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group transition-all z-20 ${
                activeAeroPoint === 'wing' ? 'scale-110' : 'hover:scale-105'
              }`}
              title="Inspect Swan-Neck DRS Wing"
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  activeAeroPoint === 'wing' ? 'bg-red-600 text-white shadow-[0_0_15px_#ef4444]' : 'bg-black/80 text-white border border-white/30'
                }`}>
                  <Crosshair className="w-3.5 h-3.5" />
                </span>
                <span className="absolute -inset-1 rounded-full border border-red-500/40 animate-ping pointer-events-none" />
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest uppercase bg-black/80 text-white px-2 py-0.5 rounded border border-white/10">
                AERO WING
              </span>
            </button>

            <button
              onClick={() => setActiveAeroPoint('louvres')}
              className={`absolute top-[48%] right-[32%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group transition-all z-20 ${
                activeAeroPoint === 'louvres' ? 'scale-110' : 'hover:scale-105'
              }`}
              title="Inspect Front Wheel Arch Louvres"
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  activeAeroPoint === 'louvres' ? 'bg-red-600 text-white shadow-[0_0_15px_#ef4444]' : 'bg-black/80 text-white border border-white/30'
                }`}>
                  <Crosshair className="w-3.5 h-3.5" />
                </span>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest uppercase bg-black/80 text-white px-2 py-0.5 rounded border border-white/10">
                WHEEL LOUVRES
              </span>
            </button>

            <button
              onClick={() => setActiveAeroPoint('wheels')}
              className={`absolute bottom-[22%] right-[28%] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 group transition-all z-20 ${
                activeAeroPoint === 'wheels' ? 'scale-110' : 'hover:scale-105'
              }`}
              title="Inspect Forged Center-Lock Wheels"
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  activeAeroPoint === 'wheels' ? 'bg-red-600 text-white shadow-[0_0_15px_#ef4444]' : 'bg-black/80 text-white border border-white/30'
                }`}>
                  <Crosshair className="w-3.5 h-3.5" />
                </span>
              </div>
              <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest uppercase bg-black/80 text-white px-2 py-0.5 rounded border border-white/10">
                PYRO RED WHEELS
              </span>
            </button>
          </div>

          {/* Editorial Inspection Bar Below Image */}
          <div className="p-8 md:p-10 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#090b0e]">
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-widest text-red-500 font-semibold">
                  {current.subtitle}
                </span>
                <span className="text-zinc-600 font-mono text-xs">•</span>
                <span className="font-space text-xs text-white uppercase tracking-wider">
                  ACTIVE TELEMETRY CALLOUT
                </span>
              </div>
              <h3 className="font-syncopate text-xl md:text-2xl font-bold uppercase text-white tracking-tight">
                {current.title}
              </h3>
              <p className="text-zinc-300 font-light text-sm md:text-base leading-relaxed pt-1">
                {current.detail}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                VERIFIED MEASUREMENT
              </span>
              <span className="font-syncopate text-2xl md:text-3xl font-black text-white text-gradient-red mt-1">
                {current.stat}
              </span>
              <span className="font-mono text-xs text-zinc-400 mt-1">
                Official Weissach Benchmark
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
