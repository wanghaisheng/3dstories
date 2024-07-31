import { motion } from 'framer-motion'
import './Transition.css'

const Transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        className='Transition'
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}

export default Transition
