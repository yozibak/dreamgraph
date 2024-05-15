import { AppSyncIdentityCognito, Context } from '@aws-appsync/utils'

export type TestContext = Omit<Context, 'info'|'identity'> & {
  identity: AppSyncIdentityCognito
}

export const createUserRequestMock = (override: Partial<TestContext> = {}): TestContext => ({
  arguments: {},
  source: {},
  result: {
    operation: 'Invoke',
    arguments: {
      content: 'hey',
    },
  },
  identity: {
    username: 'user-1',
    sub: 'user-1',
    issuer: ' https://cognito-idp.{region}.amazonaws.com/{userPoolId}',
    groups: [],
    claims: {},
    sourceIp: ['x.x.x.x'],
    defaultAuthStrategy: 'ALLOW',
  },
  env: undefined,
  args: undefined,
  stash: undefined,
  prev: undefined,
  request: {
    headers: undefined,
    domainName: '',
  },
  ...override
})
