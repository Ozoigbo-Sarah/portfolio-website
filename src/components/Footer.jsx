import { FiLinkedin, FiGithub, FiMail, FiArrowUp } from 'react-icons/fi'
import Container from './Container'
import { contactInfo } from '../data/contactInfo'

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-bg-dark text-text-dark pt-16 pb-8">
      <Container>
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="text-xl font-bold mb-3">
              Sarah<span className="text-primary-dark">.</span>
            </p>
            <p className="text-sm text-muted-dark leading-relaxed max-w-xs">
              Full Stack MERN Developer and AI/ML enthusiast, building fast, functional, and thoughtfully designed web applications.
            </p>
          </div>

          <div>
            <p className="font-semibold mb-3">Quick Links</p>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-muted-dark hover:text-primary-dark transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-3">Connect</p>
            <div className="flex gap-3">
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2.5 rounded-full bg-surface-dark hover:bg-primary-dark hover:text-white transition-colors">
                <FiLinkedin size={18} />
              </a>
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2.5 rounded-full bg-surface-dark hover:bg-primary-dark hover:text-white transition-colors">
                <FiGithub size={18} />
              </a>
              <a href={`mailto:${contactInfo.email}`} aria-label="Email" className="p-2.5 rounded-full bg-surface-dark hover:bg-primary-dark hover:text-white transition-colors">
                <FiMail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-surface-dark pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-dark">
            © {currentYear} Ozoigbo Sarah. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 text-sm text-muted-dark hover:text-primary-dark transition-colors"
          >
            Back to top <FiArrowUp size={16} />
          </button>
        </div>
      </Container>
    </footer>
  )
}

export default Footer