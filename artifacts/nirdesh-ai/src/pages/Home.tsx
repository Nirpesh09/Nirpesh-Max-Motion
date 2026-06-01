import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { AnimatedButton } from "@/components/AnimatedButton";
import { MatrixRain } from "@/components/MatrixRain";
import { DraggableCodeChip } from "@/components/DraggableCodeChip";
import { HoloTerminal } from "@/components/HoloTerminal";
import { NeuralNet3D } from "@/components/NeuralNet3D";
import { CubeCode3D } from "@/components/CubeCode3D";
import { DigitalHelix } from "@/components/DigitalHelix";
import { Zap, Globe, Shield, Brain, Code2, Cpu, ChevronDown, Sparkles } from "lucide-react";

/* ─── Mouse parallax hook ─── */
function useMouseParallax() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const onMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((clientX - left - width / 2) / (width / 2));
    my.set((clientY - top - height / 2) / (height / 2));
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return { sx, sy, onMove, onLeave };
}

/* ─── Typewriter ─── */
const TITLES = [
  "Build the Future.",
  "Train. Deploy. Dominate.",
  "Inference at Scale.",
  "AI Without Limits.",
  "Think. Code. Transcend.",
];

function Typewriter() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[idx];
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 55);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % TITLES.length);
    }
  }, [displayed, deleting, idx]);

  return (
    <span className="relative">
      <span
        style={{
          color: "transparent",
          backgroundImage: "linear-gradient(90deg, #00ffcc, #0088ff, #aa44ff)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 0 20px rgba(0,255,204,0.4))",
        }}
      >
        {displayed}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        style={{ color: "#00ffcc", marginLeft: 2 }}
      >
        |
      </motion.span>
    </span>
  );
}

/* ─── Floating orbital code ring ─── */
const ORBIT_ITEMS = [
  { label: "Python", color: "#3b82f6", angle: 0 },
  { label: "CUDA", color: "#00ffcc", angle: 45 },
  { label: "Rust", color: "#f97316", angle: 90 },
  { label: "LLVM", color: "#a855f7", angle: 135 },
  { label: "C++", color: "#22d3ee", angle: 180 },
  { label: "WebGPU", color: "#ff6600", angle: 225 },
  { label: "WASM", color: "#84cc16", angle: 270 },
  { label: "ONNX", color: "#ec4899", angle: 315 },
];

function TechOrbit() {
  return (
    <div className="relative" style={{ width: 340, height: 340, perspective: 600 }}>
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d", width: "100%", height: "100%", position: "relative" }}
      >
        {ORBIT_ITEMS.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const r = 145;
          const x = r * Math.cos(rad);
          const z = r * Math.sin(rad);
          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `translate3d(${x - 36}px, -18px, ${z}px)`,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold whitespace-nowrap"
                style={{
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}55`,
                  color: item.color,
                  boxShadow: `0 0 12px ${item.color}33`,
                  textShadow: `0 0 8px ${item.color}`,
                }}
              >
                {item.label}
              </div>
            </motion.div>
          );
        })}

        {/* Center core */}
        <div
          className="absolute top-1/2 left-1/2 flex items-center justify-center rounded-full font-orbitron font-black"
          style={{
            width: 80, height: 80,
            marginTop: -40, marginLeft: -40,
            background: "radial-gradient(circle, rgba(0,255,204,0.2) 0%, rgba(0,50,100,0.4) 100%)",
            border: "1px solid rgba(0,255,204,0.4)",
            boxShadow: "0 0 40px rgba(0,255,204,0.3), inset 0 0 20px rgba(0,255,204,0.1)",
            fontSize: 28,
            color: "transparent",
            backgroundImage: "linear-gradient(135deg, #00ffcc, #0088ff)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 12px rgba(0,255,204,0.8))",
            transform: "translateZ(0px)",
          }}
        >
          N
        </div>
      </motion.div>

      {/* Orbit ring SVG */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 340 340"
        style={{ opacity: 0.15 }}
      >
        <ellipse cx="170" cy="170" rx="145" ry="30" fill="none" stroke="#00ffcc" strokeWidth="0.8" />
        <ellipse cx="170" cy="170" rx="145" ry="145" fill="none" stroke="#00ffcc" strokeWidth="0.4" strokeDasharray="4 8" />
      </svg>
    </div>
  );
}

/* ─── Interactive floating node ─── */
function FloatingNode({ x, y, color, label, delay }: { x: string; y: string; color: string; label: string; delay: number }) {
  const [active, setActive] = useState(false);
  return (
    <motion.div
      className="absolute select-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.3, zIndex: 20 }}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
    >
      <div
        className="relative rounded-xl px-3 py-2 font-mono text-xs font-bold cursor-pointer"
        style={{
          background: `${color}14`,
          border: `1px solid ${active ? color : color + "44"}`,
          color: active ? color : color + "aa",
          boxShadow: active ? `0 0 20px ${color}66, 0 0 40px ${color}33` : `0 0 8px ${color}22`,
          transition: "all 0.2s",
          textShadow: active ? `0 0 8px ${color}` : "none",
        }}
      >
        {label}
        {active && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-1 text-xs"
            style={{ background: color + "22", border: `1px solid ${color}44`, color }}
          >
            ● active node
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Stats counter ─── */
function AnimatedStat({ value, label, icon: Icon, color }: { value: string; label: string; icon: React.ElementType; color: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "backOut" }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="relative rounded-2xl p-8 text-center overflow-hidden cursor-default"
      style={{
        background: `linear-gradient(135deg, ${color}0d, rgba(0,0,0,0.6))`,
        border: `1px solid ${color}33`,
        boxShadow: `0 0 40px ${color}11`,
      }}
    >
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}11, transparent 70%)` }} />
      <Icon size={28} style={{ color, margin: "0 auto 12px" }} />
      <div className="font-orbitron font-black text-4xl text-white mb-2" style={{ textShadow: `0 0 20px ${color}` }}>
        {value}
      </div>
      <div className="text-gray-400 text-sm tracking-wider uppercase font-mono">{label}</div>
    </motion.div>
  );
}

/* ─── Feature card ─── */
function FeatureCard({ icon: Icon, title, desc, color, delay }: { icon: React.ElementType; title: string; desc: string; color: string; delay: number }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const handleLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, ease: "backOut" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 600 }}
      className="relative rounded-2xl p-7 overflow-hidden cursor-default"
    >
      <div style={{
        background: `linear-gradient(135deg, ${color}0d 0%, rgba(0,0,0,0.7) 100%)`,
        border: `1px solid ${color}33`,
        boxShadow: `0 0 30px ${color}0d`,
        position: "absolute", inset: 0, borderRadius: "inherit",
      }} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center"
          style={{ background: `${color}1a`, border: `1px solid ${color}44`, boxShadow: `0 0 16px ${color}33` }}>
          <Icon size={22} style={{ color }} />
        </div>
        <h3 className="font-orbitron font-bold text-white text-lg mb-3">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
        <div className="mt-5 h-px" style={{ background: `linear-gradient(90deg, ${color}55, transparent)` }} />
        <div className="mt-3 font-mono text-xs" style={{ color: `${color}99` }}>
          &gt; learn_more()
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Code snippets for draggable chips ─── */
const CODE_CHIPS = [
  {
    lang: "python · model.py",
    color: "#3b82f6",
    code: `import nirpesh_ai as nai

model = nai.load("ultra-v3")
# Run inference
result = model.predict(
  input="Explain AGI",
  max_tokens=4096,
  temperature=0.7
)
print(result.text)`,
    delay: 0,
  },
  {
    lang: "python · train.py",
    color: "#00ffcc",
    code: `for epoch in range(1000):
  loss = forward(x_batch)
  loss.backward()
  optimizer.step()  # ∇
  scheduler.step()
  if loss < 1e-5:
    break  # converged!
print(f"Final: {loss:.6f}")`,
    delay: 0.1,
  },
  {
    lang: "rust · inference.rs",
    color: "#f97316",
    code: `fn infer(input: &str) -> Output {
  let tokens = tokenize(input);
  let embed = model.embed(&tokens);
  let attn = attention(
    &embed, &embed, &embed
  );
  decode(&attn)  // O(n log n)
}`,
    delay: 0.2,
  },
  {
    lang: "cuda · kernel.cu",
    color: "#a855f7",
    code: `__global__ void attention_fwd(
  float* Q, float* K, float* V,
  float* out, int n, int d
) {
  int i = blockIdx.x * 32 + tid;
  float score = dot(Q[i], K[i]);
  score /= sqrtf((float)d);
  out[i] = softmax(score) * V[i];
}`,
    delay: 0.3,
  },
  {
    lang: "typescript · api.ts",
    color: "#22d3ee",
    code: `const nirpesh = new NirpeshAI({
  model: "ultra-v3",
  stream: true,
});

const stream = await nirpesh
  .chat.completions.create({
    messages: [{ role: "user",
      content: "Build the future" }]
  });`,
    delay: 0.4,
  },
  {
    lang: "bash · deploy.sh",
    color: "#84cc16",
    code: `#!/usr/bin/env bash
# Nirpesh AI Deploy
docker build -t nirpesh-ai .
kubectl apply -f k8s/
kubectl rollout status \\
  deploy/nirpesh-ai
echo "✓ Deployed successfully"`,
    delay: 0.5,
  },
];

/* ═══════════════════════════════════
   MAIN HOME PAGE
═══════════════════════════════════ */
export default function Home() {
  const { sx, sy, onMove, onLeave } = useMouseParallax();
  const heroRotateX = useTransform(sy, [-1, 1], [4, -4]);
  const heroRotateY = useTransform(sx, [-1, 1], [-6, 6]);
  const layer1X = useTransform(sx, [-1, 1], [-18, 18]);
  const layer1Y = useTransform(sy, [-1, 1], [-10, 10]);
  const layer2X = useTransform(sx, [-1, 1], [10, -10]);
  const layer2Y = useTransform(sy, [-1, 1], [8, -8]);
  const layer3X = useTransform(sx, [-1, 1], [-30, 30]);
  const layer3Y = useTransform(sy, [-1, 1], [-20, 20]);

  // Mouse glow tracker
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const glowX = useSpring(useMotionValue(0), { stiffness: 80, damping: 25 });
  const glowY = useSpring(useMotionValue(0), { stiffness: 80, damping: 25 });

  const handleGlobalMove = useCallback((e: MouseEvent) => {
    glowX.set(e.clientX - 200);
    glowY.set(e.clientY - 200);
    setMousePos({ x: e.clientX, y: e.clientY });
  }, [glowX, glowY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleGlobalMove);
    return () => window.removeEventListener("mousemove", handleGlobalMove);
  }, [handleGlobalMove]);

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ perspective: "1200px" }}
      >
        {/* Matrix rain background */}
        <MatrixRain opacity={0.5} speed={1.2} className="pointer-events-none z-0" />

        {/* Full screen dark overlay with radial reveal */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.97) 100%)",
          }}
        />

        {/* Mouse-following glow orb */}
        <motion.div
          className="fixed pointer-events-none z-[2] rounded-full"
          style={{
            x: glowX, y: glowY,
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(0,255,204,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Floating nodes */}
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {[
            { x: "8%", y: "20%", color: "#00ffcc", label: "attention(Q,K,V)", delay: 0 },
            { x: "82%", y: "15%", color: "#ff6600", label: "∇L(θ) → 0", delay: 0.5 },
            { x: "5%", y: "65%", color: "#aa44ff", label: "tokenize(x)", delay: 1 },
            { x: "85%", y: "60%", color: "#00aaff", label: "embed(256K)", delay: 1.5 },
            { x: "50%", y: "88%", color: "#ffcc00", label: "inference(ms)", delay: 2 },
            { x: "25%", y: "12%", color: "#ff3c64", label: "RLHF.align()", delay: 0.8 },
            { x: "70%", y: "82%", color: "#22d3ee", label: "scale(∞)", delay: 1.2 },
          ].map((n, i) => (
            <FloatingNode key={i} {...n} />
          ))}
        </div>

        {/* Parallax layer 1 — helix left */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-[4] hidden xl:block"
          style={{ x: layer1X, y: layer1Y }}
        >
          <DigitalHelix className="h-[480px] opacity-70" />
        </motion.div>

        {/* Parallax layer 2 — tech orbit right */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-[4] hidden xl:block"
          style={{ x: layer2X, y: layer2Y }}
        >
          <TechOrbit />
        </motion.div>

        {/* Parallax layer 3 — cube floating far bg */}
        <motion.div
          className="absolute left-1/2 top-10 pointer-events-none z-[3] hidden lg:block"
          style={{ x: layer3X, y: layer3Y, marginLeft: 240 }}
        >
          <CubeCode3D className="opacity-40 scale-75" />
        </motion.div>

        {/* Hero content */}
        <motion.div
          className="relative z-[5] text-center px-4 max-w-5xl mx-auto"
          style={{ rotateX: heroRotateX, rotateY: heroRotateY, transformStyle: "preserve-3d" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full font-mono text-xs"
            style={{
              background: "rgba(0,255,204,0.08)",
              border: "1px solid rgba(0,255,204,0.25)",
              color: "#00ffcc",
              boxShadow: "0 0 20px rgba(0,255,204,0.15)",
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <Sparkles size={12} />
            NIRPESH-ULTRA-v3 · NOW LIVE
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-orbitron font-black mb-6 leading-none tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7.5rem)" }}
          >
            <span className="text-white">NIRPESH</span>{" "}
            <span
              style={{
                color: "transparent",
                backgroundImage: "linear-gradient(135deg, #ff6600 0%, #ff3c64 50%, #aa44ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,100,0,0.5))",
              }}
            >
              AI
            </span>
          </motion.h1>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="font-orbitron font-bold mb-8"
            style={{ fontSize: "clamp(1.1rem, 3vw, 2.2rem)", minHeight: "2.8rem" }}
          >
            <Typewriter />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg leading-relaxed"
          >
            The world's most advanced AI inference engine. Built from bare silicon to stratospheric scale.
            Every token. Zero compromise.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="https://nirpesh-ai.lovable.app" target="_blank" rel="noopener noreferrer">
              <AnimatedButton variant="primary" className="text-lg px-12 py-5 font-orbitron font-bold">
                Launch Platform →
              </AnimatedButton>
            </a>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0,255,204,0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-5 rounded-xl font-orbitron font-bold text-lg text-cyan-400 border transition-all"
              style={{ borderColor: "rgba(0,255,204,0.3)", background: "rgba(0,255,204,0.05)" }}
              onClick={() => document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" })}
            >
              &lt; explore /&gt;
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">scroll</span>
          <ChevronDown size={20} className="text-gray-600" />
        </motion.div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="py-24 relative border-y border-white/5 overflow-hidden">
        <MatrixRain opacity={0.12} speed={0.6} className="pointer-events-none z-0" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedStat value="10M+" label="Queries Processed Daily" icon={Zap} color="#00ffcc" />
            <AnimatedStat value="150+" label="Countries & Territories" icon={Globe} color="#ff6600" />
            <AnimatedStat value="99.9%" label="Uptime SLA Guaranteed" icon={Shield} color="#aa44ff" />
          </div>
        </div>
      </section>

      {/* ══════════ DRAG PLAYGROUND ══════════ */}
      <section id="playground" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,204,0.025) 0%, transparent 70%)" }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 font-mono text-xs tracking-[0.35em] uppercase mb-3">// interactive</p>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-5">
              Pick Up &amp; Play
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-lg">
              Real code powering Nirpesh AI. Drag them around — they're all yours.
            </p>
          </motion.div>

          {/* Drag grid */}
          <div className="flex flex-wrap gap-5 justify-center items-start">
            {CODE_CHIPS.map((chip, i) => (
              <DraggableCodeChip
                key={i}
                lang={chip.lang}
                code={chip.code}
                color={chip.color}
                delay={chip.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TERMINAL + NEURAL ══════════ */}
      <section className="py-24 relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0 pointer-events-none z-0">
          <MatrixRain opacity={0.08} speed={0.5} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-4">// live inference</p>
              <h2 className="text-4xl md:text-5xl font-orbitron font-black text-white mb-6">
                Watch It <br />
                <span style={{
                  color: "transparent",
                  backgroundImage: "linear-gradient(90deg, #00ffcc, #0088ff)",
                  WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent"
                }}>
                  Think
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Every request runs through our ultra-low-latency inference pipeline. Watch the tokens stream in real time — from your input to intelligent output in milliseconds.
              </p>
              <div className="flex flex-wrap gap-3">
                {["42ms avg latency", "256K context", "32 attention heads", "99.9% uptime"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg font-mono text-xs border"
                    style={{ borderColor: "rgba(0,255,204,0.2)", color: "#00ffcc99", background: "rgba(0,255,204,0.05)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <HoloTerminal />
            </motion.div>
          </div>

          {/* Neural net */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-20"
          >
            <p className="text-center text-purple-400 font-mono text-xs tracking-[0.35em] uppercase mb-4">
              // transformer architecture
            </p>
            <h3 className="text-center text-3xl font-orbitron font-black text-white mb-10">
              Real Neural Architecture
            </h3>
            <NeuralNet3D className="w-full max-w-3xl mx-auto" style={{ height: 420 }} />
          </motion.div>
        </div>
      </section>

      {/* ══════════ FEATURES ══════════ */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-orange-400 font-mono text-xs tracking-[0.35em] uppercase mb-3">// capabilities</p>
            <h2 className="text-4xl md:text-6xl font-orbitron font-black text-white">
              Built Different
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Brain} title="Ultra-Dense Reasoning" color="#00ffcc" delay={0}
              desc="256K token context with sparse attention. Our model reasons across entire codebases and documents without losing coherence." />
            <FeatureCard icon={Zap} title="42ms Inference" color="#ff6600" delay={0.1}
              desc="Sub-50ms latency globally via our edge inference mesh. Faster than a human blink, smarter than anything before it." />
            <FeatureCard icon={Code2} title="Code Mastery" color="#aa44ff" delay={0.2}
              desc="Fluent in 50+ languages. Generates, debugs, and optimizes production code with deep semantic understanding." />
            <FeatureCard icon={Shield} title="Aligned Intelligence" color="#00aaff" delay={0.3}
              desc="RLHF-tuned with constitutional AI. Every output is safe, accurate, and calibrated to your organization's values." />
            <FeatureCard icon={Globe} title="Global Mesh Deployment" color="#ffcc00" delay={0.4}
              desc="150+ countries. Requests routed to the nearest inference node automatically. No latency. No compromise." />
            <FeatureCard icon={Cpu} title="Bare-Metal Performance" color="#ff3c64" delay={0.5}
              desc="Custom CUDA kernels, quantized weights, and hardware-aware scheduling. We push silicon to its absolute limit." />
          </div>
        </div>
      </section>

      {/* ══════════ FINAL CTA ══════════ */}
      <section className="relative py-40 overflow-hidden">
        <MatrixRain opacity={0.3} speed={0.8} className="pointer-events-none z-0" />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,255,204,0.08) 0%, rgba(0,0,0,0.9) 70%)" }}
        />
        <div className="container mx-auto px-4 relative z-[2] text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-cyan-400 font-mono text-xs tracking-[0.35em] uppercase mb-6">// initialize.sequence()</p>
            <h2
              className="font-orbitron font-black mb-8 leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Ready to{" "}
              <span style={{
                color: "transparent",
                backgroundImage: "linear-gradient(135deg, #00ffcc 0%, #0088ff 50%, #aa44ff 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(0,255,204,0.4))",
              }}>
                Initialize?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the elite organizations powering their future with Nirpesh AI. System access is currently open.
            </p>
            <a href="https://nirpesh-ai.lovable.app" target="_blank" rel="noopener noreferrer">
              <AnimatedButton variant="primary" className="text-xl px-16 py-6 font-orbitron font-black">
                Get Access Now →
              </AnimatedButton>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black pt-12 pb-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-600 text-sm gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-black font-orbitron text-sm"
              style={{ background: "linear-gradient(135deg, #00ffcc, #0088ff)", color: "#000" }}>
              N
            </div>
            <span className="font-orbitron text-white font-bold tracking-wider">Nirpesh AI</span>
          </div>
          <p className="font-mono text-xs">© {new Date().getFullYear()} Nirpesh AI Systems. All rights reserved.</p>
          <div className="flex items-center gap-1.5 font-mono text-xs" style={{ color: "rgba(0,255,204,0.4)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            All systems nominal
          </div>
        </div>
      </footer>
    </div>
  );
}
