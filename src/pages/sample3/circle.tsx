import { CircleCollider } from '@/components/collision'
import { Collision, CollisionManager } from '@/types/collision'
import { Graphics } from '@pixi/react'
import { Graphics as PixiGraphics } from 'pixi.js'
import { useCallback } from 'react'

export interface CircleProps {
  x: number
  y: number
  radius: number
  tint: string
  collisionManager: CollisionManager
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const Circle = ({
  x,
  y,
  radius,
  tint,
  collisionManager,
  onCollisionEnter,
  onCollisionExit,
}: CircleProps) => {
  const draw = useCallback(
    (graphics: PixiGraphics) => {
      graphics.clear()
      graphics.beginFill(tint)
      graphics.drawCircle(x, y, radius)
      graphics.endFill()
    },
    [x, y, radius, tint]
  )

  return (
    <>
      <CircleCollider
        manager={collisionManager}
        x={x}
        y={y}
        radius={radius}
        onCollisionEnter={onCollisionEnter}
        onCollisionExit={onCollisionExit}
      />
      <Graphics draw={draw} tint={tint} />
    </>
  )
}
