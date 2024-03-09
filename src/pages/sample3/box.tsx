import { RectCollider } from '@/components/game/collision'
import { Collision } from '@/types/game/collision'
import { Graphics } from '@pixi/react'
import * as PIXI from 'pixi.js'

export interface BoxProps {
  x: number
  y: number
  width: number
  height: number
  tint: string
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const Box = ({
  x,
  y,
  width,
  height,
  tint,
  onCollisionEnter,
  onCollisionExit,
}: BoxProps) => {
  function drawRect(graphics: PIXI.Graphics): void {
    graphics.clear()
    graphics.beginFill(tint)
    graphics.drawRect(x, y, width, height)
    graphics.endFill()
  }

  return (
    <>
      <RectCollider
        x={x}
        y={y}
        width={width}
        height={height}
        onCollisionEnter={onCollisionEnter}
        onCollisionExit={onCollisionExit}
      />
      <Graphics draw={drawRect} tint={tint} />
    </>
  )
}
