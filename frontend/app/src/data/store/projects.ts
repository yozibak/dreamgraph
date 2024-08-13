import { convertEntity, DataStore, makeProject } from 'use-cases'
import * as api from '../api'
import type { RawProjectData } from '../api'
import { Project } from 'use-cases'

const convertRawData = (raw: RawProjectData): Project => {
  const pj: Project = convertEntity({
    title: raw.title,
    id: raw.projectId,
    unlocks: [], // handle this later
    importance: raw.staticValue,
    status: raw.staticStatus,
  })
  return pj
}

// TODO: prob more than O(N^2) ?
const convertProjects = (rawProjects: RawProjectData[]): Project[] => {
  const pjs = rawProjects.map(convertRawData)
  rawProjects.forEach((raw, idx) => {
    const pj = pjs[idx]
    raw.unlocks.forEach((unlockId) => {
      const unlock = pjs.find((pj) => pj.id === unlockId)
      if (!unlock) {
        throw Error(`could not find unlock pj`)
      }
      pj.unlocks.push(unlock)
    })
  })
  return pjs
}

const convertToRawData = (pj: Project): RawProjectData => {
  return {
    projectId: pj.id,
    title: pj.title,
    unlocks: pj.unlocks.map((p) => p.id),
    staticValue: pj.importance,
    staticStatus: pj.status,
  }
}

export const makeCloudProjectStore = (): DataStore => {
  let projects: Project[] = []
  return {
    getProject: async (id) => {
      const pj = projects.find((pj) => pj.id === id)
      if (!pj) {
        throw Error(`could not find the project`)
      }
      return pj
    },
    fetchProjects: async () => {
      if (!projects.length) {
        const pjs = await api.listProjects()
        projects = pjs ? convertProjects(pjs) : []
      }
      return projects
    },
    createProject: async (newPj) => {
      const newProject = makeProject(newPj)
      await api.createProject(convertToRawData(newProject))
      projects = [...projects, newProject]
      return newProject
    },
    updateProject: async (updatePj) => {
      await api.updateProject(convertToRawData(updatePj))
      projects = projects.map((pj) => (pj.id === updatePj.id ? updatePj : pj))
      return updatePj
    },
    deleteProject: async (id) => {
      await api.deleteProject(id)
      projects = projects.filter((pj) => pj.id !== id)
    },
  }
}
