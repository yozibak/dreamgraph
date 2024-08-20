import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'

type ListProjectsArgs = unknown

export function request(ctx: Context<ListProjectsArgs>) {
  const userId = (ctx.identity as AppSyncIdentityCognito).sub
  return ddb.query({ query: { userId: { eq: userId } } })
}

export function response(ctx: Context) {
  const projects = ctx.result.items
  return projects
}
