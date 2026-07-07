import Container from './Container'

function Section({ children, id, className = '', containerClassName = '' }) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export default Section