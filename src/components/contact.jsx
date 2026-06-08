import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import MagneticButton from './magneticbutton'

// ─────────────────────────────────────────────────────────────
// HOW TO WIRE UP THE FORM (free, no backend needed):
//
// 1. Go to https://emailjs.com and create a free account
// 2. Add an Email Service (Gmail works great)
// 3. Create an Email Template — use these variables in it:
//    {{from_name}}, {{from_email}}, {{service}}, {{budget}}, {{message}}
// 4. Get your Service ID, Template ID, and Public Key
// 5. Replace the three placeholder strings below with your real values
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

const SERVICES = [
  'Landing Page',
  'Web Application',
  'UI / UX Design',
  'Site Redesign',
  'Something else',
]

const BUDGETS = ['₱5k – 10k', '₱10k – 25k', '₱25k+']

const SOCIALS = [
  {
    label: 'GitHub',
    handle: 'github.com/astridsxz',
    href: 'https://github.com/astridsxz',
    icon: '⌥',
  },
  {
    label: 'LinkedIn',
    handle: 'linkedin.com/in/benedick-miranda',
    href: 'https://linkedin.com/in/benedick-miranda-72b0813a9',
    icon: '◈',
  },
  {
    label: 'Email',
    handle: 'benedickmiranda43@gmail.com',
    href: 'mailto:benedickmiranda43@gmail.com',
    icon: '◉',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    name: '', email: '', service: '', budget: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    try {
      const emailjs = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm')
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service || 'Not specified',
          budget: form.budget || 'Not specified',
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} style={{
      padding: '100px 6vw 80px',
      background: '#080808',
      position: 'relative',
    }}>

      {/* Header */}
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
          Get In Touch
          <span style={{ display: 'block', height: '1px', width: '40px', background: '#c8a96e', opacity: 0.4 }} />
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(36px, 5vw, 68px)',
          fontWeight: 700,
          lineHeight: 1.05,
          color: '#e8e3d8',
          maxWidth: '640px',
        }}>
          Let's build something<br />
          <em style={{ fontStyle: 'italic', color: '#c8a96e' }}>great together.</em>
        </h2>
      </motion.div>

      {/* Two-col layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)',
        gap: '80px',
        alignItems: 'start',
      }}>

        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{
            fontSize: '14px',
            color: '#c1b7ad',
            lineHeight: 1.85,
            marginBottom: '40px',
            maxWidth: '340px',
            fontFamily: 'Playfair Display, serif',
          }}>
            Have a project in mind? I'd love to hear about it. Fill out the form and I'll get back to you within 24 hours.
          </p>

          {[
            { label: 'Location', value: 'Metro Manila, Philippines — works globally' },
            { label: 'Response time', value: 'Within 24 hours' },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '16px',
              alignItems: 'flex-start',
            }}>
              <div style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '9px',
                letterSpacing: '0.15em',
                color: '#c8a96e',
                textTransform: 'uppercase',
                width: '90px',
                paddingTop: '2px',
                flexShrink: 0,
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: '13px',
                color: '#c1b7ad',
                fontFamily: "'DM Mono', monospace",
                letterSpacing: '0.04em',
              }}>
                {item.value}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {SOCIALS.map(s => (
              <SocialCard key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  border: '1px solid #c8a96e44',
                  background: '#0a0a0a',
                  padding: '60px 40px',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '32px',
                  color: '#c8a96e',
                  marginBottom: '16px',
                }}>
                  ✦
                </div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22px',
                  color: '#e8e3d8',
                  marginBottom: '10px',
                }}>
                  Message received.
                </div>
                <p style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '11px',
                  color: '#6b6560',
                  letterSpacing: '0.12em',
                }}>
                  I'll be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.div key="form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <FormGroup label="Your Name">
                    <input
                      type="text"
                      placeholder="Juan dela Cruz"
                      value={form.name}
                      onChange={set('name')}
                      style={inputStyle}
                    />
                  </FormGroup>
                  <FormGroup label="Email">
                    <input
                      type="email"
                      placeholder="juan@company.com"
                      value={form.email}
                      onChange={set('email')}
                      style={inputStyle}
                    />
                  </FormGroup>
                </div>

                <FormGroup label="What do you need?">
                  <select value={form.service} onChange={set('service')} style={inputStyle}>
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FormGroup>

                <FormGroup label="Budget Range">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {BUDGETS.map(b => (
                      <button
                        key={b}
                        onClick={() => setForm(f => ({ ...f, budget: b }))}
                        style={{
                          padding: '10px 6px',
                          border: `1px solid ${form.budget === b ? '#c8a96e' : '#1e1e1e'}`,
                          background: form.budget === b ? '#c8a96e18' : 'transparent',
                          color: form.budget === b ? '#c8a96e' : '#6b6560',
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '10px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </FormGroup>

                <FormGroup label="Project Details">
                  <textarea
                    placeholder="Tell me about your project — what you're building, your timeline, and any goals..."
                    value={form.message}
                    onChange={set('message')}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  />
                </FormGroup>

                {status === 'error' && (
                  <div style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '11px',
                    color: '#e06c6c',
                    letterSpacing: '0.1em',
                  }}>
                    Something went wrong. Try emailing me directly at benedickmiranda43@gmail.com
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  style={{
                    background: '#c8a96e',
                    color: '#080808',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '16px 32px',
                    border: 'none',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center',
                    opacity: status === 'sending' ? 0.7 : 1,
                    transition: 'opacity 0.2s',
                    width: '100%',
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
                  {status !== 'sending' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Footer — no border line, copyright centred and highlighted */}
      <div style={{
        marginTop: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.18em',
          color: '#c8a96e',
          textTransform: 'uppercase',
          background: '#c8a96e12',
          border: '1px solid #c8a96e2a',
          padding: '10px 24px',
        }}>
          © 2026 — Built with intention. 
        </div>
      </div>

    </section>
  )
}

function FormGroup({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: '10px',
        letterSpacing: '0.15em',
        color: '#6b6560',
        textTransform: 'uppercase',
      }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function SocialCard({ label, handle, href, icon }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        border: `1px solid ${hovered ? '#c8a96e66' : '#1e1e1e'}`,
        background: hovered ? '#c8a96e08' : 'transparent',
        textDecoration: 'none',
        transition: 'all 0.25s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: '#c8a96e', fontSize: '16px' }}>{icon}</span>
        <div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: '#6b6560',
            textTransform: 'uppercase',
            marginBottom: '2px',
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '11px',
            color: '#a09890',
            letterSpacing: '0.04em',
          }}>
            {handle}
          </div>
        </div>
      </div>
      <span style={{
        color: '#c8a96e',
        fontSize: '12px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
        transition: 'all 0.2s',
      }}>
        →
      </span>
    </a>
  )
}

const inputStyle = {
  background: '#0d0d0d',
  border: '1px solid #1e1e1e',
  color: '#e8e3d8',
   fontFamily: "'DM Mono', monospace",
  fontSize: '14px',
  padding: '12px 16px',
  outline: 'none',
  width: '100%',
  WebkitAppearance: 'none',
  appearance: 'none',
  transition: 'border-color 0.2s',
}