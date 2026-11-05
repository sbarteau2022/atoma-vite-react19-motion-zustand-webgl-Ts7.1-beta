import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { readSeat, saveSeat } from '../seat'
import { useAtomaStore } from '../store/useAtomaStore'

type FormState = {
  first: string
  last: string
  email: string
  company: string
  size: string
  hardware: string
}

const empty: FormState = {
  first: '',
  last: '',
  email: '',
  company: '',
  size: '1-10',
  hardware: 'macOS',
}

function enterLab(first: string, last: string) {
  const store = useAtomaStore.getState()
  const name = `${first} ${last}`.trim()
  const handle = `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase() || 'AL'
  store.setUserName(name)
  store.setUserHandle(handle)
  store.setIsAuthenticated(true)
  store.setActivePage('cloud-app')
}

export function Waitlist() {
  const navigate = useNavigate()
  const existing = readSeat()
  const [form, setForm] = useState<FormState>(empty)
  const [done, setDone] = useState(Boolean(existing))

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    saveSeat({ ...form, at: new Date().toISOString() })
    enterLab(form.first, form.last)
    navigate('/app')
  }

  return (
    <main className="page">
      <header className="page-hero">
        <p className="kicker">Waitlist</p>
        <h1>Enter the lab</h1>
        <p className="lede">
          Join, then open the lab — one shared mind, throwaway runs, receipts
          for what proved. This form stores a local seat until a waitlist route
          exists on the governor — we will not pretend a Surreal row exists
          until it does.
        </p>
      </header>

      {done ? (
        <aside className="help-panel">
          <p className="kicker">You are on the list</p>
          <p>
            Local seat saved on this machine. Open the lab for Ares Spec Ops,
            Research, N³, the Capability DAG, and the Obsidian graph. If the
            program on this computer is not running, the lab stays labelled demo.
          </p>
          <div className="hero-actions">
            <Link
              className="btn btn-cream"
              to="/app"
              onClick={() => existing && enterLab(existing.first, existing.last)}
            >
              Open the lab
            </Link>
            <button className="btn btn-ghost" type="button" onClick={() => setDone(false)}>
              Submit another
            </button>
          </div>
        </aside>
      ) : (
        <form className="waitlist" onSubmit={onSubmit}>
          <label>
            First name
            <input
              required
              name="first"
              value={form.first}
              onChange={(e) => setForm({ ...form, first: e.target.value })}
            />
          </label>
          <label>
            Last name
            <input
              required
              name="last"
              value={form.last}
              onChange={(e) => setForm({ ...form, last: e.target.value })}
            />
          </label>
          <label className="wide">
            Work email
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label>
            Company
            <input
              name="company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </label>
          <label>
            Team size
            <select
              name="size"
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
            >
              <option>1-10</option>
              <option>11-50</option>
              <option>51-200</option>
              <option>200+</option>
            </select>
          </label>
          <label>
            Your hardware
            <select
              name="hardware"
              value={form.hardware}
              onChange={(e) => setForm({ ...form, hardware: e.target.value })}
            >
              <option>macOS</option>
              <option>Linux</option>
              <option>Windows</option>
            </select>
          </label>
          <button className="btn btn-primary wide" type="submit">
            Join the waitlist
          </button>
        </form>
      )}

      <ol className="workflow wait-steps">
        <li>
          <span>01</span>
          <div>
            <h2>Join</h2>
            <p>Tell us who you are and what hardware you run.</p>
          </div>
        </li>
        <li>
          <span>02</span>
          <div>
            <h2>Open the lab</h2>
            <p>Ares Spec Ops, Research, N³, the Capability DAG, and the Obsidian graph sit behind this seat.</p>
          </div>
        </li>
        <li>
          <span>03</span>
          <div>
            <h2>Keep receipts</h2>
            <p>Governor on loopback. Sources in. Gate 12 on. Receipts out.</p>
          </div>
        </li>
      </ol>
    </main>
  )
}
