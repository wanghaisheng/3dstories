import { EffectComposer, Scanline, Sepia } from '@react-three/postprocessing'
import useStore from '../GlobalState'
import { useState } from 'react'
import { useSpring } from '@react-spring/three'

const EffectComposerComp = () => {
  const scrollToTopEf = useStore(state => state.scrollToTopEf)
  const [intensity, setIntensity] = useState(0)

  const props = useSpring({
    intensity: scrollToTopEf ? 0 : 1,
    from: { intensity: 0 },
    config: { duration: 1500 },
    onChange: ({ value }) => {
      setIntensity(value.intensity)
    }
  })

  return (
    <EffectComposer>
      {scrollToTopEf === true && (
        <>
          <Sepia intensity={intensity} />
          <Scanline density={0.6} opacity={intensity} />
        </>
      )}
    </EffectComposer>
  )
}

export default EffectComposerComp
