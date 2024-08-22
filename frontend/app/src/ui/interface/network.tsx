import { Graph, GraphOptions } from 'graph'
import { useContext } from 'react'
import { AppContext, network } from '../../application'
import { NodeConnection } from '../../application/controllers/networkInteraction'
import { Colors } from '../../constants'

export const GraphNetwork = () => {
  const { networkInteraction: interction } = useContext(AppContext)
  const options = includeAddEdgeOptions(graphOptions, interction.connectNodes)

  return (
    <div className="h-full w-full">
      <Graph
        network={network}
        options={options}
        interactions={{
          onClickNode: interction.clickNode,
          onClickBackground: interction.blurNode,
          options: {
            moveOnClick: {
              offset: { x: 0, y: 0 },
              scale: 1,
              animation: {
                duration: 500,
                easingFunction: 'linear',
              },
            },
          },
        }}
      />
    </div>
  )
}

const includeAddEdgeOptions = (
  baseOptions: GraphOptions,
  connect: (conn: NodeConnection) => void
) => ({
  ...baseOptions,
  manipulation: {
    enabled: false,
    addEdge: (conn: NodeConnection, cb: (args: unknown) => void) => {
      connect(conn)
      cb(null)
    },
  },
})

export const graphOptions: GraphOptions = {
  width: '100%',
  height: '100%',
  clickToUse: false,
  interaction: {
    dragNodes: true,
    dragView: true,
    hover: true,
    hoverConnectedEdges: true,
    selectable: true,
    selectConnectedEdges: true,
    zoomSpeed: 1,
    zoomView: true,
  },
  nodes: {
    borderWidth: 4,
    borderWidthSelected: 1.2,
    chosen: {
      node: (values) => {
        values.color = Colors.Gray50
        values.borderColor = Colors.Gray400
      },
      label: (values) => {
        values.mod = 'bold'
      },
    },
    color: {
      border: Colors.Gray600,
      background: Colors.White,
      hover: {
        border: Colors.Gray400,
        background: Colors.Gray50,
      },
    },
    opacity: 1,
    font: {
      color: Colors.Black,
      size: 12,
      face: 'arial',
      align: 'center',
      vadjust: -4,
    },
    mass: 1,
    physics: true,
    shape: 'dot',
    size: 16,
  },
  edges: {
    arrows: {
      middle: {
        enabled: true,
        scaleFactor: 1,
      },
    },
    arrowStrikethrough: true,
    color: {
      inherit: 'from',
    },
    dashes: false,
    physics: true,
    selectionWidth: 1.1,
    smooth: {
      enabled: true,
      type: 'dynamic',
      roundness: 0.8,
    },
    width: 2,
    widthConstraint: false,
  },
  layout: {
    improvedLayout: true,
    clusterThreshold: 20,
  },
}
