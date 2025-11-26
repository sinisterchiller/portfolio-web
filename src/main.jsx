import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Wait for DOM to be ready
function init() {
  console.log('Initializing React app...', {
    readyState: document.readyState,
    hasProjectsRoot: !!document.getElementById('projects-root'),
    baseUrl: import.meta.env.BASE_URL
  });
  
  const rootElement = document.getElementById('projects-root')
  if (rootElement) {
    console.log('Mounting React app to projects-root', rootElement)
    try {
      const root = ReactDOM.createRoot(rootElement)
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>,
      )
      console.log('React app mounted successfully')
    } catch (error) {
      console.error('Error mounting React app:', error)
      // Show error message in the DOM
      rootElement.innerHTML = `<div style="padding: 20px; color: red;">
        <p>Error loading projects: ${error.message}</p>
        <p>Check console for details.</p>
      </div>`
    }
  } else {
    console.error('projects-root element not found. Available IDs:', 
      Array.from(document.querySelectorAll('[id]')).map(el => el.id))
    // Retry after a short delay in case DOM isn't ready yet
    setTimeout(() => {
      const retryElement = document.getElementById('projects-root')
      if (retryElement) {
        console.log('Retrying mount after delay')
        try {
          const root = ReactDOM.createRoot(retryElement)
          root.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>,
          )
          console.log('React app mounted successfully on retry')
        } catch (error) {
          console.error('Error mounting React app on retry:', error)
          retryElement.innerHTML = `<div style="padding: 20px; color: red;">
            <p>Error loading projects: ${error.message}</p>
            <p>Check console for details.</p>
          </div>`
        }
      } else {
        console.error('projects-root still not found after retry')
      }
    }, 500)
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

