import heroStudio from '@/assets/images/projects/hero-studio.png'
import calmtreeHero from '@/assets/images/projects/calmtree/hero.jpg'
import calmtreeShot1 from '@/assets/images/projects/calmtree/shot-1.jpg'
import calmtreeShot2 from '@/assets/images/projects/calmtree/shot-2.jpg'
import plan2buildHero from '@/assets/images/projects/plan2build/hero.jpg'
import plan2buildWide from '@/assets/images/projects/plan2build/wide.jpg'
import plan2buildShot1 from '@/assets/images/projects/plan2build/shot-1.jpg'
import plan2buildShot2 from '@/assets/images/projects/plan2build/shot-2.jpg'
import humanSignalsHero from '@/assets/images/projects/human-signals/hero.jpg'
import humanSignalsWide from '@/assets/images/projects/human-signals/wide.jpg'
import humanSignalsShot1 from '@/assets/images/projects/human-signals/shot-1.jpg'
import humanSignalsShot2 from '@/assets/images/projects/human-signals/shot-2.jpg'
import humanSignals1Hero from '@/assets/images/projects/human-signals-1/hero.jpg'
import humanSignals1Wide from '@/assets/images/projects/human-signals-1/wide.jpg'
import humanSignals1Shot1 from '@/assets/images/projects/human-signals-1/shot-1.jpg'
import humanSignals1Shot2 from '@/assets/images/projects/human-signals-1/shot-2.jpg'
import type { DetailedProject, Picture, Project } from './types'

/**
 * Newest first; the home page shows the first six. The first four are live
 * client sites with a case study (every screen is a capture of the live site).
 */
export const projects: Project[] = [
  {
    slug: 'calmtree',
    title: 'Calmtree',
    year: 2026,
    category: 'Web Platform',
    image: { src: calmtreeHero, alt: 'Calmtree homepage: "Understand your patterns. Take a better next step." over an illustrated pixel-art forest and lake' },
    heroVideo: '/videos/calmtree.mp4',
    // the green of Calmtree's own buttons
    wordColors: ['#1f3d2b', '#3e6c4c'],
    detail: {
      tagline: 'Practical psychology for everyday life and work.',
      website: 'https://www.calmtree.in/',
      client: 'Calmtree',
      overview:
        'Calmtree offers short, original, psychology-informed self-reflection assessments for confidence, stress, relationships, work, leadership and life transitions. Each one takes ten questions and three to five minutes, and returns an instant, plain-language result with no diagnosis and no complicated report. A second track lets organisations understand team wellbeing through private responses and aggregate-only reporting.',
      challenge:
        'People looking for practical psychology online mostly find either clinical tools or throwaway quizzes. Calmtree needed a product that felt warm and safe, explained itself in plain language, and could serve individuals and organisations without turning into a dashboard.',
      approach:
        'We built a calm, illustrated web platform around a library of ten free assessments: a "What’s on your mind?" entry point that routes visitors by situation, an assessment flow with instant results, a sign-in area for returning users, and an organisations track that only ever reports in aggregate. Analytics is opt-in, and privacy is treated as a design feature rather than a footnote.',
      services: ['Product design', 'Web development', 'Assessment flow', 'Illustration system', 'Privacy-first analytics'],
      technologies: ['Vercel'],
      features: [
        { title: 'Ten free assessments', body: 'Short, original assessments covering confidence, stress, relationships, work, leadership and life transitions.' },
        { title: 'Situation-led entry', body: 'A "What’s on your mind?" grid routes people by what they are going through rather than by category.' },
        { title: 'Instant, plain-language results', body: 'Every assessment ends with a readable result based on the answers given. Educational, not clinical.' },
        { title: 'Organisations track', body: 'Team wellbeing patterns through private responses and aggregate-only reporting.' },
        { title: 'Private by design', body: 'Opt-in analytics with no session recording, no advertising and no cross-site tracking.' },
        { title: 'Returning users', body: 'A sign-in area so people can come back to their assessments over time.' },
      ],
      results:
        'Calmtree is live at calmtree.in with ten free assessments, separate journeys for individuals and organisations, and a sign-in area for returning users.',
      gallery: [
        { src: calmtreeHero, alt: 'Calmtree homepage: "Understand your patterns. Take a better next step." over an illustrated pixel-art forest and lake' },
        { src: calmtreeShot1, alt: 'Calmtree: "We believe meaningful change starts with self-understanding" and the four-step How It Works' },
        { src: calmtreeShot2, alt: 'Calmtree: "Better understanding. Better living." with the "Backed by professionals you can trust" and "Learn. Grow. Thrive." cards' },
      ],
    },
  },
  {
    slug: 'plan2build',
    title: 'Plan2Build',
    year: 2026,
    category: 'Web Platform',
    image: { src: plan2buildHero, alt: 'Plan2Build homepage: "Know what your home should cost before you build it" over a modern house' },
    detail: {
      tagline: 'Know what your home should cost before you build it.',
      website: 'https://p2b-phi.vercel.app/',
      client: 'Plan2Build',
      overview:
        'Plan2Build is an independent advisor for families building their own home in India. It puts cost, scope and specification in writing, compares contractor quotes on the same scope, and independently checks the work that cannot be undone. The homeowner keeps the builder they chose; Plan2Build never takes the construction contract.',
      challenge:
        'A family building its own home has had two options: hand the house to a construction company and drop the builder they already chose, or take advice from someone whose real business is selling materials. Most of the work is informal, with no written scope, no record and no recourse. The site had to explain a new kind of service, independent and unbiased, and make its three offers easy to tell apart.',
      approach:
        'We structured the site around the three ways Plan2Build helps: Plan & Decide, Buy & Connect, and Verify & Assure. A tabbed "What we do" section walks through each service from the free Home Cost Check to the Build Record, the Independence Rules spell out how products qualify and how the company earns, and a four-step "How it works" timeline (Plan, Compare, Build, Track) follows the journey from written scope to a building with its own papers. Warm architectural photography and a serif display face give the advice a calm, professional tone.',
      services: ['Product strategy', 'UI/UX design', 'Web development', 'Content structure'],
      technologies: ['Next.js', 'React', 'Vercel'],
      features: [
        { title: 'Home Cost Check', body: 'A free estimate of what a house like yours should cost in your city, from a city rate index built from real sites.' },
        { title: 'Build Plan & Advice', body: 'Cost, scope and specification in writing, with a stage-wise cash-flow plan so the money does not run out mid-build.' },
        { title: 'Quote Comparison', body: 'One standard RFQ pack, so every contractor quote is compared on the same scope rather than the headline number.' },
        { title: 'Six-Gate Assurance', body: 'Six independent checks at the stages that cannot be undone, backed by a capped remedy for a missed structural defect.' },
        { title: 'Materials & Partners', body: 'Verified contractor introductions and materials at a margin disclosed in rupees; finance, insurance, solar and interiors when needed.' },
        { title: 'Build Record', body: 'Every material recorded as specified, bought, installed and verified, so the building gets its papers.' },
      ],
      results:
        'Plan2Build is live with the free Home Cost Check as its entry point, three clearly separated services with their fees stated up front, and a build record that gives a home the papers its land already has.',
      gallery: [
        { src: plan2buildWide, alt: 'Plan2Build: "Three ways we help" with the Plan & Decide card' },
        { src: plan2buildShot1, alt: 'Plan2Build: the "What we do" section with the Home Cost Check' },
        { src: plan2buildShot2, alt: 'Plan2Build: the "How it works" timeline from Plan to Track' },
      ],
    },
  },
  {
    slug: 'human-signals',
    title: 'Human Signals',
    year: 2026,
    category: 'Editorial Website',
    image: {
      src: humanSignalsHero,
      alt: 'Human Signals homepage: "Because people are more than data" over a misty mountain landscape',
      // the statement sits on the left; keep it in the card's crop
      position: '20% 50%',
    },
    detail: {
      tagline: 'Because people are more than data.',
      website: 'https://www.humansignals.in/',
      client: 'Human Signals',
      overview:
        'Human Signals is an independent publication by Alok Jha on psychology, behaviour and the choices we make. A free Signal every week on how we think, choose and behave, and Deep Dives when one question deserves the whole answer, organised into five sections: Mind, Choice, Money, Business, and AI + Human.',
      challenge:
        'A weekly essay publication has to feel like a considered magazine rather than a blog feed: typographic hierarchy, sections readers can browse, reading times, and a clear path from a free Signal to Deep Dives and membership.',
      approach:
        'We designed and built an editorial site with a warm palette and serif headlines, a five-section structure, featured Signals with reading times, Deep Dives, a membership tier and an email subscription flow. The hero pairs the publication’s statement with a handwritten note from the author, so the site opens like a letter rather than a landing page.',
      services: ['Editorial design', 'Web development', 'Content structure', 'Newsletter integration', 'Membership'],
      technologies: ['Next.js', 'React', 'Vercel'],
      features: [
        { title: 'Five sections', body: 'Mind, Choice, Money, Business and AI + Human: five ways to look at the same human story.' },
        { title: 'Weekly Signals', body: 'Short, free reads with reading times, featured on the homepage.' },
        { title: 'Deep Dives', body: 'Longer pieces that work one question all the way through.' },
        { title: 'Membership', body: 'A paid tier alongside the free editions.' },
        { title: 'Subscribe anywhere', body: 'An email subscription band that appears across the site.' },
        { title: 'Search', body: 'Site-wide search over Signals and Deep Dives.' },
      ],
      results: 'Human Signals publishes a free Signal every week at humansignals.in, with Deep Dives and a membership tier.',
      gallery: [
        { src: humanSignalsWide, alt: 'Human Signals: featured Signals with reading times, and the Deep Dives' },
        { src: humanSignalsShot1, alt: 'Human Signals: the five sections, Mind to AI + Human, above the featured Signals' },
        { src: humanSignalsShot2, alt: 'Human Signals: the "Join Human Signals" subscription band over a valley at dusk' },
      ],
    },
  },
  {
    slug: 'human-signals-1',
    title: 'Human Signals 1',
    year: 2026,
    category: 'Web Design',
    image: { src: humanSignals1Hero, alt: 'Human Signals 1 homepage: "Human psychology, behaviour, choices, signals" in acid-green type among photographs on dark green' },
    detail: {
      tagline: 'A photographic, dark-green edition of Human Signals.',
      website: 'https://human-signals-delta.vercel.app/',
      client: 'Human Signals',
      overview:
        'Human Signals 1 is an alternative design for the Human Signals publication, built around a bold dark-green palette: fifty essays across five sections of human behaviour, five founding reports free to download, short essays adapted from the library, and a single search across essays, reports and guides.',
      challenge:
        'The brief was a second face for the publication: a photographic, high-contrast homepage that presents essays, reports and guides as a collection to explore rather than a feed to scroll.',
      approach:
        'We built a site with a mosaic hero of photographs around oversized type, a bento grid for Readers, Essays, Reports and Short Essays, numbered report cards, and a global search. The acid-green on forest-green palette keeps the editorial voice while making the collection feel designed rather than listed.',
      services: ['Art direction', 'UI/UX design', 'Web development', 'Search'],
      technologies: ['Next.js', 'React', 'Vercel'],
      features: [
        { title: 'Mosaic hero', body: 'Photographs frame the publication’s statement in oversized type.' },
        { title: 'Fifty essays', body: 'Essays across five sections of human behaviour.' },
        { title: 'Five founding reports', body: 'Numbered reports, free to download.' },
        { title: 'Short essays', body: 'Fifty shorter reads adapted from the essay library.' },
        { title: 'Bento overview', body: 'Readers, Essays, Reports and Short Essays laid out as a grid.' },
        { title: 'Global search', body: 'One search box across essays, reports and guides.' },
      ],
      results: 'The edition is deployed on Vercel at human-signals-delta.vercel.app.',
      gallery: [
        { src: humanSignals1Wide, alt: 'Human Signals 1: the bento grid for Readers, Essays, Short Essays and Reports' },
        { src: humanSignals1Shot1, alt: 'Human Signals 1: "Five ways of looking at behaviour"' },
        { src: humanSignals1Shot2, alt: 'Human Signals 1: "Questions that are deliberately left open" with report cards' },
      ],
    },
  },
]

export const FEATURED_COUNT = 6

/** The projects that have a case study, in showcase order. */
export const detailedProjects = projects.filter((p): p is DetailedProject => p.detail !== undefined)

/** Copy for the /projects page. */
export const projectsPage = {
  label: 'Our Projects',
  title: 'Turning Vision Into Tangible Results',
  cta: { label: 'Start Your Project', href: '#contact' },
  intro: 'At Broaihai, we craft digital experiences blending strategy, creativity, and technology to build inspiring brands.',
  image: {
    src: heroStudio,
    alt: 'Modern office space with abstract art, dark blue walls, and desks.',
    position: '45.9% 69.3%',
  } satisfies Picture,
  closing: 'Discover how our creative services bring ideas to life.',
  closingCta: { label: 'View All Services', href: '/#services' },
}
