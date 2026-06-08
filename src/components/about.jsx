import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './magneticbutton'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 6vw',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background number */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '4vw',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(10rem, 20vw, 18rem)',
        fontFamily: "'DM Mono', monospace",
        fontWeight: 700,
        color: '#ffffff04',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        01
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '5rem' }}
      >
        <div style={{ width: 32, height: 1, background: '#c8a96e' }} />
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c8a96e',
        }}>
          01. About Me
        </span>
      </motion.div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px' }}>

        {/* Heading */}
        <div style={{marginBottom: '2rem' }}>
          <motion.h2
           initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(64px, 9vw, 88px)',
            lineHeight: 1.0,
            fontWeight: 700,
            color: '#e8e3d8',
            marginBottom: '3px',
            }}
          >
            Crafting experiences,{' '}
            <br />
            <span style={{ color: '#c8a96e', fontStyle: 'italic', fontSize: 'clamp(2.5rem, 4vw, 3.7rem)' }}>
              not just websites.
            </span>
          </motion.h2>
        </div>

        {/* Body paragraphs — Inter, normal case */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#c1b7ad',
            lineHeight: 1.8,
            marginBottom: '1.5rem',
            fontSize: '16px',
            textTransform: 'none',
            letterSpacing: 'normal',
            maxWidth: '550px',
            textAlign: 'justify',
          }}
        >
          Hi, I'm Benedick — a modern web developer who leverages AI tools and the latest technologies to build fast, responsive, and high-quality websites. I combine creativity, clean code, and AI-powered efficiency to turn ideas into professional digital experiences that help businesses grow.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            color: '#c1b7ad',
            lineHeight: 1.5,
            marginBottom: '3rem',
            fontSize: '16px',
            textTransform: 'none',
            letterSpacing: 'normal',
            maxWidth: '550px',
            textAlign: 'justify',
          }}
        >
          Currently seeking my first opportunity where I can contribute,
          grow, and build things that actually matter to people.
        </motion.p>


      </div>
    </section>
  )
}