import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import type { Chapter } from "@/lib/portfolio";

// High-tech holographic journey. Everything is built from thin light lines and data points
// (no solid blocks), lit by real bloom over a dark mirror floor. Scroll (0..1) flies the camera
// through a portal and past one holographic station per portfolio chapter.

const ORANGE = new THREE.Color(0xff590d);
const WHITE = new THREE.Color(0xdfe6ff);
const DIM = new THREE.Color(0x5b6478);
const SPACING = 32;

export type SceneApi = { setProgress: (p: number) => void; dispose: () => void; stationCount: number };
type Anim = (t: number) => void;

const lineMat = (color: THREE.Color, opacity = 1) =>
  new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
const pointMat = (color: THREE.Color, size: number, opacity = 1) =>
  new THREE.PointsMaterial({ color, size, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });

function wire(geo: THREE.BufferGeometry, color: THREE.Color, opacity = 1) {
  return new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat(color, opacity));
}
function circle(r: number, color: THREE.Color, opacity = 1, seg = 128, dash = 0) {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= seg; i++) { const a = (i / seg) * Math.PI * 2; pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); }
  const g = new THREE.BufferGeometry().setFromPoints(pts);
  if (dash) {
    const l = new THREE.Line(g, new THREE.LineDashedMaterial({ color, dashSize: dash, gapSize: dash, transparent: true, opacity, depthWrite: false }));
    l.computeLineDistances();
    return l;
  }
  return new THREE.Line(g, lineMat(color, opacity));
}
function glassPane(w: number, h: number, opacity = 0.06) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: 0x9fb4ff, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  m.add(wire(new THREE.PlaneGeometry(w, h), WHITE, 0.55));
  return m;
}

/* ---------- stations ---------- */

function webStation(): [THREE.Group, Anim[]] {
  const g = new THREE.Group(); const a: Anim[] = [];
  const panes: THREE.Group[] = [];
  for (let i = 0; i < 3; i++) {
    const p = new THREE.Group();
    const pane = glassPane(5.6, 3.4, 0.03 + i * 0.01); p.add(pane);
    // header bar + dots
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 0.28), new THREE.MeshBasicMaterial({ color: WHITE, transparent: true, opacity: 0.1, depthWrite: false }));
    bar.position.set(0, 1.56, 0.001); p.add(bar);
    [0, 1, 2].forEach((k) => { const d = new THREE.Mesh(new THREE.CircleGeometry(0.05, 16), new THREE.MeshBasicMaterial({ color: k === 0 ? ORANGE : WHITE })); d.position.set(-2.55 + k * 0.18, 1.56, 0.002); p.add(d); });
    // layout wireframe blocks
    const blocks: [number, number, number, number, THREE.Color][] = [[-1.5, 0.6, 2.2, 1.2, ORANGE], [1.3, 0.6, 2.4, 1.2, DIM], [-1.85, -0.9, 1.5, 0.9, DIM], [0, -0.9, 1.5, 0.9, DIM], [1.85, -0.9, 1.5, 0.9, DIM]];
    blocks.forEach(([x, y, w, h, c]) => { const b = wire(new THREE.PlaneGeometry(w, h), c, i === 2 ? 0.9 : 0.35); b.position.set(x, y, 0.002); p.add(b); });
    // code lines
    for (let k = 0; k < 4; k++) {
      const l = new THREE.Mesh(new THREE.PlaneGeometry(0.4 + Math.random() * 1.2, 0.05), new THREE.MeshBasicMaterial({ color: k ? WHITE : ORANGE, transparent: true, opacity: 0.6 }));
      l.position.set(-2.3 + (l.geometry as THREE.PlaneGeometry).parameters.width / 2, 0.95 - k * 0.18 - 0.2, 0.003); if (i === 2) p.add(l);
    }
    p.position.set((i - 2) * -0.5, (i - 2) * -0.35, (i - 2) * 0.9);
    panes.push(p); g.add(p);
  }
  // scan line on front pane
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 0.03), new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.9 }));
  panes[2].add(scan); scan.position.z = 0.01;
  a.push((t) => {
    g.rotation.y = -0.35 + Math.sin(t * 0.35) * 0.12;
    scan.position.y = 1.5 - ((t * 0.8) % 3.2);
    panes.forEach((p, i) => { p.position.y = (i - 2) * -0.35 + Math.sin(t * 0.8 + i) * 0.05; });
  });
  return [g, a];
}

function globeStation(): [THREE.Group, Anim[]] {
  // Marketplace: a data globe with order arcs flying between hubs.
  const g = new THREE.Group(); const a: Anim[] = [];
  const R = 2.4, n = 2600, pos = new Float32Array(n * 3);
  const gold = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) { const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), th = gold * i; pos.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const globe = new THREE.Points(pg, pointMat(WHITE, 0.035, 0.55)); g.add(globe);
  const shell = new THREE.Mesh(new THREE.SphereGeometry(R * 0.995, 48, 48), new THREE.MeshBasicMaterial({ color: 0x0a0c14 })); g.add(shell);
  for (let k = -2; k <= 2; k++) { const c = circle(Math.sqrt(R * R - (k * 0.8) ** 2) , DIM, 0.35); c.position.y = k * 0.8; g.add(c); }
  const hubs: THREE.Vector3[] = [];
  const hubPts: number[] = [];
  for (let i = 0; i < 9; i++) {
    const u = Math.random() * Math.PI * 2, v = Math.acos(2 * Math.random() - 1);
    const p = new THREE.Vector3(Math.sin(v) * Math.cos(u), Math.cos(v), Math.sin(v) * Math.sin(u)).multiplyScalar(R);
    hubs.push(p); hubPts.push(p.x, p.y, p.z);
  }
  const hg = new THREE.BufferGeometry(); hg.setAttribute("position", new THREE.Float32BufferAttribute(hubPts, 3));
  g.add(new THREE.Points(hg, pointMat(ORANGE, 0.16)));
  const arcs: { curve: THREE.QuadraticBezierCurve3; dot: THREE.Mesh; o: number }[] = [];
  for (let i = 0; i < 10; i++) {
    const s = hubs[i % hubs.length], e = hubs[(i * 4 + 3) % hubs.length];
    const mid = s.clone().add(e).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.6);
    const curve = new THREE.QuadraticBezierCurve3(s, mid, e);
    g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)), lineMat(ORANGE, 0.45)));
    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    g.add(dot); arcs.push({ curve, dot, o: Math.random() });
  }
  const ring = circle(R * 1.45, ORANGE, 0.6, 160, 0.12); ring.rotation.x = 0.35; g.add(ring);
  a.push((t) => { g.rotation.y = t * 0.12; arcs.forEach((r) => r.dot.position.copy(r.curve.getPoint((t * 0.25 + r.o) % 1))); ring.rotation.z = t * 0.2; });
  return [g, a];
}

function rackStation(): [THREE.Group, Anim[]] {
  // E-commerce: a wireframe server/infrastructure rack with live status LEDs.
  const g = new THREE.Group(); const a: Anim[] = [];
  const leds: THREE.Mesh[] = [];
  for (let c = 0; c < 3; c++) {
    const col = new THREE.Group();
    const frame = wire(new THREE.BoxGeometry(1.4, 4.2, 1.4), WHITE, 0.45); col.add(frame);
    for (let u = 0; u < 8; u++) {
      const unit = wire(new THREE.BoxGeometry(1.25, 0.36, 1.25), DIM, 0.6); unit.position.y = -1.85 + u * 0.5; col.add(unit);
      for (let l = 0; l < 3; l++) {
        const led = new THREE.Mesh(new THREE.PlaneGeometry(0.08, 0.04), new THREE.MeshBasicMaterial({ color: l === 0 ? ORANGE : WHITE, transparent: true }));
        led.position.set(-0.45 + l * 0.14, -1.85 + u * 0.5, 0.63); col.add(led); leds.push(led);
      }
    }
    col.position.x = (c - 1) * 1.8; col.position.z = Math.abs(c - 1) * -0.6; col.rotation.y = (1 - c) * 0.25;
    g.add(col);
  }
  // data packets rising
  const n = 160, pos = new Float32Array(n * 3), speed = new Float32Array(n);
  for (let i = 0; i < n; i++) { pos.set([(Math.random() - 0.5) * 6, Math.random() * 5 - 2.2, (Math.random() - 0.5) * 2.5], i * 3); speed[i] = 0.3 + Math.random(); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.add(new THREE.Points(pg, pointMat(ORANGE, 0.05, 0.8)));
  a.push((t) => {
    leds.forEach((l, i) => { (l.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * (2 + (i % 5)) + i * 1.7) > 0.2 ? 1 : 0.15; });
    for (let i = 0; i < n; i++) { let y = pos[i * 3 + 1] + speed[i] * 0.01; if (y > 2.8) y = -2.2; pos[i * 3 + 1] = y; }
    pg.attributes.position.needsUpdate = true;
    g.rotation.y = Math.sin(t * 0.3) * 0.2;
  });
  return [g, a];
}

function networkStation(): [THREE.Group, Anim[]] {
  // Social: a living audience network with signals travelling between nodes.
  const g = new THREE.Group(); const a: Anim[] = [];
  const nodes: THREE.Vector3[] = [];
  for (let i = 0; i < 46; i++) nodes.push(new THREE.Vector3().randomDirection().multiplyScalar(1.2 + Math.random() * 1.6));
  nodes[0].set(0, 0, 0);
  const linePts: number[] = []; const edges: [THREE.Vector3, THREE.Vector3][] = [];
  nodes.forEach((p, i) => nodes.forEach((q, j) => { if (j > i && p.distanceTo(q) < 1.35) { linePts.push(p.x, p.y, p.z, q.x, q.y, q.z); edges.push([p, q]); } }));
  for (let i = 1; i < nodes.length; i += 4) { const p = nodes[i]; linePts.push(0, 0, 0, p.x, p.y, p.z); edges.push([nodes[0], p]); }
  const lg = new THREE.BufferGeometry(); lg.setAttribute("position", new THREE.Float32BufferAttribute(linePts, 3));
  g.add(new THREE.LineSegments(lg, lineMat(WHITE, 0.22)));
  const ng = new THREE.BufferGeometry().setFromPoints(nodes);
  g.add(new THREE.Points(ng, pointMat(WHITE, 0.09, 0.9)));
  const hub = new THREE.Mesh(new THREE.IcosahedronGeometry(0.35, 1), new THREE.MeshBasicMaterial({ color: ORANGE, wireframe: true })); g.add(hub);
  const hubGlow = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), new THREE.MeshBasicMaterial({ color: ORANGE })); g.add(hubGlow);
  const pulses = Array.from({ length: 18 }, () => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), new THREE.MeshBasicMaterial({ color: ORANGE }));
    g.add(m); return { m, e: edges[Math.floor(Math.random() * edges.length)], o: Math.random() };
  });
  const ripple = [0, 1, 2].map(() => { const c = circle(1, ORANGE, 0.6); c.rotation.x = Math.PI / 2; g.add(c); return c; });
  a.push((t) => {
    g.rotation.y = t * 0.1; hub.rotation.set(t, t * 0.7, 0);
    pulses.forEach((p) => { const k = (t * 0.45 + p.o) % 1; if (k < 0.02) p.e = edges[Math.floor(Math.random() * edges.length)]; p.m.position.lerpVectors(p.e[0], p.e[1], k); });
    ripple.forEach((r, i) => { const k = (t * 0.35 + i / 3) % 1; r.scale.setScalar(0.3 + k * 3); (r.material as THREE.LineBasicMaterial).opacity = (1 - k) * 0.6; });
  });
  return [g, a];
}

function terrainStation(): [THREE.Group, Anim[]] {
  // SEO & Ads: a live data terrain with a rising trend line.
  const g = new THREE.Group(); const a: Anim[] = [];
  const geo = new THREE.PlaneGeometry(7, 4.2, 40, 24); geo.rotateX(-Math.PI / 2);
  const base = geo.attributes.position.array.slice() as Float32Array;
  const mesh = new THREE.LineSegments(new THREE.WireframeGeometry(geo), lineMat(WHITE, 0.25));
  g.add(mesh);
  const wgeo = mesh.geometry as THREE.BufferGeometry;
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 30; i++) { const x = -3.3 + (i / 30) * 6.6; pts.push(new THREE.Vector3(x, 0.2 + Math.pow(i / 30, 1.8) * 2.6 + Math.sin(i * 0.9) * 0.12, 1.4)); }
  const trend = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat(ORANGE, 1)); g.add(trend);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); g.add(head);
  for (let i = 0; i < 6; i++) { const h = 0.4 + i * 0.45; const b = wire(new THREE.BoxGeometry(0.28, h, 0.28), i === 5 ? ORANGE : DIM, 0.8); b.position.set(-2.6 + i * 1.05, h / 2, -1.3); g.add(b); }
  const ax = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-3.5, 0, 1.4), new THREE.Vector3(3.5, 0, 1.4), new THREE.Vector3(-3.5, 0, 1.4), new THREE.Vector3(-3.5, 3.2, 1.4)]);
  g.add(new THREE.LineSegments(ax, lineMat(DIM, 0.8)));
  // animate terrain by rebuilding wireframe from displaced plane (cheap: 1k verts)
  const tmp = geo.attributes.position as THREE.BufferAttribute;
  a.push((t) => {
    for (let i = 0; i < tmp.count; i++) {
      const x = base[i * 3], z = base[i * 3 + 2];
      tmp.setY(i, Math.sin(x * 0.9 + t) * 0.18 + Math.cos(z * 1.3 - t * 0.7) * 0.15 + Math.max(0, x + 1) * 0.08);
    }
    const w = new THREE.WireframeGeometry(geo);
    wgeo.setAttribute("position", w.attributes.position); w.dispose();
    const k = (t * 0.12) % 1; head.position.copy(new THREE.CatmullRomCurve3(pts).getPoint(k));
    g.rotation.y = -0.25 + Math.sin(t * 0.25) * 0.1;
  });
  g.position.y = -1.2;
  return [g, a];
}

function brandStation(): [THREE.Group, Anim[]] {
  // Branding: a precision-engineered geometric core with orbiting guide rings.
  const g = new THREE.Group(); const a: Anim[] = [];
  const inner = wire(new THREE.IcosahedronGeometry(1.1, 0), ORANGE, 1);
  const mid = wire(new THREE.IcosahedronGeometry(1.9, 1), WHITE, 0.35);
  const outer = new THREE.Points(new THREE.IcosahedronGeometry(2.6, 4), pointMat(WHITE, 0.03, 0.6));
  g.add(inner, mid, outer);
  const rings = [2.9, 3.2, 3.5].map((r, i) => { const c = circle(r, i === 1 ? ORANGE : WHITE, i === 1 ? 0.8 : 0.3, 160, i === 2 ? 0.1 : 0); g.add(c); return c; });
  a.push((t) => {
    inner.rotation.set(t * 0.5, t * 0.7, 0); mid.rotation.set(-t * 0.2, t * 0.3, 0); outer.rotation.y = -t * 0.05;
    rings.forEach((r, i) => r.rotation.set(Math.PI / 2 + Math.sin(t * 0.3 + i) * 0.6, t * (0.2 + i * 0.1), 0));
  });
  return [g, a];
}

function platform(): [THREE.Group, Anim] {
  // Holographic floor platform: concentric rings, tick marks and a rotating dashed scanner.
  const g = new THREE.Group();
  const r1 = circle(4.2, WHITE, 0.35), r2 = circle(4.6, ORANGE, 0.7), r3 = circle(5.3, DIM, 0.5, 160, 0.15), r4 = circle(2.2, WHITE, 0.15);
  g.add(r1, r2, r3, r4);
  const ticks: number[] = [];
  for (let i = 0; i < 72; i++) { const a = (i / 72) * Math.PI * 2, l = i % 6 ? 0.15 : 0.4; ticks.push(Math.cos(a) * 4.7, 0, Math.sin(a) * 4.7, Math.cos(a) * (4.7 + l), 0, Math.sin(a) * (4.7 + l)); }
  const tg = new THREE.BufferGeometry(); tg.setAttribute("position", new THREE.Float32BufferAttribute(ticks, 3));
  const tk = new THREE.LineSegments(tg, lineMat(WHITE, 0.4)); g.add(tk);
  const sweep = new THREE.Mesh(new THREE.RingGeometry(2.2, 4.2, 64, 1, 0, Math.PI / 5), new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  sweep.rotation.x = -Math.PI / 2; g.add(sweep);
  // light column
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 9, 64, 1, true), new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { uC: { value: ORANGE } },
    vertexShader: "varying float vY; void main(){ vY = position.y; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: "uniform vec3 uC; varying float vY; void main(){ float a = smoothstep(4.5,-4.5,vY)*0.04; gl_FragColor = vec4(uC, a); }",
  }));
  beam.position.y = 4.5; g.add(beam);
  return [g, (t) => { sweep.rotation.z = -t * 0.8; r3.rotation.y = t * 0.15; tk.rotation.y = -t * 0.05; }];
}

function portal(): [THREE.Group, Anim] {
  const g = new THREE.Group();
  const rings = [
    { r: 6.4, c: ORANGE, o: 1, d: 0 }, { r: 6.9, c: WHITE, o: 0.35, d: 0.25 }, { r: 7.6, c: DIM, o: 0.6, d: 0 }, { r: 5.6, c: WHITE, o: 0.2, d: 0.08 },
  ].map(({ r, c, o, d }) => { const l = circle(r, c, o, 200, d); l.rotation.x = Math.PI / 2; g.add(l); return l; });
  const ticks: number[] = [];
  for (let i = 0; i < 120; i++) { const a = (i / 120) * Math.PI * 2, l = i % 10 ? 0.18 : 0.55; ticks.push(Math.cos(a) * 7.8, Math.sin(a) * 7.8, 0, Math.cos(a) * (7.8 + l), Math.sin(a) * (7.8 + l), 0); }
  const tg = new THREE.BufferGeometry(); tg.setAttribute("position", new THREE.Float32BufferAttribute(ticks, 3));
  const tk = new THREE.LineSegments(tg, lineMat(WHITE, 0.5)); g.add(tk);
  // brackets
  const br: number[] = [];
  [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(([sx, sy]) => { const x = sx * 9, y = sy * 5.4; br.push(x, y, 0, x - sx * 1.2, y, 0, x, y, 0, x, y - sy * 1.2, 0); });
  const bg = new THREE.BufferGeometry(); bg.setAttribute("position", new THREE.Float32BufferAttribute(br, 3));
  g.add(new THREE.LineSegments(bg, lineMat(WHITE, 0.6)));
  return [g, (t) => { tk.rotation.z = t * 0.05; rings[1].rotation.y = t * 0.3; rings[3].rotation.y = -t * 0.4; rings[0].scale.setScalar(1 + Math.sin(t * 2) * 0.006); }];
}

const builders: Record<Chapter["model"], () => [THREE.Group, Anim[]]> = {
  browser: webStation, boxes: globeStation, stack: rackStation, phone: networkStation, chart: terrainStation, prism: brandStation,
};

export function createPortfolioScene(el: HTMLElement, chapters: Chapter[]): SceneApi {
  const small = window.innerWidth < 768;
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x030407);
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030407, 0.022);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 260);

  // Floor: dark mirror + fine precision grid that fades out from the flight lane.
  const total = (chapters.length + 1) * SPACING + 80;
  const mirror = new Reflector(new THREE.PlaneGeometry(220, total + 120), {
    textureWidth: Math.floor(window.innerWidth * dpr * 0.5), textureHeight: Math.floor(window.innerHeight * dpr * 0.5), color: 0x3a3e48,
  });
  mirror.rotation.x = -Math.PI / 2; mirror.position.set(0, -3, -total / 2 + 40); scene.add(mirror);
  const gridMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uA: { value: WHITE }, uB: { value: ORANGE }, uT: { value: 0 } },
    vertexShader: "varying vec3 vW; void main(){ vec4 w = modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }",
    fragmentShader: `uniform vec3 uA; uniform vec3 uB; uniform float uT; varying vec3 vW;
      float gridL(vec2 p, float s){ vec2 c=p/s; vec2 g=abs(fract(c-0.5)-0.5)/fwidth(c); return 1.0-min(min(g.x,g.y),1.0); }
      void main(){
        float fine = gridL(vW.xz, 1.0)*0.06, major = gridL(vW.xz, 8.0)*0.22;
        float lane = smoothstep(26.0, 3.0, abs(vW.x));
        float pulse = smoothstep(1.5, 0.0, abs(fract((vW.z*0.02) + uT*0.15) - 0.5)*20.0);
        vec3 col = mix(uA, uB, pulse*0.8);
        gl_FragColor = vec4(col, (fine + major + pulse*major*2.0) * lane);
      }`,
  });
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(220, total + 120), gridMat);
  grid.rotation.x = -Math.PI / 2; grid.position.set(0, -2.985, -total / 2 + 40); scene.add(grid);

  // Ambient data dust
  const n = small ? 1200 : 3000;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) pos.set([(Math.random() - 0.5) * 140, Math.random() * 40 - 2.5, 20 - Math.random() * total], i * 3);
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, pointMat(WHITE, 0.05, 0.45)); scene.add(dust);

  // Vertical light pillars far away (city-of-data skyline)
  const pil: number[] = [];
  for (let i = 0; i < 90; i++) { const x = (Math.random() < 0.5 ? -1 : 1) * (28 + Math.random() * 50), z = 10 - Math.random() * total, h = 4 + Math.random() * 26; pil.push(x, -3, z, x, h, z); }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.Float32BufferAttribute(pil, 3));
  scene.add(new THREE.LineSegments(pg, lineMat(DIM, 0.5)));

  const anims: Anim[] = [];
  const [pt, ptA] = portal(); pt.position.set(0, 3.2, 0); scene.add(pt); anims.push(ptA);

  const stations: THREE.Group[] = [];
  chapters.forEach((ch, i) => {
    const s = new THREE.Group();
    const side = i % 2 === 0 ? 1 : -1;
    s.position.set(side * 2.4, 0, -(i + 1) * SPACING);
    const [pl, plA] = platform(); pl.position.y = -2.95; s.add(pl); anims.push(plA);
    const [m, mA] = builders[ch.model](); m.position.y = 1.4; s.add(m); anims.push(...mA);
    scene.add(s); stations.push(s);
  });

  // Post-processing: real bloom for a holographic glow.
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), small ? 0.7 : 0.82, 0.5, 0.2);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  const stops = [new THREE.Vector3(0, 2.6, 17), ...stations.map((s) => new THREE.Vector3(s.position.x * 0.3, 2.4, s.position.z + 15))];
  const looks = [new THREE.Vector3(0, 3, 0), ...stations.map((s) => new THREE.Vector3(s.position.x, -0.9, s.position.z))];

  let target = 0, current = 0;
  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  const onMove = (e: PointerEvent) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
  window.addEventListener("pointermove", onMove);

  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false); composer.setSize(w, h); bloom.setSize(w, h);
    renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "100%";
    camera.aspect = w / h; camera.fov = w < 700 ? 66 : 48; camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize); ro.observe(el);

  const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  const P = new THREE.Vector3(), L = new THREE.Vector3();
  const clock = new THREE.Clock();
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    current += (target - current) * 0.07;
    mouse.sx += (mouse.x - mouse.sx) * 0.05; mouse.sy += (mouse.y - mouse.sy) * 0.05;
    const segs = stops.length - 1, f = current * segs, i = Math.min(segs - 1, Math.floor(f));
    const local = ease(THREE.MathUtils.clamp((f - i - 0.15) / 0.7, 0, 1));
    P.lerpVectors(stops[i], stops[i + 1], local); L.lerpVectors(looks[i], looks[i + 1], local);
    // a gentle banking arc while travelling
    const travel = Math.sin(local * Math.PI);
    camera.position.set(P.x + mouse.sx * 1.4 + travel * (i % 2 ? 2 : -2), P.y - mouse.sy * 0.7 + travel * 1.2, P.z);
    camera.lookAt(L);
    camera.rotation.z += travel * (i % 2 ? -0.04 : 0.04);
    gridMat.uniforms.uT.value = t;
    anims.forEach((a) => a(t));
    composer.render();
  };
  tick();

  return {
    stationCount: stations.length,
    setProgress: (p) => { target = THREE.MathUtils.clamp(p, 0, 1); },
    dispose: () => {
      cancelAnimationFrame(raf); ro.disconnect(); window.removeEventListener("pointermove", onMove);
      scene.traverse((o) => {
        const m = o as THREE.Mesh; m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      mirror.dispose(); composer.dispose(); renderer.dispose(); renderer.domElement.remove();
    },
  };
}
