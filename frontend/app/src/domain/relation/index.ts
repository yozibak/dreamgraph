import { StaticProjectData } from '../../types'

export const getUnlockProjects = (
  projects: StaticProjectData[],
  selected: StaticProjectData
): StaticProjectData[] => {
  return projects.filter((pj) => selected.unlocks.includes(pj.projectId))
}

export const filterUnlockOptions = (wholeProjects: StaticProjectData[], selected: StaticProjectData) => {
  return wholeProjects.filter(
    (pj) => selected.projectId !== pj.projectId && !selected.unlocks.includes(pj.projectId)
  )
}
