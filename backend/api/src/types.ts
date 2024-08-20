
export type ProjectDynamoKey = {
  userId: string
  projectId: string
}

export type ProjectDataBody = {
  title: string
  unlocks: string[]
  importance: number
  status: string
}

export type ProjectData = ProjectDynamoKey & ProjectDataBody

export type CreateProjectInput = ProjectDataBody & {
  projectId: string
}

export type UpdateProjectInput = Partial<ProjectDataBody> & {
  projectId: string
}
