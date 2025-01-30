import { z } from 'zod';

export const userCreationSchema = z.object({
  Email: z.string().email(),
  Name: z.string(),
  Password: z.string().min(8),
  Role: z.string().max(5),
  Website: z.string().optional().nullable(),
  RnNumber: z.string().optional().nullable(),
  Address: z.string().optional().nullable()
});

export const userLoginSchema = z.object({
  Email: z.string(),
  Password: z.string().min(8),
});