import { useState, useEffect } from 'react'
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
import api from '../services/api'

const iconMap = {
  FiCode: <FiCode size={26} />,
  FiLayers: <FiLayers size={26} />,
  FiSmartphone: <FiSmartphone size={26} />,
  FiLink: <FiLink size={26} />,
  FiRefreshCw: <FiRefreshCw size={26} />,
  FiCpu: <FiCpu size={26} />,
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function ServicesSection() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get('/services')
        setServices(res.data.data)
      } catch (err) {
        console.error('Failed to load services')
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

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

      {loading ? (
        <p className="text-center text-muted-light dark:text-muted-dark">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-muted-light dark:text-muted-dark">No services added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index * 0.1}
              className="p-8 rounded-2xl bg-bg-light dark:bg-bg-dark shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark mb-5">
                {iconMap[service.icon] || <FiCode size={26} />}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-light dark:text-muted-dark leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  )
}

export default ServicesSection