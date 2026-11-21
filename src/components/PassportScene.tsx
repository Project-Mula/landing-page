// PassportScene: for manufacturers and EU buyers. A QR code is scanned, then the passport opens:
// where the rubber came from, and a check that the records have not been changed.
// Plays every time it scrolls into view. Sample batch only.
import { at, usePlayOnView } from '../lib/motion';

// A QR-style pattern: 21 x 21 modules with the three corner squares. It is a picture, not a working code.
const N = 21;
const CELL = 8; // SVG units per module
const finder = (x: number, y: number) =>
  [
    [0, 0],
    [N - 7, 0],
    [0, N - 7],
  ].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
const finderDark = (x: number, y: number) => {
  for (const [fx, fy] of [
    [0, 0],
    [N - 7, 0],
    [0, N - 7],
  ]) {
    const dx = x - fx;
    const dy = y - fy;
    if (dx >= 0 && dx < 7 && dy >= 0 && dy < 7) {
      const ring = dx === 0 || dy === 0 || dx === 6 || dy === 6;
      const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
      return ring || core;
    }
  }
  return false;
};
// Fixed pseudo-random modules (same every time), so the code never changes between renders.
let seed = 7;
const rand = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
const MODULES: [number, number][] = [];
for (let y = 0; y < N; y++)
  for (let x = 0; x < N; x++) {
    if (finder(x, y) ? finderDark(x, y) : rand() > 0.52) MODULES.push([x, y]);
  }

const SIZE = N * CELL; // 168
const ROWS: [string, string][] = [
  ['From', 'Ratnapura and Kalutara, 2 farms'],
  ['Batch', 'MULA-B-2026-001'],
  ['Records', 'Unchanged since signing'],
];
const OPEN = 1.35; // when the passport opens, just after the scan

export default function PassportScene() {
  const { ref, play } = usePlayOnView<HTMLElement>();

  return (
    <figure ref={ref} data-play={play} className="scene rounded-hero bg-mist p-4 sm:p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {/* The QR code, with a scan line passing over it once */}
        <div className="shrink-0 rounded-card bg-card p-3">
          <svg viewBox={`-4 -4 ${SIZE + 8} ${SIZE + 8}`} width="148" height="148" aria-hidden="true">
            <g className="fill-ink">
              {MODULES.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x * CELL} y={y * CELL} width={CELL} height={CELL} />
              ))}
            </g>
            <rect
              x="-4"
              y="-2"
              width={SIZE + 8}
              height="4"
              rx="2"
              className="s-sweep fill-sage"
              style={{ ...at(0.2), ['--sweep' as string]: `${SIZE}px` }}
            />
          </svg>
        </div>

        {/* The passport the buyer sees after scanning */}
        <div className="s-rise w-full min-w-0 rounded-card bg-card p-5" style={at(OPEN)}>
          <p className="text-[13px] text-muted">QR passport</p>
          <p className="mt-1 font-serif text-[1.25rem] leading-tight">Natural rubber, sheets RSS</p>
          <dl className="mt-3 space-y-1.5 text-[14px]">
            {ROWS.map(([k, v], i) => (
              <div key={k} className="s-rise grid grid-cols-[4.5rem_minmax(0,1fr)] gap-2" style={at(OPEN + 0.2 + i * 0.15)}>
                <dt className="text-muted">{k}</dt>
                <dd className="tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <span
            className="s-pop mt-4 block border-t border-border/60 pt-3 text-[14px] font-medium text-success"
            style={at(OPEN + 0.8)}
          >
            {/* Plain words, no seal or badge icon: the public view must not look like a certification mark. */}
            Data unchanged since signing
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-[14px] text-muted">
        Sample passport. Scanning shows where the rubber came from and checks that nothing was changed.
      </figcaption>
    </figure>
  );
}
