import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../domain/project'
import { Project } from 'use-cases'
import { CircleWithEdge } from '../components/icon'
import { Input, Select } from '../components/input'
import { CenterBottom, TwoColumnsGrid } from '../components/layout'
import { Panel } from '../components/paper'
import { Toggle } from '../components/toggle'
import { StatusSlider, ValueSlider } from '../compounds/slider'
import { Tools } from '../compounds/tools'
import { InteractionContext } from '../../domain/interaction'

export const ProjectModal: React.FC = () => {
  const { selectedProject, addProject } = useContext(AppContext)
  const { mode, setMode } = useContext(InteractionContext)

  return (
    <CenterBottom>
      {selectedProject ? (
        <ProjectDetail selectedProject={selectedProject} />
      ) : (
        <Tools
          buttons={[
            <button
              onClick={addProject}
              className={`w-12 text-gray-800 ${mode === 'addNode' ? 'text-gray-400' : ''}`}
            >
              +
            </button>,
            <button
              onClick={() => setMode('addEdge')}
              className={`w-12 text-gray-800 ${mode === 'addEdge' ? 'text-gray-400' : ''}`}
            >
              ⤴
            </button>,
          ]}
        />
      )}
    </CenterBottom>
  )
}

const ProjectDetail: React.FC<{ selectedProject: Project }> = ({ selectedProject }) => {
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
            value={selectedProject.importance}
          />
        </div>

        <ProjectField fieldName="status" />
        <div>
          <StatusSlider
            onChange={(v) => updateProjectStatus(v)}
            value={selectedProject.status}
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
  const { removeProjectUnlocks, selectProject, selectedProject } = useContext(AppContext)
  if (!selectedProject) return
  return selectedProject?.unlocks.map((pj) => (
    <div className="flex flex-row" key={pj.id}>
      <CircleWithEdge />
      <div
        onClick={() => selectProject(pj.id)}
        className="px-3 text-lg mb-px cursor-pointer"
      >
        {pj.title}
      </div>
      <button onClick={() => removeProjectUnlocks(pj.id)} className="text-red-600 text-sm">
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
        <option key={pj.id} value={pj.id}>
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
