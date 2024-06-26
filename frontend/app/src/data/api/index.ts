import { GraphQLResult } from 'aws-amplify/api'
import { StaticProjectData } from '../../types'
import { graphqlClient } from './client'
import { CreateProject, DeleteProject, GetProject, ListProjects, UpdateProject } from './queries'
import { CreateProjectInput, UpdateProjectInput } from 'common'

export const listProjects = async () => {
  try {
    const result = (await graphqlClient.graphql({
      query: ListProjects,
    })) as GraphQLResult<{ listProjects: StaticProjectData[] }>
    return result.data.listProjects
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const createProject = async (pj: CreateProjectInput) => {
  try {
    const result = (await graphqlClient.graphql({
      query: CreateProject,
      variables: pj,
    })) as GraphQLResult<{ createProject: StaticProjectData }>
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

export const updateProject = async (pj: UpdateProjectInput) => {
  try {
    const result = (await graphqlClient.graphql({
      query: UpdateProject,
      variables: pj,
    })) as GraphQLResult<{ updateProject: StaticProjectData }>
    return result.data.updateProject
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

export const getProject = async (projectId: string) => {
  try {
    const result = (await graphqlClient.graphql({
      query: GetProject,
      variables: { projectId },
    })) as GraphQLResult<{ getProject: StaticProjectData }>
    return result.data.getProject
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}
