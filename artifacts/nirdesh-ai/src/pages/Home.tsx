import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero3D } from "@/components/Hero3D";
import { ParticleField } from "@/components/ParticleField";
import { FeatureCards3D } from "@/components/FeatureCards3D";
import { TechSection3D } from "@/components/TechSection3D";
import { AnimatedButton } from "@/components/AnimatedButton";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // GSAP Scroll Animations
    const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
    
    sections.forEach((section) => {
      gsap.fromTo(section, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-cyan-300">
      <Navbar />
      <ParticleField />
      
      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Hero3D />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 inline-block glass-panel px-6 py-2 rounded-full border border-cyan-500/30 neon-glow"
          >
            <span className="text-cyan-400 font-orbitron text-sm font-bold tracking-widest uppercase">The Next Evolution</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-6xl md:text-8xl lg:text-9xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-900 mb-6 neon-glow leading-tight"
          >
            Nirdesh AI
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-2xl md:text-4xl font-sans font-light text-cyan-100 mb-8 max-w-3xl leading-relaxed"
          >
            The Intelligence Behind Tomorrow
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 font-sans"
          >
            Nirdesh AI learns, adapts, and evolves — purpose-built to unlock possibilities you haven't imagined yet.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 pointer-events-auto"
          >
            <AnimatedButton variant="primary">Start for Free</AnimatedButton>
            <AnimatedButton variant="outline">Watch Demo</AnimatedButton>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-cyan-500/50"
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-orbitron">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-cyan-500 to-transparent" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 w-full animate-section">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-cyan-900/5 to-background z-0" />
        <div className="grid-bg absolute inset-0 z-0 opacity-20" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-6">Cognitive Architecture</h2>
            <p className="text-xl text-cyan-200/60 max-w-2xl mx-auto font-sans">
              Built on a foundation of unconstrained computational logic, delivering unprecedented reasoning capabilities.
            </p>
          </div>
          
          <FeatureCards3D />
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="relative py-32 w-full animate-section bg-black">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <TechSection3D />
            </div>
            
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-block glass-panel px-4 py-1 rounded-full border border-primary/30">
                <span className="text-primary font-orbitron text-xs font-bold tracking-widest uppercase">Deep Tech</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white leading-tight">
                Quantum-Resilient <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Core Engine</span>
              </h2>
              
              <p className="text-lg text-gray-400 font-sans leading-relaxed">
                Beneath the surface lies a polymorphic inference engine. Nirdesh AI doesn't just process data; it understands context, intent, and nuance at a level previously thought impossible for synthetic systems.
              </p>
              
              <ul className="space-y-6 mt-8">
                {[
                  "Self-healing neural pathways",
                  "Zero-latency edge distribution",
                  "Cryptographic memory vaults"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-cyan-100 font-sans">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-8">
                <AnimatedButton variant="primary">Explore the Platform</AnimatedButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="relative py-40 w-full animate-section overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-8">
            Ready to <span className="text-cyan-400">Initialize?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the elite organizations powering their future with Nirdesh AI. System access is currently available.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <AnimatedButton variant="primary" className="text-xl px-12 py-6">Deploy Now</AnimatedButton>
            <AnimatedButton variant="outline" className="text-xl px-12 py-6 text-white border-white hover:bg-white/10">Contact Sales</AnimatedButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="relative border-t border-white/10 bg-black pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center neon-glow">
                  <span className="text-primary-foreground font-bold font-orbitron">N</span>
                </div>
                <span className="font-orbitron font-bold text-xl tracking-wider text-white">Nirdesh AI</span>
              </div>
              <p className="text-gray-500 max-w-sm">
                The most advanced artificial intelligence platform, designed to solve the unsolvable.
              </p>
            </div>
            
            <div>
              <h4 className="font-orbitron text-white mb-6 font-bold">Platform</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Neural Processing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Quantum Core</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-orbitron text-white mb-6 font-bold">Company</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Nirdesh AI Systems. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
