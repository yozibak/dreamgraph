import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

type GetProjectArgs = {
  projectId: string
}

export function request(ctx: Context<GetProjectArgs>) {
  const projectId = ctx.arguments.projectId || ctx.stash.projectId
  const userId = (ctx.identity as AppSyncIdentityCognito).sub
  return ddb.get({ key: { projectId, userId } })
}

export function response(ctx: Context) {
  return ctx.result
}
