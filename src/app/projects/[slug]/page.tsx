import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectOverview, ProjectResults } from '@/components/project/ProjectDetails'
import { ProjectGallery } from '@/components/project/ProjectGallery'
import { NextProject } from '@/components/project/NextProject'
import { FaqSection } from '@/components/faq/FaqSection'
import { detailedProjects } from '@/content/projects'
import { contactCta } from '@/content/site'

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return detailedProjects.map((p) => ({ slug: p.slug }))
}

/** Only the projects with a case study exist; anything else is a 404. */
export const dynamicParams = false

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = detailedProjects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.title} – ${project.category} Project`,
    description: project.detail.tagline,
    openGraph: { images: [{ url: project.image.src.src }] },
  }
}

/**
 * One template for every case study, in the reference's order: hero, overview
 * and approach, the screens, the results, then the next project and the FAQs.
 */
export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const index = detailedProjects.findIndex((p) => p.slug === slug)
  const project = detailedProjects[index]
  if (!project) notFound()
  const next = detailedProjects[(index + 1) % detailedProjects.length]!

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectResults project={project} />
      <NextProject next={next} closing="Have a project in mind? Let’s build it together." cta={contactCta} />
      <FaqSection />
    </>
  )
}
