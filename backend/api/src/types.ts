
export type ProjectDynamoKey = {
  userId: string
  projectId: string
}

export type ProjectData = ProjectDynamoKey & {
  title: string
  unlocks: string[]
  staticValue: StaticValue
  staticStatus: StaticStatus
}

export type StaticStatus = 'normal' | 'ongoing' | 'done'

export type StaticValue = 1 | 2 | 3 | 4 | 5

export type CreateProjectInput = {
  title: string
  unlocks?: string[]
}

export type UpdateProjectInput = {
  projectId: string
  title: string
  unlocks: string[]
  staticValue: number
  staticStatus: StaticStatus
}
