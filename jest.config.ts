import type { Config } from 'jest'

const RootConfig: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/src/**/*.test(.ts|.tsx)'],
  prettierPath: require.resolve('prettier-2'),
  setupFiles: ['../../.jest/globalSetup.ts'],
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
    // frontend
    {
      ...RootConfig,
      displayName: 'sample-app',
      rootDir: './frontend/sample-app',
      testEnvironment: 'jsdom',
    },
    // backend
    {
      ...RootConfig,
      displayName: 'sample-api',
      rootDir: './backend/sample-api',
    },
  ],
}
export default JestConfig
