import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main className="page">
      <header className="page-hero">
        <p className="kicker">404</p>
        <h1>This page is missing.</h1>
        <p className="lede">The atom is not on this map.</p>
        <Link className="btn btn-primary" to="/">
          Back to homepage
        </Link>
      </header>
    </main>
  )
}
