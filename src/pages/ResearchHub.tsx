import { Link } from "react-router-dom";

export default function ResearchHub() {
  return (
    <>
      <div className="page-head">
        <div className="micro">Research Hub</div>
        <h1>The state of AI, one API call away.</h1>
        <p className="lede">
          An open hub indexing the newest preprints and literature across
          artificial intelligence — built API-first, so your agents can pull,
          search and stream the literature the way they pull any other tool.
        </p>
        <p style={{ marginTop: "1.2rem" }}>
          <span className="pill pill-roadmap">In build</span>{" "}
          <span className="pill pill-verified">Free for anyone, at launch</span>
        </p>
      </div>

      <section className="prose-section">
        <h2>What it will be</h2>
        <div className="grid3">
          <div className="panel feat">
            <h3>An index with a memory</h3>
            <p>New preprints and literature, ingested continuously and kept —
            not a search box over someone else's snapshot, but a corpus with
            provenance: where each paper came from, when it arrived, what it
            cites.</p>
          </div>
          <div className="panel feat">
            <h3>API-first, agents native</h3>
            <p>Search, fetch and stream endpoints designed for agent
            consumption: stable ids, structured metadata, PDFs at predictable
            URLs. The human web view is the same API wearing a face.</p>
          </div>
          <div className="panel feat">
            <h3>Free for anyone</h3>
            <p>The Hub is the commons layer of the lab. Keys are free at
            launch; the index is built from publicly available preprints
            under their original licenses.</p>
          </div>
        </div>
      </section>

      <section className="prose-section" id="architecture">
        <h2>How it's being built <span className="pill pill-roadmap">The plan, labeled as plan</span></h2>
        <p>
          The Hub runs on the same edge stack as this site. Each piece below
          is the planned production shape; the build is underway, and this
          table will be updated as pieces land.
        </p>
        <div className="panel" style={{ marginTop: "1.2rem" }}>
          <table className="tele arch-table">
            <tbody>
              <tr>
                <td>Ingestion spine</td>
                <td>Cloudflare Workers + Queues</td>
                <td>Pulls arXiv preprints nightly across cs.AI, cs.CL, cs.LG. Computes content hashes and extracts citation graphs.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>Vector catalog</td>
                <td>Vectorize + Local Embeddings</td>
                <td>Dense and sparse vector indices enabling hybrid semantic and exact identifier retrieval.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>Document store</td>
                <td>R2 Object Storage</td>
                <td>Cold storage for PDFs, parsed Markdown representations, and LaTeX source archives.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
              <tr>
                <td>Agent SDK</td>
                <td>TypeScript &amp; Python</td>
                <td>Typed query builder and MCP tool wrapper for drop-in agent ingestion.</td>
                <td><span className="pill pill-roadmap">In build</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
