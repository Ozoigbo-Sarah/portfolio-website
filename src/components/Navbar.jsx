import { useState, useEffect } from 'react'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'
import Container from './Container'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md shadow-md border-muted-light/10 dark:border-muted-dark/10' : 'bg-transparent border-transparent'}`}>
          <Container>
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark flex-shrink-0">
            Sarah<span className="text-primary dark:text-primary-dark">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors">
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full text-text-light dark:text-text-dark">
              {theme === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className="p-2 rounded-full text-text-light dark:text-text-dark">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {isOpen && (
        <div className="md:hidden bg-surface-light dark:bg-surface-dark shadow-lg">
          <div className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={handleLinkClick} className="text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary-dark transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar