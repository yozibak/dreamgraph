import { StaticStatus, StaticValue } from 'common'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../domain'
import { FloatingButton } from '../components/button'
import { CircleWithEdge } from '../components/icon'
import { Input, Select } from '../components/input'
import { CenterBottom, TwoColumnsGrid } from '../components/layout'
import { Panel } from '../components/paper'
import { StaticProjectData } from '../../types'

export const ProjectModal: React.FC = () => {
  const { selectedProject, addProject } = useContext(AppContext)

  return (
    <CenterBottom>
      {selectedProject ? (
        <ProjectDetail selectedProject={selectedProject} />
      ) : (
        <FloatingButton onClick={addProject}>Add Project</FloatingButton>
      )}
    </CenterBottom>
  )
}

const ProjectDetail: React.FC<{ selectedProject: StaticProjectData }> = ({ selectedProject }) => {
  return (
    <Panel className="min-w-80 p-8">
      <TwoColumnsGrid>
        <div className="col-span-2">
          <Title title={selectedProject.title} />
        </div>
        <div>value</div>
        <div>
          <Value value={selectedProject.staticValue} />
        </div>
        <div>status</div>
        <div>
          <Status status={selectedProject.staticStatus} />
        </div>
        <div>unlocks</div>
        <div>
          <Unlocks />
          <UnlockSelect />
        </div>
        <div className="col-span-2">
          <Delete />
        </div>
      </TwoColumnsGrid>
    </Panel>
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
      <div className="flex">
        <div
          onClick={() => setEdit(true)}
          className="inline-block font-semibold text-black text-2xl hover:text-gray-600 leading-none"
        >
          {title}
        </div>
      </div>
    )
  return (
    <form
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
  const options: StaticValue[] = [1, 2, 3, 4, 5]
  return (
    <Select onChange={(e) => updateProjectValue(Number(e.target.value))} value={value}>
      {options.map((v) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </Select>
  )
}

const Status: React.FC<{ status: StaticStatus }> = ({ status }) => {
  const { updateProjectStatus } = useContext(AppContext)
  const options: StaticStatus[] = ['normal', 'ongoing', 'done']
  return (
    <Select
      onChange={(e) => {
        updateProjectStatus(e.target.value as StaticStatus)
      }}
      value={status}
    >
      {options.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </Select>
  )
}

const Unlocks: React.FC = () => {
  const { removeProjectUnlocks, selectProject, unlockProjects } = useContext(AppContext)
  if (!unlockProjects) return <></>
  return unlockProjects.map((pj) => (
    <div className="flex flex-row" key={pj.projectId}>
      <CircleWithEdge />
      <div
        onClick={() => selectProject(pj.projectId)}
        className="px-3 text-lg mb-px cursor-pointer"
      >
        {pj.title}
      </div>
      <button onClick={() => removeProjectUnlocks(pj.projectId)} className="text-red-600 text-sm">
        remove
      </button>
    </div>
  ))
}

const UnlockSelect: React.FC = () => {
  const { addProjectUnlocks, unlockOptions } = useContext(AppContext)

  if (!unlockOptions) return
  return (
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
  )
}

const Delete: React.FC = () => {
  const { removeProject } = useContext(AppContext)
  return (
    <button onClick={removeProject} className="text-red-600 text-sm">
      Delete this project
    </button>
  )
}
