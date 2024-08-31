import { ProjectDataRepository } from 'app-domain'
import { makeCloudRepository } from './repository/cloud'
import { makeLocalRepository } from './repository/local'

export type DataSourceLocation = 'local' | 'cloud'

export type DataAccess = ProjectDataRepository & {
  setDataSource(source: DataSourceLocation): void
}

export const makeDataAccess = (): DataAccess => {
  const localRepo = makeLocalRepository()
  const cloudRepo = makeCloudRepository()
  let _repo: ProjectDataRepository

  return {
    fetchProjects: () => _repo.fetchProjects(),
    createProject: (newPj) => _repo.createProject(newPj),
    updateProject: (updatedPj) => _repo.updateProject(updatedPj),
    deleteProject: (id) => _repo.deleteProject(id),
    setDataSource(source: DataSourceLocation) {
      if (source === 'cloud') {
        localRepo.deleteLocalData()
        _repo = cloudRepo
      }
      if (source === 'local') {
        _repo = localRepo
      }
    },
  }
}
