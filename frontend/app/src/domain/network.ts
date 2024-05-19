import { StaticProjectData } from '../types'

export const convertProjectsIntoNetworkData = (pjs: StaticProjectData[]) => {
  const nodes = pjs.map(convertProjectIntoNode)
  const edges = pjs.flatMap(convertProjectIntoEdge)
  return { nodes, edges }
}

export const convertProjectIntoNode = (pj: StaticProjectData) => {
  return {
    id: pj.projectId,
    label: pj.title,
  }
}

export const convertProjectIntoEdge = (pj: StaticProjectData) => {
  return pj.unlocks.map((unlockPjId) => ({
    from: pj.projectId,
    to: unlockPjId,
  }))
}
