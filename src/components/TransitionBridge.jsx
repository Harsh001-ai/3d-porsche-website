import React from 'react';
import { ArrowDown, CornerDownRight } from 'lucide-react';

export default function TransitionBridge() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#0b0d10] via-[#090b0e] to-[#08090c] pt-24 pb-20 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Technical Coordinate & Origin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/10 font-mono text-[11px] text-zinc-400 tracking-wider">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-white uppercase tracking-[0.25em]">DEVELOPMENT PROTOCOL // WEISSACH</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-400">
            <span>HOMOLOGATION: ROAD-LEGAL FIA GT3</span>
            <span className="hidden md:inline">CHASSIS: TYPE 992</span>
            <span className="text-red-500 font-semibold">STATUS: PRODUCTION RECORD</span>
          </div>
        </div>

        {/* Asymmetrical Editorial Manifesto */}
        <div className="pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-4">
              01 — THE WEISSACH PRINCIPLE
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08]">
              BEYOND SPEED. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-zinc-400">
                SCULPTED BY THE AIR.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed">
              While conventional sports cars measure dominance through straight-line acceleration, the 911 GT3 RS is conceived to manipulate the invisible medium. Every surface, vent, and wing profile serves a thermodynamic or downforce imperative.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 pt-2 border-t border-white/5">
              <CornerDownRight className="w-4 h-4 text-red-500" />
              <span>860 KG DOWNFORCE @ 285 KM/H</span>
            </div>
          </div>
        </div>

        {/* Refined Engineering Anchor Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 font-mono text-xs">
          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1">AERODYNAMIC DRAG</span>
            <span className="text-white text-base font-bold font-space">0.39 CD</span>
            <span className="text-zinc-400 text-[11px] block mt-0.5">High Downforce Config</span>
          </div>
          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1">POWER-TO-WEIGHT</span>
            <span className="text-white text-base font-bold font-space">2.76 KG / PS</span>
            <span className="text-zinc-400 text-[11px] block mt-0.5">DIN Kerb Weight: 1,450 kg</span>
          </div>
          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1">DISPLACEMENT</span>
            <span className="text-white text-base font-bold font-space">3,996 CM³</span>
            <span className="text-zinc-400 text-[11px] block mt-0.5">Naturally Aspirated Boxer-6</span>
          </div>
          <div>
            <span className="text-zinc-400 text-[10px] uppercase tracking-wider block mb-1">MAX ROTATIONAL VELOCITY</span>
            <span className="text-red-400 text-base font-bold font-space">9,000 RPM</span>
            <span className="text-zinc-400 text-[11px] block mt-0.5">Rigid Valvetrain</span>
          </div>
        </div>
      </div>
    </section>
  );
}
