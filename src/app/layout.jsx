import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import Preloader from './components/Preloader'
import PageHeader from './components/PageHeader'
import Footer from './components/Footer'

export const metadata = {
  title: 'Setorix',
  description: '',
}

const benzin = localFont({
  src: [
    {
      path: './fonts/benzin-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/benzin-semibold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})

const manrope = Manrope({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Preloader />
        <PageHeader />
        {children}
        <Footer />
      </body>
    </html>
  )
}
