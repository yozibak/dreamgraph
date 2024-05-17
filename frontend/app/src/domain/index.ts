import { EdgeItem, NodeItem, makeGraphNetwork } from 'graph'
import { createContext, useEffect, useState } from 'react'
import { createProject, getProject, listProjects } from '../data/api'
import { Project } from '../types'
import { convertProjectIntoNode, convertProjectsIntoNetworkData } from './network'

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

export const network = makeGraphNetwork<NodeItem, EdgeItem>()

export const useAppState = () => {
  const [selectedProject, setSelectedProject] = useState<Project>()

  useEffect(() => {
    async function init() {
      const pjs = await listProjects()
      if (pjs) {
        const { nodes, edges } = convertProjectsIntoNetworkData(pjs)
        nodes.forEach((n) => network.addNode(n))
        edges.forEach((e) => network.addEdge(e))
      }
    }
    init()
  }, [])

  async function selectProject(projectId: string) {
    const pj = await getProject(projectId)
    if (pj) {
      setSelectedProject(pj)
    }
  }

  function unselectProject() {
    setSelectedProject(undefined)
  }

  async function addProject() {
    const pj = await createProject({ title: 'new project' })
    if (pj) {
      network.addNode(convertProjectIntoNode(pj))
      setSelectedProject(pj)
    }
  }

  return {
    addProject,
    selectProject,
    unselectProject,
    selectedProject,
  }
}
