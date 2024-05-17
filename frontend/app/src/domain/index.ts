import { GraphNetwork, makeGraphNetwork } from 'graph'
import { createContext, useEffect, useState } from 'react'
import { getProject, listProjects } from '../data/api'
import { convertProjectsIntoNetworkData } from './network'
import { Project } from '../types'

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

export const useAppState = () => {
  const [network, setNetwork] = useState<GraphNetwork>()
  const [selectedProject, setSelectedProject] = useState<Project>()

  useEffect(() => {
    async function init() {
      const pjs = await listProjects()
      if (pjs) {
        const { nodes, edges } = convertProjectsIntoNetworkData(pjs)
        setNetwork(makeGraphNetwork(nodes, edges))
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

  return {
    selectProject,
    unselectProject,
    selectedProject,
    network,
  }
}
