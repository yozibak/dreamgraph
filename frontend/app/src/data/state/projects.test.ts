import { useProjects } from './projects'
import { renderHook, waitFor } from '@testing-library/react'
import * as api from '../api'
import { StaticProjectData } from '../../types'

test.skip(`hooks test`, async () => {
  const pj: StaticProjectData = {
    projectId: '',
    title: '',
    unlocks: [],
    staticValue: 0,
    staticStatus: 'normal'
  }
  jest.spyOn(api, 'listProjects').mockResolvedValue([pj])
  const { result } = renderHook(() => useProjects())
  await waitFor(() => {
    expect(result.current.projects.length).toBe(1)
  })
})
