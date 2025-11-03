import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Developer Portfolio | Full Stack Web Developer',
  description: 'Professional portfolio showcasing web development projects, skills, and experience in React, Node.js, TypeScript, and modern web technologies.',
  keywords: 'web developer, full stack developer, React, Node.js, TypeScript, portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en" className={inter.className}>
      <head>
        <Script src="/dashboard-console-capture.js" strategy="afterInteractive" />
      </head>
      <body>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}