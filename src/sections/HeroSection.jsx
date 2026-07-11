import { motion } from 'framer-motion'
import { FiDownload, FiMail, FiArrowRight, FiArrowDown } from 'react-icons/fi'
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
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <Container className="relative grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="flex flex-col gap-4 sm:gap-6 text-center md:text-left order-2 md:order-1">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="flex items-center gap-2 justify-center md:justify-start">
            <span className="w-8 h-px bg-primary dark:bg-primary-dark" />
            <p className="text-primary dark:text-primary-dark font-semibold tracking-widest text-xs sm:text-sm uppercase">
              Full Stack Developer
            </p>
          </motion.div>

          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Ozoigbo Sarah
          </motion.h1>

          <motion.h2 variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="text-lg sm:text-xl md:text-2xl font-medium text-muted-light dark:text-muted-dark">
            Building full stack web apps with the{' '}
            <span className="text-text-light dark:text-text-dark font-semibold">MERN stack</span>, powered by a growing focus on{' '}
            <span className="text-text-light dark:text-text-dark font-semibold">AI and machine learning</span>.
          </motion.h2>

          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="text-base text-muted-light dark:text-muted-dark max-w-md mx-auto md:mx-0">
            I design and build fast, scalable applications end to end, from database to interface, with clean code and a strong eye for detail.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.4} className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
            <Button href="#contact" className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3">
              Hire Me <FiArrowRight className="ml-2" />
            </Button>
            <Button variant="outline" href="#projects" className="text-sm sm:text-base px-5 py-2.5 sm:px-6 sm:py-3">
              View Work
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.5} className="flex items-center gap-4 justify-center md:justify-start pt-1">
            <a href="/resume.pdf" className="flex items-center gap-1.5 text-sm font-medium text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors">
              <FiDownload size={15} /> Download CV
            </a>
            <span className="text-muted-light/30 dark:text-muted-dark/30">|</span>
            <a href="#contact" className="flex items-center gap-1.5 text-sm font-medium text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors">
              <FiMail size={15} /> Get in Touch
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="flex justify-center order-1 md:order-2">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="absolute -inset-3 bg-gradient-to-tr from-primary to-accent dark:from-primary-dark dark:to-accent-dark rounded-[40%_60%_60%_40%/60%_40%_60%_40%] blur-2xl opacity-30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] border-2 border-primary/30 dark:border-primary-dark/30" />
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=Portfolio"
              alt="Ozoigbo Sarah - Full Stack Developer"
              className="relative w-full h-full object-cover rounded-[40%_60%_60%_40%/60%_40%_60%_40%] border-4 border-surface-light dark:border-surface-dark shadow-2xl"
            />
          </div>
        </motion.div>
      </Container>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-light dark:text-muted-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
          <FiArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  )
}

export default HeroSection