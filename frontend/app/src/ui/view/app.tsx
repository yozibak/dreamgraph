import { AuthUser } from 'aws-amplify/auth'
import { AppContext, useAppState } from '../../domain'
import { ProjectModal } from '../interface/project'
import { GraphNetwork } from '../interface/network'
import { Header } from '../interface/header'

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
  const appState = useAppState()
  return (
    <AppContext.Provider value={appState}>
      <GraphNetwork />
      <ProjectModal />
    </AppContext.Provider>
  )
}
