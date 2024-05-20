import { DynamicProjectData, DynamicStatus, StaticProjectData } from '../../types'

export const calcProjectDynamicValue = (
  pj: StaticProjectData,
  getProject: (id: string) => StaticProjectData | undefined
): number => {
  if (pj.unlocks.length === 0) return pj.staticValue
  const unlocksValues = pj.unlocks.map((pid) => {
    const unlockPj = getProject(pid)
    if (unlockPj) return calcProjectDynamicValue(unlockPj, getProject)
    else {
      console.warn('project not found', pid)
      return 0
    }
  })
  return unlocksValues.reduce((a, b) => a + b, pj.staticValue)
}

export const calcProjectDynamicStatus = (
  pj: StaticProjectData,
  filterPjByUnlockId: (id: string) => StaticProjectData[]
): DynamicStatus => {
  const dependsOn = filterPjByUnlockId(pj.projectId)
  if (dependsOn.length === 0) return pj.staticStatus
  if (dependsOn.every((p) => p.staticStatus === 'done')) return pj.staticStatus
  return 'blocked'
}

export const updateImportantNodesAsUrgent = (pjs: DynamicProjectData[]): DynamicProjectData[] => {
  const urgentPjs = determineUrgentProjects(pjs)
  return pjs.map((pj) =>
    urgentPjs.includes(pj.projectId)
      ? {
          ...pj,
          dynamicStatus: 'urgent',
        }
      : pj
  )
}

export const determineUrgentProjects = (pjs: DynamicProjectData[]): string[] => {
  return pjs
    .filter((pj) => pj.dynamicStatus === 'normal')
    .sort((a, b) => b.dynamicValue - a.dynamicValue)
    .slice(0, 3)
    .map((pj) => pj.projectId)
}
