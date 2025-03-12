import {ReactNode} from 'react'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
