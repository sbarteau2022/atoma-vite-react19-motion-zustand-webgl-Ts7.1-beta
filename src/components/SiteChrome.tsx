import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AtomMark } from './AtomMark'
import { StatusPill } from './StatusPill'
import { navItemActive, pageTitle, primaryNav } from '../siteNav'

export function SiteChrome() {
  const [open, setOpen] = useState(false)
  const { pathname, search } = useLocation()
  const home = pathname === '/'
  const lab = pathname === '/app'
  const title = pageTitle(pathname, search)

  useEffect(() => {
    document.title = title === 'Atoma Labs' ? 'Atoma Labs — One mind. Every engineering job.' : `${title} — Atoma Labs`
  }, [title])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  if (lab) return <Outlet />

  return (
    <div className={`shell ${home ? 'is-home' : 'is-inner'}`}>
      <NavLink className="ribbon" to="/" aria-label="Atoma Labs home">
        <AtomMark size={40} title="Atoma Labs" />
      </NavLink>
      <header className="site-header">
        <button
          className={open ? 'menu-toggle is-open' : 'menu-toggle'}
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
        <nav id="primary-nav" className={open ? 'is-open' : undefined} aria-label="Primary">
          {primaryNav.map((item) => (
            <NavLink
              key={item.id}
              to={item.to}
              end={item.end}
              className={() => (navItemActive(item.to, pathname, search) ? 'active' : undefined)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink className="btn btn-cream" to="/waitlist" onClick={() => setOpen(false)}>
            Enter the lab
          </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer className="site-footer">
        <div className="footer-cta">
          <p className="kicker">A Superintelligent Labs submission</p>
          <h2>One mind. Every engineering job.</h2>
          <p>
            Most AI forgets everything the moment you close the tab. Ares
            doesn&apos;t. Teachers pour into one map. Jobs run on a throwaway
            copy. Proven work stays.
          </p>
          <NavLink className="btn btn-cream" to="/waitlist">
            Enter the lab
          </NavLink>
        </div>
        <div className="footer-grid">
          <div>
            <p className="wordmark">Atoma Labs</p>
            <p className="foot-desc">
              Independent research lab. One shared mind. Throwaway runs. A
              re-ranker that writes receipts — and you still hold the keys.
            </p>
            <StatusPill />
          </div>
          <div>
            <p className="kicker">Pages</p>
            <nav aria-label="Footer">
              <NavLink to="/">Homepage</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/updates">Updates</NavLink>
              <NavLink to="/waitlist">Waitlist</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/app">App</NavLink>
            </nav>
          </div>
          <div>
            <p className="kicker">Governance</p>
            <ul className="badge-col">
              <li>Gate 12 — human permit</li>
              <li>GDPR-ART-17 on the governor</li>
              <li>Merkle-anchored audit</li>
              <li>Fail closed. Proven work stays.</li>
            </ul>
          </div>
        </div>
        <p className="bottom-bar">
          © Atoma Labs, 2026. All rights reserved.{' '}
          <NavLink to="/terms">Terms of use</NavLink>
          {' · '}
          <NavLink to="/privacy">Privacy Policy</NavLink>
        </p>
      </footer>
    </div>
  )
}
