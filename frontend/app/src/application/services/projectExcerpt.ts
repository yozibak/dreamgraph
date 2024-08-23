import { AppMode } from '../state/mode'
import { ProjectsStore } from '../state/project'

export const useProjectExcerpt = (mode: AppMode, { projects, selectedId }: ProjectsStore) => {
  if (mode !== 'hover' || !selectedId) return
  const pj = projects.find((p) => p.id === selectedId)
  if (!pj) throw Error(`project not found at useProjectExcerpt`)
  return pj
}
