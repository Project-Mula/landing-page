// GateScene: for exporters and processors. A batch goes through the compliance gate:
// each of the five checks passes in turn, then the gate opens and the QR passport is ready.
// Plays every time it scrolls into view. Sample data only: batch MULA-B-2026-001.
import { CircleCheck, QrCode } from 'lucide-react';
import { at, usePlayOnView } from '../lib/motion';

const CHECKS = [
  // The gate's five checks, as in the final scope: EUDR, legality, pest-free, claims, fraud flags.
  'EUDR: every plot located, no forest after 2020',
  'Legality: land documents verified',
  'Pest-free flag on every farm',
  'Claims: plain origin wording only',
  'No open fraud flags',
];

const START = 0.2;
const STEP = 0.36; // seconds between checks
const DONE = START + CHECKS.length * STEP + 0.2; // when the gate opens

export default function GateScene() {
  const { ref, play } = usePlayOnView<HTMLElement>();

  return (
    <figure ref={ref} data-play={play} className="scene rounded-hero bg-mist p-4 sm:p-6">
      <div className="rounded-card bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="font-serif text-[1.375rem] leading-tight">Compliance gate</p>
          <p className="text-[14px] tabular-nums text-muted">Batch MULA-B-2026-001</p>
        </div>

        <ul className="mt-4 divide-y divide-border/60 border-y border-border/60">
          {CHECKS.map((c, i) => (
            <li key={c} className="flex items-center justify-between gap-3 py-2.5 text-[15px]">
              <span className="s-rise" style={at(START + i * STEP)}>
                {c}
              </span>
              {/* The tick lands a moment after its row appears, as if the check just ran. */}
              <span
                className="s-pop inline-flex shrink-0 items-center gap-1 text-[14px] font-medium text-success"
                style={at(START + i * STEP + 0.22)}
              >
                <CircleCheck size={16} strokeWidth={2} aria-hidden="true" />
                Passed
              </span>
            </li>
          ))}
        </ul>

        <div
          className="s-rise mt-4 flex items-center gap-3 rounded-card bg-forest px-4 py-3 text-on-dark"
          style={at(DONE)}
        >
          <QrCode size={28} strokeWidth={1.5} aria-hidden="true" className="s-pop shrink-0 text-lime" style={at(DONE + 0.18)} />
          <p className="text-[15px] font-medium">Gate passed. The QR passport is ready.</p>
        </div>
      </div>
      <figcaption className="mt-3 text-[14px] text-muted">Sample batch for the demo</figcaption>
    </figure>
  );
}
