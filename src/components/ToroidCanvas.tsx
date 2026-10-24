import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ToroidCanvasProps {
  className?: string;
  intensity?: number;
}

export function ToroidCanvas({ className = "", intensity = 1 }: ToroidCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 18;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // Geometry 1: Outer Torus Wireframe (Obsidian Toroidal Core)
    const torusGeo = new THREE.TorusGeometry(6.5, 1.8, 18, 54);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x4fe3ea,
      wireframe: true,
      transparent: true,
      opacity: 0.15 * intensity,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // Geometry 2: Inner Polyhedron (Amber nucleus)
    const polyGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const polyMat = new THREE.MeshBasicMaterial({
      color: 0xf0a832,
      wireframe: true,
      transparent: true,
      opacity: 0.22 * intensity,
    });
    const poly = new THREE.Mesh(polyGeo, polyMat);
    scene.add(poly);

    // Geometry 3: Orbiting Nodes (Linear-style glowing satellites)
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x4fe3ea);
    const amberColor = new THREE.Color(0xf0a832);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 7.5 + (Math.random() - 0.5) * 2.5;
      const heightOffset = (Math.random() - 0.5) * 3;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = heightOffset;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      const col = Math.random() > 0.4 ? cyanColor : amberColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.7 * intensity,
    });
    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Mouse tilt tracking
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      torus.rotation.x = 0.55 + mouseY * 0.4 + elapsedTime * 0.08;
      torus.rotation.y = elapsedTime * 0.12 + mouseX * 0.4;

      poly.rotation.x = -elapsedTime * 0.14;
      poly.rotation.y = -elapsedTime * 0.18;

      particles.rotation.y = elapsedTime * 0.15;
      particles.rotation.x = 0.2 + mouseY * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      torusGeo.dispose();
      torusMat.dispose();
      polyGeo.dispose();
      polyMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
