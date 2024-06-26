import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

type ListProjectsArgs = {
  unlocks?: string
}

export function request(ctx: Context<ListProjectsArgs>) {
  const userId = (ctx.identity as AppSyncIdentityCognito).username
  return ddb.query({ query: { userId: { eq: userId } } })
}

export function response(ctx: Context) {
  const projects = ctx.result.items
  return projects
}
