// Team: who builds MŪLA, with roles from the final scope, the supervisor, and how to get in touch.
// No photos yet: each person gets an initials mark. Swap in real photos later if the team wants them.
import { Mail } from 'lucide-react';
import { stagger } from '../lib/motion';
import { CONTACT_EMAIL, SUPERVISOR, TEAM } from '../lib/site';

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');

// The real address becomes a mail link; the placeholder stays plain text.
const hasEmail = CONTACT_EMAIL.includes('@');

export default function Team() {
  return (
    <section id="team" aria-labelledby="team-title" className="py-16 sm:py-24">
      <div className="container-page">
        <div data-reveal className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <h2 id="team-title" className="h-section">
            The team
          </h2>
          <p className="max-w-prose text-[18px] leading-relaxed text-muted lg:pt-3">
            MŪLA is built by five students for the Agile Team Project module, supervised by {SUPERVISOR}.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <li key={m.name} data-reveal style={stagger(i, 60)} className="flex items-center gap-4 border-t border-ink/80 py-6">
              <span
                aria-hidden="true"
                className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-mist font-serif text-[1.25rem] text-sage-dark"
              >
                {initials(m.name)}
              </span>
              <div className="min-w-0">
                <p className="font-medium">{m.name}</p>
                <p className="text-[15px] text-muted">{m.role}</p>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 flex flex-wrap items-center gap-3 text-[16px]">
          <Mail size={20} aria-hidden="true" className="text-sage-dark" />
          <span className="text-muted">Contact the team:</span>
          {hasEmail ? (
            <a href={`mailto:${CONTACT_EMAIL}`} className="link">
              {CONTACT_EMAIL}
            </a>
          ) : (
            <span className="font-medium">{CONTACT_EMAIL}</span>
          )}
        </div>
      </div>
    </section>
  );
}
