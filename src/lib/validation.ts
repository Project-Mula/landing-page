// Validation rules for the Request access form, written with Zod.
// The form has two roles. Fields shared by both are always checked;
// the role-specific fields are only checked for the role that is chosen.
import { z } from 'zod';

export type Role = 'company' | 'collector';

// Sri Lankan mobile: 07 followed by 8 digits. Spaces and dashes are ignored.
const MOBILE = /^07\d{8}$/;
// NIC: old format is 9 digits then V or X, new format is 12 digits.
const NIC = /^(\d{9}[VvXx]|\d{12})$/;

const clean = (v: string) => v.replace(/[\s-]/g, '');

export const formSchema = z
  .object({
    role: z.enum(['company', 'collector']),

    // Common fields
    fullName: z.string().trim().min(1, 'Enter your full name'),
    mobile: z
      .string()
      .trim()
      .min(1, 'Enter your mobile number')
      .refine((v) => MOBILE.test(clean(v)), 'Enter a Sri Lankan mobile number: 07 and then 8 more digits'),
    email: z.string().trim().min(1, 'Enter your email address').email('Enter an email address like name@example.com'),
    district: z.string().min(1, 'Choose your district'),

    // Company fields
    companyName: z.string().trim(),
    brNumber: z.string().trim(),
    rddExporter: z.string().trim(),
    jobRole: z.string().trim(),
    sellTo: z.array(z.string()),
    brCertName: z.string(),

    // Collector fields
    businessName: z.string().trim(),
    nic: z.string().trim(),
    collectorBr: z.string().trim(),
    rddLicence: z.string().trim(),
    farmCount: z.string().trim(),
    sells: z.string(),
    nicPhotoName: z.string(),
    licencePhotoName: z.string(),

    // End of form
    notes: z.string(),
    consent: z.boolean().refine((v) => v, 'Tick this box to agree to the privacy notice'),
  })
  .superRefine((d, ctx) => {
    // Adds a "required" error to one field.
    const need = (ok: boolean, path: string, message: string) => {
      if (!ok) ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message });
    };

    if (d.role === 'company') {
      need(!!d.companyName, 'companyName', 'Enter the registered company name');
      need(!!d.brNumber, 'brNumber', 'Enter the business registration (BR) number');
      need(!!d.jobRole, 'jobRole', 'Enter your role in the company');
      need(d.sellTo.length > 0, 'sellTo', 'Choose at least one');
      need(!!d.brCertName, 'brCertName', 'Choose a photo or PDF of the BR certificate');
    } else {
      if (!d.nic) need(false, 'nic', 'Enter your NIC number');
      else need(NIC.test(clean(d.nic)), 'nic', 'Enter 12 digits, or 9 digits followed by V or X');
      need(!!d.rddLicence, 'rddLicence', 'Enter your RDD dealer licence number');
      if (!d.farmCount) need(false, 'farmCount', 'Enter how many farms you buy from');
      else need(/^\d+$/.test(d.farmCount) && Number(d.farmCount) >= 1, 'farmCount', 'Enter a whole number, 1 or more');
      need(!!d.sells, 'sells', 'Choose what you sell');
      need(!!d.nicPhotoName, 'nicPhotoName', 'Choose a photo of your NIC');
      need(!!d.licencePhotoName, 'licencePhotoName', 'Choose a photo of your dealer licence');
    }
  });

export type FormValues = z.infer<typeof formSchema>;

// Empty starting values. The role comes from the page address, if it has one.
export const emptyForm = (role: Role): FormValues => ({
  role,
  fullName: '',
  mobile: '',
  email: '',
  district: '',
  companyName: '',
  brNumber: '',
  rddExporter: '',
  jobRole: '',
  sellTo: [],
  brCertName: '',
  businessName: '',
  nic: '',
  collectorBr: '',
  rddLicence: '',
  farmCount: '',
  sells: '',
  nicPhotoName: '',
  licencePhotoName: '',
  notes: '',
  consent: false,
});
