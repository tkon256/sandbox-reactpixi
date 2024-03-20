import { useCollision } from '@/hooks/collision'
import { Collision } from '@/types/collision'
import '@pixi/events'
import { Container, useApp, useTick } from '@pixi/react'
import { useState } from 'react'
import { Box } from './box'
import { Circle } from './circle'
import { usePointer } from './hooks/input'

export const Scene1 = () => {
  const app = useApp()
  const pointer = usePointer()
  const collisionManager = useCollision()

  const [isCircleCollided, setIsCircleCollided] = useState(false)

  useTick(() => {
    collisionManager.update()
  })

  const handleCircleCollisionEnter = (c: Collision) => {
    setIsCircleCollided(true)
  }

  const handleCircleCollisionExit = () => {
    setIsCircleCollided(false)
  }

  const staticBox = (
    <Box
      x={app.view.width / 3 - 32}
      y={app.view.height / 2 - 32}
      width={64}
      height={64}
      tint={'#9e9e9e'}
      collisionManager={collisionManager}
    />
  )

  const staticCircle = (
    <Circle
      x={(app.view.width * 2) / 3}
      y={app.view.height / 2}
      radius={32}
      tint={'#9e9e9e'}
      collisionManager={collisionManager}
    />
  )

  const pointerCircle = (
    <Circle
      x={pointer.x}
      y={pointer.y}
      radius={32}
      tint={isCircleCollided ? '#ff9800' : '#2e7d32'}
      collisionManager={collisionManager}
      onCollisionEnter={handleCircleCollisionEnter}
      onCollisionExit={handleCircleCollisionExit}
    />
  )

  return (
    <Container>
      {staticBox}
      {staticCircle}
      {pointerCircle}
    </Container>
  )
}
