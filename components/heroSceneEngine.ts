import * as THREE from "three";

// Futuristic 3D hero: a breathing particle planet with an orbital ring.
// Particles are displaced by 3D noise in the shader, tilt toward the mouse,
// and scatter outward as the visitor scrolls.

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const sphereVert = /* glsl */ `
uniform float uTime; uniform float uScroll; uniform float uPixel;
attribute float aRand;
varying float vMix; varying float vAlpha;
${noise}
void main(){
  vec3 p = position;
  float n = snoise(p*1.6 + vec3(uTime*0.25));
  float n2 = snoise(p*3.2 - vec3(uTime*0.15));
  float disp = n*0.22 + n2*0.06;
  p += normal * disp;
  p += normal * uScroll * (1.2 + aRand*2.8);       // scatter on scroll
  vMix = smoothstep(-0.25, 0.45, n);
  vec4 mv = modelViewMatrix * vec4(p,1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = (1.4 + aRand*2.4 + vMix*1.6) * uPixel * (5.5 / -mv.z);
  vAlpha = (0.35 + vMix*0.65) * (1.0 - uScroll*0.85);
}`;

const sphereFrag = /* glsl */ `
varying float vMix; varying float vAlpha;
void main(){
  vec2 c = gl_PointCoord - 0.5; float d = length(c);
  if(d>0.5) discard;
  float glow = smoothstep(0.5, 0.0, d);
  vec3 white = vec3(1.0, 0.93, 0.86);
  vec3 orange = vec3(1.0, 0.35, 0.05);
  vec3 col = mix(white*0.75, orange, vMix);
  gl_FragColor = vec4(col, glow*vAlpha);
}`;

/** Builds the WebGL scene inside `el` and returns a cleanup function. Loaded lazily by HeroScene. */
export function startHeroScene(el: HTMLDivElement, fixed: boolean): () => void {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return () => {}; // no WebGL: the CSS glow behind still looks fine
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  el.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  const group = new THREE.Group();
  scene.add(group);

  // --- particle planet (fibonacci sphere)
  const isSmall = window.innerWidth < 768;
  const count = isSmall ? 6000 : 14000;
  const pos = new Float32Array(count * 3);
  const nor = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    const x = Math.cos(t) * r, z = Math.sin(t) * r;
    pos.set([x * 1.6, y * 1.6, z * 1.6], i * 3);
    nor.set([x, y, z], i * 3);
    rnd[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  geo.setAttribute("aRand", new THREE.BufferAttribute(rnd, 1));
  const uniforms = { uTime: { value: 0 }, uScroll: { value: 0 }, uPixel: { value: dpr } };
  const mat = new THREE.ShaderMaterial({
    uniforms, vertexShader: sphereVert, fragmentShader: sphereFrag,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const planet = new THREE.Points(geo, mat);
  group.add(planet);

  // --- orbital rings
  const ringMat = (opacity: number) => new THREE.PointsMaterial({ color: 0xff590d, size: 0.018, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending });
  const makeRing = (radius: number, n: number, spread: number, opacity: number) => {
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const rr = radius + (Math.random() - 0.5) * spread;
      p.set([Math.cos(a) * rr, (Math.random() - 0.5) * 0.04, Math.sin(a) * rr], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    return new THREE.Points(g, ringMat(opacity));
  };
  const ring1 = makeRing(2.45, isSmall ? 1500 : 3000, 0.35, 0.75);
  const ring2 = makeRing(3.0, isSmall ? 700 : 1400, 0.08, 0.45);
  const rings = new THREE.Group();
  rings.add(ring1, ring2);
  rings.rotation.set(1.15, 0, -0.35);
  group.add(rings);

  // --- distant star dust
  const dustN = isSmall ? 400 : 900;
  const dp = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) dp.set([(Math.random() - 0.5) * 22, (Math.random() - 0.5) * 14, -Math.random() * 10 - 2], i * 3);
  const dg = new THREE.BufferGeometry();
  dg.setAttribute("position", new THREE.BufferAttribute(dp, 3));
  const dust = new THREE.Points(dg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.02, transparent: true, opacity: 0.5, depthWrite: false }));
  scene.add(dust);

  // --- sizing: planet sits right on desktop, centred behind text on mobile
  const resize = () => {
    const w = el.clientWidth, h = el.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const wide = w >= 1024;
    group.position.set(wide ? 2.5 : 0, wide ? 0 : 0.9, 0);
    group.scale.setScalar(wide ? 1 : 0.78);
    base.x = group.position.x; base.y = group.position.y; base.s = group.scale.x;
  };
  const base = { x: 0, y: 0, s: 1 };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(el);

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", onMove);

  let scrollT = 0;   // hero mode: 0..1 over the first screen (drives the scatter)
  let pageT = 0;     // fixed mode: 0..1 over the whole page (drives the journey)
  const onScroll = () => {
    scrollT = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    pageT = Math.min(1, window.scrollY / max);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  let visible = true;
  const io = new IntersectionObserver(([e]) => { visible = fixed || e.isIntersecting; });
  io.observe(el);

  const clock = new THREE.Clock();
  let raf = 0;
  let journey = 0, heroFade = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible) return;
    const t = clock.getElapsedTime();
    uniforms.uTime.value = reduce ? 0 : t;
    if (fixed) {
      // The planet travels with the visitor: right -> left -> right, breathing as it goes.
      journey += (pageT - journey) * 0.06;
      heroFade += (scrollT - heroFade) * 0.06;
      const wide = el.clientWidth >= 1024;
      const a = journey * Math.PI * 2;
      group.position.x = wide ? base.x * Math.cos(a) : Math.sin(a) * 0.6;
      group.position.y = base.y + Math.sin(a * 1.5) * (wide ? 0.35 : 0.5) - (wide ? 0 : heroFade * 0.9);
      group.scale.setScalar(base.s * (1 + Math.sin(journey * Math.PI) * 0.22));
      planet.rotation.x = journey * Math.PI * 0.8;
      uniforms.uScroll.value = Math.sin(journey * Math.PI * 6) * 0.04 + 0.02;
      renderer.domElement.style.opacity = String(1 - heroFade * 0.4);
    } else {
      uniforms.uScroll.value += (scrollT - uniforms.uScroll.value) * 0.08;
    }
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;
    planet.rotation.y = t * 0.08 + (fixed ? journey * Math.PI * 1.5 : 0);
    rings.rotation.z = -0.35 + t * 0.05;
    ring2.rotation.y = -t * 0.04;
    group.rotation.x = mouse.y * 0.25;
    group.rotation.y = mouse.x * 0.35;
    dust.position.x = mouse.x * -0.3;
    dust.position.y = mouse.y * 0.2;
    renderer.render(scene, camera);
  };
  tick();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect(); io.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("scroll", onScroll);
    geo.dispose(); mat.dispose(); dg.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
