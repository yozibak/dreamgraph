import { ProjectImportance, ProjectStatus } from 'app-domain'
import { AppState } from '../state/project'

export type ProjectDetailControl = ReturnType<typeof useProjectsControl>

export const useProjectsControl = ({
  selectedId,
  editProject,
  connectProjects,
  disconnectProjects,
  selectProject,
  removeProject
}: AppState) => {
  if (!selectedId) return
  const editProjectTitle = (newTitle: string) =>
    editProject(selectedId, {
      title: newTitle,
    })
  const updateProjectImportance = (importance: ProjectImportance) =>
    editProject(selectedId, {
      importance,
    })
  const updateProjectStatus = (status: ProjectStatus) =>
    editProject(selectedId, {
      status,
    })
  const addProjectUnlocks = (id: string) => {
    connectProjects(selectedId, id)
  }
  const removeUnlock = (id: string) => {
    disconnectProjects(selectedId, id)
  }
  const deleteProject = () => removeProject(selectedId)
  return {
    editProjectTitle,
    updateProjectImportance,
    updateProjectStatus,
    addProjectUnlocks,
    viewUnlockProject: selectProject,
    removeUnlock,
    deleteProject
  }
}
