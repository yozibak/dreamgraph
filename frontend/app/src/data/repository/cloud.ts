/* eslint-disable no-console */
import { ProjectDataRepository, Project, ProjectImportance, ProjectStatus } from 'app-domain'
import type { RawProjectData } from '../api'
import * as api from '../api'

const convertRawData = (raw: RawProjectData): Project => {
  if (raw.importance < 1 || raw.importance > 6 || !Number.isInteger(raw.importance)) {
    console.error(`invalid importance value detected: `, raw.importance)
    raw.importance = 3
  }
  if (!['normal', 'ongoing', 'done'].includes(raw.status)) {
    console.error(`invalid status detected: `, raw.status)
    raw.status = 'normal'
  }
  return {
    title: raw.title,
    id: raw.projectId,
    unlocks: raw.unlocks,
    importance: raw.importance as ProjectImportance,
    status: raw.status as ProjectStatus,
  }
}

export const makeCloudRepository = (): ProjectDataRepository => {
  return {
    fetchProjects: async () => {
      const pjs = await api.listProjects()
      return pjs.map(convertRawData)
    },
    createProject: async (newPj) => {
      await api.createProject({
        ...newPj,
        projectId: newPj.id,
      })
      return newPj
    },
    updateProject: async (updatePj) => {
      const updated = await api.updateProject({
        ...updatePj,
        projectId: updatePj.id,
      })
      return convertRawData(updated)
    },
    deleteProject: async (id) => {
      await api.deleteProject(id)
    },
  }
}
