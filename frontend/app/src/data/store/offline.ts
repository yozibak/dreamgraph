import { DataStore, makeProject, Project } from 'use-cases'

export type ProjectStore = ReturnType<typeof makeOfflineProjectsStore>

export const makeOfflineProjectsStore = (): DataStore => {
  let projects: Project[] = []
  return {
    getProject: async (id) => {
      const pj = projects.find((pj) => pj.id === id)
      if (!pj) {
        throw Error(`could not find the project`)
      }
      return pj
    },
    fetchProjects: async () => projects,
    createProject: async (newPj) => {
      const newProject = makeProject(newPj)
      projects = [...projects, newProject]
      return newProject
    },
    updateProject: async (updatePj) => {
      projects = projects.map((pj) => (pj.id === updatePj.id ? updatePj : pj))
      return updatePj
    },
    deleteProject: async (id) => {
      projects = projects.filter((pj) => pj.id !== id)
    },
  }
}
