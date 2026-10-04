export type StackFilter = 'all' | 'web' | 'mobile' | 'ai' | 'cloud'

/** The tools that have a logo drawn in `StackIcons.tsx`. */
export type StackIconId =
  | 'react'
  | 'next'
  | 'typescript'
  | 'javascript'
  | 'node'
  | 'figma'
  | 'python'
  | 'supabase'
  | 'mongodb'
  | 'firebase'
  | 'vercel'
  | 'docker'
  | 'github'

export type Tool = {
  name: string
  /** The two letters on the tile, shown for tools that have no logo yet. */
  mark: string
  /** The tool's logo. */
  icon?: StackIconId
  /** The label under the name. */
  kind: string
  /** The filters it answers to, besides "all". */
  filters: Exclude<StackFilter, 'all'>[]
}

export const stackFilters: { id: StackFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'ai', label: 'AI' },
  { id: 'cloud', label: 'Cloud' },
]

/*
 * Only technologies Broaihai builds with. Next.js, React and Vercel are on the live
 * case studies; the rest is the studio's working stack and should be kept in step with it.
 */
export const tools: Tool[] = [
  { name: 'React', mark: 'Re', icon: 'react', kind: 'Web', filters: ['web'] },
  { name: 'Next.js', mark: 'N.', icon: 'next', kind: 'Web', filters: ['web'] },
  { name: 'TypeScript', mark: 'TS', icon: 'typescript', kind: 'Web', filters: ['web', 'mobile'] },
  { name: 'JavaScript', mark: 'JS', icon: 'javascript', kind: 'Web', filters: ['web'] },
  { name: 'Node.js', mark: 'No', icon: 'node', kind: 'Backend', filters: ['web', 'cloud'] },
  { name: 'Figma', mark: 'Fg', icon: 'figma', kind: 'Design', filters: ['web', 'mobile'] },
  { name: 'React Native', mark: 'RN', kind: 'Mobile', filters: ['mobile'] },
  { name: 'Expo', mark: 'Ex', kind: 'Mobile', filters: ['mobile'] },
  { name: 'Python', mark: 'Py', icon: 'python', kind: 'AI', filters: ['ai', 'cloud'] },
  { name: 'OpenAI', mark: 'OA', kind: 'AI', filters: ['ai'] },
  { name: 'Anthropic', mark: 'An', kind: 'AI', filters: ['ai'] },
  { name: 'LangChain', mark: 'LC', kind: 'AI', filters: ['ai'] },
  { name: 'Supabase', mark: 'Sb', icon: 'supabase', kind: 'Backend', filters: ['cloud', 'mobile'] },
  { name: 'PostgreSQL', mark: 'Pg', kind: 'Database', filters: ['cloud'] },
  { name: 'MongoDB', mark: 'Mg', icon: 'mongodb', kind: 'Database', filters: ['cloud'] },
  { name: 'Firebase', mark: 'Fb', icon: 'firebase', kind: 'Backend', filters: ['cloud', 'mobile'] },
  { name: 'AWS', mark: 'AW', kind: 'Cloud', filters: ['cloud'] },
  { name: 'Vercel', mark: 'Vc', icon: 'vercel', kind: 'Cloud', filters: ['web', 'cloud'] },
  { name: 'Docker', mark: 'Dk', icon: 'docker', kind: 'Cloud', filters: ['cloud'] },
  { name: 'GitHub', mark: 'GH', icon: 'github', kind: 'Cloud', filters: ['cloud'] },
]
