import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedButton } from "@/components/AnimatedButton";
import { FloatingCode } from "@/components/FloatingCode";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { WebGLErrorBoundary } from "@/components/WebGLErrorBoundary";
import { Building, Target, Zap, Users, Mail, MessageSquare, LifeBuoy } from "lucide-react";
import { motion } from "framer-motion";

function Globe3D() {
  const globeRef = useRef<THREE.Group>(null!);
  
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const dots = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.2;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp.push([x, y, z] as [number, number, number]);
    }
    return temp;
  }, []);

  return (
    <group ref={globeRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <lineSegments>
          <edgesGeometry args={[new THREE.IcosahedronGeometry(2, 2)]} />
          <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </lineSegments>
        
        {dots.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Floating code background — whole page */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingCode count={22} />
      </div>
      
      {/* Hero */}
      <section className="pt-40 pb-20 px-4 md:px-6 relative z-10 text-center container mx-auto">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-8xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-8"
        >
          We Are Nirpesh AI
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-sans leading-relaxed mb-6"
        >
          Pioneering the boundary between synthetic logic and human intuition. We are building systems that don't just compute—they understand.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-400 max-w-3xl mx-auto font-sans leading-relaxed"
        >
          Our mission is to democratize advanced intelligence, making cognitive architecture accessible to innovators globally.
        </motion.p>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {[
              { label: "Team Members", value: "50+" },
              { label: "Global Offices", value: "3" },
              { label: "Enterprise Clients", value: "200+" },
              { label: "Rating", value: "4.9/5" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-orbitron font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Timeline */}
      <section className="py-24 container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-orbitron font-bold text-white mb-6">Our Origin</h2>
            <p className="text-cyan-400 font-medium mb-8 text-lg">Founded in 2023 by a team of AI researchers and engineers from leading institutions.</p>
            <div className="space-y-6 text-gray-400 font-sans leading-relaxed">
              <p>Nirpesh AI was born out of frustration with brittle, narrow models. We saw a world where AI could be more than just a party trick—it could be a foundational layer for human progress.</p>
              <p>We gathered a coalition of physicists, software architects, and cognitive scientists to rethink intelligence from the ground up, starting with multi-modal neural reasoning.</p>
              <p>Today, our systems power everything from financial modeling to creative generative tools, always driven by our core belief: technology should empower, not replace.</p>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent pointer-events-none" />
            <h3 className="font-orbitron text-2xl font-bold text-white mb-8 relative z-10">The Journey</h3>
            
            <div className="space-y-8 relative z-10">
              {[
                { year: "2023", event: "Founded" },
                { year: "2024", event: "First Model" },
                { year: "2024", event: "10K Users" },
                { year: "2025", event: "Enterprise" },
                { year: "2026", event: "Global Launch" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-16 font-orbitron font-bold text-cyan-400 text-lg">{item.year}</div>
                  <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,255,255,0.8)] relative">
                    {i !== 4 && <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-cyan-500/30" />}
                  </div>
                  <div className="text-gray-300 font-sans">{item.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-black relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center text-white mb-16">Mission & Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Target, title: "Innovation", desc: "Pushing beyond current paradigms to invent the future of compute." },
              { icon: Building, title: "Integrity", desc: "Transparent, accountable, and secure models you can trust." },
              { icon: Zap, title: "Impact", desc: "Building technology that creates measurable, positive change." },
              { icon: Users, title: "Inclusivity", desc: "Designing systems that serve global, diverse communities." }
            ].map((val, i) => (
              <div key={i} className="glass-panel p-8 rounded-2xl text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6">
                  <val.icon size={28} className="text-cyan-400" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-4">{val.title}</h3>
                <p className="text-gray-400 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Global Reach */}
      <section className="relative h-[500px] w-full bg-background overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <h2 className="text-6xl md:text-8xl font-orbitron font-black text-white/10 uppercase tracking-[0.2em] whitespace-nowrap">Global Reach</h2>
        </div>
        <WebGLErrorBoundary fallback={<div className="w-full h-full bg-blue-900/10" />}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.5} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            <Globe3D />
          </Canvas>
        </WebGLErrorBoundary>
      </section>

      {/* Team */}
      <section className="py-24 container mx-auto px-4 md:px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-center text-white mb-16">The Minds Behind It</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Aryan Mehta", role: "CEO", init: "AM", color: "bg-blue-600", bio: "Former quantum computing researcher with a vision for accessible AI." },
            { name: "Priya Singh", role: "CTO", init: "PS", color: "bg-purple-600", bio: "Architected scalable neural networks for top-tier tech giants." },
            { name: "Rohan Kapoor", role: "Head of Research", init: "RK", color: "bg-cyan-600", bio: "Published over 30 papers on adaptive machine learning algorithms." },
            { name: "Anika Sharma", role: "Head of Product", init: "AS", color: "bg-pink-600", bio: "Translates complex cognitive models into intuitive user experiences." },
            { name: "Dev Patel", role: "Lead Engineer", init: "DP", color: "bg-emerald-600", bio: "Master of zero-latency distributed systems and edge computing." },
            { name: "Zara Khan", role: "VP of Growth", init: "ZK", color: "bg-amber-600", bio: "Scaling our planetary reach to bring AI to global markets." }
          ].map((member, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl flex items-center gap-6 hover:border-cyan-500/50 transition-colors">
              <div className={`w-20 h-20 rounded-full ${member.color} flex items-center justify-center flex-shrink-0 text-white font-orbitron font-bold text-2xl shadow-lg`}>
                {member.init}
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-white text-xl">{member.name}</h3>
                <div className="text-cyan-400 text-sm font-medium mb-2">{member.role}</div>
                <p className="text-gray-400 text-xs">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press Quotes */}
      <section className="py-20 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { outlet: "TechCrunch", quote: "\"Nirpesh AI is fundamentally rewriting the playbook on generative reasoning.\"" },
              { outlet: "Wired", quote: "\"A masterclass in scalable cognitive architecture that feels years ahead of the curve.\"" },
              { outlet: "Forbes", quote: "\"The enterprise AI solution that finally delivers on the promise of true contextual intelligence.\"" }
            ].map((press, i) => (
              <div key={i} className="border border-white/10 p-8 rounded-xl relative">
                <div className="text-4xl text-cyan-500/40 font-serif absolute top-4 left-4">"</div>
                <p className="text-gray-300 font-sans text-lg italic mb-6 relative z-10 pt-4">{press.quote}</p>
                <div className="font-orbitron font-bold text-white tracking-widest">{press.outlet}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-24 relative z-10 bg-black/60">
        <FloatingCode count={10} className="opacity-50" />
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-orbitron text-xs tracking-[0.3em] uppercase mb-4">Need Help?</p>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-6">
              We're Here to <span className="text-cyan-400">Support You</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a question, feedback, or need assistance? Our team responds within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            {[
              {
                icon: Mail,
                title: "Email Support",
                desc: "Drop us a message and we'll get back to you promptly.",
                action: "mailto:ainirpesh@gmail.com",
                label: "ainirpesh@gmail.com",
                highlight: true,
              },
              {
                icon: MessageSquare,
                title: "Live Chat",
                desc: "Chat with our team directly on the platform.",
                action: "https://nirpesh-ai.lovable.app",
                label: "Open Platform",
                highlight: false,
              },
              {
                icon: LifeBuoy,
                title: "Help Center",
                desc: "Browse guides, tutorials, and FAQs.",
                action: "https://nirpesh-ai.lovable.app",
                label: "Visit Docs",
                highlight: false,
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.action}
                target={item.action.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`glass-panel p-8 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all group
                  ${item.highlight ? "border-cyan-500/40 shadow-[0_0_30px_rgba(0,255,255,0.08)]" : "border-white/10"}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 transition-colors
                  ${item.highlight ? "bg-cyan-500/20 border border-cyan-500/40 group-hover:bg-cyan-500/30" : "bg-white/5 border border-white/10 group-hover:border-cyan-500/30"}`}>
                  <item.icon size={26} className={item.highlight ? "text-cyan-400" : "text-gray-400 group-hover:text-cyan-400"} />
                </div>
                <h3 className="font-orbitron font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                <span className={`text-sm font-medium font-mono ${item.highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-cyan-400"} transition-colors`}>
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>

          {/* Big email CTA */}
          <div className="text-center">
            <motion.a
              href="mailto:ainirpesh@gmail.com"
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-orbitron font-bold text-black text-lg transition-all"
              style={{
                background: "linear-gradient(135deg, #00ffff 0%, #0088ff 100%)",
                boxShadow: "0 0 30px rgba(0,255,255,0.4), 0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <Mail size={22} />
              Send us an Email
            </motion.a>
            <p className="text-gray-600 text-xs mt-4 font-mono">ainirpesh@gmail.com</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center relative z-10 container mx-auto px-4">
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-screen pointer-events-none" />
        <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-10">
          Join the <span className="text-cyan-400">Revolution</span>
        </h2>
        <AnimatedButton 
          as="a" 
          href="https://nirpesh-ai.lovable.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          variant="primary" 
          className="text-xl px-12 py-6"
        >
          Get Started
        </AnimatedButton>
      </section>

      <Footer />
    </div>
  );
}
