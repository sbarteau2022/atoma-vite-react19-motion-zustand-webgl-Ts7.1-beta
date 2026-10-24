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

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/atoma-mark.svg" alt="" className="brand-mark" />
          Atoma&nbsp;<b>Labs</b>
        </Link>
        <nav className="site-nav">
          <Link to="/mission">Mission</Link>
          <Link to="/apps">Apps</Link>
          <Link to="/harness">Harness</Link>
          <Link to="/tooling">Tools &amp; Skills</Link>
          <Link to="/plugins">MCP</Link>
          <Link to="/research-hub">Research Hub</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login" className="nav-login">Login</Link>
          <Link to="/signup" className="btn-light">Sign Up</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src="/atoma-mark.svg" alt="" className="brand-mark" />
              Atoma&nbsp;<b>Labs</b>
            </Link>
            <p>Principled intelligence. Agentic tools built for solo developers.</p>
            <span className="footer-status">
              <span className="status-dot" />
              In the arena — Meta Global AI Developer Hackathon · Oct 26 – Nov 4, 2026
            </span>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <Link to="/apps">Brigade App</Link>
            <Link to="/harness">MadMind Harness</Link>
            <Link to="/plugins">MCP Servers</Link>
            <Link to="/tooling">Tools &amp; Skills</Link>
            <Link to="/research-hub">Research Hub</Link>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <Link to="/mission">Mission</Link>
            <Link to="/contact">Contact</Link>
            <a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer">GitHub</a>
            <Link to="/#changelog">Changelog</Link>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <Link to="/harness">How MadMind works</Link>
            <Link to="/research-hub">API reference — planned</Link>
            <Link to="/tooling">Skills.md format</Link>
            <Link to="/mission">The geometry line</Link>
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
          Data practices: Atoma Labs tools run locally by default and do not
          transmit prompts, code or telemetry without explicit opt-in.
          Research Hub indexes publicly available preprints under their
          original licenses. Open-source components are distributed under
          Apache-2.0 or MIT.
        </p>
        <div className="footer-bottom">
          <span>© 2026 Atoma Labs. All rights reserved.</span>
          <a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer">github.com/sbarteau2022</a>
          <span className="plat">macOS · Linux · Windows</span>
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
