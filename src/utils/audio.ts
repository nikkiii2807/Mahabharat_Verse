// Web Audio API & HTML5 Audio Controller
// Crossfades between:
// 1. The serene Gita flute theme (mahabharat_flute.mp3) for the entire web & Gita section.
// 2. The dramatic Kurukshetra War theme (mahabharat_war.mp3) for the War Command Center.

class MeditativeSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private fluteAudio: HTMLAudioElement | null = null;
  private warAudio: HTMLAudioElement | null = null;
  private fluteSource: MediaElementAudioSourceNode | null = null;
  private warSource: MediaElementAudioSourceNode | null = null;
  private fluteGain: GainNode | null = null;
  private warGain: GainNode | null = null;
  private currentTrack: 'flute' | 'war' = 'flute';
  private isRunning: boolean = false;
  private volume: number = 0.5;
  private listeners: ((track: 'flute' | 'war') => void)[] = [];

  // Register state change listener
  onChange(callback: (track: 'flute' | 'war') => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private init() {
    if (this.ctx) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) {
        console.warn("Web Audio API is not supported in this browser.");
        return;
      }
      this.ctx = new AudioContextClass();

      // Master Gain for master volume fade in / fade out
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Flute theme (Gita and Main Web)
      this.fluteAudio = new Audio('/mahabharat_flute.mp3');
      this.fluteAudio.loop = true;
      this.fluteAudio.crossOrigin = "anonymous";
      this.fluteAudio.preload = "auto";
      
      this.fluteSource = this.ctx.createMediaElementSource(this.fluteAudio);
      this.fluteGain = this.ctx.createGain();
      this.fluteGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.fluteSource.connect(this.fluteGain);
      this.fluteGain.connect(this.masterGain);

      // War theme (War Command Center)
      this.warAudio = new Audio('/mahabharat_war.mp3');
      this.warAudio.loop = true;
      this.warAudio.crossOrigin = "anonymous";
      this.warAudio.preload = "auto";

      this.warSource = this.ctx.createMediaElementSource(this.warAudio);
      this.warGain = this.ctx.createGain();
      this.warGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.warSource.connect(this.warGain);
      this.warGain.connect(this.masterGain);

    } catch (e) {
      console.error("Failed to initialize Audio Player:", e);
    }
  }

  start() {
    this.init();
    if (this.isRunning) return;
    this.isRunning = true;

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      // Fade in Master volume smoothly over 1.5 seconds to user's volume setting
      this.masterGain.gain.setValueAtTime(0, now);
      this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 1.5);

      this.playActiveTrack();
    }
  }

  private playActiveTrack() {
    if (!this.isRunning || !this.ctx) return;
    const now = this.ctx.currentTime;

    if (this.currentTrack === 'flute') {
      // Fade in flute
      this.fluteAudio?.play().catch(e => console.warn("Audio play blocked by browser:", e));
      this.fluteGain?.gain.setValueAtTime(this.fluteGain.gain.value, now);
      this.fluteGain?.gain.linearRampToValueAtTime(0.7, now + 1.2);

      // Fade out war
      this.warGain?.gain.setValueAtTime(this.warGain.gain.value, now);
      this.warGain?.gain.linearRampToValueAtTime(0, now + 1.2);

      // Pause war audio after fade finishes to save resources
      setTimeout(() => {
        if (this.currentTrack === 'flute' && this.isRunning) {
          this.warAudio?.pause();
        }
      }, 1300);
    } else {
      // Fade in war
      this.warAudio?.play().catch(e => console.warn("Audio play blocked by browser:", e));
      this.warGain?.gain.setValueAtTime(this.warGain.gain.value, now);
      this.warGain?.gain.linearRampToValueAtTime(0.7, now + 1.2);

      // Fade out flute
      this.fluteGain?.gain.setValueAtTime(this.fluteGain.gain.value, now);
      this.fluteGain?.gain.linearRampToValueAtTime(0, now + 1.2);

      // Pause flute audio after fade finishes
      setTimeout(() => {
        if (this.currentTrack === 'war' && this.isRunning) {
          this.fluteAudio?.pause();
        }
      }, 1300);
    }
  }

  setTrack(track: 'flute' | 'war') {
    if (this.currentTrack === track) return;
    this.currentTrack = track;

    // Trigger state change listeners to sync the UI
    this.listeners.forEach(cb => cb(track));

    if (this.isRunning && this.ctx) {
      this.playActiveTrack();
    }
  }

  getTrack(): 'flute' | 'war' {
    return this.currentTrack;
  }

  setVolume(volume: number) {
    this.volume = volume;
    if (this.ctx && this.masterGain && this.isRunning) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(volume, now + 0.15); // Smooth glide
    }
  }

  getVolume(): number {
    return this.volume;
  }

  playConch() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc2.type = 'sawtooth';

    // Frequency sweep for the conch shell (swelling rise and fall)
    osc1.frequency.setValueAtTime(160, now);
    osc1.frequency.linearRampToValueAtTime(220, now + 0.6);
    osc1.frequency.setValueAtTime(220, now + 1.6);
    osc1.frequency.exponentialRampToValueAtTime(150, now + 2.5);

    // Detuned fifth harmonic for acoustic realism
    osc2.frequency.setValueAtTime(241, now);
    osc2.frequency.linearRampToValueAtTime(331, now + 0.6);
    osc2.frequency.setValueAtTime(331, now + 1.6);
    osc2.frequency.exponentialRampToValueAtTime(226, now + 2.5);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(550, now);
    filter.Q.setValueAtTime(8, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.35, now + 0.5); // swell in
    gainNode.gain.setValueAtTime(0.35, now + 1.8);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5); // fade out

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination); // Bypass master mute to always alert the user

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 2.6);
    osc2.stop(now + 2.6);
  }

  playDrum() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const now = this.ctx.currentTime;
    
    // Rhythmic war drum rolls
    const hitTimes = [0, 0.25, 0.5, 0.75, 1.0, 1.15, 1.3, 1.45, 1.6];
    const hitGains = [0.45, 0.45, 0.45, 0.45, 0.55, 0.55, 0.65, 0.65, 0.85];
    
    hitTimes.forEach((t, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();
      const triggerTime = now + t;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, triggerTime);
      osc.frequency.exponentialRampToValueAtTime(10, triggerTime + 0.25);

      gainNode.gain.setValueAtTime(hitGains[i], triggerTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, triggerTime + 0.25);

      osc.connect(gainNode);
      gainNode.connect(this.ctx.destination);

      osc.start(triggerTime);
      osc.stop(triggerTime + 0.27);
    });
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;

    if (this.ctx && this.masterGain) {
      try {
        const now = this.ctx.currentTime;
        // Fade out master volume
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.linearRampToValueAtTime(0, now + 1.0);

        setTimeout(() => {
          if (!this.isRunning) {
            this.fluteAudio?.pause();
            this.warAudio?.pause();
          }
        }, 1100);
      } catch (e) {
        console.error("Error pausing audio play:", e);
      }
    }
  }
}

export const meditativeSynth = new MeditativeSynth();
export default meditativeSynth;
