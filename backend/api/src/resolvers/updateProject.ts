import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ProjectDynamoKey, UpdateProjectInput } from 'common'

type PutProjectArgs = {
  projectId: string
  input: UpdateProjectInput
}

export function request(ctx: Context<PutProjectArgs>) {
  const projectId = ctx.arguments.projectId
  const key: ProjectDynamoKey = {
    projectId: projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  return ddb.update({ key, update: ctx.arguments.input })
}

export function response(ctx: Context) {
  return ctx.result
}
