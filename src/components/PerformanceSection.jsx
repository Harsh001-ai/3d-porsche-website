import React, { useState, useEffect } from 'react';
import { Gauge, Zap, Flame, Timer, Compass, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function PerformanceSection() {
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'
  const [isRevving, setIsRevving] = useState(false);
  const [currentRpm, setCurrentRpm] = useState(900);

  // Rev simulation logic
  useEffect(() => {
    let interval;
    if (isRevving) {
      interval = setInterval(() => {
        setCurrentRpm((prev) => {
          const next = Math.min(9000, prev + 650);
          soundEngine.updateFromScroll(next / 100);
          return next;
        });
      }, 30);
    } else {
      interval = setInterval(() => {
        setCurrentRpm((prev) => {
          if (prev <= 900) return 900;
          return Math.max(900, prev - 450);
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isRevving]);

  const handleRevStart = () => {
    if (!soundEngine.isPlaying) {
      soundEngine.toggle();
    }
    setIsRevving(true);
  };

  const handleRevEnd = () => {
    setIsRevving(false);
  };

  const specs = {
    metric: {
      power: '525 PS',
      powerDetail: '386 kW @ 8,500 rpm',
      torque: '465 Nm',
      torqueDetail: 'at 6,300 rpm',
      accel: '3.2 s',
      accelLabel: '0–100 km/h',
      accel200: '10.6 s',
      accel200Label: '0–200 km/h',
      topSpeed: '296 km/h',
      weight: '1,450 kg',
      weightRatio: '2.76 kg/PS',
    },
    imperial: {
      power: '518 HP',
      powerDetail: '386 kW @ 8,500 rpm',
      torque: '343 lb-ft',
      torqueDetail: 'at 6,300 rpm',
      accel: '3.0 s',
      accelLabel: '0–60 mph',
      accel200: '10.6 s',
      accel200Label: '0–124 mph',
      topSpeed: '184 mph',
      weight: '3,197 lbs',
      weightRatio: '6.17 lbs/HP',
    },
  };

  const cur = specs[unit];
  const rpmDegree = (currentRpm / 9000) * 240 - 120; // -120 to +120 deg

  return (
    <section id="performance" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#0b0d11]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase mb-3">
              <Flame className="w-4 h-4 text-red-500" />
              <span>ATMOSPHERIC FLAT-SIX PURITY</span>
            </div>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              HIGH-REVVING <span className="text-red-500">EXCELLENCE</span>
            </h2>
          </div>

          {/* Unit Toggle Switch */}
          <div className="flex items-center gap-2 p-1 bg-black/60 rounded-full border border-white/10 self-start md:self-end">
            <button
              onClick={() => setUnit('metric')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                unit === 'metric'
                  ? 'bg-red-600 text-white font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              METRIC (PS / KM/H)
            </button>
            <button
              onClick={() => setUnit('imperial')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                unit === 'imperial'
                  ? 'bg-red-600 text-white font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              IMPERIAL (HP / MPH)
            </button>
          </div>
        </div>

        {/* Interactive Tachometer & Specs Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Interactive 9,000 RPM Tachometer Gauge */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between w-full mb-6 font-mono text-xs text-zinc-400">
              <span>ANALOG TELEMETRY</span>
              <span className="text-red-400">REDLINE: 9,000 RPM</span>
            </div>

            {/* Circular Gauge Visualizer */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Gauge Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
              <div
                className={`absolute inset-0 rounded-full border-4 border-transparent transition-all duration-75 ${
                  currentRpm > 8500
                    ? 'border-red-500 shadow-[0_0_30px_#ef4444]'
                    : currentRpm > 6000
                    ? 'border-amber-500'
                    : 'border-zinc-600'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                  transform: `rotate(${rpmDegree}deg)`,
                }}
              />

              {/* Digital RPM Counter */}
              <div className="flex flex-col items-center">
                <span className="font-syncopate text-4xl sm:text-5xl font-black text-white">
                  {currentRpm.toLocaleString()}
                </span>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-1">
                  1/MIN (RPM)
                </span>
                {currentRpm >= 8500 && (
                  <span className="mt-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                    VALVETRAIN PEAK
                  </span>
                )}
              </div>
            </div>

            {/* Interactive Rev Button */}
            <div className="mt-6 w-full">
              <button
                onMouseDown={handleRevStart}
                onMouseUp={handleRevEnd}
                onMouseLeave={handleRevEnd}
                onTouchStart={handleRevStart}
                onTouchEnd={handleRevEnd}
                className="w-full py-3.5 rounded-xl font-mono text-xs uppercase tracking-widest font-bold transition-all bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 active:scale-95 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Hold to Rev Engine (9,000 RPM)</span>
              </button>
              <p className="text-[11px] font-mono text-zinc-500 mt-2">
                Click & hold to trigger flat-six atmospheric acoustic harmonics
              </p>
            </div>
          </div>

          {/* Performance Telemetry Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Power Card */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">MAXIMUM OUTPUT</span>
                <Zap className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-syncopate text-3xl sm:text-4xl font-bold text-white mb-1">
                {cur.power}
              </div>
              <div className="font-mono text-xs text-zinc-400">{cur.powerDetail}</div>
            </div>

            {/* Torque Card */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">MAXIMUM TORQUE</span>
                <Gauge className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-syncopate text-3xl sm:text-4xl font-bold text-white mb-1">
                {cur.torque}
              </div>
              <div className="font-mono text-xs text-zinc-400">{cur.torqueDetail}</div>
            </div>

            {/* 0-100 Accel Card */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">{cur.accelLabel}</span>
                <Timer className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-syncopate text-3xl sm:text-4xl font-bold text-white mb-1">
                {cur.accel}
              </div>
              <div className="font-mono text-xs text-zinc-400">Launch Control Active</div>
            </div>

            {/* Top Speed Card */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">TOP TRACK SPEED</span>
                <Compass className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              <div className="font-syncopate text-3xl sm:text-4xl font-bold text-white mb-1">
                {cur.topSpeed}
              </div>
              <div className="font-mono text-xs text-zinc-400">Tested in 7th gear</div>
            </div>

            {/* Weight Ratio Card */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">KERB WEIGHT (DIN)</span>
                <span className="font-mono text-xs text-red-400">LIGHTWEIGHT</span>
              </div>
              <div className="font-syncopate text-3xl sm:text-4xl font-bold text-white mb-1">
                {cur.weight}
              </div>
              <div className="font-mono text-xs text-zinc-400">Power-to-weight: {cur.weightRatio}</div>
            </div>

            {/* Transmission Card */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-red-500/30 transition-all group">
              <div className="flex items-center justify-between text-zinc-500 mb-2">
                <span className="font-mono text-xs uppercase tracking-wider">DRIVETRAIN</span>
                <span className="font-mono text-xs text-red-400">PDK</span>
              </div>
              <div className="font-syncopate text-2xl sm:text-3xl font-bold text-white mb-1">
                7-SPEED PDK
              </div>
              <div className="font-mono text-xs text-zinc-400">Shortened final drive ratio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
