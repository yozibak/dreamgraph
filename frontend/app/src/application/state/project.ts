import { Project, ProjectWithValue, UseCases } from 'app-domain'
import { GraphNetwork } from 'graph'
import { useEffect, useState } from 'react'

export type AppState = ReturnType<ReturnType<typeof makeAppState>>

export const makeAppState = (useCases: UseCases, network: GraphNetwork) => () => {
  const [projects, setProjects] = useState<ProjectWithValue[]>([])
  const [selectedId, setSelected] = useState<Project['id']>()

  useEffect(() => {
    async function init() {
      await useCases.initialize()
      setProjects(useCases.readAll())
    }
    init()
  }, [])

  const selectProject = setSelected
  const unselectProject = () => setSelected(undefined)

  /**
   * inject use cases with state handling
   * @param cb mutate handler, it can return id to select after the mutation
   */
  const mutate =
    <Args extends unknown[]>(cb: (...args: Args) => Promise<Project['id'] | void>) =>
    async (...args: Args) => {
      const id = await cb(...args)
      setProjects(useCases.readAll())
      if (id) {
        selectProject(id)
      }
    }

  const addProject = mutate(async () => {
    const pj = await useCases.insertNewProject()
    return pj.id
  })

  const editProject = mutate(useCases.updateProjectProperties)
  const connectProjects = mutate(useCases.connectUnlockingProject)

  const disconnectProjects = mutate(async (from: string, to: string) => {
    await useCases.disconnectProjectUnlocks(from, to)
    network.removeEdge({ from, to })
  })

  const removeProject = mutate(async (id: Project['id']) => {
    await useCases.removeProject(id)
    network.removeNode(id)
    network.removeEdgesByNode(id)
    unselectProject()
  })

  return {
    projects,
    selectedId,
    addProject,
    editProject,
    removeProject,
    connectProjects,
    disconnectProjects,
    selectProject,
    unselectProject,
  }
}
