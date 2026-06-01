import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCode } from "@/components/FloatingCode";
import { CodeOrbit3D } from "@/components/CodeOrbit3D";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Brain, Cpu, Zap, Activity, Layers, Infinity as InfinityIcon } from "lucide-react";
import { useRef, useState } from "react";
import * as THREE from "three";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";
import { motion } from "framer-motion";

const features = [
  { 
    icon: Brain, 
    title: "Neural Processing", 
    desc: "Advanced cognitive pathways mimicking human logic structures.",
    sub: ["Human-like reasoning", "Pattern recognition", "Contextual awareness"]
  },
  { 
    icon: Cpu, 
    title: "Quantum Reasoning", 
    desc: "Solving complex multi-dimensional problems in milliseconds.",
    sub: ["Multi-dimensional compute", "Zero-latency response", "Parallel inference"]
  },
  { 
    icon: Zap, 
    title: "Adaptive Learning", 
    desc: "Self-optimizing algorithms that evolve with every interaction.",
    sub: ["Continuous fine-tuning", "Dynamic weights", "Feedback loops"]
  },
  { 
    icon: Layers, 
    title: "Multimodal Intelligence", 
    desc: "Seamless understanding across text, image, audio, and code.",
    sub: ["Cross-modal synthesis", "Native video processing", "Audio generation"]
  },
  { 
    icon: Activity, 
    title: "Real-time Synthesis", 
    desc: "Instantaneous data assimilation and insight generation.",
    sub: ["Streaming architecture", "Live web access", "Instant insights"]
  },
  { 
    icon: InfinityIcon, 
    title: "Infinite Scale", 
    desc: "Boundless architectural capacity for planetary-scale operations.",
    sub: ["Distributed nodes", "Auto-scaling infra", "Planetary reach"]
  },
];

function FloatingShapes() {
  const group = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, 0]}>
          <torusKnotGeometry args={[0.8, 0.2, 100, 16]} />
          <meshPhysicalMaterial color="#00ffff" metalness={0.9} roughness={0.1} emissive="#004444" clearcoat={1} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <mesh position={[0, -1, 1]}>
          <dodecahedronGeometry args={[1]} />
          <meshPhysicalMaterial color="#ff00ff" metalness={0.9} roughness={0.1} emissive="#440044" clearcoat={1} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[3, 1, -1]}>
          <octahedronGeometry args={[1]} />
          <meshPhysicalMaterial color="#ffd700" metalness={0.9} roughness={0.1} emissive="#443300" clearcoat={1} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-1.5, -2, -2]}>
          <icosahedronGeometry args={[0.8]} />
          <meshPhysicalMaterial color="#00ff00" metalness={0.9} roughness={0.1} emissive="#004400" clearcoat={1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-cyan-300">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingCode count={20} />
      </div>
      <Navbar />
      
      {/* 3D Header Section */}
      <section className="relative h-[600px] w-full pt-20 flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <WebGLErrorBoundary fallback={<div className="h-full w-full bg-cyan-900/10 animate-pulse" />}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} />
              <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />
              <FloatingShapes />
            </Canvas>
          </WebGLErrorBoundary>
        </div>
        
        <div className="relative z-10 text-center pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 neon-glow"
          >
            Cognitive Architecture
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-cyan-200/80 max-w-2xl mx-auto font-sans"
          >
            The building blocks of our advanced artificial intelligence system.
          </motion.p>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-24 container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-8 flex flex-col gap-4 relative overflow-hidden group border-white/10 hover:border-cyan-500/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <feature.icon size={28} className="text-cyan-400" />
              </div>
              <h3 className="font-orbitron text-2xl font-bold text-white mt-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">{feature.desc}</p>
              
              <ul className="space-y-3 mt-4 flex-grow">
                {feature.sub.map((item, j) => (
                  <li key={j} className="flex items-center gap-3 text-cyan-100/70 text-sm font-sans">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-cyan-400 group-hover:w-full transition-all duration-500 shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="py-24 bg-black border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center text-white mb-16 neon-glow">
            How It Works
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {[
              { num: "01", title: "Data Ingestion", desc: "Raw unstructured data flows into the intake matrix from multiple sources seamlessly." },
              { num: "02", title: "Contextual Processing", desc: "The cognitive core evaluates relationships, intents, and implicit contexts instantly." },
              { num: "03", title: "Neural Synthesis", desc: "Deep learning models synthesize optimal responses and generate predictive paths." },
              { num: "04", title: "Execution Delivery", desc: "High-fidelity output is routed back via edge networks with zero perceivable latency." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 md:gap-12 mb-12 relative"
              >
                {i !== 3 && <div className="absolute left-[39px] md:left-[55px] top-[80px] bottom-[-48px] w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent" />}
                
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-900/20 text-cyan-400 font-orbitron text-2xl md:text-4xl font-bold shadow-[0_0_30px_rgba(0,255,255,0.1)]">
                    {step.num}
                  </div>
                </div>
                
                <div className="flex flex-col justify-center pb-8">
                  <h3 className="font-orbitron text-2xl md:text-3xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* ── 3D Code Orbit Section ── */}
      <section className="relative py-20 bg-black overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <FloatingCode count={14} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <p className="text-cyan-400 font-orbitron text-xs tracking-[0.35em] uppercase mb-3">Live AI Core</p>
            <h2 className="text-3xl md:text-5xl font-orbitron font-black text-white mb-4">
              Every Feature, <span className="text-cyan-400">Orbiting the Core</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">All capabilities spiral from a single unified intelligence engine.</p>
          </motion.div>
          <CodeOrbit3D className="w-full mx-auto" style={{ height: 560, maxWidth: 600 }} />
        </div>
      </section>

      <Footer />
    </div>
  );
}
