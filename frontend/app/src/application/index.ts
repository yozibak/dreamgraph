import { makeGraphUseCases } from 'app-domain'
import { EdgeItem, makeGraphNetwork, NodeItem } from 'graph'
import { createContext, useContext } from 'react'
import { AuthContext } from '../auth'
import { makeDataAccess } from '../data'
import { AppMode, makeAppModeSwitch } from './appMode'
import { makeNetworkInteraction } from './services/network/interaction'
import { makeNetworkPresentation } from './services/network/presentation'
import { makeProjectDetailService } from './services/projectDetail'
import { useProjectTooltip } from './services/projectExcerpt'
import { useTools } from './services/tools'
import { useAppInteraction } from './state/interaction'
import { makeProjectsStore } from './state/project'

// dependencies
export const network = makeGraphNetwork<NodeItem, EdgeItem>()
const dataAccess = makeDataAccess()
const useCases = makeGraphUseCases(dataAccess)

// inject dependencies
const useNetworkPresentation = makeNetworkPresentation(network)
const useNetworkInteraction = makeNetworkInteraction(network)
const useProjects = makeProjectsStore(useCases, network)
const useProjectDetail = makeProjectDetailService(useCases)
const useAppModeSwitch = makeAppModeSwitch(useCases, network, dataAccess)

export const useApplication = () => {
  // set data source based on auth state
  const { isAuthenticated } = useContext(AuthContext)
  const appMode: AppMode = isAuthenticated ? 'cloud' : 'local'
  void dataAccess.setDataSource(appMode)

  const projectsStore = useProjects()
  const appInteractionStore = useAppInteraction()

  // update the view data
  void useNetworkPresentation(projectsStore.projects)

  // update services every time state changes
  const networkInteraction = useNetworkInteraction(projectsStore, appInteractionStore)
  const projectDetail = useProjectDetail(projectsStore, appInteractionStore)
  const tools = useTools(projectsStore.addProject, appInteractionStore)
  const projectTooltip = useProjectTooltip(appInteractionStore, projectsStore)

  // reconstruct network when user logs in
  void useAppModeSwitch(appMode, projectsStore)

  return {
    projectDetail,
    networkInteraction,
    tools,
    projectTooltip,
  }
}

export type DreamGraphApplication = ReturnType<typeof useApplication>
export const AppContext = createContext({} as DreamGraphApplication)
