import { makeGraphUseCases } from 'app-domain'
import { makeLocalRepository } from '../data/repository/local'
import { makeGraphNetwork, NodeItem, EdgeItem } from 'graph'
import { makeNetworkPresentation } from './services/network/presentation'
import { makeProjectsStore } from './state/project'
import { makeNetworkInteraction } from './services/network/interaction'
import { makeProjectDetailService } from './services/projectDetail'
import { createContext } from 'react'
import { useAppModes } from './state/mode'
import { useTools } from './services/tools'
import { useProjectExcerpt } from './services/projectExcerpt'

// dependencies
export const network = makeGraphNetwork<NodeItem, EdgeItem>()
const repository = makeLocalRepository()
const useCases = makeGraphUseCases(repository)

// inject dependencies
const useNetworkPresentation = makeNetworkPresentation(network)
const useNetworkInteraction = makeNetworkInteraction(network)
const useProjects = makeProjectsStore(useCases, network)
const useProjectDetail = makeProjectDetailService(useCases)

export const useApplication = () => {
  const projectsStore = useProjects()
  const appModeStore = useAppModes()

  // update the view data
  void useNetworkPresentation(projectsStore.projects)

  // update services every time state changes
  const networkInteraction = useNetworkInteraction(projectsStore, appModeStore)
  const projectDetail = useProjectDetail(projectsStore, appModeStore.mode)
  const tools = useTools(projectsStore.addProject, appModeStore)
  const projectExcerpt = useProjectExcerpt(appModeStore.mode, projectsStore)

  return {
    projectDetail,
    networkInteraction,
    tools,
    projectExcerpt
  }
}

export type DreamGraphApplication = ReturnType<typeof useApplication>
export const AppContext = createContext({} as DreamGraphApplication)
