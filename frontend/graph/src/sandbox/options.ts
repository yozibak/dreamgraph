import { Options } from 'vis-network/peer'


export const options: Options = {
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
        values.color = '#fafafa'
        values.borderColor = '#a1a1aa'
      },
      label: (values) => {
        values.mod = 'bold'
      },
    },
    color: {
      border: '#52525b',
      background: '#ffffff',
      hover: {
        border: '#a1a1aa',
        background: '#fafafa',
      },
    },
    opacity: 1,
    font: {
      color: 'black',
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
    clusterThreshold: 150,
    hierarchical: {
      enabled: false,
      levelSeparation: 150,
      nodeSpacing: 100,
      treeSpacing: 200,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'DU', // UD, DU, LR, RL
      sortMethod: 'directed', // hubsize, directed
      shakeTowards: 'leaves', // roots, leaves
    },
  },
}
