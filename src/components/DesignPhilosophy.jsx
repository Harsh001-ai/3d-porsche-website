import React from 'react';
import { Layers, Wind, Shield, ArrowUpRight } from 'lucide-react';

export default function DesignPhilosophy() {
  return (
    <section id="philosophy" className="relative w-full bg-[#050505] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              06 — DESIGN MANIFESTO
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#E8E6E1]">
              AERODYNAMIC <span className="text-red-500">PHILOSOPHY</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#9A9FA8] max-w-md">
            Three core principles engineered into every carbon-fibre composite panel of the 911 GT3 RS.
          </p>
        </div>

        {/* THEME 01: Full-Width Editorial Quote & Functional Directness */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#111318] p-8 md:p-16">
          <div className="max-w-3xl space-y-6">
            <span className="font-mono text-xs text-red-500 uppercase tracking-widest block">
              PRINCIPLE 01 // PURITY OF INTENT
            </span>
            <blockquote className="font-syncopate text-xl sm:text-3xl lg:text-4xl font-bold uppercase text-white leading-snug">
              “On the 911 GT3 RS, there are no styling lines. Every vent, slat, and surface exists solely because the air demands it.”
            </blockquote>
            <div className="pt-4 flex items-center gap-3 font-mono text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-white font-semibold">ANDREAS PREUNINGER</span>
              <span>— Director, Porsche GT Model Line</span>
            </div>
          </div>
        </div>

        {/* THEME 02: Split Composition — Aerodynamic Negative Space & CFD Fluid Dynamics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 aspect-video relative group bg-black">
            <img
              src="/frames/ezgif-frame-190.jpg"
              alt="Aerodynamic Airflow Channels"
              className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-700"
              style={{ objectPosition: 'center 45%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end font-mono text-xs text-white">
              <span>CFD SURFACE FLUID SIMULATION</span>
              <span className="text-red-400 font-semibold">PRESSURE EQUALIZATION ACTIVE</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 lg:pl-6">
            <span className="font-mono text-xs text-red-500 uppercase tracking-widest block">
              PRINCIPLE 02 // MASS FLOW DYNAMICS
            </span>
            <h3 className="font-syncopate text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              EVACUATING TURBULENT PRESSURE
            </h3>
            <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              At 285 km/h, rotating front tires generate high-pressure turbulence inside the wheel housings. The distinctive carbon louvered gills evacuate this pressure directly out of the wings, pinning the front axle to the track surface.
            </p>
            <div className="pt-2 font-mono text-xs text-zinc-400 space-y-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>FRONT AXLE TRACK</span>
                <span className="text-white font-semibold">+29 mm Wider Track</span>
              </div>
              <div className="flex justify-between">
                <span>ANTI-DIVE COMPENSATION</span>
                <span className="text-white font-semibold">Reduces Pitch Under Braking</span>
              </div>
            </div>
          </div>
        </div>

        {/* THEME 03: Compact Editorial Detail — The Weissach Lightweight Ethos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0e12] space-y-3">
            <span className="text-red-500 uppercase tracking-widest block text-[10px]">
              LIGHTWEIGHT COMPOSITES
            </span>
            <h4 className="font-syncopate text-lg font-bold text-white uppercase">
              CARBON MONOCOQUE
            </h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Doors, front wings, roof, and front lid are made entirely of carbon-fibre reinforced plastic (CFRP).
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0e12] space-y-3">
            <span className="text-red-500 uppercase tracking-widest block text-[10px]">
              ROTATIONAL REDUCTION
            </span>
            <h4 className="font-syncopate text-lg font-bold text-white uppercase">
              MAGNESIUM WHEELS
            </h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Forged magnesium wheels shave 8 kg of unsprung mass directly where it matters most for steering responsiveness.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-[#0c0e12] space-y-3">
            <span className="text-red-500 uppercase tracking-widest block text-[10px]">
              CHASSIS RIGIDITY
            </span>
            <h4 className="font-syncopate text-lg font-bold text-white uppercase">
              CARBON ROLL CAGE
            </h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              The optional Weissach package includes a carbon-weave rear roll bar, reducing weight by approximately 6 kg compared to steel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
