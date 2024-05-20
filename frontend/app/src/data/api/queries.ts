export const ListProjects = /* GraphQL */ `
  query ListProjects {
    listProjects {
      projectId
      title
      unlocks
      staticStatus
      staticValue
    }
  }
`

export const CreateProject = /* GraphQL */ `
  mutation CreateProject($title: String!, $unlocks: [ID!] = []) {
    createProject(input: { title: $title, unlocks: $unlocks }) {
      projectId
      title
      unlocks
      staticStatus
      staticValue
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
    $staticValue: Int
    $staticStatus: String
  ) {
    updateProject(
      input: {
        projectId: $projectId
        title: $title
        unlocks: $unlocks
        staticValue: $staticValue
        staticStatus: $staticStatus
      }
    ) {
      projectId
      title
      unlocks
      staticStatus
      staticValue
    }
  }
`

export const GetProject = /* GraphQL */ `
  query MyQuery($projectId: ID!) {
    getProject(projectId: $projectId) {
      projectId
      title
      unlocks
      staticStatus
      staticValue
    }
  }
`
