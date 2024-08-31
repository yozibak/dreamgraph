import { GraphNetwork } from 'graph'
import { useEffect } from 'react'
import { InteractionStore, Position } from '../../state/interaction'
import { ProjectsStore } from '../../state/project'

export type NodeConnection = { from: string; to: string }

export type NetworkInteraction = ReturnType<ReturnType<typeof makeNetworkInteraction>>

export const makeNetworkInteraction =
  (network: GraphNetwork) =>
  (
    { connectProjects, selectProject, unselectProject, addProject }: ProjectsStore,
    { mode, setMode, setHoverPosition }: InteractionStore
  ) => {

    // change the mode of network object
    useEffect(() => {
      if (mode === 'normal') {
        network.exitEditMode()
      } else if (mode === 'addEdge') {
        network.addEdgeMode()
      } else if (mode === 'detail') {
        network.exitEditMode()
      }
    }, [mode])

    const connectNodes = ({ from, to }: NodeConnection) => {
      connectProjects(from, to)
      setMode('normal')
    }

    const clickNode = (nodeId: string) => {
      if (mode === 'addEdge') return
      selectProject(nodeId)
      setMode('detail')
    }

    const clickBackground = () => {
      unselectProject()
      setMode('normal')
    }

    const hoverNode = (nodeId: string, hoverPosition: Position) => {
      if (mode !== 'normal') return
      selectProject(nodeId)
      setHoverPosition(hoverPosition)
      setMode('hover')
    }

    const blurNode = () => {
      if (mode !== 'hover') return
      unselectProject()
      setMode('normal')
    }

    return {
      setMode,
      connectNodes,
      clickNode,
      clickBackground,
      hoverNode,
      blurNode,
      clickAddButton: addProject,
    }
  }
