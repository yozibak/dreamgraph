import { CreateProjectInput, UpdateProjectInput } from 'common'
import { createContext, useEffect, useState } from 'react'
import { createProject, deleteProject, listProjects, updateProject } from '../network'
import { Project } from '../types'

export type ProjectStore = ReturnType<typeof useProjects>
export const ProjectsContext = createContext({} as ProjectStore)

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])

  const fetchProjects = async () => {
    const pjs = await listProjects()
    pjs && setProjects(pjs)
  }

  useEffect(() => {
    if (projects.length) return
    fetchProjects()
  }, [projects, fetchProjects])

  const addProject = async (pj: CreateProjectInput) => {
    await createProject(pj)
    await fetchProjects()
  }

  const editProject = async (pj: UpdateProjectInput) => {
    await updateProject(pj)
    await fetchProjects()
  }

  const removeProject = async (projectId: string) => {
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
    searchProject,
  }
}
