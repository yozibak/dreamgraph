import { useState } from 'react'

export type AppMode = 'normal' | 'hover' | 'detail' | 'addEdge'

export type AppModeStore = ReturnType<typeof useAppModes>

export const useAppModes = () => {
  const [mode, setMode] = useState<AppMode>('normal')

  return {
    mode,
    setMode,
  }
}
