'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Floating wireframe node ──
const FloatingNode = ({ position, color, size = 0.3, speed = 1 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    meshRef.current.position.y = position[1] + Math.sin(t + offset) * 0.3;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7 + offset) * 0.15;
    meshRef.current.rotation.x = t * 0.3;
    meshRef.current.rotation.z = t * 0.2;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.6} />
    </mesh>
  );
};

// ── Instanced particles ──
const ParticleField = ({ count = 200 }: { count?: number }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      pos: [(Math.random() - 0.5) * 12, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 6],
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    })), [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.pos[0] + Math.sin(t * p.speed + p.offset) * 0.5,
        p.pos[1] + Math.cos(t * p.speed * 0.8 + p.offset) * 0.5,
        p.pos[2]
      );
      dummy.scale.setScalar(0.02 + Math.sin(t * 2 + p.offset) * 0.01);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#06b6d4" transparent opacity={0.4} />
    </instancedMesh>
  );
};

// ── Connection lines ──
const ConnectionLine = ({ start, end, color = '#6366f1' }: any) => {
  const ref = useRef<THREE.Line>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ]);
    return g;
  }, [start, end]);

  return (
    <line ref={ref as any} geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
};

// ── Mouse-reactive camera wrapper ──
const CameraRig = ({ children }: any) => {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.current.x * 0.1 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-mouse.current.y * 0.05 - groupRef.current.rotation.x) * 0.05;
  });

  return <group ref={groupRef}>{children}</group>;
};

// ── Main Scene ──
const HeroSceneContent = () => {
  const nodes = useMemo(() => [
    { pos: [-2.5, 1.5, -1], color: '#06b6d4', size: 0.35, speed: 0.6 },  // Cloud
    { pos: [2.8, 1.2, -0.5], color: '#8b5cf6', size: 0.3, speed: 0.8 },  // Server
    { pos: [-1.5, -1.5, -2], color: '#14b8a6', size: 0.25, speed: 0.5 },  // IoT
    { pos: [1.8, -1.3, -1.5], color: '#6366f1', size: 0.28, speed: 0.7 }, // API
    { pos: [0, 2.2, -2], color: '#3b82f6', size: 0.2, speed: 0.9 },       // Data
    { pos: [-3, 0, -2.5], color: '#f59e0b', size: 0.22, speed: 0.4 },     // Code
    { pos: [3.2, -0.5, -2], color: '#10b981', size: 0.2, speed: 0.6 },    // DB
  ], []);

  const connections = useMemo(() => [
    { start: [-2.5, 1.5, -1], end: [0, 2.2, -2] },
    { start: [2.8, 1.2, -0.5], end: [0, 2.2, -2] },
    { start: [-1.5, -1.5, -2], end: [1.8, -1.3, -1.5] },
    { start: [0, 2.2, -2], end: [1.8, -1.3, -1.5] },
    { start: [-3, 0, -2.5], end: [-2.5, 1.5, -1] },
  ], []);

  return (
    <CameraRig>
      {nodes.map((n, i) => <FloatingNode key={i} position={n.pos} color={n.color} size={n.size} speed={n.speed} />)}
      {connections.map((c, i) => <ConnectionLine key={i} start={c.start} end={c.end} />)}
      <ParticleField count={150} />
    </CameraRig>
  );
};

export const HeroScene = () => (
  <div className="absolute inset-0 -z-10 opacity-60">
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      style={{ pointerEvents: 'none' }}
    >
      <HeroSceneContent />
    </Canvas>
  </div>
);
