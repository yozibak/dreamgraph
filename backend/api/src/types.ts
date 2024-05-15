export type ProjectRecord = {
  userId: string
  projectId: string
  title: string
  unlocks: string[]
}

export type Project = {
  userId: string
  projectId: string
  title: string
  unlocks: Project[]
}

export type ProjectDynamoKey = {
  userId: string
  projectId: string
}
