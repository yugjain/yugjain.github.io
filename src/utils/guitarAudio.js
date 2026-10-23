// Karplus-Strong Physical String Synthesis & Acoustic Guitar Sequencer

class GuitarStringSynth {
  constructor() {
    this.audioCtx = null;
    this.sampleRate = 44100;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.sampleRate = this.audioCtx.sampleRate;
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Karplus-Strong physical string synthesis into an AudioBuffer
  generateStringPluck(freq, duration = 2.2, damping = 0.993) {
    const ctx = this.initContext();
    const totalSamples = Math.floor(ctx.sampleRate * duration);
    const buffer = ctx.createBuffer(1, totalSamples, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Period length N in samples
    const N = Math.max(2, Math.round(ctx.sampleRate / freq));
    const noiseBurst = new Float32Array(N);

    // Filtered pinkish initial impulse for warm acoustic steel/nylon sound
    let lastNoise = 0;
    for (let i = 0; i < N; i++) {
      const white = Math.random() * 2 - 1;
      noiseBurst[i] = (lastNoise * 0.4 + white * 0.6) * Math.exp(-i / (N * 0.5));
      lastNoise = white;
    }

    // Copy initial burst
    for (let i = 0; i < N; i++) {
      data[i] = noiseBurst[i];
    }

    // Karplus-Strong ring buffer feedback loop with low-pass damping
    for (let i = N; i < totalSamples; i++) {
      // Average adjacent samples and scale by damping factor
      data[i] = 0.5 * (data[i - N] + data[i - N + 1]) * damping;
    }

    return buffer;
  }

  // Strum a chord across frequencies with humanized micro-delays
  strumChord(frequencies, direction = 'down', timeOffset = 0) {
    const ctx = this.initContext();
    const now = ctx.currentTime + timeOffset;
    const strumDuration = 0.028; // ~28ms per string for realistic acoustic strum

    const freqs = direction === 'down' ? [...frequencies] : [...frequencies].reverse();

    freqs.forEach((freq, idx) => {
      const buffer = this.generateStringPluck(freq, 2.4, 0.992);
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      // Acoustic body resonance filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'peaking';
      filter.frequency.setValueAtTime(180, now); // Acoustic guitar soundbox resonance
      filter.Q.setValueAtTime(1.5, now);
      filter.gain.setValueAtTime(4.0, now);

      // Lowpass to tame very high glassiness
      const toneFilter = ctx.createBiquadFilter();
      toneFilter.type = 'lowpass';
      toneFilter.frequency.setValueAtTime(4800, now);

      const gain = ctx.createGain();
      // Slight randomized volume variation for humanized touch
      const humanGain = 0.22 + (Math.random() * 0.05 - 0.025);
      gain.gain.setValueAtTime(humanGain, now + idx * strumDuration);

      source.connect(filter);
      filter.connect(toneFilter);
      toneFilter.connect(gain);
      gain.connect(ctx.destination);

      source.start(now + idx * strumDuration);
    });
  }
}

export const guitarSynth = new GuitarStringSynth();
