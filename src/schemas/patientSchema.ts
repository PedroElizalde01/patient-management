import { z } from 'zod';

export const patientFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  avatar: z.string().trim().optional().or(z.literal('')),
  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: 'Please enter a valid URL',
    }),
  description: z.string().trim().min(1, 'Description is required'),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;

export const patientEditSchema = patientFormSchema;
export type PatientEditFormData = PatientFormData;
