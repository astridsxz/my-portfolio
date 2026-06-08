import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, style, href, onClick, strength = 0.3 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      style={{ display: 'inline-block' }}
    >
      <Tag
        href={href}
        onClick={onClick}
        style={{
          display: 'inline-block',
          textDecoration: 'none',
          cursor: 'pointer',
          background: 'none',
          border: 'none',
          padding: 0,
          ...style,
        }}
      >
        {children}
      </Tag>
    </motion.div>
  )
}