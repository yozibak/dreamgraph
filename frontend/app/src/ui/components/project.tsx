import React, { useContext, useState } from 'react'
import { CenterBottom } from './modal'
import { AppContext, network } from '../../domain'
import { Project } from '../../types'

export const ProjectModal: React.FC = () => {
  const { selectedProject } = useContext(AppContext)

  if (!selectedProject) return <AddProjectButton />
  return <ProjectDetail selectedProject={selectedProject} />
}

const ProjectDetail: React.FC<{ selectedProject: Project }> = ({ selectedProject }) => {
  return (
    <CenterBottom>
      <div className="min-w-96 bg-gray-200 p-4" style={{ width: '33vw' }}>
        <Title title={selectedProject.title} />

        <div>{selectedProject.unlocks.map((id) => network.getNodeById(id)?.label)}</div>
      </div>
    </CenterBottom>
  )
}

const Title: React.FC<{ title: string }> = ({ title }) => {
  const [edit, setEdit] = useState(false)
  const [newTitle, setNetTitle] = useState(title)
  const { editProjectTitle } = useContext(AppContext)

  if (!edit)
    return (
      <div className="flex justify-between">
        <div className="bold">{title}</div>
        <button onClick={() => setEdit(true)}>✎</button>
      </div>
    )
  return (
    <form
      className="flex justify-between"
      onSubmit={(e) => {
        e.preventDefault()
        editProjectTitle(newTitle)
        setEdit(false)
      }}
    >
      <input onChange={(e) => setNetTitle(e.target.value)} value={newTitle} />
    </form>
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
