import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ProjectDynamoKey, UpdateProjectInput } from 'common'

type PutProjectArgs = {
  input: UpdateProjectInput
}

export function request(ctx: Context<PutProjectArgs>) {
  const { projectId, ...rest } = ctx.arguments.input
  const key: ProjectDynamoKey = {
    projectId: projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  return ddb.update({ key, update: rest })
}

export function response(ctx: Context) {
  return ctx.result
}
