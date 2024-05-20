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

  const createProject = async (pj: CreateProjectInput) => {
    const newPj = await api.createProject(pj)
    await fetchProjects()
    return newPj
  }

  const updateProject = async (pj: UpdateProjectInput) => {
    const result = await api.updateProject(pj)
    await fetchProjects()
    return result
  }

  const deleteProject = async (projectId: string) => {
    const result = await api.deleteProject(projectId)
    await fetchProjects()
    return result
  }

  return {
    projects,
    createProject,
    updateProject,
    deleteProject,
  }
}
