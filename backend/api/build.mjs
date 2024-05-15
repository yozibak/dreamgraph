/* eslint-disable */
import { build } from 'esbuild'
import { glob } from 'glob'

const resolverFiles = await glob('src/resolvers/*.ts')
await build({
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  external: ['@aws-appsync/utils', '@aws-sdk/client-dynamodb'],
  outdir: 'build/resolvers/',
  entryPoints: resolverFiles,
  bundle: true,
  logLevel: 'info',
  sourcemap: 'inline',
  sourcesContent: false,
})

await build({
  format: 'esm',
  target: 'esnext',
  platform: 'node',
  external: ['@aws-sdk/client-dynamodb', '@aws-sdk/util-dynamodb'],
  outdir: 'build/lambda',
  entryPoints: ['src/lambda/index.ts'],
  bundle: true,
  logLevel: 'info',
  sourcemap: 'inline',
  sourcesContent: false,
  outExtension: { '.js': '.mjs' },
})
