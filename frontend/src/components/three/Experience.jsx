import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const DEEP = "#241A16";
const CARAMEL = "#B78352";

function smooth(p, a, b) {
  return THREE.MathUtils.smoothstep(p, a, b);
}

/* ---------- Procedural assets ---------- */

function makeBeanTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#4a2f1d";
  ctx.fillRect(0, 0, 512, 512);
  const shades = ["#5a3a22", "#3f2716", "#634028", "#553521", "#462c1a"];
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const r = 2 + Math.random() * 10;
    ctx.fillStyle = shades[(Math.random() * shades.length) | 0];
    ctx.globalAlpha = 0.12 + Math.random() * 0.2;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.4 + Math.random() * 0.6), Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 0.08;
  ctx.strokeStyle = "#2e1c10";
  for (let i = 0; i < 60; i++) {
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(170, y + (Math.random() * 40 - 20), 340, y + (Math.random() * 40 - 20), 512, y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeBeanGeometry() {
  const geo = new THREE.SphereGeometry(1, 96, 96);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    let x = v.x;
    let y = v.y * 0.72;
    let z = v.z * 0.5;
    if (z > 0) {
      const crease = Math.exp(-Math.pow(y / 0.16, 2));
      z *= 1 - 0.62 * crease;
    } else {
      z *= 1.06;
    }
    const taper = 1 - 0.25 * Math.max(0, (Math.abs(x) - 0.55) / 0.45);
    y *= taper;
    pos.setXYZ(i, x, y, z);
  }
  geo.computeVertexNormals();
  return geo;
}

function makeSpriteTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,238,214,1)");
  g.addColorStop(0.4, "rgba(255,214,166,0.55)");
  g.addColorStop(1, "rgba(255,214,166,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function makeSteamTexture() {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 256;
  const ctx = c.getContext("2d");
  for (let i = 0; i < 26; i++) {
    const x = 64 + (Math.random() * 44 - 22);
    const y = 220 - Math.random() * 200;
    const r = 16 + Math.random() * 30;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(255,246,235,0.16)");
    g.addColorStop(1, "rgba(255,246,235,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(c);
}

function makeLatteTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#b98956";
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = "#efe2cc";
  ctx.beginPath();
  ctx.arc(128, 128, 116, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#b98956";
  ctx.lineCap = "round";
  for (let i = 0; i < 7; i++) {
    const y = 88 + i * 20;
    const w = (1 - i / 9) * 52;
    ctx.lineWidth = 10 - i * 0.8;
    ctx.beginPath();
    ctx.moveTo(128 - w, y);
    ctx.quadraticCurveTo(128, y + 26, 128 + w, y);
    ctx.stroke();
  }
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.moveTo(128, 70);
  ctx.lineTo(128, 216);
  ctx.stroke();
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(112, 62);
  ctx.quadraticCurveTo(128, 84, 144, 62);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeCupTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 512;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f3ebdd";
  ctx.fillRect(0, 0, 1024, 512);
  ctx.fillStyle = "#4B3026";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '600 58px Georgia, "Times New Roman", serif';
  ctx.fillText("G A L I S T A   C A F É", 512, 384);
  ctx.strokeStyle = "#B78352";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(362, 440);
  ctx.lineTo(662, 440);
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, "rgba(0,0,0,0.55)");
  g.addColorStop(0.6, "rgba(0,0,0,0.2)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/* ---------- Scene pieces ---------- */

function Bean({ progressRef }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const geometry = useMemo(makeBeanGeometry, []);
  const texture = useMemo(makeBeanTexture, []);

  useFrame((state, dt) => {
    const p = progressRef.current;
    const m = meshRef.current;
    const g = groupRef.current;
    if (!m || !g) return;
    const dis = smooth(p, 0.26, 0.44);
    m.rotation.y += dt * (0.3 + p * 7);
    m.rotation.x = 0.25 + Math.sin(state.clock.elapsedTime * 0.3) * 0.12 + p * 1.6;
    g.visible = p < 0.5;
    const s = Math.max(0.001, (1 - dis) * 1.25);
    g.scale.setScalar(s);
    g.position.y = THREE.MathUtils.lerp(-0.12, -1.1, dis) + Math.sin(state.clock.elapsedTime * 0.8) * 0.06 * (1 - dis);
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial map={texture} bumpMap={texture} bumpScale={1.2} roughness={0.5} metalness={0.08} />
      </mesh>
    </group>
  );
}

function Dust({ count = 120 }) {
  const ref = useRef();
  const sprite = useMemo(makeSpriteTexture, []);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 3.5;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4;
      arr[i * 3 + 2] = Math.sin(a) * r;
    }
    return arr;
  }, [count]);
  useFrame((state, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.03;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} map={sprite} color="#c9a276" transparent opacity={0.35} depthWrite={false} sizeAttenuation />
    </points>
  );
}

function CoffeeParticles({ progressRef, count = 550 }) {
  const ref = useRef();
  const sprite = useMemo(makeSpriteTexture, []);
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const col = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 2.3;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
      positions[i * 3 + 2] = Math.sin(a) * r;
      col.set(Math.random() < 0.68 ? "#6b4423" : CARAMEL);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((state, dt) => {
    const p = progressRef.current;
    const pts = ref.current;
    if (!pts) return;
    const active = smooth(p, 0.22, 0.4) * (1 - smooth(p, 0.88, 1));
    pts.visible = active > 0.01;
    pts.material.opacity = active * 0.85;
    pts.rotation.y += dt * (0.6 + p * 5.5);
    const converge = smooth(p, 0.25, 0.45);
    pts.scale.setScalar(1 - converge * 0.45);
    pts.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08 * (1 - converge) - converge * 0.3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} map={sprite} vertexColors transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} sizeAttenuation />
    </points>
  );
}

const swirlVertex = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const swirlFragment = `
varying vec2 vUv;
uniform float uTime;
uniform float uOpacity;
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
void main() {
  vec2 uv = vUv - 0.5;
  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float swirl = a + uTime * 0.9 + r * 5.0;
  float bands = noise(vec2(swirl * 1.6, r * 7.0 - uTime * 0.6));
  float crema = smoothstep(0.35, 0.95, bands);
  vec3 dark = vec3(0.10, 0.06, 0.045);
  vec3 caramel = vec3(0.72, 0.51, 0.32);
  vec3 milk = vec3(0.90, 0.82, 0.68);
  vec3 col = mix(dark, caramel, crema);
  col = mix(col, milk, smoothstep(0.75, 1.0, bands) * 0.5);
  float edge = smoothstep(0.5, 0.33, r);
  gl_FragColor = vec4(col, uOpacity * edge);
}
`;

function SwirlDisc({ progressRef }) {
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uOpacity: { value: 0 } }), []);
  useFrame((state) => {
    const p = progressRef.current;
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uOpacity.value = smooth(p, 0.3, 0.48) * (1 - smooth(p, 0.8, 0.97));
  });
  return (
    <mesh position={[0, -1.05, 0]} rotation={[-1.05, 0, 0]}>
      <circleGeometry args={[2.3, 64]} />
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={swirlVertex}
        fragmentShader={swirlFragment}
      />
    </mesh>
  );
}

function Steam({ progressRef }) {
  const groupRef = useRef();
  const meshRefs = [useRef(), useRef(), useRef()];
  const texture = useMemo(makeSteamTexture, []);
  useFrame((state) => {
    const p = progressRef.current;
    const g = groupRef.current;
    if (!g) return;
    const on = smooth(p, 0.5, 0.68) * (1 - smooth(p, 0.92, 1));
    g.visible = on > 0.02;
    meshRefs.forEach((mr, i) => {
      const m = mr.current;
      if (!m) return;
      const t = (state.clock.elapsedTime * 0.3 + i * 0.33) % 1;
      m.position.y = 0.72 + t * 1.2;
      m.material.opacity = on * 0.4 * Math.sin(Math.PI * t);
      m.position.x = Math.sin(state.clock.elapsedTime * 1.1 + i * 2.1) * 0.07;
      m.scale.setScalar(0.7 + t * 0.7);
    });
  });
  return (
    <group ref={groupRef}>
      {meshRefs.map((mr, i) => (
        <mesh key={i} ref={mr} position={[0, 1, 0]}>
          <planeGeometry args={[0.42, 1.1]} />
          <meshBasicMaterial map={texture} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Cup({ progressRef, isMobile }) {
  const groupRef = useRef();
  const beansGroupRef = useRef();
  const shadowRef = useRef();
  const beanGeometry = useMemo(makeBeanGeometry, []);

  const cupProfile = useMemo(() => {
    return [
      new THREE.Vector2(0.0, 0.03),
      new THREE.Vector2(0.17, 0.0),
      new THREE.Vector2(0.3, 0.04),
      new THREE.Vector2(0.325, 0.3),
      new THREE.Vector2(0.34, 0.62),
      new THREE.Vector2(0.3, 0.62),
      new THREE.Vector2(0.28, 0.14),
      new THREE.Vector2(0.0, 0.14),
    ];
  }, []);
  const saucerProfile = useMemo(() => {
    return [
      new THREE.Vector2(0.0, 0.0),
      new THREE.Vector2(0.3, 0.0),
      new THREE.Vector2(0.56, 0.03),
      new THREE.Vector2(0.6, 0.07),
      new THREE.Vector2(0.62, 0.02),
    ];
  }, []);

  const cupTexture = useMemo(makeCupTexture, []);
  const latteTexture = useMemo(makeLatteTexture, []);
  const shadowTexture = useMemo(makeShadowTexture, []);

  const cupGeom = useMemo(() => new THREE.LatheGeometry(cupProfile, 72), [cupProfile]);
  const saucerGeom = useMemo(() => new THREE.LatheGeometry(saucerProfile, 72), [saucerProfile]);

  useFrame((state, dt) => {
    const p = progressRef.current;
    const g = groupRef.current;
    if (!g) return;
    const rise = smooth(p, 0.46, 0.64);
    const shift = smooth(p, 0.7, 0.9);
    g.visible = p > 0.43;
    const eased = 1 - Math.pow(1 - rise, 3);
    g.position.y = THREE.MathUtils.lerp(-2.6, 0, eased);
    g.position.x = shift * (isMobile ? 0.55 : 1.55);
    g.scale.setScalar(0.8 + 0.2 * rise);
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.3;

    if (beansGroupRef.current) {
      beansGroupRef.current.visible = rise > 0.6;
      beansGroupRef.current.rotation.y += dt * 0.35;
      beansGroupRef.current.children.forEach((b, i) => {
        b.position.y = Math.sin(state.clock.elapsedTime * 0.8 + i * 1.6) * 0.14 + 0.55;
        b.rotation.x += dt * 0.5;
        b.rotation.z += dt * 0.3;
      });
    }
    if (shadowRef.current) shadowRef.current.material.opacity = rise * 0.5;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={shadowRef} position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.6, 2.6]} />
        <meshBasicMaterial map={shadowTexture} transparent opacity={0.5} depthWrite={false} />
      </mesh>

      <mesh geometry={saucerGeom} position={[0, 0.02, 0]}>
        <meshPhysicalMaterial color="#efe5d2" roughness={0.3} clearcoat={0.5} clearcoatRoughness={0.3} />
      </mesh>

      <mesh geometry={cupGeom} position={[0, 0.06, 0]} rotation={[0, Math.PI, 0]}>
        <meshPhysicalMaterial map={cupTexture} color="#ffffff" roughness={0.28} clearcoat={0.6} clearcoatRoughness={0.25} />
      </mesh>

      <mesh position={[0, 0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.29, 48]} />
        <meshStandardMaterial map={latteTexture} roughness={0.5} />
      </mesh>

      <group ref={beansGroupRef}>
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return (
            <mesh
              key={i}
              geometry={beanGeometry}
              position={[Math.cos(a) * 1.25, 0.55, Math.sin(a) * 1.25]}
              scale={0.13}
            >
              <meshStandardMaterial color="#4a2f1d" roughness={0.4} metalness={0.05} />
            </mesh>
          );
        })}
      </group>

      <Steam progressRef={progressRef} />
    </group>
  );
}

function Rig({ progressRef, mouseRef, isMobile }) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  useFrame((state, dt) => {
    const p = progressRef.current;
    const m = mouseRef.current;
    let z;
    if (p < 0.3) z = THREE.MathUtils.lerp(3.9, 4.8, smooth(p, 0, 0.3));
    else if (p < 0.55) z = THREE.MathUtils.lerp(4.8, 6.4, smooth(p, 0.3, 0.55));
    else z = THREE.MathUtils.lerp(6.4, 7.4, smooth(p, 0.55, 0.9));
    const y = THREE.MathUtils.lerp(0.1, 1.0, p);
    const x = m.x * 0.35 - 0.25 * smooth(p, 0.7, 0.9);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, x, 3, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, y + m.y * 0.2, 3, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 3, dt);
    look.set(m.x * 0.1, THREE.MathUtils.lerp(0.05, -0.25, smooth(p, 0.3, 0.6)), 0);
    camera.lookAt(look);
  });
  return null;
}

export default function Experience({ progressRef }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ fov: isMobile ? 50 : 42, position: [0, 0.1, 3.9] }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[DEEP]} />
        <fog attach="fog" args={[DEEP, 8, 16]} />

        <ambientLight intensity={0.4} color="#8a6a52" />
        <directionalLight position={[4, 5, 3]} intensity={2.4} color="#ffe9cf" />
        <pointLight position={[-4, 2, -3]} intensity={26} color={CARAMEL} distance={14} decay={2} />
        <pointLight position={[2, -1, 4]} intensity={9} color="#fff6ea" distance={12} decay={2} />

        <Bean progressRef={progressRef} />
        <Dust count={isMobile ? 60 : 120} />
        <CoffeeParticles progressRef={progressRef} count={isMobile ? 180 : 550} />
        <SwirlDisc progressRef={progressRef} />
        <Cup progressRef={progressRef} isMobile={isMobile} />
        <Rig progressRef={progressRef} mouseRef={mouseRef} isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
