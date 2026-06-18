import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
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

// Film grain canvas overlay
function FilmGrain() {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const drawGrain = () => {
      const { width, height } = canvas
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const val = Math.random() * 255
        data[i] = val
        data[i + 1] = val
        data[i + 2] = val
        data[i + 3] = Math.random() * 28 // very subtle opacity
      }
      ctx.putImageData(imageData, 0, 0)
      frameRef.current = requestAnimationFrame(drawGrain)
    }

    drawGrain()
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
        mixBlendMode: 'overlay',
        opacity: 0.55,
      }}
    />
  )
}

// 3D tilt photo frame
function TiltPhotoFrame() {
  const frameRef = useRef(null)

  // Spring physics for smooth, natural feel
  const rawX = useSpring(0, { stiffness: 120, damping: 20 })
  const rawY = useSpring(0, { stiffness: 120, damping: 20 })

  const rotateX = useTransform(rawY, v => `${v}deg`)
  const rotateY = useTransform(rawX, v => `${v}deg`)

  // Shine position based on mouse
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!frameRef.current) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width   // 0–1
    const y = (e.clientY - rect.top) / rect.height    // 0–1
    rawX.set((x - 0.5) * 18)   // tilt left/right ±9°
    rawY.set((y - 0.5) * -14)  // tilt up/down ±7°
    setShine({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
    setShine({ x: 50, y: 50 })
    setHovered(false)
  }

  return (
    <div
      style={{ perspective: '1000px', display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={frameRef}
        style={{
          width: '260px',
          height: '340px',
          border: '1px solid #1e1e1e',
          position: 'relative',
          overflow: 'hidden',
          background: '#111',
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          // subtle gold border glow on hover
          boxShadow: hovered
            ? '0 0 0 1px #c8a96e22, 0 24px 60px #00000088'
            : '0 12px 40px #00000066',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Corner brackets */}
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
            zIndex: 4,
            transition: 'opacity 0.3s',
            opacity: hovered ? 1 : 0.7,
            ...s,
          }} />
        ))}

        {/* Mouse-follow shine */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, #c8a96e18 0%, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 2,
          transition: hovered ? 'background 0.05s' : 'background 0.5s',
        }} />

        {/* Bottom gradient fade */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 55%, #08080899)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* Animated film grain */}
        <FilmGrain />

        {/* Photo */}
        <img
          src="/hero.png"
          alt="Benedick D. Miranda"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />

        {/* Name label */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '16px',
          zIndex: 5,
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
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: isMobile ? '100px 6vw 60px' : '120px 6vw 80px',
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

      {/* Left col */}
      <div style={{
        flex: 1,
        maxWidth: isMobile ? '100%' : '600px',
        position: 'relative',
        zIndex: 1,
      }}>

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
            width: '6px', height: '6px',
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

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 'clamp(40px, 11vw, 60px)' : 'clamp(64px, 9vw, 88px)',
            lineHeight: 1.0,
            fontWeight: 700,
            color: '#e8e3d8',
            marginBottom: '8px',
          }}
        >
          I build websites
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 'clamp(32px, 9vw, 50px)' : 'clamp(42px, 6.5vw, 78px)',
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
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: isMobile ? '32px' : '48px',
          }}
        >
          <MagneticButton
            href="#projects"
            style={{
              background: '#c8a96e',
              color: '#080808',
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: isMobile ? '12px 24px' : '14px 32px',
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
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: isMobile ? '11px 24px' : '13px 32px',
              border: '1px solid #c8a96e66',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Start a Project
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        />
      </div>

      {/* Photo frame — desktop only */}
      {!isMobile && (
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
          <TiltPhotoFrame />
        </motion.div>
      )}

      {/* Scroll indicator — desktop only */}
      {!isMobile && (
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
      )}

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