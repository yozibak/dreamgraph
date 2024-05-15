import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { Project } from '../types'

type GetProjectArgs = {
  projectId: string
}

export function request(ctx: Context<GetProjectArgs>) {
  const projectId = ctx.arguments.projectId || ctx.stash.projectId
  const userId = (ctx.identity as AppSyncIdentityCognito).username
  return ddb.get({ key: { projectId, userId } })
}

export function response(ctx: Context): Project {
  return ctx.result
}
