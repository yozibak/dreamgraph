import { AuthUser } from 'aws-amplify/auth'
import { useApplication } from '../../application'
// import { Header } from '../interface/header'
import { createContext } from 'react'
import { ProjectDetailService } from '../../application/services/projectDetail'
import { ToolsController } from '../../application/services/tools'
import { GraphNetwork } from '../interface/network'
import { ProjectDetailPanel } from '../interface/project'
import { withNonNullableContext } from '../utils'
import { ToolBox } from '../interface/tools'

export const DreamGraph: React.FC<{ user?: AuthUser; signOut?: () => void }> = ({ signOut }) => {
  if (!signOut) return <></>
  return (
    <div className="h-full flex flex-col">
      {/* <Header signOut={signOut} /> */}
      <Projects />
    </div>
  )
}

export const ProjectDetailContext = createContext<ProjectDetailService>({} as ProjectDetailService)
export const ToolsContext = createContext<ToolsController>({} as ToolsController)

const Panel = withNonNullableContext(ProjectDetailContext, ProjectDetailPanel)
const Tools = withNonNullableContext(ToolsContext, ToolBox)

export const Projects = () => {
  const { networkInteraction, projectDetail, tools } = useApplication()
  return (
    <>
      <GraphNetwork {...networkInteraction} />
      <Panel nullableContextValue={projectDetail} />
      <Tools nullableContextValue={tools} />
    </>
  )
}
