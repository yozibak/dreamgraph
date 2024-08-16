import { DataStore, Project } from 'app-domain'
import type { RawProjectData } from '../api'
import * as api from '../api'

const convertRawData = (raw: RawProjectData): Project => {
  return {
    title: raw.title,
    id: raw.projectId,
    unlocks: raw.unlocks,
    importance: raw.staticValue,
    status: raw.staticStatus,
  }
}

export const makeCloudProjectStore = (): DataStore => {
  return {
    fetchProjects: async () => {
      const pjs = await api.listProjects()
      return pjs.map(convertRawData)
    },
    createProject: async (newPj) => {
      // TODO: should pass id here
      await api.createProject({
        title: newPj.title,
        unlocks: newPj.unlocks,
      })
      return newPj
    },
    updateProject: async (updatePj) => {
      const updated = await api.updateProject({
        projectId: updatePj.id,
        title: updatePj.title ?? '',
        unlocks: updatePj.unlocks ?? [],
        staticValue: updatePj.importance ?? 0,
        staticStatus: updatePj.status ?? 'normal',
      })
      return convertRawData(updated)
    },
    deleteProject: async (id) => {
      await api.deleteProject(id)
    },
  }
}
