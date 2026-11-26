import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import type { Chapter } from "@/lib/portfolio";

// A cinematic 3D journey: a glowing gate, then one floating "station" per portfolio chapter
// standing on a mirror floor. Scroll progress (0..1) flies the camera from station to station.

const ORANGE = 0xff590d;
const SPACING = 30;

export type SceneApi = { setProgress: (p: number) => void; dispose: () => void; stationCount: number };

function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, "rgba(255,120,50,1)");
  r.addColorStop(0.3, "rgba(255,89,13,0.45)");
  r.addColorStop(1, "rgba(255,89,13,0)");
  g.fillStyle = r;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

function screenTexture(kind: "browser" | "phone") {
  const c = document.createElement("canvas");
  const w = kind === "browser" ? 1024 : 512, h = kind === "browser" ? 640 : 1024;
  c.width = w; c.height = h;
  const g = c.getContext("2d")!;
  g.fillStyle = "#0b0d14"; g.fillRect(0, 0, w, h);
  const o = "#ff590d";
  if (kind === "browser") {
    g.fillStyle = "#151925"; g.fillRect(0, 0, w, 56);
    ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => { g.fillStyle = col; g.beginPath(); g.arc(34 + i * 30, 28, 9, 0, 7); g.fill(); });
    g.fillStyle = "#222738"; g.fillRect(150, 16, 520, 24);
    g.fillStyle = "#fff"; g.font = "bold 64px sans-serif"; g.fillText("Grow faster.", 70, 190);
    g.fillStyle = o; g.fillText("Sell smarter.", 70, 265);
    g.fillStyle = "#3a4054"; [320, 350].forEach((y, i) => g.fillRect(70, y, 420 - i * 90, 14));
    g.fillStyle = o; g.fillRect(70, 400, 190, 54);
    g.strokeStyle = o; g.lineWidth = 3; g.strokeRect(600, 120, 340, 340);
    g.fillStyle = "rgba(255,89,13,0.18)"; g.fillRect(600, 120, 340, 340);
    for (let i = 0; i < 3; i++) { g.fillStyle = "#1a1f2d"; g.fillRect(70 + i * 300, 500, 270, 110); g.fillStyle = o; g.fillRect(90 + i * 300, 520, 60, 8); }
  } else {
    g.fillStyle = "#151925"; g.fillRect(0, 0, w, 90);
    g.fillStyle = "#fff"; g.font = "bold 38px sans-serif"; g.fillText("@esellerzone", 40, 60);
    for (let i = 0; i < 3; i++) {
      const y = 120 + i * 300;
      g.fillStyle = "#1a1f2d"; g.fillRect(30, y, w - 60, 270);
      const gr = g.createLinearGradient(30, y, w - 30, y + 200);
      gr.addColorStop(0, "rgba(255,89,13,0.65)"); gr.addColorStop(1, "rgba(255,89,13,0.08)");
      g.fillStyle = gr; g.fillRect(30, y, w - 60, 190);
      g.fillStyle = o; g.font = "bold 34px sans-serif"; g.fillText("♥ " + (2 + i) * 1.3 + "k", 50, y + 245);
    }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function edges(mesh: THREE.Mesh, color = ORANGE, opacity = 0.9) {
  const l = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({ color, transparent: true, opacity }));
  mesh.add(l);
  return l;
}

const dark = (emissive = 0x000000, e = 0) => new THREE.MeshStandardMaterial({ color: 0x10131c, metalness: 0.6, roughness: 0.35, emissive, emissiveIntensity: e });

function buildModel(kind: Chapter["model"]) {
  const g = new THREE.Group();
  const anim: ((t: number) => void)[] = [];
  if (kind === "browser") {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(6.4, 4, 0.18), dark()); edges(frame);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(6.1, 3.8), new THREE.MeshBasicMaterial({ map: screenTexture("browser") }));
    screen.position.z = 0.1; frame.add(screen);
    g.add(frame);
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 0.06), dark(ORANGE, 0.25)); edges(p, ORANGE, 0.6);
      p.position.set(i % 2 ? 3.9 : -3.9, -0.6 + i * 1.1, 0.8);
      g.add(p);
      anim.push((t) => { p.position.y = -0.6 + i * 1.1 + Math.sin(t * 1.2 + i) * 0.15; });
    }
    anim.push((t) => { frame.rotation.y = Math.sin(t * 0.4) * 0.18; });
  } else if (kind === "boxes") {
    const sizes = [[1.6, 0, 0], [1.2, 1.5, 0.3], [1.3, -1.4, -0.2], [0.9, 0.6, 1.4], [1, -0.4, 1.5], [0.8, 0.2, 2.6]];
    sizes.forEach(([s, x, y], i) => {
      const b = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), dark(ORANGE, i === 0 ? 0.35 : 0.08)); edges(b);
      b.position.set(x, y + s / 2 - 0.6, 0);
      g.add(b);
      anim.push((t) => { b.rotation.y = t * 0.3 + i; b.position.y = y + s / 2 - 0.6 + Math.sin(t + i) * 0.08; });
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3, 0.03, 8, 120), new THREE.MeshBasicMaterial({ color: ORANGE }));
    ring.rotation.x = Math.PI / 2.4; g.add(ring);
    anim.push((t) => { ring.rotation.z = t * 0.5; });
  } else if (kind === "phone") {
    const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.4, 0.2), dark()); edges(body);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(2, 4.15), new THREE.MeshBasicMaterial({ map: screenTexture("phone") }));
    screen.position.z = 0.11; body.add(screen); g.add(body);
    const bubbles: THREE.Mesh[] = [];
    for (let i = 0; i < 14; i++) {
      const m = new THREE.Mesh(new THREE.SphereGeometry(0.08 + Math.random() * 0.14, 16, 16), new THREE.MeshBasicMaterial({ color: i % 3 ? ORANGE : 0xffffff, transparent: true, opacity: 0.85 }));
      m.userData = { x: (Math.random() - 0.5) * 5, s: 0.4 + Math.random() * 0.6, o: Math.random() * 6 };
      bubbles.push(m); g.add(m);
    }
    anim.push((t) => {
      body.rotation.y = Math.sin(t * 0.5) * 0.35;
      bubbles.forEach((b) => { const y = ((t * b.userData.s + b.userData.o) % 6) - 2.5; b.position.set(b.userData.x, y, 0.6); (b.material as THREE.MeshBasicMaterial).opacity = 1 - (y + 2.5) / 6; });
    });
  } else if (kind === "chart") {
    const heights = [0.8, 1.3, 1.1, 2, 2.6, 3.6];
    heights.forEach((h, i) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.6, h, 0.6), dark(ORANGE, 0.15 + i * 0.07)); edges(bar);
      bar.position.set(-2.5 + i * 1, h / 2 - 1.6, 0);
      g.add(bar);
      anim.push((t) => { const k = 0.85 + Math.sin(t * 1.4 + i * 0.6) * 0.15; bar.scale.y = k; bar.position.y = (h * k) / 2 - 1.6; });
    });
    const pts = heights.map((h, i) => new THREE.Vector3(-2.5 + i * 1, h - 1.2, 0.6));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3(pts).getPoints(60)), new THREE.LineBasicMaterial({ color: 0xffffff }));
    g.add(line);
  } else if (kind === "prism") {
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.3, 0), dark(ORANGE, 0.6));
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.1, 1), new THREE.MeshBasicMaterial({ color: ORANGE, wireframe: true, transparent: true, opacity: 0.45 }));
    g.add(core, wire);
    const rings = [0, 1, 2].map((i) => { const r = new THREE.Mesh(new THREE.TorusGeometry(2.8 + i * 0.35, 0.02, 8, 120), new THREE.MeshBasicMaterial({ color: i === 1 ? 0xffffff : ORANGE })); g.add(r); return r; });
    anim.push((t) => { core.rotation.set(t * 0.4, t * 0.6, 0); wire.rotation.set(-t * 0.2, t * 0.25, 0); rings.forEach((r, i) => r.rotation.set(t * (0.3 + i * 0.1), t * 0.2 * (i + 1), 0)); });
  } else {
    for (let i = 0; i < 4; i++) {
      const s = new THREE.Mesh(new THREE.BoxGeometry(4 - i * 0.4, 0.55, 2.4 - i * 0.2), dark()); edges(s);
      const strip = new THREE.Mesh(new THREE.BoxGeometry(2.2 - i * 0.3, 0.06, 0.02), new THREE.MeshBasicMaterial({ color: ORANGE }));
      strip.position.set(0, 0, (2.4 - i * 0.2) / 2 + 0.01); s.add(strip);
      s.position.y = -1.2 + i * 0.8; g.add(s);
      anim.push((t) => { s.rotation.y = Math.sin(t * 0.5 + i * 0.5) * 0.25; (strip.material as THREE.MeshBasicMaterial).color.setHSL(0.05, 1, 0.45 + Math.sin(t * 3 + i) * 0.1); });
    }
  }
  return { group: g, anim };
}

function pedestal() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 0.6, 6), dark());
  edges(base, ORANGE, 0.7);
  g.add(base);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.25, 0.04, 6, 6), new THREE.MeshBasicMaterial({ color: ORANGE }));
  ring.rotation.x = Math.PI / 2; ring.rotation.z = Math.PI / 6; ring.position.y = 0.31;
  g.add(ring);
  return g;
}

function gate() {
  const g = new THREE.Group();
  const mk = (r: number, t: number, op: number) => new THREE.Mesh(new THREE.TorusGeometry(r, t, 16, 160), new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: op }));
  const outer = mk(6.5, 0.12, 1), mid = mk(7.2, 0.03, 0.6), inner = mk(5.8, 0.02, 0.5);
  g.add(outer, mid, inner);
  const ticks = new THREE.Group();
  for (let i = 0; i < 48; i++) {
    const tk = new THREE.Mesh(new THREE.BoxGeometry(0.06, i % 4 ? 0.3 : 0.7, 0.06), new THREE.MeshBasicMaterial({ color: i % 4 ? 0x555b6e : 0xffffff }));
    const a = (i / 48) * Math.PI * 2; tk.position.set(Math.cos(a) * 7.7, Math.sin(a) * 7.7, 0); tk.rotation.z = a + Math.PI / 2;
    ticks.add(tk);
  }
  g.add(ticks);
  return { group: g, anim: (t: number) => { ticks.rotation.z = t * 0.08; mid.rotation.z = -t * 0.2; inner.scale.setScalar(1 + Math.sin(t * 2) * 0.02); } };
}

export function createPortfolioScene(el: HTMLElement, chapters: Chapter[]): SceneApi {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x05060a);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05060a, 18, 75);
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(5, 10, 8); scene.add(key);

  // Mirror floor + glowing grid
  const total = (chapters.length + 1) * SPACING + 60;
  const mirror = new Reflector(new THREE.PlaneGeometry(200, total + 100), {
    textureWidth: Math.floor(window.innerWidth * dpr * 0.5),
    textureHeight: Math.floor(window.innerHeight * dpr * 0.5),
    color: 0x5a5e6a,
  });
  mirror.rotation.x = -Math.PI / 2; mirror.position.set(0, -3, -total / 2 + 30);
  scene.add(mirror);
  const gridMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uColor: { value: new THREE.Color(ORANGE) } },
    vertexShader: "varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",
    fragmentShader: `uniform vec3 uColor; varying vec3 vW;
      void main(){ vec2 c = vW.xz/3.0; vec2 g = abs(fract(c-0.5)-0.5)/fwidth(c); float l = 1.0-min(min(g.x,g.y),1.0);
      float lane = smoothstep(14.0, 2.0, abs(vW.x)); gl_FragColor = vec4(uColor, l*0.22*lane + 0.0); }`,
  });
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(200, total + 100), gridMat);
  grid.rotation.x = -Math.PI / 2; grid.position.set(0, -2.98, -total / 2 + 30);
  scene.add(grid);

  // Star dust
  const n = window.innerWidth < 768 ? 900 : 2200;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 0.5) * 120, Math.random() * 40 - 2, -Math.random() * total], i * 3);
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffb08a, size: 0.08, transparent: true, opacity: 0.7, depthWrite: false }));
  scene.add(dust);

  const glow = glowTexture();
  const anims: ((t: number) => void)[] = [];

  // Gate at z = 0
  const gt = gate(); gt.group.position.set(0, 3.2, 0); scene.add(gt.group); anims.push(gt.anim);

  // Stations
  const stations: THREE.Group[] = [];
  chapters.forEach((ch, i) => {
    const s = new THREE.Group();
    const z = -(i + 1) * SPACING;
    const side = i % 2 === 0 ? 1 : -1;
    s.position.set(side * 2.2, 0, z);
    const p = pedestal(); p.position.y = -2.7; s.add(p);
    const m = buildModel(ch.model); m.group.position.y = 1.2; s.add(m.group);
    anims.push(...m.anim);
    const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
    halo.scale.set(16, 16, 1); halo.position.set(0, 1, -2); s.add(halo);
    const light = new THREE.PointLight(ORANGE, 18, 16, 2); light.position.set(0, 2, 3); s.add(light);
    scene.add(s); stations.push(s);
  });

  // Camera path: start in front of the gate, stop in front of each station.
  const stops = [new THREE.Vector3(0, 2.4, 16), ...stations.map((s) => new THREE.Vector3(s.position.x * 0.35, 2.2, s.position.z + 13))];
  const looks = [new THREE.Vector3(0, 3, 0), ...stations.map((s) => new THREE.Vector3(s.position.x, 1.2, s.position.z))];

  let target = 0, current = 0;
  const mouse = { x: 0, y: 0 };
  const onMove = (e: PointerEvent) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.fov = w < 700 ? 68 : 50;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(el);

  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const tmpP = new THREE.Vector3(), tmpL = new THREE.Vector3();
  const clock = new THREE.Clock();
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    current += (target - current) * 0.08;
    const segs = stops.length - 1;
    const f = current * segs;
    const i = Math.min(segs - 1, Math.floor(f));
    // Dwell at each stop: travel happens in the middle 60% of each segment.
    const local = ease(THREE.MathUtils.clamp((f - i - 0.2) / 0.6, 0, 1));
    tmpP.lerpVectors(stops[i], stops[i + 1], local);
    tmpL.lerpVectors(looks[i], looks[i + 1], local);
    camera.position.set(tmpP.x + mouse.x * 1.2, tmpP.y - mouse.y * 0.6 + Math.sin(t * 0.6) * 0.08, tmpP.z);
    camera.lookAt(tmpL);
    anims.forEach((a) => a(t));
    dust.rotation.y = t * 0.005;
    renderer.render(scene, camera);
  };
  tick();

  return {
    stationCount: stations.length,
    setProgress: (p) => { target = THREE.MathUtils.clamp(p, 0, 1); },
    dispose: () => {
      cancelAnimationFrame(raf); ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      mirror.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
