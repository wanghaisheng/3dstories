import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const editMode = false

if (editMode) {
  import('@theatre/studio').then(studio => {
    import('@theatre/r3f/dist/extension').then(extension => {
      studio.default.extend(extension.default)
      studio.default.initialize()
    })
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
