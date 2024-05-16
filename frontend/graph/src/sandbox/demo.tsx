import { useState } from 'react'
import { makeGraphNetwork } from '../lib/data'
import { Graph } from '../lib/graph'
import { options } from './options'

// init data outside react
const network = makeGraphNetwork(
  [
    { id: '1', label: 'Node 1' },
    { id: '2', label: 'Node 2' },
    { id: '3', label: 'Node 3' },
    { id: '4', label: 'Node 4' },
    { id: '5', label: 'Node 5' },
  ],
  [
    { from: '1', to: '3' },
    { from: '1', to: '2' },
    { from: '2', to: '4' },
    { from: '2', to: '5' },
  ]
)

const DemoUse = () => {
  const [selected, setSelected] = useState<string>()
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: 800, height: 800, border: '1px solid black' }}>
        <Graph
          network={network}
          options={options}
          interactions={{
            onClickNode: (id) => setSelected(id),
            options: {
              moveOnClick: {
                scale: 2,
                offset: { x: 20, y: 20 },
                animation: { duration: 1000, easingFunction: 'easeInOutQuad' }
              }
            }
          }}
        />
      </div>
      <UI />
      {selected ? <Form selected={selected} /> : <></>}
    </div>
  )
}

const UI = () => {
  return (
    <div>
      <button onClick={() => network.addNode({ id: '6', label: 'foo' })}>Add node</button>
      <button onClick={() => network.addEdge({ from: '1', to: '6' })}>Add edge</button>
      <button onClick={() => network.removeNode('6')}>Remove node</button>
      <button onClick={() => network.removeEdge({ from: '1', to: '6' })}>Remove edge</button>
      <button onClick={() => network.updateNodeLabel('6', 'baz')}>change label</button>
    </div>
  )
}

const Form = ({ selected }: { selected: string }) => {
  return (
    <div>
      <h1>Form</h1>
      <div>{selected}</div>
    </div>
  )
}

export default DemoUse
