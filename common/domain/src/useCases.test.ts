import { Project } from './entities'
import { DataStore, initProject, makeGraphUseCases, makeProjectGraph } from './useCases'

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
    graph.loadProjects([pj1, pj2, pj3, pj4,pj5, pj6])
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
  const storedProjects: Project[] = [
    initProject({}),
    initProject({}),
    initProject({}),
  ]
  const store = {
    createProject: jest.fn(),
    fetchProjects: jest.fn().mockResolvedValue(storedProjects),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
  } satisfies DataStore
  
  afterEach(() => jest.resetAllMocks())

  test(`insert new project`, async () => {
    const graph = makeGraphUseCases(store)
    await graph.init()
    expect(graph.readAll()).toEqual(storedProjects)

    const newProject: Project = initProject({title: 'new!'})
    await graph.insertNewProject(newProject)
    expect(store.createProject).toHaveBeenCalledWith(newProject)
    expect(graph.readAll()).toEqual([...storedProjects, newProject])
  })
})

// test(`${createNewProject.name}`, async () => {
//   const create = createNewProject(store)
//   await create({ title: 'foo bar' })
//   expect(store.makeProject).toHaveBeenCalledTimes(1)
//   expect((store.makeProject as jest.Mock).mock.calls[0][0]).toMatchObject({
//     id: expect.any(String),
//     title: 'foo bar',
//     importance: 3,
//     status: 'normal',
//     unlocks: [],
//   })
// })

// test(`${updateProjectProperties.name}`, async () => {
//   const update = updateProjectProperties(store)
//   ;(store.getProject as jest.Mock).mockResolvedValue({
//     id: '1',
//     title: 'foo bar',
//     importance: 3,
//     status: 'normal',
//     unlocks: [],
//     value: 3,
//   })
//   await update('1', { title: 'baz', importance: 5 })
//   expect(store.getProject).toHaveBeenCalled()
//   expect(store.updateProject).toHaveBeenCalled()
//   expect((store.updateProject as jest.Mock).mock.calls[0][0]).toMatchObject({
//     title: 'baz',
//     importance: 5,
//     status: 'normal',
//     unlocks: [],
//   })
// })

// describe(`${addUnlockingProjects.name}`, () => {
//   it(`can add an project to unlocks list`, async () => {
//     const addUnlock = addUnlockingProjects(store)
//     const pjData = [initProject({ title: 'first' }), initProject({ title: 'second' })]
//     ;(store.getProject as jest.Mock).mockImplementation((id) => pjData.find((p) => p.id === id)!)
//     await addUnlock(pjData[0], pjData[1].id)
//     expect(store.updateProject).toHaveBeenCalled()
//     expect((store.updateProject as jest.Mock).mock.calls[0][0]).toMatchObject({
//       title: 'first',
//       importance: 3,
//       status: 'normal',
//       unlocks: [pjData[1]],
//       value: 6, // now derived from the relation
//     })
//   })
//   it(`cannot add an project that makes loop`, async () => {
//     const addUnlock = addUnlockingProjects(store)
//     const pjData = [initProject({ title: 'first' }), initProject({ title: 'second' })]
//     ;(store.getProject as jest.Mock).mockImplementation((id) => pjData.find((p) => p.id === id)!)
//     pjData[1].unlocks.push(pjData[0])

//     const act = async () => await addUnlock(pjData[0], pjData[1].id)
//     expect(act).rejects.toThrow(ProjectLoopError)
//   })
// })

// test(`${removeProjectUnlocks.name}`, async () => {
//   const removeUnlock = removeProjectUnlocks(store)
//   const pjData = [initProject({ title: 'first' }), initProject({ title: 'second' })]
//   pjData[0].unlocks.push(pjData[1])
//   jest.spyOn(store, 'getProject').mockImplementation(async (id) => pjData.find((p) => p.id === id)!)
//   expect(pjData[0].unlocks).toHaveLength(1)
//   expect(pjData[0].value).toBe(6)

//   await removeUnlock(pjData[0], pjData[1].id)
//   expect(store.updateProject).toHaveBeenCalledWith({
//     id: expect.any(String),
//     title: 'first',
//     importance: 3,
//     status: 'normal',
//     unlocks: [],
//     value: 3,
//   })
// })

// test(`${fetchAllProjects.name}`, async () => {
//   const fetchPjs = fetchAllProjects(store)
//   const pjData = [initProject({ title: 'first' }), initProject({ title: 'second' })]
//   pjData[0].unlocks.push(pjData[1])
//   ;(store.fetchProjects as jest.Mock).mockResolvedValue(pjData)
//   const pjs = await fetchPjs()
//   expect(pjs).toMatchObject(pjData)
// })

// test(`${getProjectDetail.name}`, async () => {
//   const getPj = getProjectDetail(store)
//   const pjData = [
//     initProject({ title: 'first' }),
//     initProject({ title: 'second' }),
//     initProject({ title: 'third' }),
//   ]
//   pjData[1].unlocks.push(pjData[2])
//   ;(store.fetchProjects as jest.Mock).mockResolvedValue(pjData)
//   ;(store.getProject as jest.Mock).mockImplementation((id) => pjData.find((p) => p.id === id))

//   const { project, availableUnlockOptions } = await getPj(pjData[0].id)
//   expect(project).toMatchObject(pjData[0])
//   expect(availableUnlockOptions).toHaveLength(2)
// })

// test(`${deleteProject.name}`, async () => {
//   const [pj1, pj2, pj3]: Project[] = [...new Array(3)].map(initProject)
//   pj1.unlocks.push(pj2, pj3)
//   jest.spyOn(store, 'fetchProjects').mockResolvedValue([pj1, pj2, pj3])

//   const deletePj = deleteProject(store)
//   await deletePj(pj2)

//   expect(store.updateProject).toHaveBeenCalledWith({ ...pj1, unlocks: [pj3] })
//   expect(store.deleteProject).toHaveBeenCalledWith(pj2.id)
// })

// describe(`spread operator & gettter issue`, () => {
//   it(`can override with the concrete value`, () => {
//     const pj1 = initProject({ title: 'first' })
//     const pj2 = initProject({ title: 'second' })
//     expect(pj1.value).toBe(3)
//     expect(pj2.value).toBe(3)
//     const newPj1: Project = {
//       ...pj1,
//       unlocks: [...pj1.unlocks, pj2],
//     }
//     expect(newPj1.value).toBe(3) // still 3
//   })
//   it(`can be solved with explicit getter`, () => {
//     const pj1 = initProject({ title: 'first' })
//     const pj2 = initProject({ title: 'second' })
//     expect(pj1.value).toBe(3)
//     expect(pj2.value).toBe(3)
//     const newPj1: Project = {
//       ...pj1,
//       unlocks: [...pj1.unlocks, pj2],
//       get value() {
//         return graph.valueOf(this)
//       },
//     }
//     expect(newPj1.value).toBe(6) // still 3
//   })
//   it(`can be solved with Object.assign`, () => {
//     const pj1 = initProject({ title: 'first' })
//     const pj2 = initProject({ title: 'second' })
//     expect(pj1.value).toBe(3)
//     expect(pj2.value).toBe(3)
//     Object.assign(pj1, { unlocks: [...pj1.unlocks, pj2] })

//     expect(pj1.value).toBe(6) // still 3
//   })
// })
