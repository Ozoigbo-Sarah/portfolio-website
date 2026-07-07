import { useTheme } from './context/ThemeContext'
import Button from './components/Button'
import Section from './components/Section'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors">
      <Section id="test">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold">Testing Our Components</h1>
          <p className="text-muted-light dark:text-muted-dark">
            Current theme: <span className="font-semibold">{theme}</span>
          </p>
          <div className="flex gap-4">
            <Button onClick={toggleTheme}>Primary Button</Button>
            <Button variant="outline" onClick={toggleTheme}>
              Outline Button
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}

export default App