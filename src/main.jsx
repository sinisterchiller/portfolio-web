import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Wait for DOM to be ready
function init() {
  const rootElement = document.getElementById('projects-root')
  if (rootElement) {
    console.log('Mounting React app to projects-root')
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } else {
    console.error('projects-root element not found')
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

