import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('request correctly invokes lambda', async () => {
  const context = createUserRequestMock({ arguments: { some: { args: 'foo' } }})
  const result = await evaluateResolver('invokeLambda', context, 'request')
  expect(result.operation).toBe('Invoke')
  expect(result.payload.arguments).toMatchObject(context.arguments)
  expect(result.payload.userId).toBe(context.identity.sub)
})
