import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  code: string;
  lang: string;
  color: string;
  initialX?: number;
  initialY?: number;
  className?: string;
  delay?: number;
}

export function DraggableCodeChip({ code, lang, color, initialX = 0, initialY = 0, delay = 0 }: Props) {
  const constraintRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 300, damping: 30 });

  return (
    <motion.div
      drag
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileDrag={{ scale: 1.08, zIndex: 50 }}
      whileHover={{ scale: 1.04 }}
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: "backOut" }}
      style={{ x, y, rotateX, rotateY, transformStyle: "preserve-3d", perspective: 600, cursor: "grab" }}
      className="relative rounded-xl overflow-hidden select-none"
    >
      {/* Active cursor */}
      <style>{`[data-dragging="true"] { cursor: grabbing !important; }`}</style>

      <div
        style={{
          background: "rgba(4, 8, 20, 0.92)",
          border: `1px solid ${color}44`,
          boxShadow: `0 0 30px ${color}22, 0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          minWidth: 200,
          maxWidth: 280,
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center gap-2 px-3 py-2 border-b"
          style={{ borderColor: `${color}22`, background: `${color}0a` }}
        >
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
          <span
            className="ml-2 font-mono text-xs font-bold tracking-widest uppercase"
            style={{ color: `${color}cc` }}
          >
            {lang}
          </span>
          <div
            className="ml-auto w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
          />
        </div>

        {/* Code lines */}
        <div className="p-3 font-mono text-xs leading-relaxed whitespace-pre" style={{ color: "#b0ffd0", lineHeight: "1.7" }}>
          {code.split("\n").map((line, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: `${color}44`, userSelect: "none", minWidth: 16, textAlign: "right" }}>{i + 1}</span>
              <span
                dangerouslySetInnerHTML={{ __html: line
                  .replace(/("|'[^'"]*'|"[^"]*")/g, `<span style="color:#ff9d52">$1</span>`)
                  .replace(/\b(import|from|def|class|return|async|await|const|let|for|if|else|true|false|null)\b/g, `<span style="color:${color}">$1</span>`)
                  .replace(/(#.*)/g, `<span style="color:#4a5568">$1</span>`)
                  .replace(/(\d+\.?\d*)/g, `<span style="color:#63b3ed">$1</span>`)
                }}
              />
            </div>
          ))}
        </div>

        {/* Drag hint on first render */}
        <div
          className="flex items-center justify-center gap-1.5 py-1.5 border-t font-mono text-xs"
          style={{ borderColor: `${color}11`, color: `${color}44` }}
        >
          ⠿ drag me
        </div>
      </div>
    </motion.div>
  );
}
