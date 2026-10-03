import webDesignBg from '@/assets/images/services/web-design-bg.png'
import webDesign from '@/assets/images/services/web-design-desk.webp'
import brandIdentityBg from '@/assets/images/services/brand-identity-bg.png'
import mobileApp from '@/assets/images/services/mobile-app.png'
import uiUxStrategyBg from '@/assets/images/services/ui-ux-strategy-bg.png'
import uiUxStrategy from '@/assets/images/services/ui-ux-strategy.png'
import creativeDevelopmentBg from '@/assets/images/services/creative-development-bg.png'
import creativeDevelopment from '@/assets/images/services/creative-development.png'
import type { Service } from './types'

export const services: Service[] = [
  {
    title: 'Web Design',
    description: 'We design high-performing, striking websites that blend creativity, usability, and strategy to boost engagement.',
    background: { src: webDesignBg, alt: '' },
    image: { src: webDesign, alt: 'Designer desk in warm light with a monitor showing a modern website layout', position: '62% 50%' },
  },
  {
    title: 'Mobile App',
    description: 'We design and build iOS and Android apps that feel effortless to use, from first screen to store release.',
    background: { src: brandIdentityBg, alt: '' },
    image: { src: mobileApp, alt: 'Smartphone showing a finance app on a stone pedestal in warm light', position: '58% 50%' },
  },
  {
    title: 'UI/UX Strategy',
    description: 'We create seamless, user-focused digital experiences built through research, intuition, and purposeful design thinking.',
    background: { src: uiUxStrategyBg, alt: '' },
    image: { src: uiUxStrategy, alt: 'Abstract glowing geometric shape representing digital experience and innovation' },
  },
  {
    title: 'Creative Development',
    description: 'We transform innovative ideas into scalable digital solutions through clean code, smart design, and creative precision.',
    background: { src: creativeDevelopmentBg, alt: '' },
    image: { src: creativeDevelopment, alt: 'Portrait with futuristic visor glitch effect representing modern technology and development' },
  },
]
