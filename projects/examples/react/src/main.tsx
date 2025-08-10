import React from 'react'
import ReactDOM from 'react-dom/client'
import '@blueprintui/components/include/alert.js'
import '@blueprintui/components/include/button.js'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
