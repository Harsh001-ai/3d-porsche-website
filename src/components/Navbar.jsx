import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Gauge } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const active = soundEngine.toggle();
    setSoundActive(active);
  };

  const navLinks = [
    { name: 'Overview', href: '#hero' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Engineering', href: '#engineering' },
    { name: 'Gallery', href: '#gallery' },
    { name: '360° View', href: '#interactive-3d' },
    { name: 'Cockpit', href: '#cockpit' },
    { name: 'Telemetry', href: '#telemetry' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0d1015]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0b0d10]/90 via-[#0b0d10]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Brand & Model */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="font-syncopate text-xs tracking-[0.35em] text-white/70 group-hover:text-white transition-colors">
              PORSCHE
            </span>
            <div className="flex items-center gap-2">
              <span className="font-syncopate text-lg font-bold tracking-wider text-white">
                911
              </span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-red-600/90 text-white tracking-widest uppercase">
                GT3 RS
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] font-mono text-zinc-400 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-red-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Action Group */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Engine Sound Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? 'Mute Flat-6 Engine Sound' : 'Play Flat-6 Atmospheric Engine Audio'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
              soundActive
                ? 'bg-red-600/20 border-red-500/60 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
            }`}
          >
            {soundActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="hidden sm:inline">FLAT-6 ON</span>
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2 bg-red-500 animate-ping" />
                  <span className="w-0.5 h-3 bg-red-500 animate-pulse" />
                  <span className="w-0.5 h-1.5 bg-red-500" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-zinc-400" />
                <span className="hidden sm:inline">ENGINE SFX</span>
              </>
            )}
          </button>

          {/* CTA Button */}
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase bg-white text-black hover:bg-red-600 hover:text-white transition-all duration-300 shadow-md group"
          >
            <span>Configure</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1015]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest font-mono text-zinc-300 hover:text-red-500 py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href="#cta"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 rounded-lg bg-red-600 text-white font-mono text-xs uppercase tracking-wider font-semibold"
              >
                Configure GT3 RS
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
