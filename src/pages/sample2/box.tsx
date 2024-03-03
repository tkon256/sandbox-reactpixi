import { Graphics } from '@pixi/react'
import * as PIXI from 'pixi.js'

export interface BoxProps {
  bounds: PIXI.Rectangle
  tint: string
}

export const Box = ({ bounds, tint }: BoxProps) => {
  function drawRect(graphics: PIXI.Graphics): void {
    graphics.clear()
    graphics.beginFill(tint)
    graphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height)
    graphics.endFill()
  }

  return (
    <>
      <Graphics draw={drawRect} tint={tint} />
    </>
  )
}
