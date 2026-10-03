import type { DetailedProject } from '@/content/types'
import { Reveal } from './Reveal'
import styles from './ProjectDetails.module.css'

type Row = { title: string; body: string } | { title: string; chips: string[] } | { title: string; features: { title: string; body: string }[] }

/**
 * The reference's detail band: 40px above and below, rows 40px apart, each a
 * 400px heading beside the copy. Rows with nothing to say are left out.
 */
function Details({ id, rows }: { id: string; rows: (Row | null)[] }) {
  const present = rows.filter((r): r is Row => r !== null)
  if (present.length === 0) return null
  return (
    <section className={styles.section} id={id}>
      <div className={styles.container}>
        {present.map((row) => (
          <Reveal key={row.title} className={styles.row}>
            <h3 className={`t-h3 ${styles.rowTitle}`}>{row.title}</h3>
            {'chips' in row ? (
              <ul className={styles.chips}>
                {row.chips.map((chip) => (
                  <li key={chip} className={`t-body-medium ${styles.chip}`}>
                    {chip}
                  </li>
                ))}
              </ul>
            ) : 'features' in row ? (
              <ul className={styles.features}>
                {row.features.map((f) => (
                  <li key={f.title} className={styles.feature}>
                    <h4 className={`t-h5 ${styles.featureTitle}`}>{f.title}</h4>
                    <p className={`t-body ${styles.featureBody}`}>{f.body}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={`t-body-lg ${styles.rowBody}`}>{row.body}</p>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

const list = <T,>(items: T[] | undefined) => (items && items.length > 0 ? items : null)

/** Overview, challenge and approach: what the project is and how it was built. */
export function ProjectOverview({ project }: { project: DetailedProject }) {
  const { detail } = project
  return (
    <Details
      id="overview"
      rows={[
        { title: 'Project Overview', body: detail.overview },
        detail.challenge ? { title: 'The Challenge', body: detail.challenge } : null,
        { title: 'Approach', body: detail.approach },
      ]}
    />
  )
}

/** The outcome, then what shipped, what we did and what it runs on. */
export function ProjectResults({ project }: { project: DetailedProject }) {
  const { detail } = project
  const features = list(detail.features)
  const services = list(detail.services)
  const technologies = list(detail.technologies)
  return (
    <Details
      id="results"
      rows={[
        { title: 'Final Results', body: detail.results },
        features ? { title: 'Key Features', features } : null,
        services ? { title: 'What We Did', chips: services } : null,
        technologies ? { title: 'Technology', chips: technologies } : null,
      ]}
    />
  )
}
