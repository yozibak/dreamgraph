import {
  DeleteItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { ProjectData } from '../types'

// TODO: consisder if this persistance logic should be handled here
export const removeUnlockProject = (pj: ProjectData, removePjId: string):ProjectData => {
  pj.unlocks = pj.unlocks.slice().filter(pid => pid !== removePjId)
  return pj
}

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

export const queryProjectsByUnlockId = async (userId: string, unlockPjId: string) => {
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
  return projects as unknown as ProjectData[]
}

export const removeProjectUnlockItem = async (pj: ProjectData, removedPj: string) => {
  const command = new PutItemCommand({
    TableName: PROJECT_TABLE,
    Item: marshall(removeUnlockProject(pj, removedPj)),
  })
  await client.send(command)
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
  return unmarshall(result.Item) as unknown as ProjectData
}
