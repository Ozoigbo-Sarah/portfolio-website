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
  FiCode: <FiCode className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />,
  FiLayers: <FiLayers className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />,
  FiSmartphone: <FiSmartphone className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />,
  FiLink: <FiLink className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />,
  FiRefreshCw: <FiRefreshCw className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />,
  FiCpu: <FiCpu className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />,
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
        className="text-center mb-10 sm:mb-14"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-widest text-xs uppercase mb-3">
          Services
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          What I can do for you
        </h2>
      </motion.div>

      {loading ? (
        <p className="text-center text-muted-light dark:text-muted-dark">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-muted-light dark:text-muted-dark">No services added yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={index * 0.1}
              className="p-4 sm:p-8 rounded-2xl bg-bg-light dark:bg-bg-dark shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark mb-3 sm:mb-5">
                {iconMap[service.icon] || <FiCode className="w-5 h-5 sm:w-[26px] sm:h-[26px]" />}
              </div>
              <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-3">{service.title}</h3>
              <p className="text-xs sm:text-base text-muted-light dark:text-muted-dark leading-relaxed">
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