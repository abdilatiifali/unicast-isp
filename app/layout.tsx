import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unicast Technology Limited',
  description: 'Unicast Technology',
  generator: 'unicasttech.com',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
