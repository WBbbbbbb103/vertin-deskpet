/**
 * Vertin pixel companion stage.
 *
 * The character is the provided 24 × 24 pixel sprite, kept crisp at an integer
 * scale. All desktop-pet features are layered around it with Canvas 2D:
 * idle float, a small jump, hearts, sparks, a pixel focus ring and an optional
 * tea cup. The interface remains DOM-based, so text stays sharp.
 */

const SPRITE_SIZE = 26;
const SPRITE_URL = new URL('../../assets/vertin-pixel.png', import.meta.url).href;
const WARDROBE_URLS = {
  'hat-band': new URL('../../assets/wardrobe/hat-band.png', import.meta.url).href,
  'rain-hat': new URL('../../assets/wardrobe/rain-hat.png', import.meta.url).href,
  coat: new URL('../../assets/wardrobe/coat.png', import.meta.url).href,
  scarf: new URL('../../assets/wardrobe/scarf.png', import.meta.url).href,
  monocle: new URL('../../assets/wardrobe/monocle.png', import.meta.url).href,
  umbrella: new URL('../../assets/wardrobe/umbrella.png', import.meta.url).href,
  'case-tag': new URL('../../assets/wardrobe/case-tag.png', import.meta.url).href,
  'outfit-rain': new URL('../../assets/wardrobe/outfit-rain.png', import.meta.url).href,
  'outfit-formal': new URL('../../assets/wardrobe/outfit-formal.png', import.meta.url).href,
  'blue-neckerchief': new URL('../../assets/wardrobe/blue-neckerchief.png', import.meta.url).href,
  'field-notebook': new URL('../../assets/wardrobe/field-notebook.png', import.meta.url).href,
  'tea-cup': new URL('../../assets/wardrobe/tea-cup.png', import.meta.url).href,
  'pocket-watch': new URL('../../assets/wardrobe/pocket-watch.png', import.meta.url).href,
  'field-camera': new URL('../../assets/wardrobe/field-camera.png', import.meta.url).href,
  'case-photo': new URL('../../assets/wardrobe/case-photo.png', import.meta.url).href,
  'night-lantern': new URL('../../assets/wardrobe/night-lantern.png', import.meta.url).href,
  'outfit-field': new URL('../../assets/wardrobe/outfit-field.png', import.meta.url).href,
};

const HEART = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const SPARK = [
  [0, 1, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function alphaAt(sprite, x, y) {
  try {
    const c = document.createElement('canvas');
    c.width = sprite.width;
    c.height = sprite.height;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(sprite, 0, 0);
    return ctx.getImageData(x, y, 1, 1).data[3];
  } catch {
    return 255;
  }
}

export class PetScene {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.sprite = new Image();
    this.sprite.decoding = 'async';
    this.sprite.src = SPRITE_URL;
    this.spriteReady = false;
    this.spriteError = false;
    this.sprite.addEventListener('load', () => { this.spriteReady = true; });
    this.sprite.addEventListener('error', () => { this.spriteError = true; });
    this.wardrobe = { outfit: null, hat: 'hat', coat: null, neck: null, face: null, held: null, case: null };
    this.wardrobeImages = {};
    for (const [id, url] of Object.entries(WARDROBE_URLS)) {
      const image = new Image();
      image.decoding = 'async';
      image.src = url;
      this.wardrobeImages[id] = image;
    }

    this.time = 0;
    this.lastFrame = performance.now();
    this.pointer = { x: 0, y: 0, tx: 0, ty: 0, inside: false, lastAt: 0 };
    this.look = 0;
    this.bobPhase = Math.random() * Math.PI * 2;
    this.raf = null;

    this.state = {
      blink: 0,
      nextBlink: 3.2,
      happyUntil: 0,
      accessory: { hat: true },
    };
    this.char = {
      state: this.state,
      happy: (seconds = 1.6) => this.happy(seconds),
      setAccessory: (name, enabled) => this.setAccessory(name, enabled),
      blinkNow: () => { this.state.blink = 0.12; },
    };

    this.layout = { w: 420, h: 620, scale: 12, size: 312, x: 54, y: 223 };
    this.jumpT = -1;
    this.jumpPower = 1;
    this.hatTipT = -1;
    this.happyUntil = 0;
    this.focusActive = false;
    this.rainEnabled = false;
    this.rain = [];
    this.teaUntil = 0;
    this.action = null;
    this.actionStart = 0;
    this.actionEnd = 0;
    this.lastIdleAction = '';
    this.photoFlashUntil = 0;
    this.dragging = false;
    this.hearts = [];
    this.sparks = [];
    this.ambientSeeds = Array.from({ length: 3 }, (_, i) => ({
      x: i === 0 ? 0.08 : i === 1 ? 0.92 : 0.18,
      y: 0.3 + i * 0.2,
      phase: Math.random() * Math.PI * 2,
      drift: 0.18 + Math.random() * 0.22,
    }));
    this.previewMode = false;
    this.previewView = 'threequarter';
    this.petScale = 0.25;
    this.pixelRatioTarget = 1;
    this.backGlow = { visible: false };
    this.bokeh = [];
    this.motes = [];

    this.resize();
    this._onResize = () => this.resize();
    window.addEventListener('resize', this._onResize);
    this._onVisibility = () => {
      this.lastFrame = performance.now();
    };
    document.addEventListener('visibilitychange', this._onVisibility);
    this._loop = this._loop.bind(this);
    this.raf = requestAnimationFrame(this._loop);
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const w = Math.max(240, Math.round(rect.width || 420));
    const h = Math.max(320, Math.round(rect.height || 620));
    this.canvas.width = w;
    this.canvas.height = h;
    this.ctx.imageSmoothingEnabled = false;

    const compact = w < 380;
    let scale;
    if (this.previewMode) {
      scale = Math.max(8, Math.floor(Math.min(w * 0.72, h * 0.78) / SPRITE_SIZE));
    } else {
      const base = compact ? 10 : 12;
      scale = Math.max(2, Math.round(base * this.petScale));
    }
    const size = SPRITE_SIZE * scale;
    const x = Math.round((w - size) / 2);
    const y = this.previewMode
      ? Math.round((h - size) / 2)
      : (this.petScale < 0.5 ? Math.round(h - size - 200) : Math.round(h * 0.36));
    this.layout = { w, h, scale, size, x, y };
    this.ensureRain();
  }

  setPetScale(value = 0.25) {
    this.petScale = Math.max(0.2, Math.min(1, Number(value) || 0.25));
    this.resize();
    return this.petScale;
  }

  setPreviewView(view = 'threequarter') {
    this.previewMode = true;
    this.previewView = view;
    this.resize();
  }

  ensureRain() {
    if (this.rain.length) return;
    for (let i = 0; i < 22; i += 1) {
      this.rain.push({
        x: Math.random(),
        y: Math.random(),
        speed: 0.25 + Math.random() * 0.55,
        len: 2 + Math.random() * 4,
      });
    }
  }

  setPointer(clientX, clientY, inside = true) {
    const r = this.canvas.getBoundingClientRect();
    const nx = ((clientX - r.left) / Math.max(1, r.width)) * 2 - 1;
    this.pointer.tx = clamp(nx, -1, 1);
    this.pointer.ty = clamp((((clientY - r.top) / Math.max(1, r.height)) * 2 - 1), -1, 1);
    this.pointer.inside = inside;
    this.pointer.lastAt = performance.now();
  }

  clearPointer() {
    this.pointer.inside = false;
  }

  raycast(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    const x = clientX - r.left;
    const y = clientY - r.top;
    const { x: bx, y: by, size, scale } = this.layout;
    if (x < bx || x > bx + size || y < by || y > by + size) return null;
    const localY = (y - by) / size;
    const part = localY < 0.5 ? 'hat' : localY < 0.82 ? 'head' : 'body';
    // Map the click to the native sprite and ignore transparent corners.
    const sx = Math.floor((x - bx) / scale);
    const sy = Math.floor((y - by) / scale);
    if (this.spriteReady && sx >= 0 && sy >= 0 && sx < SPRITE_SIZE && sy < SPRITE_SIZE) {
      const sample = alphaAt(this.sprite, sx, sy);
      if (sample < 20) return null;
    }
    return { part, point: { x, y } };
  }

  happy(seconds = 1.6) {
    this.happyUntil = performance.now() + seconds * 1000;
    if (this.jumpT < 0) this.jumpT = 0;
    this.jumpPower = 0.35;
    this.spawnHearts(3);
  }

  jump(power = 1) {
    if (this.jumpT >= 0 && this.jumpT < 0.12) return;
    this.jumpT = 0;
    this.jumpPower = clamp(power, 0.2, 1.5);
  }

  playAction(name, duration = 2200) {
    const now = performance.now();
    this.action = { name };
    this.actionStart = now;
    this.actionEnd = now + duration;
    if (name === 'hat') {
      this.hatTipT = 0;
      this.spawnSparks(3, 5, '#d9edf0');
    } else if (name === 'read') {
      this.spawnSparks(2, 4, '#e6dcc6');
    } else if (name === 'tea') {
      this.spawnSparks(3, 4, '#e7cfaa');
      this.teaUntil = now + duration;
    } else if (name === 'rest') {
      this.spawnSparks(2, 3, '#aebfc5');
    } else if (name === 'land') {
      this.spawnSparks(5, 5, '#bfae98');
    }
    return name;
  }

  cancelAction() {
    this.action = null;
    this.actionEnd = 0;
  }

  tipHat() {
    this.playAction('hat', 1200);
  }

  adjustHat() {
    this.playAction('hat', 1500);
  }

  readRecords() {
    this.playAction('read', 4200);
  }

  serveTea() {
    this.playAction('tea', 6400);
  }

  restOnSuitcase() {
    this.playAction('rest', 8200);
  }

  landFromDrag(power = 1) {
    this.cancelAction();
    this.playAction('land', 650);
    this.jump(Math.min(0.28, 0.12 + Math.max(0, power) * 0.08));
  }

  playIdleAction() {
    const options = ['read', 'tea', 'rest', 'hat'].filter((name) => name !== this.lastIdleAction);
    const name = options[Math.floor(Math.random() * options.length)] || 'read';
    this.lastIdleAction = name;
    if (name === 'read') this.readRecords();
    else if (name === 'tea') this.serveTea();
    else if (name === 'rest') this.restOnSuitcase();
    else this.adjustHat();
    return name;
  }

  pat() {
    this.playAction('pat', 2300);
    this.happy(2.1);
    this.jumpPower = 0.18;
    this.spawnHearts(6);
  }

  celebrate() {
    this.playAction('celebrate', 2500);
    this.happy(3);
    this.jump(1.1);
    this.spawnHearts(10);
    this.spawnSparks(8, 20, '#f0d7a0');
  }

  collectRain() {
    this.playAction('collectRain', 900);
    this.spawnSparks(6, 10, '#c7dde0');
    this.happy(1.1);
  }

  takePhoto() {
    this.playAction('camera', 1900);
    this.photoFlashUntil = performance.now() + 180;
    this.spawnSparks(4, 8, '#e8e2d2');
  }

  checkWatch() {
    this.playAction('watch', 1600);
    this.spawnSparks(2, 4, '#d6be83');
  }

  liftLantern() {
    this.playAction('lantern', 2200);
    this.spawnSparks(4, 7, '#e4b765');
  }

  reactSuitcase() {
    this.restOnSuitcase();
  }

  setFocus(active) {
    this.focusActive = Boolean(active);
    if (active) {
      this.spawnSparks(4, 10, '#b9d1d6');
    }
  }

  setRain(enabled) {
    this.rainEnabled = Boolean(enabled);
    this.ensureRain();
  }

  setDragging(value) {
    this.dragging = Boolean(value);
  }

  setWardrobe(equipped) {
    this.wardrobe = {
      outfit: null,
      hat: 'hat',
      coat: null,
      neck: null,
      face: null,
      held: null,
      case: null,
      ...(equipped || {}),
    };
  }

  setAccessory() {
    // Legacy hook kept for old saved wardrobes.
  }

  spawnHearts(count = 4) {
    const { x, y, size } = this.layout;
    for (let i = 0; i < count; i += 1) {
      this.hearts.push({
        x: x + size / 2 + (Math.random() - 0.5) * size * 0.55,
        y: y + size * 0.32 + (Math.random() - 0.5) * 20,
        vy: -0.35 - Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        life: 0,
        max: 1100 + Math.random() * 600,
        size: 3 + Math.floor(Math.random() * 2),
        color: ['#f2bdca', '#dfd1f4', '#f5dfbd'][i % 3],
      });
    }
  }

  spawnSparks(_origin, count = 6, color = '#dceff2') {
    const { x, y, size } = this.layout;
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.45;
      this.sparks.push({
        x: x + size * (0.3 + Math.random() * 0.4),
        y: y + size * (0.12 + Math.random() * 0.45),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.2,
        life: 0,
        max: 650 + Math.random() * 650,
        size: 2 + Math.floor(Math.random() * 3),
        color,
      });
    }
  }

  _loop(now) {
    const dt = Math.min(0.05, (now - this.lastFrame) / 1000);
    this.lastFrame = now;
    this.time += dt;

    // pointer lean
    const target = this.pointer.inside ? this.pointer.tx : Math.sin(this.time * 0.35) * 0.25;
    this.look += (target - this.look) * Math.min(1, dt * 4.2);

    // jump: only vertical offsets, so the pixel edges never get resampled
    let jumpOffset = 0;
    if (this.jumpT >= 0) {
      this.jumpT += dt;
      const p = clamp(this.jumpT / 0.52, 0, 1);
      if (p >= 1) {
        this.jumpT = -1;
      } else {
        jumpOffset = Math.sin(p * Math.PI) * 46 * this.jumpPower;
      }
    }

    if (this.hatTipT >= 0) {
      this.hatTipT += dt;
      if (this.hatTipT > 0.75) this.hatTipT = -1;
    }
    if (this.action && now >= this.actionEnd) {
      this.action = null;
      this.actionEnd = 0;
    }

    // update hearts
    for (const p of this.hearts) {
      p.life += dt * 1000;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.0007 * dt * 1000;
      p.vx *= 0.998;
    }
    this.hearts = this.hearts.filter((p) => p.life < p.max);
    // update sparks
    for (const p of this.sparks) {
      p.life += dt * 1000;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.0003 * dt * 1000;
    }
    this.sparks = this.sparks.filter((p) => p.life < p.max);

    // rain
    if (this.rainEnabled) {
      for (const d of this.rain) {
        d.y += d.speed * dt;
        if (d.y > 1.05) {
          d.y = -0.05;
          d.x = Math.random();
        }
      }
    }

    this.draw(now, jumpOffset);
    this.raf = requestAnimationFrame(this._loop);
  }

  draw(now, jumpOffset) {
    const { ctx, layout } = this;
    const { w, h, x, y, size, scale } = layout;
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = false;

    const happy = performance.now() < this.happyUntil;
    const action = this.action;
    const actionName = action?.name || '';
    const actionProgress = action
      ? clamp((now - this.actionStart) / Math.max(1, this.actionEnd - this.actionStart), 0, 1)
      : 0;
    const resting = actionName === 'rest';
    const reading = actionName === 'read';
    const happyBounce = happy ? Math.sin(this.time * 8) * 2 : 0;
    const bob = Math.round(Math.sin(this.time * (resting ? 0.65 : 1.7) + this.bobPhase) * (resting ? 1 : 2) + happyBounce * 0.5);
    const sway = Math.round(Math.sin(this.time * 0.8) * 1.2);
    const lean = Math.round(this.look * 2);
    const poseLean = resting ? 5 : 0;
    const poseDrop = resting || reading ? 1 : 0;
    const dx = x + sway + lean + poseLean;
    const dy = y - bob - jumpOffset + poseDrop;
    const drawW = size;
    const drawH = size;
    const px = Math.round(dx);
    const py = Math.round(dy);

    // low-frequency pixel glints, echoing the little marks around the reference
    ctx.save();
    for (const s of this.ambientSeeds) {
      const sx = Math.round(x + size * s.x + Math.sin(this.time * s.drift + s.phase) * 7);
      const sy = Math.round(y + size * s.y + Math.cos(this.time * 0.45 + s.phase) * 8);
      const alpha = 0.055 + (Math.sin(this.time * 0.55 + s.phase) + 1) * 0.045;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.phase > 3 ? '#D9DDC7' : '#DCE9E6';
      ctx.fillRect(sx, sy, 2, 2);
      if (s.phase > 1.5) ctx.fillRect(sx + 3, sy, 1, 1);
    }
    ctx.restore();

    // focus aura: a quiet dotted pixel ring
    if (this.focusActive) {
      ctx.save();
      ctx.globalAlpha = 0.5;
      const cx = x + size / 2;
      const cy = y + size * 0.92;
      const rx = size * 0.4;
      const ry = size * 0.13;
      for (let i = 0; i < 28; i += 1) {
        if (i % 3 === 0) continue;
        const a = (i / 28) * Math.PI * 2 + this.time * 0.12;
        ctx.fillStyle = i % 2 ? '#9fbdc3' : '#c1d5d7';
        ctx.fillRect(Math.round(cx + Math.cos(a) * rx), Math.round(cy + Math.sin(a) * ry), 3, 2);
      }
      ctx.restore();
    }

    // very faint pixel ellipse, instead of the old three hard ground lines
    ctx.save();
    ctx.globalAlpha = 0.10;
    const shadowW = Math.round(size * 0.46);
    const shadowX = x + Math.round((size - shadowW) / 2);
    const shadowY = y + size + 5 + jumpOffset * 0.3;
    ctx.fillStyle = '#30363D';
    const rows = [
      [0.26, 0.48],
      [0.14, 0.72],
      [0.05, 0.90],
      [0.14, 0.72],
      [0.26, 0.48],
    ];
    rows.forEach(([left, width], i) => {
      ctx.fillRect(
        Math.round(shadowX + shadowW * left),
        Math.round(shadowY + i * 2),
        Math.round(shadowW * width),
        2,
      );
    });
    ctx.restore();



    // optional pixel rain, low contrast and never over the face
    if (this.rainEnabled) {
      ctx.save();
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = '#b7d3d7';
      for (const d of this.rain) {
        const rx = Math.round(d.x * w);
        const ry = Math.round(d.y * h);
        ctx.fillRect(rx, ry, 1, Math.max(2, Math.round(d.len * scale * 0.55)));
      }
      ctx.restore();
    }

    // character
    const wardrobe = this.wardrobe || {};
    const wardrobeReady = (id) => {
      const image = this.wardrobeImages?.[id];
      return image && image.complete && image.naturalWidth > 0;
    };
    const drawWardrobe = (id) => {
      if (wardrobeReady(id)) ctx.drawImage(this.wardrobeImages[id], px, py, drawW, drawH);
    };

    // The umbrella sits behind the silhouette; all other layers sit in front.
    if (wardrobe.held === 'umbrella') drawWardrobe('umbrella');
    const outfitImage = wardrobe.outfit && wardrobeReady(wardrobe.outfit)
      ? this.wardrobeImages[wardrobe.outfit]
      : null;
    if (outfitImage) {
      ctx.drawImage(outfitImage, px, py, drawW, drawH);
    } else if (this.spriteReady) {
      ctx.drawImage(this.sprite, px, py, drawW, drawH);
    } else {
      this.drawPlaceholder(ctx, px, py, drawW, drawH);
    }
    if (wardrobe.coat) drawWardrobe(wardrobe.coat);
    if (wardrobe.hat && wardrobe.hat !== 'hat') drawWardrobe(wardrobe.hat);
    if (wardrobe.neck) drawWardrobe(wardrobe.neck);
    if (wardrobe.face) drawWardrobe(wardrobe.face);
    if (wardrobe.held && wardrobe.held !== 'night-lantern') drawWardrobe(wardrobe.held);
    if (wardrobe.held === 'night-lantern' && wardrobeReady('night-lantern')) {
      const sway = this.dragging ? Math.round(Math.sin(this.time * 9) * 3) : 0;
      ctx.drawImage(this.wardrobeImages['night-lantern'], px + sway, py, drawW, drawH);
    }
    if (wardrobe.case) drawWardrobe(wardrobe.case);

    // Actions that sit in front of the character.
    if (resting) {
      this.drawSuitcase(ctx, x + size * 0.76, y + size * 0.54, size, actionProgress);
      this.drawHand(ctx, x + size * 0.77, y + size * 0.61, scale);
    } else if (reading) {
      this.drawBook(ctx, x + size * 0.16, y + size * 0.65, size, actionProgress);
      this.drawHand(ctx, x + size * 0.17, y + size * 0.73, scale);
      this.drawHand(ctx, x + size * 0.72, y + size * 0.73, scale);
    } else if (actionName === 'tea') {
      this.drawTea(ctx, x + size - scale * 6, y + size - scale * 8);
      this.drawHand(ctx, x + size * 0.21, y + size * 0.73, scale);
      this.drawHand(ctx, x + size * 0.67, y + size * 0.73, scale);
    } else if (actionName === 'hat') {
      this.drawHand(ctx, x + size * 0.22, y + size * 0.21, scale);
      this.drawHand(ctx, x + size * 0.66, y + size * 0.18, scale);
    } else if (actionName === 'collectRain') {
      this.drawSuitcase(ctx, x + size * 0.75, y + size * 0.6, size, actionProgress);
      this.drawHand(ctx, x + size * 0.67, y + size * 0.54, scale);
      this.drawHand(ctx, x + size * 0.78, y + size * 0.54, scale);
    }

    if (actionName === 'camera' && wardrobeReady('field-camera')) {
      const camera = this.wardrobeImages['field-camera'];
      ctx.drawImage(camera, 8, 16, 12, 8, px + size * 0.2, py + size * 0.32, size * 0.56, size * 0.38);
      if (now < this.photoFlashUntil) {
        ctx.save();
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = '#fff6dd';
        ctx.fillRect(px + size * 0.67, py + size * 0.31, 5, 5);
        ctx.fillRect(px + size * 0.72, py + size * 0.26, 2, 15);
        ctx.fillRect(px + size * 0.64, py + size * 0.35, 18, 2);
        ctx.restore();
      }
    }

    if (actionName === 'lantern') {
      ctx.save();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = '#e4b765';
      ctx.fillRect(px + size * 0.7, py + size * 0.38, size * 0.28, size * 0.3);
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = '#f0cc82';
      ctx.fillRect(px + size * 0.78, py + size * 0.46, size * 0.12, size * 0.14);
      ctx.restore();
    }

    if (actionName === 'watch') {
      ctx.save();
      ctx.globalAlpha = 0.55;
      ctx.fillStyle = '#e3c98b';
      ctx.fillRect(px + size * 0.48, py + size * 0.38, 2, 2);
      ctx.fillRect(px + size * 0.56, py + size * 0.44, 1, 1);
      ctx.restore();
    }

    if (actionName === 'pat' || resting) {
      this.drawClosedEyes(ctx, x, y, size);
    }

    // hat sparkle
    if (this.hatTipT >= 0) {
      const a = Math.sin(clamp(this.hatTipT / 0.75, 0, 1) * Math.PI);
      ctx.save();
      ctx.globalAlpha = 0.8 * a;
      ctx.fillStyle = '#e2f2f3';
      const sx = x + size * 0.16;
      const sy = y - 4 - a * 8;
      ctx.fillRect(sx, sy, 3, 7);
      ctx.fillRect(sx - 2, sy + 2, 7, 3);
      ctx.restore();
    }

    // happy blush/mouth overlay: extremely small, so the sprite stays on-model
    if (happy) {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = '#dca09d';
      ctx.fillRect(Math.round(x + size * 0.37), Math.round(y + size * 0.57), 3, 2);
      ctx.fillStyle = '#d8a3a5';
      ctx.fillRect(Math.round(x + size * 0.34), Math.round(y + size * 0.5), 2, 2);
      ctx.fillRect(Math.round(x + size * 0.64), Math.round(y + size * 0.5), 2, 2);
      ctx.restore();
    }

    // hearts
    for (const p of this.hearts) {
      const life = p.life / p.max;
      ctx.save();
      ctx.globalAlpha = Math.min(1, life * 6) * (1 - life);
      this.drawPattern(ctx, HEART, Math.round(p.x), Math.round(p.y), p.size, p.color);
      ctx.restore();
    }
    // sparks
    for (const p of this.sparks) {
      const life = p.life / p.max;
      ctx.save();
      ctx.globalAlpha = (1 - life) * 0.9;
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      ctx.fillRect(Math.round(p.x - p.size / 2), Math.round(p.y + p.size / 2), p.size * 2, 1);
      ctx.restore();
    }
  }

  drawPattern(ctx, pattern, x, y, px, color) {
    ctx.fillStyle = color;
    for (let row = 0; row < pattern.length; row += 1) {
      for (let col = 0; col < pattern[row].length; col += 1) {
        if (pattern[row][col]) ctx.fillRect(x + col * px, y + row * px, px, px);
      }
    }
  }

  drawTea(ctx, x, y) {
    const s = 3;
    ctx.save();
    ctx.globalAlpha = 0.92;
    ctx.fillStyle = '#dfe5e3';
    ctx.fillRect(x, y, s * 4, s * 3);
    ctx.fillRect(x + s, y - s, s * 2, s);
    ctx.fillStyle = '#586d6d';
    ctx.fillRect(x + s, y + s, s * 2, s);
    ctx.fillStyle = '#dfe5e3';
    ctx.fillRect(x + s * 4, y + s, s, s * 2);
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = '#e9f1ef';
    ctx.fillRect(x + s, y - s * 3, 1, s);
    ctx.fillRect(x + s * 2, y - s * 4, 1, s);
    ctx.restore();
  }

  drawBook(ctx, x, y, size, progress) {
    const u = Math.max(2, Math.round(size * 0.035));
    const w = Math.round(size * 0.54);
    const h = Math.round(size * 0.22);
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y));
    ctx.rotate(-0.08);
    ctx.globalAlpha = 0.97;
    ctx.fillStyle = '#554b42';
    ctx.fillRect(-u, -u, w + u * 2, h + u * 2);
    ctx.fillStyle = '#6f6152';
    ctx.fillRect(-u, h, w + u * 2, u);
    ctx.fillStyle = '#eadfcb';
    ctx.fillRect(0, 0, w / 2 - u, h);
    ctx.fillRect(w / 2 + u, 0, w / 2 - u, h);
    ctx.fillStyle = '#c5b59a';
    ctx.fillRect(w / 2 - u, -u, u * 2, h + u);
    ctx.fillStyle = '#9a8b77';
    for (let i = 0; i < 4; i += 1) {
      ctx.fillRect(u * 2, u * (1.5 + i), w / 2 - u * 3, 1);
      ctx.fillRect(w / 2 + u * 2, u * (1.5 + i), w / 2 - u * 3, 1);
    }
    const flip = Math.round((Math.sin(progress * Math.PI * 4) * 0.5 + 0.5) * (h - u * 2));
    ctx.fillStyle = '#fff6e5';
    ctx.fillRect(w / 2 - u, 0, u * 2, flip);
    ctx.fillStyle = '#bcae96';
    ctx.fillRect(0, h - u, w, u);
    ctx.restore();
  }

  drawSuitcase(ctx, x, y, size, progress) {
    const u = Math.max(2, Math.round(size * 0.04));
    const w = Math.round(size * 0.3);
    const h = Math.round(size * 0.36);
    ctx.save();
    ctx.globalAlpha = 0.98;
    ctx.fillStyle = '#4a5a5b';
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#667879';
    ctx.fillRect(x + u, y + u, w - u * 2, u * 2);
    ctx.fillStyle = '#2c3738';
    ctx.fillRect(x + u, y + h - u * 2, w - u * 2, u * 2);
    ctx.fillStyle = '#bda477';
    ctx.fillRect(x + w * 0.14, y + h * 0.32, u, u);
    ctx.fillRect(x + w * 0.78, y + h * 0.32, u, u);
    ctx.fillStyle = '#202a2b';
    ctx.fillRect(x + w * 0.3, y - u * 2, w * 0.4, u * 2);
    ctx.fillStyle = '#bda477';
    ctx.fillRect(x + w * 0.3, y - u, w * 0.4, u);
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = '#d9c49b';
    ctx.fillRect(x + w * 0.14, y + h * 0.55 + Math.round(progress * 2), u * 2, 1);
    ctx.restore();
  }

  drawHand(ctx, x, y, scale) {
    const s = Math.max(2, Math.round(scale * 0.75));
    ctx.save();
    ctx.fillStyle = '#d9c9b8';
    ctx.fillRect(Math.round(x), Math.round(y), s, s);
    ctx.fillStyle = '#bda997';
    ctx.fillRect(Math.round(x), Math.round(y) + s, s, 1);
    ctx.restore();
  }

  drawClosedEyes(ctx, x, y, size) {
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#30363D';
    ctx.fillRect(Math.round(x + size * 0.37), Math.round(y + size * 0.57), 2, 1);
    ctx.fillRect(Math.round(x + size * 0.56), Math.round(y + size * 0.57), 2, 1);
    ctx.restore();
  }

  drawPlaceholder(ctx, x, y, w, h) {
    ctx.save();
    ctx.fillStyle = 'rgba(20,25,36,0.75)';
    ctx.fillRect(x + w * 0.15, y + h * 0.2, w * 0.7, h * 0.6);
    ctx.fillStyle = 'rgba(170,194,198,0.6)';
    ctx.fillRect(x + w * 0.25, y + h * 0.35, w * 0.5, 3);
    ctx.restore();
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._onResize);
    document.removeEventListener('visibilitychange', this._onVisibility);
  }
}
