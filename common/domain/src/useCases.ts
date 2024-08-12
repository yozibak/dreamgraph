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
   * the calculated value of completing this project
   */
  value: number
}

export const makeProject = (pj?: Partial<ProjectEntity>): Project => ({
  id: uuid(),
  title: pj?.title ?? 'new project',
  status: pj?.status ?? DefaultProjectStatus,
  importance: pj?.importance ?? DefaultProjectImportance,
  unlocks: pj?.unlocks?.map(makeProject) ?? [],
  get value() {
    return calcProjectValue(this)
  },
})

export type DataStore = {
  fetchProjects: () => Promise<Project[]>
  getProject: (id: Project['id']) => Promise<Project>
  createProject: (newPj: Omit<Project, 'value'>) => Promise<Project>
  updateProject: (updatedPj: Project) => Promise<void>
  deleteProject: (id: Project['id']) => Promise<void>
}

export const createNewProject =
  (store: DataStore) =>
  async (pj?: Partial<ProjectEntity>): Promise<Project> => {
    const newPj = makeProject(pj)
    return await store.createProject(newPj)
  }

export class ProjectLoopError extends Error {
  constructor() {
    super(`loop detected`)
  }
}

export const updateProjectProperties =
  (store: DataStore) =>
  async (
    project: Project | Project['id'],
    updateProps: Partial<Pick<ProjectEntity, 'importance' | 'status' | 'title'>>
  ) => {
    const original = typeof project === 'string' ? await store.getProject(project) : project
    const update: Parameters<DataStore['updateProject']>[0] = {
      ...original,
      ...updateProps,
    }
    void (await store.updateProject(update))
  }

export const addUnlockingProjects =
  (store: DataStore) => async (project: Project | Project['id'], unlock: Project['id']) => {
    const original = typeof project === 'string' ? await store.getProject(project) : project
    const unlockPj = await store.getProject(unlock)
    const update: Parameters<DataStore['updateProject']>[0] = {
      ...original,
      unlocks: [...original.unlocks, unlockPj],
    }
    if (update.unlocks.length && doesMakeLoop(update)) {
      throw new ProjectLoopError()
    }
    void (await store.updateProject(update))
  }

export const removeProjectUnlocks =
  (store: DataStore) => async (project: Project | Project['id'], unlock: Project['id']) => {
    const original = typeof project === 'string' ? await store.getProject(project) : project
    const unlockPj = await store.getProject(unlock)
    const update: Parameters<DataStore['updateProject']>[0] = {
      ...original,
      unlocks: original.unlocks.filter(p => p !== unlockPj)
    }
    void (await store.updateProject(update))
  }

export const fetchAllProjects = (store: DataStore) => async () => {
  return await store.fetchProjects()
}

export const getProjectDetail = (store: DataStore) => async (id: Project['id']) => {
  const allProjects = await store.fetchProjects()
  const project = await store.getProject(id)
  const availableUnlockOptions = allProjects.filter(
    (other) =>
      project.id !== other.id &&
      !project.unlocks.includes(other) &&
      !doesMakeLoop({...project, unlocks: [...project.unlocks, other]})
  )
  return { project, availableUnlockOptions}
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

  void (await store.deleteProject(target.id))
}

export const makeUseCases = (store: DataStore) => ({
  createNewProject: createNewProject(store),
  updateProjectProperties: updateProjectProperties(store),
  fetchAllProjects: fetchAllProjects(store),
  getProjectDetail: getProjectDetail(store),
  deleteProject: deleteProject(store),
  addUnlockingProjects: addUnlockingProjects(store),
  removeProjectUnlocks: removeProjectUnlocks(store)
})
