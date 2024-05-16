import React from 'react'
import ReactDOM from 'react-dom/client'
import DemoUse from './demo'

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DemoUse />
    </React.StrictMode>
  )
} else throw Error(`root not found`)
