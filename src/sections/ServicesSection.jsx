import { motion } from 'framer-motion'
import {
  FiCode,
  FiLayers,
  FiSmartphone,
  FiLink,
  FiRefreshCw,
  FiCpu,
} from 'react-icons/fi'
import Section from '../components/Section'

const services = [
  {
    icon: <FiCode size={26} />,
    title: 'Frontend Development',
    description:
      'Building clean, interactive user interfaces with React and modern JavaScript, focused on performance and usability.',
  },
  {
    icon: <FiLayers size={26} />,
    title: 'Full Stack Web Development',
    description:
      'End to end web applications using MongoDB, Express, React, and Node.js, from database design to a polished frontend.',
  },
  {
    icon: <FiSmartphone size={26} />,
    title: 'Responsive Website Design',
    description:
      'Websites that look and work great on every device, from mobile phones to large desktop screens, with no broken layouts.',
  },
  {
    icon: <FiLink size={26} />,
    title: 'API Development and Integration',
    description:
      'Designing secure REST APIs and integrating third party services so your application connects smoothly with the tools you need.',
  },
  {
    icon: <FiRefreshCw size={26} />,
    title: 'Website Redesign',
    description:
      'Modernizing outdated websites with improved design, better performance, and a more professional user experience.',
  },
  {
    icon: <FiCpu size={26} />,
    title: 'AI Powered Feature Integration',
    description:
      'Adding intelligent features to your product using AI APIs and prompt engineering, such as chatbots, content generation, and smart automation.',
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

function ServicesSection() {
  return (
    <Section id="services" className="bg-surface-light dark:bg-surface-dark">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-14"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-wide mb-2">
          Services
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          What I can do for you
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={index * 0.1}
            className="p-8 rounded-2xl bg-bg-light dark:bg-bg-dark shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark mb-5">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-light dark:text-muted-dark leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

export default ServicesSection