import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiArrowRight } from 'react-icons/fi'
import Button from '../components/Button'
import Container from '../components/Container'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <div className="absolute top-1/4 -left-32 w-72 h-72 bg-primary/20 dark:bg-primary-dark/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 dark:bg-accent-dark/20 rounded-full blur-3xl" />

      <Container className="relative grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="flex flex-col gap-4 sm:gap-6 text-center md:text-left order-2 md:order-1">
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-primary dark:text-primary-dark font-semibold tracking-wide text-sm sm:text-base uppercase">
  Full Stack Developer
</motion.p>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Ozoigbo Sarah
          </motion.h1>

          <motion.h2 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-muted-light dark:text-muted-dark">
            Full Stack MERN Developer & AI/ML Enthusiast
          </motion.h2>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-base sm:text-lg text-muted-light dark:text-muted-dark max-w-md mx-auto md:mx-0">
            I build fast, scalable full stack applications using MongoDB, Express, React, and Node.js, with a growing focus on integrating AI and machine learning into real world products.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start pt-2">
            <Button href="#contact" className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3">
              Hire Me <FiArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" href="#contact" className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3">
              Contact Me <FiMail className="ml-2" />
            </Button>
            <Button variant="outline" href="/resume.pdf" className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3">
              Download CV <FiDownload className="ml-2" />
            </Button>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="flex justify-center order-1 md:order-2">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent dark:from-primary-dark dark:to-accent-dark rounded-full blur-2xl opacity-30" />
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=Portfolio"
              alt="Ozoigbo Sarah - Full Stack Developer"
              className="relative w-full h-full object-cover rounded-full border-4 border-surface-light dark:border-surface-dark shadow-2xl"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default HeroSection