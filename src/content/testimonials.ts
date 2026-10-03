import ethanMiller from '@/assets/images/testimonials/ethan-miller.png'
import jamesPorter from '@/assets/images/testimonials/james-porter.png'
import oliviaBennett from '@/assets/images/testimonials/olivia-bennett.png'
import sophiaClark from '@/assets/images/testimonials/sophia-clark.png'
import quotient from '@/assets/images/clients/quotient.png'
import hourglass from '@/assets/images/clients/hourglass.png'
import epicurious from '@/assets/images/clients/epicurious.png'
import galileo from '@/assets/images/clients/galileo.png'
import type { Testimonial } from './types'

export const testimonials: Testimonial[] = [
  {
    quote: '“The service completely transformed the way our team works. It’s intuitive, reliable, and backed by a support crew who genuinely cares about our success every step.”',
    name: 'Ethan Miller',
    role: 'Product Manager',
    company: { src: quotient, alt: 'Quotient' },
    portrait: { src: ethanMiller, alt: 'Smiling man in brown blazer professional portrait' },
  },
  {
    quote: '“From day one the platform felt seamless. I’ve saved hours every week, and the finished results consistently exceed my clients’ expectations without adding extra stress.”',
    name: 'James Porter',
    role: 'Marketing Consultant',
    company: { src: hourglass, alt: 'Hourglass' },
    portrait: { src: jamesPorter, alt: 'Confident middle aged man professional headshot' },
  },
  {
    quote: '“Using this tool has streamlined our projects beautifully. The interface is clean, the output precise, and the overall experience far exceeds anything I’ve tried before.”',
    name: 'Olivia Bennett',
    role: 'Creative Director',
    company: { src: epicurious, alt: 'Epicurious' },
    portrait: { src: oliviaBennett, alt: 'Professional woman in white blazer corporate portrait' },
    thumbPosition: '54.5% 10.1%',
  },
  {
    quote: '“I love how effortlessly everything runs now. Teams stay connected, tasks stay organized, and productivity finally feels natural instead of forced or complicated.”',
    name: 'Sophia Clark',
    role: 'HR Specialist',
    company: { src: galileo, alt: 'Galileo' },
    portrait: { src: sophiaClark, alt: 'Smiling woman portrait with soft lighting and natural expression', position: '49% 0%' },
    thumbPosition: '47.4% 0%',
  },
]
