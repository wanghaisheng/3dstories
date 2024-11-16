import { EffectComposer, Bloom, Sepia } from '@react-three/postprocessing'
import useStore from '../GlobalState'

const EffectComposerComp = () => {
  const scrollToTopEf = useStore(state => state.scrollToTopEf)
  return (
    <EffectComposer>
      {scrollToTopEf === true && (
        <>
          <Sepia intensity={1} />
          <Bloom luminanceThreshold={1} luminanceSmoothing={4} height={300} />
        </>
      )}
    </EffectComposer>
  )
}

export default EffectComposerComp
