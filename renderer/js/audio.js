/**
 * Procedural rain, soft chimes and optional Chinese speech.
 * No audio files are needed, which keeps the pet self-contained.
 */

export class PetAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.rainGain = null;
    this.started = false;
    this.enabled = true;
    this.volume = 0.45;
    this.voiceEnabled = false;
    this.lang = 'zh';
    this.rainNodes = [];
    this.lastChime = 0;
    this.speech = window.speechSynthesis || null;
  }

  async unlock() {
    if (this.started) {
      if (this.ctx?.state === 'suspended') await this.ctx.resume();
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.enabled ? this.volume : 0;
    this.master.connect(this.ctx.destination);
    this.started = true;
    this._startRain();
    if (this.ctx.state === 'suspended') await this.ctx.resume();
  }

  _startRain() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const seconds = 4;
    const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = last * 0.985 + white * 0.015;
      data[i] = last * 2.2;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 1500;
    lowpass.Q.value = 0.4;
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.value = 280;
    const gain = ctx.createGain();
    gain.gain.value = 0.26;
    source.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.master);
    source.start();

    // A thin layer of surface hiss.
    const buffer2 = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d2 = buffer2.getChannelData(0);
    for (let i = 0; i < d2.length; i += 1) d2[i] = (Math.random() * 2 - 1) * 0.2;
    const src2 = ctx.createBufferSource();
    src2.buffer = buffer2;
    src2.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 4200;
    bp.Q.value = 0.6;
    const g2 = ctx.createGain();
    g2.gain.value = 0.028;
    src2.connect(bp);
    bp.connect(g2);
    g2.connect(this.master);
    src2.start();
    this.rainGain = gain;
    this.rainNodes = [source, src2, gain, g2];
  }

  setEnabled(enabled) {
    this.enabled = Boolean(enabled);
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(this.enabled ? this.volume : 0, this.ctx.currentTime, 0.08);
    }
    if (!enabled && this.speech) this.speech.cancel();
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, Number(value) || 0));
    if (this.master && this.ctx && this.enabled) {
      this.master.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.06);
    }
  }

  setVoice(enabled) {
    this.voiceEnabled = Boolean(enabled);
    if (!enabled && this.speech) this.speech.cancel();
  }

  setLanguage(lang = 'zh') {
    this.lang = lang === 'en' ? 'en' : 'zh';
    if (this.speech) this.speech.cancel();
  }

  speak(text) {
    if (!this.voiceEnabled || !this.speech || !text) return;
    try {
      this.speech.cancel();
      const english = this.lang === 'en';
      const utterance = new SpeechSynthesisUtterance(String(text).replace(/[“”「」]/g, ''));
      utterance.lang = english ? 'en-US' : 'zh-CN';
      utterance.rate = english ? 1.0 : 0.97;
      utterance.pitch = english ? 1.03 : 1.12;
      utterance.volume = Math.min(0.9, this.volume + 0.15);
      const voices = this.speech.getVoices().filter((v) => (
        english ? /en|English/i.test(`${v.lang} ${v.name}`) : /zh|Chinese/i.test(`${v.lang} ${v.name}`)
      ));
      const preferred = voices.find((v) => (
        english
          ? /Microsoft|Aria|Jenny|Zira|Sonia|Libby/i.test(v.name)
          : /Microsoft|Xiaoxiao|Huihui|Yaoyao|Tingting/i.test(v.name)
      )) || voices[0];
      if (preferred) utterance.voice = preferred;
      this.speech.speak(utterance);
    } catch { /* speech is entirely optional */ }
  }

  _tone(freq, when, duration, type = 'sine', volume = 0.08) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(volume, when + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start(when);
    osc.stop(when + duration + 0.05);
  }

  chime(kind = 'tap') {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    if (now - this.lastChime < 0.035) return;
    this.lastChime = now;
    if (kind === 'pat') {
      this._tone(523.25, now, 0.22, 'sine', 0.055);
      this._tone(783.99, now + 0.06, 0.3, 'sine', 0.04);
    } else if (kind === 'hat') {
      this._tone(880, now, 0.12, 'triangle', 0.04);
      this._tone(1174.66, now + 0.07, 0.18, 'triangle', 0.028);
    } else if (kind === 'collect') {
      this._tone(1046.5, now, 0.1, 'sine', 0.04);
      this._tone(1567.98, now + 0.045, 0.18, 'sine', 0.032);
    } else if (kind === 'focus') {
      [392, 523.25, 659.25, 783.99].forEach((f, i) => this._tone(f, now + i * 0.11, 0.55, 'sine', 0.035));
    } else if (kind === 'celebrate') {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => this._tone(f, now + i * 0.09, 0.4, 'triangle', 0.035));
    } else if (kind === 'error') {
      this._tone(196, now, 0.18, 'square', 0.02);
    } else {
      this._tone(740, now, 0.08, 'triangle', 0.025);
    }
  }

  tick() {
    this.chime('tap');
  }

  stop() {
    if (!this.ctx) return;
    try {
      this.rainNodes.forEach((node) => {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      });
      this.ctx.close();
    } catch { /* noop */ }
    this.ctx = null;
    this.started = false;
  }
}
