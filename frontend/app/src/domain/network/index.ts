import { NodeColors } from '../../constants'
import { DynamicProjectData, StaticProjectData } from '../../types'
import {
  calcProjectDynamicStatus,
  calcProjectDynamicValue,
  updateImportantNodesAsUrgent,
} from './dynamic'

export const convertProjectsIntoNetworkData = (pjs: StaticProjectData[]) => {
  const dynamicPjData = convertStaticProjects(pjs)
  const nodes = dynamicPjData.map(convertProjectIntoNode)
  const edges = dynamicPjData.flatMap(convertProjectIntoEdge)
  return { nodes, edges }
}

export const convertStaticProjects = (pjs: StaticProjectData[]): DynamicProjectData[] => {
  const getPj = (id: string) => pjs.find((pj) => pj.projectId === id)
  const filterPjByUnlockId = (id: string) => pjs.filter((pj) => pj.unlocks.includes(id))
  const dynamicPjs = pjs.map((pj) => ({
    ...pj,
    dynamicValue: calcProjectDynamicValue(pj, getPj),
    dynamicStatus: calcProjectDynamicStatus(pj, filterPjByUnlockId),
  }))
  return updateImportantNodesAsUrgent(dynamicPjs)
}

export const convertProjectIntoNode = (pj: DynamicProjectData) => {
  const colors = NodeColors[pj.dynamicStatus]
  const constrainedDynamicValue =
    pj.dynamicStatus === 'done'
      ? pj.staticValue
      : (Math.min(pj.dynamicValue, 100) / 10) * pj.staticValue
  return {
    id: pj.projectId,
    label: pj.title,
    size: 10 + constrainedDynamicValue / 5, // 10 ~ 30
    mass: 1 + constrainedDynamicValue / 10, // 1 ~ 10
    color: {
      border: colors.normal.border,
      background: colors.normal.background,
    },
    chosen: {
      node: (values: { color: string; borderColor: string }) => {
        values.color = colors.highlight.background
        values.borderColor = colors.highlight.border
      },
    },
  }
}

export const convertProjectIntoEdge = (pj: StaticProjectData) => {
  return pj.unlocks.map((unlockPjId) => ({
    from: pj.projectId,
    to: unlockPjId,
  }))
}
