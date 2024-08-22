import { AuthUser } from 'aws-amplify/auth'
import { AppContext, useApplication } from '../../application'
import { Header } from '../interface/header'
import { GraphNetwork } from '../interface/network'
import { ProjectModal } from '../interface/project'

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
  const app = useApplication()
  return (
    <AppContext.Provider value={app}>
      <GraphNetwork />
      <ProjectModal />
    </AppContext.Provider>
  )
}
