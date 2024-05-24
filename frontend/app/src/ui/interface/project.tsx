import { StaticStatus, StaticValue } from 'common'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../domain'
import { StaticProjectData } from '../../types'
import { FloatingButton } from '../components/button'
import { CircleWithEdge } from '../components/icon'
import { Input, Select } from '../components/input'
import { CenterBottom, TwoColumnsGrid } from '../components/layout'
import { Panel } from '../components/paper'
import { Toggle } from '../components/toggle'
import { StatusSlider, ValueSlider } from '../compounds/slider'

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
  const { updateProjectStatus, updateProjectValue } = useContext(AppContext)
  return (
    <Panel className="min-w-80 p-8">
      <TwoColumnsGrid>
        <div className="col-span-2">
          <Toggle
            DefaultUI={({ toggle }) => (
              <ProjectTitle title={selectedProject.title} goToEdit={toggle} />
            )}
            AltUI={({ toggle }) => (
              <ProjectTitleInput title={selectedProject.title} onFinish={toggle} />
            )}
          />
        </div>

        <ProjectField fieldName="value" />
        <div>
          <ValueSlider
            onChange={(v) => updateProjectValue(v)}
            value={selectedProject.staticValue}
          />
        </div>

        <ProjectField fieldName="status" />
        <div>
          <StatusSlider
            onChange={(v) => updateProjectStatus(v)}
            value={selectedProject.staticStatus}
          />
        </div>

        <ProjectField fieldName="unlocks" />
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

const ProjectField: React.FC<{ fieldName: string }> = ({ fieldName }) => <div>{fieldName}</div>

const ProjectTitle: React.FC<{ goToEdit: () => void; title: string }> = ({ goToEdit, title }) => {
  useEffect(() => {
    if (title === 'new project') goToEdit()
  }, [title])
  return (
    <div className="flex">
      <div
        onClick={goToEdit}
        className="inline-block font-semibold text-black text-2xl hover:text-gray-600 leading-none"
      >
        {title}
      </div>
    </div>
  )
}

const ProjectTitleInput: React.FC<{ onFinish: () => void; title: string }> = ({
  onFinish,
  title,
}) => {
  const [newTitle, setNetTitle] = useState(title)
  const { editProjectTitle } = useContext(AppContext)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        editProjectTitle(newTitle)
        onFinish()
      }}
    >
      <Input onChange={(e) => setNetTitle(e.target.value)} value={newTitle} />
      <button className="mx-2" type="submit">
        ⏎
      </button>
    </form>
  )
}

const Unlocks: React.FC = () => {
  const { removeProjectUnlocks, selectProject, unlockProjects } = useContext(AppContext)
  if (!unlockProjects) return
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
