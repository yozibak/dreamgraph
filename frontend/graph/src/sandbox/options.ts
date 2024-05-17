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
    borderWidth: 1,
    borderWidthSelected: 1.2,
    chosen: {
      node: (values) => {
        values.color = 'blue'
      },
      label: (values) => {
        values.color = 'red'
      },
    },
    color: {
      border: 'white',
      background: 'gray',
      highlight: {
        border: 'black',
        background: 'white',
      },
      hover: {
        border: 'black',
        background: 'white',
      },
    },
    opacity: 1,
    font: {
      color: 'black',
      size: 12, // px
      face: 'arial',
      align: 'center',
      multi: false,
      vadjust: -4,
    },
    icon: {
      face: 'FontAwesome',
      code: undefined,
      weight: undefined,
      size: 50, //50,
      color: '#2B7CE9',
    },
    labelHighlightBold: true,
    mass: 1,
    physics: true,
    scaling: {
      min: 10,
      max: 30,
      label: {
        enabled: false,
        min: 14,
        max: 30,
        maxVisible: 30,
        drawThreshold: 5,
      },
      customScalingFunction: function (min: number, max: number, total: number, value: number) {
        if (max === min) {
          return 0.5
        } else {
          const scale = 1 / (max - min)
          return Math.max(0, (value - min) * scale)
        }
      },
    },
    shape: 'dot',
    size: 16,
    label: undefined,
    // title: 'foo',
    value: undefined,
    widthConstraint: false,
    x: undefined,
    y: undefined,
  },

  edges: {
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 0.8,
        type: 'arrow',
      },
    },
    arrowStrikethrough: true,
    chosen: true,
    color: {
      color: 'gray',
      highlight: 'gray',
      inherit: 'from',
      opacity: 0.8,
    },
    dashes: true,
    physics: true,
    selectionWidth: 1.1,
    smooth: {
      enabled: false,
      type: 'cubicBezier',
      roundness: 0.3,
    },
    width: 2,
    widthConstraint: false,
  },
  layout: {
    randomSeed: undefined,
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
      direction: 'UD', // UD, DU, LR, RL
      sortMethod: 'hubsize', // hubsize, directed
      shakeTowards: 'leaves', // roots, leaves
    },
  },
}
