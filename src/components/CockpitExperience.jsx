import React, { useState } from 'react';
import { Sliders, Gauge, Shield, Zap, CircleDot, ChevronRight } from 'lucide-react';

export default function CockpitExperience() {
  const [selectedDial, setSelectedDial] = useState('drs');

  const steeringDials = {
    drs: {
      name: 'DRS (Drag Reduction System)',
      position: 'Upper Left Spoke',
      color: '#ef4444',
      function: 'Instant Wing Flattening',
      description:
        'A dedicated motorsport button on the steering wheel spoke. Pressing it flattens the hydraulic upper rear wing blade within fractions of a second, drastically lowering aerodynamic drag on high-speed circuit straights.',
      telemetry: '0.39 to 0.33 Cd in 0.3 seconds',
    },
    pasm: {
      name: 'PASM (Suspension Damping)',
      position: 'Lower Left Rotary Knob',
      color: '#f59e0b',
      function: 'Multi-Stage Rebound & Compression',
      description:
        'Allows the driver to independently adjust rebound and compression damping on both front and rear axles in eight distinct stages directly from the cockpit without stopping in the pit lane.',
      telemetry: 'Front & Rear: -4 to +4 Damping Stages',
    },
    ptv: {
      name: 'PTV+ (Torque Vectoring)',
      position: 'Upper Right Rotary Knob',
      color: '#3b82f6',
      function: 'Electronically Regulated Differential',
      description:
        'Calibrates the electronic rear differential lock. The driver can tune coasting and power-on locking values independently to alter turn-in agility or high-speed traction out of corner exits.',
      telemetry: 'Independent Coast & Power Locking',
    },
    tc: {
      name: 'ESC / TC (Traction Control)',
      position: 'Lower Right Rotary Knob',
      color: '#10b981',
      function: '7-Stage Motorsport Slip Control',
      description:
        'Derived from the 911 GT3 R race car. Allows seven levels of traction slip control or complete deactivation (ESC OFF / TC OFF), granting precise control over tire slip angle.',
      telemetry: '7 Levels of Traction Slip Intervention',
    },
  };

  const current = steeringDials[selectedDial];

  return (
    <section id="cockpit" className="relative w-full bg-[#090b0e] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              07 — DRIVER ENVIRONMENT
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              COCKPIT <span className="text-red-500">ERGONOMICS</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-md">
            The GT3 RS interior is a pure motorsport workstation. All vital dynamic chassis adjustments are placed directly onto the steering wheel.
          </p>
        </div>

        {/* Steering Wheel Rotary Control Interactive Showcase */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0f14] p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Interactive 4-Dial Selection Matrix */}
            <div className="lg:col-span-5 space-y-3">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block mb-4">
                SELECT STEERING CONTROLLER:
              </span>
              {Object.entries(steeringDials).map(([key, dial]) => (
                <button
                  key={key}
                  onClick={() => setSelectedDial(key)}
                  className={`w-full p-4 rounded-xl text-left transition-all border flex items-center justify-between ${
                    selectedDial === key
                      ? 'bg-red-950/30 border-red-500 shadow-md'
                      : 'bg-black/30 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dial.color }} />
                      <span className="font-space text-sm font-bold text-white uppercase tracking-wider">
                        {dial.name.split(' ')[0]}
                      </span>
                      <span className="font-mono text-[10px] text-zinc-400">
                        ({dial.position})
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-400 block">{dial.function}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedDial === key ? 'text-red-500 translate-x-1' : 'text-zinc-600'}`} />
                </button>
              ))}
            </div>

            {/* Right: Active Controller Deep Dive */}
            <div className="lg:col-span-7 p-6 sm:p-10 rounded-2xl bg-black/60 border border-white/10 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="font-mono text-xs text-red-500 uppercase tracking-widest block">
                    {current.position}
                  </span>
                  <h3 className="font-syncopate text-xl sm:text-2xl font-bold uppercase text-white mt-1">
                    {current.name}
                  </h3>
                </div>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center border"
                  style={{ borderColor: current.color, backgroundColor: `${current.color}15` }}
                >
                  <CircleDot className="w-5 h-5" style={{ color: current.color }} />
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                {current.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between sm:items-center gap-2 font-mono text-xs">
                <span className="text-zinc-400 uppercase tracking-wider">OPERATIONAL RANGE</span>
                <span className="text-white font-semibold text-sm sm:text-base">{current.telemetry}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Cockpit Craftsmanship Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 font-mono text-xs">
          <div className="p-6 rounded-xl border border-white/5 bg-[#0a0c10] space-y-2">
            <span className="text-red-500 text-[10px] uppercase tracking-widest block">SEATING POSITION</span>
            <h4 className="font-space text-sm font-bold text-white uppercase tracking-wider">Carbon Full Buckets</h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              CFRP carbon weave shell with integrated thorax airbags and manual fore/aft adjustment.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/5 bg-[#0a0c10] space-y-2">
            <span className="text-red-500 text-[10px] uppercase tracking-widest block">INSTRUMENTATION</span>
            <h4 className="font-space text-sm font-bold text-white uppercase tracking-wider">Track Screen Display</h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Reduces dual 7-inch displays to essential racing data: tire pressures, oil temp, and shift lights.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/5 bg-[#0a0c10] space-y-2">
            <span className="text-red-500 text-[10px] uppercase tracking-widest block">WEIGHT REDUCTION</span>
            <h4 className="font-space text-sm font-bold text-white uppercase tracking-wider">Lightweight Door Pulls</h4>
            <p className="text-zinc-400 font-light leading-relaxed">
              Fabric textile pull loops replace interior metal door handles in true Porsche GT tradition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
