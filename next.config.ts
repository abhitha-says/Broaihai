import path from 'node:path'
import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Several lockfiles sit above this directory; pin the trace root to the app.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    // Every photo sits in a fixed frame; these are the widths the layout asks for
    // at 1x and 2x across the three breakpoints.
    deviceSizes: [390, 640, 810, 1080, 1200, 1440, 1920, 2560],
    imageSizes: [40, 64, 100, 150, 200, 300, 400],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
}

export default nextConfig
