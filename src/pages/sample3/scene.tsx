import { CollisionProvider } from '@/hooks/game'
import { Collision } from '@/types/game/collision'
import '@pixi/events'
import { Container, useApp } from '@pixi/react'
import { useEffect, useState } from 'react'
import { Box } from './box'
import { Circle } from './circle'
import { Pointer } from './contexts'

export const Scene = () => {
  const app = useApp()
  const [pointer, setPointer] = useState<Pointer>({
    x: app.view.width / 2,
    y: (app.view.height * 3) / 4,
  })
  const [isCircleCollided, setIsCircleCollided] = useState(false)

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  /** Handle mouse move */
  const handleMouseMove = (event: MouseEvent) => {
    if (!app.view.getBoundingClientRect) return

    const canvasRect = app.view.getBoundingClientRect()
    const canvasX = event.clientX - canvasRect.x
    const canvasY = event.clientY - canvasRect.y

    setPointer({
      x: canvasX,
      y: canvasY,
    })
  }

  const BlueBox = () => (
    <Box
      x={(2 * app.view.width) / 3 - 32}
      y={app.view.height / 2 - 32}
      width={64}
      height={64}
      tint={'#3f51b5'}
    />
  )

  const RedBox = () => (
    <Box
      x={app.view.width / 3 - 32}
      y={app.view.height / 2 - 32}
      width={64}
      height={64}
      tint={'#f44336'}
    />
  )

  const CursorCircle = () => {
    const handleCircleCollisionEnter = (c: Collision) => {
      console.log('collision enter', c)
      setIsCircleCollided(true)
    }

    const handleCircleCollisionExit = (c: Collision) => {
      console.log('collision exit', c)
      setIsCircleCollided(false)
    }

    return (
      <Circle
        x={pointer.x}
        y={pointer.y}
        radius={32}
        tint={isCircleCollided ? '#ff9800' : '#2e7d32'}
        onCollisionEnter={handleCircleCollisionEnter}
        onCollisionExit={handleCircleCollisionExit}
      />
    )
  }

  return (
    <Container>
      <CollisionProvider>
        <BlueBox />
        <RedBox />
        <CursorCircle />
      </CollisionProvider>
    </Container>
  )
}
