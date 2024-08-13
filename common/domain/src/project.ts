export type Project = {
  /**
   * data persistence
   */
  id: string
  /**
   * project description
   */
  title: string

  /**
   * projects that can be unlocked by completing this project
   */
  unlocks: Project[]
  /**
   * perceived importance of this project
   */
  importance: ProjectImportance
  /**
   * status of this project
   */
  status: ProjectStatus
}

export type ProjectImportance = 1 | 2 | 3 | 4 | 5
export const DefaultProjectImportance: ProjectImportance = 3

export type ProjectStatus = 'normal' | 'ongoing' | 'done'
export const DefaultProjectStatus: ProjectStatus = 'normal'

export const calcProjectValue = (pj: Project): number => {
  return pj.unlocks.map(calcProjectValue).reduce((p, c) => p + c, pj.importance)
}

export const doesMakeLoop = (pj: Project): boolean => {
  const checkUnlocks = (unlocks: Project[]): boolean =>
    unlocks.some((unlock) => unlock.id === pj.id || checkUnlocks(unlock.unlocks))
  return checkUnlocks(pj.unlocks)
}

export const connectProjects = (pj: Project, ...conn: Project[]) => {
  pj.unlocks.push(...conn)
}
