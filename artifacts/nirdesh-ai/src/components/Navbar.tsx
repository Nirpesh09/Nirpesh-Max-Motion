import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = ["Features", "Technology", "Pricing", "About"];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(4, 6, 14, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,255,204,0.08)" : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.6), 0 0 60px rgba(0,255,204,0.04)" : "none",
        }}
      >
        {/* Top scan-line */}
        {scrolled && (
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,255,204,0.5), transparent)" }} />
        )}

        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 z-50 group">
            <div className="relative">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #00ffcc, #0088ff, #aa44ff, #ff6600, #00ffcc)",
                  padding: 1.5,
                  borderRadius: "50%",
                }}
              />
              <div
                className="relative w-9 h-9 rounded-full flex items-center justify-center font-black font-orbitron text-sm z-10"
                style={{
                  background: "linear-gradient(135deg, #001a10, #000820)",
                  color: "transparent",
                  backgroundImage: "linear-gradient(135deg, #00ffcc, #0088ff)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 8px rgba(0,255,204,0.8))",
                  margin: 2,
                }}
              >
                N
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="font-orbitron font-black text-lg tracking-wider"
                style={{
                  color: "transparent",
                  backgroundImage: "linear-gradient(90deg, #ffffff 0%, #00ffcc 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                NIRPESH
              </span>
              <span className="font-orbitron text-xs tracking-[0.25em]" style={{ color: "rgba(0,255,204,0.6)" }}>
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const href = `/${link.toLowerCase()}`;
              const active = location === href;
              return (
                <Link key={link} href={href}>
                  <motion.div
                    className="relative px-4 py-2 rounded-lg font-mono text-sm font-medium cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    style={{
                      color: active ? "#00ffcc" : "rgba(200,220,255,0.6)",
                      background: active ? "rgba(0,255,204,0.06)" : "transparent",
                      transition: "color 0.2s",
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{
                          background: "rgba(0,255,204,0.06)",
                          border: "1px solid rgba(0,255,204,0.2)",
                          boxShadow: "0 0 20px rgba(0,255,204,0.1)",
                        }}
                      />
                    )}
                    <span className="relative z-10">{link}</span>
                    {active && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "#00ffcc", boxShadow: "0 0 6px #00ffcc" }} />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="https://nirpesh-ai.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(0,255,204,0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-orbitron font-bold text-sm"
              style={{
                background: "linear-gradient(135deg, rgba(0,255,204,0.15), rgba(0,136,255,0.15))",
                border: "1px solid rgba(0,255,204,0.35)",
                color: "#00ffcc",
                boxShadow: "0 0 20px rgba(0,255,204,0.1)",
              }}
            >
              <Sparkles size={13} />
              Launch App
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden z-50 p-2 rounded-lg"
            style={{ color: "#00ffcc", border: "1px solid rgba(0,255,204,0.2)", background: "rgba(0,255,204,0.05)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{
              background: "rgba(2, 4, 12, 0.98)",
              backdropFilter: "blur(30px)",
            }}
          >
            {/* Decorative matrix lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="absolute h-px w-full" style={{
                  top: `${(i + 1) * 12}%`,
                  background: "linear-gradient(90deg, transparent, rgba(0,255,204,0.5), transparent)",
                  animationDelay: `${i * 0.1}s`,
                }} />
              ))}
            </div>

            {navLinks.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="block text-3xl font-orbitron font-black tracking-wider"
                  style={{ color: location === `/${link.toLowerCase()}` ? "#00ffcc" : "rgba(255,255,255,0.7)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link}
                </Link>
              </motion.div>
            ))}

            <motion.a
              href="https://nirpesh-ai.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 flex items-center gap-2 px-10 py-4 rounded-2xl font-orbitron font-black text-black text-lg"
              style={{ background: "linear-gradient(135deg, #00ffcc, #0088ff)" }}
              onClick={() => setMobileOpen(false)}
            >
              <Sparkles size={16} />
              Launch App
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
