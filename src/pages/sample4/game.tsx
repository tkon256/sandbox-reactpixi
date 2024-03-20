import { Stage } from '@pixi/react'
import { Scene1 } from './scene1'

export const Game = () => {
  return (
    <Stage options={{ background: '#1099bb' }}>
      <Scene1 />
    </Stage>
  )
}
