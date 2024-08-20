test(``, () => {
  // we currently don't use lambda
})
// import { CreateTableCommand, DeleteTableCommand, PutItemCommand } from '@aws-sdk/client-dynamodb'
// import { client, getProject, queryProjectsByUnlockId, removeProjectUnlockItem } from '../../src/lambda/db'

// const TableName = 'LocalTest'

// beforeEach(async () => {
//   await client.send(
//     new CreateTableCommand({
//       TableName,
//       KeySchema: [
//         {
//           AttributeName: 'userId',
//           KeyType: 'HASH',
//         },
//         {
//           AttributeName: 'projectId',
//           KeyType: 'RANGE',
//         },
//       ],
//       AttributeDefinitions: [
//         {
//           AttributeName: 'userId',
//           AttributeType: 'S',
//         },
//         {
//           AttributeName: 'projectId',
//           AttributeType: 'S',
//         },
//       ],
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     })
//   )
// })

// afterEach(async () => {
//   await client.send(new DeleteTableCommand({ TableName }))
// })

// /**
//  *     .> pj-1
//  *    /    \
//  *   /      v
//  * pj-2 ---> pj-3
//  *
//  */
// const prepMinimumGraph = async () => {
//   await client.send(
//     new PutItemCommand({
//       TableName,
//       Item: {
//         userId: { S: 'userId' },
//         projectId: { S: 'pj-1' },
//         title: { S: 'pj-1' },
//         unlocks: { L: [{ S: 'pj-3' }] },
//       },
//     })
//   )
//   await client.send(
//     new PutItemCommand({
//       TableName,
//       Item: {
//         userId: { S: 'userId' },
//         projectId: { S: 'pj-2' },
//         title: { S: 'pj-2' },
//         unlocks: { L: [{ S: 'pj-3' }, { S: 'pj-1' }] },
//       },
//     })
//   )
// }

// test(`${queryProjectsByUnlockId.name}`, async () => {
//   await prepMinimumGraph()
//   const result = await queryProjectsByUnlockId('userId', 'pj-3')
//   expect(result.length).toBe(2)
//   result.forEach((r) => {
//     expect(r.unlocks.includes('pj-3')).toBe(true)
//     expect(r.unlocks.includes('pj-3')).toBe(true)
//   })
// })

// test(`${removeProjectUnlockItem.name}`, async () => {
//   await prepMinimumGraph()
//   const pj2 = await getProject('userId', 'pj-2')
//   await removeProjectUnlockItem(pj2, 'pj-3')
//   const result = await getProject('userId', 'pj-2')
//   expect(result.unlocks.includes('pj-3')).toBe(false)
//   expect(result.unlocks.includes('pj-1')).toBe(true)
//   expect(result.title).toBe('pj-2')
// })
