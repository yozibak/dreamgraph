import { GraphNetwork } from 'graph'
import { useEffect, useState } from 'react'
import { AppState } from '../state/project'

export type InteractionMode = 'normal' | 'addEdge' | 'addNode' | 'detail'

export type NodeConnection = { from: string; to: string }

export type NetworkInteraction = ReturnType<ReturnType<typeof makeNetworkInteraction>>

export const makeNetworkInteraction =
  (network: GraphNetwork) =>
  ({ connectProjects, selectProject, unselectProject, addProject }: AppState) => {
    const [mode, setMode] = useState<InteractionMode>('normal')

    useEffect(() => {
      if (mode === 'normal') {
        network.exitEditMode()
      } else if (mode === 'addEdge') {
        network.addEdgeMode()
      } else if (mode === 'addNode') {
        network.addNodeMode()
      } else if (mode === 'detail') {
        network.exitEditMode()
      }
    }, [mode])

    const connectNodes = ({ from, to }: NodeConnection) => {
      connectProjects(from, to)
      setMode('normal')
    }

    return {
      mode,
      setMode,
      connectNodes,
      clickNode: selectProject,
      blurNode: unselectProject,
      clickAddButton: addProject
    }
  }
