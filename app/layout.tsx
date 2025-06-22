import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Endless | Your Digital Sanctuary',
  description: 'Endless is your digital sanctuary.',
  keywords: ['ai', 'aigc', 'chill','ambient music', 'relaxation', 'meditation'],
  authors: [{ name: 'Sam9' }],
  creator: 'Sam9',
  publisher: 'https://endless.sam9.link',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://endless.sam9.link'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Endless | Your Digital Sanctuary',
    description: 'Endless is your digital sanctuary.',
    url: 'https://endless.sam9.link', 
    siteName: 'Endless',
    images: [
      {
        url: '/images/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Endless',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endless | Your Digital Sanctuary',
    description: 'Endless is your digital sanctuary.',
    images: ['/images/og_image.png'], // Same image for Twitter
    // creator: '@your_twitter_handle',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={inter.className}>
      <body className={inter.className}>{children}</body>
    </html>
  )
}