import { ProjectDetail } from 'app-domain'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../application'
import { CircleWithEdge } from '../components/icon'
import { Input, Select } from '../components/input'
import { CenterBottom, TwoColumnsGrid } from '../components/layout'
import { Panel } from '../components/paper'
import { Toggle } from '../components/toggle'
import { StatusSlider, ValueSlider } from '../compounds/slider'
import { Tools } from '../compounds/tools'

export const ProjectModal: React.FC = () => {
  const { projectDetail, networkInteraction } = useContext(AppContext)

  return (
    <CenterBottom>
      {projectDetail ? (
        <ProjectDetailPanel {...projectDetail} />
      ) : (
        <Tools
          buttons={[
            <button
              onClick={networkInteraction.clickAddButton}
              className={`w-12 text-gray-800 ${networkInteraction.mode === 'addNode' ? 'text-gray-400' : ''}`}
            >
              +
            </button>,
            <button
              onClick={() => networkInteraction.setMode('addEdge')}
              className={`w-12 text-gray-800 ${networkInteraction.mode === 'addEdge' ? 'text-gray-400' : ''}`}
            >
              ⤴
            </button>,
          ]}
        />
      )}
    </CenterBottom>
  )
}

const ProjectDetailPanel: React.FC<ProjectDetail> = () => {
  const { projectDetail, projectDetailControl } = useContext(AppContext)
  if (!projectDetailControl || !projectDetail) return
  return (
    <Panel className="min-w-80 p-8">
      <TwoColumnsGrid>
        <div className="col-span-2">
          <Toggle
            DefaultUI={({ toggle }) => (
              <ProjectTitle title={projectDetail.title} goToEdit={toggle} />
            )}
            AltUI={({ toggle }) => (
              <ProjectTitleInput title={projectDetail.title} onFinish={toggle} />
            )}
          />
        </div>

        <ProjectField fieldName="value" />
        <div>
          <ValueSlider
            onChange={projectDetailControl.updateProjectImportance}
            value={projectDetail.importance}
          />
        </div>

        <ProjectField fieldName="status" />
        <div>
          <StatusSlider
            onChange={projectDetailControl.updateProjectStatus}
            value={projectDetail.status}
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
  const { projectDetailControl } = useContext(AppContext)

  if (!projectDetailControl) return
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        projectDetailControl.editProjectTitle(newTitle)
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
  const { projectDetail, projectDetailControl } = useContext(AppContext)

  if (!projectDetail || !projectDetailControl) return
  return projectDetail.unlocks.map(({ id, title }) => (
    <div className="flex flex-row" key={id}>
      <CircleWithEdge />
      <div
        onClick={() => projectDetailControl.viewUnlockProject(id)}
        className="px-3 text-lg mb-px cursor-pointer"
      >
        {title}
      </div>
      <button
        onClick={() => projectDetailControl.removeUnlock(id)}
        className="text-red-600 text-sm"
      >
        remove
      </button>
    </div>
  ))
}

const UnlockSelect: React.FC = () => {
  const { projectDetail, projectDetailControl } = useContext(AppContext)
  if (!projectDetail || !projectDetailControl) return

  return (
    <Select
      onChange={(e) => {
        projectDetailControl.addProjectUnlocks(e.target.value)
      }}
      value={''}
    >
      <option value="">+</option>
      {projectDetail.availableUnlockOptions.map((pj) => (
        <option key={pj.id} value={pj.id}>
          {pj.title}
        </option>
      ))}
    </Select>
  )
}

const Delete: React.FC = () => {
  const { projectDetailControl } = useContext(AppContext)
  if (!projectDetailControl) return

  return (
    <button onClick={projectDetailControl.deleteProject} className="text-red-600 text-sm">
      Delete this project
    </button>
  )
}
