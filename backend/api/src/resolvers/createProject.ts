import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { CreateProjectInput } from '../types'

type CreateProjectArgs =  {
  input: CreateProjectInput
}

export function request(ctx: Context<CreateProjectArgs>) {
  ctx.stash.projectId = ctx.arguments.input.projectId // get this project in getProject resolver
  const key = {
    projectId: ctx.arguments.input.projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  return ddb.put({ key, item: ctx.arguments.input })
}

export function response(ctx: Context) {
  return ctx.result
}
