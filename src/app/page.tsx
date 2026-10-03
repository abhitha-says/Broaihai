import { Hero } from '@/components/home/Hero'
import { Difference } from '@/components/home/Difference'
import { WordLine } from '@/components/home/WordLine'
import { Impact } from '@/components/home/Impact'
import { Services } from '@/components/home/Services'
import { Capabilities } from '@/components/home/Capabilities'
import { Stack } from '@/components/home/Stack'
import { Testimonials } from '@/components/home/Testimonials'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { FaqSection } from '@/components/faq/FaqSection'
import { wordLines, workIntro } from '@/content/home'
import { FEATURED_COUNT, projects } from '@/content/projects'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Difference />
      <WordLine id="scroll-line1" words={wordLines.first} direction="left" />
      <Impact />
      <WordLine id="scroll-line2" words={wordLines.second} direction="right" />
      <Services />
      <Capabilities />
      <ProjectShowcase
        id="projects"
        label={workIntro.label}
        title={workIntro.title}
        projects={projects.slice(0, FEATURED_COUNT)}
        closing={workIntro.closing}
        cta={workIntro.cta}
      />
      <Stack />
      <Testimonials />
      <FaqSection />
    </>
  )
}
