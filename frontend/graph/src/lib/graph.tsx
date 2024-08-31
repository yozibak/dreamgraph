import { useEffect, useRef } from 'react'
import { Options } from 'vis-network/peer'
import 'vis-network/styles/vis-network.css'
import { Interaction } from './interaction'
import { makeGraphNetwork } from './network'

type Props = {
  network: ReturnType<typeof makeGraphNetwork>
  options: Options
  interactions?: Interaction
}

// since it's tricky to update the handlers in network once initialized,
// we keep the reference and swap the handlers each time `interactions` prop updates
const interactionsPersistence: Interaction = {}

export const Graph: React.FC<Props> = ({ network, options, interactions }) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Object.assign(interactionsPersistence, interactions)
  }, [interactions])

  useEffect(() => {
    if (!container.current) return
    network.initialize(container.current, options)
    network.setInteractions(interactionsPersistence)
    return () => {
      network.destroy()
    }
  }, [container])

  return <div style={{ width: '100%', height: '100%' }} ref={container}></div>
}
