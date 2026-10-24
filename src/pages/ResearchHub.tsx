import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { BookOpen, Terminal, Sparkles, ArrowRight, Zap } from "lucide-react";

export default function ResearchHub() {
  const features = [
    {
      title: "An index with a memory",
      desc: "New preprints and literature, ingested continuously and kept — not a search box over someone else's snapshot, but a corpus with provenance: where each paper came from, when it arrived, what it cites.",
    },
    {
      title: "API-first, agents native",
      desc: "Search, fetch and stream endpoints designed for agent consumption: stable ids, structured metadata, PDFs at predictable URLs. The human web view is the same API wearing a face.",
    },
    {
      title: "Free for anyone",
      desc: "The Hub is the commons layer of the lab. Keys are free at launch; the index is built from publicly available preprints under their original licenses.",
    },
  ];

  const archItems = [
    ["Ingestion spine", "Cloudflare Workers + Queues", "Pulls arXiv preprints nightly across cs.AI, cs.CL, cs.LG. Computes content hashes and extracts citation graphs."],
    ["Vector catalog", "Vectorize + Local Embeddings", "Dense and sparse vector indices enabling hybrid semantic and exact identifier retrieval."],
    ["Document store", "R2 Object Storage", "Cold storage for PDFs, parsed Markdown representations, and LaTeX source archives."],
    ["Agent SDK", "TypeScript & Python", "Typed query builder and MCP tool wrapper for drop-in agent ingestion."],
  ];

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 font-sans max-w-6xl mx-auto">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Research Hub</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          The state of AI, one API call away.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          An open hub indexing the newest preprints and literature across artificial intelligence — built API-first, so your agents can pull, search and stream the literature the way they pull any other tool.
        </p>
        <div className="mt-6 flex items-center gap-3 font-mono text-xs">
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[#f0a832]">
            IN BUILD
          </span>
          <span className="rounded-full border border-[#3ddc84]/30 bg-[#3ddc84]/10 px-3 py-1 text-[#3ddc84]">
            FREE FOR ANYONE, AT LAUNCH
          </span>
        </div>
      </motion.div>

      {/* What it will be */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          What it will be
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          {features.map((feat) => (
            <DoubleBezelCard key={feat.title}>
              <h3 className="text-sm font-bold text-white">{feat.title}</h3>
              <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
                {feat.desc}
              </p>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

      {/* How it's being built */}
      <section className="mt-20 pt-10 border-t border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How it's being built
          </h2>
          <span className="rounded-full bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-[#f0a832] w-fit">
            THE PLAN, LABELED AS PLAN
          </span>
        </div>
        <p className="mt-2 text-xs text-[#8b9595]">
          The Hub runs on the same edge stack as this site. Each piece below is the planned production shape; the build is underway.
        </p>

        <div className="mt-8 space-y-4 font-mono text-xs">
          {archItems.map(([component, stack, notes]) => (
            <DoubleBezelCard key={component}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <span className="font-bold text-white text-sm">{component}</span>
                <span className="text-[#4fe3ea] text-xs">{stack}</span>
              </div>
              <p className="mt-2 font-sans text-xs text-[#8b9595] leading-relaxed">
                {notes}
              </p>
            </DoubleBezelCard>
          ))}
        </div>
      </section>

    </div>
  );
}
