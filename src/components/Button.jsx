function Button({ children, variant = 'primary', onClick, href, className = '', ...props }) {
  const baseStyles =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer'

  const variants = {
    primary:
      'bg-primary dark:bg-primary-dark text-white hover:opacity-90 hover:scale-105 shadow-lg shadow-primary/20',
    outline:
      'border-2 border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:bg-primary dark:hover:bg-primary-dark hover:text-white',
  }

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={combinedStyles} {...props}>
      {children}
    </button>
  )
}

export default Button