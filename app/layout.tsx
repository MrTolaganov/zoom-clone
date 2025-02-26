import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import { ChildProps } from '@/types'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'
import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zoom',
  description: 'This is the Zoom clone created by Otabek Tulaganov',
  icons: { icon: '/icons/logo.svg' },
  openGraph: {
    title: 'Zoom',
    description: 'This is the Zoom clone created by Otabek Tulaganov',
    images: '/zoom.png',
  },
}

export default function RootLayout({ children }: Readonly<ChildProps>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: '/zoom-logo.png',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorText: '#fff',
          colorPrimary: '#0e78f9',
          colorBackground: '#1c1f2e',
          colorInputBackground: '#252a41',
          colorInputText: '#fff',
        },
      }}
    >
      <html lang='en'>
        <body className={`${inter.className} antialiased bg-dark-2`}>
          <NextTopLoader
            color='#3182CE'
            initialPosition={0.5}
            crawlSpeed={200}
            height={2}
            crawl={true}
            showSpinner={false}
            easing='ease'
            speed={200}
            shadow='0 0 10px #3182CE,0 0 5px #3182CE'
          />
          {children}
          <Toaster position='bottom-center' />
        </body>
      </html>
    </ClerkProvider>
  )
}
