import { Stage } from '@pixi/react'
import { Scene } from './scene'

export const Sample1 = () => {
  return (
    <>
      <Stage options={{ background: '#1099bb' }}>
        <Scene />
      </Stage>
    </>
  )
}
