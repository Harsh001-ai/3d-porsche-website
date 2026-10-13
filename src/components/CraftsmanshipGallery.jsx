import React, { useState } from 'react';
import { Eye, Maximize2, Shield, Sparkles, X, ChevronRight } from 'lucide-react';

export default function CraftsmanshipGallery() {
  const [activeModalItem, setActiveModalItem] = useState(null);

  const galleryItems = [
    {
      id: 'rear-wing',
      title: 'Swan-Neck DRS Carbon Wing',
      category: 'ACTIVE AERODYNAMICS',
      frame: '/frames/ezgif-frame-160.jpg',
      aspect: 'col-span-1 lg:col-span-8 row-span-2 min-h-[420px]',
      cropPosition: 'center 40%',
      summary: 'Engineered taller than the roofline to operate in clean, undisturbed airflow. Hydraulic rams pivot the upper carbon blade continuously between high downforce and low-drag DRS mode.',
      specs: '1,500 mm blade width • 860 kg total downforce • Carbon-fibre reinforced polymer (CFRP)',
    },
    {
      id: 'wheels-brakes',
      title: 'Pyro Red Center-Lock Forged Wheels',
      category: 'UNSPRUNG ROTATIONAL MASS',
      frame: '/frames/ezgif-frame-095.jpg',
      aspect: 'col-span-1 lg:col-span-4 min-h-[300px]',
      cropPosition: '45% 65%',
      summary: 'Lightweight forged magnesium wheels saving 8 kg of unsprung mass. Paired with 410 mm front Porsche Ceramic Composite Brakes (PCCB) clamped by 6-piston monobloc calipers.',
      specs: 'Front: 275/35 ZR 20 on 10 J x 20 • Rear: 335/30 ZR 21 on 13 J x 21',
    },
    {
      id: 'roof-fins',
      title: 'Roof Aerofoil Guide Fins',
      category: 'THERMAL FLUID DYNAMICS',
      frame: '/frames/ezgif-frame-130.jpg',
      aspect: 'col-span-1 lg:col-span-4 min-h-[300px]',
      cropPosition: 'center 30%',
      summary: 'Twin black aerofoil fins mounted along the carbon roof divide air exiting the central radiator, channeling warm air outward to preserve ambient cold air density for the rear engine intake.',
      specs: 'CFRP lightweight construction • Active boundary layer separation',
    },
    {
      id: 'diffuser-exhaust',
      title: 'Titanium Sport Exhaust & Diffuser',
      category: 'ACOUSTICS & UNDERBODY FLOW',
      frame: '/frames/ezgif-frame-235.jpg',
      aspect: 'col-span-1 lg:col-span-6 min-h-[320px]',
      cropPosition: 'center 85%',
      summary: 'Dual centrally positioned thin-walled titanium exhaust pipes delivering an unfiltered atmospheric 9,000 RPM flat-6 acoustic signature, framed by a functional carbon underbody diffuser.',
      specs: 'Thin-walled titanium • Integrated air extraction channels',
    },
    {
      id: 'front-louvres',
      title: 'Front Wheel Arch Carbon Louvres',
      category: 'PRESSURE EQUALIZATION',
      frame: '/frames/ezgif-frame-070.jpg',
      aspect: 'col-span-1 lg:col-span-6 min-h-[320px]',
      cropPosition: '30% 60%',
      summary: 'Motorsport slats integrated into the front wings alleviate wheel arch overpressure at high speeds, directly reducing front-axle aerodynamic lift and stabilizing steering feedback.',
      specs: 'CFRP louvered gills • Active downforce stabilization',
    },
  ];

  return (
    <section id="gallery" className="relative w-full bg-[#08090c] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              04 — CRAFTSMANSHIP & AERODYNAMICS
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              CRAFTED FOR <span className="text-red-500">SPEED</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-md">
            An intimate editorial inspection of the components engineered to withstand extreme sustained aerodynamic forces.
          </p>
        </div>

        {/* Asymmetrical Automotive Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveModalItem(item)}
              className={`group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0f14] cursor-pointer transition-all duration-500 hover:border-red-500/50 ${item.aspect}`}
            >
              <img
                src={item.frame}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                style={{ objectPosition: item.cropPosition }}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Bottom Information Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex flex-col justify-end space-y-1.5 z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-red-400">
                    {item.category}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-mono text-[10px] text-zinc-400">
                    <span>INSPECT DETAIL</span>
                    <ChevronRight className="w-3.5 h-3.5 text-red-500" />
                  </span>
                </div>
                <h3 className="font-syncopate text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-300 font-light line-clamp-2 max-w-xl">
                  {item.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Inspection Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-white/20 bg-[#0d0f14] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-red-500">
                  {activeModalItem.category}
                </span>
                <h4 className="font-syncopate text-lg sm:text-2xl font-bold uppercase text-white mt-1">
                  {activeModalItem.title}
                </h4>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Inspection Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Visual & Technical Content */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 relative">
                <img
                  src={activeModalItem.frame}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-8">
                  <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-2">
                    ENGINEERING ARCHITECTURE
                  </span>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
                    {activeModalItem.summary}
                  </p>
                </div>
                <div className="md:col-span-4 p-4 rounded-xl bg-black/50 border border-white/5 space-y-2">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                    MANUFACTURING SPECIFICATION
                  </span>
                  <p className="font-mono text-xs text-white">
                    {activeModalItem.specs}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
