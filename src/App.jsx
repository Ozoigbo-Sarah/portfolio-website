import { useTheme } from './context/ThemeContext'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors">
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-4xl font-bold">
          Portfolio Coming Soon 🚀
        </h1>
        <p className="text-muted-light dark:text-muted-dark">
          Current theme: <span className="font-semibold">{theme}</span>
        </p>
        <button
          onClick={toggleTheme}
          className="px-6 py-3 rounded-lg bg-primary dark:bg-primary-dark text-white font-medium hover:opacity-90 transition"
        >
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  )
}

export default App