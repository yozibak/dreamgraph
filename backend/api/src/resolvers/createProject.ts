import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ProjectRecord, ProjectDynamoKey } from '../types'

type CreateProjectArgs = {
  input: Partial<Omit<ProjectRecord, 'projectId'>>
}

export function request(ctx: Context<CreateProjectArgs>) {
  const projectId = util.autoId()
  const key: ProjectDynamoKey = {
    projectId: projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  ctx.stash.projectId = projectId
  const item = {
    unlocks: [],
    ...ctx.arguments.input
  }
  return ddb.put({ key, item })
}

export function response(ctx: Context): ProjectRecord {
  return ctx.result
}
