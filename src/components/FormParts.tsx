// FormParts: small building blocks for the Request access form.
// Each one links its label, hint and error message to the input,
// so screen readers read them together.
import type { ReactNode } from 'react';
import { CircleAlert, Paperclip } from 'lucide-react';

// Shared look for text inputs and selects: a pill, 48px tall, red outline when wrong.
export const inputClass = (invalid: boolean) =>
  `field-input block w-full min-h-[48px] rounded-full border bg-card px-5 text-[16px] text-ink placeholder:text-muted/70 ${
    invalid ? 'border-danger border-2' : 'border-border'
  }`;

// The ids of the hint and error lines, for aria-describedby.
export const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;

export function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={`${id}-error`} className="err-in mt-2 flex items-start gap-1.5 text-[15px] font-medium text-danger">
      <CircleAlert size={18} aria-hidden="true" className="mt-px shrink-0" />
      {message}
    </p>
  );
}

// Field: a label, an optional hint, the input itself (passed as children) and the error line.
export function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[15px] font-medium">
        {label}
        {optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-[14px] text-muted">
          {hint}
        </p>
      )}
      <div className="mt-2">{children}</div>
      <ErrorText id={id} message={error} />
    </div>
  );
}

// ChoiceGroup: a fieldset of checkboxes or radio buttons with one legend and one error.
export function ChoiceGroup({
  id,
  legend,
  error,
  children,
}: {
  id: string;
  legend: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="text-[15px] font-medium">{legend}</legend>
      <div className="mt-2 grid gap-1">{children}</div>
      <ErrorText id={id} message={error} />
    </fieldset>
  );
}

// Choice: one checkbox or radio row, 44px tall so it is easy to tap.
export function Choice({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-[16px]">
      {children}
      {label}
    </label>
  );
}

// FileField: picks a file but never reads it. Only the file name is kept and shown.
export function FileField({
  id,
  label,
  hint,
  accept,
  fileName,
  error,
  onPick,
}: {
  id: string;
  label: string;
  hint: string;
  accept: string;
  fileName: string;
  error?: string;
  onPick: (name: string) => void;
}) {
  return (
    <div>
      <p id={`${id}-label`} className="text-[15px] font-medium">
        {label}
      </p>
      <p id={`${id}-hint`} className="mt-1 text-[14px] text-muted">
        {hint}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {/* The real input is hidden; the pill label below is what people see and press. */}
        <input
          id={id}
          type="file"
          accept={accept}
          className="peer sr-only"
          aria-labelledby={`${id}-label`}
          aria-describedby={describedBy(id, hint, error)}
          aria-invalid={!!error}
          onChange={(e) => onPick(e.target.files?.[0]?.name ?? '')}
        />
        <label
          htmlFor={id}
          className={`btn btn-outline cursor-pointer peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-[3px] peer-focus-visible:outline-sage-dark ${
            error ? 'border-2 border-danger' : ''
          }`}
        >
          <Paperclip size={18} aria-hidden="true" />
          {fileName ? 'Choose a different file' : 'Choose file'}
        </label>
        <span className="min-w-0 break-all text-[15px] text-muted" aria-live="polite">
          {fileName ? `Chosen: ${fileName}` : 'No file chosen'}
        </span>
      </div>
      <ErrorText id={id} message={error} />
    </div>
  );
}
