export const ListProjects = /* GraphQL */ `
  query ListProjects {
    listProjects {
      projectId
      title
      unlocks
      status
      importance
    }
  }
`

export const CreateProject = /* GraphQL */ `
  mutation CreateProject(
    $projectId: ID!,
    $title: String!,
    $unlocks: [ID!]!,
    $importance: Int!,
    $status: String!,
  ) {
    createProject(
      input: {
        projectId: $projectId
        title: $title
        unlocks: $unlocks
        status: $status
        importance: $importance
      }
    ) {
      projectId
      title
      unlocks
      status
      importance
    }
  }
`

export const DeleteProject = /* GraphQL */ `
  mutation MyMutation($projectId: ID!) {
    deleteProject(projectId: $projectId)
  }
`

export const UpdateProject = /* GraphQL */ `
  mutation UpdateProject(
    $projectId: ID!
    $title: String
    $unlocks: [ID!]
    $importance: Int
    $status: String
  ) {
    updateProject(
      input: {
        projectId: $projectId
        title: $title
        unlocks: $unlocks
        importance: $importance
        status: $status
      }
    ) {
      projectId
      title
      unlocks
      status
      importance
    }
  }
`

export const GetProject = /* GraphQL */ `
  query MyQuery($projectId: ID!) {
    getProject(projectId: $projectId) {
      projectId
      title
      unlocks
      status
      importance
    }
  }
`
