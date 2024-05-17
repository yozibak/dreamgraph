import { Project } from "../types";

export const convertProjectsIntoNetworkData = (pjs: Project[]) => {
  const nodes = pjs.map(convertProjectIntoNode)
  const edges = pjs.flatMap(convertProjectIntoEdge)
  return {nodes, edges}
}

export const convertProjectIntoNode = (pj: Project) => {
  return {
    id: pj.projectId,
    label: pj.title
  }
}

export const convertProjectIntoEdge = (pj: Project) => {
  return pj.unlocks.map(unlockPjId => 
    ({
      from: pj.projectId,
      to: unlockPjId
    })
  )
}