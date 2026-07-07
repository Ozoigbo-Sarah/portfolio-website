import { motion } from 'framer-motion'
import { FiBookOpen, FiCode } from 'react-icons/fi'
import Section from '../components/Section'
import { timelineData } from '../data/timeline'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function TimelineSection() {
  return (
    <Section id="journey">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-16"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-wide mb-2">
          My Journey
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          Education and Growth
        </h2>
      </motion.div>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 dark:bg-primary-dark/20 md:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index * 0.15}
              className={`relative flex items-start gap-6 md:gap-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary dark:bg-primary-dark border-4 border-bg-light dark:border-bg-dark z-10" />

              <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`} />

              <div className={`pl-16 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-md hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-2 text-primary dark:text-primary-dark mb-2">
                    {item.type === 'education' ? <FiBookOpen size={18} /> : <FiCode size={18} />}
                    <span className="text-xs font-semibold uppercase tracking-wide">
                      {item.year}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default TimelineSection