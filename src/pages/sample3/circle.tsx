import { CircleCollider } from '@/components/game/collision'
import { Collision } from '@/types/game/collision'
import { Graphics } from '@pixi/react'
import * as PIXI from 'pixi.js'

export interface CircleProps {
  x: number
  y: number
  radius: number
  tint: string
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const Circle = ({
  x,
  y,
  radius,
  tint,
  onCollisionEnter,
  onCollisionExit,
}: CircleProps) => {
  function drawRect(graphics: PIXI.Graphics): void {
    graphics.clear()
    graphics.beginFill(tint)
    graphics.drawCircle(x, y, radius)
    graphics.endFill()
  }

  return (
    <>
      <CircleCollider
        x={x}
        y={y}
        radius={radius}
        onCollisionEnter={onCollisionEnter}
        onCollisionExit={onCollisionExit}
      />
      <Graphics draw={drawRect} tint={tint} />
    </>
  )
}
