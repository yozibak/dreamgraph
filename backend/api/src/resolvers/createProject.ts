import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { Project, ProjectDynamoKey } from '../types'

type CreateProjectArgs = {
  input: Partial<Omit<Project, 'projectId'>>
}

export function request(ctx: Context<CreateProjectArgs>) {
  const projectId = util.autoId()
  const key: ProjectDynamoKey = {
    projectId: projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  ctx.stash.projectId = projectId
  return ddb.put({ key, item: ctx.arguments.input })
}

export function response(ctx: Context): Project {
  return ctx.result
}
