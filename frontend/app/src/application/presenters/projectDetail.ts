import { Project, ProjectDetail, UseCases } from 'app-domain'

export type ProjectDetailProps = ProjectDetail

export const makeProjectDetailPresenter =
  (useCases: UseCases) =>
  (targetProjectId: Project['id'] | undefined): ProjectDetailProps | undefined => {
    if (!targetProjectId) return
    return useCases.getProjectDetail(targetProjectId)
  }
