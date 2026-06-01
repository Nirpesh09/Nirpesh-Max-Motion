import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCode } from "@/components/FloatingCode";
import { CodeRain3D } from "@/components/CodeRain3D";
import { CodePanels3D } from "@/components/CodePanels3D";
import { TechSection3D } from "@/components/TechSection3D";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";
import { motion } from "framer-motion";

function NetworkGraph() {
  const group = useRef<THREE.Group>(null!);
  
  const nodes = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 30; i++) {
      temp.push(new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ));
    }
    return temp;
  }, []);

  const lines = useMemo(() => {
    const temp = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 2.5) {
          temp.push([nodes[i], nodes[j]]);
        }
      }
    }
    return temp;
  }, [nodes]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05;
      group.current.rotation.x = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((pos, i) => (
        <mesh key={`node-${i}`} position={pos}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#00ffff" />
        </mesh>
      ))}
      {lines.map((line, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(line);
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#0066ff" transparent opacity={0.3} />
          </line>
        );
      })}
    </group>
  );
}

export default function Technology() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingCode count={20} />
      </div>
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 relative z-10 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="inline-block glass-panel px-4 py-1 rounded-full border border-cyan-500/30 mb-6">
                <span className="text-cyan-400 font-orbitron text-xs font-bold tracking-widest uppercase">Under The Hood</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 leading-tight">
                Quantum-Resilient <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Core</span>
              </h1>
              <p className="text-xl text-gray-400 font-sans leading-relaxed mb-8">
                Nirpesh AI runs on a bespoke polymorphic inference engine. We've rebuilt the neural stack to minimize latency while maximizing contextual depth.
              </p>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 h-[500px] relative">
            <TechSection3D />
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-24 container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center text-white mb-16">Architecture Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { step: "1", title: "Input Layer", desc: "Multi-modal ingestion pipeline that normalizes data with zero loss of fidelity." },
            { step: "2", title: "Processing Core", desc: "Distributed GPU clusters executing parallel inference with predictive caching." },
            { step: "3", title: "Output Synthesis", desc: "Contextual refinement and formatting tailored to the specific query protocol." },
            { step: "4", title: "Distribution", desc: "Edge network delivery ensuring sub-50ms latency globally." }
          ].map((layer, i) => (
            <div key={i} className="glass-panel p-6 rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all flex flex-col relative group">
              <div className="absolute top-0 right-0 p-4 font-orbitron text-6xl font-black text-white/5 group-hover:text-cyan-500/10 transition-colors">
                {layer.step}
              </div>
              <h3 className="font-orbitron font-bold text-xl text-white mb-4 relative z-10">{layer.title}</h3>
              <p className="text-gray-400 text-sm relative z-10 flex-grow">{layer.desc}</p>
              
              {i !== 3 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-4 h-0.5 bg-cyan-500/30" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Network Graph 3D Section */}
      <section className="relative h-[600px] w-full bg-black border-y border-white/10">
        <div className="absolute inset-0 z-0">
          <WebGLErrorBoundary fallback={<div className="h-full w-full bg-cyan-900/10" />}>
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
              <NetworkGraph />
            </Canvas>
          </WebGLErrorBoundary>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 bg-black/50 p-8 rounded-3xl backdrop-blur-md border border-white/10">
          <h3 className="text-3xl font-orbitron font-bold text-white mb-2 neon-glow">Neural Topology</h3>
          <p className="text-cyan-200">Self-organizing semantic networks</p>
        </div>
      </section>

      {/* Specs Table */}
      <section className="py-24 container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center text-white mb-16">Technical Specifications</h2>
        
        <div className="max-w-4xl mx-auto glass-panel rounded-2xl overflow-hidden border border-white/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-6 font-orbitron text-cyan-400 font-bold uppercase tracking-wider text-sm">Parameter</th>
                <th className="p-6 font-orbitron text-cyan-400 font-bold uppercase tracking-wider text-sm">Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300 font-sans">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-white">Model Parameters</td>
                <td className="p-6">1.2 Trillion (Dynamic Sparse Routing)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-white">Average Latency</td>
                <td className="p-6">~42ms (Edge-cached)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-white">Context Window</td>
                <td className="p-6">256K Tokens (Infinite rolling buffer via RAG)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-white">Throughput</td>
                <td className="p-6">150,000 requests / second / shard</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-white">Modality Support</td>
                <td className="p-6">Text, Image, Audio, Code (Native AST)</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-medium text-white">Security Protocol</td>
                <td className="p-6">SOC2 Type II, HIPAA, End-to-End Encryption</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 3D Code Showcase ── */}
      <section className="relative overflow-hidden bg-black border-t border-white/5">
        {/* Code rain fills the background */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <CodeRain3D />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p className="text-orange-400 font-orbitron text-xs tracking-[0.35em] uppercase mb-3">Engine Room</p>
            <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white mb-4">
              The Code That <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Thinks</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">Three live inference modules spinning in real time — this is what runs under every request.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full"
            style={{ height: 560 }}
          >
            <CodePanels3D className="w-full h-full" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
