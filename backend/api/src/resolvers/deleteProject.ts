import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

type DeleteProjectsArgs = {
  projectId: string
}

export function request(ctx: Context<DeleteProjectsArgs>) {
  const userId = (ctx.identity as AppSyncIdentityCognito).sub
  return ddb.remove({ key: { userId, projectId: ctx.arguments.projectId } })
}

export function response(ctx: Context) {
  return true
}
