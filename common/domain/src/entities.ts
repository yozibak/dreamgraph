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
  unlocks: Project['id'][]
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

export type ProjectStatus = 'normal' | 'ongoing' | 'done'

export type ProjectOrId = Project | Project['id']

export type IProjectGraph<PJ extends Project = Project, > = {
  /**
   * the whole projects within the graph
   */
  projects: PJ[]

  /**
   * initialize data
   */
  loadProjects(projects: PJ[]): void

  insertProject(newProject: PJ): void
  updateProject(update: PJ): void
  removeProject(rmProject: PJ['id']): void
  getProjectById(projectId: PJ['id']): PJ

  /**
   * @param from project to update
   * @param to new connection
   */
  connect(from: ProjectOrId, to: ProjectOrId): void

  /**
   * @param from project to update
   * @param to connection to remove
   */
  disconnect(from: ProjectOrId, to: ProjectOrId): void

  /**
   * check if the connection causes cyclic loop in the graph when connected
   */
  willMakeLoop(from: ProjectOrId, to: ProjectOrId): boolean

  /**
   * calculate the value of completing the specified project
   */
  valueOf(projectId: ProjectOrId): number
}
