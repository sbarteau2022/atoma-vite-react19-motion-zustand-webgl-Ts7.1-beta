import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";

function Atom() {
  const group=useRef<THREE.Group>(null), core=useRef<THREE.Mesh>(null);
  const pointer=useRef({x:0,y:0});
  useEffect(()=>{const move=(e:PointerEvent)=>{pointer.current={x:(e.clientX/window.innerWidth-.5)*.45,y:(e.clientY/window.innerHeight-.5)*.3}};window.addEventListener("pointermove",move,{passive:true});return()=>window.removeEventListener("pointermove",move)},[]);
  useFrame(({clock},delta)=>{if(!group.current)return;const t=clock.elapsedTime;group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,t*.075+pointer.current.x,3,Math.min(delta,.05));group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,.5+pointer.current.y,3,Math.min(delta,.05));group.current.rotation.z=.32+Math.sin(t*.16)*.1;if(core.current)core.current.scale.setScalar(1+Math.sin(t*1.5)*.035)});
  return <group ref={group} rotation={[.5,.3,.32]}>
    {([[0,0,0],[Math.PI/2,0,0],[0,Math.PI/2,0]] as [number,number,number][]).map((rotation,i)=><group key={i} rotation={rotation}>
      <mesh><torusGeometry args={[2.4,.064,12,160]}/><meshStandardMaterial color="#bec9d6" metalness={.94} roughness={.21}/></mesh>
      <mesh position={[0,0,.054]}><torusGeometry args={[2.4,.012,6,160]}/><meshBasicMaterial color={i===1?"#e4b16a":"#39bfff"}/></mesh>
    </group>)}
    <mesh ref={core}><sphereGeometry args={[.43,48,32]}/><meshPhysicalMaterial color="#178bc7" metalness={.65} roughness={.1} clearcoat={1} emissive="#087ba8" emissiveIntensity={1.1}/></mesh>
    <mesh><sphereGeometry args={[.58,32,24]}/><meshBasicMaterial color="#39beff" transparent opacity={.045} depthWrite={false}/></mesh>
  </group>;
}
class SceneBoundary extends Component<{children:ReactNode;fallback:ReactNode},{failed:boolean}>{
 state={failed:false};static getDerivedStateFromError(){return {failed:true}};render(){return this.state.failed?this.props.fallback:this.props.children}
}
export default function OrbitalScene() {
 const reduced=useReducedMotion(),host=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(true),[active,setActive]=useState(!document.hidden),[lost,setLost]=useState(false);
 useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:"100px"});if(host.current)observer.observe(host.current);const change=()=>setActive(!document.hidden);document.addEventListener("visibilitychange",change);return()=>{observer.disconnect();document.removeEventListener("visibilitychange",change)}},[]);
 const fallback=<img className="atom-scene-fallback" src="/atoma-atom.png" alt=""/>;
 return <div ref={host} className="atom-scene"><SceneBoundary fallback={fallback}>{reduced||lost?fallback:<Canvas fallback={fallback} frameloop={visible&&active?"always":"never"} camera={{position:[0,0,7.5],fov:48}} dpr={[1,1.5]} gl={{alpha:true,antialias:true,powerPreference:"low-power"}} onCreated={({gl})=>{gl.domElement.addEventListener("webglcontextlost",()=>setLost(true),{once:true})}}><ambientLight intensity={.7}/><directionalLight position={[3,4,4]} color="#d5eaff" intensity={4}/><pointLight position={[-4,-1,2]} color="#24aaff" intensity={35}/><pointLight position={[3,-3,1]} color="#e4ac68" intensity={20}/><Atom/></Canvas>}</SceneBoundary></div>;
}
