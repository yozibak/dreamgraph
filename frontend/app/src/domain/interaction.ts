import { createContext, useEffect, useState } from 'react'
import { network } from './network'

export const InteractionContext = createContext({} as InteractionStore)

export type InteractionStore = ReturnType<typeof useInteraction>

export type InteractionMode = 'normal' | 'addEdge' | 'addNode' | 'detail'

export type NodeConnection = { from: string; to: string }

export const useInteraction = () => {
  const [mode, setMode] = useState<InteractionMode>('normal')
  const [connection, setConnection] = useState<NodeConnection | null>(null)

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

  const connectNodes = (conn: NodeConnection) => {
    setConnection(conn)
    setMode('normal')
  }

  return {
    mode,
    setMode,
    connection,
    connectNodes,
  }
}
