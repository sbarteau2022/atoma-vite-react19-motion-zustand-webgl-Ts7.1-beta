import { Link } from "react-router-dom";

export default function Tooling() {
  return (
    <>
      <div className="page-head">
        <div className="micro">Tooling · Tools &amp; Skills</div>
        <h1>Skills.md: agent skills that travel.</h1>
        <p className="lede">
          A skill should be a file, not a feature. Skills.md is our portable
          format for agent capabilities: plain markdown with a small
          front-matter contract — readable by a human, loadable by any
          harness, versioned like code.
        </p>
      </div>

      <section className="prose-section">
        <h2>Anatomy of a skill</h2>
        <p>
          Every skill opens with front matter that declares its contract,
          followed by the instructions themselves. The contract is the part
          most "prompt libraries" skip — and the part that makes a skill
          safe to compose.
        </p>
        <div className="codeblock" style={{ fontSize: "0.8rem", marginTop: "1.2rem" }}>
          <span className="tok-a">---</span>{"\n"}
          <span className="tok-k">name:</span> <span className="tok-t">rust-refactor</span>{"\n"}
          <span className="tok-k">version:</span> 1.2.0{"\n"}
          <span className="tok-k">tools:</span> [fs, cargo]{"\n"}
          <span className="tok-k">triggers:</span> crate fails clippy -D warnings{"\n"}
          <span className="tok-a">---</span>{"\n\n"}
          <span className="tok-a"># When to use</span>{"\n"}
          Apply when a crate fails <span className="tok-t">clippy -D warnings</span>{"\n"}
          and the fix is structural, not cosmetic.{"\n\n"}
          <span className="tok-a"># Method</span>{"\n"}
          1. Read the warnings as a list, not a mood.{"\n"}
          2. Fix causes in dependency order.{"\n"}
          3. Re-run clippy + tests; attach both outputs{"\n"}
          {"   "}to the receipt before claiming done.
        </div>
        <div className="panel" style={{ marginTop: "1.2rem" }}>
          <table className="tele">
            <tbody>
              <tr><td>name</td><td>The skill's identity. Stable across harnesses; renaming a skill is a breaking change.</td></tr>
              <tr><td>version</td><td>Semver. A run pins the version it used, so a receipt can be re-checked against the exact skill that produced it.</td></tr>
              <tr><td>tools</td><td>The complete list of tools the skill may touch. Anything not listed is out of bounds — the harness enforces it.</td></tr>
              <tr><td>triggers</td><td>When the skill applies, written for the planner. Vague triggers make vague brigades.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose-section">
        <h2>How skills compose</h2>
        <div className="grid3">
          <div className="panel feat">
            <h3>Declared, not ambient</h3>
            <p>A plan names the skills it will use, the way a build names its
            dependencies. Nothing loads silently because a model felt like it.</p>
          </div>
          <div className="panel feat">
            <h3>Least tool, by contract</h3>
            <p>The front matter is a permission slip: a skill that declares
            [fs, cargo] cannot reach the network, no matter what its prose says.</p>
          </div>
          <div className="panel feat">
            <h3>Receipts cite skills</h3>
            <p>When a packet completes, its receipt names the skill and version
            behind it. If a skill misbehaves, you can find every run it touched.</p>
          </div>
        </div>
      </section>
    </>
  );
}
