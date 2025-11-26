import { ExpandableCardDemo } from './components/ExpandableCard'

function App() {
  console.log('App component rendering', {
    timestamp: new Date().toISOString(),
    baseUrl: import.meta.env.BASE_URL
  })
  
  return (
    <div className="projects-container" style={{ width: '100%', minHeight: '200px' }}>
      <ExpandableCardDemo />
    </div>
  )
}

export default App

