'use server'

import { contactFormSchema } from '@/config/contactFormSchema'
import { z } from 'zod'

export const sendForm = async (values: z.infer<typeof contactFormSchema>) => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return { success: true, error: null }
}
