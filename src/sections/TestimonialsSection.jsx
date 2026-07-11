import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'
import Section from '../components/Section'
import api from '../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials')
        setTestimonials(res.data.data)
      } catch (err) {
        console.error('Failed to load testimonials')
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (testimonials.length === 0) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials])

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  if (loading) {
    return (
      <Section id="testimonials" className="bg-surface-light dark:bg-surface-dark">
        <p className="text-center text-muted-light dark:text-muted-dark">Loading testimonials...</p>
      </Section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <Section id="testimonials" className="bg-surface-light dark:bg-surface-dark">
        <p className="text-center text-muted-light dark:text-muted-dark">No testimonials yet.</p>
      </Section>
    )
  }

  const testimonial = testimonials[current]

  return (
    <Section id="testimonials" className="bg-surface-light dark:bg-surface-dark">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-14"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-wide mb-2">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold">
          What clients say
        </h2>
      </motion.div>

      <div className="relative max-w-2xl mx-auto">
        <FaQuoteLeft className="text-primary/20 dark:text-primary-dark/20 mx-auto mb-4" size={40} />

        <div className="relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-center flex flex-col items-center gap-5"
            >
              <p className="text-lg text-text-light dark:text-text-dark leading-relaxed italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full bg-bg-light dark:bg-bg-dark" />
                <div className="text-left">
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-light dark:text-muted-dark">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={goToPrev} aria-label="Previous testimonial" className="p-2 rounded-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors">
            <FiChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((t, index) => (
              <button
                key={t._id}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === current
                    ? 'bg-primary dark:bg-primary-dark'
                    : 'bg-muted-light/30 dark:bg-muted-dark/30'
                }`}
              />
            ))}
          </div>

          <button onClick={goToNext} aria-label="Next testimonial" className="p-2 rounded-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark hover:bg-primary/10 transition-colors">
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </Section>
  )
}

export default TestimonialsSection