import { AiWidget } from "./components/AiWidget";
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
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link to="/" className="brand">
          <img src="/atoma-atom.png" alt="" className="brand-mark" />
          <span className="brand-wordmark"><b>ATOMA</b><small>ENGINEERING LABS</small></span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <a href="/#metabuild">MetaBuild</a>
          <Link to="/mission">Mission</Link>
          <Link to="/mission">About</Link>
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
          <Link to="/#changelog">Build log</Link>
        </nav>
        <div className="header-actions">
          <Link to="/signup" className="btn-signup">Sign Up</Link>
          <Link to="/login" className="nav-login">Log in</Link>
        </div>
      </header>
      <Suspense fallback={<div className="route-loading" role="status">Loading Atoma workspace…</div>}>
        {window.location.pathname === "/brigade" ? children : <main id="main-content">{children}</main>}
      </Suspense>
      <AiWidget />
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src="/atoma-atom.png" alt="" className="brand-mark" />
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
            <Link to="/#changelog">Build log</Link>
            <Link to="/contact">Careers</Link>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <Link to="/tooling">Documentation</Link>
            <Link to="/research-hub#reader">API Reference</Link>
            <a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer">Open Source</a>
            <Link to="/apps">Status</Link>
          </div>
          <div className="footer-col">
            <h5>Legal &amp; Trust</h5>
            <Link to="/privacy">Disclosures</Link>
            <Link to="/privacy">Data practices</Link>
            <a href="https://github.com/sbarteau2022/atoma-vite-react19-motion-zustand-webgl-Ts7.1-beta">Source &amp; dependencies</a>
            <Link to="/privacy">Privacy &amp; data</Link>
            <Link to="/contact">Usage questions</Link>
            <Link to="/privacy">Security</Link>
          </div>
        </div>
        <p className="footer-practices">
          Website AI sends your submitted question to Cloudflare Workers AI. Chats are not stored.
          Accounts and contact messages are stored in Cloudflare D1. The Research Hub holds a small
          curated source catalog; editorial notes are not original abstracts. Runtime previews use demo data.
        </p>
        <div className="footer-bottom">
          <span>© 2026 Atoma Labs. All rights reserved.</span>
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
          <Route path="/privacy" element={<div className="page-head"><div className="micro">DATA PRACTICES · OCTOBER 24, 2026</div><h1>Your work deserves clear boundaries.</h1><p>AI questions are processed by Cloudflare Workers AI. We do not store chat history. Avoid submitting confidential information. Account email, display name, salted password hash, and session records are held in Cloudflare D1. Sessions expire after seven days. Contact submissions are stored for the builder to review; no email delivery is promised. Research bookmarks are tied to your account. No advertising analytics are installed. Request account or message deletion through the contact page. Accounts currently do not support email verification or password recovery; use a unique password.</p><Link to="/contact">Contact the builder ↗</Link></div>} />
          <Route path="*" element={<div className="page-head"><h1>This path is still unbuilt.</h1><p>Head back to the command center.</p><Link className="btn btn-white" to="/">Return home ↗</Link></div>} />
          <Route path="/data" element={<Navigate to="/research-hub" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
