import { Link } from 'react-router-dom'

export function Terms() {
  return (
    <main className="page article">
      <p className="kicker">Last updated · 4 Nov 2026</p>
      <h1>Terms of Use</h1>
      <p>
        These terms govern access to the Atoma Labs site and the Ares governor.
        By using either, you agree to them. If you do not, do not use the
        services.
      </p>
      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 and have authority to bind yourself or the
        organization you represent.
      </p>
      <h2>2. Permitted use</h2>
      <p>
        Atoma grants a limited, non-exclusive, revocable license to use the
        services as offered. You may not reverse engineer the governor, use it
        to build a competing judged-mind product, or attempt unauthorized
        access to loopback services you do not operate.
      </p>
      <h2>3. Data</h2>
      <p>
        You retain ownership of sources you connect. We process them to provide
        the map, receipts, and audit chain. We do not sell that data.
      </p>
      <h2>4. No silent bypass</h2>
      <p>
        Governance is not optional. There is no “compliance off” flag. A
        dispatch without a permit is a failure, not a feature.
      </p>
      <p>
        <Link to="/">← Home</Link>
      </p>
    </main>
  )
}

export function Privacy() {
  return (
    <main className="page article">
      <p className="kicker">Last updated · 4 Nov 2026</p>
      <h1>Privacy Policy</h1>
      <p>
        Atoma Labs collects account information you submit (name, email,
        company) and operational telemetry from the governor you run. Waitlist
        entries on this site currently stay in your browser until a governed
        intake route exists.
      </p>
      <h2>1. What we collect</h2>
      <p>
        Account fields, connected source metadata, audit-chain entries, and
        usage events exported to HyperDX when that store is configured.
      </p>
      <h2>2. What we do not do</h2>
      <p>
        We do not sell personal information. We do not use your customer data
        to train a public model. Demo chrome is labelled demo when the
        governor is down.
      </p>
      <h2>3. Your rights</h2>
      <p>
        Access, correction, deletion, and portability requests go to
        privacy@atomalabs.dev. Surgical erasure of a map atom is a governed
        operation with a residual scan, not a silent delete.
      </p>
      <p>
        <Link to="/">← Home</Link>
      </p>
    </main>
  )
}
