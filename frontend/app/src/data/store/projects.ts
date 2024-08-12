import { useEffect, useState } from 'react'
import { DataStore, makeProject } from 'use-cases'
import * as api from '../api'
import { Project } from 'use-cases'

export type RawProjectData = Omit<Project, 'value' | 'unlocks'> & {
  unlocks: string[]
}

export type ProjectStore = ReturnType<typeof useProjectsStore>

export const useProjectsStore = (): DataStore => {
  const [projects, setProjects] = useState<RawProjectData[]>([])

  const convertRawProject = (raw: RawProjectData): Project => {
    return makeProject({
      ...raw,
      get unlocks() {
        if (raw.unlocks.length === 0) return []
        return projects.filter((pj) => raw.unlocks.includes(pj.id)).map(convertRawProject)
      },
    })
  }

  const initProjects = async () => {
    const pjs = await api.listProjects()
    pjs && setProjects(pjs)
  }
  
  const fetchProjects = async (): Promise<Project[]> => {
    return projects.map(convertRawProject)
  }

  useEffect(() => {
    if (projects.length) return
    initProjects()
  }, [projects, initProjects])

  const createProject: DataStore['createProject'] = async (newPj) => {
    const newProject = await api.createProject(newPj)
    if (newProject) {
      setProjects([...projects, newProject])
      return newProject
    }
  }

  const updateProject = async (input: UpdateProjectInput) => {
    const updated = await api.updateProject(input)
    if (updated) {
      setProjects(projects.map((pj) => (pj.projectId === updated.projectId ? updated : pj)))
      return updated
    }
  }

  const deleteProject = async (projectId: string) => {
    const result = await api.deleteProject(projectId)
    if (result) {
      setProjects(projects.filter((pj) => pj.projectId !== projectId))
    }
    return result
  }

  return {
    projects,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
