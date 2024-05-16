import { createContext, useEffect, useState } from 'react'
import {
  CreateProjectArgs,
  UpdateProjectArgs,
  createProject,
  deleteProject,
  listProjects,
  updateProject,
} from '../network'
import { ProjectRecord } from '../types'

export type ProjectStore = ReturnType<typeof useProjects>
export const ProjectsContext = createContext({} as ProjectStore)

export const useProjects = () => {
  const [projects, setProjects] = useState<ProjectRecord[]>([])

  const fetchProjects = async () => {
    const pjs = await listProjects()
    pjs && setProjects(pjs)
  }

  useEffect(() => {
    if (projects.length) return
    fetchProjects()
  }, [projects, fetchProjects])

  const addProject = async (pj: CreateProjectArgs) => {
    await createProject(pj)
    await fetchProjects()
  }

  const editProject = async (pj: UpdateProjectArgs) => {
    await updateProject(pj)
    await fetchProjects()
  }

  const removeProject = async (projectId: string) => {
    console.log('removeProject', projectId) 
    await deleteProject(projectId)
    await fetchProjects()
  }

  const searchProject = (projectId: string) => {
    return projects.find((pj) => pj.projectId === projectId)
  }

  return {
    projects,
    addProject,
    editProject,
    removeProject,
    searchProject
  }
}
