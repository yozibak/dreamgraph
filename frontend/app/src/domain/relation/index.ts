import { StaticProjectData } from '../../types'

export const getUnlockProjects = (
  projects: StaticProjectData[],
  selected: StaticProjectData
): StaticProjectData[] => {
  return projects.filter((pj) => selected.unlocks.includes(pj.projectId))
}

export const filterUnlockOptions = (
  wholeProjects: StaticProjectData[],
  selected: StaticProjectData
) => {
  const getPj = (id: string) => {
    const pj = wholeProjects.find((p) => p.projectId === id)
    if (!pj) throw new Error('project not found')
    return pj
  }
  return wholeProjects.filter(
    (pj) =>
      selected.projectId !== pj.projectId &&
      !selected.unlocks.includes(pj.projectId) &&
      !doesMakeLoop(selected, pj, getPj)
  )
}

export const doesMakeLoop = (
  root: StaticProjectData,
  target: StaticProjectData,
  getPj: (id: string) => StaticProjectData
): boolean => {
  if (target.unlocks.length === 0) return false
  if (target.unlocks.includes(root.projectId)) return true
  return target.unlocks.map(getPj).some((pj) => doesMakeLoop(root, pj, getPj))
}
