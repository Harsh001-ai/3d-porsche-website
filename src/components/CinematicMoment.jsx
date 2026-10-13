import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getAssetPath } from '../utils/assetPath';

export default function CinematicMoment() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#07080a] overflow-hidden border-t border-white/5 py-24">
      {/* Cinematic Full-Bleed Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src={getAssetPath('/frames/ezgif-frame-240.jpg')}
          alt="Porsche 911 GT3 RS Centered Rear Downforce Stance"
          className="w-full h-full object-cover object-center filter brightness-60 contrast-110"
        />
        {/* Cinematic Film Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07080a] via-transparent to-[#07080a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080a]/90 via-transparent to-[#07080a]/90" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-6">
        <span className="font-mono text-xs text-red-500 uppercase tracking-[0.4em] block">
          09 — CINEMATIC MANIFESTO
        </span>
        <h2 className="font-syncopate text-3xl sm:text-5xl md:text-7xl font-black uppercase text-white tracking-tight leading-[1.05]">
          AERODYNAMIC <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-white">
            SUPREMACY
          </span>
        </h2>
        <p className="font-space text-sm sm:text-base md:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
          The 911 GT3 RS does not compromise. At 285 km/h, 860 kilograms of downforce pins the chassis to the tarmac, redefining what is possible from a road-legal sports car.
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-zinc-400">
          <span>0–100 KM/H: 3.20 S</span>
          <span>•</span>
          <span>TOP TRACK SPEED: 296 KM/H</span>
          <span>•</span>
          <span>9,000 RPM REDLINE</span>
        </div>
      </div>
    </section>
  );
}
