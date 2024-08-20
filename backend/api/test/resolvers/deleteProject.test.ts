import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('delete project', async () => {
  const context = createUserRequestMock({
    arguments: {
      projectId: 'project-id-to-delete',
    },
    identity: {
      username: 'johndoe',
      sub: 'user-001',
      issuer: ' https://cognito-idp.ap-northeast-1.amazonaws.com/{userPoolId}',
      groups: [],
      claims: {},
      sourceIp: ['x.x.x.x'],
      defaultAuthStrategy: 'ALLOW',
    }
  })
  const result = await evaluateResolver('deleteProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'DeleteItem',
    key: {
      projectId: { S: context.arguments.projectId },
      userId: { S: context.identity.sub },
    },
  })
})
