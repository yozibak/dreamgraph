import { AuthUser } from 'aws-amplify/auth'
import { useApplication } from '../../application'
import { Header } from '../interface/header'
import { GraphNetwork } from '../interface/network'
import { ProjectDetailPanel } from '../interface/project'
import { ToolBox } from '../interface/tools'
import { ProjectExcerptToolTip } from '../interface/tooltip'

export const DreamGraph: React.FC<{ user?: AuthUser; signOut?: () => void }> = ({ signOut }) => {
  if (!signOut) return <></>
  return (
    <div className="h-full flex flex-col">
      <Header signOut={signOut} />
      <Projects />
    </div>
  )
}

export const Projects = () => {
  const { networkInteraction, projectDetail, tools, projectExcerpt } = useApplication()
  return (
    <>
      <GraphNetwork {...networkInteraction} />
      <ProjectDetailPanel nullableContextValue={projectDetail} />
      <ToolBox nullableContextValue={tools} />
      <ProjectExcerptToolTip nullableContextValue={{ title: 'example', value: 3, status: 'ongoing'}} />
    </>
  )
}
