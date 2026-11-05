import { Link } from 'react-router-dom'
import { posts, principles } from '../content'

export function About() {
  return (
    <main className="page">
      <header className="page-hero">
        <p className="kicker">About</p>
        <h1>One mind. Every engineering job.</h1>
        <p className="lede">
          Atoma Labs is an independent research lab submitting Ares Spec Ops to
          Meta Superintelligence Labs. Most AI forgets the moment you close the
          tab. Ares doesn&apos;t. One shared map. Throwaway runs. Receipts for
          what proved.
        </p>
      </header>

      <section className="block">
        <p className="overview-text">
          We built a mind that lives apart from any single model. Teachers —
          different models, different strengths — pour what they know into one
          shared map, and then they can walk away. The map stays. It remembers,
          it compounds, and it gets sharper every time you use it. A job never
          touches that map directly: a throwaway copy runs the work, a
          re-ranker admits only what checks out, and proven atoms earn their
          place.
        </p>
        <ul className="stat-row">
          <li>
            <strong>2019</strong>
            <span>Independent since day one</span>
          </li>
          <li>
            <strong>12</strong>
            <span>Live statutory controls</span>
          </li>
          <li>
            <strong>G12</strong>
            <span>Human oversight as a gate</span>
          </li>
          <li>
            <strong>4810</strong>
            <span>Loopback governor port</span>
          </li>
        </ul>
      </section>

      <section className="block">
        <p className="kicker">Principles</p>
        <h2 className="section-title">How we build.</h2>
        <ul className="cap-list">
          {principles.map((item) => (
            <li key={item.no}>
              <h3>
                {item.no} · {item.title}
              </h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="block">
        <p className="kicker">Insights</p>
        <h2 className="section-title">Notes from the build.</h2>
        <ul className="insight-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <p className="insight-cat">{post.date}</p>
              <Link to={`/blog/${post.slug}`}>
                <h3>{post.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
