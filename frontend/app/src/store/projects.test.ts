import { useProjects } from './projects'
import { renderHook, waitFor } from '@testing-library/react'
import * as network from '../network'
import { Project } from '../types'

test(`hooks test`, async () => {
  const pj: Project = {
    projectId: '',
    title: '',
    unlocks: [],
  }
  jest.spyOn(network, 'listProjects').mockResolvedValue([pj])
  const { result } = renderHook(() => useProjects())
  await waitFor(() => {
    expect(result.current.projects.length).toBe(1)
  })
})
