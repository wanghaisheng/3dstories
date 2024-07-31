import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const Riegelhaube = ({ rotation }) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
  }, [])

  const model = useGLTF('./riegelhaube.glb')
  model.scene.children[0].material.depthWrite = true
  return (
    <>
      <mesh receiveShadow scale={0.3} rotation={[0, 0, rotation]}>
        <primitive object={model.scene} />
      </mesh>
    </>
  )
}

export default Riegelhaube
