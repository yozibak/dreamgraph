import { useApplication } from '../../application'
import { Header } from '../interface/header'
import { NetworkInterface } from '../interface/network'
import { ProjectDetailPanel } from '../interface/project'
import { ToolBox } from '../interface/tools'
import { ProjectExcerptTooltip } from '../interface/tooltip'

export const App: React.FC = () => {
  const { networkInteraction, projectDetail, tools, projectTooltip } = useApplication()
  return (
    <div className="h-full flex flex-col">
      <Header />
      <NetworkInterface interaction={networkInteraction} />
      <ProjectDetailPanel nullableContextValue={projectDetail} />
      <ToolBox nullableContextValue={tools} />
      <ProjectExcerptTooltip {...projectTooltip} />
    </div>
  )
}
