import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Image as DreiImage } from '@react-three/drei';
import * as THREE from 'three';
import { IMAGES } from '@/data/content';

type CardProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  hovered: boolean;
  index: number;
  image?: string;
  label: string;
  sublabel: string;
  typeLabel: string;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
};

function BoardCard({ position, rotation, hovered, index, image, label, sublabel, typeLabel, mouse }: CardProps) {
  const ref = useRef<THREE.Group>(null);
  const targetZ = useRef(position[2]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();

    // hover lift
    targetZ.current = hovered ? position[2] + 0.8 : position[2];
    ref.current.position.z += (targetZ.current - ref.current.position.z) * 0.1;

    // parallax from mouse
    const parallaxX = mouse.current.x * 0.15 * (index % 2 === 0 ? 1 : -1);
    const parallaxY = mouse.current.y * 0.1;

    ref.current.position.x = position[0] + parallaxX;
    ref.current.position.y = position[1] + parallaxY + Math.sin(t * 0.5 + index) * 0.05;

    // subtle rotation response
    ref.current.rotation.y = rotation[1] + mouse.current.x * 0.1;
    ref.current.rotation.x = rotation[0] + mouse.current.y * 0.05;
  });

  const cardWidth = 1.4;
  const cardHeight = image ? 1.0 : 1.2;

  return (
    <group ref={ref} position={position} rotation={rotation}>
      {/* card background */}
      <mesh>
        <planeGeometry args={[cardWidth, cardHeight]} />
        <meshStandardMaterial
          color={hovered ? '#1c1c26' : '#16161e'}
          metalness={0.5}
          roughness={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* border */}
      <mesh position={[0, 0, -0.002]}>
        <planeGeometry args={[cardWidth + 0.015, cardHeight + 0.015]} />
        <meshStandardMaterial
          color={hovered ? '#8a7bd6' : '#2a2a33'}
          metalness={0.7}
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* image */}
      {image && (
        <DreiImage
          url={image}
          position={[0, 0.15, 0.01]}
          scale={[cardWidth - 0.1, cardHeight - 0.4]}
        />
      )}

      {/* type label */}
      <Text
        position={[-cardWidth / 2 + 0.1, cardHeight / 2 - 0.08, 0.02]}
        fontSize={0.05}
        color="#6e6a63"
        anchorX="left"
        anchorY="top"
      >
        {typeLabel}
      </Text>

      {/* title */}
      <Text
        position={[0, image ? -0.32 : -0.35, 0.02]}
        fontSize={0.07}
        color="#ece7dc"
        anchorX="center"
        anchorY="middle"
        maxWidth={cardWidth - 0.2}
      >
        {label}
      </Text>

      {/* subtitle */}
      <Text
        position={[0, image ? -0.44 : -0.5, 0.02]}
        fontSize={0.045}
        color="#b8b3a8"
        anchorX="center"
        anchorY="middle"
        maxWidth={cardWidth - 0.2}
      >
        {sublabel}
      </Text>

      {/* hover glow */}
      {hovered && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[cardWidth + 0.3, cardHeight + 0.3]} />
          <meshBasicMaterial color="#8a7bd6" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

type BoardProps = {
  reducedMotion: boolean;
  hoveredCard: number | null;
  setHoveredCard: (id: number | null) => void;
};

const CARD_DATA = [
  {
    position: [-2.2, 0.8, 0] as [number, number, number],
    rotation: [0, 0.3, 0.05] as [number, number, number],
    image: IMAGES.filmStill1,
    label: 'NOVA / Frame 04',
    sublabel: 'Opening sequence — warm grade',
    typeLabel: 'VIDEO',
  },
  {
    position: [0, 1.0, -0.5] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    image: IMAGES.portrait2,
    label: 'Portrait Reference',
    sublabel: 'Late afternoon light study',
    typeLabel: 'PHOTO',
  },
  {
    position: [2.2, 0.6, 0] as [number, number, number],
    rotation: [0, -0.3, -0.05] as [number, number, number],
    label: 'Typography Study',
    sublabel: 'Display weight — condensed',
    typeLabel: 'TYPE',
  },
  {
    position: [-1.5, -1.2, 0.3] as [number, number, number],
    rotation: [0, 0.2, -0.03] as [number, number, number],
    label: 'Color Direction',
    sublabel: 'Warm neutral with violet accent',
    typeLabel: 'COLOR',
  },
  {
    position: [1.5, -1.0, -0.2] as [number, number, number],
    rotation: [0, -0.2, 0.03] as [number, number, number],
    label: 'Production Note',
    sublabel: 'Hold negative space before first cut',
    typeLabel: 'NOTE',
  },
];

function Scene({ mouse, hoveredCard, setHoveredCard, reducedMotion }: BoardProps & { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.1 + mouse.current.x * 0.15;
    groupRef.current.rotation.x = mouse.current.y * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.6} />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#8a7bd6" distance={10} />
      <pointLight position={[3, 3, 3]} intensity={0.5} color="#ffffff" distance={10} />
      <group ref={groupRef}>
        {CARD_DATA.map((card, i) => (
          <BoardCard
            key={i}
            index={i}
            position={card.position}
            rotation={card.rotation}
            image={card.image}
            label={card.label}
            sublabel={card.sublabel}
            typeLabel={card.typeLabel}
            hovered={hoveredCard === i}
            mouse={mouse}
          />
        ))}
      </group>
    </>
  );
}

export default function InteractiveBoard3D({ reducedMotion, hoveredCard, setHoveredCard }: BoardProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const dpr = useMemo(() => Math.min(window.devicePixelRatio, 1.5), []);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouse.current.x = x;
    mouse.current.y = y;
  };

  return (
    <div className="h-full w-full" onPointerMove={handlePointerMove}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Scene mouse={mouse} hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
