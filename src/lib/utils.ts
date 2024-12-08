import { clsx, type ClassValue } from 'clsx'
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getIp(headers: () => Promise<ReadonlyHeaders>) {
  const forwardedFor = (await headers()).get('x-forwarded-for')
  const reapIp = (await headers()).get('x-real-ip')

  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  if (reapIp) {
    return reapIp
  }

  return null
}
