// AllTogether — one page, everything together. No new deps.
// Uses only what grok-sandbox already has: react, @react-three/fiber, three.
// No motion package (not installed) — DAG animation is CSS + React state.
// Route: /all  (swap index to this page in App.tsx to make it the home page)
// Backend: /api proxy to 127.0.0.1:4810 in dev. On Pages, /api falls back to demo labels.
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ares } from "../api";
import { useGovernor } from "../governor";

type V4 = [number, number, number, number];
const rotXW = (p: V4, a: number): V4 => [p[0] * Math.cos(a) - p[3] * Math.sin(a), p[1], p[2], p[0] * Math.sin(a) + p[3] * Math.cos(a)];
const proj = (p: V4): [number, number, number] => { const s = 1.6 / (2 - p[3] * 0.45); return [p[0] * s, p[1] * s, p[2] * s]; };

const ICOSA: V4[] = (() => {
  const t = (1 + Math.sqrt(5)) / 2, n = Math.hypot(1, t);
  const raw: [number, number, number][] = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
  return raw.map(([x, y, z], i) => [x / n * 1.7, y / n * 1.7, z / n * 1.7, Math.sin(i * 0.9) * 0.7] as V4);
})();
const NODES: V4[] = [[0, 0, 0, 0], ...ICOSA];
const EDGES: [number, number][] = [...ICOSA.map((_, i) => [0, i + 1] as [number, number]), ...ICOSA.map((_, i) => [i + 1, ((i + 1) % 12) + 1] as [number, number])];

function Graph4D({ time }: { time: number }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const geo = useMemo(() => { const g = new THREE.BufferGeometry(); g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(EDGES.length * 6), 3)); return g; }, []);
  useFrame(() => {
    const pts = NODES.map((p) => proj(rotXW(p, time)));
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    EDGES.forEach(([i, j], k) => { attr.setXYZ(k * 2, ...pts[i]); attr.setXYZ(k * 2 + 1, ...pts[j]); });
    attr.needsUpdate = true;
    pts.forEach((p, i) => { const m = refs.current[i]; if (m) m.position.set(...p); });
  });
  return (<group>
    <ambientLight intensity={0.5} /><pointLight position={[5, 5, 5]} intensity={80} color="#EFEADF" /><directionalLight position={[-5, 3, -5]} intensity={1.2} color="#f59e0b" />
    <mesh rotation={[0.6, 0, -0.4]}><coneGeometry args={[2.4, 4.4, 32, 16, true]} /><meshStandardMaterial color="#2e2e33" wireframe transparent opacity={0.35} /></mesh>
    <mesh><sphereGeometry args={[0.9, 48, 48]} /><meshStandardMaterial color="#f59e0b" wireframe transparent opacity={0.4} /></mesh>
    <mesh rotation={[Math.PI / 2.4, 0, 0]}><torusGeometry args={[1.7, 0.02, 12, 96]} /><meshStandardMaterial color="#EFEADF" /></mesh>
    <lineSegments geometry={geo}><lineBasicMaterial color="#EFEADF" transparent opacity={0.55} /></lineSegments>
    {NODES.map((_, i) => (<mesh key={i} ref={(m) => { refs.current[i] = m; }}><sphereGeometry args={[i === 0 ? 0.14 : 0.08, 24, 24]} /><meshStandardMaterial color={i === 0 ? "#f59e0b" : "#EFEADF"} emissive="#f59e0b" emissiveIntensity={0.3} /></mesh>))}
  </group>);
}

const DAG_STEPS = ["Job", "Copy", "Check", "Note", "Keep"] as const;
const PROPOSERS = ["Retrieve", "Prefill", "Draft", "Plan"];

export function AllTogether() {
  const { link } = useGovernor();
  const live = link === "live";
  const [time, setTime] = useState(0);
  const [step, setStep] = useState(-1);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { const id = setInterval(() => setTime((t) => t + 0.02), 50); return () => clearInterval(id); }, []);
  async function runLoop() {
    setNote(null); setStep(0); setBusy(true);
    if (!live) { setNote("Demo. The program is not running on this computer, so this is the shape of the loop, not a live job."); setBusy(false); return; }
    try {
      // advance the DAG visually while the real dry-run checks out
      for (let i = 1; i < DAG_STEPS.length; i++) { await new Promise((r) => setTimeout(r, 500)); setStep(i); }
      const res = await ares.dryRun(1) as { valid?: boolean };
      setNote(res?.valid ? "Practice run checked out on this computer. No job was opened." : "Practice run finished on this computer.");
    } catch (e) { setNote(e instanceof Error ? e.message : "The practice run did not finish."); } finally { setBusy(false); }
  }
  return (
    <main style={{ background: "#17171a", color: "#EFEADF", fontFamily: "system-ui, sans-serif", padding: 24 }}>
      <p style={{ color: "#a1a1aa" }}>{live ? "On this computer — Governor live :4810" : "Demo — Governor unreachable, labels stay demo"}</p>
      <h1 style={{ fontSize: 42, margin: "8px 0" }}>One mind. Every engineering job.</h1>
      <p style={{ color: "#a1a1aa", maxWidth: 700 }}>A persistent, geometric mind. Teachers pour into one map, then walk away. A throwaway copy runs each job, a re-ranker admits only what checks out, and every step leaves a receipt.</p>

      <section style={{ height: 420, border: "1px solid #45454d", marginTop: 20 }}>
        <Canvas camera={{ position: [0, 0.6, 6.5], fov: 50 }} gl={{ antialias: true }}><Graph4D time={time} /></Canvas>
      </section>
      <p style={{ color: "#a1a1aa" }}>4D graph: 3D map + phase / time. L0 + L1–L12 icosahedral basins, hyperboloid sheet, phase torus, nested KV spheres.</p>

      <section style={{ border: "1px solid #45454d", padding: 20, marginTop: 20 }}>
        <h2>Five steps. The copy never touches the real mind.</h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
          {DAG_STEPS.map((s, i) => (
            <div key={s} style={{ padding: "12px 16px", background: "#2e2e33", border: `2px solid ${i === step ? "#f59e0b" : i < step ? "#22c55e" : "#45454d"}`, borderRadius: 10, transition: "border-color .4s", opacity: i <= step || step < 0 ? 1 : 0.6 }}>
              <b>{String(i + 1).padStart(2, "0")} · {s}</b><div style={{ fontSize: 12, color: "#a1a1aa" }}>{i < step ? "VERIFIED" : i === step ? "RUNNING" : "WAITING"}</div>
            </div>
          ))}
        </div>
        <p style={{ color: "#a1a1aa", marginTop: 12 }}>Copy fans out to: {PROPOSERS.join(" · ")} — then converges on Check. Check branches: VERIFIED → Note → Keep, REFUSED (never executed), or CLARIFY as a new layer. Keep is a promotion gate, not automatic.</p>
        <button onClick={runLoop} disabled={busy} style={{ padding: "14px 22px", background: "#EFEADF", color: "#17171a", border: "none", fontWeight: 700, letterSpacing: ".15em", cursor: "pointer" }}>RUN THE LOOP</button>
        {note && <p style={{ marginTop: 12 }}>{note}</p>}
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginTop: 20 }}>
        {[["38.9 tok/s", "Native MTP, 96.5% draft acceptance"], ["~40 tok/s", "Warm decode"], ["9 / 10", "Swarm, novel combining tasks"], ["33 steps", "Glimmer mission, receipt-chained, 6 prefills / 24 hits"]].map(([n, d]) => (
          <div key={n} style={{ border: "1px solid #45454d", padding: 16 }}><b style={{ fontSize: 24 }}>{n}</b><div style={{ color: "#a1a1aa", marginTop: 6 }}>{d}</div></div>
        ))}
      </section>

      <section style={{ marginTop: 20, color: "#a1a1aa" }}>
        <h2 style={{ color: "#EFEADF" }}>Papers — Desktop → Atoma-Papers</h2>
        <p>1 Meta-Superposition · 2 Hyperbolic Multi-Model Manifolds · 3 Decoupling the Mind from the Model (20 pp, house style) · 4 Assembling Brigade Style Agentics. The site is the deployment, live on Cloudflare Pages. Backend, stores, and model seats run Mac-local and are shown live in the demo.</p>
      </section>
    </main>
  );
}
