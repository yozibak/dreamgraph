import { UseCases } from 'app-domain'
import { GraphNetwork } from 'graph'
import { useEffect } from 'react'
import { DataAccess } from '../data'
import { ProjectsStore } from './state/project'

export type AppMode = 'local' | 'cloud'

export const makeAppModeSwitch =
  (useCases: UseCases, network: GraphNetwork, dataAccess: DataAccess) =>
  (appMode: AppMode, projectStore: ProjectsStore) => {
    useEffect(() => {
      if (appMode === 'local') return

      network.flush()

      // change the data source
      dataAccess.setDataSource('cloud')

      // load the new data source
      useCases.initialize()

      // renew the state based on new data
      projectStore.reload()
    }, [appMode])
  }
