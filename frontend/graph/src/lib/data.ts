import { DataSet } from 'vis-data/peer'
import { Network, Options } from 'vis-network/peer'
import 'vis-network/styles/vis-network.css'
import { generateEdgeId, includeEdgeId } from './edge'
import { Interaction, setInteractions } from './interaction'
import { EdgeItem, NodeItem } from './types'

export type GraphNetwork = ReturnType<typeof makeGraphNetwork>

export const makeGraphNetwork = <N extends NodeItem, E extends EdgeItem>(
  initialNodes: N[],
  initialEdges: E[]
) => {
  let _network: Network
  const nodes = new DataSet(initialNodes)
  const edges = new DataSet(initialEdges.map(includeEdgeId))
  return {
    initialize: (container: HTMLElement, options: Options) => {
      _network = new Network(container, { nodes, edges }, options)
    },
    setInteractions: (interactions?: Interaction) => {
      setInteractions(_network, interactions)
    },
    destroy: () => {
      _network.destroy()
    },
    addNode: (newNode: N) => {
      if (nodes.get(newNode.id)) return
      nodes.add(newNode)
    },
    addEdge: (newEdge: E) => {
      const ne = includeEdgeId(newEdge)
      if (edges.get(ne.id)) return
      edges.add(ne)
    },
    removeNode: (id: string) => {
      if (!nodes.get(id)) return
      nodes.remove(id)
    },
    removeEdge: (item: EdgeItem) => {
      const id = generateEdgeId(item)
      if (!edges.get(id)) return
      edges.remove(id)
    },
    updateNodeLabel: (id: string, label: string) => {
      if (!nodes.get(id)) return
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nodes.updateOnly({ id, label } as any)
    },
  }
}
