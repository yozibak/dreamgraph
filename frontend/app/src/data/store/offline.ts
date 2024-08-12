import { useState } from 'react'
import { DataStore, makeProject, Project } from 'use-cases'

export type ProjectStore = ReturnType<typeof useOfflineProjectsStore>

export const useOfflineProjectsStore = (): DataStore => {
  const [projects, setProjects] = useState<Project[]>([])

  const fetchProjects: DataStore['fetchProjects'] = async () => {
    return projects
  }

  const createProject: DataStore['createProject'] = async (newPj) => {
    const newProject = makeProject(newPj)
    setProjects([...projects, newProject])
    return newProject
  }

  const updateProject: DataStore['updateProject'] = async (updatePj) => {
    setProjects(projects.map((pj) => (pj.id === updatePj.id ? updatePj : pj)))
  }

  const deleteProject: DataStore['deleteProject'] = async (id) => {
    setProjects(projects.filter((pj) => pj.id !== id))
  }

  const getProject: DataStore['getProject'] = async (id) => {
    const pj = projects.find((pj) => pj.id === id)
    if (!pj) {
      throw Error(`could not find the project`)
    }
    return pj
  }

  return {
    getProject,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}
