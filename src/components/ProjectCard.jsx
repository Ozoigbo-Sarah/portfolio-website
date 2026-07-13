import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub } from 'react-icons/fi'

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden bg-surface-light dark:bg-surface-dark shadow-md hover:shadow-2xl transition-shadow"
    >
      <div className="relative overflow-hidden aspect-video">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {project.featured && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-accent dark:bg-accent-dark text-white shadow-md">
            Featured
          </span>
        )}
      </div>

      <div className="p-3 sm:p-6">
        <p className="text-[10px] sm:text-xs font-semibold text-primary dark:text-primary-dark uppercase tracking-wide mb-1 sm:mb-2">
          {project.category}
        </p>
        <h3 className="text-sm sm:text-lg font-bold mb-1.5 sm:mb-2">{project.title}</h3>
        <p className="hidden sm:block text-sm text-muted-light dark:text-muted-dark mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-5">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-bg-light dark:bg-bg-dark text-muted-light dark:text-muted-dark">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-2 sm:gap-4">
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-primary dark:text-primary-dark hover:underline">
            <FiExternalLink size={14} /> Demo
          </a>
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium text-text-light dark:text-text-dark hover:underline">
            <FiGithub size={14} /> Code
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard