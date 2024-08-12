import { Project, createNewProject, DataStore, deleteProject, updateProjectProperties, makeProject } from './useCases'

const store: DataStore = {
  createProject: jest.fn(),
  fetchProjects: jest.fn(),
  getProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
}

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
  jest
    .spyOn(store, 'getProject')
    .mockResolvedValue({
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

test(`${deleteProject.name}`, async () => {
  const [pj1, pj2, pj3]:Project[] = [...new Array(3)].map(makeProject)
  pj1.unlocks.push(pj2, pj3)
  jest.spyOn(store, 'fetchProjects').mockResolvedValue([pj1, pj2, pj3])

  const deletePj = deleteProject(store)
  await deletePj(pj2)

  expect(store.updateProject).toHaveBeenCalledWith({...pj1, unlocks: [pj3]})
  expect(store.deleteProject).toHaveBeenCalledWith(pj2.id)
})
