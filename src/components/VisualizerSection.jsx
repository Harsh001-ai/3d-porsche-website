import React, { useState } from 'react';
import { Palette, Check, Sparkles, Layers, ShieldCheck, ArrowRight, X } from 'lucide-react';

export default function VisualizerSection() {
  const [selectedColor, setSelectedColor] = useState('arcticGrey');
  const [selectedWheel, setSelectedWheel] = useState('pyroRed');
  const [selectedPackage, setSelectedPackage] = useState('weissach');
  const [selectedAngleFrame, setSelectedAngleFrame] = useState(0); // 0 = Profile (frame 1), 129 = 3/4 angle, 239 = Rear
  const [modalOpen, setModalOpen] = useState(false);
  const [consultationSubmitted, setConsultationSubmitted] = useState(false);

  const colors = {
    arcticGrey: { name: 'Arctic Grey', hex: '#8c959f', cost: 0 },
    guardsRed: { name: 'Guards Red', hex: '#cf1b1b', cost: 0 },
    sharkBlue: { name: 'Shark Blue', hex: '#0f72b8', cost: 4220 },
    racingYellow: { name: 'Racing Yellow', hex: '#eab308', cost: 0 },
    gtSilver: { name: 'GT Silver Metallic', hex: '#bcc4ca', cost: 0 },
    pythonGreen: { name: 'Python Green', hex: '#22c55e', cost: 4220 },
  };

  const wheels = {
    pyroRed: { name: 'Pyro Red Wheels (As Shown)', hex: '#dc2626', cost: 0 },
    satinNeodyme: { name: 'Satin Neodyme', hex: '#c5a059', cost: 600 },
    satinBlack: { name: 'Satin Black', hex: '#1c1917', cost: 600 },
    satinSilver: { name: 'Brilliant Silver', hex: '#d4d4d8', cost: 0 },
  };

  const packages = {
    weissach: {
      name: 'Weissach Package',
      cost: 33520,
      description:
        'Exposed carbon-weave front lid, carbon roof, carbon-weave upper rear wing shell, carbon anti-roll bars, forged magnesium lightweight wheels (-8 kg).',
    },
    clubsport: {
      name: 'Clubsport Package',
      cost: 0,
      description:
        'Bolted-in steel roll cage in rear, ready for 6-point racing harnesses, handheld 2-kg fire extinguisher, motorsport battery cut-off switch.',
    },
  };

  const basePrice = 241300;
  const totalPrice =
    basePrice +
    colors[selectedColor].cost +
    wheels[selectedWheel].cost +
    packages[selectedPackage].cost;

  const angleFrames = [
    { label: 'Profile View', frame: 0, title: 'Lateral Aerodynamics' },
    { label: '3/4 Aero Perspective', frame: 129, title: 'Flank & DRS Wing' },
    { label: 'Rear Command View', frame: 239, title: 'Diffuser & Exhaust' },
  ];

  return (
    <section id="visualizer" className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#0a0c0f]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-red-500 tracking-widest uppercase mb-3">
              <Palette className="w-4 h-4 text-red-500" />
              <span>BESPOKE WEISSACH SPECIFICATION</span>
            </div>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              INDIVIDUAL <span className="text-red-500">CUSTOMIZER</span>
            </h2>
          </div>
          <p className="text-zinc-400 font-light max-w-md text-sm md:text-base leading-relaxed">
            Tailor your 911 GT3 RS with motorsport-proven lightweight packages, historical livery accents, and bespoke wheel finishes.
          </p>
        </div>

        {/* Configurator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Visual Canvas / Frame Preview */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black flex items-center justify-center border border-white/10">
              <img
                src={`/frames/ezgif-frame-${String(selectedAngleFrame + 1).padStart(3, '0')}.jpg`}
                alt="Porsche 911 GT3 RS View"
                className="w-full h-full object-cover"
              />

              {/* Dynamic Overlay Tag */}
              <div className="absolute top-4 left-4 glass-panel px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: colors[selectedColor].hex }}
                />
                <span className="text-white font-medium">{colors[selectedColor].name}</span>
                <span className="text-zinc-500">/</span>
                <span className="text-red-400">{wheels[selectedWheel].name}</span>
              </div>

              {/* Perspective Angle Switcher */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                {angleFrames.map((ang) => (
                  <button
                    key={ang.frame}
                    onClick={() => setSelectedAngleFrame(ang.frame)}
                    className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all ${
                      selectedAngleFrame === ang.frame
                        ? 'bg-red-600 text-white font-bold shadow-md'
                        : 'bg-black/60 text-zinc-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {ang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Configured Summary Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase block">ESTIMATED MSRP</span>
                <span className="font-syncopate text-2xl font-bold text-white">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-2"
              >
                <span>Reserve Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Configurator Controls Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            {/* Exterior Colors */}
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  01 // EXTERIOR FINISH
                </span>
                <span className="font-mono text-xs text-white font-semibold">
                  {colors[selectedColor].name}
                </span>
              </div>
              <div className="grid grid-cols-6 gap-3">
                {Object.entries(colors).map(([key, col]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedColor(key)}
                    title={col.name}
                    className={`h-11 rounded-lg transition-all relative flex items-center justify-center border-2 ${
                      selectedColor === key
                        ? 'border-white scale-105 shadow-md ring-2 ring-red-500/50'
                        : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  >
                    {selectedColor === key && <Check className="w-4 h-4 text-black drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Wheel Options */}
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
                  02 // WHEEL FINISH
                </span>
                <span className="font-mono text-xs text-white font-semibold">
                  {wheels[selectedWheel].name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(wheels).map(([key, whl]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWheel(key)}
                    className={`p-3 rounded-lg text-left text-xs font-mono transition-all border ${
                      selectedWheel === key
                        ? 'bg-red-950/20 border-red-500 text-white'
                        : 'bg-black/30 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: whl.hex }} />
                      <span className="font-semibold">{whl.name}</span>
                    </div>
                    <span className="text-zinc-500 text-[10px]">
                      {whl.cost === 0 ? 'Included' : `+$${whl.cost}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Package Choice */}
            <div className="glass-panel p-6 rounded-xl border border-white/5">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-4">
                03 // AERODYNAMIC PACKAGE
              </span>
              <div className="space-y-3">
                {Object.entries(packages).map(([key, pkg]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedPackage(key)}
                    className={`w-full p-4 rounded-xl text-left transition-all border ${
                      selectedPackage === key
                        ? 'bg-red-950/30 border-red-500 shadow-md'
                        : 'bg-black/30 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-syncopate text-xs font-bold text-white uppercase">
                        {pkg.name}
                      </span>
                      <span className="font-mono text-xs text-red-400 font-semibold">
                        {pkg.cost === 0 ? 'Standard' : `+$${pkg.cost.toLocaleString()}`}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {pkg.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel max-w-lg w-full p-8 rounded-2xl border border-white/20 relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setConsultationSubmitted(false);
              }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {!consultationSubmitted ? (
              <>
                <div className="flex items-center gap-2 font-mono text-xs text-red-500 uppercase tracking-widest mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VIP MOTORSPORT ALLOCATION</span>
                </div>
                <h3 className="font-syncopate text-xl font-bold text-white uppercase mb-2">
                  Request Build Consultation
                </h3>
                <p className="text-xs text-zinc-400 font-light mb-6">
                  Selected build: 911 GT3 RS in {colors[selectedColor].name} with {wheels[selectedWheel].name} & {packages[selectedPackage].name}. Total estimated: ${totalPrice.toLocaleString()}.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setConsultationSubmitted(true);
                  }}
                  className="space-y-4 font-mono text-xs"
                >
                  <div>
                    <label className="block text-zinc-400 mb-1">FULL NAME</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Wolfgang Porsche"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">EMAIL ADDRESS</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. vip@porsche-experience.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">PREFERRED PORSCHE CENTER</label>
                    <input
                      type="text"
                      placeholder="e.g. Porsche Experience Center Atlanta / Leipzig"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase transition-all shadow-lg mt-4"
                  >
                    Submit Allocation Request
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/40">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-syncopate text-lg font-bold text-white uppercase">
                  Telemetry Transmitted
                </h4>
                <p className="text-xs font-mono text-zinc-400 max-w-sm mx-auto">
                  Your personalized 911 GT3 RS specification packet has been registered. An authorized Porsche Motorsport Specialist will contact you.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 rounded-full bg-white/10 text-white font-mono text-xs uppercase hover:bg-white/20"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
