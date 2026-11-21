// StatusTag: a status shown with an icon AND a word, never colour alone.
import { BadgeCheck, Ban, CircleCheck } from 'lucide-react';

type Kind = 'verified' | 'certified' | 'blocked';

const styles: Record<Kind, { label: string; className: string; Icon: typeof CircleCheck }> = {
  verified: { label: 'Verified', className: 'bg-success-bg text-success', Icon: CircleCheck },
  certified: { label: 'Certified', className: 'bg-success-bg text-success', Icon: BadgeCheck },
  blocked: { label: 'Blocked', className: 'bg-danger-bg text-danger', Icon: Ban },
};

export default function StatusTag({ kind }: { kind: Kind }) {
  const { label, className, Icon } = styles[kind];
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[14px] font-medium ${className}`}>
      <Icon size={16} strokeWidth={2} aria-hidden="true" />
      {label}
    </span>
  );
}
