import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const skills = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    category: 'Backend',
    items: ['PHP', 'MySQL'],
  },
  {
    category: 'Tools & Design',
    items: ['VS Code', 'Git', 'GitHub'],
  },
  {
    category: 'Currently Learning',
    items: ['Tailwind CSS', 'Node.js'],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '6rem 6vw' : '8rem 6vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background number */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '4vw',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(10rem, 20vw, 18rem)',
        fontFamily: 'Georgia, serif',
        fontWeight: 700,
        color: '#ffffff04',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        03
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '4rem',
        }}
      >
        <div style={{ width: 32, height: 1, background: '#c8a96e' }} />
        <span style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c8a96e',
        }}>
          03. Skills
        </span>
      </motion.div>

      {/* Heading */}
      <div style={{ overflow: 'hidden', marginBottom: '5rem' }}>
        <motion.h2
          initial={{ y: 80, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: isMobile ? 'clamp(3rem, 12vw, 5rem)' : 'clamp(5rem, 5vw, 7rem)',
            fontWeight: 700,
            color: '#e8e3d8',
            lineHeight: 0.9,
            margin: 0,
          }}
        >
          What I{' '}
          <br />
          <span style={{
            color: '#c8a96e',
            fontStyle: 'italic',
            fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
          }}>
            work with
          </span>
        </motion.h2>
      </div>

      {/* Skills grid — 2 cols desktop, 1 col mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '3rem' : '4rem 6rem',
        position: 'relative',
        zIndex: 1,
      }}>
        {skills.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 }}
          >
            {/* Category label */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              marginBottom: '1.8rem',
            }}>
              <div style={{ width: 16, height: 1, background: '#c8a96e44' }} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#6b6560',
              }}>
                {group.category}
              </span>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {group.items.map((skill, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -4, borderColor: '#c8a96e', color: '#c8a96e' }}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    color: '#c8b99a',
                    border: '1px solid #3a3a3a',
                    padding: '0.6rem 1.2rem',
                    cursor: 'default',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
              style={{
                width: '100%',
                height: 1,
                background: '#1e1e1e',
                transformOrigin: 'left',
                marginTop: '2rem',
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}