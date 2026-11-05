import { Canvas, useFrame } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  PlaneGeometry,
} from 'three'

const CREAM = '#f0e7da'
const TAN = '#d1c2a5'
const AMBER = '#c67c14'
const AMBER_HOT = '#f59e0b'
const SLATE = '#262626'

type AtomaStageProps = {
  selected: number
  onSelect: (index: number) => void
}

function hyperbolicPlane(width = 2.6, height = 1.7, warp = 0.22) {
  const geometry = new PlaneGeometry(width, height, 42, 28)
  const pos = geometry.attributes.position
  for (let i = 0; i < pos.count; i += 1) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    pos.setZ(i, (x * x - y * y) * warp)
  }
  geometry.computeVertexNormals()
  return geometry
}

function FloorDots() {
  const geometry = useMemo(() => {
    const count = 900
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return geo
  }, [])
  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={TAN}
        size={0.016}
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  )
}

function Wire({
  color,
  opacity = 0.88,
}: {
  color: string
  opacity?: number
}) {
  return (
    <meshBasicMaterial
      color={color}
      wireframe
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  )
}

function pick(index: number, onSelect: (index: number) => void) {
  return {
    onClick: (event: { stopPropagation: () => void }) => {
      event.stopPropagation()
      onSelect(index)
    },
    onPointerOver: (event: { stopPropagation: () => void }) => {
      event.stopPropagation()
      document.body.style.cursor = 'pointer'
    },
    onPointerOut: () => {
      document.body.style.cursor = 'grab'
    },
  }
}

function LorentzMind({ color }: { color: string }) {
  const sheet = useMemo(() => hyperbolicPlane(3.15, 2.05, 0.34), [])
  return (
    <mesh rotation={[-0.62, 0.18, 0.04]} geometry={sheet}>
      <Wire color={color} opacity={0.9} />
    </mesh>
  )
}

function NestedKv({ color, hot }: { color: string; hot: boolean }) {
  const spin = useRef<Group>(null)
  useFrame((state) => {
    if (!spin.current) return
    spin.current.rotation.y = state.clock.elapsedTime * 0.42
    spin.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })
  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.5, 32, 20]} />
        <Wire color={color} opacity={hot ? 0.7 : 0.38} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 24, 16]} />
        <Wire color={color} opacity={0.58} />
      </mesh>
      <group ref={spin}>
        <mesh>
          <sphereGeometry args={[0.2, 18, 12]} />
          <Wire color={color} opacity={0.9} />
        </mesh>
      </group>
    </group>
  )
}

function PhaseClocks({ color }: { color: string }) {
  const fast = useRef<Group>(null)
  const slow = useRef<Group>(null)
  useFrame((_, delta) => {
    if (fast.current) fast.current.rotation.y += delta * 0.42
    if (slow.current) slow.current.rotation.z += delta * 0.21
  })
  const ring = 1.12
  return (
    <group>
      <group ref={fast}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ring, 0.011, 12, 96]} />
          <meshBasicMaterial color={color} transparent opacity={0.92} />
        </mesh>
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(a) * ring, 0, Math.sin(a) * ring]}>
              <sphereGeometry args={[0.04, 10, 10]} />
              <meshStandardMaterial color={color} emissive={AMBER} emissiveIntensity={0.5} />
            </mesh>
          )
        })}
      </group>
      <group ref={slow}>
        <mesh>
          <torusGeometry args={[ring, 0.008, 10, 80]} />
          <meshBasicMaterial color={color} transparent opacity={0.62} />
        </mesh>
        {[0, 1].map((i) => {
          const a = i * Math.PI
          return (
            <mesh key={i} position={[Math.cos(a) * ring, Math.sin(a) * ring, 0]}>
              <sphereGeometry args={[0.032, 10, 10]} />
              <meshStandardMaterial color={color} emissive={AMBER} emissiveIntensity={0.35} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

const ICOSA_VERTS: Array<[number, number, number]> = (() => {
  const phi = (1 + Math.sqrt(5)) / 2
  const raw: Array<[number, number, number]> = [
    [0, 1, phi],
    [0, 1, -phi],
    [0, -1, phi],
    [0, -1, -phi],
    [1, phi, 0],
    [1, -phi, 0],
    [-1, phi, 0],
    [-1, -phi, 0],
    [phi, 0, 1],
    [phi, 0, -1],
    [-phi, 0, 1],
    [-phi, 0, -1],
  ]
  return raw.map(([x, y, z]) => {
    const n = Math.hypot(x, y, z) || 1
    return [x / n, y / n, z / n]
  })
})()

function Atlas13({ color, hot }: { color: string; hot: boolean }) {
  const shell = 0.82
  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[shell, 0]} />
        <Wire color={color} opacity={0.72} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.07, 16, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={hot ? AMBER_HOT : AMBER}
          emissiveIntensity={hot ? 1.2 : 0.4}
        />
      </mesh>
      {ICOSA_VERTS.map(([x, y, z], i) => (
        <mesh key={i} position={[x * shell, y * shell, z * shell]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial color={color} emissive={AMBER} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  )
}

function OneMind({
  selected,
  onSelect,
}: {
  selected: number
  onSelect: (index: number) => void
}) {
  const tint = (index: number) => (selected === index ? AMBER_HOT : CREAM)
  const hot = (index: number) => selected === index

  return (
    <group>
      <group {...pick(0, onSelect)}>
        <LorentzMind color={tint(0)} />
      </group>
      <group {...pick(1, onSelect)}>
        <PhaseClocks color={tint(1)} />
      </group>
      <group {...pick(2, onSelect)}>
        <NestedKv color={tint(2)} hot={hot(2)} />
      </group>
      <group {...pick(3, onSelect)}>
        <Atlas13 color={tint(3)} hot={hot(3)} />
      </group>
    </group>
  )
}

function Scene({
  selected,
  onSelect,
  reduce,
}: AtomaStageProps & { reduce: boolean }) {
  return (
    <>
      <color attach="background" args={[SLATE]} />
      <fog attach="fog" args={[SLATE, 12, 22]} />
      <ambientLight intensity={0.48} />
      <directionalLight position={[5, 7, 4]} intensity={1.05} color={CREAM} />
      <pointLight position={[-2.5, 2.4, 3.5]} intensity={1.6} color={AMBER} />
      <pointLight position={[0, -1.2, 2]} intensity={0.75} color={AMBER_HOT} />
      <FloorDots />
      <Grid
        position={[0, -1.55, 0]}
        args={[22, 22]}
        cellSize={0.38}
        cellThickness={0.45}
        cellColor="#3a3a3f"
        sectionSize={1.9}
        sectionThickness={0.9}
        sectionColor={AMBER}
        fadeDistance={16}
        fadeStrength={1.15}
        infiniteGrid
      />
      <OneMind selected={selected} onSelect={onSelect} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minDistance={4.2}
        maxDistance={11}
        autoRotate={!reduce}
        autoRotateSpeed={0.28}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI * 0.72}
        minPolarAngle={Math.PI * 0.22}
      />
    </>
  )
}

export function AtomaStage({ selected, onSelect }: AtomaStageProps) {
  const host = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const node = host.current
    if (!node) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={host} className="stage-webgl">
      <Canvas
        dpr={[1, 1.6]}
        frameloop={visible ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [3.5, 1.85, 4.4], fov: 40 }}
        onCreated={({ gl }) => {
          gl.setClearColor(SLATE, 1)
          document.body.style.cursor = 'grab'
        }}
        onPointerDown={() => {
          document.body.style.cursor = 'grabbing'
        }}
        onPointerUp={() => {
          document.body.style.cursor = 'grab'
        }}
      >
        <Scene selected={selected} onSelect={onSelect} reduce={reduce} />
      </Canvas>
      <p className="stage-hint">
        {reduce ? 'The mind' : 'Drag to orbit · click a part'}
      </p>
    </div>
  )
}
