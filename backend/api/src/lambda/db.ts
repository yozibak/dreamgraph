import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb'
import { ProjectRecord } from '../types'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const { PROJECT_TABLE } = process.env

export const client = new DynamoDBClient({
  region: 'ap-northeast-1',
  endpoint: PROJECT_TABLE === 'LocalTest' ? 'http://localhost:8000' : undefined,
})

export const deleteProject = async (userId: string, projectId: string) => {
  const command = new DeleteItemCommand({
    TableName: PROJECT_TABLE,
    Key: { userId: { S: userId }, projectId: { S: projectId } },
  })
  await client.send(command)
  return true
}

export const queryProjects = async (userId: string, unlockPjId: string) => {
  const command = new QueryCommand({
    TableName: PROJECT_TABLE,
    KeyConditionExpression: 'userId = :userId',
    FilterExpression: 'contains(unlocks,:unlockPjId)',
    ExpressionAttributeValues: {
      ':userId': { S: userId },
      ':unlockPjId': { S: unlockPjId },
    },
  })
  const result = await client.send(command)
  const projects = result.Items.map((item) => unmarshall(item))
  return projects as unknown as ProjectRecord[]
}

export const getProject = async (userId: string, projectId: string) => {
  const command = new GetItemCommand({
    TableName: PROJECT_TABLE,
    Key: {
      userId: { S: userId },
      projectId: { S: projectId },
    },
  })
  const result = await client.send(command)
  return unmarshall(result.Item) as unknown as ProjectRecord
}

export const removeProjectUnlockItem = async (pj: ProjectRecord, removedPj: string) => {
  const command = new PutItemCommand({
    TableName: PROJECT_TABLE,
    Item: {
      userId: { S: pj.userId },
      projectId: { S: pj.projectId },
      unlocks: { L: pj.unlocks.filter((pid) => pid !== removedPj).map((pid) => ({ S: pid })) },
    },
  })
  await client.send(command)
}
