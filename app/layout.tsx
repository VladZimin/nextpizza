import type {Metadata} from 'next'
import './globals.css'
import {Nunito} from 'next/font/google'
import {Header} from '@/components/shared'

const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Next Pizza',
  description: 'The best pizza',
}

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={nunito.variable} lang="en">
    <body>
      <main className={'min-h-screen'}>
        <Header/>
        {children}
      </main>
    </body>
    </html>
  )
}
