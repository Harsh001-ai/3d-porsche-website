/**
 * Web Audio API Flat-6 Boxer Engine Acoustic Synthesizer
 * Generates an atmospheric boxer-6 harmonic engine rumble
 * modulated by scrolling velocity and RPM.
 */
class EngineSound {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.filter = null;
    this.distortion = null;
    this.targetPitch = 120;
    this.currentPitch = 120;
    this.lastScrollTime = Date.now();
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      // Create rich harmonics for 6-cylinder flat-six engine
      // Flat 6 engine sound has characteristic 3rd order firing pulse harmonics
      const frequencies = [75, 150, 225, 300, 450];
      const gains = [0.4, 0.35, 0.2, 0.15, 0.08];

      this.oscillators = frequencies.map((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gains[i], this.ctx.currentTime);
        osc.connect(gain);
        gain.connect(this.filter);
        return { osc, gain, baseFreq: freq };
      });

      this.filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.oscillators.forEach(o => o.osc.start());
    } catch (e) {
      console.warn('Audio context initialization failed:', e);
    }
  }

  toggle() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = !this.isPlaying;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isPlaying ? 0.12 : 0;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.1);
    }
    return this.isPlaying;
  }

  updateFromScroll(scrollVelocity) {
    if (!this.isPlaying || !this.ctx) return;

    // Modulate pitch and filter frequency based on scroll speed
    const absVel = Math.min(Math.abs(scrollVelocity), 100);
    const rpmFactor = 1 + (absVel / 15);
    const targetFreq = 85 * rpmFactor;

    this.oscillators.forEach(o => {
      o.osc.frequency.setTargetAtTime(o.baseFreq * rpmFactor, this.ctx.currentTime, 0.08);
    });

    if (this.filter) {
      this.filter.frequency.setTargetAtTime(600 + (absVel * 25), this.ctx.currentTime, 0.08);
    }

    if (this.masterGain) {
      const dynamicVolume = Math.min(0.22, 0.10 + (absVel / 400));
      this.masterGain.gain.setTargetAtTime(dynamicVolume, this.ctx.currentTime, 0.05);
    }
  }
}

export const soundEngine = new EngineSound();
