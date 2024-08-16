import { Project } from './entities'
import {
  DataStore,
  initProject,
  makeGraphUseCases,
  makeProjectGraph,
  ProjectLoopError,
} from './useCases'

describe(`ProjectGraph`, () => {
  it(`can manage project data`, () => {
    const projects = [initProject({ title: 'first' }), initProject({ title: 'second' })]
    const graph = makeProjectGraph()
    graph.loadProjects(projects)
    expect(graph.projects).toMatchObject(projects)

    const newPj = initProject({ title: 'third' })
    graph.insertProject(newPj)
    expect(graph.projects).toMatchObject([...projects, newPj])

    graph.updateProject({ ...newPj, title: 'third project' })
    expect(graph.getProjectById(newPj.id).title).toBe('third project')

    graph.removeProject(newPj.id)
    expect(graph.projects).toMatchObject(projects)
  })
  it(`can tell whether a connection can cause loop`, () => {
    const projects = [
      initProject({ title: 'first' }),
      initProject({ title: 'second' }),
      initProject({ title: 'third' }),
    ]
    const graph = makeProjectGraph()
    graph.loadProjects(projects)

    graph.connect(projects[0].id, projects[1].id)

    expect(graph.willMakeLoop(projects[1].id, projects[0].id)).toBe(true)
    expect(graph.willMakeLoop(projects[1].id, projects[2].id)).toBe(false)
  })
  it(`can calculate value of specified project in the graph`, () => {
    const pj1: Project = initProject({
      importance: 1,
    })
    const pj2: Project = initProject({
      importance: 2,
    })
    const pj3: Project = initProject({
      importance: 3,
    })
    const pj4: Project = initProject({
      importance: 4,
    })
    const pj5: Project = initProject({
      importance: 5,
    })
    const pj6: Project = initProject({
      importance: 5,
    })
    const graph = makeProjectGraph()
    graph.loadProjects([pj1, pj2, pj3, pj4, pj5, pj6])
    graph.connect(pj1, pj2)
    graph.connect(pj1, pj3)
    graph.connect(pj3, pj4)
    graph.connect(pj5, pj1)

    expect(graph.valueOf(pj1)).toBe(
      pj1.importance + pj2.importance + pj3.importance + pj4.importance
    )
    expect(graph.valueOf(pj2)).toBe(pj2.importance)
    expect(graph.valueOf(pj3)).toBe(pj3.importance + pj4.importance)
    expect(graph.valueOf(pj4)).toBe(pj4.importance)
    expect(graph.valueOf(pj5)).toBe(pj5.importance + graph.valueOf(pj1))
    expect(graph.valueOf(pj6)).toBe(pj6.importance)
  })
})

describe(`${makeGraphUseCases.name}`, () => {
  const store = {
    createProject: jest.fn(),
    fetchProjects: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
  } satisfies DataStore

  beforeEach(() => store.fetchProjects.mockResolvedValue([]))
  afterEach(() => jest.resetAllMocks())

  const makeStoredProjects = (n = 3) => [...new Array(n)].map(initProject)

  test(`init`, async () => {
    const storedProjects = makeStoredProjects()
    store.fetchProjects.mockResolvedValue(storedProjects)
    const graph = makeGraphUseCases(store)
    await graph.initialize()
    expect(graph.readAll()).toEqual(storedProjects)
  })

  test(`insert new project`, async () => {
    const storedProjects = makeStoredProjects()
    store.fetchProjects.mockResolvedValue(storedProjects)
    const graph = makeGraphUseCases(store)
    await graph.initialize()

    const newProject: Project = initProject({ title: 'new pj' })
    await graph.insertNewProject(newProject)

    expect(store.createProject).toHaveBeenCalledWith(newProject)
    expect(graph.readAll()).toEqual([...storedProjects, newProject])
  })

  test(`update a project's properties`, async () => {
    const graph = makeGraphUseCases(store)

    const newProject: Project = initProject({ title: 'foo' })
    await graph.insertNewProject(newProject)
    await graph.updateProjectProperties(newProject, { title: 'bar' })

    expect(store.updateProject).toHaveBeenCalledWith({ ...newProject, title: 'bar' })
    const updated = graph.getProjectById(newProject.id)
    expect(updated).toEqual({ ...newProject, title: 'bar' })
  })

  test(`connect unlocking project`, async () => {
    const projects = makeStoredProjects()
    store.fetchProjects.mockResolvedValue(projects)
    const graph = makeGraphUseCases(store)
    await graph.initialize()

    const [p1, p2, p3] = projects
    await graph.connectUnlockingProject(p1, p2.id)

    expect(store.updateProject).toHaveBeenCalledWith({ ...p1, unlocks: [p2.id] })
    expect(graph.getProjectById(p1.id).unlocks).toEqual([p2.id])

    await graph.connectUnlockingProject(p2, p3.id)
    expect(store.updateProject).toHaveBeenLastCalledWith({ ...p2, unlocks: [p3.id] })
    expect(graph.getProjectById(p2.id).unlocks).toEqual([p3.id])

    const connectLoop = () => graph.connectUnlockingProject(p3, p1.id)
    await expect(connectLoop).rejects.toThrow(ProjectLoopError)
  })

  test(`remove connection`, async () => {
    const projects = makeStoredProjects()
    store.fetchProjects.mockResolvedValue(projects)
    const graph = makeGraphUseCases(store)
    await graph.initialize()

    const [p1, p2] = projects
    await graph.connectUnlockingProject(p1, p2.id)
    await graph.disconnectProjectUnlocks(p1, p2.id)

    expect(store.updateProject).toHaveBeenCalledWith({ ...p1, unlocks: [] })
    expect(graph.getProjectById(p1.id).unlocks).toEqual([])
  })

  test(`remove project`, async () => {
    const projects = makeStoredProjects()
    store.fetchProjects.mockResolvedValue(projects)
    const graph = makeGraphUseCases(store)
    await graph.initialize()

    const [p1, p2] = projects
    await graph.connectUnlockingProject(p1, p2.id)

    await graph.removeProject(p2)
    expect(graph.readAll()).toHaveLength(2)
    expect(graph.getProjectById(p1.id).unlocks).toEqual([])
  })

  test.todo(`read all`)
  test.todo(`get project by id`)
  test.todo(`get project detail`)
})
