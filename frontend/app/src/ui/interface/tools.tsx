import { useContext } from 'react'
import { CenterBottom } from '../components/layout'
import { Tools } from '../compounds/tools'
import { ToolsContext } from '../view/app'

export const ToolBox: React.FC = () => {
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
}
 