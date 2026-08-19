import { useRef, useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Text, Image as DreiImage, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion, useInView, useIsMobile } from '@/hooks';
import { TIMELINE_STAGES } from '@/data/content';

function StageCard({ stage, index, scrollProgress, isMobile }: any) {
  const ref = useRef<THREE.Group>(null);
  const zPosition = -index * 5; // Spaced out along Z axis
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    
    // Animate slightly based on time
    ref.current.position.y = Math.sin(t * 0.5 + index) * 0.1;
    
    // Rotate slightly towards camera
    const isLeft = index % 2 === 0;
    ref.current.rotation.y = isLeft ? 0.2 : -0.2;
    ref.current.position.x = isMobile ? 0 : (isLeft ? -1.5 : 1.5);
    
    // Scale up slightly as it comes closer to camera (z = 0 relative to camera)
    // The camera will move from z = 2 to z = -20
  });

  return (
    <group ref={ref} position={[0, 0, zPosition]}>
      {/* Background card */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[3, 2]} />
        <meshStandardMaterial color="#16161e" metalness={0.5} roughness={0.5} opacity={0.8} transparent />
      </mesh>
      
      {/* Border */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[3.04, 2.04]} />
        <meshStandardMaterial color={stage.status === 'active' ? '#8a7bd6' : '#2a2a33'} />
      </mesh>

      {/* Image */}
      <DreiImage url={stage.image} position={[0, 0.3, 0]} scale={[2.8, 1.2]} />
      
      {/* Text Info */}
      <Text position={[-1.3, -0.5, 0.01]} fontSize={0.12} color="#ece7dc" anchorX="left" anchorY="top">
        {stage.num} — {stage.title}
      </Text>
      
      <Text position={[-1.3, -0.7, 0.01]} fontSize={0.08} color="#b8b3a8" anchorX="left" anchorY="top" maxWidth={2.6}>
        {stage.copy}
      </Text>

      {/* Status Badge */}
      <mesh position={[1.0, -0.6, 0.01]}>
        <planeGeometry args={[0.6, 0.2]} />
        <meshBasicMaterial color={stage.status === 'done' ? '#2a2a33' : stage.status === 'active' ? '#8a7bd6' : '#0c0c11'} />
      </mesh>
      <Text position={[1.0, -0.6, 0.02]} fontSize={0.06} color={stage.status === 'done' ? '#ece7dc' : '#ffffff'} anchorX="center" anchorY="middle">
        {stage.status.toUpperCase()}
      </Text>
    </group>
  );
}

function TimelineScene({ scrollProgress, isMobile }: { scrollProgress: number, isMobile: boolean }) {
  const cameraGroupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (!cameraGroupRef.current) return;
    // Camera travels from z=2 to z = -25 based on scroll progress of the container
    const targetZ = 2 - scrollProgress * 25;
    cameraGroupRef.current.position.z += (targetZ - cameraGroupRef.current.position.z) * 0.1;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[0, 2, 0]} intensity={1} color="#8a7bd6" distance={10} />
      
      {/* Moving Camera Rig */}
      <group ref={cameraGroupRef}>
        <perspectiveCamera makeDefault position={[0, 0, 0]} fov={50} />
      </group>

      {/* Path Line */}
      <mesh position={[0, 0, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 30, 8]} />
        <meshStandardMaterial color="#8a7bd6" emissive="#8a7bd6" emissiveIntensity={0.5} transparent opacity={0.3} />
      </mesh>

      {TIMELINE_STAGES.map((stage, i) => (
        <StageCard key={stage.num} stage={stage} index={i} scrollProgress={scrollProgress} isMobile={isMobile} />
      ))}
    </>
  );
}

export default function ProjectTimeline() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [containerRef, inView] = useInView<HTMLDivElement>({ threshold: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  // Custom scroll listener for this section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we have scrolled
      // 0 = just entered bottom of screen, 1 = just left top of screen
      if (rect.top < windowHeight && rect.bottom > 0) {
        const totalDistance = windowHeight + rect.height;
        const currentDistance = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const reveal = reduced ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  };

  const dpr = useMemo(() => (isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)), [isMobile]);

  return (
    <section id="timeline-3d" ref={containerRef} className="relative h-[200vh] w-full bg-vanta-bg">
      {/* Sticky container for the 3D canvas so it stays in view while scrolling */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        
        {/* Overlay Text */}
        <div className="absolute top-24 left-0 right-0 z-10 px-6 md:px-12 mx-auto max-w-[1600px] pointer-events-none">
          <motion.div {...reveal} className="max-w-2xl">
            <span className="text-[0.7rem] font-medium uppercase tracking-widest3 text-vanta-bone-faint drop-shadow-md">
              08 — Production
            </span>
            <h2 className="mt-6 font-sans text-3xl font-semibold leading-tight2 tracking-tighter2 text-vanta-bone md:text-5xl drop-shadow-lg">
              FROM FIRST REFERENCE TO FINAL FRAME.
            </h2>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <div className="absolute inset-0" aria-hidden="true">
          {!reduced && (
            <Canvas
              dpr={dpr}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              style={{ background: 'transparent' }}
            >
              <TimelineScene scrollProgress={scrollProgress} isMobile={isMobile} />
            </Canvas>
          )}
          
          {/* Fallback for reduced motion or WebGL disabled */}
          {reduced && (
            <div className="flex h-full items-center justify-center pt-32">
              <div className="grid gap-8 px-6 pb-24 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-[1600px] overflow-y-auto w-full">
                 {TIMELINE_STAGES.map((stage, i) => (
                    <div key={i} className="border border-vanta-border bg-vanta-surface p-4">
                      <img src={stage.image} alt={stage.title} className="w-full aspect-video object-cover mb-4" />
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-sans font-medium text-vanta-bone">{stage.num} — {stage.title}</span>
                        <span className={`text-[0.6rem] px-2 py-1 uppercase ${stage.status === 'active' ? 'bg-vanta-glow/20 text-vanta-glow' : 'bg-vanta-bg text-vanta-bone-dim'}`}>
                          {stage.status}
                        </span>
                      </div>
                      <p className="text-xs text-vanta-bone-dim">{stage.copy}</p>
                    </div>
                 ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vanta-bg to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-vanta-bg to-transparent" />
      </div>
    </section>
  );
}
