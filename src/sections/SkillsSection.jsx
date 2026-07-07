import { motion } from 'framer-motion'
import {
  FiCode,
  FiServer,
  FiCpu,
  FiTool,
} from 'react-icons/fi'
import Section from '../components/Section'

const skillCategories = [
  {
    title: 'Frontend',
    icon: <FiCode size={22} />,
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    title: 'Backend',
    icon: <FiServer size={22} />,
    skills: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Mongoose'],
  },
  {
    title: 'AI and Machine Learning',
    icon: <FiCpu size={22} />,
    skills: ['Python', 'Pandas', 'Scikit-learn', 'Prompt Engineering', 'OpenAI API'],
  },
  {
    title: 'Tools',
    icon: <FiTool size={22} />,
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function SkillsSection() {
  return (
    <Section id="skills">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-14"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-wide mb-2">
          Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Technologies I work with
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={index * 0.1}
            className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="flex items-center gap-3 mb-4 text-primary dark:text-primary-dark">
              {category.icon}
              <h3 className="text-lg font-bold text-text-light dark:text-text-dark">
                {category.title}
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="text-sm text-muted-light dark:text-muted-dark px-3 py-1.5 rounded-lg bg-bg-light dark:bg-bg-dark"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default SkillsSection