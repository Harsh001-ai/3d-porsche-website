import React, { useState } from 'react';
import { Trophy, Timer, MapPin, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export default function TelemetrySection() {
  const [selectedTrack, setSelectedTrack] = useState('nurburgring');

  const tracks = {
    nurburgring: {
      name: 'Nürburgring Nordschleife',
      length: '20.832 km',
      time: '6:49.328',
      driver: 'Jörg Bergmeister',
      tyres: 'Michelin Pilot Sport Cup 2 R',
      notes: '10.6 seconds faster than current 911 GT3. Record verified on official timing loop.',
    },
    roadAmerica: {
      name: 'Road America',
      length: '6.515 km',
      time: '2:13.820',
      driver: 'Dimitri Dimakos',
      tyres: 'Michelin Pilot Sport Cup 2 R',
      notes: 'Production car lap record set under official SCCA track record sanction.',
    },
    silverstone: {
      name: 'Silverstone Grand Prix',
      length: '5.891 km',
      time: '2:03.210',
      driver: 'Factory Test Driver',
      tyres: 'Michelin Pilot Sport Cup 2 R',
      notes: 'Full GP layout with DRS deployment on Wellington and Hangar straights.',
    },
  };

  const activeTrack = tracks[selectedTrack];

  const specCategories = [
    {
      category: 'Power Unit & Combustion',
      items: [
        { label: 'Displacement', value: '3,996 cm³ (4.0 Litres)' },
        { label: 'Configuration', value: 'Naturally Aspirated Boxer-6' },
        { label: 'Cylinder Bore / Stroke', value: '102.0 mm / 81.5 mm' },
        { label: 'Max Engine Speed', value: '9,000 RPM' },
        { label: 'Specific Output', value: '131.4 PS / Litre' },
      ],
    },
    {
      category: 'Chassis & Dynamic Systems',
      items: [
        { label: 'Front Suspension', value: 'Double-wishbone with aero teardrop blades' },
        { label: 'Rear Suspension', value: 'Multi-link LSA with helper springs' },
        { label: 'Damping', value: 'PASM (Porsche Active Suspension Management)' },
        { label: 'Steering', value: 'Electromechanical rear-axle steering' },
        { label: 'Brakes', value: '6-piston front / 4-piston rear monobloc calipers' },
      ],
    },
    {
      category: 'Aerodynamic Parameters',
      items: [
        { label: 'Downforce @ 200 km/h', value: '409 kg' },
        { label: 'Downforce @ 285 km/h', value: '860 kg' },
        { label: 'Rear Wing Width', value: '1,500 mm (Carbon Swan-Neck)' },
        { label: 'DRS Range of Attack', value: '0° to 34° hydraulic actuation' },
        { label: 'Drag Coefficient (Cd)', value: '0.39 (High Downforce Mode)' },
      ],
    },
  ];

  return (
    <section id="telemetry" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#0d0f14] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase mb-3">
              <Trophy className="w-4 h-4 text-red-500" />
              <span>CIRCUIT VERIFICATION</span>
            </div>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              LAP TIMES & <span className="text-red-500">SPECIFICATIONS</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-md text-sm md:text-base leading-relaxed">
            Every millimeter engineered for lap times. Validated on the most demanding race circuits in the world.
          </p>
        </div>

        {/* Lap Times Spotlight Banner */}
        <div className="glass-panel p-8 md:p-10 rounded-2xl mb-16 border border-white/10 relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-white/10 pb-4">
            {Object.entries(tracks).map(([key, track]) => (
              <button
                key={key}
                onClick={() => setSelectedTrack(key)}
                className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedTrack === key
                    ? 'bg-red-600 text-white font-bold shadow-lg'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {track.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span>Track Distance: {activeTrack.length}</span>
              </div>
              <h3 className="font-syncopate text-3xl sm:text-5xl font-black text-white mb-4">
                {activeTrack.time} <span className="text-red-500 text-xl font-normal">MIN</span>
              </h3>
              <p className="text-zinc-300 text-sm font-light leading-relaxed mb-6">
                {activeTrack.notes}
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-600">DRIVER:</span>
                  <span className="text-white font-semibold">{activeTrack.driver}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-600">TYRES:</span>
                  <span className="text-white font-semibold">{activeTrack.tyres}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-black/50 p-6 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
                NOTARIZED VALIDATION
              </span>
              <div className="space-y-3 font-mono text-xs text-zinc-300">
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">TÜV SÜD Inspector</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> Certified
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-500">Air Temperature</span>
                  <span>16°C</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-zinc-500">Track Temperature</span>
                  <span>18°C (Dry Asphalt)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Spec Matrices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-xl border border-white/5">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                <h4 className="font-syncopate text-sm font-semibold text-white tracking-wider">
                  {cat.category}
                </h4>
                <FileText className="w-4 h-4 text-red-500" />
              </div>
              <div className="space-y-3">
                {cat.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-500">{item.label}</span>
                    <span className="text-zinc-200 font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
