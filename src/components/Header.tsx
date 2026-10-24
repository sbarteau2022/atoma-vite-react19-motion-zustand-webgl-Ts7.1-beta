import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/mission", label: "Mission" },
    { to: "/apps", label: "Apps" },
    { to: "/harness", label: "Harness" },
    { to: "/tooling", label: "Tools & Skills" },
    { to: "/plugins", label: "MCP" },
    { to: "/research-hub", label: "Research Hub" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-[1140px] transition-all duration-500 ${
          scrolled ? "top-3" : "top-4"
        }`}
      >
        <div className="relative flex items-center justify-between rounded-full border border-white/12 bg-[#07090c]/85 px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-2xl">
          
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-[#e9eded] transition-colors"
          >
            <div className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-[#4fe3ea]/50">
              <img src="/atoma-mark.svg" alt="Atoma Mark" className="h-4 w-4" />
            </div>
            <span className="font-medium tracking-[0.2em]">
              ATOMA&nbsp;<b className="text-[#4fe3ea] font-semibold">LABS</b>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative rounded-full px-3 py-1.5 transition-colors duration-200 ${
                    isActive ? "text-white font-medium" : "text-[#8b9595] hover:text-[#e9eded]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions (Login & Sign Up button-in-button) */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="font-mono text-xs text-[#8b9595] transition-colors hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-3.5 py-1.5 font-mono text-xs font-medium text-black transition-all duration-300 hover:bg-[#e9eded] active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <span>Sign Up</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3 w-3 text-black" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button with Fluid Line Morph */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-4 rounded-full bg-white transition-all"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-4 rounded-full bg-white transition-all"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-4 rounded-full bg-white transition-all"
            />
          </button>

        </div>
      </header>

      {/* Fullscreen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[#050607]/95 px-6 pt-24 pb-8 lg:hidden font-mono"
          >
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#5b6464]">Navigation</span>
              <div className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.25 }}
                  >
                    <Link
                      to={link.to}
                      className="block text-lg font-medium text-[#e9eded] hover:text-[#4fe3ea] py-1 border-b border-white/5"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <Link
                to="/signup"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-xs font-semibold text-black"
              >
                Sign Up <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/login"
                className="flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 py-3 text-xs text-[#e9eded]"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
