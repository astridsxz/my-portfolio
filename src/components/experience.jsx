import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const timeline = [
  {
    year: '2022 — 2026',
    title: 'Bachelor of Science in Information Systems',
    place: 'Makati Science Technological Institute of the Philippines',
    description: 'Graduated with a Bachelor of Science in Information Systems, gaining expertise in web development, database management, software engineering, and information systems design through academic projects and hands-on development experience.',
    type: 'education',
    status: 'live',
    cert: null,
  },
  {
    year: '2026 — 3 Months',
    title: 'IT Intern',
    place: 'Caritas et Labora Human Resources Cooperative',
    description: 'Assisted the IT department with day-to-day operations. Used free time productively for self-learning web development — turning downtime into growth time.',
    type: 'work',
    status: 'live',
    cert: null,
  },
  {
    year: '2026',
    title: 'Cybersecurity Introduction',
    place: 'Certificate of Completion — Cisco Networking Academy',
    description: 'Completed a foundational course covering cybersecurity principles, threat awareness, and best practices in digital security.',
    type: 'certificate',
    status: 'live',
    cert: '/Cybersecurity_intro.png',
  },
  {
    year: '2026',
    title: 'Occupational Safety & Health (OSH)',
    place: 'Certificate of Participation — Caritas et Labora',
    description: 'Participated in a DOLE-prescribed mandatory seminar on workplace safety, health regulations, and occupational hazard awareness.',
    type: 'certificate',
    status: 'live',
    cert: '/OSH.png',
  },
  {
    year: '2026',
    title: 'HTML Essentials',
    place: 'Certificate of Completion — Cisco Networking Academy',
    description: 'Completed a structured course on HTML fundamentals — semantic markup, document structure, forms, and modern best practices.',
    type: 'certificate',
    status: 'live',
    cert: '/HTML_Essentials.png',
  },
  {
    year: 'Soon',
    title: 'CSS Certification',
    place: 'In Progress',
    description: 'Currently working towards a formal certification in CSS — layouts, responsive design, and modern styling techniques.',
    type: 'certificate',
    status: 'soon',
    cert: null,
  },
  {
    year: 'Soon',
    title: 'JavaScript Certification',
    place: 'In Progress',
    description: 'Pursuing a JavaScript certification to solidify core programming knowledge and DOM manipulation skills.',
    type: 'certificate',
    status: 'soon',
    cert: null,
  },
]

const typeIcons = { education: '🎓', work: '💼', certificate: '📜' }

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedCert, setSelectedCert] = useState(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section
      id="experience"
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
        right: '4vw',
        transform: 'translateY(-50%)',
        fontSize: 'clamp(10rem, 20vw, 18rem)',
        fontFamily: 'Georgia, serif',
        fontWeight: 700,
        color: '#ffffff04',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        04
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '4rem' }}
      >
        <div style={{ width: 32, height: 1, background: '#c8a96e' }} />
        <span style={{
          fontFamily: 'monospace',
          fontSize: '0.7rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#c8a96e',
        }}>
          04. Experience
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
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#e8e3d8',
          }}
        >
          My <span style={{ color: '#c8a96e', fontStyle: 'italic' }}>journey.</span>
        </motion.h2>
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative' }}>

        {/* Vertical line — desktop only */}
        {!isMobile && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: '180px',
              top: 0, bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, #c8a96e44, #1e1e1e)',
              transformOrigin: 'top',
            }}
          />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '2rem' : '3.5rem' }}>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 0,
                position: 'relative',
                opacity: item.status === 'soon' ? 0.35 : 1,
              }}
            >
              {/* Mobile: year on top */}
              {isMobile ? (
                <div style={{ marginBottom: '6px' }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#c8a96e',
                  }}>
                    {item.year}
                  </span>
                </div>
              ) : (
                /* Desktop: year on left */
                <div style={{
                  width: '180px',
                  flexShrink: 0,
                  paddingRight: '2.5rem',
                  paddingTop: '0.2rem',
                  textAlign: 'right',
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#c8a96e',
                  }}>
                    {item.year}
                  </span>
                </div>
              )}

              {/* Dot — desktop only */}
              {!isMobile && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.3 }}
                  style={{
                    position: 'absolute',
                    left: '180px',
                    top: '6px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: item.status === 'soon' ? '#2a2a2a' : '#c8a96e',
                    transform: 'translateX(-50%)',
                    border: '2px solid #080808',
                    zIndex: 1,
                    boxShadow: item.status === 'live' ? '0 0 10px #c8a96e44' : 'none',
                  }}
                />
              )}

              {/* Content */}
              <div style={{ paddingLeft: isMobile ? '0' : '3rem', flex: 1 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.8rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{typeIcons[item.type]}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      marginBottom: '0.4rem',
                    }}>
                      <h3 style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: isMobile ? '1rem' : '1.15rem',
                        fontWeight: 700,
                        color: '#e8e3d8',
                      }}>
                        {item.title}
                      </h3>
                      {item.type === 'work' && item.status === 'live' && (
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: '0.6rem',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#c8a96e',
                          border: '1px solid #c8a96e33',
                          padding: '0.2rem 0.6rem',
                        }}>
                          internship
                        </span>
                      )}
                    </div>

                    <p style={{
                      fontFamily: 'monospace',
                      fontSize: '0.62rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#ffd88fc9',
                      marginBottom: '0.8rem',
                    }}>
                      {item.place}
                    </p>

                    <p style={{
                      color: '#c1b7ad',
                      fontSize: isMobile ? '0.82rem' : '0.88rem',
                      lineHeight: 1.8,
                      marginBottom: '1rem',
                      maxWidth: '580px',
                      textAlign: 'justify',
                      fontFamily: "'Playfair Display', serif",
                    }}>
                      {item.description}
                    </p>

                    {item.cert && (
                      <motion.button
                        onClick={() => setSelectedCert(item.cert)}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '0.62rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          color: '#837e7a',
                          background: 'none',
                          border: 'none',
                          borderBottom: '1px solid #2a2a2a',
                          paddingBottom: '2px',
                          cursor: 'pointer',
                          transition: 'color 0.2s, border-color 0.2s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.color = '#c8a96e'
                          e.currentTarget.style.borderColor = '#c8a96e'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.color = '#6b6560'
                          e.currentTarget.style.borderColor = '#2a2a2a'
                        }}
                      >
                        View Certificate →
                      </motion.button>
                    )}
                  </div>
                </div>

                <div style={{ width: '100%', height: '1px', background: '#1a1a1a', marginTop: '1.5rem' }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedCert(null)}
              style={{
                position: 'fixed', inset: 0,
                background: '#080808ee',
                backdropFilter: 'blur(12px)',
                zIndex: 1000,
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed', inset: 0,
                zIndex: 1001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                pointerEvents: 'none',
              }}
            >
              <div style={{ position: 'relative', maxWidth: '700px', width: '100%', pointerEvents: 'auto' }}>
                <button
                  onClick={() => setSelectedCert(null)}
                  style={{
                    position: 'absolute',
                    top: '-1rem', right: '-0.5rem',
                    width: '2.5rem', height: '2.5rem',
                    background: '#1e1e1e',
                    border: '1px solid #2a2a2a',
                    color: '#6b6560',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#c8a96e'
                    e.currentTarget.style.borderColor = '#c8a96e'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#6b6560'
                    e.currentTarget.style.borderColor = '#2a2a2a'
                  }}
                >
                  ✕
                </button>
                <motion.img
                  src={selectedCert}
                  alt="Certificate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  style={{
                    width: '100%',
                    border: '1px solid #1e1e1e',
                    boxShadow: '0 40px 80px #000000aa',
                  }}
                />
                <p style={{
                  textAlign: 'center',
                  color: '#2a2a2a',
                  fontFamily: 'monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: '1rem',
                }}>
                  Click outside to close
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}