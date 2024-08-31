import { UpdateItem } from 'vis-data/declarations/data-interface'
import { DataSet } from 'vis-data/peer'
import { Network, Options } from 'vis-network/peer'
import { generateEdgeId, includeEdgeId } from './edge'
import { Interaction, setInteractions } from './interaction'
import { EdgeItem, NodeItem } from './types'

export type GraphNetwork = ReturnType<typeof makeGraphNetwork>

export const makeGraphNetwork = <N extends NodeItem, E extends EdgeItem>(
  initialNodes: N[] = [],
  initialEdges: E[] = []
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
    /**
     * remove all the nodes and edges from network,
     * preserving the canvas dom
     */
    flush: () => {
      nodes.map((n) => n.id).forEach((id) => nodes.remove(id))
      edges.map((n) => n.id).forEach((id) => edges.remove(id))
    },
    destroy: () => {
      _network.destroy()
    },
    putNode: (newNode: N) => {
      if (nodes.get(newNode.id)) {
        nodes.updateOnly(newNode as UpdateItem<N, 'id'>)
      } else {
        nodes.add(newNode)
      }
    },
    putEdge: (newEdge: E) => {
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
      nodes.updateOnly({ id, label } as UpdateItem<N, 'id'>)
    },
    getNodeById: (id: string) => {
      return nodes.get(id)
    },
    filterNodes: (condition: (node: N) => boolean) => {
      return nodes.get({
        filter: condition,
      })
    },
    removeEdgesByNode: (nodeId: string) => {
      const rmEdges = edges.get({
        filter: (e) => e.from === nodeId || e.to === nodeId,
      })
      edges.remove(rmEdges)
    },
    addEdgeMode: () => _network.addEdgeMode(),
    addNodeMode: () => _network.addNodeMode(),
    exitEditMode: () => _network.disableEditMode(),
  }
}
