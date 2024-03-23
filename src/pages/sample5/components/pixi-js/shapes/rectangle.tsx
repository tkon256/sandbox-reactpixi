import { Graphics } from '@pixi/react'
import { Graphics as PixiGraphics } from 'pixi.js'
import { useCallback } from 'react'

export interface RectangleProps {
  x: number
  y: number
  width: number
  height: number
  tint?: string
}

export const Rectangle = ({
  x,
  y,
  width,
  height,
  tint = 'white',
}: RectangleProps) => {
  const draw = useCallback(
    (graphics: PixiGraphics) => {
      graphics.clear()
      graphics.beginFill(tint)
      graphics.drawRect(x, y, width, height)
      graphics.endFill()
    },
    [x, y, width, height, tint]
  )

  return <Graphics draw={draw} />
}
