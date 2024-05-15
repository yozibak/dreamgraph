import { AppSyncClient, EvaluateCodeCommand } from "@aws-sdk/client-appsync"
import { createUserRequestMock } from "./mock"
import * as fs from 'fs'

const client = new AppSyncClient({ region: 'ap-northeast-1' })
const runtime = { name: 'APPSYNC_JS', runtimeVersion: '1.0.0' } as const

export const evaluateResolver = async (
  resolverName: string,
  context: ReturnType<typeof createUserRequestMock>,
  fn: 'request' | 'response'
) => {
  const code = fs.readFileSync(`backend/api/build/resolvers/${resolverName}.js`, 'utf8')
  const response = await client.send(
    new EvaluateCodeCommand({
      code,
      context: JSON.stringify(context),
      runtime,
      function: fn,
    })
  )
  if (response.error) {
    return response.error
  }
  return JSON.parse(response.evaluationResult)
}
