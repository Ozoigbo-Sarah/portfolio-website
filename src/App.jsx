import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors">
      <Navbar />
      <div id="home" className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">Scroll down to test the navbar</h1>
      </div>
      <div id="about" className="h-screen flex items-center justify-center bg-surface-light dark:bg-surface-dark">
        <h1 className="text-4xl font-bold">About Section Placeholder</h1>
      </div>
    </div>
  )
}

export default App