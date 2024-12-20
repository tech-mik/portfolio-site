'use server'

import { contactFormSchema } from '@/config/contactFormSchema'
import { z, ZodError, ZodIssue } from 'zod'
import nodemailer from 'nodemailer'
import { headers } from 'next/headers'
import { getIp } from '@/lib/utils'
import { createMailRecord, getLatestMailRecordByIp } from '@/lib/db'
import xss from 'xss'

interface responseType {
  success: boolean
  error: null | { type: string; message: string | unknown[] }
}

export async function sendForm(
  values: z.infer<typeof contactFormSchema>,
): Promise<responseType> {
  try {
    const ip = await getIp(headers)
    if (!ip)
      return {
        success: false,
        error: { type: 'ValidationError', message: 'No IP address found' },
      }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      debug: true,
      logger: true,
    })

    // First validate form data
    contactFormSchema.parse(values)

    // Check if the user has sent too many emails
    const latestRecord = await getLatestMailRecordByIp(ip)

    // Sanitize form data
    if (latestRecord.length) {
      const lastRecord = latestRecord[0]
      const lastRecordDate = new Date(lastRecord.createdAt)
      const currentDate = new Date()

      // One mail per 5 minutes is allowed
      if (currentDate.getTime() - lastRecordDate.getTime() < 5 * 60 * 1000) {
        return {
          success: false,
          error: { type: 'RateLimitException', message: 'too many emails' },
        }
      }
    }

    // Then create a record of the email in the database
    // for rate limiting
    await createMailRecord(ip)

    // Send the email
    await transporter.sendMail({
      to: 'miktenholt@gmail.com',
      subject: 'New message from your website!',
      html: `Name: ${xss(values.name)}<br>Email: ${xss(
        values.email,
      )}<br>Organization: ${xss(values.organization)}<br>Message: ${xss(
        values.message,
      )}`,
    })

    return { success: true, error: null }
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: { type: 'ValidationError', message: error.errors },
      }
    } else if (error instanceof Error) {
      console.log(error)
      return {
        success: false,
        error: { type: 'Error', message: error.message },
      }
    }
    return {
      success: false,
      error: { type: 'UnknownError', message: 'Something went wrong' },
    }
  }
}
