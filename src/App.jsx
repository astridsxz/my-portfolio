import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Projects from './components/projects'
import Skills from './components/skills'
import Experience from './components/experience'
import Contact from './components/contact'

function ProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const current = window.scrollY
      setProgress((current / total) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: '#1e1e1e',
      zIndex: 99999,
    }}>
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(to right, #c8a96e, #e8d5a3)',
          width: `${progress}%`,
          boxShadow: '0 0 8px #c8a96e88',
        }}
      />
    </div>
  )
}

function Loader({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center gap-8"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: 'Georgia, serif' }}
        className="text-[#c8a96e] text-2xl italic tracking-widest"
      >
        Benedick D. Miranda
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ fontFamily: 'monospace' }}
        className="text-[#2a2a2a] text-xs tracking-[0.4em] uppercase"
      >
        Loading Portfolio
      </motion.p>

      <div className="w-48 h-px bg-[#1e1e1e] overflow-hidden">
        <motion.div
          className="h-full bg-[#c8a96e]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          onAnimationComplete={onDone}
        />
      </div>
    </motion.div>
  )
}

function Grain() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9990,
        opacity: 0.04,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function CurtainTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        {children}
        <motion.div
          initial={{ scaleY: 1, transformOrigin: 'top' }}
          animate={{
            scaleY: 0,
            transformOrigin: 'top',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
          exit={{
            scaleY: 1,
            transformOrigin: 'bottom',
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: '#c8a96e',
            zIndex: 99998,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <BrowserRouter>
      <Grain />
      <ProgressBar />

      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#080808] text-[#e8e3d8] overflow-x-hidden"
        >
          <CurtainTransition>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </CurtainTransition>
        </motion.main>
      )}
    </BrowserRouter>
  )
} 