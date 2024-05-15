import type { Handler } from 'aws-lambda'
import { deleteProject, queryProjects, removeProjectUnlockItem } from './db'

export const handler: Handler = async (event) => {
  switch (event.info.fieldName) {
    case 'deleteProject':
      return await deleteWithRelations(event.userId, event.arguments.projectId)
    default:
      throw Error(`uncaught field: ${event.info.fieldName}`)
  }
}

const deleteWithRelations = async (userId: string, deletePjId: string) => {
  await deleteProject(userId, deletePjId)
  const relatedProjects = await queryProjects(userId, deletePjId)
  for (const pj of relatedProjects) {
    await removeProjectUnlockItem(pj, deletePjId)
  }
  return true
}
