import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import SkillsSection from './sections/SkillsSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import TestimonialsSection from './sections/TestimonialsSection'
import TimelineSection from './sections/TimelineSection'
import ContactSection from './sections/ContactSection'
import AdminLogin from './pages/AdminLogin'
import DashboardHome from './pages/DashboardHome'
import AdminProjects from './pages/AdminProjects'
import AdminMessages from './pages/AdminMessages'
import AdminSkills from './pages/AdminSkills'
import AdminServices from './pages/AdminServices'
import AdminTestimonials from './pages/AdminTestimonials'
import ProtectedRoute from './components/ProtectedRoute'

function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <TimelineSection />
      <ContactSection />
      <Footer />
    </>
  )
}

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors">
      <LoadingScreen isLoading={isLoading} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} />
        <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
        <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
        <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
        <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
        <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App