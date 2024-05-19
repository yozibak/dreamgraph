import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ui'
import './index.css'
import { configureAWS } from './data/api/client'

configureAWS()

const root = document.getElementById('root')
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else throw Error(`root not found`)
