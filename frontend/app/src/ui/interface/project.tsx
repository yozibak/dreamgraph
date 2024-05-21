import { ProjectValue, StaticStatus } from 'common'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../domain'
import { StaticProjectData } from '../../types'
import { FloatingButton } from '../components/button'
import { CircleWithEdge } from '../components/icon'
import { Input, Select } from '../components/input'
import { CenterBottom } from '../components/layout'

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
        <Status status={selectedProject.staticStatus} />
        <Unlocks />
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
    if (title === 'new project') setEdit(true)
  }, [title])
  useEffect(() => {
    if (titleInput.current) titleInput.current.focus()
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
      <Input ref={titleInput} onChange={(e) => setNetTitle(e.target.value)} value={newTitle} />
      <button className="mx-2" type="submit">
        ⏎
      </button>
    </form>
  )
}

const Value: React.FC<{ value: number }> = ({ value }) => {
  const { updateProjectValue } = useContext(AppContext)
  return (
    <Select onChange={(e) => updateProjectValue(Number(e.target.value))} value={value}>
      <option value={ProjectValue.low}>low</option>
      <option value={ProjectValue.mid}>mid</option>
      <option value={ProjectValue.high}>high</option>
    </Select>
  )
}

const Status: React.FC<{ status: StaticStatus }> = ({ status }) => {
  const { updateProjectStatus } = useContext(AppContext)
  const options: StaticStatus[] = ['normal', 'ongoing', 'done']
  return (
    <Select onChange={(e) => updateProjectStatus(e.target.value as StaticStatus)} value={status}>
      {options.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </Select>
  )
}

const Unlocks: React.FC = () => {
  const { addProjectUnlocks, removeProjectUnlocks, selectProject, unlockOptions, unlockProjects } =
    useContext(AppContext)

  if (!unlockProjects || !unlockOptions) return
  return (
    <div>
      {unlockProjects.map((pj) => (
        <div className="flex flex-row pt-1" key={pj.projectId}>
          <CircleWithEdge />
          <div
            onClick={() => selectProject(pj.projectId)}
            className="px-3 text-lg mb-px cursor-pointer"
          >
            {pj.title}
          </div>
          <button
            onClick={() => removeProjectUnlocks(pj.projectId)}
            className="text-red-600 text-sm"
          >
            remove
          </button>
        </div>
      ))}
      <Select
        onChange={(e) => {
          addProjectUnlocks(e.target.value)
        }}
        value={''}
      >
        <option value="">+</option>
        {unlockOptions.map((pj) => (
          <option key={pj.projectId} value={pj.projectId}>
            {pj.title}
          </option>
        ))}
      </Select>
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
