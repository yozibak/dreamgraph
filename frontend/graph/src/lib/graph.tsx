import { useEffect, useRef } from 'react'
import { Options } from 'vis-network'
import 'vis-network/styles/vis-network.css'
import { makeGraphNetwork } from './network'
import { Interaction } from './interaction'

type Props = {
  network: ReturnType<typeof makeGraphNetwork>
  options: Options
  interactions?: Interaction
}

export const Graph: React.FC<Props> = ({ network, options, interactions }) => {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return
    network.initialize(container.current, options)
    network.setInteractions(interactions)
    return () => {
      network.destroy()
    }
  }, [container])

  return <div style={{ width: '100%', height: '100%' }} ref={container}></div>
}
