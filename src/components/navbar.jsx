import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  const [menuOpen, setMenuOpen]    = useState(false)
  const [isMobile, setIsMobile]    = useState(window.innerWidth < 768)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
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

  // Close menu on link click
  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 6vw',
          height: '64px',
          background: scrolled || menuOpen ? '#080808cc' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
          transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={handleLinkClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '14px' : '18px',
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
        {!isMobile && (
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
                          left: 0, right: 0,
                          height: '1px',
                          background: '#c8a96e',
                        }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </div>
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
        )}

        {/* Hamburger button — mobile only */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 10000,
            }}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: '#c8a96e' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: '#c8a96e' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: '#c8a96e' }}
            />
          </button>
        )}
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              top: 0, right: 0,
              width: '75vw',
              height: '100vh',
              background: '#0d0d0d',
              borderLeft: '1px solid #1e1e1e',
              zIndex: 9998,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 40px',
              gap: '8px',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '13px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: activeSection === link.href.replace('#', '') ? '#c8a96e' : '#6b6560',
                  textDecoration: 'none',
                  padding: '16px 0',
                  borderBottom: '1px solid #1e1e1e',
                  transition: 'color 0.2s',
                }}
              >
                {link.label}
              </motion.a>
            ))}

            <a
              href="#contact"
              onClick={handleLinkClick}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '12px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#080808',
                background: '#c8a96e',
                textDecoration: 'none',
                padding: '14px 24px',
                textAlign: 'center',
                marginTop: '24px',
                display: 'block',
              }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {menuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000000aa',
              zIndex: 9997,
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}