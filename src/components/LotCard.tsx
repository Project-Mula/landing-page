// LotCard: a sample lot showing the whole idea at a glance.
// Verified farms are in the lot; a farm without a verified land deed is blocked.
import { useId } from 'react';
import { ArrowRightLeft, KeyRound } from 'lucide-react';
import StatusTag from './StatusTag';

type Farm = { id: string; district: string; ha: number; status: 'verified' | 'blocked'; reason?: string };

// Sample data only. These are not real farms.
const FARMS: Farm[] = [
  { id: 'KAL-003', district: 'Kalutara', ha: 1.1, status: 'verified' },
  { id: 'RAT-001', district: 'Ratnapura', ha: 1.8, status: 'verified' },
  { id: 'MON-004', district: 'Moneragala', ha: 2.4, status: 'blocked', reason: 'Land deed not verified' },
];

export default function LotCard() {
  // Unique heading id, because the card can appear twice on a page (on the picture, or under it).
  const titleId = useId();
  return (
    <article aria-labelledby={titleId} className="rounded-card bg-card p-5 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id={titleId} className="font-serif text-[1.875rem] font-normal leading-none">
            Lot L-0412
          </h2>
          <p className="mt-2 text-[15px] text-muted">Natural rubber, sheets RSS</p>
        </div>
        <span className="shrink-0 whitespace-nowrap rounded-full border border-border px-3 py-1 text-[13px] font-medium text-muted">Sample data</span>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4">
        <div>
          <p className="text-[13px] text-muted">Collector</p>
          <p className="font-medium">Kalutara Latex Traders</p>
        </div>
        <StatusTag kind="certified" />
      </div>

      <p className="mt-6 text-[13px] text-muted">Source farms</p>
      <ul className="mt-2 divide-y divide-border/60 border-y border-border/60">
        {FARMS.map((f, i) => (
          <li
            key={f.id}
            className="rise grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-3"
            style={{ animationDelay: `${420 + i * 90}ms` }}
          >
            <div className="min-w-0">
              <span className="font-medium tabular-nums">{f.id}</span>
              <span className="text-muted">
                {' '}
                {f.district}, <span className="tabular-nums">{f.ha}</span> ha
              </span>
            </div>
            <StatusTag kind={f.status} />
            {f.reason && <p className="col-span-2 text-[14px] text-danger">{f.reason}. Not added to this lot.</p>}
          </li>
        ))}
      </ul>

      <ul className="mt-5 space-y-2 text-[14px] text-muted">
        <li className="flex items-center gap-2">
          <KeyRound size={16} aria-hidden="true" className="shrink-0 text-sage-dark" />
          Signed on the collector's phone
        </li>
        <li className="flex items-center gap-2">
          <ArrowRightLeft size={16} aria-hidden="true" className="shrink-0 text-sage-dark" />
          Handed over once to Exporter B (demo)
        </li>
      </ul>
    </article>
  );
}
