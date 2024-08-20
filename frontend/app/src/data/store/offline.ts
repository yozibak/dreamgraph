import { DataStore, Project, ProjectNotFoundError } from 'app-domain'

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

export const makeOfflineProjectsStore = (): DataStore => {
  let projects: Project[] = exampleProjects
  return {
    fetchProjects: async () => projects,
    createProject: async (newPj) => {
      projects = [...projects, newPj]
      return newPj
    },
    updateProject: async (updatePj) => {
      const pj = projects.find((pj) => pj.id === updatePj.id)
      if (!pj) {
        throw new ProjectNotFoundError(updatePj.id)
      }
      const update = { ...pj, ...updatePj }
      projects = projects.map((pj) => (pj.id === updatePj.id ? update : pj))
      return update
    },
    deleteProject: async (id) => {
      projects = projects.filter((pj) => pj.id !== id)
    },
  }
}
