import { useState } from 'react'

export type InteractionMode = 'normal' | 'hover' | 'detail' | 'addEdge'
export type Position = { x: number; y: number }

export type InteractionStore = ReturnType<typeof useAppInteraction>

export const useAppInteraction = () => {
  const [mode, setMode] = useState<InteractionMode>('normal')
  const [hoverPosition, setHoverPosition] = useState<Position>()

  return {
    mode,
    setMode,
    hoverPosition,
    setHoverPosition
  }
}
