import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
// import { motion } from 'framer-motion-3d'
import { useSpring } from 'framer-motion'
// import { useFrame } from '@react-three/fiber'

const Robe = ({ position, rotation, ...props }) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
  }, [])

  const model = useGLTF('./robe.glb')
  model.scene.children[0].material.depthWrite = true
  model.scene.children[0].material.metalness = 0

  const animatedValue = useSpring(rotation, {
    stiffness: 100,
    damping: 10,
  })

  // useFrame(() => {
  //   console.log('AAAA', rotation)
  // })

  return (
    <group {...props} position={position} dispose={null}>
      <mesh scale={0.035} rotation={[0, 0, rotation]}>
        <primitive object={model.scene} />
      </mesh>
      {/* <Annotation /> */}
    </group>
  )
}

export default Robe
