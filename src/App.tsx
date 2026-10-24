import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Header } from "./components/Header.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Mission = lazy(() => import("./pages/Mission.tsx"));
const Apps = lazy(() => import("./pages/Apps.tsx"));
const Harness = lazy(() => import("./pages/Harness.tsx"));
const Tooling = lazy(() => import("./pages/Tooling.tsx"));
const Plugins = lazy(() => import("./pages/Plugins.tsx"));
const ResearchHub = lazy(() => import("./pages/ResearchHub.tsx"));
const Contact = lazy(() => import("./pages/Contact.tsx"));
const Login = lazy(() => import("./pages/Auth.tsx").then(m => ({ default: m.Login })));
const Signup = lazy(() => import("./pages/Auth.tsx").then(m => ({ default: m.Signup })));

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center font-mono text-xs text-[#8b9595]">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#080b0f] px-5 py-2.5 shadow-2xl backdrop-blur-xl">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-[#4fe3ea] border-t-transparent" />
        <span>Loading Atoma surface...</span>
      </div>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050607] text-[#e9eded] selection:bg-[#4fe3ea]/30 selection:text-white">
      <Header />
      <main className="w-full">{children}</main>

      {/* Obsidian Sovereign Footer */}
      <footer className="border-t border-white/10 bg-[#07090c] pt-16 pb-12 font-mono text-xs">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
            
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-3">
              <Link to="/" className="inline-flex items-center gap-2 tracking-[0.2em] font-semibold text-white">
                <img src="/atoma-mark.svg" alt="" className="h-5 w-5" />
                ATOMA&nbsp;<b className="text-[#4fe3ea]">LABS</b>
              </Link>
              <p className="font-sans text-xs text-[#8b9595] leading-relaxed max-w-sm">
                Principled intelligence. Agentic tools built for solo developers shipping real software on one machine.
              </p>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] text-[#f0a832]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f0a832] animate-pulse" />
                In the arena — Meta Global AI Developer Hackathon · Oct 26 – Nov 4, 2026
              </div>
            </div>

            {/* Product Col */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white">Product</div>
              <ul className="space-y-1.5 text-[#8b9595]">
                <li><Link to="/apps" className="hover:text-white">Brigade App</Link></li>
                <li><Link to="/harness" className="hover:text-white">MadMind Harness</Link></li>
                <li><Link to="/plugins" className="hover:text-white">MCP Servers</Link></li>
                <li><Link to="/tooling" className="hover:text-white">Tools &amp; Skills</Link></li>
                <li><Link to="/research-hub" className="hover:text-white">Research Hub</Link></li>
              </ul>
            </div>

            {/* Company Col */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white">Company</div>
              <ul className="space-y-1.5 text-[#8b9595]">
                <li><Link to="/mission" className="hover:text-white">Mission</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                <li><a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a></li>
                <li><Link to="/#changelog" className="hover:text-white">Changelog</Link></li>
              </ul>
            </div>

            {/* Legal & Trust Col */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-widest text-white">Legal &amp; Trust</div>
              <ul className="space-y-1.5 text-[#8b9595]">
                <li><span>Disclosures</span></li>
                <li><span>Data Practices</span></li>
                <li><span>Licenses</span></li>
                <li><span>Privacy Policy</span></li>
                <li><span>Terms of Service</span></li>
                <li><span>Security</span></li>
              </ul>
            </div>

          </div>

          <div className="mt-12 border-t border-white/5 pt-6 text-[11px] text-[#5b6464] leading-relaxed">
            Data practices: Atoma Labs tools run locally by default and do not transmit prompts, code or telemetry without explicit opt-in. Research Hub indexes publicly available preprints under their original licenses. Open-source components are distributed under Apache-2.0 or MIT.
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-[10px] text-[#5b6464]">
            <span>© 2026 Atoma Labs. All rights reserved.</span>
            <a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer" className="text-[#8b9595] hover:text-white">
              github.com/sbarteau2022
            </a>
            <span>macOS · Linux · Windows</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/harness" element={<Harness />} />
            <Route path="/tooling" element={<Tooling />} />
            <Route path="/plugins" element={<Plugins />} />
            <Route path="/research-hub" element={<ResearchHub />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/how-it-works" element={<Navigate to="/harness" replace />} />
            <Route path="/data" element={<Navigate to="/research-hub" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
