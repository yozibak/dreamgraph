import { EdgeItem, NodeItem, makeGraphNetwork } from 'graph'
import { NodeColors } from '../../constants'
import { Project } from 'use-cases'

export const network = makeGraphNetwork<NodeItem, EdgeItem>()

export const convertProjectsIntoNetworkData = (pjs: Project[]) => {
  const nodes = pjs.map(convertProjectIntoNode)
  const edges = pjs.flatMap(convertProjectIntoEdge)
  return { nodes, edges }
}

export const convertProjectIntoNode = (pj: Project) => {
  const colors = NodeColors[pj.status]
  const constrainedDynamicValue = pj.value
  return {
    id: pj.id,
    label: pj.status === 'done' ? '' : pj.title,
    title: pj.status !== 'done' ? '' : pj.title,
    size: 10 + constrainedDynamicValue / 2, // 10 ~ 80
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

export const convertProjectIntoEdge = (pj: Project) => {
  return pj.unlocks.map((unlock) => ({
    from: pj.id,
    to: unlock.id,
  }))
}
