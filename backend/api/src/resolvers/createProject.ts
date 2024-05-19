import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'
import * as ddb from '@aws-appsync/utils/dynamodb'
import { ProjectData, DefaultStaticStatus, DefaultStaticValue } from 'common'

type CreateProjectArgs = {
  input: Partial<ProjectData>
}

export function request(ctx: Context<CreateProjectArgs>) {
  const projectId = util.autoId()
  const key = {
    projectId: projectId,
    userId: (ctx.identity as AppSyncIdentityCognito).sub,
  }
  ctx.stash.projectId = projectId
  const item = {
    unlocks: [],
    ...ctx.arguments.input,
    staticValue: DefaultStaticValue,
    staticStatus: DefaultStaticStatus,
  }
  return ddb.put({ key, item })
}

export function response(ctx: Context) {
  return ctx.result
}
