import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import './globals.css'

import Developer from '@/components/Developer'
import Header from '@/components/Header'
import AppContextProvider from '@/context/AppContext'
import { Arima, Dancing_Script, Londrina_Solid, VT323 } from 'next/font/google'
import ScrollIndicator from '@/components/ScrollIndicator'

const dancingscript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dancing-script',
})

const londrinasolid = Londrina_Solid({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-londrina-solid',
})

const arima = Arima({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-arima',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: "10holt.dev - Let's work together",
  description:
    'A showcase of my skills, projects, and experience as a software developer. Explore my portfolio to see the work I have done and learn more about my skills and experiences.',
  creator: 'Mik ten Holt',
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Analytics />
      <html
        lang='en'
        className={`${dancingscript.variable} ${londrinasolid.variable} ${arima.variable} ${vt323.variable}`}>
        <AppContextProvider>
          <body
            className={`antialiased bg-black overflow-hidden transition-transform`}>
            {process.env.DEVELOPER_BLOCK === 'true' && <Developer />}
            <Header />
            <main className='w-full min-h-lvh'>{children}</main>
            <ScrollIndicator />
          </body>
        </AppContextProvider>
      </html>
    </>
  )
}
