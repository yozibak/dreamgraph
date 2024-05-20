import { DynamicStatus, StaticProjectData } from '../../types'

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
  if (dependsOn.every(p => p.staticStatus === 'done')) return pj.staticStatus
  return 'blocked'
}
