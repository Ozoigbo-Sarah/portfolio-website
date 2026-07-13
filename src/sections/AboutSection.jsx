import { motion } from 'framer-motion'
import { FiCode, FiCpu, FiLayers } from 'react-icons/fi'
import Section from '../components/Section'

const stats = [
 { icon: <FiCode size={20} />, label: 'Years Experience', value: '1 to 2' },
  { icon: <FiLayers size={20} />, label: 'Stack', value: 'MERN' },
  { icon: <FiCpu size={20} />, label: 'Focus', value: 'AI/ML' },
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
    <Section id="about" className="bg-surface-light dark:bg-surface-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 dark:bg-primary-dark/5 rounded-full blur-3xl" />

      <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-12 md:gap-16 items-start">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
        >
         <p className="text-primary dark:text-primary-dark font-semibold tracking-widest text-xs uppercase mb-4">
  About Me
</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 leading-tight">
            Turning ideas into working products
          </h2>

          <div className="space-y-5 text-muted-light dark:text-muted-dark leading-relaxed">
            <p>
              I'm Sarah, a Full Stack MERN Developer with 1 to 2 years of
              hands on experience building web applications from the ground
              up. I studied Information Technology at university, which gave
              me a strong foundation in computing concepts, and I have built
              on that through self taught, practical development skills and
              real projects.
            </p>
            <p>
              I work across the full stack including MongoDB, Express, React,
              and Node.js, building applications that are fast, functional,
              and pleasant to use. Lately I have been going deeper into AI
              and machine learning, exploring how intelligent features can
              make everyday products smarter and more useful.
            </p>
            <p>
              I care about writing clean, maintainable code and about
              understanding the reasoning behind every technical decision,
              not just making things work, but making them work well.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.2}
          className="flex flex-col gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 p-5 rounded-2xl bg-bg-light dark:bg-bg-dark shadow-sm hover:shadow-md transition-shadow border border-muted-light/10 dark:border-muted-dark/10"
            >
              <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark">
                {stat.icon}
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

export default AboutSection