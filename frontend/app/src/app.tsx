import './index.css'
import { Container } from './components/container'
import { DomainContext, useDomain } from './domain'
import { getView } from './view'

export default () => {
  const domain = useDomain()
  const view = getView(domain)
  return (
    <>
      <DomainContext.Provider value={domain}>
        <Container roomID={domain.roomID}>
          {view}
        </Container>
      </DomainContext.Provider>
    </>
  )
}
