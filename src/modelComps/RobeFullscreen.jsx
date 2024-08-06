import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const RobeFullscreen = ({ position, rotation, ...props }) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const model = useGLTF('./robecopy.glb')
  model.scene.children[0].material.depthWrite = true
  model.scene.children[0].material.metalness = 0

  return (
    <group {...props} position={position} dispose={null}>
      <mesh scale={0.035} rotation={[0, 0, rotation]}>
        <primitive object={model.scene} />
      </mesh>
      {/* <Annotation /> */}
    </group>
  )
}

export default RobeFullscreen
