import { useContext } from 'react'
import { Modal } from './modal'
import { AppContext } from '../../domain'

export const ProjectModal: React.FC = () => {
  const { selectedProject } = useContext(AppContext)

  if (!selectedProject) return <></>
  return (
    <Modal>
      <div>
        <div className='bold'>{selectedProject.title}</div>
        <div>{selectedProject.unlocks.map(id => id)}</div>
      </div>
    </Modal>
  )
}
