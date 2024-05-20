import * as Common from 'common'

export type StaticProjectData = Omit<Common.ProjectData, 'userId'>

export type DynamicProjectData = StaticProjectData & {
  dynamicStatus: DynamicStatus
  dynamicValue: number
}

export type DynamicStatus = Common.StaticStatus | 'blocked'
