import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'
import Section from '../components/Section'
import Button from '../components/Button'
import { contactInfo } from '../data/contactInfo'
import { API_URL } from '../services/api'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setStatus('sending')

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" className="bg-surface-light dark:bg-surface-dark">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        custom={0}
        className="text-center mb-14"
      >
        <p className="text-primary dark:text-primary-dark font-semibold tracking-widest text-xs uppercase mb-3">
          Contact
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Let's work together</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.1}
          className="flex flex-col gap-6"
        >
          <p className="text-muted-light dark:text-muted-dark leading-relaxed">
            Have a project in mind or just want to say hello? Fill out the
            form and I will get back to you as soon as possible.
          </p>

          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-bg-light dark:bg-bg-dark hover:shadow-md transition-shadow">
            <FiMail className="text-primary dark:text-primary-dark" size={20} />
            <span className="text-sm">{contactInfo.email}</span>
          </a>

          <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-4 p-4 rounded-xl bg-bg-light dark:bg-bg-dark hover:shadow-md transition-shadow">
            <FiPhone className="text-primary dark:text-primary-dark" size={20} />
            <span className="text-sm">{contactInfo.phone}</span>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-light dark:bg-bg-dark">
            <FiMapPin className="text-primary dark:text-primary-dark" size={20} />
            <span className="text-sm">{contactInfo.location}</span>
          </div>

          <div className="flex gap-4 mt-2">
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 rounded-full bg-bg-light dark:bg-bg-dark hover:bg-primary/10 transition-colors text-primary dark:text-primary-dark">
              <FiLinkedin size={20} />
            </a>
            <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-full bg-bg-light dark:bg-bg-dark hover:bg-primary/10 transition-colors text-primary dark:text-primary-dark">
              <FiGithub size={20} />
            </a>
          </div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.2}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4"
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 ${errors.name ? 'ring-2 ring-red-500' : 'focus:ring-primary dark:focus:ring-primary-dark'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 ${errors.email ? 'ring-2 ring-red-500' : 'focus:ring-primary dark:focus:ring-primary-dark'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 ${errors.subject ? 'ring-2 ring-red-500' : 'focus:ring-primary dark:focus:ring-primary-dark'}`}
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark placeholder:text-muted-light dark:placeholder:text-muted-dark focus:outline-none focus:ring-2 resize-none ${errors.message ? 'ring-2 ring-red-500' : 'focus:ring-primary dark:focus:ring-primary-dark'}`}
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <Button type="submit" className="justify-center mt-2" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : (
              <>
                Send Message <FiSend className="ml-2" />
              </>
            )}
          </Button>

          {status === 'success' && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              Message sent successfully. I will get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-500 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  )
}

export default ContactSection