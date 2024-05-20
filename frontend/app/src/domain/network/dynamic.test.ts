import { ProjectValue } from 'common'
import { DynamicProjectData, StaticProjectData } from '../../types'
import {
  calcProjectDynamicStatus,
  calcProjectDynamicValue,
  determineUrgentProjects,
} from './dynamic'

const projects = [
  {
    projectId: 'pj-1',
    unlocks: ['pj-2', 'pj-3'],
    staticValue: ProjectValue.low,
    staticStatus: 'normal',
  },
  {
    projectId: 'pj-2',
    unlocks: [],
    staticValue: ProjectValue.mid,
  },
  {
    projectId: 'pj-3',
    unlocks: ['pj-4'],
    staticValue: ProjectValue.high,
  },
  {
    projectId: 'pj-4',
    unlocks: [],
    staticValue: ProjectValue.high,
  },
  {
    projectId: 'pj-5',
    unlocks: ['pj-1'],
    staticValue: ProjectValue.high,
    staticStatus: 'done',
  },
  {
    projectId: 'pj-6',
    unlocks: [],
    staticValue: ProjectValue.high,
    staticStatus: 'ongoing',
  },
] as unknown as StaticProjectData[]

const getPj = (id: string) => projects.find((p) => p.projectId === id)!
const findPj = (id: string) => projects.filter((p) => p.unlocks.includes(id))

describe(`${calcProjectDynamicValue.name}`, () => {
  test(`project with unlocks`, () => {
    const result = calcProjectDynamicValue(projects[0], getPj)
    expect(result).toBe(ProjectValue.low + ProjectValue.mid + ProjectValue.high + ProjectValue.high)
  })
  test(`project without unlocks`, () => {
    const result = calcProjectDynamicValue(projects[1], getPj)
    expect(result).toBe(ProjectValue.mid)
  })
})

describe(`${calcProjectDynamicStatus.name}`, () => {
  test(`project that depends on others`, () => {
    const result = calcProjectDynamicStatus(projects[1], findPj)
    expect(result).toBe('blocked')
  })
  test(`project that depends on done projects`, () => {
    const result = calcProjectDynamicStatus(projects[0], findPj)
    expect(result).toBe('normal')
  })
  test(`project that doesn't depend on others`, () => {
    const result = calcProjectDynamicStatus(projects[5], findPj)
    expect(result).toBe('ongoing')
  })
})

test(`${determineUrgentProjects.name}`, () => {
  const result = determineUrgentProjects([
    { projectId: '0', dynamicValue: 20, dynamicStatus: 'normal' },
    { projectId: '1', dynamicValue: 10, dynamicStatus: 'normal' },
    { projectId: '2', dynamicValue: 20, dynamicStatus: 'ongoing' },
    { projectId: '3', dynamicValue: 30, dynamicStatus: 'blocked' },
    { projectId: '4', dynamicValue: 40, dynamicStatus: 'done' },
  ] as DynamicProjectData[])
  expect(result).toEqual(['0', '1'])
})
