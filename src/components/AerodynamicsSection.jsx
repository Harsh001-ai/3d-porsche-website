import React, { useState } from 'react';
import { Wind, ShieldAlert, Cpu, Gauge, Layers, ArrowRight } from 'lucide-react';

export default function AerodynamicsSection() {
  const [activeTab, setActiveTab] = useState('drs');

  const aeroFeatures = {
    drs: {
      title: 'Drag Reduction System (DRS)',
      subtitle: 'HYDRAULIC ACTIVE WING',
      stat: '860 KG',
      statLabel: 'Downforce at 285 km/h',
      description:
        'A first for a production Porsche: the two-part rear wing features a hydraulic upper blade that flattens out at the press of a steering-wheel button for high-speed straights, or snaps vertical under heavy braking to function as an aerodynamic airbrake.',
      points: [
        'Steering wheel DRS button integration',
        'Automatic airbrake deployment during emergency deceleration',
        'Upper wing blade positioned higher than the vehicle roofline',
        'Continuously variable angle of attack via dual hydraulic actuators',
      ],
    },
    radiator: {
      title: 'Single Central Radiator',
      subtitle: 'LE MANS MOTORSPORT CONCEPT',
      stat: '-15 KG',
      statLabel: 'Front-end weight reduction',
      description:
        'Instead of the three-radiator layout of previous generations, the 911 GT3 RS relies on a large angled center radiator in the vehicle nose. This frees up lateral space for active aerodynamic wing elements in the front underbody.',
      points: [
        'Air intake directly through the bonnet nostrils',
        'Continuous active flaps under the front nose',
        'Hot radiator air routed over the roof via guide vanes',
        'Dedicated side radiators eliminated for optimized brake cooling',
      ],
    },
    suspension: {
      title: 'Aerodynamic Double-Wishbone Axle',
      subtitle: 'TEARDROP AEROFOIL SUSPENSION',
      stat: '+40 KG',
      statLabel: 'Additional downforce from suspension arms',
      description:
        'Even the suspension components are shaped for aerodynamic downforce. The double-wishbone front axle components feature teardrop profiles, increasing front downforce by roughly 40 kg at maximum velocity.',
      points: [
        'Motorsport uniball ball joints for zero play',
        'Wider track (+29 mm) for extreme cornering stability',
        'Pitch compensation (anti-dive) reduces braking pitch',
        'Teardrop aerofoil profile links smooth turbulent wheel airflow',
      ],
    },
  };

  const current = aeroFeatures[activeTab];

  return (
    <section id="aerodynamics" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#0d0f14] border-t border-white/5">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase mb-3">
              <Wind className="w-4 h-4 text-red-500 animate-pulse" />
              <span>AERODYNAMIC TELEMETRY</span>
            </div>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              DOWNFORCE <span className="text-red-500">DEFINED</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-md text-sm md:text-base leading-relaxed">
            Form strictly follows aerodynamics. Every vent, louvre, and fin on the 911 GT3 RS exists solely to manipulate air pressure and conquer lap times.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          <button
            onClick={() => setActiveTab('drs')}
            className={`p-5 rounded-xl text-left transition-all border ${
              activeTab === 'drs'
                ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">01 // REAR WING</span>
              <Wind className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="font-space text-sm font-bold text-white uppercase tracking-wider">Active DRS Wing</h3>
            <p className="text-xs text-zinc-400 mt-1">Hydraulically adjusted dual-stage wing.</p>
          </button>

          <button
            onClick={() => setActiveTab('radiator')}
            className={`p-5 rounded-xl text-left transition-all border ${
              activeTab === 'radiator'
                ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">02 // THERMAL AERO</span>
              <Cpu className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="font-space text-sm font-bold text-white uppercase tracking-wider">Center Radiator</h3>
            <p className="text-xs text-zinc-400 mt-1">Single nose radiator derived from 911 RSR.</p>
          </button>

          <button
            onClick={() => setActiveTab('suspension')}
            className={`p-5 rounded-xl text-left transition-all border ${
              activeTab === 'suspension'
                ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_25px_rgba(239,68,68,0.15)]'
                : 'glass-panel hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-red-400 tracking-widest uppercase">03 // CHASSIS FLOW</span>
              <Layers className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="font-space text-sm font-bold text-white uppercase tracking-wider">Aerofoil Wishbones</h3>
            <p className="text-xs text-zinc-400 mt-1">Teardrop profiled front suspension links.</p>
          </button>
        </div>

        {/* Active Tab Deep-Dive Display */}
        <div className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs text-red-500 tracking-widest uppercase block mb-1">
                {current.subtitle}
              </span>
              <h3 className="font-syncopate text-2xl md:text-4xl font-bold text-white uppercase tracking-tight mb-4">
                {current.title}
              </h3>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-light">
                {current.description}
              </p>

              <div className="space-y-3">
                {current.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span className="text-xs md:text-sm text-zinc-300 font-mono">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center items-center p-8 bg-black/40 rounded-xl border border-white/5 text-center">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                MEASURED IMPACT
              </span>
              <div className="font-syncopate text-4xl md:text-6xl font-black text-white text-gradient-red my-2">
                {current.stat}
              </div>
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider">
                {current.statLabel}
              </span>

              <div className="mt-8 w-full pt-6 border-t border-white/10 flex justify-between items-center text-xs font-mono text-zinc-400">
                <span>SIMULATION CODE: CFD-992RS</span>
                <span className="text-red-400 font-bold">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
