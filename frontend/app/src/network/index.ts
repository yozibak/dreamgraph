import { GraphQLResult } from 'aws-amplify/api'
import { ProjectRecord } from '../types'
import { graphqlClient } from './client'
import { CreateProject, DeleteProject, ListProjects, UpdateProject } from './queries'

export const listProjects = async () => {
  try {
    const result = (await graphqlClient.graphql({
      query: ListProjects,
    })) as GraphQLResult<{ listProjects: ProjectRecord[] }>
    return result.data.listProjects
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export type CreateProjectArgs = Omit<ProjectRecord, 'projectId'>

export const createProject = async (pj: CreateProjectArgs) => {
  try {
    const result = (await graphqlClient.graphql({
      query: CreateProject,
      variables: pj,
    })) as GraphQLResult<{ createProject: ProjectRecord }>
    return result.data.createProject
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    const result = (await graphqlClient.graphql({
      query: DeleteProject,
      variables: { projectId },
    })) as GraphQLResult<{ deleteProject: boolean }>
    return result.data.deleteProject
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export type UpdateProjectArgs = Partial<ProjectRecord> & { projectId: string }

export const updateProject = async (pj: UpdateProjectArgs) => {
  try {
    const result = (await graphqlClient.graphql({
      query: UpdateProject,
      variables: pj,
    })) as GraphQLResult<{ updateProject: ProjectRecord }>
    return result.data.updateProject
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}
