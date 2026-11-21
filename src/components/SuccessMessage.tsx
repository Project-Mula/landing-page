// SuccessMessage: replaces the form after a valid "send". The wording depends on the role.
// Nothing was sent anywhere; the message says so.
import { useEffect, useRef } from 'react';
import { CircleCheck, Info } from 'lucide-react';
import type { Role } from '../lib/validation';
import { focusSmoothly } from '../lib/motion';

const NEXT: Record<Role, string> = {
  company: 'A MŪLA verifier will check your business registration and contact you.',
  collector: 'A MŪLA verifier will check your details. After that, you add your source farms and land documents in the field app.',
};

export default function SuccessMessage({ role, onReset }: { role: Role; onReset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Glide up to the message and focus its heading, so screen reader users hear the result straight away.
  useEffect(() => focusSmoothly(headingRef.current), []);

  return (
    <div className="fade-in">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-success">
        <CircleCheck size={28} aria-hidden="true" />
      </span>
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-serif text-[2.25rem] font-light leading-tight outline-none">
        Thank you
      </h2>
      <p className="mt-3 max-w-prose text-[17px]">{NEXT[role]}</p>
      <p className="mt-6 flex items-start gap-2 rounded-card bg-bone p-4 text-[15px] text-muted">
        <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
        This is a university demo, so nothing was stored.
      </p>
      <button type="button" onClick={onReset} className="btn btn-outline mt-8">
        Send another request
      </button>
    </div>
  );
}
