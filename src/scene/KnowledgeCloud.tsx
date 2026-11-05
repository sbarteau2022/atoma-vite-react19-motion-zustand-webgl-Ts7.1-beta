import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  LineSegments,
  Object3D,
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
} from 'three'
import { labTitle } from '../siteNav'
import { cloudLinks, cloudNodes } from './preprintCloud'

const CLUSTERS = ['Meta-superposition', 'Hyperbolic manifolds', 'Brigade']
const HUE = [32, 198, 332]

type Body = { x: number; y: number; z: number; vx: number; vy: number; vz: number }

type CloudProps = {
  nodeSize: number
  linkOpacity: number
  showLinks: boolean
  repulsion: number
  linkLength: number
  center: number
  strength: number
  paused: boolean
  flat: boolean
  cluster: number
  resetKey: number
  selected: number | null
  onSelect: (index: number | null) => void
  labels: RefObject<HTMLDivElement | null>
}

function seed(count: number): Body[] {
  return Array.from({ length: count }, (_, i) => {
    const cluster = cloudNodes[i].cluster
    const angle = i * 2.399963
    const radius = 6 + (i % 23) * 0.35
    return {
      x: Math.cos(angle) * radius + (cluster - 1) * 3.2,
      y: Math.sin(angle) * radius * 0.72,
      z: (((i * 17) % 50) - 25) / 8,
      vx: 0,
      vy: 0,
      vz: 0,
    }
  })
}

function step(bodies: Body[], params: CloudProps) {
  const cell = 1.6
  const buckets = new Map<string, number[]>()
  for (let i = 0; i < bodies.length; i += 1) {
    const body = bodies[i]
    const key = `${Math.round(body.x / cell)}:${Math.round(body.y / cell)}:${Math.round(body.z / cell)}`
    const list = buckets.get(key)
    if (list) list.push(i)
    else buckets.set(key, [i])
  }
  for (const list of buckets.values()) {
    for (let a = 0; a < list.length; a += 1) {
      for (let b = a + 1; b < list.length; b += 1) {
        const i = list[a]
        const j = list[b]
        let dx = bodies[i].x - bodies[j].x
        let dy = bodies[i].y - bodies[j].y
        let dz = bodies[i].z - bodies[j].z
        const d2 = dx * dx + dy * dy + dz * dz + 0.08
        const force = params.repulsion / d2
        const inv = 1 / Math.sqrt(d2)
        dx *= inv
        dy *= inv
        dz *= inv
        bodies[i].vx += dx * force
        bodies[i].vy += dy * force
        bodies[i].vz += dz * force
        bodies[j].vx -= dx * force
        bodies[j].vy -= dy * force
        bodies[j].vz -= dz * force
      }
    }
  }
  for (const [a, b] of cloudLinks) {
    const A = bodies[a]
    const B = bodies[b]
    let dx = B.x - A.x
    let dy = B.y - A.y
    let dz = B.z - A.z
    const dist = Math.hypot(dx, dy, dz) + 0.001
    const force = ((dist - params.linkLength) * params.strength) / dist
    A.vx += dx * force
    A.vy += dy * force
    A.vz += dz * force
    B.vx -= dx * force
    B.vy -= dy * force
    B.vz -= dz * force
  }
  for (const body of bodies) {
    body.vx -= body.x * params.center
    body.vy -= body.y * params.center
    body.vz -= body.z * params.center * (params.flat ? 6 : 1)
    body.vx *= 0.8
    body.vy *= 0.8
    body.vz *= 0.8
    body.x += body.vx
    body.y += body.vy
    body.z += params.flat ? body.vz * 0.15 : body.vz
  }
}

function nodeColor(index: number) {
  const color = new Color()
  const drift = ((index * 13) % 28) - 14
  color.setHSL(((HUE[cloudNodes[index].cluster] + drift) % 360) / 360, 0.7, 0.62)
  return color
}

function CloudField(props: CloudProps) {
  const mesh = useRef<InstancedMesh>(null)
  const { gl, camera } = useThree()
  const pick = useMemo(() => new Vector3(), [])
  const lines = useRef<LineSegments>(null)
  const bodies = useRef<Body[]>(seed(cloudNodes.length))
  const dummy = useMemo(() => new Object3D(), [])
  const colors = useMemo(() => cloudNodes.map((_, index) => nodeColor(index)), [])
  const dimmed = useMemo(() => colors.map((color) => color.clone().multiplyScalar(0.22)), [colors])
  const neighbors = useMemo(() => {
    const lists = cloudNodes.map(() => [] as number[])
    for (const [a, b] of cloudLinks) {
      lists[a].push(b)
      lists[b].push(a)
    }
    return lists
  }, [])
  const linePositions = useMemo(() => new Float32Array(cloudLinks.length * 6), [])

  useEffect(() => {
    bodies.current = seed(cloudNodes.length)
  }, [props.resetKey])

  useEffect(() => {
    const el = gl.domElement
    function onPointerDown(event: PointerEvent) {
      const rect = el.getBoundingClientRect()
      const px = event.clientX - rect.left
      const py = event.clientY - rect.top
      let best = -1
      let bestDistance = 20 * 20
      bodies.current.forEach((body, index) => {
        if (props.cluster >= 0 && cloudNodes[index].cluster !== props.cluster) return
        pick.set(body.x, body.y, body.z).project(camera)
        const sx = (pick.x * 0.5 + 0.5) * rect.width
        const sy = (1 - (pick.y * 0.5 + 0.5)) * rect.height
        const distance = (sx - px) ** 2 + (sy - py) ** 2
        if (distance < bestDistance) {
          bestDistance = distance
          best = index
        }
      })
      props.onSelect(best >= 0 ? best : null)
    }
    el.addEventListener('pointerdown', onPointerDown)
    return () => el.removeEventListener('pointerdown', onPointerDown)
  }, [camera, gl, pick, props])

  useFrame(({ camera, size }) => {
    if (!props.paused) {
      step(bodies.current, props)
      step(bodies.current, props)
    }
    const points = mesh.current
    if (!points) return
    const selected = props.selected
    const near = new Set<number>()
    if (selected != null) {
      near.add(selected)
      for (const index of neighbors[selected] ?? []) near.add(index)
    }
    cloudNodes.forEach((node, index) => {
      const body = bodies.current[index]
      const hidden = props.cluster >= 0 && node.cluster !== props.cluster
      const scale = hidden ? 0 : (0.045 + Math.min(node.weight, 40) / 900) * props.nodeSize
      dummy.position.set(body.x, body.y, body.z)
      dummy.scale.setScalar(scale)
      dummy.updateMatrix()
      points.setMatrixAt(index, dummy.matrix)
      const dim = selected != null && !near.has(index)
      points.setColorAt(index, dim ? dimmed[index] : colors[index])
    })
    points.instanceMatrix.needsUpdate = true
    if (points.instanceColor) points.instanceColor.needsUpdate = true

    const geometry = lines.current?.geometry as BufferGeometry | undefined
    const attribute = geometry?.getAttribute('position') as Float32BufferAttribute | undefined
    if (attribute && lines.current) {
      let cursor = 0
      let drawn = 0
      for (const [a, b] of cloudLinks) {
        const hide =
          (props.cluster >= 0 &&
            (cloudNodes[a].cluster !== props.cluster || cloudNodes[b].cluster !== props.cluster)) ||
          (selected != null && !near.has(a) && !near.has(b))
        if (!hide) {
          const A = bodies.current[a]
          const B = bodies.current[b]
          linePositions[cursor] = A.x
          linePositions[cursor + 1] = A.y
          linePositions[cursor + 2] = A.z
          linePositions[cursor + 3] = B.x
          linePositions[cursor + 4] = B.y
          linePositions[cursor + 5] = B.z
          cursor += 6
          drawn += 1
        }
      }
      attribute.set(linePositions.subarray(0, cursor))
      attribute.needsUpdate = true
      geometry?.setDrawRange(0, drawn * 2)
      lines.current.visible = props.showLinks
    }

    const root = props.labels.current
    if (!root) return
    const distance = camera.position.length()
    root.style.display = distance > 26 ? 'none' : 'block'
    const show = selected == null ? [] : [selected, ...(neighbors[selected] ?? [])].slice(0, 8)
    const children = root.children
    show.forEach((index, order) => {
      const el = children[order] as HTMLDivElement | undefined
      if (!el) return
      const body = bodies.current[index]
      const projected = dummy.position.set(body.x, body.y, body.z).project(camera)
      el.style.display = projected.z > 1 ? 'none' : 'block'
      el.style.transform = `translate(${((projected.x * 0.5 + 0.5) * size.width).toFixed(1)}px, ${((1 - (projected.y * 0.5 + 0.5)) * size.height).toFixed(1)}px)`
      el.textContent = cloudNodes[index].id
    })
    for (let order = show.length; order < children.length; order += 1) {
      ;(children[order] as HTMLElement).style.display = 'none'
    }
  })

  return (
    <>
      <color attach="background" args={['#090a0e']} />
      <instancedMesh ref={mesh} args={[undefined, undefined, cloudNodes.length]}>
        <sphereGeometry args={[1, 8, 6]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            usage={DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f0e7da" transparent opacity={props.linkOpacity} />
      </lineSegments>
      <OrbitControls makeDefault enableDamping dampingFactor={0.12} minDistance={4} maxDistance={42} />
    </>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="block">
      <span className="flex justify-between text-[#8a847c]">
        {label}
        <span className="font-mono text-[#f0e7da]">{Number(value.toFixed(2))}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[#c67c14]"
      />
    </label>
  )
}

export function MindCloudScreen() {
  const [params] = useSearchParams()
  const pageName = labTitle('mind', params.get('as'))
  const [nodeSize, setNodeSize] = useState(1)
  const [linkOpacity, setLinkOpacity] = useState(0.14)
  const [showLinks, setShowLinks] = useState(true)
  const [repulsion, setRepulsion] = useState(0.11)
  const [linkLength, setLinkLength] = useState(1.35)
  const [center, setCenter] = useState(0.004)
  const [strength, setStrength] = useState(0.045)
  const [paused, setPaused] = useState(false)
  const [flat, setFlat] = useState(false)
  const [cluster, setCluster] = useState(-1)
  const [resetKey, setResetKey] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const labels = useRef<HTMLDivElement>(null)
  const node = selected == null ? null : cloudNodes[selected]
  const neighborIds = useMemo(() => {
    if (selected == null) return []
    const ids = new Set<number>()
    for (const [a, b] of cloudLinks) {
      if (a === selected) ids.add(b)
      if (b === selected) ids.add(a)
    }
    return [...ids]
  }, [selected])

  const cloud: CloudProps = {
    nodeSize,
    linkOpacity,
    showLinks,
    repulsion,
    linkLength,
    center,
    strength,
    paused,
    flat,
    cluster,
    resetKey,
    selected,
    onSelect: setSelected,
    labels,
  }

  return (
    <div className="grid h-full min-h-0 grid-cols-[200px_1fr_210px] bg-[#090a0e] text-[#f0e7da]">
      <aside className="overflow-y-auto border-r border-white/10 px-2.5 py-2 text-[11px] space-y-3">
        <div>
          <p className="text-xs">{pageName}</p>
          <p className="mt-1 text-[10px] leading-snug text-[#8a847c]">
            {cloudNodes.length} terms, {cloudLinks.length} links, from the three November 4 preprints.
            Not a live vault.
          </p>
        </div>
        <section className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Appearance</p>
          <Slider label="Node size" value={nodeSize} min={0.4} max={2.2} step={0.05} onChange={setNodeSize} />
        </section>
        <section className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Links</p>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#c67c14]" checked={showLinks} onChange={(event) => setShowLinks(event.target.checked)} />
            Show links
          </label>
          <Slider label="Opacity" value={linkOpacity} min={0.05} max={0.8} step={0.01} onChange={setLinkOpacity} />
        </section>
        <section className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Layout</p>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#c67c14]" checked={!flat} onChange={(event) => setFlat(!event.target.checked)} />
            3D
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#c67c14]" checked={!paused} onChange={(event) => setPaused(!event.target.checked)} />
            Free layout
          </label>
        </section>
        <section className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Clusters</p>
          <div className="flex flex-wrap gap-1">
            {[-1, 0, 1, 2].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setCluster(id)}
                className={`h-6 px-2 rounded cursor-pointer ${
                  cluster === id ? 'bg-[#c67c14] text-[#1c1c1c]' : 'bg-[#2e2e33] text-[#f0e7da]'
                }`}
              >
                {id < 0 ? 'All' : CLUSTERS[id].split(' ')[0]}
              </button>
            ))}
          </div>
        </section>
        <section className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Physics</p>
          <Slider label="Repulsion" value={repulsion} min={0.02} max={0.28} step={0.01} onChange={setRepulsion} />
          <Slider label="Link length" value={linkLength} min={0.4} max={3} step={0.05} onChange={setLinkLength} />
          <Slider label="Pull to center" value={center} min={0} max={0.04} step={0.002} onChange={setCenter} />
          <Slider label="Link strength" value={strength} min={0.005} max={0.12} step={0.005} onChange={setStrength} />
          <button
            type="button"
            onClick={() => setResetKey((value) => value + 1)}
            className="h-7 w-full rounded bg-[#2e2e33] text-[#f0e7da] cursor-pointer hover:bg-[#34343a]"
          >
            Re-form the cloud
          </button>
        </section>
      </aside>
      <div
        className="relative min-h-0"
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelected(null)
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 16], fov: 50 }}
          className="absolute inset-0"
          gl={{ antialias: true }}
        >
          <CloudField {...cloud} />
        </Canvas>
        <div ref={labels} className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }, (_, index) => (
            <span
              key={index}
              className="absolute left-0 top-0 text-[10px] text-[#f0e7da]"
              style={{ display: 'none' }}
            />
          ))}
        </div>
      </div>
      <aside className="overflow-y-auto border-l border-white/10 px-2.5 py-2 text-[11px]">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Term</p>
        {node == null ? (
          <p className="mt-2 text-[#8a847c]">Click a point. Neighbors stay bright. The rest dim.</p>
        ) : (
          <>
            <h2 className="mt-1 text-lg leading-tight">{node.id}</h2>
            <p className="mt-1 text-[#c67c14]">{CLUSTERS[node.cluster]}</p>
            <p className="mt-2 text-[#8a847c]">Counted {node.weight} times in that preprint.</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#8a847c]">Linked terms</p>
            <ul className="mt-1 space-y-1">
              {neighborIds.map((index) => (
                <li key={cloudNodes[index].id}>
                  <button
                    type="button"
                    onClick={() => setSelected(index)}
                    className="text-left text-[#f0e7da] hover:text-[#c67c14] cursor-pointer"
                  >
                    {cloudNodes[index].id}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>
    </div>
  )
}

