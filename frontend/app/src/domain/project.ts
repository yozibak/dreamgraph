import { createContext, useEffect, useState } from 'react'
import { makeUseCases, Project } from 'use-cases'
import { ProjectImportance, ProjectStatus } from 'use-cases/src/project'
import { makeOfflineProjectsStore } from '../data/store/offline'
import { InteractionStore, NodeConnection } from './interaction'
import { convertProjectsIntoNetworkData, network } from './network'

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

const store = makeOfflineProjectsStore()
const useCases = makeUseCases(store)

export const useAppState = ({ connection }: InteractionStore) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project>()
  const [unlockOptions, setUnlockOptions] = useState<Project[]>([])

  const refresh = async () => {
    const pjs = await useCases.fetchAllProjects()
    setProjects(pjs)
  }

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    async function updateNetworkGraph() {
      if (projects.length) {
        const { nodes, edges } = convertProjectsIntoNetworkData(projects)
        nodes.forEach((n) => network.putNode(n))
        edges.forEach((e) => network.putEdge(e))
      }
    }
    updateNetworkGraph()
  }, [projects])

  const mutate =
    <Args extends unknown[]>(cb: (...args: Args) => unknown) =>
    async (...args: Args) => {
      await cb(...args)
      await refresh()
    }

  const selectProject = async (projectId: string) => {
    const { project, availableUnlockOptions } = await useCases.getProjectDetail(projectId)
    setSelectedProject(project)
    setUnlockOptions(availableUnlockOptions)
  }

  const unselectProject = () => setSelectedProject(undefined)

  const addProject = mutate(async () => {
    const newPj = await useCases.createNewProject({ title: 'new project' })
    setSelectedProject(newPj)
  })

  const editProject = mutate(async (update: Partial<Project>) => {
    if (!selectedProject) return
    const updated = await useCases.updateProjectProperties(selectedProject, update)
    setSelectedProject(updated)
  })

  const editProjectTitle = (newTitle: string) =>
    editProject({
      title: newTitle,
    })
  const updateProjectImportance = (importance: ProjectImportance) =>
    editProject({
      importance,
    })
  const updateProjectStatus = (status: ProjectStatus) =>
    editProject({
      status,
    })

  const addProjectUnlocks = mutate(async (pjId: string) => {
    if (!selectedProject) return
    await useCases.addUnlockingProjects(selectedProject, pjId)
  })

  const connectProjects = mutate(async ({ from, to }: NodeConnection) => {
    await useCases.addUnlockingProjects(from, to)
  })

  useEffect(() => {
    if (connection) {
      connectProjects(connection)
    }
  }, [connection])

  const removeProjectUnlocks = mutate(async (rm: string) => {
    if (!selectedProject) return
    await useCases.removeProjectUnlocks(selectedProject, rm)
    network.removeEdge({ from: selectedProject.id, to: rm })
  })

  const removeProject = mutate(async () => {
    if (!selectedProject) return
    await useCases.deleteProject(selectedProject.id)
    network.removeNode(selectedProject.id)
    network.removeEdgesByNode(selectedProject.id)
    unselectProject()
  })

  return {
    addProject,
    selectProject,
    unselectProject,
    editProjectTitle,
    addProjectUnlocks,
    removeProjectUnlocks,
    removeProject,
    selectedProject,
    updateProjectValue: updateProjectImportance,
    updateProjectStatus,
    connectProjects,
    unlockOptions,
  }
}
