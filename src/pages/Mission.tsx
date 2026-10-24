import { Link } from "react-router-dom";

const PRINCIPLES = [
  ["Local first", "The default home for your work is your machine. Cloud is a lane you choose, never a toll your tools quietly pay."],
  ["Plan before execution", "Work is written as a plan — steps, dependencies, judges — before it is executed. You approve the shape, not a promise."],
  ["Judges, not vibes", "A step completes when a deterministic check passes it, and the receipt says so. Fluency is not evidence."],
  ["Failure is named", "A blocked step is blocked in the open, with the reason on the record. Nothing is quietly retried into a confident-sounding answer."],
  ["Claims carry labels", "Shipped, in build, roadmap — every claim on this site and in our tools carries its status. Numbers ship with their scope or not at all."],
  ["Wrong stays on the record", "The ledger is append-only. When we get something wrong, the correction goes next to the claim, not over it."],
];

export default function Mission() {
  return (
    <>
      <div className="page-head">
        <div className="micro">Mission</div>
        <h1>Serious agent tooling, for the person working alone.</h1>
        <p className="lede">
          Atoma Labs is an independent studio building agentic tools for solo
          developers — the people shipping real software on one machine, with
          no platform team and no patience for black boxes. Our tools run on
          constrained hardware, plan in the open, and prove what they did.
        </p>
      </div>

      <section className="prose-section">
        <h2>Why we exist</h2>
        <p>
          The agent stack is being built for clusters and contracts: hosted
          models, metered calls, telemetry flowing out by default. That stack
          is powerful — and it answers to someone else. A solo developer's
          machine is idle most of the day while being entirely capable of
          running serious models. The missing piece was never compute. It is
          tooling that treats a single machine as a first-class place to
          build, and an agent's work as something that must be shown, not
          trusted.
        </p>
        <p>
          So we build the layer that runs at home: a brigade app that
          orchestrates agents as a visible graph, a harness that gates work
          behind deterministic judges, protocol servers and portable skills
          that compose instead of locking in, and a research hub that feeds
          the agents real literature. Everything local-first, everything
          auditable.
        </p>
      </section>

      <section className="prose-section">
        <h2>The principles</h2>
        <div className="principles" style={{ marginTop: "1.2rem" }}>
          {PRINCIPLES.map(([name, body], i) => (
            <div className="principle" key={name}>
              <span className="pnum">P—0{i + 1}</span>
              <h3>{name}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="prose-section">
        <h2>The version line is the geometry line</h2>
        <p>
          We say this plainly because it organizes everything we ship.{" "}
          <b>v1 is the standard, exact world</b>: standard models, a plan
          tree, a deterministic controller that audits coverage from the plan
          itself. <b>v2 is the direction after it</b>: a multi-model mind
          with a hyperbolic geometry — nested maps, near-constant-time
          recall, a brigade you carve yourself. v2 is roadmap, and it is
          labeled roadmap everywhere it appears.
        </p>
        <div className="panel" style={{ marginTop: "1.2rem", textAlign: "left" }}>
          <table className="tele">
            <tbody>
              <tr>
                <td>v1 — standard models</td>
                <td>A flat, exact map: token-prefix tree, plan tree, deterministic judges. The Brigade App and MadMind as they ship.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>v2 — the multi-model mind</td>
                <td>Nested hyperbolic KV maps, toroidal encoders, custom brigades — your swarm, your specialists, your judges.</td>
                <td><span className="pill pill-roadmap">Roadmap</span></td>
              </tr>
              <tr>
                <td>v2 tiers</td>
                <td>Paid tiers live at the v2 scale line. v1's basics are free and never become a teaser.</td>
                <td><span className="pill pill-roadmap">Roadmap</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose-section">
        <h2>Who builds it</h2>
        <p>
          Atoma Labs is built in Missouri by an independent studio, in the
          open, on a weekly cadence — the <Link to="/#changelog">changelog</Link>{" "}
          is the record. The current build is entered in the Meta Global AI
          Developer Hackathon, October 26 – November 4, 2026. After judging
          ends, the work continues: this is a business, not a ten-day spike.
        </p>
        <p style={{ marginTop: "1.4rem" }}>
          <Link className="btn btn-primary" to="/apps">See the apps</Link>
          <Link className="btn" to="/contact">Talk to the team</Link>
        </p>
      </section>
    </>
  );
}
