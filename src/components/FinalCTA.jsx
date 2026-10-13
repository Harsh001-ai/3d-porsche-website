import React, { useState } from 'react';
import { ArrowUpRight, ShieldCheck, Check, Download, X } from 'lucide-react';

export default function FinalCTA() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleDownloadDossier = () => {
    const specData = {
      model: 'Porsche 911 GT3 RS (Type 992)',
      engine: '4.0-Litre Naturally Aspirated Boxer-6',
      displacement: '3,996 cm³',
      power: '525 PS (386 kW) @ 8,500 rpm',
      torque: '465 Nm @ 6,300 rpm',
      maxRpm: '9,000 RPM',
      acceleration: '0-100 km/h in 3.20 seconds',
      topSpeed: '296 km/h',
      downforce: '860 kg @ 285 km/h (409 kg @ 200 km/h)',
      transmission: '7-speed Porsche Doppelkupplung (PDK)',
      kerbWeightDIN: '1,450 kg',
      nurburgringLapTime: '6:49.328 minutes (official timing loop)',
      homologation: 'FIA GT3 Derived / Euro 6d-ISC-FCM',
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(specData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Porsche_911_GT3_RS_Weissach_Technical_Dossier.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="cta" className="relative w-full bg-[#08090c] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto rounded-3xl border border-white/10 bg-[#0d0f14] p-8 sm:p-14 lg:p-20 relative overflow-hidden shadow-2xl">
        {/* Subtle accent glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 font-mono text-xs text-red-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>WEISSACH MOTORSPORT ALLOCATION</span>
          </div>

          <h2 className="font-syncopate text-3xl sm:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white leading-[1.08]">
            THE APEX AWAITS. <br />
            <span className="text-red-500">YOUR ALLOCATION.</span>
          </h2>

          <p className="text-zinc-300 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            Direct production consultation for the Porsche 911 GT3 RS with optional Weissach lightweight package and motorsport telemetry data logging.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => setModalOpen(true)}
              className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center gap-2 group"
            >
              <span>Request Consultation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={handleDownloadDossier}
              className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors border border-white/10 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-zinc-400" />
              <span>Technical Dossier (JSON)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Consultation Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-lg w-full rounded-2xl border border-white/20 bg-[#0d0f14] p-8 shadow-2xl">
            <button
              onClick={() => {
                setModalOpen(false);
                setSubmitted(false);
              }}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-red-500 uppercase tracking-widest mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>OFFICIAL CONSULTATION DESK</span>
                </div>
                <h3 className="font-syncopate text-xl font-bold uppercase text-white">
                  911 GT3 RS Allocation
                </h3>
                <p className="text-xs text-zinc-400 font-light pb-2">
                  Submit your details to coordinate with an authorized Porsche Motorsport Specialist at your nearest Porsche Experience Centre.
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1">NAME</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Wolfgang Porsche"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">EMAIL</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. motorsport@porsche-experience.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">PREFERRED LOCATION</label>
                    <input
                      type="text"
                      placeholder="e.g. Porsche Experience Centre Leipzig"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg mt-4"
                >
                  Submit Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-syncopate text-lg font-bold text-white uppercase">
                  Consultation Registered
                </h4>
                <p className="font-mono text-xs text-zinc-400 max-w-sm mx-auto">
                  Your interest in the 911 GT3 RS has been recorded. A representative will contact you regarding delivery schedules and track allocations.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 rounded-full bg-white/10 text-white font-mono text-xs uppercase hover:bg-white/20"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
