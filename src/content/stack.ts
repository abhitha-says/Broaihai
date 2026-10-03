export type StackFilter = 'all' | 'web' | 'mobile' | 'ai' | 'cloud'

export type Tool = {
  name: string
  /** The two letters on the tile; a compact mark instead of a logo. */
  mark: string
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
  { name: 'React', mark: 'Re', kind: 'Web', filters: ['web'] },
  { name: 'Next.js', mark: 'N.', kind: 'Web', filters: ['web'] },
  { name: 'TypeScript', mark: 'TS', kind: 'Web', filters: ['web', 'mobile'] },
  { name: 'JavaScript', mark: 'JS', kind: 'Web', filters: ['web'] },
  { name: 'Node.js', mark: 'No', kind: 'Backend', filters: ['web', 'cloud'] },
  { name: 'Figma', mark: 'Fg', kind: 'Design', filters: ['web', 'mobile'] },
  { name: 'React Native', mark: 'RN', kind: 'Mobile', filters: ['mobile'] },
  { name: 'Expo', mark: 'Ex', kind: 'Mobile', filters: ['mobile'] },
  { name: 'Python', mark: 'Py', kind: 'AI', filters: ['ai', 'cloud'] },
  { name: 'OpenAI', mark: 'OA', kind: 'AI', filters: ['ai'] },
  { name: 'Anthropic', mark: 'An', kind: 'AI', filters: ['ai'] },
  { name: 'LangChain', mark: 'LC', kind: 'AI', filters: ['ai'] },
  { name: 'Supabase', mark: 'Sb', kind: 'Backend', filters: ['cloud', 'mobile'] },
  { name: 'PostgreSQL', mark: 'Pg', kind: 'Database', filters: ['cloud'] },
  { name: 'MongoDB', mark: 'Mg', kind: 'Database', filters: ['cloud'] },
  { name: 'Firebase', mark: 'Fb', kind: 'Backend', filters: ['cloud', 'mobile'] },
  { name: 'AWS', mark: 'AW', kind: 'Cloud', filters: ['cloud'] },
  { name: 'Vercel', mark: 'Vc', kind: 'Cloud', filters: ['web', 'cloud'] },
  { name: 'Docker', mark: 'Dk', kind: 'Cloud', filters: ['cloud'] },
  { name: 'GitHub', mark: 'GH', kind: 'Cloud', filters: ['cloud'] },
]
