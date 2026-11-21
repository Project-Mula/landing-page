// Features: first the three smart features (the parts of MŪLA that work something out by themselves),
// then the everyday features, on a bone band.
import { FileSignature, Gauge, Handshake, MapPinned, ShieldCheck, WifiOff } from 'lucide-react';
import { stagger } from '../lib/motion';

// The three smart features, as named in the final scope, in plain words.
const SMART = [
  {
    Icon: MapPinned,
    title: 'Smart map checks',
    text: 'Checks that each farm boundary is a valid shape, works out its hectares, and compares it with the 2020 EU forest map to set its risk to low or high.',
  },
  {
    Icon: FileSignature,
    title: 'Cryptographic proof',
    text: 'Every pickup is signed on the phone, and every change is linked to the one before. If a record is changed later, the check fails.',
  },
  {
    Icon: Gauge,
    title: 'Fraud detection',
    text: 'A harvest prediction model works out what each farm could really grow. Bigger harvests are flagged for a person to review, never rejected automatically.',
  },
];

const MORE = [
  { Icon: ShieldCheck, title: 'Compliance gate', text: 'A batch cannot leave until every farm in it passes every check. Failures name the farm.' },
  { Icon: Handshake, title: 'Connect and lot handover', text: 'Exporters connect with verified collectors, and each lot is handed to one buyer, once.' },
  { Icon: WifiOff, title: 'Works offline', text: 'The field app keeps working on estates with no signal and syncs when it is back online.' },
];

function Item({ Icon, title, text, i, smart }: (typeof SMART)[number] & { i: number; smart?: boolean }) {
  return (
    <li data-reveal style={stagger(i, 60)} className={smart ? 'rounded-card bg-card p-6' : undefined}>
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full text-sage-dark ${smart ? 'bg-mist' : 'bg-card'}`}>
        <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h4 className="h-tile mt-5">{title}</h4>
      <p className="mt-2 max-w-prose text-[16px] text-muted">{text}</p>
    </li>
  );
}

export default function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="grain bg-bone py-16 sm:py-24">
      <div className="container-page">
        <h2 id="features-title" data-reveal className="h-section">
          Features
        </h2>

        <h3 data-reveal className="mt-10 text-[17px] font-semibold">
          Three smart features: MŪLA works these out, nobody types them in
        </h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {SMART.map((f, i) => (
            <Item key={f.title} {...f} i={i} smart />
          ))}
        </ul>

        <h3 data-reveal className="mt-14 text-[17px] font-semibold">
          And the everyday work
        </h3>
        <ul className="mt-5 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {MORE.map((f, i) => (
            <Item key={f.title} {...f} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
