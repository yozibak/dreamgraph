import { Project, ProjectWithValue } from 'app-domain'
import { GraphNetwork } from 'graph'
import { NodeColors } from '../../../constants'
import { useEffect } from 'react'

export const makeNetworkPresentation =
  (network: GraphNetwork) =>
  (projects: ProjectWithValue[]): void => {
    useEffect(() => {
      if (!projects.length) return
      const { nodes, edges } = convertProjectsIntoNetworkData(projects)
      nodes.forEach((n) => network.putNode(n))
      edges.forEach((e) => network.putEdge(e))
    }, [projects])
  }

const convertProjectsIntoNetworkData = (pjs: ProjectWithValue[]) => {
  const nodes = pjs.map(convertProjectIntoNode)
  const edges = pjs.flatMap(convertProjectIntoEdge)
  return { nodes, edges }
}

const convertProjectIntoNode = (pj: ProjectWithValue) => {
  const colors = NodeColors[pj.status]
  const constrainedDynamicValue =
    pj.status === 'done' ? pj.importance : Math.min(pj.value, 60) * pj.importance // max 300
  return {
    id: pj.id,
    label: pj.status === 'done' ? '' : pj.title,
    size: 10 + constrainedDynamicValue / 3, // 10 ~ 110
    mass: 1 + constrainedDynamicValue / 10, // 1 ~ 60
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

const convertProjectIntoEdge = (pj: Project) => {
  return pj.unlocks.map((unlock) => ({
    from: pj.id,
    to: unlock,
  }))
}
