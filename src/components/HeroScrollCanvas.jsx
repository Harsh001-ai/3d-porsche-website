import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Play, Pause, RotateCcw, Zap, Wind, Shield, Trophy } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

const getFramePath = (index) => {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${frameNum}.jpg`;
};

export default function HeroScrollCanvas() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const animFrameRef = useRef(null);

  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingTour, setIsPlayingTour] = useState(false);

  // High performance canvas renderer
  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Graceful fallback to nearest available loaded frame
      let fallbackImg = null;
      for (let offset = 1; offset < 25; offset++) {
        if (imagesRef.current[frameIndex - offset]?.complete) {
          fallbackImg = imagesRef.current[frameIndex - offset];
          break;
        }
        if (imagesRef.current[frameIndex + offset]?.complete) {
          fallbackImg = imagesRef.current[frameIndex + offset];
          break;
        }
      }
      if (!fallbackImg && imagesRef.current[0]?.complete) {
        fallbackImg = imagesRef.current[0];
      }
      if (!fallbackImg) return;
      drawScaledImage(ctx, canvas, fallbackImg);
      return;
    }

    drawScaledImage(ctx, canvas, img);
  }, []);

  const drawScaledImage = (ctx, canvas, img) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.floor(rect.width * dpr);
    const targetH = Math.floor(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const canvasW = rect.width;
    const canvasH = rect.height;
    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;

    const imgRatio = imgW / imgH;
    const canvasRatio = canvasW / canvasH;

    let drawW, drawH, offsetX, offsetY;

    // Cinematic cover mode: maintain aspect ratio while covering viewport
    if (canvasRatio > imgRatio) {
      drawW = canvasW;
      drawH = canvasW / imgRatio;
      offsetX = 0;
      offsetY = (canvasH - drawH) / 2;
    } else {
      drawH = canvasH;
      drawW = canvasH * imgRatio;
      offsetX = (canvasW - drawW) / 2;
      offsetY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.fillStyle = '#0b0d10';
    ctx.fillRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);

    // Subtle edge vignette
    const gradient = ctx.createRadialGradient(
      canvasW / 2,
      canvasH / 2,
      Math.min(canvasW, canvasH) * 0.45,
      canvasW / 2,
      canvasH / 2,
      Math.max(canvasW, canvasH) * 0.85
    );
    gradient.addColorStop(0, 'rgba(11, 13, 16, 0)');
    gradient.addColorStop(1, 'rgba(11, 13, 16, 0.4)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasW, canvasH);

    ctx.restore();
  };

  // Preload sequence
  useEffect(() => {
    let loaded = 0;
    const images = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Immediate load of frame 0
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      loaded++;
      setLoadedCount(loaded);
      renderFrame(0);
    };

    // Progressive batch load
    const loadBatch = (startIndex, batchSize) => {
      for (let i = startIndex; i < Math.min(startIndex + batchSize, TOTAL_FRAMES); i++) {
        if (i === 0) continue;
        const img = new Image();
        img.src = getFramePath(i);
        images[i] = img;

        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          if (loaded >= 20 && !isReady) setIsReady(true);
        };
        img.onerror = () => {
          loaded++;
          setLoadedCount(loaded);
        };
      }

      if (startIndex + batchSize < TOTAL_FRAMES) {
        setTimeout(() => loadBatch(startIndex + batchSize, batchSize), 35);
      }
    };

    loadBatch(1, 15);

    const handleResize = () => renderFrame(currentFrameIndex);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [renderFrame]);

  // Setup GSAP ScrollTrigger
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollY = window.scrollY;
    let lastTime = Date.now();

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=400%', // 400vh scroll budget for silky deliberate frame scrubbing
      pin: true,
      scrub: 0.6, // Silky inertial smoothing
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);

        const targetFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        );

        setCurrentFrameIndex(targetFrame);
        renderFrame(targetFrame);

        // Calculate velocity for engine acoustics
        const now = Date.now();
        const dt = Math.max(1, now - lastTime);
        const currentY = window.scrollY;
        const velocity = (Math.abs(currentY - lastScrollY) / dt) * 100;
        lastScrollY = currentY;
        lastTime = now;

        soundEngine.updateFromScroll(velocity);
      },
    });

    return () => trigger.kill();
  }, [renderFrame]);

  // Play / Pause automated preview
  useEffect(() => {
    let interval;
    if (isPlayingTour) {
      interval = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          const next = (prev + 1) % TOTAL_FRAMES;
          renderFrame(next);
          setScrollProgress(next / (TOTAL_FRAMES - 1));
          return next;
        });
      }, 42); // 24 FPS
    }
    return () => clearInterval(interval);
  }, [isPlayingTour, renderFrame]);

  const handleScrubberChange = (e) => {
    const frame = parseInt(e.target.value, 10);
    setCurrentFrameIndex(frame);
    renderFrame(frame);
    setScrollProgress(frame / (TOTAL_FRAMES - 1));
  };

  // Determine active phase
  // Phase 1: 0% - 18% (Opening profile; let the video's 911 artwork shine with zero clutter)
  // Phase 2: 20% - 50% (Pan & push-in into flank and wheel; card on left)
  // Phase 3: 52% - 76% (Swan neck rear wing rotation; card on top-left)
  // Phase 4: 78% - 100% (Centred rear stance; benchmark badge on bottom-left)
  const isPhase1 = scrollProgress < 0.18;
  const isPhase2 = scrollProgress >= 0.18 && scrollProgress < 0.52;
  const isPhase3 = scrollProgress >= 0.52 && scrollProgress < 0.78;
  const isPhase4 = scrollProgress >= 0.78;

  const currentDrsStatus = scrollProgress > 0.45 ? 'ACTIVE (DOWNFORCE 860 KG)' : 'STANDARD (LOW DRAG)';

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen bg-[#0b0d10] overflow-hidden select-none">
      {/* High-Performance Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Atmospheric lighting gradient */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-[#0b0d10] via-transparent to-[#0b0d10]/40 opacity-80" />

      {/* Progressive loading badge */}
      {loadedCount < TOTAL_FRAMES && (
        <div className="absolute top-20 right-6 md:right-10 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-[10px] tracking-widest text-zinc-300 uppercase">
            CALIBRATING ASSETS {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
          </span>
          <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Scrollytelling Visual Interface */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 md:p-12 lg:p-16">
        {/* Top Telemetry Bar - Fades in dynamically when video's native text fades away */}
        <div
          className={`flex items-center justify-between pt-16 md:pt-14 transition-all duration-500 ${
            scrollProgress > 0.15 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2.5 glass-panel px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-medium">
              TELEMETRY ARCHIVE // TYPE-992
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 font-mono text-xs text-zinc-300 tracking-wider glass-panel px-4 py-1.5 rounded-full">
            <div>
              <span className="text-zinc-500">DRS: </span>
              <span className="text-red-400 font-semibold">{currentDrsStatus}</span>
            </div>
            <div>
              <span className="text-zinc-500">FRAME: </span>
              <span className="text-white font-semibold">
                {String(currentFrameIndex + 1).padStart(3, '0')} / {TOTAL_FRAMES}
              </span>
            </div>
            <div>
              <span className="text-zinc-500">INDEX: </span>
              <span className="text-white font-semibold">{Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Dynamic Storytelling Callouts (Positioned intentionally to NEVER cover the car) */}
        <div className="relative w-full max-w-xl my-auto">


          {/* PHASE 2: Dynamic Pan & Aerodynamic Architecture */}
          <div
            className={`transition-all duration-500 transform ${
              isPhase2
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none hidden'
            }`}
          >
            <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-lg border border-red-500/20 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-xs font-mono text-red-400 mb-3 tracking-widest uppercase">
                <Wind className="w-3.5 h-3.5 text-red-400" />
                <span>ACTIVE HYDRAULIC DRS</span>
              </div>
              <h2 className="font-syncopate text-xl sm:text-3xl font-bold tracking-tight text-white uppercase leading-tight">
                AERODYNAMIC <br />
                <span className="text-red-500">ARCHITECTURE</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Generates <strong className="text-white font-semibold">860 kg of downforce</strong> at 285 km/h—triple the downforce of the previous 991.2 generation. Features continuously adjustable front flaps and roof airfoils.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-zinc-300">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  • Front Diffuser Flaps
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  • Wheel Arch Louvres
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  • Teardrop Axle Arms
                </span>
              </div>
            </div>
          </div>

          {/* PHASE 3: 4.0L Atmospheric Flat-6 Boxer Soul */}
          <div
            className={`transition-all duration-500 transform ${
              isPhase3
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none hidden'
            }`}
          >
            <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-lg border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-red-400 mb-3 tracking-widest uppercase">
                <Shield className="w-3.5 h-3.5 text-red-500" />
                <span>HEART OF WEISSACH</span>
              </div>
              <h2 className="font-syncopate text-xl sm:text-3xl font-bold tracking-tight text-white uppercase leading-tight">
                HIGH-REVVING <br />
                <span className="text-red-500">4.0L BOXER-SIX</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Engineered with individual throttle butterflies and rigid motorsport valve drive. Breathes freely up to <strong className="text-white font-semibold">9,000 RPM</strong> without turbocharging lag.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">POWER RATIO</span>
                  <span className="text-white font-bold">2.76 kg / PS</span>
                </div>
                <div className="p-2.5 bg-black/40 rounded-lg border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">0–100 KM/H</span>
                  <span className="text-red-400 font-bold">3.20 SECONDS</span>
                </div>
              </div>
            </div>
          </div>

          {/* PHASE 4: Rear Swan-Neck Climax & Benchmark */}
          <div
            className={`transition-all duration-500 transform ${
              isPhase4
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none hidden'
            }`}
          >
            <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-lg border border-red-500/30 shadow-2xl backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-xs font-mono text-red-400 mb-3 tracking-widest uppercase">
                <Trophy className="w-3.5 h-3.5 text-red-400" />
                <span>NÜRBURGRING BENCHMARK</span>
              </div>
              <h2 className="font-syncopate text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
                6:49.328 <span className="text-red-500 text-lg sm:text-xl font-normal">MIN</span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                Official lap record on the 20.8 km Nürburgring Nordschleife. Extreme swan-neck carbon wing and titanium exhaust commanding the asphalt.
              </p>
              <div className="mt-5 pointer-events-auto">
                <a
                  href="#aerodynamics"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  <span>Explore Telemetry Specs</span>
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Control HUD & Timeline Scrubber */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 pointer-events-auto">
          {/* Left Actions: Play Preview & Reset */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingTour(!isPlayingTour)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
              title={isPlayingTour ? 'Pause automated tour' : 'Play automated orbit preview'}
            >
              {isPlayingTour ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span>Pause Orbit</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-red-400" />
                  <span>Cinematic Tour</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentFrameIndex(0);
                renderFrame(0);
                setScrollProgress(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset to Frame 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400">
              <div className="w-3.5 h-6 rounded-full border border-zinc-500 flex items-start justify-center p-1">
                <div className="w-1 h-1.5 bg-red-500 rounded-full animate-bounce" />
              </div>
              <span className="text-[11px] tracking-wider uppercase">Scroll to scrub camera</span>
            </div>
          </div>

          {/* Right Scrubber Slider */}
          <div className="flex items-center gap-3 w-full sm:w-72">
            <span className="font-mono text-[10px] text-zinc-400 font-semibold">001</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={TOTAL_FRAMES - 1}
                value={currentFrameIndex}
                onChange={handleScrubberChange}
                aria-label="Frame Timeline Scrubber"
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
              />
            </div>
            <span className="font-mono text-[10px] text-zinc-400 font-semibold">240</span>
          </div>
        </div>
      </div>
    </section>
  );
}
