import React, { createContext, useContext, useEffect, useState } from 'react'
import { ProjectDetailService } from '../../application/services/projectDetail'
import { CircleWithEdge } from '../components/icon'
import { Input, Select } from '../components/input'
import { CenterBottom, TwoColumnsGrid } from '../components/layout'
import { Panel } from '../components/paper'
import { Toggle } from '../components/toggle'
import { StatusSlider, ValueSlider } from '../compounds/slider'
import { withNullableContext } from '../utils'

export const ProjectDetailContext = createContext<ProjectDetailService>({} as ProjectDetailService)

export const ProjectDetailPanel = withNullableContext(ProjectDetailContext, () => {
  const service = useContext(ProjectDetailContext)
  return (
    <CenterBottom>
      <Panel className="min-w-80 p-8">
        <TwoColumnsGrid>
          <div className="col-span-2">
            <Toggle
              DefaultUI={({ toggle }) => (
                <ProjectTitle title={service.projectDetail.title} goToEdit={toggle} />
              )}
              AltUI={({ toggle }) => (
                <ProjectTitleInput title={service.projectDetail.title} onFinish={toggle} />
              )}
            />
          </div>

          <ProjectField fieldName="value" />
          <div>
            <ValueSlider
              onChange={service.updateProjectImportance}
              value={service.projectDetail.importance}
            />
          </div>

          <ProjectField fieldName="status" />
          <div>
            <StatusSlider
              onChange={service.updateProjectStatus}
              value={service.projectDetail.status}
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
    </CenterBottom>
  )
})

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

const ProjectTitleInput: React.FC<{
  onFinish: () => void
  title: string
}> = ({ onFinish, title }) => {
  const [newTitle, setNetTitle] = useState(title)
  const { editProjectTitle } = useContext(ProjectDetailContext)
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
  const { viewUnlockProject, projectDetail, removeUnlock } = useContext(ProjectDetailContext)

  return projectDetail.unlocks.map(({ id, title }) => (
    <div className="flex flex-row" key={id}>
      <CircleWithEdge />
      <div onClick={() => viewUnlockProject(id)} className="px-3 text-lg mb-px cursor-pointer">
        {title}
      </div>
      <button onClick={() => removeUnlock(id)} className="text-red-600 text-sm">
        remove
      </button>
    </div>
  ))
}

const UnlockSelect: React.FC = () => {
  const { addProjectUnlocks, projectDetail } = useContext(ProjectDetailContext)

  return (
    <Select
      onChange={(e) => {
        addProjectUnlocks(e.target.value)
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
  const { deleteProject } = useContext(ProjectDetailContext)
  return (
    <button onClick={deleteProject} className="text-red-600 text-sm">
      Delete this project
    </button>
  )
}
