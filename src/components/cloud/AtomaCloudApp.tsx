import React, { Suspense, lazy } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGovernor } from '../../governor';
import {
  useAtomaStore,
  CLOUD_MODELS,
  type CloudWorkspaceTab,
} from '../../store/useAtomaStore';
import { TelemetryRow } from '../ui/TelemetryRow';
import { AtomaLogoMark } from '../brand/AtomaBrandAssets';
import { Search } from '../ui/Icons';
import { hrefFor, labRail, labTitle } from '../../siteNav';
import { CloudCodeIdeView } from './CloudCodeIde';

// Swarm, mind, research, and tools load when the rail opens them.
const CloudSwarmView = lazy(() =>
  import('./CloudSwarmAndMindView').then((m) => ({ default: m.CloudSwarmView })),
);
const CloudMindGraphView = lazy(() =>
  import('./CloudSwarmAndMindView').then((m) => ({ default: m.CloudMindGraphView })),
);
const CloudResearchHubView = lazy(() =>
  import('./CloudResearchHubView').then((m) => ({ default: m.CloudResearchHubView })),
);
const ToolsMcpPage = lazy(() =>
  import('../pages/AtomaPages').then((m) => ({ default: m.ToolsMcpPage })),
);

function CloudTabFallback() {
  return (
    <div
      className="flex-1 flex flex-col items-center justify-center gap-3 bg-[#26262b] min-h-[420px]"
      aria-busy="true"
      aria-label="Loading workspace tab"
    >
      <div className="h-2.5 w-48 rounded-full bg-white/10 animate-pulse" />
      <div className="h-2.5 w-32 rounded-full bg-white/8 animate-pulse" />
      <div className="font-mono text-[10px] tracking-[0.2em] text-[#71717a] uppercase">
        Loading workspace…
      </div>
    </div>
  );
}


/**
 * Cloud Settings & Model Endpoints View (BEAM, oMLX Nemotron, Muse API, Atoma Cloud N³)
 */
const CloudSettingsView: React.FC = () => {
  const { selectedCloudModel, setSelectedCloudModel, signOut, userName } = useAtomaStore();
  const { link, status, error, refresh } = useGovernor();

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 text-[#ffffff]">
      <div>
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-[#f59e0b]">
          CLOUD &amp; LOCAL MODEL ENDPOINTS · SEATBELT SANDBOX
        </div>
        <h2 className="font-display text-3xl font-bold text-white mt-1">Settings</h2>
        <p className="text-sm text-[#71717a] mt-1">
          muse-spark-open-1026 answers through Baseten. The key stays on Cloudflare.
          The other lanes are a catalog. oMLX and SGLang stay dead. The governor
          is 127.0.0.1:4810.
        </p>
      </div>

      <div className="titanium-card rounded-2xl overflow-hidden">
        <TelemetryRow label="Governor" value={link} />
        <TelemetryRow
          label="Backend"
          value={status?.backend.up ? `up :${status.backend.port}` : error ?? 'down'}
        />
        <TelemetryRow
          label="Merkle"
          value={status?.governance.merkle_head?.slice(0, 18) ?? '—'}
        />
        <TelemetryRow
          label="Seat"
          value={userName || 'unauthenticated'}
        />
        <div className="flex flex-wrap gap-2 p-4">
          <button
            type="button"
            onClick={refresh}
            className="px-3 py-1.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-[#26262b] text-xs font-semibold cursor-pointer"
          >
            Refresh governor
          </button>
          <button
            type="button"
            onClick={signOut}
            className="px-3 py-1.5 rounded-lg bg-white/8 hover:bg-white/12 border border-white/15 text-xs text-white cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CLOUD_MODELS.map((m) => {
          const active = selectedCloudModel === m.id;
          return (
            <button
              type="button"
              key={m.id}
              onClick={() => setSelectedCloudModel(m.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition space-y-2 text-left ${
                active
                  ? 'bg-[#34343a] border-[#f59e0b] shadow-none'
                  : 'bg-[#090d16] border-white/10 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-white">{m.name}</span>
                <span
                  className={`px-2 py-0.5 rounded-full font-mono text-[10px] ${
                    m.status === 'online'
                      ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                      : m.status === 'standby'
                        ? 'bg-white/8 text-[#ffffff]'
                        : 'bg-[#c45c4a]/20 text-[#f0e7da]'
                  }`}
                >
                  ● {m.status}
                </span>
              </div>
              <div className="text-xs text-[#ffffff]">{m.provider}</div>
              <div className="text-[11px] font-mono text-[#71717a]">{m.protocol}</div>
              <div className="pt-2 border-t border-white/8 flex items-center justify-between font-mono text-[11px] text-[#f59e0b]">
                <span>{m.latency}</span>
                <span>{m.rate}</span>
                <span>{m.kvMode}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Full Authenticated Cloud Workspace Shell ("Behind the Login Wall")
 */
function CloudStatusFooter({ modelName, kvMode }: { modelName: string; kvMode: string }) {
  const { link, status } = useGovernor();
  const live = link === 'live';
  return (
    <footer className="h-7 px-4 bg-[#26262b] border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-[#71717a] select-none">
      <div className="flex items-center gap-4 min-w-0">
        <span className={live ? 'text-[#f59e0b]' : 'text-[#c45c4a]'}>
          ● {live ? 'Governor live :4810' : link === 'loading' ? 'Governor loading' : 'Governor down · demo UI'}
        </span>
        <span className="truncate">Lane: {modelName}</span>
        <span className="hidden sm:inline">KV: {kvMode}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[#ffffff] hidden md:inline">Workspace · local seat</span>
        <span>
          {status?.governance.ok ? 'Gate chain verified' : 'No live SQLite claim'}
        </span>
      </div>
    </footer>
  );
}

export const AtomaCloudApp: React.FC = () => {
  const {
    cloudTab,
    setCloudTab,
    selectedCloudModel,
    setSelectedCloudModel,
    setActivePage,
    setCommandPaletteOpen,
    userHandle,
  } = useAtomaStore();

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const pageName = labTitle(params.get('tab') ?? cloudTab, params.get('as'));
  const activeModelObj =
    CLOUD_MODELS.find((m) => m.id === selectedCloudModel) || CLOUD_MODELS[0];

  function openSurface(tab: CloudWorkspaceTab, as?: 'n3' | 'obsidian') {
    setCloudTab(tab);
    navigate(hrefFor(tab, as));
  }

  return (
    <div className="h-dvh overflow-hidden bg-[#26262b] text-[#f0e7da] flex flex-col">
      {/* Top Authenticated Cloud Workspace Bar (matches 08, 09, 10, 11 headers) */}
      <header className="h-9 px-3 bg-[#2e2e33] border-b border-white/10 flex items-center justify-between gap-2 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => setActivePage('platform')}
            className="flex items-center gap-1.5 text-left group cursor-pointer"
            title="Atoma Labs home"
          >
            <AtomaLogoMark className="w-5 h-5" />
            <span className="font-display font-bold text-[11px] tracking-[0.14em] text-[#f0e7da]">
              ATOMA / ARES
            </span>
          </button>
          <span className="text-white/20">|</span>
          <h1 className="text-xs font-semibold text-[#f0e7da] truncate">{pageName}</h1>
        </div>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden md:flex items-center justify-between h-7 w-64 px-2 rounded-md bg-[#26262b] border border-white/10 text-[11px] text-[#71717a] hover:border-[#c67c14]/50 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span>Search or jump to...</span>
          </span>
          <kbd className="px-1.5 py-0.2 rounded bg-white/8 font-mono text-[10px]">⌘ K</kbd>
        </button>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1.5 h-7 px-2 rounded-md bg-[#26262b] border border-[#c67c14]/40 text-xs">
            <select
              value={selectedCloudModel}
              onChange={(e) => setSelectedCloudModel(e.target.value)}
              className="bg-transparent font-mono text-[10px] text-[#f0e7da] focus:outline-none cursor-pointer max-w-[220px]"
            >
              {CLOUD_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#0b101b] text-white">
                  Cloud · {m.name} ({m.rate})
                </option>
              ))}
            </select>
          </div>

          <div
            title={`Signed in as Stewart Barteau (${activeModelObj.name})`}
            className="w-7 h-7 rounded-full bg-[#34343a] border border-[#f59e0b]/50 flex items-center justify-center font-mono text-[11px] font-bold text-white"
          >
            {userHandle}
          </div>
        </div>
      </header>

      {/* Main Workspace Body: Far-Left Vertical Icon Rail + Active Screen */}
      <div className="flex flex-1 min-h-0">
        {/* Far-Left Vertical Icon Rail (Code, Swarm, Mind, Research, Tools, Settings) */}
        <nav className="w-12 bg-[#2e2e33] border-r border-white/10 flex flex-col items-center py-1.5 gap-0.5 select-none shrink-0" aria-label="Lab pages">
          {labRail.map((item) => {
            const active =
              item.tab === 'mind'
                ? cloudTab === 'mind' && (params.get('as') === 'obsidian') === (item.as === 'obsidian')
                : cloudTab === item.tab;
            return (
              <button
                key={item.id}
                type="button"
                title={item.label}
                onClick={() => openSurface(item.tab, item.as)}
                className={`w-10 py-1 rounded-md flex flex-col items-center justify-center cursor-pointer ${
                  active
                    ? 'bg-[#34343a] text-[#c67c14]'
                    : 'text-[#71717a] hover:text-[#f0e7da] hover:bg-white/5'
                }`}
              >
                <span className="text-[9px] font-medium leading-tight text-center">{item.rail}</span>
              </button>
            );
          })}
        </nav>

        {/* Active Cloud Workspace Screen */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {cloudTab === 'code' && <CloudCodeIdeView />}
          {cloudTab !== 'code' && (
            <Suspense fallback={<CloudTabFallback />}>
              {cloudTab === 'swarm' && <CloudSwarmView />}
              {cloudTab === 'mind' && <CloudMindGraphView />}
              {cloudTab === 'research' && <CloudResearchHubView />}
              {cloudTab === 'tools' && (
                <div className="flex-1 overflow-y-auto bg-black">
                  <div className="border-b border-white/10 bg-[#2e2e33] px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#71717a]">
                      Tools
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActivePage('tools-mcp')}
                        className="px-3 py-1.5 rounded-lg bg-white/6 hover:bg-white/12 border border-white/12 text-xs text-white transition cursor-pointer"
                      >
                        Open public catalog
                      </button>
                      <button
                        onClick={() => openSurface('code')}
                        className="px-3 py-1.5 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-white text-xs font-semibold transition cursor-pointer"
                      >
                        Back to Code
                      </button>
                    </div>
                  </div>
                  <ToolsMcpPage />
                </div>
              )}
            </Suspense>
          )}
          {cloudTab === 'settings' && (
            <div className="flex-1 overflow-y-auto bg-[#26262b]">
              <CloudSettingsView />
            </div>
          )}
        </div>
      </div>

      {/* Bottom Cloud Status Footer */}
      <CloudStatusFooter modelName={activeModelObj.name} kvMode={activeModelObj.kvMode} />
    </div>
  );
};
