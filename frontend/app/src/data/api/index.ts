import { GraphQLResult } from 'aws-amplify/api'
import { Project } from '../../types'
import { graphqlClient } from './client'
import { CreateProject, DeleteProject, ListProjects, UpdateProject } from './queries'
import { CreateProjectInput, UpdateProjectInput } from 'common'

export const listProjects = async () => {
  try {
    const result = (await graphqlClient.graphql({
      query: ListProjects,
    })) as GraphQLResult<{ listProjects: Project[] }>
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
    })) as GraphQLResult<{ createProject: Project }>
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
    })) as GraphQLResult<{ updateProject: Project }>
    return result.data.updateProject
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}
