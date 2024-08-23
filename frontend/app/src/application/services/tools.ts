import { AppModeStore } from '../state/mode'
import { ProjectsStore } from '../state/project'

export type ToolsController = NonNullable<ReturnType<typeof useTools>>

export const useTools = (
  addProject: ProjectsStore['addProject'],
  { mode, setMode }: AppModeStore
) => {
  if (mode === 'detail') return 
  return {
    mode,
    clickAdd: addProject,
    clickArrow: () => setMode('addEdge'),
  }
}
