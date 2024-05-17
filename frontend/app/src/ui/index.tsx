import { Graph } from 'graph'
import { AppContext, network, useAppState } from '../domain'
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
  const { selectProject, unselectProject } = useContext(AppContext)
  return (
    <div className="w-dvw h-dvh fixed top-0">
      <Graph
        network={network}
        options={{}}
        interactions={{
          onClickNode: selectProject,
          onClickBackground: unselectProject,
          options: {
            moveOnClick: {
              offset: { x: 0, y: 0 },
              scale: 1,
              animation: {
                duration: 500,
                easingFunction: 'linear',
              },
            },
          },
        }}
      />
    </div>
  )
}
