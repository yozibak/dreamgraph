import { Graph } from 'graph'
import { AppContext, useAppState } from '../domain'
import { useContext } from 'react'
import { ProjectModal } from './components/project'

export const Dreams = () => {
  const appState = useAppState()
  return (
    <AppContext.Provider value={appState}>
      <div className="border-black border-2">
        <GraphNetwork />
        <ProjectModal />
      </div>
    </AppContext.Provider>
  )
}

export const GraphNetwork = () => {
  const { network, selectProject } = useContext(AppContext)
  if (!network) return <div>Loading...</div>
  return (
    <div className="w-dvw h-dvh fixed top-0">
      <Graph
        network={network}
        options={{}}
        interactions={{
          onClickNode: selectProject,
        }}
      />
    </div>
  )
}
