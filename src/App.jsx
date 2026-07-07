import Navbar from './components/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import TimelineSection from './sections/TimelineSection'
import ContactSection from './sections/ContactSection'

function App() {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <TimelineSection />
      <ContactSection />
    </div>
  )
}

export default App