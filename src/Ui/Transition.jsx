import { motion } from 'framer-motion'
import './Transition.css'
import Logo3dStories from '../Svg/Logo3dStories'

const Transition = OgComponent => {
  return () => (
    <>
      <OgComponent />

      <motion.div
        key="1"
        className="slide-in"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo3dStories pointerEvent={false} width={140} />
      </motion.div>
      <motion.div
        key="2"
        className="slide-out"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo3dStories pointerEvent={false} width={140} />
      </motion.div>
    </>
  )
}

export default Transition
