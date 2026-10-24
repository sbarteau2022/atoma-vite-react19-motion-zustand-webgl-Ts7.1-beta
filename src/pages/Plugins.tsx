import { Link } from "react-router-dom";

const RULES = [
  ["Typed, end to end", "Every tool is a schema: named inputs, named outputs, no stringly-typed surprises. The harness validates calls before they run and results before they are believed."],
  ["Sandboxed by default", "A filesystem server sees the workspace it was given — not your home directory, not your keys. Reach is granted per server, per run, and it expires with the run."],
  ["Observable, always", "Every call lands on the ledger with its inputs, outputs and cost. A tool the audit log cannot see is a tool the brigade does not get."],
  ["Least privilege", "Servers expose the smallest surface that does the job: read before write, list before delete, dry-run before destructive."],
];

export default function Plugins() {
  return (
    <>
      <div className="page-head">
        <div className="micro">Plug-ins · MCP Servers</div>
        <h1>Tools the brigade may touch — on the record.</h1>
        <p className="lede">
          The Model Context Protocol is how agents reach tools. Our servers
          are drop-in MCP servers for filesystem, git, research and local
          inference — built to one standard: typed, sandboxed, observable.
        </p>
        <p style={{ marginTop: "1.2rem" }}>
          <span className="pill pill-roadmap">Shipping with v1 · In build</span>
        </p>
      </div>

      <section className="prose-section">
        <h2>The servers</h2>
        <div className="panel" style={{ marginTop: "1.2rem" }}>
          <table className="tele">
            <tbody>
              <tr>
                <td>atoma-fs</td>
                <td>stdio</td>
                <td>Workspace filesystem: read, write, search — rooted at the project you opened, nothing above it.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>atoma-research</td>
                <td>http</td>
                <td>Research access for agents: search and read the Research Hub index and your local library.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>atoma-infer-metal</td>
                <td>stdio</td>
                <td>Local inference on Apple silicon: run the models already on your machine as a tool any agent can call.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>atoma-git</td>
                <td>stdio</td>
                <td>Repository work with guardrails: status, diff, branch, commit — history rewriting stays a human's job.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose-section">
        <h2>Four rules for any server</h2>
        <div className="grid2" style={{ marginTop: "1.2rem" }}>
          {RULES.map(([title, desc]) => (
            <div className="panel feat" key={title}>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
