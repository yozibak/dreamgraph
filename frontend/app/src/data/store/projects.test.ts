import { useProjects } from './projects'
import { act, renderHook, waitFor } from '@testing-library/react'
import * as api from '../api'
import { StaticProjectData } from '../../types'

const mockPj = (id: string): StaticProjectData => ({
  projectId: id,
  title: 'example',
  unlocks: [],
  staticStatus: 'normal',
  staticValue: 10,
})

test(`initial fetch`, async () => {
  const pj = mockPj('pj1')
  jest.spyOn(api, 'listProjects').mockResolvedValue([pj])
  const { result } = renderHook(() => useProjects())
  await waitFor(() => expect(result.current.projects.length).toBe(1))
  expect(result.current.projects[0]).toEqual(pj)
})

test(`createProject`, async () => {
  const [pj1, pj2] = [mockPj('pj-1'), mockPj('pj-2')]
  jest.spyOn(api, 'listProjects').mockResolvedValue([pj1])
  const spyCreateProject = jest.spyOn(api, 'createProject').mockResolvedValue(pj2)
  const { result } = renderHook(() => useProjects())
  await waitFor(() => expect(result.current.projects.length).toBe(1))
  const input = { title: 'new project', unlocks: [] }
  await act(async () => {
    await result.current.createProject(input)
  })
  expect(spyCreateProject).toHaveBeenCalledWith(input)
  expect(result.current.projects.length).toBe(2)
})

test(`updateProject`, async () => {
  const pj = mockPj('pj-1')
  const updated = { ...pj, title: 'updated' }
  jest.spyOn(api, 'listProjects').mockResolvedValue([pj])
  const spyUpdateProject = jest.spyOn(api, 'updateProject').mockResolvedValue(updated)
  const { result } = renderHook(() => useProjects())
  await waitFor(() => expect(result.current.projects.length).toBe(1))
  await act(async () => {
    await result.current.updateProject(updated)
  })
  expect(spyUpdateProject).toHaveBeenCalledWith(updated)
  expect(result.current.projects[0]).toEqual(updated)
})
