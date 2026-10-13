import React, { useState } from 'react';
import { Gauge, Cpu, Flame, Wind, ArrowRight, Activity, Zap } from 'lucide-react';

export default function EngineeringNarrative() {
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    {
      id: 'powertrain',
      number: '01',
      category: 'POWERTRAIN // ATMOSPHERIC PURITY',
      headline: '4.0-LITRE NATURALLY ASPIRATED BOXER',
      statPrimary: '9,000 RPM',
      statLabel: 'Maximum Engine Speed Redline',
      description:
        'Free of turbochargers, the 3,996 cm³ atmospheric flat-six delivers razor-sharp throttle response. Equipped with six individual throttle bodies, rigid valvetrain with DLC-coated rocker arms, and an oiling circuit designed for sustained high lateral G-forces on race circuits.',
      technicalPoints: [
        { label: 'Displacement', value: '3,996 cm³ (Boxer 6-cylinder)' },
        { label: 'Max Output', value: '525 PS (386 kW) @ 8,500 rpm' },
        { label: 'Max Torque', value: '465 Nm @ 6,300 rpm' },
        { label: 'Specific Output', value: '131.4 PS / Litre' },
      ],
      image: '/frames/ezgif-frame-150.jpg',
      imagePosition: 'center',
    },
    {
      id: 'cooling',
      number: '02',
      category: 'THERMODYNAMICS // MOTORSPORT DERIVED',
      headline: 'CENTRAL RADIATOR MOTORSPORT CONCEPT',
      statPrimary: '-15 KG',
      statLabel: 'Front-End Structural Weight Reduction',
      description:
        'Instead of the traditional three-radiator layout of previous 911 models, the GT3 RS relies on a single large angled center radiator in the nose—a technology taken directly from the Le Mans class-winning 911 RSR. This packaging frees up the flanks for active aerodynamic underbody elements.',
      technicalPoints: [
        { label: 'Cooling Unit', value: 'Single angled high-capacity core' },
        { label: 'Air Routing', value: 'Through bonnet nostrils over roof' },
        { label: 'Roof Guide Fins', value: 'Prevents warm air entering rear intake' },
        { label: 'Brake Ducts', value: 'Dedicated lateral air channels' },
      ],
      image: '/frames/ezgif-frame-075.jpg',
      imagePosition: 'center',
    },
    {
      id: 'aero',
      number: '03',
      category: 'ACTIVE DYNAMICS // DRS HYDRAULIC SYSTEM',
      headline: 'CONTINUOUS VARIABLE DOWNFORCE',
      statPrimary: '860 KG',
      statLabel: 'Total Downforce at 285 km/h',
      description:
        'The swan-neck mounted carbon wing is taller than the roofline and operates via high-speed hydraulic rams. On high-speed straights, the Drag Reduction System (DRS) flattens the upper element at the press of a steering wheel button. Under heavy braking, it rotates to 34° to act as an aerodynamic airbrake.',
      technicalPoints: [
        { label: 'Downforce @ 200 km/h', value: '409 kg' },
        { label: 'Downforce @ 285 km/h', value: '860 kg (3x 991.2 generation)' },
        { label: 'DRS Actuation', value: 'Hydraulic steering-wheel trigger' },
        { label: 'Airbrake Function', value: 'Automatic emergency deceleration' },
      ],
      image: '/frames/ezgif-frame-190.jpg',
      imagePosition: 'center',
    },
  ];

  const current = chapters[activeChapter];

  return (
    <section id="engineering" className="relative w-full bg-[#050505] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      {/* Precision grid backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              03 — ENGINEERING DOSSIER
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              PERFORMANCE <span className="text-red-500">NARRATIVE</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-md">
            <span>Verified motorsport data and technical architecture derived from the Weissach Development Centre.</span>
          </div>
        </div>

        {/* Chapter Stepper Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapter(idx)}
              className={`p-5 rounded-xl text-left transition-all border ${
                activeChapter === idx
                  ? 'bg-red-950/25 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                  : 'bg-black/40 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-red-400 tracking-widest uppercase">
                  CHAPTER {ch.number}
                </span>
                <span className="font-mono text-xs text-zinc-500">0{idx + 1}/03</span>
              </div>
              <h3 className="font-space text-sm font-bold text-white uppercase tracking-wider">
                {ch.headline.split(' ')[0]} {ch.headline.split(' ')[1]}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{ch.statLabel}</p>
            </button>
          ))}
        </div>

        {/* Dynamic Editorial Chapter Layout */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0f14] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative aspect-video lg:aspect-auto min-h-[350px] lg:min-h-[500px] overflow-hidden bg-black">
              <img
                src={current.image}
                alt={current.headline}
                className="w-full h-full object-cover filter brightness-95 contrast-105 transition-all duration-700"
                style={{ objectPosition: current.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0f14] hidden lg:block" />

              {/* Floating Stat Stamp */}
              <div className="absolute bottom-6 left-6 glass-panel px-5 py-3 rounded-xl border border-white/15">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block">
                  KEY TELEMETRY FIGURE
                </span>
                <span className="font-syncopate text-2xl sm:text-3xl font-black text-white text-gradient-red block">
                  {current.statPrimary}
                </span>
                <span className="font-mono text-[11px] text-zinc-300 block mt-0.5">
                  {current.statLabel}
                </span>
              </div>
            </div>

            {/* Narrative & Specifications Column */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-red-500 uppercase tracking-widest">
                  <Activity className="w-4 h-4 text-red-500" />
                  <span>{current.category}</span>
                </div>
                <h3 className="font-syncopate text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight leading-tight">
                  {current.headline}
                </h3>
                <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed pt-2">
                  {current.description}
                </p>
              </div>

              {/* Precise Technical Specifications List */}
              <div className="space-y-3 pt-6 border-t border-white/10 font-mono text-xs">
                {current.technicalPoints.map((pt, i) => (
                  <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-zinc-400">{pt.label}</span>
                    <span className="text-white font-semibold text-right">{pt.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
