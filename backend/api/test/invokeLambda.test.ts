import { AppSyncClient, EvaluateCodeCommand } from '@aws-sdk/client-appsync'
import * as fs from 'fs'

const client = new AppSyncClient({ region: 'ap-northeast-1' })
const runtime = { name: 'APPSYNC_JS', runtimeVersion: '1.0.0' } as const

test('request correctly invokes lambda', async () => {
  const code = fs.readFileSync('backend/api/build/resolvers/invokeLambda.js', 'utf8')
  const context = fs.readFileSync('backend/api/test/context.json', 'utf8')
  const contextJSON = JSON.parse(context)

  const response = await client.send(
    new EvaluateCodeCommand({
      code,
      context,
      runtime,
      function: 'request',
    })
  )
  if (response.error) { 
    throw response.error
  }
  const result = JSON.parse(response.evaluationResult!)

  expect(result.operation).toEqual('Invoke')
  expect(result.payload.arguments.content).toEqual(contextJSON.arguments.content)
})
