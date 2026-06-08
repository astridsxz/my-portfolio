import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MagneticButton from './magneticbutton'

const SERVICES = [
  {
    icon: '⬡',
    title: 'Landing Pages',
    desc: 'High-converting pages built to turn visitors into clients. Mobile-first, fast-loading, and SEO-ready from day one.',
    tags: ['React', 'Tailwind', 'Framer Motion'],
    price: 'Starting at ₱8,000',
    deliverables: ['Responsive design', 'Animations & transitions', 'Contact form', 'Deployed & live'],
  },
  {
    icon: '◈',
    title: 'Web Applications',
    desc: 'Custom web apps with polished UX and solid architecture. From wireframe to deployed product — I handle it all.',
    tags: ['React', 'Node.js', 'REST API'],
    price: 'Starting at ₱20,000',
    deliverables: ['Full-stack build', 'Database integration', 'Auth & roles', 'Cloud deployment'],
  },
  {
    icon: '◇',
    title: 'UI / UX Design',
    desc: 'Interfaces that look intentional and feel effortless. Wireframes, prototypes, and production-ready design systems.',
    tags: ['Figma', 'Prototyping', 'Design System'],
    price: 'Starting at ₱5,000',
    deliverables: ['Wireframes', 'Interactive prototype', 'Design system', 'Dev handoff'],
  },
  {
    icon: '◉',
    title: 'Site Redesigns',
    desc: 'Got an outdated site? Ill modernize it — same content, dramatically better aesthetics, performance, and UX.',
    tags: ['Audit', 'Migration', 'Performance'],
    price: 'Starting at ₱12,000',
    deliverables: ['UX audit', 'Modern rebuild', 'Speed optimization', 'Mobile fix'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" ref={ref} style={{
      padding: '100px 6vw',
      background: '#080808',
      position: 'relative',
    }}>
      {/* Section header */}
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
          What I Offer
          <span style={{ display: 'block', height: '1px', width: '40px', background: '#c8a96e', opacity: 0.4 }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#e8e3d8',
          }}>
            Services built for<br />
            <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>real results</em>
          </h2>

          <MagneticButton
            href="#contact"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: '#c8a96e',
              textTransform: 'uppercase',
              border: '1px solid #c8a96e44',
              padding: '11px 24px',
              background: 'transparent',
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            Discuss Your Project →
          </MagneticButton>
        </div>
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1px',
        background: '#1e1e1e',
        border: '1px solid #1e1e1e',
      }}>
        {SERVICES.map((s, i) => (
          <ServiceCard key={s.title} service={s} delay={i * 0.1} inView={inView} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ service, delay, inView }) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#0d0d0d' : '#080808',
        padding: '36px 28px 32px',
        transition: 'background 0.3s',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Gold line on hover */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: '#c8a96e',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />

      {/* Icon */}
      <div style={{
        fontSize: '26px',
        color: hovered ? '#c8a96e' : '#6b6560',
        marginBottom: '20px',
        transition: 'color 0.3s',
        fontWeight: 300,
      }}>
        {service.icon}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '21px',
        fontWeight: 700,
        color: '#e8e3d8',
        marginBottom: '12px',
      }}>
        {service.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontSize: '13px',
        color: '#6b6560',
        lineHeight: 1.75,
        marginBottom: '20px',
      }}>
        {service.desc}
      </p>

      {/* Deliverables */}
      <ul style={{ listStyle: 'none', marginBottom: '20px' }}>
        {service.deliverables.map(d => (
          <li key={d} style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.08em',
            color: '#6b6560',
            textTransform: 'uppercase',
            paddingLeft: '14px',
            position: 'relative',
            marginBottom: '6px',
          }}>
            <span style={{
              position: 'absolute',
              left: 0,
              color: '#c8a96e',
            }}>—</span>
            {d}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {service.tags.map(tag => (
          <span key={tag} style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '9px',
            letterSpacing: '0.1em',
            color: '#c8a96e',
            border: '1px solid #c8a96e33',
            padding: '3px 8px',
            textTransform: 'uppercase',
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Price */}
      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '11px',
        color: '#c8a96e',
        letterSpacing: '0.1em',
        borderTop: '1px solid #1e1e1e',
        paddingTop: '16px',
        marginTop: 'auto',
      }}>
        {service.price}
      </div>
    </motion.div>
  )
}