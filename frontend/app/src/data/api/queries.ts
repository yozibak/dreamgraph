export const ListProjects = /* GraphQL */ `
  query ListProjects {
    listProjects {
      projectId
      title
      unlocks
    }
  }
`

export const CreateProject = /* GraphQL */ `
  mutation CreateProject($title: String!, $unlocks: [ID!] = []) {
    createProject(input: { title: $title, unlocks: $unlocks }) {
      projectId
      title
      unlocks
    }
  }
`

export const DeleteProject = /* GraphQL */ `
  mutation MyMutation($projectId: ID!) {
    deleteProject(projectId: $projectId)
  }
`

export const UpdateProject = /* GraphQL */ `
  mutation UpdateProject($projectId: ID!, $title: String, $unlocks: [ID!]) {
    updateProject(input: { projectId: $projectId, title: $title, unlocks: $unlocks }) {
      projectId
      title
      unlocks
    }
  }
`
