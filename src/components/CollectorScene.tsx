// CollectorScene: for rubber collectors. The collector is checked once (identity, source farms,
// land documents), becomes certified, and then connects to any exporter on MŪLA.
// Plays every time it scrolls into view. Sample collector, demo exporters.
import { at, usePlayOnView } from '../lib/motion';

const CHECKS = ['Identity', 'Source farms', 'Land documents'];
const EXPORTERS = ['Exporter A', 'Exporter B', 'Exporter C'];
const EXPORTER_Y = [50, 130, 210]; // centre line of each exporter pill

const START = 0.25;
const STEP = 0.3;
const CERTIFIED = START + CHECKS.length * STEP + 0.1;
const LINES = CERTIFIED + 0.4;

export default function CollectorScene() {
  const { ref, play } = usePlayOnView<HTMLElement>();

  return (
    <figure ref={ref} data-play={play} className="scene rounded-hero bg-bone p-4 sm:p-6">
      <svg
        viewBox="0 0 360 260"
        className="block h-auto w-full"
        role="img"
        aria-label="A sample collector, Kalutara Latex Traders, is checked once for identity, source farms and land documents, becomes certified, and then connects to three demo exporters."
      >
        <g aria-hidden="true">
          {/* Collector card */}
          <rect x="8" y="44" width="172" height="186" rx="16" className="fill-card" />
          <text x="30" y="76" className="fill-ink font-serif text-[18px]">
            Kalutara Latex
          </text>
          <text x="30" y="97" className="fill-ink font-serif text-[18px]">
            Traders
          </text>

          {/* The three one-time checks, ticking in turn */}
          {CHECKS.map((c, i) => {
            const y = 126 + i * 24;
            const t = START + i * STEP;
            return (
              <g key={c}>
                <g className="s-pop" style={at(t + 0.12)}>
                  <circle cx="37" cy={y} r="8" className="fill-success-bg" />
                  <path d={`M33.5 ${y} l2.5 2.5 l4.5 -5`} className="fill-none stroke-success" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="52" y={y + 5} className="s-rise fill-muted text-[15px]" style={at(t)}>
                  {c}
                </text>
              </g>
            );
          })}

          {/* Certified once all three pass */}
          <g className="s-pop" style={at(CERTIFIED)}>
            <rect x="28" y="194" width="104" height="26" rx="13" className="fill-success" />
            <text x="80" y="212" textAnchor="middle" className="fill-card text-[14px] font-medium">
              Certified
            </text>
          </g>

          {/* Connections to exporters: each line draws, then its exporter appears */}
          {EXPORTER_Y.map((y, i) => (
            <line
              key={`l${i}`}
              x1="180"
              y1="137"
              x2="232"
              y2={y}
              pathLength={1}
              className="s-draw stroke-sage-dark"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={at(LINES + i * 0.2)}
            />
          ))}
          {EXPORTERS.map((name, i) => (
            <g key={name} className="s-pop" style={at(LINES + i * 0.2 + 0.3)}>
              <rect x="232" y={EXPORTER_Y[i] - 21} width="122" height="42" rx="21" className="fill-card stroke-border" strokeWidth="1.5" />
              <text x="293" y={EXPORTER_Y[i] + 5} textAnchor="middle" className="fill-ink text-[15px] font-medium">
                {name}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <figcaption className="mt-3 text-[14px] text-muted">Sample collector and demo exporters</figcaption>
    </figure>
  );
}
