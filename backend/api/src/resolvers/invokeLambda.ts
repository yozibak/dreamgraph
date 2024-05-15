import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'

export function request(ctx: Context) {
  return {
    operation: 'Invoke',
    payload: {
      arguments: ctx.arguments,
      userId: (ctx.identity as AppSyncIdentityCognito).sub,
      info: ctx.info
    },
  }
}

export function response(ctx: Context) {
  return ctx.result
}
