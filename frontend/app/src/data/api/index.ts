import { GraphQLResult } from 'aws-amplify/api'
import { graphqlClient } from './client'
import { CreateProject, DeleteProject, GetProject, ListProjects, UpdateProject } from './queries'
import { CreateProjectInput, ProjectData, UpdateProjectInput } from 'backend-api/src/types'

export type RawProjectData = Omit<ProjectData, 'userId'>

export class APIRequestFailedError extends Error {
  constructor(e: unknown) {
    super(`api call failed: ${e}`)
  }
}

const apiCall =
  <A extends unknown[], R>(call: (...args: A) => Promise<R>) =>
  async (...args: A) => {
    try {
      return await call(...args)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      throw new APIRequestFailedError(e)
    }
  }

export const listProjects = apiCall(async () => {
  const result = (await graphqlClient.graphql({
    query: ListProjects,
  })) as GraphQLResult<{ listProjects: RawProjectData[] }>
  return result.data.listProjects
})

export const createProject = apiCall(async (pj: CreateProjectInput) => {
  const result = (await graphqlClient.graphql({
    query: CreateProject,
    variables: pj,
  })) as GraphQLResult<{ createProject: RawProjectData }>
  return result.data.createProject
})

export const deleteProject = apiCall(async (projectId: string) => {
  const result = (await graphqlClient.graphql({
    query: DeleteProject,
    variables: { projectId },
  })) as GraphQLResult<{ deleteProject: boolean }>
  return result.data.deleteProject
})

export const updateProject = apiCall(async (pj: UpdateProjectInput) => {
  const result = (await graphqlClient.graphql({
    query: UpdateProject,
    variables: pj,
  })) as GraphQLResult<{ updateProject: RawProjectData }>
  return result.data.updateProject
})

export const getProject = apiCall(async (projectId: string) => {
  const result = (await graphqlClient.graphql({
    query: GetProject,
    variables: { projectId },
  })) as GraphQLResult<{ getProject: RawProjectData }>
  return result.data.getProject
})
