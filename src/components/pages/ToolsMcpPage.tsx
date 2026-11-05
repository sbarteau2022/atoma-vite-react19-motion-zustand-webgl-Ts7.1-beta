import { useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { hrefFor } from '../../siteNav'
import { useAtomaStore } from '../../store/useAtomaStore'
import { AtomaLogoMark } from '../brand/AtomaBrandAssets'
import { ArrowRight, Database, Search } from '../ui/Icons'

export const ToolsMcpPage: FC = () => {
  const { setActivePage, setCloudTab } = useAtomaStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All capabilities' | 'Tools' | 'MCP' | 'Skills' | 'Research'>(
    'All capabilities'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCap, setSelectedCap] = useState('N³ Traceability');

  const capabilities = [
    {
      category: 'Tools',
      title: 'Research-grade harness',
      desc: 'Mission execution, runbook parsing, and evidence receipts.',
      badge: 'Source available',
      dotColor: 'bg-emerald-400',
      env: 'Local Rust / TypeScript CLI',
      evidence: 'Harness specs & runbooks',
      adapters: 'STDIO & local socket',
      access: 'Source review',
    },
    {
      category: 'Research',
      title: 'N³ Traceability',
      desc: 'A SQLite foundation for decisions, execution, and acceptance.',
      badge: 'Local foundation',
      dotColor: 'bg-[#f59e0b]',
      env: 'Local SQLite',
      evidence: 'Schema and tests',
      adapters: 'Not connected',
      access: 'Source review',
    },
    {
      category: 'Skills',
      title: 'Capability Tree',
      desc: 'Skills organized by discipline and verification needs.',
      badge: 'Repository catalog',
      dotColor: 'bg-[#f59e0b]',
      env: 'Declarative SKILL.md manifest',
      evidence: 'Verification gate rules',
      adapters: 'Local filesystem',
      access: 'Repository catalog',
    },
    {
      category: 'MCP',
      title: 'MCP connections',
      desc: 'Interfaces for connecting tools with explicit permissions.',
      badge: 'Integration planned',
      dotColor: 'bg-amber-400',
      env: 'Model Context Protocol JSON-RPC',
      evidence: 'Permission boundary schema',
      adapters: 'Explicit allowlist',
      access: 'Contract preview',
    },
    {
      category: 'Tools',
      title: 'Runbook contracts',
      desc: 'Define the objective, constraints, and acceptance gates.',
      badge: 'Design & source',
      dotColor: 'bg-[#f59e0b]',
      env: 'YAML / TypeScript AST',
      evidence: 'Pre-registration schema',
      adapters: 'ARES Spec Ops Runner',
      access: 'Source review',
    },
    {
      category: 'Research',
      title: 'Memory experiments',
      desc: 'Explore context retention and knowledge reuse.',
      badge: 'Experimental',
      dotColor: 'bg-zinc-400',
      env: 'Local N³ knowledge packs',
      evidence: 'Retrieval benchmark runs',
      adapters: 'In development',
      access: 'Experimental branch',
    },
  ];

  const filtered = capabilities.filter((c) => {
    const matchesCat = filter === 'All capabilities' || c.category === filter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeCap = capabilities.find((c) => c.title === selectedCap) || capabilities[1];

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-16 space-y-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">
        <div className="space-y-5">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#71717a]">
            TOOLS &amp; MCP CATALOG
          </div>
          <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-[-0.035em] leading-[0.98] text-white">
            Capability,
            <br />
            with a clear contract.
          </h1>
          <p className="text-base text-[#71717a] max-w-lg leading-relaxed">
            Explore the tools, skills, and connections behind ARES. Understand what they do, where
            they run, and what is ready.
          </p>
        </div>

        <div className="titanium-card rounded-2xl p-8 flex items-center justify-between relative overflow-hidden">
          <div className="w-28 h-32 rounded-2xl bg-[#2e2e33] border border-white/20 flex items-center justify-center shadow-2xl">
            <div className="w-12 h-16 rounded-lg bg-[#f59e0b]/20 border-2 border-[#f59e0b] flex items-center justify-center shadow-none">
              <AtomaLogoMark className="w-7 h-7" />
            </div>
          </div>
          <div className="flex-1 space-y-3 pl-4">
            {[0, 1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="h-2.5 flex-1 rounded-full bg-[#2e2e33] from-[#f59e0b] via-[#c9cfd7]/40 to-white/10" />
                <span className="font-mono text-[10px] text-[#71717a]">MCP_0{idx + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="titanium-card rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#06080c] border border-white/10">
          <Search className="w-4 h-4 text-[#71717a]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Find a tool, skill, or connection"
            className="bg-transparent text-sm text-white focus:outline-none w-full"
          />
          <kbd className="px-2 py-0.5 rounded bg-white/8 text-[11px] font-mono text-[#71717a]">/</kbd>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['All capabilities', 'Tools', 'MCP', 'Skills', 'Research'] as const).map((chip) => (
              <button
                key={chip}
                onClick={() => setFilter(chip)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                  filter === chip
                    ? 'bg-[#f59e0b] text-white'
                    : 'bg-white/5 hover:bg-white/10 text-[#71717a] border border-white/10'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
          <span className="text-xs text-[#71717a]">
            A curated view of the engineering repository.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const isSelected = selectedCap === item.title;
          return (
            <button
              type="button"
              key={item.title}
              onClick={() => setSelectedCap(item.title)}
              aria-pressed={isSelected}
              className={`titanium-card rounded-2xl p-6 flex flex-col justify-between text-left cursor-pointer transition ${
                isSelected ? 'ring-2 ring-[#f59e0b]' : ''
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#c9cfd7]">
                    <Database className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#71717a]">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-display font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-[#71717a] leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/8 space-y-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#e2e8f0]">
                  <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                  {item.badge}
                </span>
                <div className="flex items-center justify-between text-xs font-medium text-[#f59e0b]">
                  <span>Inspect the details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="titanium-card rounded-2xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#71717a]">
            CAPABILITY DETAIL
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Know the boundary before you connect.
          </h2>
          <div className="pt-2 space-y-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white">{activeCap.title}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b] text-xs">
                {activeCap.badge}
              </span>
            </div>
            <div className="divide-y divide-white/8 text-xs pt-2">
              {[
                ['Environment:', activeCap.env],
                ['Evidence:', activeCap.evidence],
                ['Live adapters:', activeCap.adapters],
                ['Access:', activeCap.access],
              ].map(([k, v]) => (
                <div key={k} className="py-2.5 flex justify-between">
                  <span className="text-[#71717a]">{k}</span>
                  <span className="font-mono text-white font-medium">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setCloudTab('tools');
                  setActivePage('cloud-app');
                  navigate(hrefFor('tools'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs font-semibold cursor-pointer"
              >
                Open in Cloud Tools
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('sign-up');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-lg bg-white/8 hover:bg-white/12 border border-white/15 text-xs text-white cursor-pointer"
              >
                Get access
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-[#26262b] border border-white/10 p-6 space-y-4">
          <div>
            <div className="text-sm font-semibold text-white">Schema overview</div>
            <div className="text-xs text-[#71717a]">Core tables and their relationships.</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: 'Decision', fields: ['intent', 'rationale', 'options', 'selected'] },
              { name: 'Execution', fields: ['run_id', 'tool', 'input', 'result'] },
              { name: 'Acceptance', fields: ['criteria', 'evaluation', 'status', 'notes'] },
              { name: 'Receipt', fields: ['artifacts', 'evidence', 'hash', 'references'] },
            ].map((tbl) => (
              <div
                key={tbl.name}
                className="p-3.5 rounded-lg bg-[#0c111b] border border-[#f59e0b]/30 space-y-1.5"
              >
                <div className="text-xs font-semibold text-white flex items-center justify-between">
                  <span>{tbl.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                </div>
                <div className="font-mono text-[11px] text-[#71717a] space-y-0.5">
                  {tbl.fields.map((f) => (
                    <div key={f}>{f}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
