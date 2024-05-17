import React, { useContext, useState } from 'react'
import { CenterBottom } from './modal'
import { AppContext, network } from '../../domain'
import { Project } from '../../types'
import { NodeItem } from 'graph'

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
        <Unlocks unlocks={selectedProject.unlocks} />
        <Delete />
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

const Unlocks: React.FC<{ unlocks: string[] }> = ({ unlocks }) => {
  const { addProjectUnlocks, removeProjectUnlocks, selectedProject } = useContext(AppContext)
  const unlockProjects = unlocks
    .map((id) => network.getNodeById(id))
    .filter((p): p is NodeItem => p !== null)
  const options = network.filterNodes(
    (n) => !unlockProjects.includes(n) && n.id !== selectedProject?.projectId
  )
  return (
    <div>
      {unlockProjects.map((pj) => (
        <div className="flex justify-between" key={pj.id}>
          <div>{pj.label}</div>
          <button onClick={() => removeProjectUnlocks(pj.id)}>🗑️</button>
        </div>
      ))}
      <select
        onChange={(e) => {
          addProjectUnlocks(e.target.value)
        }}
        value={''}
      >
        <option value="">+</option>
        {options.map((pj) => (
          <option key={pj.id} value={pj.id}>
            {pj.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const Delete: React.FC = () => {
  const { removeProject } = useContext(AppContext)
  return (
    <button onClick={removeProject} className="text-red-400">
      Delete this project
    </button>
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
