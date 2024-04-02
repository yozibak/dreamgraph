import { Header } from './components/header'
import { DomainContext, useDomain } from './domain'
import { getView } from './view'

export default () => {
  const domain = useDomain()
  const view = getView(domain)
  return (
    <>
      <DomainContext.Provider value={domain}>
        <Header roomID={domain.roomID} />
        {view}
      </DomainContext.Provider>
    </>
  )
}
