import { ProjectWithValue } from 'app-domain'
import { AppMode } from '../state/mode'
import { ProjectsStore } from '../state/project'

export type ProjectExcerptInfo = Pick<ProjectWithValue, 'title' | 'value' | 'status'>

export const useProjectExcerpt = (
  mode: AppMode,
  { projects, selectedId }: ProjectsStore
): ProjectExcerptInfo | undefined => {
  if (mode !== 'hover' || !selectedId) return
  const pj = projects.find((p) => p.id === selectedId)
  if (!pj) throw Error(`project not found at useProjectExcerpt`)
  return pj
}
