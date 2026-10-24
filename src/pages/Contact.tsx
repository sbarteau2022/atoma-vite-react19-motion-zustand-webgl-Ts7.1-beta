import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <div className="page-head">
        <div className="micro">Contact</div>
        <h1>Talk to a human who builds.</h1>
        <p className="lede">
          Atoma Labs is an independent studio in Missouri. Questions about
          the products, the Research Hub, partnerships, or the work itself —
          this reaches the builder, not a ticket queue.
        </p>
      </div>

      <section className="prose-section">
        <div className="grid2" style={{ alignItems: "start", gap: "1.5rem" }}>
          <form
            className="shell"
            style={{ maxWidth: "none", display: "flex", flexDirection: "column" }}
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          >
            <label>Your name
              <input name="name" autoComplete="name" required />
            </label>
            <label>Email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>Topic
              <select name="topic" defaultValue="Product">
                <option>Product</option>
                <option>Research Hub</option>
                <option>Partnership</option>
                <option>Press</option>
                <option>Something else</option>
              </select>
            </label>
            <label>Message
              <textarea name="message" rows={7} required />
            </label>
            <button className="btn btn-primary" type="submit">Send</button>
            {sent && (
              <p>Received. We read everything — replies when there's something real to say.</p>
            )}
          </form>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
            <div className="panel gh-card">
              <span className="gh-mark">⌥</span>
              <div>
                <h3>GitHub</h3>
                <p style={{ margin: 0 }}>
                  The work in the open:{" "}
                  <a href="https://github.com/sbarteau2022" target="_blank" rel="noreferrer">
                    github.com/sbarteau2022
                  </a>{" "}
                  — issues and discussion welcome there too.
                </p>
              </div>
            </div>

            <div className="panel">
              <h3>What to expect</h3>
              <p>
                We read everything. Replies when there's something real to say —
                no autoresponder theater, no newsletter you didn't ask for.
                Product questions get product answers; the{" "}
                <Link to="/#changelog">changelog</Link> covers the rest on its
                weekly cadence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
