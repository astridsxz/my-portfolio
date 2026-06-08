import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './magneticbutton'

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]    = useState(false)
  const [activeSection, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observers = ids.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6vw',
        height: '64px',
        background: scrolled ? '#080808cc' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
        transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}
    >
      {/* Logo */}
      <motion.a
        href="#hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '18px',
          fontWeight: 700,
          color: '#cbc6bb',
          fontStyle: 'italic',
          letterSpacing: '0.01em',
          textDecoration: 'none',
        }}
      >
        Benedick D. Miranda<span style={{ color: '#c8a96e' }}>.</span>
      </motion.a>

      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{ display: 'flex', gap: '28px' }}>
          {NAV_LINKS.map((link, i) => {
            const id = link.href.replace('#', '')
            const isActive = activeSection === id
            return (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: isActive ? '#c8a96e' : '#6b6560',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: '2px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#a09890' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#6b6560' }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: '#c8a96e',
                    }}
                  />
                )}
              </motion.a>
            )
          })}
        </div>

        {/* Hire Me */}
        <MagneticButton
          href="#contact"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#c8a96e',
            border: '1px solid #c8a96e66',
            padding: '8px 18px',
            background: 'transparent',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background 0.2s, border-color 0.2s',
          }}
        >
          Hire Me
        </MagneticButton>
      </div>
    </motion.nav>
  )
}