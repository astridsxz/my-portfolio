import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const PROJECTS = [
{
  id: 1,
  status: 'live',
  type: 'Capstone Project — Web App',
  title: 'SOULENCE',
  image: '/soulence.png',
  problem: 'Students at school Valentine events had no dedicated platform to connect and match with each other.',
  solution: 'Built a student matchmaking web app where users create profiles and match with other students during Valentine events.',
  outcome: 'Successfully deployed as a capstone project — a fun, functional platform that brought students together during school events.',
  stack: ['PHP', 'HTML', 'CSS', 'JavaScript'],
  link: 'http://Soulence.gt.tc/home.php',
},
{
    id: 2,
    status: 'live',
    type: 'Experimental Project — Web App',
    title: 'VERITAS',
    image: '/veritas.png',
    problem: 'Filipino restaurants lacked a streamlined way for guests to reserve specific tables online while keeping front desk staff informed in real time.',
    solution: 'Built an online booking platform for a Filipino restaurant where guests reserve a specific table and the front desk receives live notifications to manage availability.',
    outcome: 'Successfully deployed as a live experimental project — guests can book tables seamlessly while front desk staff handle reservations through a dedicated management view.',
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript'],
    link: 'http://veritas.gt.tc',
  },
  {
    id: 3,
    status: 'soon',
    type: 'Coming Soon',
    title: 'New Project',
    image: null,
    stack: [],
    link: null,
  },
]

function ProjectSkeleton() {
  return (
    <div style={{
      background: '#111111',
      minHeight: '480px',
      display: 'flex',
      flexDirection: 'column',
      padding: '2.5rem',
      gap: '1.5rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="skeleton-line" style={{ width: '3.5rem', height: '3.5rem', background: '#1e1e1e', borderRadius: '4px' }} />
        <div className="skeleton-line" style={{ width: '3rem', height: '0.8rem', background: '#1e1e1e', borderRadius: '4px', alignSelf: 'center' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center' }}>
        <div className="skeleton-line" style={{ width: '55%', height: '1.6rem', background: '#1e1e1e', borderRadius: '4px' }} />
        <div className="skeleton-line" style={{ width: '92%', height: '0.8rem', background: '#1e1e1e', borderRadius: '4px' }} />
        <div className="skeleton-line" style={{ width: '80%', height: '0.8rem', background: '#1e1e1e', borderRadius: '4px' }} />
        <div className="skeleton-line" style={{ width: '65%', height: '0.8rem', background: '#1e1e1e', borderRadius: '4px' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div className="skeleton-line" style={{ width: '3.5rem', height: '1.4rem', background: '#1e1e1e', borderRadius: '4px' }} />
        <div className="skeleton-line" style={{ width: '3rem', height: '1.4rem', background: '#1e1e1e', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

function CaseCard({ project, delay, inView }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [shine, setShine] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const showSkeleton = project.status === 'live' && !imageLoaded

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ x: (y - 0.5) * 14, y: (x - 0.5) * -14 })
    setShine({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setShine({ x: 50, y: 50 })
    setHovered(false)
  }

  if (project.status === 'soon') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        style={{
          border: '1px solid #1e1e1e',
          background: '#0a0a0a',
          minHeight: '420px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: 0.4,
        }}
      >
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#6b6560',
          textTransform: 'uppercase',
        }}>
          Coming Soon
        </div>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '20px',
          color: '#3a3632',
        }}>
          New Project
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        border: '1px solid #1e1e1e',
        background: '#111',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease, border-color 0.3s',
        borderColor: hovered ? '#c8a96e33' : '#1e1e1e',
      }}
    >
      {showSkeleton && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
          <ProjectSkeleton />
        </div>
      )}

      {hovered && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, #c8a96e0a 0%, transparent 60%)`,
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'background 0.05s',
        }} />
      )}

      <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: '#0a0a0a' }}>
        <img
          src={project.image}
          alt={project.title}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease, transform 0.5s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: "'DM Mono', monospace",
          fontSize: '9px',
          letterSpacing: '0.15em',
          color: '#4caf50',
          background: '#080808cc',
          padding: '4px 10px',
          textTransform: 'uppercase',
          zIndex: 1,
        }}>
          <span style={{
            width: '5px', height: '5px',
            borderRadius: '50%',
            background: '#4caf50',
            display: 'inline-block',
            animation: 'livePulse 2s ease-in-out infinite',
          }} />
          Live
        </div>
      </div>

      <motion.div
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '28px' }}
      >
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.18em',
          color: '#c8a96e',
          textTransform: 'uppercase',
          marginBottom: '10px',
        }}>
          {project.type}
        </div>

        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px',
          fontWeight: 700,
          color: '#e8e3d8',
          marginBottom: '20px',
          lineHeight: 1.2,
        }}>
          {project.title}
        </h3>

        <div style={{ height: '1px', background: '#1e1e1e', marginBottom: '20px' }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: '#c1b7ad',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>Problem</div>
            <div style={{ fontSize: '12px', color: '#a09890', lineHeight: 1.6, textAlign: 'justify', }}>{project.problem}</div>
          </div>
          <div>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.15em',
              color: '#c1b7ad',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>Solution</div>
            <div style={{ fontSize: '12px', color: '#a09890', lineHeight: 1.6, textAlign: 'justify', }}>{project.solution}</div>
          </div>
        </div>

        <div style={{
          background: '#0a0a0a',
          borderLeft: '2px solid #c8a96e',
          padding: '12px 14px',
          marginBottom: '20px',
        }}>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.15em',
            color: '#c8a96e',
            textTransform: 'uppercase',
            marginBottom: '5px',
          }}>Outcome</div>
          <div style={{ fontSize: '12px', color: '#a09890', lineHeight: 1.6, textAlign: 'justify', }}>{project.outcome}</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
          {project.stack.map(tag => (
            <span key={tag} style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '9px',
              letterSpacing: '0.08em',
              color: '#6b6560',
              border: '1px solid #1e1e1e',
              padding: '3px 8px',
              textTransform: 'uppercase',
            }}>{tag}</span>
          ))}
        </div>

        <AnimatePresence>
          {hovered && project.link && (
            <motion.a
              href={project.link}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.15em',
                color: '#c8a96e',
                textTransform: 'uppercase',
                textDecoration: 'none',
                border: '1px solid #c8a96e44',
                padding: '8px 16px',
                transition: 'background 0.2s',
              }}
            >
              Visit Project →
            </motion.a>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" ref={ref} style={{ padding: '100px 6vw', background: '#080808' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ marginBottom: '64px' }}
      >
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: '#c8a96e',
          textTransform: 'uppercase',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          Selected Work
          <span style={{ display: 'block', height: '1px', width: '40px', background: '#c8a96e', opacity: 0.4 }} />
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(52px, 4vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          color: '#e8e3d8',
        }}>
          Projects that<br />
          <em style={{ fontStyle: 'italic', color: '#c8a96e', fontSize: 'clamp(22px, 4vw, 42px)', }}>speak for themselves</em>
        </h2>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px',
      }}>
        {PROJECTS.map((project, i) => (
          <CaseCard key={project.id} project={project} delay={i * 0.08} inView={inView} />
        ))}
      </div>
    </section>
  )
}