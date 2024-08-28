import { ProjectDataRepository, Project, ProjectNotFoundError } from 'app-domain'

const exampleProjects: Project[] = [
  {
    id: '1',
    title: 'first',
    status: 'normal',
    importance: 3,
    unlocks: ['2', '3'],
  },
  {
    id: '2',
    title: 'second',
    status: 'normal',
    importance: 3,
    unlocks: ['3'],
  },
  {
    id: '3',
    title: 'third',
    status: 'normal',
    importance: 3,
    unlocks: [],
  },
]

const ProjectsStorageKey = 'dreamgraph-projects-local'

export const makeLocalRepository = (): ProjectDataRepository => {
  const data = localStorage.getItem(ProjectsStorageKey)
  let projects: Project[] = data ? JSON.parse(data) as Project[] : exampleProjects
  function updateData(newProjectsData: Project[]) {
    projects = newProjectsData
    localStorage.setItem(ProjectsStorageKey, JSON.stringify(projects))
  }
  return {
    fetchProjects: async () => projects,
    createProject: async (newPj) => {
      updateData([...projects, newPj])
      return newPj
    },
    updateProject: async (updatePj) => {
      const pj = projects.find((pj) => pj.id === updatePj.id)
      if (!pj) {
        throw new ProjectNotFoundError(updatePj.id)
      }
      const update = { ...pj, ...updatePj }
      updateData(projects.map((pj) => (pj.id === updatePj.id ? update : pj)))
      return update
    },
    deleteProject: async (id) => {
      updateData(projects.filter((pj) => pj.id !== id))
    },
  }
}
