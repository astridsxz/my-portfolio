import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './magneticbutton'

const phrases = [
  'that convert.',
  'that impress.',
  'that perform.',
  'that get results.',
]

function Typewriter({ words, speed = 80, pause = 1800 }) {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    let timeout

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => setCharIdx(i => i + 1), speed)
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => setCharIdx(i => i - 1), speed / 2)
    } else {
      setDeleting(false)
      setWordIdx(i => (i + 1) % words.length)
    }

    setDisplay(current.slice(0, charIdx))
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return (
    <span>
      {display}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '0.85em',
        background: '#c8a96e',
        marginLeft: '3px',
        verticalAlign: 'middle',
        animation: 'blink 1s step-end infinite',
      }} />
    </span>
  )
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '120px 6vw 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '38%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '700px',
        background: 'radial-gradient(ellipse, #c8a96e08 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ flex: 1, maxWidth: '600px', position: 'relative', zIndex: 1 }}>

        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: '#4caf50',
            textTransform: 'uppercase',
            border: '1px solid #4caf5033',
            padding: '6px 14px',
            background: '#4caf5010',
            marginBottom: '28px',
          }}
        >
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#4caf50',
            display: 'inline-block',
            animation: 'heroPulse 2s ease-in-out infinite',
          }} />
          Available for new projects
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.25em',
            color: '#c8a96e',
            textTransform: 'uppercase',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: '#c8a96e',
            display: 'inline-block',
          }} />
          Frontend Developer
        </motion.div>

        {/* Headline — bumped up */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(64px, 9vw, 88px)',
            lineHeight: 1.0,
            fontWeight: 700,
            color: '#e8e3d8',
            marginBottom: '8px',
          }}
        >
          I build websites
        </motion.h1>

        {/* Typewriter — matched closer to headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(42px, 6.5vw, 78px)',
            fontStyle: 'italic',
            color: '#c8a96e',
            marginBottom: '28px',
            lineHeight: 1.05,
            minHeight: '1.2em',
          }}
        >
          <Typewriter words={phrases} />
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.9, transformOrigin: 'left' }}
          style={{
            width: '60px',
            height: '1px',
            background: '#c8a96e',
            opacity: 0.5,
            marginBottom: '28px',
          }}
        />

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '48px' }}
        >
          <MagneticButton
            href="#projects"
            style={{
              background: '#c8a96e',
              color: '#080808',
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            See My Work
          </MagneticButton>

          <MagneticButton
            href="#contact"
            style={{
              background: 'transparent',
              color: '#c8a96e',
              fontFamily: "'DM Mono', monospace",
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '13px 32px',
              border: '1px solid #c8a96e66',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Start a Project
          </MagneticButton>
        </motion.div>
      </div>

      {/* Photo frame */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          position: 'absolute',
          right: '8vw',
          top: '35%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <div style={{
          width: '260px',
          height: '340px',
          border: '1px solid #1e1e1e',
          position: 'relative',
          overflow: 'hidden',
          background: '#111',
        }}>
          {[
            { top: '-1px', left: '-1px', borderWidth: '2px 0 0 2px' },
            { top: '-1px', right: '-1px', borderWidth: '2px 2px 0 0' },
            { bottom: '-1px', left: '-1px', borderWidth: '0 0 2px 2px' },
            { bottom: '-1px', right: '-1px', borderWidth: '0 2px 2px 0' },
          ].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '22px',
              height: '22px',
              borderColor: '#c8a96e',
              borderStyle: 'solid',
              zIndex: 2,
              ...s,
            }} />
          ))}

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 55%, #08080899)',
            zIndex: 1,
            pointerEvents: 'none',
          }} />

          <img
            src="/hero.png"
            alt="Benedick D. Miranda"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
              display: 'block',
            }}
          />

          <div style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            padding: '16px',
            zIndex: 2,
          }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.2em',
              color: '#c8a96e',
              textTransform: 'uppercase',
              marginBottom: '2px',
            }}>
              Benedick D. Miranda
            </div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.12em',
              color: '#6b6560',
              textTransform: 'uppercase',
            }}>
              Web Developer
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '6vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: '#6b6560',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>
          Scroll
        </div>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, #c8a96e, transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}