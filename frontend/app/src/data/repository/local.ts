import { Project, ProjectDataRepository, ProjectNotFoundError, initProject } from 'app-domain'

const ProjectsStorageKey = 'dreamgraph-projects-local'

export type LocalProjectRepository = ProjectDataRepository & {
  deleteLocalData: () => void
}

export const makeLocalRepository = (): LocalProjectRepository => {
  const data = localStorage.getItem(ProjectsStorageKey)
  let projects: Project[] = data ? (JSON.parse(data) as Project[]) : exampleProjects()
  function updateData(newProjectsData: Project[]) {
    projects = newProjectsData
    localStorage.setItem(ProjectsStorageKey, JSON.stringify(projects))
  }
  return {
    fetchProjects: async () => projects,
    createProject: async (newPj) => {
      updateData([...projects, newPj])
      return newPj
    },
    updateProject: async (updatePj) => {
      const pj = projects.find((pj) => pj.id === updatePj.id)
      if (!pj) {
        throw new ProjectNotFoundError(updatePj.id)
      }
      const update = { ...pj, ...updatePj }
      updateData(projects.map((pj) => (pj.id === updatePj.id ? update : pj)))
      return update
    },
    deleteProject: async (id) => {
      updateData(projects.filter((pj) => pj.id !== id))
    },
    deleteLocalData: () => {
      localStorage.setItem(ProjectsStorageKey, JSON.stringify([]))
    },
  }
}

const exampleProjects = () => {
  const target = initProject({
    title: 'make my videogame successful',
    importance: 2,
  })
  const nice = initProject({
    title: 'make the game nicer',
    importance: 5,
  })
  const resource = initProject({
    title: 'prepare minimum resources to start the project',
    importance: 5,
  })
  const money = initProject({
    title: 'prepare some money',
  })
  const dev = initProject({
    title: 'hire a nice game developer',
    importance: 4,
  })
  const sound = initProject({
    title: 'hire a sound person maybe?',
    importance: 1,
  })
  const funding = initProject({
    title: 'apply for funding',
  })
  const pitch = initProject({
    title: 'prepare a nice, convincing pitch',
    importance: 4,
    status: 'in-progress',
  })
  const design = initProject({
    title: 'initial game design',
    status: 'done',
  })
  const demo = initProject({
    title: 'build & release the first demo',
  })

  design.unlocks.push(pitch.id)
  pitch.unlocks.push(funding.id, dev.id)
  funding.unlocks.push(resource.id, money.id)
  money.unlocks.push(dev.id)
  dev.unlocks.push(resource.id)
  sound.unlocks.push(nice.id)
  nice.unlocks.push(target.id)
  resource.unlocks.push(demo.id)
  demo.unlocks.push(nice.id)

  return [target, resource, dev, sound, funding, pitch, design, money, nice, demo]
}
