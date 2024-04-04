import type { Config } from 'jest'

const RootConfig: Config = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
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
  ],
}

export default JestConfig
