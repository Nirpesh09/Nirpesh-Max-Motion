import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"n" | "irpesh" | "hold" | "done">("n");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("irpesh"), 700);
    const t2 = setTimeout(() => setPhase("hold"), 1400);
    const t3 = setTimeout(() => setPhase("done"), 2400);
    const t4 = setTimeout(() => setVisible(false), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Animated background rings */}
          {phase !== "n" && (
            <>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute w-40 h-40 rounded-full border border-cyan-500/40"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 6, opacity: 0 }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 0.1 }}
                className="absolute w-32 h-32 rounded-full border border-cyan-400/20"
              />
            </>
          )}

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.015) 2px, rgba(0,255,255,0.015) 4px)",
            }}
          />

          {/* Core logo text */}
          <div className="relative flex items-baseline" style={{ perspective: "800px" }}>
            {/* N */}
            <motion.span
              initial={{ opacity: 0, scale: 0.3, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="font-orbitron font-black text-transparent bg-clip-text"
              style={{
                fontSize: "clamp(5rem, 18vw, 14rem)",
                backgroundImage: "linear-gradient(135deg, #ffffff 0%, #00ffff 40%, #0088ff 100%)",
                textShadow: "0 0 60px rgba(0,255,255,0.6), 0 0 120px rgba(0,200,255,0.3)",
                lineHeight: 1,
              }}
            >
              N
            </motion.span>

            {/* irpesh */}
            <AnimatePresence>
              {phase !== "n" && (
                <motion.span
                  initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="font-orbitron font-black text-white"
                  style={{
                    fontSize: "clamp(5rem, 18vw, 14rem)",
                    lineHeight: 1,
                    textShadow: "0 0 40px rgba(0,255,255,0.2)",
                  }}
                >
                  irpesh
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* AI tagline */}
          <AnimatePresence>
            {(phase === "hold" || phase === "done") && (
              <motion.div
                initial={{ opacity: 0, y: 12, letterSpacing: "0.5em" }}
                animate={{ opacity: 1, y: 0, letterSpacing: "0.6em" }}
                transition={{ duration: 0.5 }}
                className="absolute font-orbitron font-bold text-cyan-400 uppercase tracking-[0.6em]"
                style={{
                  fontSize: "clamp(0.7rem, 2vw, 1.1rem)",
                  bottom: "calc(50% - 8rem - 2rem)",
                  textShadow: "0 0 20px rgba(0,255,255,0.8)",
                }}
              >
                Artificial Intelligence
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom loading bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 h-[2px] bg-cyan-400/20 rounded-full overflow-hidden"
            style={{ width: "clamp(160px, 30vw, 280px)" }}
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 2.3, ease: "easeInOut" }}
              className="h-full w-full rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #00ffff, #0088ff)" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
