import { useState } from "react";
import { motion } from "motion/react";
import { DoubleBezelCard } from "../components/DoubleBezelCard.tsx";
import { CheckCircle2, Send, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", topic: "Product", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="relative min-h-screen px-4 pt-28 pb-20 font-sans max-w-6xl mx-auto">
      
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-[#4fe3ea]">Contact</span>
        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
          Talk to a human who builds.
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8b9595]">
          Atoma Labs is an independent studio in Missouri. Questions about the products, the Research Hub, partnerships, or the work itself — this reaches the builder, not a ticket queue.
        </p>
      </motion.div>

      {/* Main Grid: Form + Info Cards */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form Card */}
        <div className="lg:col-span-7">
          <DoubleBezelCard>
            {submitted ? (
              <div className="py-12 text-center font-mono">
                <CheckCircle2 className="mx-auto h-12 w-12 text-[#3ddc84]" />
                <h3 className="mt-4 text-lg font-bold text-white">Message dispatched</h3>
                <p className="mt-2 text-xs text-[#8b9595] max-w-sm mx-auto">
                  Received on the local buffer. We read everything — replies follow when there is something real to say.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", topic: "Product", message: "" });
                  }}
                  className="mt-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#4fe3ea] hover:bg-white/10"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#8b9595] text-[11px] mb-1.5">Your name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-white placeholder-[#5b6464] focus:border-[#4fe3ea] focus:outline-none"
                    placeholder="Stewart Barteau"
                  />
                </div>

                <div>
                  <label className="block text-[#8b9595] text-[11px] mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-white placeholder-[#5b6464] focus:border-[#4fe3ea] focus:outline-none"
                    placeholder="builder@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-[#8b9595] text-[11px] mb-1.5">Topic</label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-white focus:border-[#4fe3ea] focus:outline-none"
                  >
                    <option value="Product">Product</option>
                    <option value="Research Hub">Research Hub</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Press">Press</option>
                    <option value="Something else">Something else</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8b9595] text-[11px] mb-1.5">Message</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-black/60 px-3.5 py-2.5 text-white placeholder-[#5b6464] focus:border-[#4fe3ea] focus:outline-none leading-relaxed"
                    placeholder="Detail the work, the benchmark, or the integration inquiry..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#4fe3ea]/40 bg-[#4fe3ea]/20 py-3 font-mono text-xs font-semibold text-[#4fe3ea] transition-all hover:bg-[#4fe3ea]/30 active:scale-[0.99]"
                  >
                    {submitting ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#4fe3ea] border-t-transparent" />
                    ) : (
                      <>
                        <span>Send</span>
                        <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </DoubleBezelCard>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* GitHub Card */}
          <DoubleBezelCard>
            <div className="flex items-start gap-3">
              <div className="rounded-lg border border-white/10 bg-white/5 p-2">
                <svg className="h-5 w-5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white">GitHub</h3>
                <p className="mt-1 text-xs text-[#8b9595] leading-relaxed">
                  The work in the open:{" "}
                  <a
                    href="https://github.com/sbarteau2022"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#4fe3ea] hover:underline font-mono inline-flex items-center gap-0.5"
                  >
                    github.com/sbarteau2022 <ArrowUpRight className="h-3 w-3" />
                  </a>
                  {" "}— issues and discussion welcome there too.
                </p>
              </div>
            </div>
          </DoubleBezelCard>

          {/* What to expect Card */}
          <DoubleBezelCard>
            <h3 className="font-mono text-sm font-bold text-white">What to expect</h3>
            <p className="mt-2 text-xs text-[#8b9595] leading-relaxed">
              We read everything. Replies when there's something real to say — no autoresponder theater, no newsletter you didn't ask for. Product questions get product answers; the{" "}
              <a href="/#changelog" className="text-[#4fe3ea] hover:underline">
                changelog
              </a>{" "}
              covers the rest on its weekly cadence.
            </p>
          </DoubleBezelCard>
        </div>

      </div>

    </div>
  );
}
