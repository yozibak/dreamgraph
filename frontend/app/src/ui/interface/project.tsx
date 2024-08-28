import { Card } from '@/ui/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select'
import { TrashIcon } from '@radix-ui/react-icons'
import {
  ProjectImportance,
  ProjectImportanceExpression,
  ProjectStatus,
  ProjectStatusExpression,
} from 'app-domain'
import React, { createContext, useContext, useState } from 'react'
import { ProjectDetailService } from '../../application/services/projectDetail'
import { CircleWithEdge } from '../components/icon'
import { Positioned, TwoColumnsGrid } from '../components/layout'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Separator } from '../components/ui/separator'
import { SearchableSelect } from '../compounds/searchable-select'
import { withNullableContext } from '../components/utils'

export const ProjectDetailContext = createContext<ProjectDetailService>({} as ProjectDetailService)

export const ProjectDetailPanel = withNullableContext(ProjectDetailContext, () => {
  const service = useContext(ProjectDetailContext)
  return (
    <Positioned position={service.nodePosition} width={320}>
      <Card className="relative px-6 py-6 opacity-95">
        <TwoColumnsGrid>
          <InputLabel fieldName="Title" />
          <ProjectTitleInput
            title={service.projectDetail.title}
            update={service.editProjectTitle}
          />

          <InputLabel fieldName="Importance" />
          <OptionsSelect
            selectId="importance"
            options={Object.entries(ProjectImportanceExpression).map(([k, v]) => ({
              value: Number(k) as ProjectImportance,
              label: v,
            }))}
            initialValue={service.projectDetail.importance}
            onChange={service.updateProjectImportance}
          />

          <InputLabel fieldName="Status" />
          <OptionsSelect
            selectId="status"
            options={Object.entries(ProjectStatusExpression).map(([k, v]) => ({
              value: k as ProjectStatus,
              label: v,
            }))}
            initialValue={service.projectDetail.status}
            onChange={service.updateProjectStatus}
          />

          <InputLabel fieldName="Relation" />

          <SearchableSelect
            options={service.projectDetail.availableUnlockOptions.map((p) => ({
              value: p.id,
              label: p.title,
            }))}
            onChange={service.addProjectUnlocks}
          />

          {service.projectDetail.unlocks.length ? (
            <>
              <div />
              <Unlocks />
            </>
          ) : null}

          <Separator className="col-span-2" />

          <div className="col-span-2">
            <Delete />
          </div>
        </TwoColumnsGrid>
      </Card>
    </Positioned>
  )
})

const InputLabel: React.FC<{ fieldName: string }> = ({ fieldName }) => (
  <div className="flex flex-col justify-center">
    <div className="text-sm text-right text-zinc-600">{fieldName}</div>
  </div>
)

const ProjectTitleInput: React.FC<{
  title: string
  update: (title: string) => void
}> = ({ update, title }) => {
  const [newTitle, setNetTitle] = useState(title)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        update(newTitle)
      }}
    >
      <Input
        onChange={(e) => setNetTitle(e.target.value)}
        value={newTitle}
        onBlur={() => update(newTitle)}
      />
    </form>
  )
}

const OptionsSelect = <V extends NonNullable<string | number>>({
  selectId,
  options,
  initialValue,
  onChange,
  placeholder,
}: {
  selectId: string
  options: Array<{ value: V; label: string }>
  initialValue: V
  onChange: (v: V) => void
  placeholder?: string
}) => {
  const onSelect = (optionIndex: string) => onChange(options[Number(optionIndex)].value)
  const initialIndex = options.findIndex((o) => o.value === initialValue)
  return (
    <Select onValueChange={onSelect} defaultValue={initialIndex.toString()}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((o, i) => (
          <SelectItem key={`${selectId}-${i}`} value={i.toString()}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const Unlocks: React.FC = () => {
  const { viewUnlockProject, projectDetail, removeUnlock } = useContext(ProjectDetailContext)

  return (
    <div className="px-2 py-0 space-y-1">
      {projectDetail.unlocks.map(({ id, title }) => (
        <div className="flex justify-between" key={id}>
          <div className="flex justify-start">
            <CircleWithEdge />
            <div
              onClick={() => viewUnlockProject(id)}
              className="px-3 text-sm mb-px cursor-pointer text-zinc-800"
            >
              {title.length < 16 ? title : title.slice(0, 12) + '...'}
            </div>
          </div>

          <button onClick={() => removeUnlock(id)} className="text-zinc-600 text-sm">
            <TrashIcon />
          </button>
        </div>
      ))}
    </div>
  )
}

const Delete: React.FC = () => {
  const { deleteProject } = useContext(ProjectDetailContext)
  return (
    <Button
      onClick={deleteProject}
      variant={'secondary'}
      className="w-full hover:bg-red-600 hover:text-zinc-50"
    >
      Delete this project
    </Button>
  )
}
