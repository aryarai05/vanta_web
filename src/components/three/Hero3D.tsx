import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

type Hero3DProps = {
  easterEgg: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  scrollProgress: number;
};

// ─── Cinema Camera ────────────────────────────────────────────────────────────
function CinemaCamera({
  mouse,
  scrollProgress,
  easterEgg,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: number;
  easterEgg: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const lensGlassRef = useRef<THREE.Mesh>(null);
  const lensGlowRef = useRef<THREE.Mesh>(null);
  const rotY = useRef(0);
  const rotX = useRef(0);

  const bodyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0e0e14'),
        metalness: 0.92,
        roughness: 0.18,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),
    []
  );

  const lensMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#111117'),
        metalness: 0.95,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      }),
    []
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#080814'),
        metalness: 0.1,
        roughness: 0.02,
        transmission: 0.95,
        ior: 1.52,
        thickness: 0.3,
        transparent: true,
        opacity: 0.92,
      }),
    []
  );

  const focusRingMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1c1c28'),
        metalness: 0.8,
        roughness: 0.35,
      }),
    []
  );

  const buttonMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#20202e'),
        metalness: 0.9,
        roughness: 0.2,
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Smooth mouse-driven rotation
    const targetY = mouse.current.x * 0.28;
    const targetX = -mouse.current.y * 0.14;
    rotY.current += (targetY - rotY.current) * 0.05;
    rotX.current += (targetX - rotX.current) * 0.05;

    groupRef.current.rotation.y = rotY.current;
    groupRef.current.rotation.x = rotX.current;

    // Breathing float
    groupRef.current.position.y = Math.sin(t * 0.45) * 0.07;

    // Scroll-driven lens glow → lens becomes portal
    if (lensGlassRef.current) {
      const mat = lensGlassRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissiveIntensity = Math.min(scrollProgress * 4, 1.2);
      mat.emissive = easterEgg
        ? new THREE.Color('#4a3b8a')
        : new THREE.Color('#8ab0ff');
    }

    // Lens inner glow pulse
    if (lensGlowRef.current) {
      const mat = lensGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + Math.sin(t * 1.5) * 0.02 + scrollProgress * 0.3;
    }

    // Scroll: camera travels toward viewer
    const scrollZ = Math.min(scrollProgress * 6, 3.5);
    groupRef.current.position.z = scrollZ;
    groupRef.current.scale.setScalar(1 + scrollProgress * 0.2);
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Camera body ── */}
      <mesh material={bodyMat} castShadow>
        <boxGeometry args={[1.6, 1.0, 1.1]} />
      </mesh>

      {/* ── Top handle grip ── */}
      <mesh material={focusRingMat} position={[0, 0.68, 0.1]} castShadow>
        <boxGeometry args={[0.8, 0.16, 0.55]} />
      </mesh>

      {/* ── Side buttons row ── */}
      {[-0.22, 0, 0.22].map((x, i) => (
        <mesh key={i} material={buttonMat} position={[x, 0.22, 0.57]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 0.06, 12]} />
        </mesh>
      ))}

      {/* ── Record button (right side) ── */}
      <mesh position={[0.88, 0.15, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
        <meshPhysicalMaterial color="#c0392b" metalness={0.3} roughness={0.4} emissive="#c0392b" emissiveIntensity={0.4} />
      </mesh>

      {/* ── Main lens barrel ── */}
      <mesh material={lensMat} position={[0, 0, 0.78]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.34, 0.72, 32]} />
      </mesh>

      {/* ── Focus ring (torus around barrel) ── */}
      <mesh material={focusRingMat} position={[0, 0, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.355, 0.045, 12, 32]} />
      </mesh>

      {/* ── Lens glass front ── */}
      <mesh ref={lensGlassRef} position={[0, 0, 1.155]}>
        <circleGeometry args={[0.28, 48]} />
        <meshPhysicalMaterial
          color="#080814"
          metalness={0.1}
          roughness={0.02}
          transmission={0.95}
          ior={1.52}
          thickness={0.3}
          transparent
          opacity={0.92}
          emissive="#8ab0ff"
          emissiveIntensity={0}
        />
      </mesh>

      {/* ── Lens inner glow ring ── */}
      <mesh ref={lensGlowRef} position={[0, 0, 1.14]}>
        <ringGeometry args={[0.15, 0.27, 48]} />
        <meshBasicMaterial color="#6080ff" transparent opacity={0.04} side={THREE.DoubleSide} />
      </mesh>

      {/* ── Lens cap ring (outer bezel) ── */}
      <mesh position={[0, 0, 1.12]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.3, 0.035, 12, 32]} />
        <meshPhysicalMaterial color="#0a0a12" metalness={0.95} roughness={0.08} />
      </mesh>

      {/* ── Matte box (5-sided hollow box in front) ── */}
      {/* top */}
      <mesh material={bodyMat} position={[0, 0.33, 1.46]}>
        <boxGeometry args={[0.76, 0.06, 0.42]} />
      </mesh>
      {/* bottom */}
      <mesh material={bodyMat} position={[0, -0.33, 1.46]}>
        <boxGeometry args={[0.76, 0.06, 0.42]} />
      </mesh>
      {/* left */}
      <mesh material={bodyMat} position={[-0.38, 0, 1.46]}>
        <boxGeometry args={[0.06, 0.6, 0.42]} />
      </mesh>
      {/* right */}
      <mesh material={bodyMat} position={[0.38, 0, 1.46]}>
        <boxGeometry args={[0.06, 0.6, 0.42]} />
      </mesh>
      {/* front outer frame */}
      <mesh material={bodyMat} position={[0, 0, 1.68]}>
        <ringGeometry args={[0.31, 0.42, 4]} />
      </mesh>
    </group>
  );
}

// ─── Film Strip ───────────────────────────────────────────────────────────────
function FilmStrip({
  position,
  rotation,
  mouse,
  depth,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  depth: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const [x, y, z] = position;
    ref.current.position.x = x + mouse.current.x * depth * 0.35;
    ref.current.position.y = y + mouse.current.y * depth * 0.2 + Math.sin(t * 0.25 + x) * 0.04;
    ref.current.position.z = z;
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[2.2, 0.5]} />
        <meshStandardMaterial color="#0c0c11" metalness={0.3} roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[-0.95 + i * 0.21, 0.18, 0.001]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#07070a" />
        </mesh>
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={`b${i}`} position={[-0.95 + i * 0.21, -0.18, 0.001]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#07070a" />
        </mesh>
      ))}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={`f${i}`} position={[-0.7 + i * 0.45, 0, 0.001]}>
          <planeGeometry args={[0.38, 0.24]} />
          <meshStandardMaterial color="#1a1a24" metalness={0.4} roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Dust particles ───────────────────────────────────────────────────────────
function Dust({ count = 40 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#ece7dc" transparent opacity={0.25} sizeAttenuation />
    </points>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({
  mouse,
  easterEgg,
  scrollProgress,
  isMobile,
  reducedMotion,
}: Omit<Hero3DProps, ''> & { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = mouse.current.x * 0.5;
    const targetY = mouse.current.y * 0.3;
    const targetZ = 6.5;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  const keyLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (keyLightRef.current) {
      keyLightRef.current.intensity = easterEgg ? 1.2 : 0.7;
    }
  });

  return (
    <>
      <ambientLight intensity={0.07} />
      <directionalLight ref={keyLightRef} position={[4, 6, 5]} intensity={0.7} color="#e8e0d4" castShadow />
      <directionalLight position={[-3, 2, -2]} intensity={0.18} color="#b4d4f0" />
      <pointLight position={[0, 0, 3]} intensity={0.5} color="#ffffff" distance={8} />
      {easterEgg && <pointLight position={[0, 2, 2]} intensity={3} color="#8a7bd6" distance={6} />}

      <Suspense fallback={null}>
        <Environment preset="studio" />
      </Suspense>

      <Float speed={0.9} rotationIntensity={0.04} floatIntensity={0.18}>
        <CinemaCamera mouse={mouse} scrollProgress={scrollProgress} easterEgg={easterEgg} />
      </Float>

      {!isMobile && (
        <>
          <FilmStrip position={[3.2, -1.8, -0.5]} rotation={[0, -0.15, 0.04]} mouse={mouse} depth={0.9} />
          <FilmStrip position={[-3.0, 0.6, -2]} rotation={[0, 0.35, -0.05]} mouse={mouse} depth={0.4} />
        </>
      )}

      <Dust count={reducedMotion ? 0 : isMobile ? 0 : 35} />

      <ContactShadows position={[0, -2.8, 0]} opacity={0.4} scale={8} blur={2.5} far={5} color="#000000" />
    </>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Hero3D({ easterEgg, reducedMotion, isMobile, scrollProgress }: Hero3DProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const dpr = useMemo(() => (isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)), [isMobile]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
  };

  return (
    <div className="absolute inset-0" onPointerMove={handlePointerMove} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene
          mouse={mouse}
          easterEgg={easterEgg}
          scrollProgress={scrollProgress}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
