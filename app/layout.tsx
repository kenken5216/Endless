import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ambient Music Experience | Immersive Audio Visual Journey',
  description: 'Dive into a serene ambient music experience with beautiful visuals and atmospheric sounds. Perfect for relaxation, meditation, and focus.',
  keywords: ['ambient music', 'relaxation', 'meditation', 'atmospheric', 'audio visual', 'immersive experience'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  publisher: 'Your Website',
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
    title: 'Ambient Music Experience | Immersive Audio Visual Journey',
    description: 'Dive into a serene ambient music experience with beautiful visuals and atmospheric sounds. Perfect for relaxation, meditation, and focus.',
    url: 'https://endless.sam9.link', 
    siteName: 'Ambient Music Experience',
    images: [
      {
        url: '/og_image.png',
        width: 1200,
        height: 630,
        alt: 'Ambient Music Experience - Immersive Audio Visual Journey',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ambient Music Experience | Immersive Audio Visual Journey',
    description: 'Dive into a serene ambient music experience with beautiful visuals and atmospheric sounds.',
    images: ['/og-image.jpg'], // Same image for Twitter
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