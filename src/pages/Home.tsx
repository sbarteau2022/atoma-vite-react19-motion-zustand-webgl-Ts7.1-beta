import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { LiveDemo } from '../components/LiveDemo'
import { PartnerMark } from '../components/PartnerMarks'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { AtomaStage } from '../scene/AtomaStage'
import {
  capabilities,
  faqs,
  features,
  flowCards,
  integrations,
  geometry,
  layers,
  overview,
  partners,
  posts,
  site,
  workflow,
} from '../content'
import { preprints } from '../preprints'
import { useGovernor } from '../governor'

const sections = [
  { id: 'capabilities', no: '01', label: 'Capabilities' },
  { id: 'numbers', no: '02', label: 'Numbers' },
  { id: 'features', no: '03', label: 'Features' },
  { id: 'integrations', no: '04', label: 'Integrations' },
  { id: 'pricing', no: '05', label: 'Pricing' },
  { id: 'insights', no: '06', label: 'Insights' },
  { id: 'faq', no: '07', label: 'FAQ' },
] as const

export function Home() {
  const { link, status } = useGovernor()
  const [openLayer, setOpenLayer] = useState(0)
  const [tab, setTab] = useState<(typeof integrations)[number]['id']>('docs')
  const [openFaq, setOpenFaq] = useState(0)
  const [annual, setAnnual] = useState(false)
  const current = integrations.find((item) => item.id === tab) ?? integrations[0]
  const deps = status?.dependencies ?? []
  const upCount = deps.filter((d) => d.up).length
  const live = link === 'live'
  const root = useRef<HTMLElement>(null)
  useScrollReveal(root)

  return (
    <main id="top" className="home" ref={root}>
      <aside className="rail" aria-label="Partners">
        <ul>
          {partners.map((partner) => (
            <li key={partner.id}>
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                title={partner.caption}
              >
                <PartnerMark id={partner.id} />
                <span className="partner-name">{partner.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <div className="canvas">
        <section className="hero">
          <p className="kicker lined">{site.kicker}</p>
          <h1>
            One mind.
            <br />
            Every engineering
            <br />
            job.
          </h1>
          <p className="lede">{site.lede}</p>
          <Link className="btn btn-cream wide-cta" to="/waitlist">
            Enter the lab
          </Link>

          <ul className="layer-acc">
            {layers.map((layer, index) => {
              const open = openLayer === index
              return (
                <li key={layer.no} className={open ? 'is-open' : undefined}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenLayer(open ? -1 : index)}
                  >
                    <span>{layer.no}</span>
                    {layer.title}
                    <i aria-hidden>{open ? '⌃' : '⌄'}</i>
                  </button>
                  {open && (
                    <>
                      <p>{layer.body}</p>
                      <ul>
                        {layer.bullets.map((bullet) => (
                          <li key={bullet}>+ {bullet}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <LiveDemo />

        <ul className="logo-strip" aria-label="Hackathon, sponsor, and community">
          {partners.map((partner) => (
            <li key={partner.id}>
              <a href={partner.href} target="_blank" rel="noopener noreferrer">
                <PartnerMark id={partner.id} />
                <span>{partner.name}</span>
                <small>{partner.caption}</small>
              </a>
            </li>
          ))}
        </ul>

        <section id="geometry" className="geometry">
          <p className="kicker lined">{geometry.kicker}</p>
          <h2 className="section-title cream">{geometry.title}</h2>
          <p className="geo-scope">{geometry.scope}</p>
          <p className="geo-legend">{geometry.legend}</p>
          <ol className="geo-pieces">
            {geometry.pieces.map((piece) => (
              <li key={piece.no}>
                <p className="kicker">
                  {piece.no} · {piece.status}
                </p>
                <h3>
                  {piece.title}
                  <span>{piece.role}</span>
                </h3>
                {piece.body.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </li>
            ))}
          </ol>
          <h3 className="geo-fit-title">How the four pieces fit</h3>
          <ol className="geo-fit">
            {geometry.fit.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <p className="kicker">Sources</p>
          <ul className="geo-sources">
            {geometry.sources.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </section>

        <section id="preprints" className="block dark-block">
          <p className="kicker lined">Preprints</p>
          <h2 className="section-title cream">Three papers. November 4, 2026.</h2>
          <p className="section-sub">
            Scientific preprints. The front of each is plain language. Opening one
            here takes you into the reader. The PDF is the paper itself.
          </p>
          <ul className="preprint-list">
            {preprints.map((paper) => (
              <li key={paper.id}>
                <span>{paper.no}</span>
                <div>
                  <Link to={`/app?tab=research&paper=${paper.id}`}>
                    <h3>{paper.title}</h3>
                  </Link>
                  <p>{paper.lead}</p>
                </div>
                <a href={paper.pdf}>PDF</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="overview" className="overview">
          <p className="kicker lined">Overview</p>
          {overview.map((para) => (
            <p key={para} className="overview-text">
              {para}
            </p>
          ))}
          <ol className="flow-cards" aria-label="Workflow example">
            {flowCards.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <ol className="workflow">
            {workflow.map((step) => (
              <li key={step.no}>
                <h2>{step.title}</h2>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="board-wrap">
          <nav className="section-index" aria-label="Sections">
            {sections.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                <span>{item.no}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="board">
            <section id="capabilities" className="block">
              <p className="kicker dark">Capabilities</p>
              <h2 className="section-title">One mind. Every engineering job.</h2>
              <p className="section-sub">
                Atoma Labs is the independent research lab. Ares is the shared
                mind — teachers pour in, throwaway copies run the job, a
                re-ranker admits only what checks out.
              </p>
              <ul className="cap-list">
                {capabilities.map((cap) => (
                  <li key={cap.title}>
                    <h3>{cap.title}</h3>
                    <p>{cap.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="numbers" className="block">
              <p className="kicker dark">Numbers</p>
              <h2 className="section-title">The map that outlives the tab.</h2>
              <p className="section-sub">
                {live && status
                  ? `Live governor on 127.0.0.1:${status.backend.port}. Governance ${status.governance.ok ? 'ok' : 'incomplete'}.`
                  : link === 'loading'
                    ? 'Checking 127.0.0.1:4810…'
                    : 'Governor unreachable — dashboard below is the product shape, labelled demo.'}
              </p>
              <div className="dash">
                <article>
                  <p>Unified map</p>
                  <p className="dash-sub">Basins in the judged mind</p>
                  <p className="dash-num">12</p>
                  <div className="bars" aria-hidden>
                    {Array.from({ length: 7 }, (_, i) => (
                      <b key={i} className={i === 3 ? 'is-hot' : undefined} style={{ height: `${30 + i * 8 + (i === 3 ? 24 : 0)}%` }} />
                    ))}
                  </div>
                </article>
                <article>
                  <p>Manual work</p>
                  <p className="dash-sub">Governed instead of hoped</p>
                  <ul>
                    <li>
                      <span>Statutory controls</span>
                      <strong>12</strong>
                    </li>
                    <li>
                      <span>Dependencies up</span>
                      <strong>
                        {live ? `${upCount}/${deps.length}` : 'demo'}
                      </strong>
                    </li>
                    <li>
                      <span>Human gates</span>
                      <strong>G12</strong>
                    </li>
                  </ul>
                </article>
                <article>
                  <p>Ops throughput</p>
                  <p className="dash-sub">Models distilled into one map</p>
                  <p className="dash-num">5</p>
                </article>
                <article>
                  <p>Resolution mode</p>
                  <p className="dash-sub">Automaton vs human</p>
                  <p>
                    Agent <strong>gated</strong>
                  </p>
                  <p>
                    Human <strong>required</strong>
                  </p>
                </article>
                <article>
                  <p>Governance</p>
                  <p className="dash-sub">Chain + controls</p>
                  <p className="dash-num">{live && status?.governance.ok ? 'ok' : '—'}</p>
                </article>
                <article>
                  <p>oMLX path</p>
                  <p className="dash-sub">Dead. Not a live seat.</p>
                  <p className="dash-num">0</p>
                </article>
              </div>
            </section>

            <section id="features" className="block">
              <p className="kicker dark">Features</p>
              <h2 className="section-title">Stop rebuilding. Start building on it.</h2>
              <p className="section-sub">
                Shared map, isolated runs, proven promotion — so a job never
                poisons the mind, and anything proven stays.
              </p>
              <ol className="feature-rows">
                {features.map((feature) => (
                  <li key={feature.no}>
                    <span>{feature.no}</span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section id="integrations" className="block">
              <p className="kicker dark">Integrations</p>
              <h2 className="section-title">Attach the mind to the stack you already run.</h2>
              <p className="section-sub">
                Research library, harness, governance, and your hardware — so
                teachers can pour into the map, and jobs write real receipts.
              </p>
              <div className="tab-row" role="tablist" aria-label="Integration areas">
                {integrations.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === item.id}
                    className={tab === item.id ? 'is-active' : undefined}
                    onClick={() => setTab(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <ul className="badge-row">
                {current.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section id="pricing" className="block">
              <p className="kicker dark">Pricing</p>
              <h2 className="section-title">Simple plans that scale with you.</h2>
              <p className="section-sub">
                Free for contributors who add to the shared mind. Paid for
                consume-only seats. Enterprise is custom hardware and policy.
              </p>
              <div className="cycle" role="group" aria-label="Billing cycle">
                <button
                  type="button"
                  className={!annual ? 'is-active' : undefined}
                  onClick={() => setAnnual(false)}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  className={annual ? 'is-active' : undefined}
                  onClick={() => setAnnual(true)}
                >
                  Annual
                </button>
              </div>
              <div className="tier-grid">
                <article>
                  <h3>Contributor</h3>
                  <p className="price">Free</p>
                  <p>For builders who contribute to the shared mind.</p>
                  <Link className="btn btn-cream" to="/waitlist">
                    Get started
                  </Link>
                </article>
                <article className="is-pro">
                  <h3>Team</h3>
                  <p className="price">{annual ? 'Soon' : 'Soon'}</p>
                  <p>For teams running judged agentic work daily.</p>
                  <Link className="btn btn-dark" to="/waitlist">
                    Get started
                  </Link>
                </article>
                <article>
                  <h3>Enterprise</h3>
                  <p className="price">Custom</p>
                  <p>For orgs needing advanced security and scale.</p>
                  <Link className="btn btn-cream" to="/waitlist">
                    Talk to sales
                  </Link>
                </article>
              </div>
            </section>
          </div>
        </div>

        <section id="insights" className="block dark-block">
          <p className="kicker lined">Insights</p>
          <h2 className="section-title cream">
            Articles, notes, updates, and latest case studies.
          </h2>
          <ul className="insight-list">
            {posts.slice(0, 3).map((post) => (
              <li key={post.slug}>
                <p className="insight-cat">{post.category}</p>
                <Link to={`/blog/${post.slug}`}>
                  <h3>{post.title}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" className="block dark-block">
          <p className="kicker lined">FAQ</p>
          <h2 className="section-title cream">Frequently asked questions.</h2>
          <div className="faq-split">
            <aside className="help-panel">
              <p className="kicker">Still have questions? We are here to help</p>
              <p>For complex workflows or custom integrations, talk to us.</p>
              <Link className="btn btn-cream" to="/waitlist">
                Contact us
              </Link>
            </aside>
            <div className="faq-list">
              {faqs.map((item, index) => (
                <details
                  key={item.q}
                  open={openFaq === index}
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenFaq(index)
                  }}
                >
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>

      <aside className="stage" aria-label="Interactive Atoma mind" style={{ position: 'relative' }}>
        <div className="dots" />
        <div style={{ position: 'absolute', top: 12, left: 12, right: 12, zIndex: 2, pointerEvents: 'none' }}>
          <p style={{ margin: 0, fontSize: 11, letterSpacing: '.15em', color: '#a1a1aa' }}>THE MIND, IN 3D — DRAG TO ORBIT · CLICK A PIECE</p>
          <p style={{ margin: '6px 0 0', fontSize: 20, fontWeight: 700, color: '#EFEADF' }}>Four pieces. One map.</p>
        </div>
        <div style={{ position: 'absolute', bottom: 12, left: 12, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['01', 'Lorentz hyperboloid', 'The map itself'],
            ['02', 'Phase torus', 'Fast + slow, 2:1 lock'],
            ['03', 'Poincaré KV, nested', 'Memory inside the map'],
            ['04', '12 around 1 — Atlas13', 'Basins + coordinator'],
          ].map(([no, name, desc], i) => (
            <button key={no} type="button" onClick={() => setOpenLayer(i)} style={{ textAlign: 'left', background: openLayer === i ? '#f59e0b' : 'rgba(23,23,26,.85)', color: openLayer === i ? '#17171a' : '#EFEADF', border: '1px solid #45454d', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 13 }}>
              <b>{no} · {name}</b> <span style={{ opacity: 0.75 }}>— {desc}</span>
            </button>
          ))}
        </div>
        <AtomaStage selected={openLayer} onSelect={setOpenLayer} />
      </aside>
    </main>
  )
}
