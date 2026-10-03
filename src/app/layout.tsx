import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { LoadingExperience } from '@/components/loader/LoadingExperience'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { CursorFollower } from '@/components/layout/CursorFollower'
import { site } from '@/content/site'

const tasa = localFont({
  src: [
    { path: '../fonts/tasa-orbiter-400.woff2', weight: '400', style: 'normal' },
    { path: '../fonts/tasa-orbiter-500.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/tasa-orbiter-600.woff2', weight: '600', style: 'normal' },
    { path: '../fonts/tasa-orbiter-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-tasa',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
})

/** Only the About slideshow captions are set in Inter. */
const inter = localFont({
  src: [
    { path: '../fonts/inter-500-latin.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/inter-600-latin.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
  fallback: ['Arial', 'sans-serif'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Creative Studio`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website' },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

/**
 * Runs before first paint on a full page load only (never on client
 * navigation): holds the page's entrance animations until the loader reveals
 * them. Only the home page plays it (it loads the home hero); every other page skips it. The 9s timeout is a failsafe if scripts never hydrate.
 */
const PRE_PAINT = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches||location.pathname!=='/')return;var h=document.documentElement;h.classList.add('is-loading');setTimeout(function(){h.classList.remove('is-loading')},9000)}catch(e){}})()`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${tasa.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body>
        <LoadingExperience />
        <SmoothScroll />
        <Header />
        <main>{children}</main>
        <Footer />
        <CursorFollower />
      </body>
    </html>
  )
}
