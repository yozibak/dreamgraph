import { AppSyncClient, EvaluateCodeCommand } from '@aws-sdk/client-appsync'
import * as fs from 'fs'
import { createUserRequestMock } from '../mock'

const client = new AppSyncClient({ region: 'ap-northeast-1' })
const runtime = { name: 'APPSYNC_JS', runtimeVersion: '1.0.0' } as const

test('request correctly invokes lambda', async () => {
  const code = fs.readFileSync('backend/api/build/resolvers/invokeLambda.js', 'utf8')
  const contextObj = createUserRequestMock({ arguments: { comment: 'hey' } })
  const context = JSON.stringify(contextObj)

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
  expect(result.payload.arguments.content).toEqual(contextObj.arguments.content)
})
