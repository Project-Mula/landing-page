// MixingScene: why one unverified farm stops a whole shipment.
// Four verified farms feed a lot and it reads as compliant. Then one more input arrives with no plot
// location, and the whole lot is blocked. Plays every time it scrolls into view. Sample data only.
import { at, usePlayOnView } from '../lib/motion';

const LOT = { x: 290, y: 92, w: 116, h: 96 }; // the lot box (SVG units, 420 x 280)
const IN = { x: LOT.x, y: LOT.y + LOT.h / 2 }; // where the lines enter the lot
const FARMS = [
  // Unlabelled on purpose: the demo data has only two verified low-risk farms, so these are generic.
  { y: 46, label: 'farm-1' },
  { y: 102, label: 'farm-2' },
  { y: 158, label: 'farm-3' },
  { y: 214, label: 'farm-4' },
];
const BAD = { y: 262 }; // the input with no plot location

const FED = 0.75; // verified lines start drawing
const MIXED = FED + FARMS.length * 0.14 + 0.9; // the unverified input arrives
const BLOCKED = MIXED + 0.45; // the lot turns blocked

// A curve from a farm on the left into the lot's left edge.
const curve = (y: number) => `M70 ${y} C 170 ${y}, 200 ${IN.y}, ${IN.x} ${IN.y}`;

export default function MixingScene() {
  const { ref, play } = usePlayOnView<HTMLElement>();

  return (
    <figure ref={ref} data-play={play} className="scene rounded-hero bg-bg p-4 sm:p-6">
      <svg
        viewBox="0 0 420 290"
        className="block h-auto w-full"
        role="img"
        aria-label="Four verified farms feed a lot and it is compliant. One more input arrives with no plot location, and the whole lot is blocked."
      >
        <g aria-hidden="true">
          {/* Lines from the verified farms into the lot */}
          {FARMS.map((f, i) => (
            <path
              key={`l${f.label}`}
              d={curve(f.y)}
              pathLength={1}
              className="s-draw fill-none stroke-sage-dark"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={at(FED + i * 0.14)}
            />
          ))}
          {/* The unverified input: dashed and red, it arrives last */}
          <path
            d={curve(BAD.y)}
            pathLength={1}
            className="s-draw fill-none stroke-danger"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={at(MIXED)}
          />

          {/* Verified farms */}
          {FARMS.map((f, i) => (
            <g key={f.label} className="s-pop" style={at(0.15 + i * 0.1)}>
              <circle cx="56" cy={f.y} r="13" className="fill-success-bg stroke-sage-dark" strokeWidth="2" />
              <path d={`M50.5 ${f.y} l3.5 3.5 l6 -7`} className="fill-none stroke-success" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          ))}
          {/* The unverified farm */}
          <g className="s-pop" style={at(MIXED - 0.25)}>
            <circle cx="56" cy={BAD.y} r="13" className="fill-danger-bg stroke-danger" strokeWidth="2" strokeDasharray="4 3" />
            <text x="56" y={BAD.y + 5} textAnchor="middle" className="fill-danger text-[15px] font-semibold">
              ?
            </text>
          </g>

          {/* The lot: compliant while only verified farms feed it */}
          <rect x={LOT.x} y={LOT.y} width={LOT.w} height={LOT.h} rx="16" className="s-fade fill-mist stroke-sage-dark" strokeWidth="2" style={at(0.4)} />
          <text x={LOT.x + LOT.w / 2} y={LOT.y + 34} textAnchor="middle" className="s-fade fill-ink font-serif text-[18px]" style={at(0.4)}>
            One lot
          </text>
          <text x={LOT.x + LOT.w / 2} y={LOT.y + 66} textAnchor="middle" className="s-flash fill-success text-[14px] font-medium" style={at(FED + 0.7)}>
            Compliant
          </text>

          {/* ...until the unverified input arrives: the whole lot is blocked */}
          <g className="s-pop" style={at(BLOCKED)}>
            <rect x={LOT.x} y={LOT.y} width={LOT.w} height={LOT.h} rx="16" className="fill-danger-bg stroke-danger" strokeWidth="2.5" />
            <text x={LOT.x + LOT.w / 2} y={LOT.y + 34} textAnchor="middle" className="fill-ink font-serif text-[18px]">
              One lot
            </text>
            <text x={LOT.x + LOT.w / 2} y={LOT.y + 66} textAnchor="middle" className="fill-danger text-[14px] font-semibold">
              Blocked
            </text>
          </g>
        </g>
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[14px] text-muted">
        <span>Sample lot</span>
        <span className="s-rise font-medium text-danger" style={at(BLOCKED + 0.25)}>
          1 input has no plot location
        </span>
      </figcaption>
    </figure>
  );
}
