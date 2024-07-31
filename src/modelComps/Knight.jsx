import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const Knight = () => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
  }, [])

  const model = useGLTF('./knight.glb')
  model.scene.children[0].material.depthWrite = true
  return (
    <>
      <mesh receiveShadow scale={0.8} position={[2, -1, 0]}>
        <primitive object={model.scene} />
      </mesh>
    </>
  )
}

export default Knight
