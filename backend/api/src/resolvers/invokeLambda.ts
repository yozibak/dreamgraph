import { Context } from '@aws-appsync/utils'

export function request(ctx: Context) {
  return {
    operation: 'Invoke',
    payload: { arguments: ctx.args },
  }
}

export function response(ctx: Context) {
  return ctx.result
}
