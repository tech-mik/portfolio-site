'use server'

import { contactFormSchema } from '@/config/contactFormSchema'
import { createMailRecord, getLatestMailRecordByIp } from '@/lib/db'
import { getIp } from '@/lib/utils'
import { headers } from 'next/headers'
import xss from 'xss'
import { z } from 'zod'

import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: '10Holt.dev <noreply@backstr.app>',
        reply_to: values.email,
        to: ['miktenholt@gmail.com'],
        subject: 'New message from your website',
        html: `Name: ${xss(values.name)}<br>Email: ${xss(
          values.email,
        )}<br>Organization: ${xss(values.organization)}<br>Message: ${xss(
          values.message,
        )}`,
      }),
    })

    if (!res.ok) {
      const data = await res.json()
      const error = {
        type: 'ResendError',
        message: data,
      }
      throw new Error(JSON.stringify(error))
    }

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
    } else {
      return {
        success: false,
        error: { type: 'UnknownError', message: 'Something went wrong' },
      }
    }
  }
}
