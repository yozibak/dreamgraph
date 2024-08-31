import { ProjectWithValue } from 'app-domain'
import { InteractionStore, Position } from '../state/interaction'
import { ProjectsStore } from '../state/project'

export type ProjectTooltipInfo = {
  shouldOpen: boolean
  nodePosition: Position
  projectExcerpt?: Pick<ProjectWithValue, 'title' | 'value' | 'status' | 'importance'>
  clickOnInfo: () => void
}

export const useProjectTooltip = (
  { mode, hoverPosition, setMode }: InteractionStore, 
  { projects, selectedId }: ProjectsStore
): ProjectTooltipInfo => {
  const shouldOpen = mode === 'hover' && !!selectedId && !!hoverPosition
  const projectExcerpt = getPjExcerpt()

  const clickOnInfo = () => {
    setMode('detail')
  }

  return {
    shouldOpen,
    nodePosition: hoverPosition || { x: 0, y: 0 },
    projectExcerpt,
    clickOnInfo
  }

  function getPjExcerpt() {
    if (!selectedId) return
    return projects.find((p) => p.id === selectedId)
  }
}
