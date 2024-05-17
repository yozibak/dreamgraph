import { Graph } from 'graph'
import { AppContext, useAppState } from '../domain'
import { useContext } from 'react'

export const Dreams = () => {
  const appState = useAppState()
  return (
    <AppContext.Provider value={appState}>
      <div className="border-black border-2">
        <GraphNetwork />
      </div>
    </AppContext.Provider>
  )
}

export const GraphNetwork = () => {
  const { network } = useContext(AppContext)
  if (!network) return <div>Loading...</div>
  return (
    <div className="w-dvw h-dvh fixed top-0">
      <Graph network={network} options={{}} />
    </div>
  )
}
