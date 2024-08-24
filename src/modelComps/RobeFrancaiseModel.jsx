import { useGLTF } from '@react-three/drei'
import { watchLoadedAtom } from '../GlobalState'
import { useAtom } from 'jotai'
import { forwardRef, useEffect } from 'react'

const RobeFrancaiseModel = forwardRef(({ position, rotation, ...props }, ref) => {
  const [, setWatchLoadedAtom] = useAtom(watchLoadedAtom)

  useEffect(() => {
    setWatchLoadedAtom(true)
    return () => {
      setWatchLoadedAtom(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { nodes, materials } = useGLTF('/robe.glb')
  materials.material_0.depthWrite = true
  materials.material_0.metalness = 0

  return (
    <group {...props} position={position} dispose={null} rotation={[0, 0, rotation]}>
      <mesh
        scale={0.035}
        castShadow
        receiveShadow
        ref={ref}
        geometry={nodes['T8503_Artec-scan_edited'].geometry}
        material={materials.material_0}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
})

useGLTF.preload('/robe.glb')

export default RobeFrancaiseModel
