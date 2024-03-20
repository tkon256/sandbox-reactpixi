import { RectCollider } from '@/components/collision'
import { Collision, CollisionManager } from '@/types/collision'
import { Graphics } from '@pixi/react'
import * as PIXI from 'pixi.js'
import { useCallback } from 'react'

export interface BoxProps {
  x: number
  y: number
  width: number
  height: number
  tint: string
  collisionManager: CollisionManager
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const Box = ({
  x,
  y,
  width,
  height,
  tint,
  collisionManager,
  onCollisionEnter,
  onCollisionExit,
}: BoxProps) => {
  const draw = useCallback(
    (graphics: PIXI.Graphics) => {
      graphics.clear()
      graphics.beginFill(tint)
      graphics.drawRect(x, y, width, height)
      graphics.endFill()
    },
    [x, y, width, height, tint]
  )

  return (
    <>
      <RectCollider
        manager={collisionManager}
        x={x}
        y={y}
        width={width}
        height={height}
        onCollisionEnter={onCollisionEnter}
        onCollisionExit={onCollisionExit}
      />
      <Graphics draw={draw} tint={tint} />
    </>
  )
}
