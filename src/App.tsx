import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
const Home = React.lazy(() => import("./pages/Home.tsx"));
const Mission = React.lazy(() => import("./pages/Mission.tsx"));
const Apps = React.lazy(() => import("./pages/Apps.tsx"));
const Harness = React.lazy(() => import("./pages/Harness.tsx"));
const Tooling = React.lazy(() => import("./pages/Tooling.tsx"));
const Plugins = React.lazy(() => import("./pages/Plugins.tsx"));
const ResearchHub = React.lazy(() => import("./pages/ResearchHub.tsx"));
const BrandKit = React.lazy(() => import("./pages/BrandKit.tsx"));
const Contact = React.lazy(() => import("./pages/Contact.tsx"));
const Login = React.lazy(() => import("./pages/Auth.tsx").then((module) => ({ default: module.Login })));
const Signup = React.lazy(() => import("./pages/Auth.tsx").then((module) => ({ default: module.Signup })));
const BrigadeWorkspace = React.lazy(() => import("./pages/BrigadeWorkspace.tsx"));

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/atoma-mark.svg" alt="" className="brand-mark" />
          <span className="brand-wordmark"><b>ATOMA</b><small>ENGINEERING LABS</small></span>
        </Link>
        <nav className="site-nav">
          <a href="/#metabuild">MetaBuild</a>
          <Link to="/mission">Mission</Link>
          <Link to="/contact">About</Link>
          <details className="products-menu">
            <summary>Products <span>⌄</span></summary>
            <div className="products-dropdown">
              <Link to="/apps"><b>Brigade</b><small>Agent workspace and run tracker</small></Link>
              <Link to="/tooling"><b>Tools &amp; Skills</b><small>Composable capabilities</small></Link>
              <Link to="/plugins"><b>MCP Servers</b><small>Connectors and custom servers</small></Link>
              <Link to="/harness"><b>Agentic Harness</b><small>Principles, control, and evidence</small></Link>
              <Link to="/plugins#custom-servers"><b>Plugins</b><small>Extend your local stack</small></Link>
              <Link to="/plugins#custom-servers"><b>Custom Servers</b><small>Bring your own tools and endpoints</small></Link>
            </div>
          </details>
          <Link to="/research-hub">Research Hub</Link>
          <Link to="/mission#blog">Blog</Link>
        </nav>
        <div className="header-actions">
          <Link to="/signup" className="btn-signup">Sign Up</Link>
          <Link to="/login" className="nav-login">Log in</Link>
        </div>
      </header>
      <Suspense fallback={<div className="route-loading" role="status">Loading Atoma workspace…</div>}>
        {window.location.pathname === "/brigade" ? children : <main>{children}</main>}
      </Suspense>
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src="/atoma-mark.svg" alt="" className="brand-mark" />
              <span className="brand-wordmark"><b>ATOMA</b><small>ENGINEERING LABS</small></span>
            </Link>
            <p>Build intelligence you can inspect.</p>
            <Link className="footer-brand-link" to="/brand-kit">Explore identity <span>↗</span></Link>
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
            <Link to="/research-hub#reader">API Reference</Link>
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
          <Route path="/brand-kit" element={<BrandKit />} />
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
