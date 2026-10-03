import type { Faq } from './types'

export const faqIntro = {
  label: 'FAQs',
  title: 'Frequently Asked Questions!',
  help: {
    title: 'Still have questions?',
    body: 'Can’t find what you’re looking for? Chat with our team - we’re here to help.',
    cta: { label: 'Talk to Us', href: '#contact' },
  },
}

export const faqs: Faq[] = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary by scope - most websites or brand projects are delivered within 4 to 8 weeks.',
  },
  {
    question: 'What industries do you work with?',
    answer: 'We collaborate with startups, agencies, and established brands across tech, lifestyle, and creative sectors.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes - we provide continuous maintenance, updates, and performance optimization to ensure lasting success.',
  },
  {
    question: 'Can you work with existing brand guidelines?',
    answer: 'Absolutely. We blend our creative approach with your existing brand system to keep everything consistent.',
  },
  {
    question: 'What’s the first step to start a project?',
    answer: 'Just reach out through our contact form - our team will discuss goals, timeline, and next steps with you.',
  },
]
