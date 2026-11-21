// GpsPlot: shows what a field agent does on the estate. Six GPS points are dropped one by one
// while walking the boundary, the lines join them, the plot closes and fills, and the app shows
// the area and the 2020 forest map check. It plays every time it scrolls into view.
// Sample data only: plot KAL-003.
import { CircleCheck } from 'lucide-react';
import { at as delay, usePlayOnView } from '../lib/motion';

// The boundary points, in the order the agent walks them (SVG units, 400 x 300 map).
const POINTS: [number, number][] = [
  [104, 96],
  [222, 70],
  [296, 118],
  [282, 214],
  [168, 238],
  [92, 172],
];

const STEP = 0.38; // seconds between GPS points
const START = 0.25; // first point drops after this many seconds
const CLOSED = START + POINTS.length * STEP; // when the last line closes the plot

export default function GpsPlot() {
  const { ref, play } = usePlayOnView<HTMLElement>();

  const polygon = POINTS.map((p) => p.join(',')).join(' ');

  return (
    <figure ref={ref} data-play={play} className="scene rounded-hero bg-surface p-4 sm:p-6">
      <svg
        viewBox="0 0 400 300"
        className="block h-auto w-full"
        role="img"
        aria-label="Sample plot KAL-003: a farm boundary traced from 6 GPS points, 1.1 hectares, with no overlap with the 2020 forest map."
      >
        <defs>
          <pattern id="forest-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="10" className="stroke-sage" strokeWidth="3" strokeOpacity="0.45" />
          </pattern>
        </defs>

        <g aria-hidden="true">
          {/* Map base: the tile colour shows through; faint contour lines suggest hilly estate land. */}
          <g className="fill-none stroke-border" strokeWidth="1.2" strokeOpacity="0.55">
            <path d="M-10 58 C 70 30, 150 52, 230 30 S 370 20, 410 40" />
            <path d="M-10 262 C 60 238, 130 268, 210 252 S 350 230, 410 262" />
            <path d="M-10 288 C 90 270, 170 294, 250 280 S 360 270, 410 286" />
            <path d="M24 -10 C 40 70, 20 150, 40 230 S 30 300, 44 310" />
          </g>
          {/* A track down the side of the estate. */}
          <path d="M360 310 C 340 230, 362 170, 336 110 S 330 30, 350 -10" className="fill-none stroke-card" strokeWidth="7" strokeLinecap="round" />

          {/* Land that was forest in 2020, from the EU forest map. The plot must stay clear of it. */}
          <path d="M318 -2 L402 -2 L402 150 C 380 130, 352 120, 338 92 C 326 66, 322 30, 318 -2 Z" fill="url(#forest-hatch)" className="stroke-sage" strokeOpacity="0.6" strokeWidth="1.5" />
          <text x="388" y="20" textAnchor="end" className="fill-forest text-[14px] font-medium">
            2020 forest
          </text>

          {/* The plot fill: appears once the boundary closes. */}
          <polygon points={polygon} className="s-fade fill-sage" fillOpacity="0.28" style={delay(CLOSED + 0.05)} />

          {/* Boundary lines: each one draws from one GPS point to the next; the last closes the plot. */}
          {POINTS.map((p, i) => {
            const q = POINTS[(i + 1) % POINTS.length];
            return (
              <line
                key={`l${i}`}
                x1={p[0]}
                y1={p[1]}
                x2={q[0]}
                y2={q[1]}
                pathLength={1}
                className="s-draw stroke-sage-dark"
                strokeWidth="3"
                strokeLinecap="round"
                style={delay(START + i * STEP + 0.12)}
              />
            );
          })}

          {/* GPS points: each drops in as the agent reaches that corner. */}
          {POINTS.map((p, i) => (
            <circle
              key={`p${i}`}
              cx={p[0]}
              cy={p[1]}
              r="7"
              className="s-drop fill-card stroke-forest"
              strokeWidth="3"
              style={delay(START + i * STEP)}
            />
          ))}

          {/* Area label in the middle of the finished plot. */}
          <text x="194" y="160" textAnchor="middle" className="s-rise fill-forest font-serif text-[22px]" style={delay(CLOSED + 0.25)}>
            1.1 ha
          </text>
        </g>
      </svg>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[14px] text-muted">Sample plot KAL-003, traced from 6 GPS points</span>
        <span
          className="s-rise inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-success-bg px-2.5 py-1 text-[14px] font-medium text-success"
          style={delay(CLOSED + 0.45)}
        >
          <CircleCheck size={16} strokeWidth={2} aria-hidden="true" />
          No 2020 forest overlap
        </span>
      </figcaption>
    </figure>
  );
}
