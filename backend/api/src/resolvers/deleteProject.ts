import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

type DeleteProjectArgs = {
  projectId: string
}

export function request(ctx: Context<DeleteProjectArgs>) {
  const projectId = ctx.arguments.projectId
  const userId = (ctx.identity as AppSyncIdentityCognito).username
  return ddb.remove({ key: { projectId, userId } })
}

export function response(ctx: Context) {
  if (ctx.error) return false
  return true
}
