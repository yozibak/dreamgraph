import { makeGraphUseCases } from 'app-domain'
import { makeLocalRepository } from '../data/repository/local'
import { makeGraphNetwork, NodeItem, EdgeItem } from 'graph'
import { makeNetworkPresentation } from './services/network/presentation'
import { makeProjectsStore } from './state/project'
import { makeNetworkInteraction } from './services/network/interaction'
import { makeProjectDetailService } from './services/projectDetail'
import { createContext } from 'react'
import { useAppInteraction } from './state/interaction'
import { useTools } from './services/tools'
import { useProjectTooltip } from './services/projectExcerpt'

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
  const appInteractionStore = useAppInteraction()

  // update the view data
  void useNetworkPresentation(projectsStore.projects)

  // update services every time state changes
  const networkInteraction = useNetworkInteraction(projectsStore, appInteractionStore)
  const projectDetail = useProjectDetail(projectsStore, appInteractionStore)
  const tools = useTools(projectsStore.addProject, appInteractionStore)
  const projectTooltip = useProjectTooltip(appInteractionStore, projectsStore)

  return {
    projectDetail,
    networkInteraction,
    tools,
    projectTooltip,
  }
}

export type DreamGraphApplication = ReturnType<typeof useApplication>
export const AppContext = createContext({} as DreamGraphApplication)
