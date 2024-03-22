import { util } from '@aws-appsync/utils'

export function request(ctx) {
  const createdAt = util.time.nowISO8601()
  const key = { createdAt }
  const { ...values } = ctx.args
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues(key),
    attributeValues: util.dynamodb.toMapValues(values),
  }
}

export function response(ctx) {
  return ctx.result
}
