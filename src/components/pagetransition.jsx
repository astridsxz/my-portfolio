import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const variants = {
  initial: { scaleY: 1, transformOrigin: 'top' },
  animate: {
    scaleY: 0,
    transformOrigin: 'top',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  },
  exit: {
    scaleY: 1,
    transformOrigin: 'bottom',
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
  }
}

export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}>
          {children}
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100%',
              height: '100vh',
              background: '#c8a96e',
              zIndex: 9999,
              pointerEvents: 'none'
            }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  )
}