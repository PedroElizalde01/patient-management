import { z } from 'zod';

export const patientFormSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  avatar: z.string().min(1, 'Avatar is required').trim(),
  website: z
    .string()
    .min(1, 'Website URL is required')
    .url('Please enter a valid URL'),
  description: z.string().min(1, 'Description is required'),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;

export const patientEditSchema = patientFormSchema;
export type PatientEditFormData = PatientFormData;
