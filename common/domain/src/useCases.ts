import { v4 as uuid } from 'uuid'
import { IProjectGraph, Project, ProjectImportance, ProjectOrId, ProjectStatus } from './entities'

/**
 * initialize project with default value
 */
export const initProject = (pj?: Partial<Project>): Project => ({
  id: pj?.id ?? uuid(),
  title: pj?.title ?? 'new project',
  status: pj?.status ?? 'normal',
  importance: pj?.importance ?? 3,
  unlocks: pj?.unlocks ?? [],
})

/**
 * project data object with related object references
 */
type ProjectWithRelation = Omit<Project, 'unlocks'> & { unlocks: ProjectWithRelation[] }

export type ProjectGraph = IProjectGraph<Project>
export const makeProjectGraph = (): ProjectGraph => {
  const projectTable: Record<string, Project> = {}

  const _getProjectUnlockGraph = (projectId: string): ProjectWithRelation => {
    const pj = projectTable[projectId]
    return {
      ...pj,
      unlocks: pj.unlocks.map(_getProjectUnlockGraph),
    }
  }

  const getPj = (id: Project['id']): Project => {
    if (id in projectTable) return projectTable[id]
    throw new ProjectNotFoundError(id)
  }

  const id = (pjOrId: ProjectOrId): Project['id'] =>
    typeof pjOrId === 'string' ? pjOrId : pjOrId.id
  const pj = (pjOrId: ProjectOrId): Project => (typeof pjOrId === 'string' ? getPj(pjOrId) : pjOrId)

  return {
    get projects() {
      return Object.values(projectTable).map((pj) => pj)
    },
    loadProjects(projects) {
      projects.forEach((pj) => {
        projectTable[pj.id] = pj
      })
    },
    getProjectById(projectId) {
      return getPj(projectId)
    },
    insertProject(newProject) {
      projectTable[newProject.id] = newProject
    },
    updateProject(update) {
      projectTable[update.id] = update
    },
    removeProject(rmProjectId) {
      delete projectTable[rmProjectId]
    },
    connect(from, to) {
      pj(from).unlocks.push(id(to))
    },
    disconnect(from, to) {
      const unlocks = pj(from).unlocks
      pj(from).unlocks = unlocks.filter((u) => u !== id(to))
    },
    willMakeLoop(from, to) {
      const fromId = id(from)
      const checkUnlocks = (unlocks: ProjectWithRelation[]): boolean =>
        unlocks.some((unlock) => unlock.id === fromId || checkUnlocks(unlock.unlocks))
      const toPj = _getProjectUnlockGraph(id(to))
      return checkUnlocks(toPj.unlocks)
    },
    valueOf(project) {
      const calcPjValue = (pj: ProjectWithRelation): number =>
        pj.unlocks.map(calcPjValue).reduce((p, c) => p + c, pj.importance)
      return calcPjValue(_getProjectUnlockGraph(id(project)))
    },
  }
}

export class ProjectNotFoundError extends Error {
  constructor(projectId: Project['id']) {
    super(`could not find ${projectId} in the graph`)
  }
}

export class ProjectLoopError extends Error {
  constructor() {
    super(`loop detected`)
  }
}

export type ProjectDataRepository = {
  fetchProjects: () => Promise<Project[]>
  createProject: (newPj: Project) => Promise<Project>
  updateProject: (updatedPj: Partial<Project> & Pick<Project, 'id'>) => Promise<Project>
  deleteProject: (id: Project['id']) => Promise<void>
}

export type RelationalProjectExcerpt = {
  id: string
  title: string
}

export type ProjectDetail = Omit<Project, 'unlocks'> & {
  unlocks: RelationalProjectExcerpt[]
  availableUnlockOptions: RelationalProjectExcerpt[]
}

export type ProjectWithValue = Project & {
  value: number
}

export type UseCases = ReturnType<typeof makeGraphUseCases>

export const makeGraphUseCases = (repo: ProjectDataRepository) => {
  const projectGraph: ProjectGraph = makeProjectGraph()
  const getPj = (pjOrId: ProjectOrId) =>
    typeof pjOrId === 'string'
      ? projectGraph.getProjectById(pjOrId)
      : projectGraph.getProjectById(pjOrId.id)
  return {
    /**
     * initialize the graph nodes with stored data
     */
    initialize: async () => {
      const projects = await repo.fetchProjects()
      projectGraph.loadProjects(projects)
    },

    insertNewProject: async (pj?: Partial<Project>) => {
      const newPj = initProject(pj)
      await repo.createProject(newPj)
      projectGraph.insertProject(newPj)
      return newPj
    },

    updateProjectProperties: async (
      target: ProjectOrId,
      updateProps: Partial<Pick<Project, 'importance' | 'status' | 'title'>>
    ) => {
      const original = getPj(target)
      const update = { ...original, ...updateProps }
      await repo.updateProject(update)
      projectGraph.updateProject(update)
    },

    /**
     * connect projects checking potential loop caused by the connection.
     * rejects the operation if any loop detected
     */
    connectUnlockingProject: async (target: ProjectOrId, unlock: Project['id']) => {
      const project = getPj(target)
      if (projectGraph.willMakeLoop(project, unlock)) {
        throw new ProjectLoopError()
      }
      await repo.updateProject({ ...project, unlocks: [...project.unlocks, unlock] })
      projectGraph.connect(target, unlock)
    },

    disconnectProjectUnlocks: async (target: ProjectOrId, unlock: Project['id']) => {
      const project = getPj(target)
      const update = { ...project, unlocks: project.unlocks.filter((p) => p !== unlock) }
      await repo.updateProject(update)
      projectGraph.updateProject(update)
    },

    /**
     * remove a projet from graph,
     * also removes any connections towards the removed project
     */
    removeProject: async (target: ProjectOrId) => {
      const project = getPj(target)

      // disconnect target pj in others' unlocks
      const relatedPjs = projectGraph.projects.filter((pj) => pj.unlocks.includes(project.id))
      relatedPjs.forEach((rel) => projectGraph.disconnect(rel, project))
      await Promise.all(
        relatedPjs.map((relatedPj) =>
          repo.updateProject({
            ...relatedPj,
            unlocks: relatedPj.unlocks.filter((p) => p !== project.id),
          })
        )
      )
      await repo.deleteProject(project.id)
      projectGraph.removeProject(project.id)
    },

    readAll: (): ProjectWithValue[] => {
      return projectGraph.projects.map((pj) => ({
        ...pj,
        value: projectGraph.valueOf(pj.id),
      }))
    },

    getProjectById: (id: Project['id']) => {
      return projectGraph.getProjectById(id)
    },

    getProjectDetail: (id: Project['id']): ProjectDetail => {
      const allProjects = projectGraph.projects
      const project = projectGraph.getProjectById(id)
      const availableUnlockOptions = allProjects.filter(
        (other) => project.id !== other.id && !project.unlocks.includes(other.id)
      )
      const unlocks = project.unlocks.map(id => ({ id, title: projectGraph.getProjectById(id).title }))
      return { ...project, unlocks, availableUnlockOptions }
    },
  }
}

export const ProjectImportanceExpression: Record<ProjectImportance, string> = {
  1: 'Not Important',
  2: 'Slightly Important',
  3: 'Important',
  4: 'Very Important',
  5: 'Critical'
}

export const ProjectStatusExpression: Record<ProjectStatus, string> = {
  normal: 'Not Started',
  ongoing: 'In Progress',
  done: 'Done'
}
