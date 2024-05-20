import { DynamicProjectData, StaticProjectData } from '../../types'
import { calcProjectDynamicStatus, calcProjectDynamicValue } from './dynamic'

export const convertProjectsIntoNetworkData = (pjs: StaticProjectData[]) => {
  const dynamicPjData = convertStaticProjects(pjs)
  const nodes = dynamicPjData.map(convertProjectIntoNode)
  const edges = dynamicPjData.flatMap(convertProjectIntoEdge)
  return { nodes, edges }
}

export const convertStaticProjects = (pjs: StaticProjectData[]): DynamicProjectData[] => {
  const getPj = (id: string) => pjs.find((pj) => pj.projectId === id)
  const filterPjByUnlockId = (id: string) => pjs.filter((pj) => pj.unlocks.includes(id))
  return pjs.map((pj) => ({
    ...pj,
    dynamicValue: calcProjectDynamicValue(pj, getPj),
    dynamicStatus: calcProjectDynamicStatus(pj, filterPjByUnlockId),
  }))
}

export const convertProjectIntoNode = (pj: DynamicProjectData) => {
  return {
    id: pj.projectId,
    label: pj.title,
    size: 10 + pj.dynamicValue,
    mass: 1 + pj.dynamicValue / 10,
  }
}

export const convertProjectIntoEdge = (pj: StaticProjectData) => {
  return pj.unlocks.map((unlockPjId) => ({
    from: pj.projectId,
    to: unlockPjId,
  }))
}
