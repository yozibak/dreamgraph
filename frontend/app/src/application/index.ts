import { makeGraphUseCases } from 'app-domain'
import { makeLocalRepository } from '../data/repository/local'
import { makeGraphNetwork, NodeItem, EdgeItem } from 'graph'
import { makeNetworkPresenter } from './presenters/network'
import { makeProjectDetailPresenter } from './presenters/projectDetail'
import { makeAppState } from './state/project'
import { makeNetworkInteraction } from './controllers/networkInteraction'
import { useProjectsControl } from './controllers/projectDetail'
import { createContext } from 'react'

// dependencies
export const network = makeGraphNetwork<NodeItem, EdgeItem>()
const repository = makeLocalRepository()
const useCases = makeGraphUseCases(repository)

// inject dependencies
const useNetworkPresenter = makeNetworkPresenter(network)
const useProjectDetailPresenter = makeProjectDetailPresenter(useCases)
const useNetworkInteraction = makeNetworkInteraction(network)
const useAppState = makeAppState(useCases, network)

export const useApplication = () => {
  const appState = useAppState()

  // update the view data
  void useNetworkPresenter(appState.projects)
  const projectDetail = useProjectDetailPresenter(appState.selectedId)

  // expose controls for the new state
  const networkInteraction = useNetworkInteraction(appState)
  const projectDetailControl = useProjectsControl(appState)

  return {
    projectDetail,
    networkInteraction,
    projectDetailControl
  }
}

export type DreamGraphApplication = ReturnType<typeof useApplication>
export const AppContext = createContext({} as DreamGraphApplication)
