import { v4 as uuid } from 'uuid'
import {
  DefaultProjectImportance,
  DefaultProjectStatus,
  Project as ProjectEntity,
  calcProjectValue,
  doesMakeLoop,
} from './project'

export type Project = ProjectEntity & {
  /**
   * UUID
   */
  id: string
  /**
   * the calculated value of completing this project
   */
  value: number
}

export const makeProject = (pj?: Partial<ProjectEntity>): Project => ({
  id: uuid(),
  title: pj?.title ?? 'new project',
  status: pj?.status ?? DefaultProjectStatus,
  importance: pj?.importance ?? DefaultProjectImportance,
  unlocks: pj?.unlocks ?? [],
  get value() {
    return calcProjectValue(this)
  },
})

export type DataStore = {
  fetchProjects: () => Promise<Project[]>
  getProject: (id: Project['id']) => Promise<Project>
  createProject: (newPj: Omit<Project, 'value'>) => Promise<void>
  updateProject: (updatedPj: Project) => Promise<void>
  deleteProject: (id: Project['id']) => Promise<void>
}

export const createNewProject = (store: DataStore) => async (pj?: Partial<ProjectEntity>) => {
  const newPj = makeProject(pj)
  void (await store.createProject(newPj))
}

export class ProjectLoopError extends Error {
  constructor() {
    super(`loop detected`)
  }
}

export const updateProjectProperties =
  (store: DataStore) =>
  async (project: Project | Project['id'], updateProps: Partial<ProjectEntity>) => {
    const original = typeof project === 'string' ? await store.getProject(project) : project
    const update: Parameters<DataStore['updateProject']>[0] = {
      ...original,
      ...updateProps,
    }
    if (update.unlocks.length && doesMakeLoop(update)) {
      throw new ProjectLoopError()
    }
    void (await store.updateProject(update))
  }

export const fetchAllProjects = (store: DataStore) => async () => {
  return await store.fetchProjects()
}

export const getProject = (store: DataStore) => async (id: Project['id']) => {
  return await store.getProject(id)
}

export const deleteProject = (store: DataStore) => async (project: Project | Project['id']) => {
  const target = typeof project === 'string' ? await store.getProject(project) : project

  // disconnect target if present in unlocks
  const unlockTargetProjects = (await store.fetchProjects()).filter((pj) =>
    pj.unlocks.includes(target)
  )
  if (unlockTargetProjects.length) {
    for (const pj of unlockTargetProjects) {
      store.updateProject({ ...pj, unlocks: pj.unlocks.filter((p) => p !== target) })
    }
  }

  await store.deleteProject(target.id)
}
