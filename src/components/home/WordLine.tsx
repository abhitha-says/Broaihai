import type { WordPair } from '@/content/types'
import { Ticker } from '@/components/ui/Ticker'
import styles from './WordLine.module.css'

type Props = {
  id: string
  words: readonly WordPair[]
  /** The first line tilts up and runs left; the second tilts down and runs right. */
  direction: 'left' | 'right'
}

export function WordLine({ id, words, direction }: Props) {
  return (
    <section id={id} className={styles.band} aria-label={words.map(([a, b]) => `${a}. ${b}.`).join(' ')}>
      <div className={styles.tilt} data-direction={direction}>
        <Ticker speed={80} gap={30} direction={direction}>
          {words.map(([strong, ghost]) => (
            <div key={strong} className={styles.phrase} aria-hidden>
              <span className={styles.word}>
                <span className="t-display">{strong}</span>
                <span className={`t-display ${styles.dot}`}>.</span>
              </span>
              <span className={`${styles.word} ${styles.ghost}`}>
                <span className="t-display">{ghost}</span>
                <span className="t-display">.</span>
              </span>
            </div>
          ))}
        </Ticker>
      </div>
    </section>
  )
}
