import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Mission from "./pages/Mission.tsx";
import Apps from "./pages/Apps.tsx";
import Harness from "./pages/Harness.tsx";
import Tooling from "./pages/Tooling.tsx";
import Plugins from "./pages/Plugins.tsx";
import ResearchHub from "./pages/ResearchHub.tsx";
import Contact from "./pages/Contact.tsx";
import { Login, Signup } from "./pages/Auth.tsx";
import BrigadeWorkspace from "./pages/BrigadeWorkspace.tsx";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/atoma-mark.svg" alt="Atoma Labs" className="brand-mark" />
          <span className="brand-text">Atoma Labs</span>
        </Link>
        <nav className="site-nav">
          <Link to="/mission">Mission</Link>
          <Link to="/tooling">Tools/Skills</Link>
          <Link to="/plugins">MCP</Link>
          <Link to="/research-hub">Research Hub</Link>
        </nav>
        <div className="header-actions">
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>
      </header>
      {window.location.pathname === "/brigade" ? children : <main>{children}</main>}
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src="/atoma-mark.svg" alt="" className="brand-mark" />
              <span className="brand-text">Atoma Labs</span>
            </Link>
            <p>Principled intelligence. Agentic tools built for solo developers.</p>
            <span className="footer-status">
              <span className="status-dot green" />
              All systems operational
            </span>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <Link to="/apps">Brigade App</Link>
            <Link to="/plugins">MCP Servers</Link>
            <Link to="/tooling">Tools &amp; Skills</Link>
            <Link to="/research-hub">Research Hub API</Link>
            <Link to="/#changelog">Changelog</Link>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <Link to="/mission">Mission</Link>
            <Link to="/contact">About Us</Link>
            <Link to="/#changelog">What we're working on</Link>
            <Link to="/mission#blog">Blog</Link>
            <Link to="/contact#careers">Careers</Link>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <Link to="/tooling#docs">Documentation</Link>
            <Link to="/research-hub#api">API Reference</Link>
            <a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer">Open Source</a>
            <Link to="/apps#status">Status</Link>
          </div>
          <div className="footer-col">
            <h5>Legal &amp; Trust</h5>
            <span>Disclosures</span>
            <span>Data Practices</span>
            <span>Licenses</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
        <p className="footer-practices">
          Data practices: Atoma Labs tools run locally by default and do not transmit
          prompts, code or telemetry without explicit opt-in. Research Hub indexes publicly
          available preprints under their original licenses. Open-source components are distributed
          under Apache-2.0 or MIT.
        </p>
        <div className="footer-bottom">
          <span>© 2025 Atoma Labs. All rights reserved.</span>
          <span className="plat">macOS • Linux • Windows</span>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/brigade" element={<BrigadeWorkspace />} />
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
      </Layout>
    </BrowserRouter>
  );
}
