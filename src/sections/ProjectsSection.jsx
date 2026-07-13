import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import Section from '../components/Section'
import ProjectCard from '../components/ProjectCard'
import api from '../services/api'

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI/ML']

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const res = await api.get('/projects')
        setProjects(res.data.data)
      } catch (err) {
        setError('Unable to load projects right now. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some((t) =>
          t.toLowerCase().includes(searchTerm.toLowerCase())
        )
      return matchesCategory && matchesSearch
    })
  }, [projects, activeCategory, searchTerm])

  return (
    <Section id="projects">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-10"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-widest text-xs uppercase mb-3">
  Portfolio
</p>
<h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Projects</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0.1}
        className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10"
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary dark:bg-primary-dark text-white'
                  : 'bg-surface-light dark:bg-surface-dark text-muted-light dark:text-muted-dark hover:bg-primary/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-light dark:text-muted-dark"
            size={18}
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
          />
        </div>
      </motion.div>

      {loading ? (
        <p className="text-center text-muted-light dark:text-muted-dark">
          Loading projects...
        </p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-light dark:text-muted-dark">
          No projects match your search.
        </p>
      )}
    </Section>
  )
}

export default ProjectsSection