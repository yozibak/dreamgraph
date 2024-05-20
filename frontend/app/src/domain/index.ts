import { StaticStatus, UpdateProjectInput } from 'common'
import { EdgeItem, NodeItem, makeGraphNetwork } from 'graph'
import { createContext, useEffect, useState } from 'react'
import { getProject } from '../data/api'
import { useProjects } from '../data/store/projects'
import { StaticProjectData } from '../types'
import { convertProjectsIntoNetworkData } from './network'

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

export const network = makeGraphNetwork<NodeItem, EdgeItem>()

export const useAppState = () => {
  const { projects, createProject, deleteProject, updateProject } = useProjects()
  const [selectedProject, setSelectedProject] = useState<StaticProjectData>()

  useEffect(() => {
    async function init() {
      if (projects.length) {
        const { nodes, edges } = convertProjectsIntoNetworkData(projects)
        nodes.forEach((n) => network.putNode(n))
        edges.forEach((e) => network.putEdge(e))
      }
    }
    init()
  }, [projects])

  async function selectProject(projectId: string) {
    const pj = await getProject(projectId)
    if (pj) {
      setSelectedProject(pj)
    }
  }

  function unselectProject() {
    setSelectedProject(undefined)
  }

  async function addProject() {
    const pj = await createProject({ title: 'new project' })
    if (pj) {
      setSelectedProject(pj)
      // TODO: focus on the node
    }
  }

  async function editProjectTitle(newTitle: string) {
    if (!selectedProject) return
    const input: UpdateProjectInput = {
      ...selectedProject,
      title: newTitle,
    }
    const result = await updateProject(input)
    if (result) {
      setSelectedProject(result)
    }
  }

  async function addProjectUnlocks(pjId: string) {
    if (!selectedProject) return
    const input: UpdateProjectInput = {
      ...selectedProject,
      unlocks: [...selectedProject.unlocks, pjId],
    }
    const result = await updateProject(input)
    if (result) {
      setSelectedProject(result)
    }
  }

  async function removeProjectUnlocks(rm: string) {
    if (!selectedProject) return
    const input: UpdateProjectInput = {
      ...selectedProject,
      unlocks: selectedProject.unlocks.filter((u) => u !== rm),
    }
    const result = await updateProject(input)
    if (result) {
      network.removeEdge({ from: selectedProject.projectId, to: rm })
    }
  }

  async function removeProject() {
    if (!selectedProject) return
    const result = await deleteProject(selectedProject.projectId)
    if (result) {
      unselectProject()
      network.removeNode(selectedProject.projectId)
      network.removeEdgesByNode(selectedProject.projectId)
    }
  }

  async function updateProjectValue(value: number) {
    if (!selectedProject) return
    const input: UpdateProjectInput = {
      ...selectedProject,
      staticValue: value,
    }
    await updateProject(input)
  }

  async function updateProjectStatus(status: StaticStatus) {
    if (!selectedProject) return
    const input: UpdateProjectInput = {
      ...selectedProject,
      staticStatus: status,
    }
    await updateProject(input)
  }

  return {
    addProject,
    selectProject,
    unselectProject,
    editProjectTitle,
    addProjectUnlocks,
    removeProjectUnlocks,
    removeProject,
    selectedProject,
    updateProjectValue,
    updateProjectStatus,
  }
}
