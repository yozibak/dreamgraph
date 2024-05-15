import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { Project, ProjectDynamoKey } from '../types'

type PutProjectArgs = {
  projectId: string
  input: Omit<Project, 'projectId'>
}

export function request(ctx: Context<PutProjectArgs>) {
  const projectId = ctx.arguments.projectId
  const key: ProjectDynamoKey = {
    projectId: projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  return ddb.update({ key, update: ctx.arguments.input })
}

export function response(ctx: Context): Project {
  return ctx.result
}
