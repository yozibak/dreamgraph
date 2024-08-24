import { createContext, useContext } from 'react'
import { ToolsController } from '../../application/services/tools'
import { CenterBottom } from '../components/layout'
import { Tools } from '../compounds/tools'
import { withContext } from '../utils'

const ToolsContext = createContext<ToolsController>({} as ToolsController)

export const ToolBox = withContext(ToolsContext, () => {
  const { clickAdd, clickArrow, mode } = useContext(ToolsContext)
  return (
    <CenterBottom>
      <Tools
        buttons={[
          <button onClick={clickAdd} className={`w-12 text-gray-800`}>
            +
          </button>,
          <button
            onClick={() => clickArrow}
            className={`w-12 text-gray-800 ${mode === 'addEdge' ? 'text-gray-400' : ''}`}
          >
            ⤴
          </button>,
        ]}
      />
    </CenterBottom>
  )
})
