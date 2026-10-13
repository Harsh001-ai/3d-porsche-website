import React, { useState } from 'react';
import { Trophy, Timer, Flag, MapPin, Gauge, Wind, ChevronRight } from 'lucide-react';

export default function TrackTelemetry() {
  const [selectedSector, setSelectedSector] = useState(0);

  const sectors = [
    {
      id: 'flugplatz',
      name: 'Flugplatz to Schwedenkreuz',
      distance: 'Km 3.2 – 5.8',
      topSpeed: '282 km/h',
      gear: '6th PDK',
      aeroMode: 'DRS Active (Low Drag)',
      telemetryNote:
        'Cresting high-speed blind brow. DRS wing flap deployed on steering wheel to reduce drag before heavy braking into Aremberg.',
    },
    {
      id: 'fuchsroehre',
      name: 'Fuchsröhre (Fox Hole)',
      distance: 'Km 6.1 – 8.4',
      topSpeed: '274 km/h',
      gear: '5th PDK',
      aeroMode: 'Maximum Downforce (860 kg)',
      telemetryNote:
        'Maximum dynamic compression at the bottom of the dip. Full 860 kg aerodynamic downforce keeps suspension travel stable through high G-compression.',
    },
    {
      id: 'karussell',
      name: 'Caracciola-Karussell',
      distance: 'Km 13.1 – 14.2',
      topSpeed: '108 km/h',
      gear: '2nd PDK',
      aeroMode: 'High Downforce + PASM Stiff',
      telemetryNote:
        'Concrete banked hairpin. PASM compression damping calibrated via steering dial ensures precise tyre contact across uneven concrete slabs.',
    },
    {
      id: 'doettinger',
      name: 'Döttinger Höhe Straight',
      distance: 'Km 18.2 – 20.8',
      topSpeed: '296 km/h',
      gear: '7th PDK',
      aeroMode: 'DRS Active (Airbrake Braking)',
      telemetryNote:
        'Long 2.1 km straight followed by Tiergarten. Top track speed reached, followed by automatic vertical airbrake wing deployment during emergency braking.',
    },
  ];

  const current = sectors[selectedSector];

  return (
    <section id="telemetry" className="relative w-full bg-[#08090c] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              08 — NORDSCHLEIFE TELEMETRY
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              6:49.328 <span className="text-red-500">MINUTES</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-md">
            <span>Official lap record on the 20.832 km Nürburgring Nordschleife. Driven by Porsche brand ambassador Jörg Bergmeister.</span>
          </div>
        </div>

        {/* Sector Interactive Telemetry Grid */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0e12] p-8 md:p-12 shadow-2xl">
          {/* Top Sector Selector Tabs */}
          <div className="flex flex-wrap gap-2 pb-8 border-b border-white/10 mb-8">
            {sectors.map((sec, idx) => (
              <button
                key={sec.id}
                onClick={() => setSelectedSector(idx)}
                className={`px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                  selectedSector === idx
                    ? 'bg-red-600 text-white font-bold shadow-md'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                SECTOR 0{idx + 1} : {sec.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Active Sector Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-red-400 uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>{current.distance}</span>
              </div>
              <h3 className="font-syncopate text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
                {current.name}
              </h3>
              <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed pt-2">
                {current.telemetryNote}
              </p>
            </div>

            {/* Sector Data Telemetry Box */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-black/50 border border-white/10 space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-zinc-500">SECTOR VELOCITY</span>
                <span className="text-white text-base font-bold font-space">{current.topSpeed}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-zinc-500">TRANSMISSION RATIO</span>
                <span className="text-white font-semibold">{current.gear}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-zinc-500">ACTIVE AERO PROTOCOL</span>
                <span className="text-red-400 font-semibold">{current.aeroMode}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-zinc-500">TYRE COMPOUND</span>
                <span className="text-white">Michelin Cup 2 R</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
