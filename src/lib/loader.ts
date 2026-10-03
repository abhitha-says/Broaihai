/**
 * Calls `run` once the opening loader has let go of the page (the root element
 * loses `is-loading`), or straight away when no loader is playing. Returns a
 * function that cancels the wait. Browser only: call it from an effect.
 */
export function whenLoaderDone(run: () => void): () => void {
  const root = document.documentElement
  if (!root.classList.contains('is-loading')) {
    run()
    return () => {}
  }
  const watcher = new MutationObserver(() => {
    if (root.classList.contains('is-loading')) return
    watcher.disconnect()
    run()
  })
  watcher.observe(root, { attributes: true, attributeFilter: ['class'] })
  return () => watcher.disconnect()
}
