import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCw, ZoomIn, ZoomOut, RotateCcw, MoveHorizontal, Compass, Crosshair, Sparkles } from 'lucide-react';

const TOTAL_ORBIT_FRAMES = 240;

const getOrbitFramePath = (index) => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${frameNum}.jpg`;
};

export default function InteractiveOrbitalViewer() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startFrameRef = useRef(0);
  const isVisibleRef = useRef(false);

  const [currentFrame, setCurrentFrame] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeLivery, setActiveLivery] = useState('pyroRed');
  const [activeHotspot, setActiveHotspot] = useState(null);

  const liveries = {
    pyroRed: { name: 'Motorsport Pyro Red (Signature)', tint: 'none', filter: 'none' },
    stealthCarbon: { name: 'Stealth Weissach Carbon', tint: '#1f2937', filter: 'saturate(0.7) contrast(1.15)' },
    acidGreen: { name: 'Acid Green Motorsport Accent', tint: '#84cc16', filter: 'hue-rotate(65deg)' },
    racingBlue: { name: 'Shark Blue Clubsport Accent', tint: '#0284c7', filter: 'hue-rotate(185deg)' },
  };

  const anglePresets = [
    { label: 'Profile (0°)', frame: 0, angle: '0°' },
    { label: 'Front Flank (45°)', frame: 60, angle: '45°' },
    { label: 'Aero 3/4 Flank (90°)', frame: 120, angle: '90°' },
    { label: 'Rear Orbit (135°)', frame: 175, angle: '135°' },
    { label: 'Rear Command (180°)', frame: 239, angle: '180°' },
  ];

  // Draw frame to canvas
  const drawFrame = useCallback((frameIdx, zoom, liveryKey) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = getOrbitFramePath(frameIdx);
    img.onload = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      ctx.save();
      ctx.scale(dpr, dpr);

      const canvasW = rect.width;
      const canvasH = rect.height;
      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;

      const imgRatio = imgW / imgH;
      const canvasRatio = canvasW / canvasH;

      let drawW, drawH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawW = canvasW * zoom;
        drawH = (canvasW / imgRatio) * zoom;
        offsetX = -(drawW - canvasW) / 2;
        offsetY = (canvasH - drawH) / 2;
      } else {
        drawH = canvasH * zoom;
        drawW = (canvasH * imgRatio) * zoom;
        offsetX = (canvasW - drawW) / 2;
        offsetY = -(drawH - canvasH) / 2;
      }

      ctx.fillStyle = '#0a0c10';
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Apply CSS filter if non-default livery
      if (liveries[liveryKey]?.filter !== 'none') {
        ctx.filter = liveries[liveryKey].filter;
      } else {
        ctx.filter = 'none';
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      ctx.restore();
    };
  }, []);

  // Lazy-load observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisibleRef.current = true;
          drawFrame(currentFrame, zoomLevel, activeLivery);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [drawFrame, currentFrame, zoomLevel, activeLivery]);

  // Redraw when parameters change
  useEffect(() => {
    if (isVisibleRef.current) {
      drawFrame(currentFrame, zoomLevel, activeLivery);
    }
  }, [currentFrame, zoomLevel, activeLivery, drawFrame]);

  // Mouse & Touch Drag Interaction
  const handleStart = (clientX) => {
    isDraggingRef.current = true;
    startXRef.current = clientX;
    startFrameRef.current = currentFrame;
  };

  const handleMove = (clientX) => {
    if (!isDraggingRef.current) return;
    const deltaX = clientX - startXRef.current;
    // Map drag distance: every 4px of horizontal drag equals 1 frame
    const frameDelta = Math.floor(deltaX / 4);
    let nextFrame = startFrameRef.current + frameDelta;

    // Clamp or loop within 0 - 239
    if (nextFrame < 0) nextFrame = 0;
    if (nextFrame >= TOTAL_ORBIT_FRAMES) nextFrame = TOTAL_ORBIT_FRAMES - 1;

    setCurrentFrame(nextFrame);
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  const currentAngleDegrees = Math.round((currentFrame / (TOTAL_ORBIT_FRAMES - 1)) * 180);

  return (
    <section id="interactive-3d" ref={containerRef} className="relative w-full bg-[#090b0e] py-28 px-6 md:px-12 lg:px-20 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-red-500 block mb-2">
              05 — 360° ORBITAL INSPECTION
            </span>
            <h2 className="font-syncopate text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white">
              INTERACTIVE <span className="text-red-500">EXPLORATION</span>
            </h2>
          </div>
          <div className="font-mono text-xs text-zinc-400 max-w-md">
            <span>Direct vehicle inspection. Drag horizontally across the vehicle or select preset camera vectors.</span>
          </div>
        </div>

        {/* Interactive Turntable Workspace */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c0e12] shadow-2xl">
          {/* Top Telemetry & Angle Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 md:px-8 border-b border-white/10 bg-black/40 font-mono text-xs">
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-red-500 animate-spin" />
              <span className="text-white font-semibold">ORBIT BEARING: {currentAngleDegrees}°</span>
              <span className="text-zinc-600">/</span>
              <span className="text-zinc-400">FRAME {String(currentFrame + 1).padStart(3, '0')} / {TOTAL_ORBIT_FRAMES}</span>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-[11px]">
              <MoveHorizontal className="w-4 h-4 text-red-400 animate-pulse" />
              <span>CLICK & DRAG HORIZONTALLY TO ROTATE</span>
            </div>
          </div>

          {/* Interactive Canvas Stage */}
          <div
            className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#07080a] cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => handleStart(e.clientX)}
            onMouseMove={(e) => handleMove(e.clientX)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
          >
            <canvas ref={canvasRef} className="w-full h-full object-cover" />

            {/* Drag Guidance Cue */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none glass-panel px-4 py-1.5 rounded-full flex items-center gap-2 font-mono text-[11px] text-zinc-300">
              <MoveHorizontal className="w-3.5 h-3.5 text-red-500" />
              <span>DRAG TO ROTATE 360°</span>
            </div>
          </div>

          {/* Controls & Presets Footer */}
          <div className="p-6 md:p-8 border-t border-white/10 bg-[#0a0c10] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Angle Presets */}
            <div className="lg:col-span-7 flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest mr-2 block sm:inline">
                CAMERA VECTORS:
              </span>
              {anglePresets.map((preset) => (
                <button
                  key={preset.frame}
                  onClick={() => setCurrentFrame(preset.frame)}
                  className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all ${
                    Math.abs(currentFrame - preset.frame) < 15
                      ? 'bg-red-600 text-white font-bold shadow-md'
                      : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Zoom & Reset Tools */}
            <div className="lg:col-span-5 flex items-center justify-start lg:justify-end gap-3">
              <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  className="p-1.5 text-zinc-400 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs px-2 text-white">{zoomLevel.toFixed(1)}x</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2, z + 0.25))}
                  className="p-1.5 text-zinc-400 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  setCurrentFrame(0);
                  setZoomLevel(1);
                  setActiveLivery('pyroRed');
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs transition-colors border border-white/10"
                title="Reset Camera"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
