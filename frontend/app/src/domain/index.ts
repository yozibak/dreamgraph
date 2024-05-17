import { GraphNetwork, makeGraphNetwork } from 'graph'
import { createContext, useEffect, useState } from 'react'
import { listProjects } from '../data/api'
import { convertProjectsIntoNetworkData } from './network'

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

export const useAppState = () => {
  const [network, setNetwork] = useState<GraphNetwork>()

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

  return {
    network
  }
}
