export type ProjectDynamoKey = {
  userId: string
  projectId: string
}

export type ProjectData = ProjectDynamoKey & {
  title: string
  unlocks: string[]
}

export type ProjectWithRelation = Omit<ProjectData, 'unlocks'> & {
  unlocks: ProjectData[]
}

export type CreateProjectInput = {
  title: string
  unlocks?: string[]
}

export type UpdateProjectInput = {
  projectId: string
  title: string
  unlocks: string[]
}
