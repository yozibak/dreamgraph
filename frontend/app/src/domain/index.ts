import { StaticStatus, UpdateProjectInput } from 'common'
import { EdgeItem, NodeItem, makeGraphNetwork } from 'graph'
import { createContext, useEffect, useState } from 'react'
import { getProject } from '../data/api'
import { useProjects } from '../data/store/projects'
import { StaticProjectData } from '../types'
import { convertProjectsIntoNetworkData } from './network'
import { filterUnlockOptions, getUnlockProjects } from './relation'

export const network = makeGraphNetwork<NodeItem, EdgeItem>()

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

export const useAppState = () => {
  const { projects, createProject, deleteProject, updateProject } = useProjects()
  const [selectedProject, setSelectedProject] = useState<StaticProjectData>()
  const unlockProjects = selectedProject ? getUnlockProjects(projects, selectedProject) : undefined
  const unlockOptions = selectedProject ? filterUnlockOptions(projects, selectedProject) : undefined

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

  const selectProject = async (projectId: string) => {
    const pj = await getProject(projectId)
    if (pj) {
      setSelectedProject(pj)
    }
  }

  const unselectProject = () => setSelectedProject(undefined)

  const addProject = async () => {
    const pj = await createProject({ title: 'new project' })
    if (pj) {
      setSelectedProject(pj)
      // TODO: focus on the node
    }
  }

  const editProject = async (update: Partial<Omit<UpdateProjectInput, 'projectId'>>) => {
    if (!selectedProject) return
    const result = await updateProject({ ...selectedProject, ...update })
    if (result) {
      setSelectedProject(result)
      return result
    }
  }

  const editProjectTitle = (newTitle: string) =>
    editProject({
      title: newTitle,
    })

  const updateProjectValue = (value: number) =>
    editProject({
      staticValue: value,
    })

  const updateProjectStatus = (status: StaticStatus) =>
    editProject({
      staticStatus: status,
    })

  const addProjectUnlocks = (pjId: string) => {
    if (!selectedProject) return
    editProject({
      unlocks: [...selectedProject.unlocks, pjId],
    })
  }

  const removeProjectUnlocks = (rm: string) => {
    if (!selectedProject) return
    editProject({
      unlocks: selectedProject.unlocks.filter((u) => u !== rm),
    })
    network.removeEdge({ from: selectedProject.projectId, to: rm })
  }

  const removeProject = async () => {
    if (!selectedProject) return
    const result = await deleteProject(selectedProject.projectId)
    if (result) {
      unselectProject()
      network.removeNode(selectedProject.projectId)
      network.removeEdgesByNode(selectedProject.projectId)
    }
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
    unlockProjects,
    unlockOptions,
  }
}
