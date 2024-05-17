import { useContext } from 'react'
import { CenterBottom } from './modal'
import { AppContext } from '../../domain'

export const ProjectModal: React.FC = () => {
  const { selectedProject } = useContext(AppContext)

  if (!selectedProject) return <AddProjectButton />
  return (
    <CenterBottom>
      <div className="min-w-96 bg-gray-200" style={{ width: '33vw' }}>
        <div className="bold">{selectedProject.title}</div>
        <div>{selectedProject.unlocks.map((id) => id)}</div>
      </div>
    </CenterBottom>
  )
}

export const AddProjectButton: React.FC = () => {
  const { addProject } = useContext(AppContext)
  return (
    <CenterBottom>
      <button className="block w-36 bg-gray-200" onClick={addProject}>
        Add Project
      </button>
    </CenterBottom>
  )
}
