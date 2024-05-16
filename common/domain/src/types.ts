export type ProjectDynamoKey = {
  userId: string
  projectId: string
}

export type ProjectData = ProjectDynamoKey & {
  title: string
  unlocks: string[]
}

export type ProjectWithRelation = {
  userId: string
  projectId: string
  title: string
  unlocks: ProjectData[]
}

export type CreateProjectInput = {
  title: string
  unlocks?: string[]
}

export type UpdateProjectInput = {
  title: string
  unlocks: string[]
}