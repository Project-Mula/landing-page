// RequestAccess: the inquiry page. Explanation on the left, the form on the right.
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Info, Smartphone } from 'lucide-react';
import { usePageMeta } from '../lib/seo';
import type { Role } from '../lib/validation';
import RequestAccessForm from '../components/RequestAccessForm';

const STEPS = [
  'You send this request.',
  'A MŪLA verifier reviews it.',
  'We create your account. Companies get an admin dashboard; collectors finish verification in the field app.',
];

export default function RequestAccess() {
  usePageMeta('requestAccess');

  // Links from the landing page say which role to start with, for example ?role=collector.
  // The first render is always the company form, so the prerendered HTML hydrates cleanly.
  const [params] = useSearchParams();
  const roleParam = params.get('role');
  const [initialRole, setInitialRole] = useState<Role>('company');

  useEffect(() => {
    setInitialRole(roleParam === 'collector' ? 'collector' : 'company');
  }, [roleParam]);

  return (
    <>
      {/* Demo banner: always visible at the top of this page. */}
      <div className="border-b border-border/60 bg-bone">
        <p className="container-page flex items-start gap-2 py-3 text-[15px] font-medium sm:items-center">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-sage-dark sm:mt-0" />
          Demo form for a university project. Nothing you enter is stored or sent.
        </p>
      </div>

      <div className="container-page grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Left column: what this is and what happens next. Stays in view while the form scrolls on wide screens. */}
        <div className="lg:sticky lg:top-[104px] lg:self-start">
          <h1 className="text-[2.5rem] font-light leading-[1.05] sm:text-[3rem]">Request access to MŪLA</h1>
          <p className="mt-5 max-w-prose text-[18px] leading-relaxed text-muted">
            Accounts are created by MŪLA, not by sign-up. Tell us who you are and a MŪLA verifier will check your
            details.
          </p>

          <h2 className="h-tile mt-10">What happens next</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mist font-serif text-[18px] text-sage-dark"
                >
                  {i + 1}
                </span>
                <span className="pt-1">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex gap-4 rounded-card bg-surface p-5">
            <Smartphone size={24} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-sage-dark" />
            <p className="text-[16px]">
              <strong className="font-semibold">Are you a company field agent?</strong> You don't need this form. Ask
              your company admin to create your account.
            </p>
          </div>
        </div>

        {/* Right column: the form, on a white tile. */}
        <div className="rounded-hero bg-card p-5 sm:p-8 lg:p-10">
          <RequestAccessForm key={initialRole} initialRole={initialRole} />
        </div>
      </div>
    </>
  );
}
