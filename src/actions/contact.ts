'use server'

import { contactFormSchema } from '@/config/contactFormSchema'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'

export const sendForm = async (values: z.infer<typeof contactFormSchema>) => {
  const ip = (await headers()).get('x-forwarded-for')
  console.log(ip)

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await contactFormSchema.parseAsync(values)

    await transporter.sendMail({
      to: 'miktenholt@gmail.com',
      subject: 'New message from your website!',
      html: `Name: ${values.name}<br>Email: ${values.email}<br>Organization: ${values.organization}<br>Message: ${values.message}`,
    })

    return { success: true, error: null }
  } catch (error) {
    console.log(error)
    return { success: false, error: true }
  }
}
