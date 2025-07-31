import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ARP Engineering Solutions',
  icons: {
    icon: '/Logobg.png',
  },
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  )
}
