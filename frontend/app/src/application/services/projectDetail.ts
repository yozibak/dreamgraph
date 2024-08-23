import { ProjectImportance, ProjectStatus, UseCases } from 'app-domain'
import { AppMode } from '../state/mode'
import { ProjectsStore } from '../state/project'

export type ProjectDetailService = NonNullable<ReturnType<ReturnType<typeof makeProjectDetailService>>>

export const makeProjectDetailService =
  (useCases: UseCases) =>
  (
    {
      selectedId,
      editProject,
      connectProjects,
      disconnectProjects,
      selectProject,
      removeProject,
    }: ProjectsStore,
    appMode: AppMode
  ) => {
    if (!selectedId || appMode !== 'detail') return

    const projectDetail = useCases.getProjectDetail(selectedId)

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
      projectDetail,
      editProjectTitle,
      updateProjectImportance,
      updateProjectStatus,
      addProjectUnlocks,
      viewUnlockProject: selectProject,
      removeUnlock,
      deleteProject,
    }
  }
