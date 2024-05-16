import { Network } from 'vis-network/peer'

export type Interaction = {
  onClickNode?: (clickedNodeId: string) => void
  options?: InteractionOptions
}

export type InteractionOptions = {
  moveOnClick?: Parameters<Network['moveTo']>[0]
}

const DefaultInteraction: Interaction = {
  onClickNode: undefined,
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
}

export type ClickEvent = {
  nodes: string[]
  edges: string[]
}

export const setInteractions = (
  network: Network,
  interaction: Interaction = DefaultInteraction
) => {
  network.on('click', ({ nodes }: ClickEvent) => {
    if (nodes.length > 0) {
      interaction.onClickNode?.(nodes[0])
      if (interaction?.options?.moveOnClick) {
        network.moveTo({
          ...interaction.options.moveOnClick,
          position: network.getPosition(nodes[0]),
        })
      }
    }
  })
}
