import { extend, useThree, useFrame } from '@react-three/fiber'
import { editable as e, useCurrentSheet } from '@theatre/r3f'
import { useRef, useEffect } from 'react'
import { SpotLightHelper } from 'three'

extend({ SpotLightHelper })

const SpotLightWithHelper = ({ showHelper = true, ...props }) => {
  const { scene } = useThree()
  const ref = useRef()
  const helperRef = useRef()

  useEffect(() => {
    if (showHelper && ref.current && scene) {
      helperRef.current = new SpotLightHelper(ref.current)
      scene.add(helperRef.current)
      return () => {
        scene.remove(helperRef.current)
        helperRef.current.dispose()
      }
    }
  }, [scene, showHelper])

  useFrame(() => {
    if (showHelper && helperRef.current) {
      helperRef.current.update()
    }
  })

  return <e.spotLight castShadow ref={ref} {...props} />
}

export default SpotLightWithHelper
