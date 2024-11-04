import type { Metadata, Viewport } from 'next'
import './globals.css'

import Header from '@/components/Header'
import {
  Arima,
  Dancing_Script,
  Londrina_Solid,
  Poppins,
} from 'next/font/google'
import AppContextProvider from '@/context/AppContext'
import Developer from '@/components/Developer'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

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

export const metadata: Metadata = {
  title: "Hi, I'm Mik ten Holt",
  description: 'Generated by create next app',
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  width: 'device-width',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      className={`${dancingscript.variable} ${londrinasolid.variable} ${poppins.variable} ${arima.variable}`}>
      <AppContextProvider>
        <body className={`antialiased bg-black`}>
          {process.env.DEVELOPER_BLOCK === 'true' && <Developer />}
          <Header />
          <main className='w-full min-h-screen'>{children}</main>
        </body>
      </AppContextProvider>
    </html>
  )
}
