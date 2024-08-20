import {
  makeGraphUseCases,
  Project,
  ProjectImportance,
  ProjectStatus,
  ProjectWithValue,
} from 'app-domain'
import { createContext, useEffect, useState } from 'react'
import { makeCloudProjectStore } from '../data/store/projects'
import { InteractionStore, NodeConnection } from './interaction'
import { convertProjectsIntoNetworkData, network } from './network'

export const AppContext = createContext<AppState>({} as AppState)

export type AppState = ReturnType<typeof useAppState>

const store = makeCloudProjectStore()
const useCases = makeGraphUseCases(store)

export const useAppState = ({ connection }: InteractionStore) => {
  const [projects, setProjects] = useState<ProjectWithValue[]>([])
  const [selectedId, setSelected] = useState<Project['id']>()

  // update information everytime state changes
  const selectedProjectDetail = selectedId ? useCases.getProjectDetail(selectedId) : undefined

  useEffect(() => {
    async function init() {
      await useCases.initialize()
      setProjects(useCases.readAll())
    }
    init()
  }, [])

  useEffect(() => {
    if (!projects.length) return
    const { nodes, edges } = convertProjectsIntoNetworkData(projects)
    nodes.forEach((n) => network.putNode(n))
    edges.forEach((e) => network.putEdge(e))
  }, [projects])

  const mutate =
    <Args extends unknown[]>(cb: (...args: Args) => Promise<void>) =>
    async (...args: Args) => {
      await cb(...args)
      setProjects(useCases.readAll())
    }

  const selectProject = setSelected
  const unselectProject = () => setSelected(undefined)

  const addProject = mutate(async () => {
    const { id } = await useCases.insertNewProject()
    setSelected(id)
  })

  const editProject = mutate(async (update: Partial<Project>) => {
    if (!selectedId) return
    await useCases.updateProjectProperties(selectedId, update)
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
    if (!selectedId) return
    await useCases.connectUnlockingProject(selectedId, pjId)
  })

  const connectProjects = mutate(async ({ from, to }: NodeConnection) => {
    await useCases.connectUnlockingProject(from, to)
  })

  useEffect(() => {
    if (!connection) return
    connectProjects(connection)
  }, [connection])

  const removeProjectUnlocks = mutate(async (rm: string) => {
    if (!selectedId) return
    await useCases.disconnectProjectUnlocks(selectedId, rm)
    network.removeEdge({ from: selectedId, to: rm })
  })

  const removeProject = mutate(async () => {
    if (!selectedId) return
    await useCases.removeProject(selectedId)
    network.removeNode(selectedId)
    network.removeEdgesByNode(selectedId)
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
    selectedProjectDetail,
    updateProjectValue: updateProjectImportance,
    updateProjectStatus,
    connectProjects,
  }
}
