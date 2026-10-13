import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import './enhancements.css'

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif'
})

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-sans'
})

const siteUrl = 'https://nilaga-dinusha-weddinginvitation.vercel.app'
const siteTitle = 'NILAGA & DINUSHA Wedding'
const siteDescription = 'Join us as we celebrate the wedding of NILAGA and DINUSHA on November 28, 2026.'
const ogImage = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'Nilaga & Dinusha Wedding Invitation',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
  generator: 'v0.app',
  icons: {
    icon: '/wedding-icon.png',
    apple: '/wedding-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#D4AF37',
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
