import { z } from 'zod';

export const patientEditSchema = z.object({
  name: z.string().min(1, 'Name is required').trim(),
  avatar: z
    .string()
    .min(1, 'Avatar URL is required')
    .url('Please enter a valid URL'),
  website: z
    .string()
    .min(1, 'Website URL is required')
    .url('Please enter a valid URL'),
  description: z.string().min(1, 'Description is required'),
});

export type PatientEditFormData = z.infer<typeof patientEditSchema>;
