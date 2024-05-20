import { CreateProjectInput, UpdateProjectInput } from 'common'
import { useEffect, useState } from 'react'
import { StaticProjectData } from '../../types'
import * as api from '../api'

export type ProjectStore = ReturnType<typeof useProjects>

export const useProjects = () => {
  const [projects, setProjects] = useState<StaticProjectData[]>([])

  const fetchProjects = async () => {
    const pjs = await api.listProjects()
    pjs && setProjects(pjs)
  }

  useEffect(() => {
    if (projects.length) return
    fetchProjects()
  }, [projects, fetchProjects])

  const createProject = async (input: CreateProjectInput) => {
    const newProject = await api.createProject(input)
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
    createProject,
    updateProject,
    deleteProject,
  }
}
