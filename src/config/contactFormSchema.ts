import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  organization: z.string().max(50),
  email: z.string().email(),
  message: z.string().min(10).max(500),
})
