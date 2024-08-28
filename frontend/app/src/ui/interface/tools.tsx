import { ArrowTopRightIcon, PlusIcon } from '@radix-ui/react-icons'
import { createContext, useContext } from 'react'
import { ToolsController } from '../../application/services/tools'
import { Colors } from '../../constants'
import { CenterBottom } from '../components/layout'
import { Tool } from '../components/tool'
import { withNullableContext } from '../components/utils'

const ToolsContext = createContext<ToolsController>({} as ToolsController)

export const ToolBox = withNullableContext(ToolsContext, () => {
  const { clickAdd, clickArrow, mode } = useContext(ToolsContext)
  return (
    <CenterBottom>
      <Tool variant="left" onClick={clickAdd}>
        <PlusIcon color={Colors.Gray600} />
      </Tool>
      <Tool variant="right" onClick={clickArrow} disabled={mode === 'addEdge'}>
        <ArrowTopRightIcon color={Colors.Gray600} />
      </Tool>
    </CenterBottom>
  )
})
