import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

function OrbitalMesh() {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => [0.52, -0.52, 1.25].map((tilt, j) => Array.from({ length: 181 }, (_, i) => {
    const a = (i / 180) * Math.PI * 2 + j * 0.2;
    return new THREE.Vector3(Math.cos(a) * 1.85, Math.sin(a) * 0.64, Math.sin(a) * 0.22)
      .applyAxisAngle(new THREE.Vector3(1, 0, 0), tilt);
  })), []);
  useFrame((_, delta) => { if (group.current) group.current.rotation.z += delta * 0.035; });
  return <group ref={group}>
    {lines.map((points, i) => <line key={i}>
      <bufferGeometry setFromPoints={points} />
      <lineBasicMaterial color={i === 1 ? "#d4a75a" : "#58dce6"} transparent opacity={0.32} />
    </line>)}
    <mesh><icosahedronGeometry args={[0.15, 1]} /><meshBasicMaterial color="#dceef0" wireframe transparent opacity={0.55} /></mesh>
    {Array.from({ length: 20 }, (_, i) => {
      const angle = i * 2.399;
      const radius = 0.55 + (i % 5) * 0.28;
      return <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.52, Math.sin(angle * 1.7) * 0.34]}>
        <sphereGeometry args={[i % 5 === 0 ? 0.025 : 0.012, 8, 8]} />
        <meshBasicMaterial color={i % 4 === 0 ? "#d9ad5e" : "#65e1e8"} transparent opacity={0.8} />
      </mesh>;
    })}
  </group>;
}

export default function OrbitalScene() {
  return <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
    <ambientLight intensity={0.5} />
    <OrbitalMesh />
  </Canvas>;
}
