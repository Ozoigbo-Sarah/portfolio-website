import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCode, FiServer, FiCpu, FiTool } from 'react-icons/fi'
import Section from '../components/Section'
import api from '../services/api'

const categoryIcons = {
  'Frontend': <FiCode size={20} />,
  'Backend': <FiServer size={20} />,
  'AI and Machine Learning': <FiCpu size={20} />,
  'Tools': <FiTool size={20} />,
}

const categoryOrder = ['Frontend', 'Backend', 'AI and Machine Learning', 'Tools']

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function SkillsSection() {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/skills')
        setSkills(res.data.data)
      } catch (err) {
        console.error('Failed to load skills')
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  const groupedSkills = categoryOrder
    .map((cat) => ({
      title: cat,
      icon: categoryIcons[cat],
      skills: skills.filter((s) => s.category === cat).map((s) => s.name),
    }))
    .filter((group) => group.skills.length > 0)

  return (
    <Section id="skills">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-10 sm:mb-14"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-widest text-xs uppercase mb-3">
          Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Technologies I work with
        </h2>
      </motion.div>

      {loading ? (
        <p className="text-center text-muted-light dark:text-muted-dark">Loading skills...</p>
      ) : groupedSkills.length === 0 ? (
        <p className="text-center text-muted-light dark:text-muted-dark">No skills added yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {groupedSkills.map((category, index) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index * 0.1}
              className="p-4 sm:p-6 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-primary dark:text-primary-dark">
                {category.icon}
                <h3 className="text-sm sm:text-lg font-bold text-text-light dark:text-text-dark">
                  {category.title}
                </h3>
              </div>
              <ul className="flex flex-col gap-1.5 sm:gap-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs sm:text-sm text-muted-light dark:text-muted-dark px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-bg-light dark:bg-bg-dark"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  )
}

export default SkillsSection