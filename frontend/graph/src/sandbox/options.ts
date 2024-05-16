import { Options } from 'vis-network/peer'

export const options: Options = {
  interaction: {
    hover: true,
    dragView: true,
    keyboard: false,
  },
  manipulation: {
    enabled: false,
  },
  nodes: {
    opacity: 1,

    font: {
      align: 'left',
      color: 'black',
      face: 'sans-serif',
      strokeWidth: 0.4,
      strokeColor: '#0046FE',
      bold: {
        size: 16,
      },
    },
    shape: 'text',
    scaling: {
      label: {
        min: 8,
        max: 50,
      },
    },
  },
  edges: {
    arrows: {
      middle: {
        enabled: true,
        scaleFactor: 0.8,
      },
    },
    color: {
      color: 'lightgrey',
      highlight: 'white',
      hover: 'white',
      opacity: 0.9,
    },
    arrowStrikethrough: false,
    hoverWidth: 0.1,
    selectionWidth: 1,
    shadow: {
      enabled: true,
      color: 'black',
      size: 1,
      x: 0,
      y: 0,
    },
    smooth: {
      enabled: true,
      type: 'dynamic',
      roundness: 1,
    },
  },
}
