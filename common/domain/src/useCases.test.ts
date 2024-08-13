import { calcProjectValue } from './project'
import {
  Project,
  createNewProject,
  DataStore,
  deleteProject,
  updateProjectProperties,
  makeProject,
  addUnlockingProjects,
  removeProjectUnlocks,
  fetchAllProjects,
  getProjectDetail,
  ProjectLoopError,
} from './useCases'

const store: DataStore = {
  createProject: jest.fn(),
  fetchProjects: jest.fn(),
  getProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
}

afterEach(() => jest.resetAllMocks())

test(`${createNewProject.name}`, async () => {
  const create = createNewProject(store)
  await create({ title: 'foo bar' })
  expect(store.createProject).toHaveBeenCalledTimes(1)
  expect((store.createProject as jest.Mock).mock.calls[0][0]).toMatchObject({
    id: expect.any(String),
    title: 'foo bar',
    importance: 3,
    status: 'normal',
    unlocks: [],
  })
})

test(`${updateProjectProperties.name}`, async () => {
  const update = updateProjectProperties(store)
  ;(store.getProject as jest.Mock).mockResolvedValue({
    id: '1',
    title: 'foo bar',
    importance: 3,
    status: 'normal',
    unlocks: [],
    value: 3,
  })
  await update('1', { title: 'baz', importance: 5 })
  expect(store.getProject).toHaveBeenCalled()
  expect(store.updateProject).toHaveBeenCalled()
  expect((store.updateProject as jest.Mock).mock.calls[0][0]).toMatchObject({
    title: 'baz',
    importance: 5,
    status: 'normal',
    unlocks: [],
  })
})

describe(`${addUnlockingProjects.name}`, () => {
  it(`can add an project to unlocks list`, async () => {
    const addUnlock = addUnlockingProjects(store)
    const pjData = [makeProject({ title: 'first' }), makeProject({ title: 'second' })]
    ;(store.getProject as jest.Mock).mockImplementation((id) => pjData.find((p) => p.id === id)!)
    await addUnlock(pjData[0], pjData[1].id)
    expect(store.updateProject).toHaveBeenCalled()
    expect((store.updateProject as jest.Mock).mock.calls[0][0]).toMatchObject({
      title: 'first',
      importance: 3,
      status: 'normal',
      unlocks: [pjData[1]],
      value: 6, // now derived from the relation
    })
  })
  it(`cannot add an project that makes loop`, async () => {
    const addUnlock = addUnlockingProjects(store)
    const pjData = [makeProject({ title: 'first' }), makeProject({ title: 'second' })]
    ;(store.getProject as jest.Mock).mockImplementation((id) => pjData.find((p) => p.id === id)!)
    pjData[1].unlocks.push(pjData[0])

    const act = async () => await addUnlock(pjData[0], pjData[1].id)
    expect(act).rejects.toThrow(ProjectLoopError)
  })
})

test(`${removeProjectUnlocks.name}`, async () => {
  const removeUnlock = removeProjectUnlocks(store)
  const pjData = [makeProject({ title: 'first' }), makeProject({ title: 'second' })]
  pjData[0].unlocks.push(pjData[1])
  jest.spyOn(store, 'getProject').mockImplementation(async (id) => pjData.find((p) => p.id === id)!)
  expect(pjData[0].unlocks).toHaveLength(1)
  expect(pjData[0].value).toBe(6)

  await removeUnlock(pjData[0], pjData[1].id)
  expect(store.updateProject).toHaveBeenCalledWith({
    id: expect.any(String),
    title: 'first',
    importance: 3,
    status: 'normal',
    unlocks: [],
    value: 3,
  })
})

test(`${fetchAllProjects.name}`, async () => {
  const fetchPjs = fetchAllProjects(store)
  const pjData = [makeProject({ title: 'first' }), makeProject({ title: 'second' })]
  pjData[0].unlocks.push(pjData[1])
  ;(store.fetchProjects as jest.Mock).mockResolvedValue(pjData)
  const pjs = await fetchPjs()
  expect(pjs).toMatchObject(pjData)
})

test(`${getProjectDetail.name}`, async () => {
  const getPj = getProjectDetail(store)
  const pjData = [
    makeProject({ title: 'first' }),
    makeProject({ title: 'second' }),
    makeProject({ title: 'third' }),
  ]
  pjData[1].unlocks.push(pjData[2])
  ;(store.fetchProjects as jest.Mock).mockResolvedValue(pjData)
  ;(store.getProject as jest.Mock).mockImplementation((id) => pjData.find((p) => p.id === id))

  const { project, availableUnlockOptions } = await getPj(pjData[0].id)
  expect(project).toMatchObject(pjData[0])
  expect(availableUnlockOptions).toHaveLength(2)
})

test(`${deleteProject.name}`, async () => {
  const [pj1, pj2, pj3]: Project[] = [...new Array(3)].map(makeProject)
  pj1.unlocks.push(pj2, pj3)
  jest.spyOn(store, 'fetchProjects').mockResolvedValue([pj1, pj2, pj3])

  const deletePj = deleteProject(store)
  await deletePj(pj2)

  expect(store.updateProject).toHaveBeenCalledWith({ ...pj1, unlocks: [pj3] })
  expect(store.deleteProject).toHaveBeenCalledWith(pj2.id)
})

describe(`spread operator & gettter issue`, () => {
  it(`can override with the concrete value`, () => {
    const pj1 = makeProject({ title: 'first' })
    const pj2 = makeProject({ title: 'second' })
    expect(pj1.value).toBe(3)
    expect(pj2.value).toBe(3)
    const newPj1: Project = {
      ...pj1,
      unlocks: [...pj1.unlocks, pj2],
    }
    expect(newPj1.value).toBe(3) // still 3
  })
  it(`can be solved with explicit getter`, () => {
    const pj1 = makeProject({ title: 'first' })
    const pj2 = makeProject({ title: 'second' })
    expect(pj1.value).toBe(3)
    expect(pj2.value).toBe(3)
    const newPj1: Project = {
      ...pj1,
      unlocks: [...pj1.unlocks, pj2],
      get value() {
        return calcProjectValue(this)
      },
    }
    expect(newPj1.value).toBe(6) // still 3
  })
  it(`can be solved with Object.assign`, () => {
    const pj1 = makeProject({ title: 'first' })
    const pj2 = makeProject({ title: 'second' })
    expect(pj1.value).toBe(3)
    expect(pj2.value).toBe(3)
    Object.assign(pj1, { unlocks: [...pj1.unlocks, pj2] })

    expect(pj1.value).toBe(6) // still 3
  })
})
