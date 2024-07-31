import { useRef, useState } from 'react'
import { Html } from '@react-three/drei'

import './Annotation.css'

const Annotation = ({ children, isVisible, ...props }) => {
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0.4 : 0.3}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      <Html calculatePosition={isVisible ? () => [0, 0, 0] : undefined}>
        <span>Hello WOrld</span>
      </Html>
    </mesh>
  )
}

export default Annotation
