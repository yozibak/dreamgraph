import { ProjectData } from './types'

export const DefaultStaticValue: ProjectData['staticValue'] = 10

export const DefaultStaticStatus: ProjectData['staticStatus'] = 'normal'

export const ProjectValue = {
  high: 20,
  mid: 10,
  low: 0,
} as const

