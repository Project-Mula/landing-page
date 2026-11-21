// ComplianceSection: what MŪLA provides and what it does not, on the dark forest band.
// The "We don't" list follows the scope's out-of-scope list, and the opening line is the scope's own wording.
import { Check, X } from 'lucide-react';
import { stagger } from '../lib/motion';

const PROVIDE = [
  'Plot geolocation for every farm in a lot',
  'Deforestation checks against 2020 forest data',
  'Land documents, and who verified them',
  'Signed records kept for at least 5 years',
  'An evidence package the EU importer can use',
];
const DONT = [
  'Issue certificates, or call products "deforestation-free"',
  "File the due diligence statement: the EU importer does that",
  'Check full legality such as labour, tax or anti-corruption. Only land documents',
  'Mix verified and unverified rubber in one lot',
  'Run auctions or handle payments',
  'Cover tea, cinnamon or other crops yet',
  'Give legal advice',
];

function List({ title, items, Icon, order }: { title: string; items: string[]; Icon: typeof Check; order: number }) {
  return (
    <div data-reveal style={stagger(order, 120)} className="border-t border-on-dark/30 pt-6">
      <h3 className="h-tile text-on-dark">{title}</h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[17px]">
            <Icon size={20} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-lime" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ComplianceSection() {
  return (
    <section id="compliance" aria-labelledby="compliance-title" className="on-dark bg-forest py-16 text-on-dark sm:py-24">
      <div className="container-page">
        <div data-reveal>
          <h2 id="compliance-title" className="h-section max-w-[16ch] text-on-dark">
            What MŪLA does, and what it doesn't.
          </h2>
          <p className="mt-5 max-w-prose text-[19px] leading-relaxed text-on-dark">
            MŪLA organises evidence. It does not issue certificates.
          </p>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <List title="We provide" items={PROVIDE} Icon={Check} order={0} />
          <List title="We don't" items={DONT} Icon={X} order={1} />
        </div>
      </div>
    </section>
  );
}
