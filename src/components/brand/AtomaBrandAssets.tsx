import React from 'react';

/**
 * Geometric ONODE Mark (exact match to Screenshot 2026-11-03 at 11.05.42 AM.png:
 * clean 3/4 circle with bottom-right quadrant cutout)
 */
export const OnodeGeometricMark: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-7 h-7',
  color = '#f8fafc',
}) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44V24H44C44 12.9543 35.0457 4 24 4Z"
      fill={color}
    />
  </svg>
);

export const OnodeWordmarkLockup: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
    <OnodeGeometricMark className="w-8 h-8" color="#f8fafc" />
    <span className="font-display font-bold text-lg tracking-[0.26em] text-[#f8fafc] uppercase">
      ONODE
    </span>
  </div>
);

/** Orbital atom. Amber rings, cream electrons. No silver, no white plate. */
export const AtomaLogoMark: React.FC<{
  className?: string;
  glow?: boolean;
  tone?: 'amber' | 'cyan';
}> = ({ className = 'w-7 h-7', glow = true }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-18 32 32)" stroke="#c67c14" strokeWidth="2.3" />
    <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(52 32 32)" stroke="#e8a84a" strokeWidth="2.3" />
    <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(-68 32 32)" stroke="#c67c14" strokeWidth="2.3" />
    <circle cx="32" cy="32" r="5.2" fill={glow ? '#c67c14' : '#f0e7da'} />
    <circle cx="54.8" cy="24.6" r="2.35" fill="#f0e7da" />
    <circle cx="46.8" cy="50.9" r="2.35" fill="#f0e7da" />
    <circle cx="41" cy="9.7" r="2.35" fill="#f0e7da" />
    <circle cx="9.2" cy="39.4" r="2.35" fill="#f0e7da" />
  </svg>
);

export const AtomaAgentBadge: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full bg-[#2e2e33] border border-[#c67c14]/40 ${className}`}
  >
    <AtomaLogoMark className="w-3.5 h-3.5" glow={false} tone="amber" />
  </span>
);

export const AtomaBrandLockup: React.FC<{
  onClick?: () => void;
  subtitle?: string;
}> = ({ onClick, subtitle = 'ARES — SPECIAL OPERATIONS' }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
  >
    <AtomaLogoMark className="w-8 h-8" tone="amber" />
    <div className="flex flex-col leading-none">
      <span className="font-display font-bold text-sm tracking-[0.22em] amber-elevated-subtle">
        ATOMA LABS
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-[#94a3b8] mt-1">
        {subtitle}
      </span>
    </div>
  </button>
);

export const BranchingWorkflowConceptSVG: React.FC<{
  activeStep: string;
  onSelectStep: (step: 'scope' | 'plan' | 'execute' | 'test' | 'review' | 'receipt') => void;
}> = ({ activeStep, onSelectStep }) => {
  const steps = [
    {
      id: 'scope' as const,
      title: 'Objective',
      desc: 'Define goals,\ncontext and\nsuccess criteria.',
      x: 40,
      y: 28,
    },
    {
      id: 'plan' as const,
      title: 'Plan',
      desc: 'Break it down\ninto a testable\nrunbook.',
      x: 138,
      y: 102,
    },
    {
      id: 'execute' as const,
      title: 'Build',
      desc: 'Execute with\nthe right tools\nand context.',
      x: 236,
      y: 176,
    },
    {
      id: 'review' as const,
      title: 'Review',
      desc: 'Assess results\nwith human\njudgment.',
      x: 334,
      y: 250,
    },
    {
      id: 'receipt' as const,
      title: 'Receipt',
      desc: 'Keep evidence\nconnected\nto the work.',
      x: 432,
      y: 314,
    },
  ];

  return (
    <div className="relative w-full rounded-xl bg-[#06090f] border border-white/[0.08] p-6 overflow-hidden linear-grid-bg">
      <div className="flex items-center justify-between text-[11px] font-mono text-[#64748b] mb-2">
        <span className="uppercase tracking-widest text-[#cbd5e1]">
          ARES · EXECUTION TOPOLOGY
        </span>
        <span>Deterministic Runbook Loop</span>
      </div>

      <svg viewBox="0 0 580 400" className="w-full h-auto overflow-visible select-none">
        <defs>
          <linearGradient id="ares-flow-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e5a93c" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <circle
          cx="390"
          cy="190"
          r="155"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="3 3"
        />
        <circle cx="390" cy="190" r="105" fill="none" stroke="rgba(255,255,255,0.08)" />

        <path
          d="M 68 56 L 68 128 Q 68 140 80 140 L 138 140 M 166 156 L 166 202 Q 166 214 178 214 L 236 214 M 264 230 L 264 276 Q 264 288 276 288 L 334 288 M 362 304 L 362 340 Q 362 352 374 352 L 432 352"
          fill="none"
          stroke="url(#ares-flow-line)"
          strokeWidth="1.8"
        />

        {steps.map((s, idx) => {
          const isSelected = activeStep === s.id;
          return (
            <g key={s.id} onClick={() => onSelectStep(s.id)} className="cursor-pointer">
              <rect
                x={s.x}
                y={s.y}
                width="56"
                height="56"
                rx="12"
                fill="#0b101a"
                stroke={isSelected ? '#e5a93c' : 'rgba(203,213,225,0.22)'}
                strokeWidth={isSelected ? '1.8' : '1'}
              />
              {idx === 0 && (
                <circle cx={s.x + 28} cy={s.y + 28} r="10" fill="#cbd5e1" fillOpacity="0.85" />
              )}
              {idx === 1 && (
                <path
                  d={`M ${s.x + 18} ${s.y + 24} L ${s.x + 28} ${s.y + 18} L ${s.x + 38} ${
                    s.y + 24
                  } L ${s.x + 28} ${s.y + 30} Z M ${s.x + 18} ${s.y + 31} L ${s.x + 28} ${
                    s.y + 37
                  } L ${s.x + 38} ${s.y + 31}`}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                  fill="none"
                />
              )}
              {idx === 2 && (
                <rect
                  x={s.x + 19}
                  y={s.y + 19}
                  width="18"
                  height="18"
                  rx="3"
                  stroke="#e5a93c"
                  strokeWidth="1.6"
                  fill="rgba(229,169,60,0.12)"
                />
              )}
              {idx === 3 && (
                <circle
                  cx={s.x + 26}
                  cy={s.y + 26}
                  r="8"
                  stroke="#cbd5e1"
                  strokeWidth="1.6"
                  fill="none"
                />
              )}
              {idx === 4 && (
                <rect
                  x={s.x + 20}
                  y={s.y + 17}
                  width="16"
                  height="22"
                  rx="2"
                  stroke="#f59e0b"
                  strokeWidth="1.6"
                  fill="rgba(245,158,11,0.12)"
                />
              )}

              <text
                x={s.x + 70}
                y={s.y + 16}
                fill="#f1f5f9"
                fontSize="13"
                fontWeight="600"
                fontFamily="Space Grotesk, sans-serif"
              >
                {s.title}
              </text>
              {s.desc.split('\n').map((line, lIdx) => (
                <text
                  key={lIdx}
                  x={s.x + 70}
                  y={s.y + 33 + lIdx * 14}
                  fill="#94a3b8"
                  fontSize="11"
                  fontFamily="JetBrains Mono, monospace"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
