// RequestAccessForm: the inquiry form. The fields change with the chosen role.
// Everything is checked in the browser. Nothing is stored, logged or sent anywhere.
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, Check, ChevronDown, Truck } from 'lucide-react';
import { DISTRICTS } from '../lib/districts';
import { emptyForm, formSchema, type FormValues, type Role } from '../lib/validation';
import { Choice, ChoiceGroup, ErrorText, Field, FileField, describedBy, inputClass } from './FormParts';
import SuccessMessage from './SuccessMessage';
import { focusSmoothly } from '../lib/motion';

const ROLES: { value: Role; title: string; text: string; Icon: typeof Truck }[] = [
  { value: 'company', title: 'Exporter or processor', text: 'Your company gets an admin dashboard.', Icon: Building2 },
  { value: 'collector', title: 'Rubber collector', text: 'You finish verification in the field app.', Icon: Truck },
];
const SELL_TO = ['Local glove or tyre makers', 'EU buyers directly', 'Other export markets'];
const SELLS = ['Field latex', 'Cup lump', 'Sheets (RSS)', 'Mixed'];

// Native checkboxes and radios, sized up and coloured with the brand sage.
const tick = 'h-5 w-5 shrink-0 accent-sage-dark';

export default function RequestAccessForm({ initialRole }: { initialRole: Role }) {
  const [sentAs, setSentAs] = useState<Role | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const firstRoleRef = useRef<HTMLButtonElement>(null);
  const focusAfterReset = useRef(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, submitCount },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: emptyForm(initialRole),
    shouldFocusError: false, // we move focus ourselves, to the first error in page order
  });

  const role = watch('role');
  const errorCount = Object.keys(errors).length;

  // After "Send another request", put focus back at the top of the new form.
  useEffect(() => {
    if (!sentAs && focusAfterReset.current) {
      focusAfterReset.current = false;
      focusSmoothly(firstRoleRef.current);
    }
  }, [sentAs]);

  // Valid: show the success message. The values are deliberately not used, stored or sent.
  const onValid = (values: FormValues) => setSentAs(values.role);

  // Not valid: glide to the first field with a problem, top to bottom, and focus it.
  const onInvalid = () =>
    requestAnimationFrame(() => focusSmoothly(formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')));

  const startAgain = () => {
    reset(emptyForm(role));
    focusAfterReset.current = true;
    setSentAs(null);
  };

  if (sentAs) return <SuccessMessage role={sentAs} onReset={startAgain} />;

  // Shorthand for the aria props every text field needs.
  const aria = (id: keyof FormValues, hasHint = false) => ({
    id,
    'aria-invalid': !!errors[id],
    'aria-describedby': describedBy(id, hasHint ? 'hint' : undefined, errors[id]?.message as string | undefined),
  });
  const err = (id: keyof FormValues) => errors[id]?.message as string | undefined;

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit(onValid, onInvalid)} className="space-y-10">
      {/* Role: two large toggle buttons. The fields below follow the choice. */}
      <div role="group" aria-labelledby="role-label">
        <p id="role-label" className="text-[15px] font-medium">
          Company or collector?
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {ROLES.map(({ value, title, text, Icon }, i) => {
            const on = role === value;
            return (
              <button
                key={value}
                ref={i === 0 ? firstRoleRef : undefined}
                type="button"
                aria-pressed={on}
                onClick={() => setValue('role', value)}
                className={`role-toggle relative flex min-h-[96px] flex-col items-start gap-1 rounded-card border p-4 text-left ${
                  on ? 'border-2 border-sage-dark bg-mist' : 'border-border bg-card'
                }`}
              >
                <Icon size={22} strokeWidth={1.75} aria-hidden="true" className="text-sage-dark" />
                <span className="mt-1 font-medium">{title}</span>
                <span className="text-[14px] text-muted">{text}</span>
                {on && (
                  <span className="tick-in absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sage-dark text-white">
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <section aria-labelledby="about-h" className="space-y-5">
        <h2 id="about-h" className="h-tile">
          About you
        </h2>
        <Field id="fullName" label="Full name" error={err('fullName')}>
          <input {...register('fullName')} {...aria('fullName')} autoComplete="name" className={inputClass(!!errors.fullName)} />
        </Field>
        <Field id="mobile" label="Mobile number" error={err('mobile')}>
          <input
            {...register('mobile')}
            {...aria('mobile')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07X XXX XXXX"
            className={inputClass(!!errors.mobile)}
          />
        </Field>
        <Field id="email" label="Email" error={err('email')}>
          <input {...register('email')} {...aria('email')} type="email" autoComplete="email" className={inputClass(!!errors.email)} />
        </Field>
        <Field id="district" label="District" error={err('district')}>
          <div className="relative">
            <select {...register('district')} {...aria('district')} className={`${inputClass(!!errors.district)} appearance-none pr-12`}>
              <option value="">Choose a district</option>
              {DISTRICTS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <ChevronDown size={20} aria-hidden="true" className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </Field>
      </section>

      {role === 'company' ? (
        <section key="company" aria-labelledby="company-h" className="swap-in space-y-5">
          <h2 id="company-h" className="h-tile">
            Your company
          </h2>
          <Field id="companyName" label="Registered company name" error={err('companyName')}>
            <input {...register('companyName')} {...aria('companyName')} autoComplete="organization" className={inputClass(!!errors.companyName)} />
          </Field>
          <Field id="brNumber" label="BR number" hint="Your business registration number." error={err('brNumber')}>
            <input {...register('brNumber')} {...aria('brNumber', true)} className={inputClass(!!errors.brNumber)} />
          </Field>
          <Field id="rddExporter" label="RDD exporter registration number" optional>
            <input {...register('rddExporter')} id="rddExporter" className={inputClass(false)} />
          </Field>
          <Field id="jobRole" label="Your role" hint="For example: compliance manager, director." error={err('jobRole')}>
            <input {...register('jobRole')} {...aria('jobRole', true)} autoComplete="organization-title" className={inputClass(!!errors.jobRole)} />
          </Field>
          <ChoiceGroup id="sellTo" legend="Who do you mainly sell to?" error={err('sellTo')}>
            {SELL_TO.map((o) => (
              <Choice key={o} label={o}>
                <input type="checkbox" value={o} {...register('sellTo')} aria-invalid={!!errors.sellTo} className={tick} />
              </Choice>
            ))}
          </ChoiceGroup>
          <FileField
            id="brCertName"
            label="BR certificate"
            hint="A photo or PDF. It stays on your device in this demo."
            accept="image/*,application/pdf"
            fileName={watch('brCertName')}
            error={err('brCertName')}
            onPick={(name) => setValue('brCertName', name, { shouldValidate: submitCount > 0 })}
          />
        </section>
      ) : (
        <section key="collector" aria-labelledby="collector-h" className="swap-in space-y-5">
          <h2 id="collector-h" className="h-tile">
            Your collecting business
          </h2>
          <Field id="businessName" label="Business name" optional>
            <input {...register('businessName')} id="businessName" autoComplete="organization" className={inputClass(false)} />
          </Field>
          <Field id="nic" label="NIC number" hint="12 digits, or 9 digits and then V or X." error={err('nic')}>
            <input {...register('nic')} {...aria('nic', true)} autoCapitalize="characters" className={inputClass(!!errors.nic)} />
          </Field>
          <Field id="collectorBr" label="BR number" optional>
            <input {...register('collectorBr')} id="collectorBr" className={inputClass(false)} />
          </Field>
          <Field id="rddLicence" label="RDD dealer licence number" error={err('rddLicence')}>
            <input {...register('rddLicence')} {...aria('rddLicence')} className={inputClass(!!errors.rddLicence)} />
          </Field>
          <Field id="farmCount" label="How many farms do you buy from?" error={err('farmCount')}>
            <input
              {...register('farmCount')}
              {...aria('farmCount')}
              inputMode="numeric"
              className={`${inputClass(!!errors.farmCount)} max-w-[10rem]`}
            />
          </Field>
          <ChoiceGroup id="sells" legend="What do you sell?" error={err('sells')}>
            {SELLS.map((o) => (
              <Choice key={o} label={o}>
                <input type="radio" value={o} {...register('sells')} aria-invalid={!!errors.sells} className={tick} />
              </Choice>
            ))}
          </ChoiceGroup>
          <FileField
            id="nicPhotoName"
            label="Photo of your NIC"
            hint="It stays on your device in this demo."
            accept="image/*"
            fileName={watch('nicPhotoName')}
            error={err('nicPhotoName')}
            onPick={(name) => setValue('nicPhotoName', name, { shouldValidate: submitCount > 0 })}
          />
          <FileField
            id="licencePhotoName"
            label="Photo of your dealer licence"
            hint="It stays on your device in this demo."
            accept="image/*"
            fileName={watch('licencePhotoName')}
            error={err('licencePhotoName')}
            onPick={(name) => setValue('licencePhotoName', name, { shouldValidate: submitCount > 0 })}
          />
          <p className="rounded-card bg-bone p-4 text-[15px] text-muted">
            You'll add your source farms and land documents in the field app after this step.
          </p>
        </section>
      )}

      <section aria-labelledby="else-h" className="space-y-5">
        <h2 id="else-h" className="h-tile">
          Anything else
        </h2>
        <Field id="notes" label="Notes" optional>
          <textarea {...register('notes')} id="notes" rows={4} className="field-input block w-full rounded-card border border-border bg-card px-5 py-3 text-[16px]" />
        </Field>
        <div>
          <label className="flex min-h-[44px] cursor-pointer items-start gap-3 pt-2 text-[16px]">
            <input
              type="checkbox"
              {...register('consent')}
              id="consent"
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'consent-error' : undefined}
              className={`${tick} mt-0.5`}
            />
            <span>
              I agree to the{' '}
              <Link to="/privacy" target="_blank" rel="noopener" className="link">
                privacy notice
              </Link>{' '}
              <span className="text-muted">(opens in a new tab)</span>
            </span>
          </label>
          <ErrorText id="consent" message={err('consent')} />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary">
          Send request
        </button>
        {/* Read out how many problems there are after a failed send. */}
        <p aria-live="polite" className="text-[15px] font-medium text-danger">
          {submitCount > 0 && errorCount > 0
            ? `${errorCount === 1 ? 'There is 1 problem' : `There are ${errorCount} problems`} to fix above.`
            : ''}
        </p>
      </div>
    </form>
  );
}
