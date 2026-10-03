import type { Metadata } from 'next'
import { ProjectsHero } from '@/components/projects/ProjectsHero'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { FaqSection } from '@/components/faq/FaqSection'
import { workIntro } from '@/content/home'
import { projects, projectsPage } from '@/content/projects'

export const metadata: Metadata = {
  title: 'Projects',
  description: projectsPage.intro,
}

export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectShowcase
        id="projects"
        label={workIntro.label}
        title={workIntro.title}
        projects={projects}
        closing={projectsPage.closing}
        cta={projectsPage.closingCta}
        spacing="relaxed"
      />
      <FaqSection />
    </>
  )
}
