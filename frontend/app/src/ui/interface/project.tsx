import { NodeItem } from 'graph'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext, network } from '../../domain'
import { StaticProjectData } from '../../types'
import { FloatingButton } from '../components/button'
import { CircleWithEdge } from '../components/icon'
import { CenterBottom } from '../components/layout'
import { ProjectValue } from 'common'

export const ProjectModal: React.FC = () => {
  const { selectedProject } = useContext(AppContext)

  if (!selectedProject) return <AddProjectButton />
  return <ProjectDetail selectedProject={selectedProject} />
}

const ProjectDetail: React.FC<{ selectedProject: StaticProjectData }> = ({ selectedProject }) => {
  return (
    <CenterBottom key={selectedProject.projectId}>
      <div
        className="min-w-80 bg-white opacity-90 px-4 pt-2 pb-4 rounded-md border-gray-800 border-4 shadow shadow-gray-600"
        style={{ width: '20vw' }}
      >
        <Title title={selectedProject.title} />
        <Value value={selectedProject.staticValue} />
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
  const titleInput = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (title === 'new project') {
      setEdit(true)
    }
  }, [title])
  useEffect(() => {
    if (titleInput.current) {
      titleInput.current.focus()
    }
  }, [titleInput])

  if (!edit)
    return (
      <div className="py-2 flex">
        <div
          onClick={() => setEdit(true)}
          className="inline-block font-semibold text-black  text-2xl hover:text-gray-600 leading-none"
        >
          {title}
        </div>
      </div>
    )
  return (
    <form
      className="py-2"
      onSubmit={(e) => {
        e.preventDefault()
        editProjectTitle(newTitle)
        setEdit(false)
      }}
    >
      <input
        ref={titleInput}
        className=" font-semibold text-black text-xl bg-gray-200 border-gray-400 px-2 py-1 min-w-44"
        onChange={(e) => setNetTitle(e.target.value)}
        value={newTitle}
      />
      <button className="mx-2" type="submit">
        ⏎
      </button>
    </form>
  )
}

const Value: React.FC<{value: number}> = ({value}) => {
  const { updateProjectValue } = useContext(AppContext)

  return (
    <select
    className="appearance-none py-2 text-xl"
    onChange={(e) => {
      updateProjectValue(Number(e.target.value))
    }}
    value={value}
  >
    <option value={ProjectValue.low}>low</option>
    <option value={ProjectValue.mid}>mid</option>
    <option value={ProjectValue.high}>high</option>
  </select> 
  )
}

const Unlocks: React.FC<{ unlocks: string[] }> = ({ unlocks }) => {
  const { addProjectUnlocks, removeProjectUnlocks, selectedProject, selectProject } =
    useContext(AppContext)
  const unlockProjects = unlocks
    .map((id) => network.getNodeById(id))
    .filter((p): p is NodeItem => p !== null)
  const options = network.filterNodes(
    (n) => !unlockProjects.includes(n) && n.id !== selectedProject?.projectId
  )
  return (
    <div>
      {unlockProjects.map((pj) => (
        <div className="flex flex-row pt-1" key={pj.id}>
          <CircleWithEdge />
          <div onClick={() => selectProject(pj.id)} className="px-3 text-lg mb-px cursor-pointer">
            {pj.label}
          </div>
          <button onClick={() => removeProjectUnlocks(pj.id)} className="text-red-600 text-sm">
            remove
          </button>
        </div>
      ))}
      <select
        className="appearance-none py-2 text-xl"
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
    <button onClick={removeProject} className="text-red-600 text-sm mt-2">
      Delete this project
    </button>
  )
}

export const AddProjectButton: React.FC = () => {
  const { addProject } = useContext(AppContext)
  return (
    <CenterBottom>
      <FloatingButton onClick={addProject}>Add Project</FloatingButton>
    </CenterBottom>
  )
}
