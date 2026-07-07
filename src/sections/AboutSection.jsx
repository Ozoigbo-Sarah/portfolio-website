import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiLayers } from 'react-icons/fi'
import Section from '../components/Section'

const stats = [
  { icon: <FiCode size={24} />, label: 'Years of Experience', value: '1 to 2' },
  { icon: <FiLayers size={24} />, label: 'Technologies', value: 'MERN + AI/ML' },
  { icon: <FiCpu size={24} />, label: 'Focus', value: 'Full Stack + AI' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function AboutSection() {
  return (
    <Section id="about" className="bg-surface-light dark:bg-surface-dark">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
          <p className="text-primary dark:text-primary-dark font-semibold tracking-wide mb-2">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Turning ideas into working products
          </h2>
          <p className="text-muted-light dark:text-muted-dark mb-4 leading-relaxed">
            I'm Sarah, a Full Stack MERN Developer with 1 to 2 years of
            hands on experience building web applications from the ground
            up. I studied Information Technology at university, which gave
            me a strong foundation in computing concepts, and I have built
            on that through self taught, practical development skills and
            real projects.
          </p>
          <p className="text-muted-light dark:text-muted-dark mb-4 leading-relaxed">
            I work across the full stack including MongoDB, Express, React,
            and Node.js, building applications that are fast, functional,
            and pleasant to use. Lately I have been going deeper into AI
            and machine learning, exploring how intelligent features can
            make everyday products smarter and more useful.
          </p>
          <p className="text-muted-light dark:text-muted-dark leading-relaxed">
            I care about writing clean, maintainable code and about
            understanding the reasoning behind every technical decision,
            not just making things work, but making them work well.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.2}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-bg-light dark:bg-bg-dark shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="text-primary dark:text-primary-dark">
                {stat.icon}
              </div>
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-sm text-muted-light dark:text-muted-dark">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

export default AboutSection