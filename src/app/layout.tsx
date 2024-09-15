import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Footer from './(landing)/components/Footer'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'AsterionConnect',
  description: 'Alcanza tus metas financieras en comunidad',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[radial-gradient(farthest-corner_at_80%_45%,#db1943_0%,#181627_50%)]`}
      >
        {children}
        <Footer />
      </body>
    </html>
  )
}
