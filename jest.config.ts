import type { Config } from 'jest'

const RootConfig: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  transformIgnorePatterns: ['vis-data'],
  moduleNameMapper: {
    uuid: require.resolve('uuid'),
    rxjs: require.resolve('rxjs'),
  },
  testMatch: ['<rootDir>/src/**/*.test(.ts|.tsx)'],
  prettierPath: require.resolve('prettier-2'),
}

const JestConfig: Config = {
  globals: {
    'ts-jest': {
      isolatedModules: false,
    },
  },
  // note <rootDir> here means each project root
  collectCoverageFrom: [
    '<rootDir>/**/*.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/*.config.ts',
    '!**/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 60,
      branches: 70,
      functions: 85,
      lines: 60,
    },
  },
  coverageDirectory: '.jest/coverage',
  projects: [
    {
      ...RootConfig,
      displayName: 'frontend',
      rootDir: './frontend/app',
      testEnvironment: 'jsdom',
    },
    {
      ...RootConfig,
      testMatch: ['<rootDir>/test/resolvers/*.test.ts'],
      displayName: 'resolvers',
      rootDir: './backend/api',
    },
    {
      ...RootConfig,
      testMatch: ['<rootDir>/test/lambda/*.test.ts'],
      displayName: 'lambda',
      rootDir: './backend/api',
      setupFiles: ['<rootDir>/test/lambda/setup.ts'],
    },
    {
      ...RootConfig,
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      displayName: 'common',
      rootDir: './common/domain',
    },
  ],
}

export default JestConfig
