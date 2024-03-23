import { useTick } from '@pixi/react'
import { useRectangleBody } from '../hooks/matter-js/bodies'

import { IChamferableBodyDefinition } from 'matter-js'
import { useState } from 'react'
import {
  Rectangle as PixiRectangle,
  RectangleProps as PixiRectangleProps,
} from './pixi-js/shapes'

export interface RectangleProps {
  initialX: number
  initialY: number
  initialWidth: number
  initialHeight: number
  tint?: string
  bodyOptions?: IChamferableBodyDefinition
}

export const Rectangle = ({
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  tint,
  bodyOptions,
}: RectangleProps) => {
  const body = useRectangleBody(
    initialX,
    initialY,
    initialWidth,
    initialHeight,
    bodyOptions
  )
  const [state, setState] = useState({
    x: initialX - initialWidth / 2,
    y: initialY - initialHeight / 2,
    width: initialWidth,
    height: initialHeight,
    tint,
  } as PixiRectangleProps)

  useTick(() => {
    setState((current) => ({
      ...current,
      x: body.position.x - initialWidth / 2,
      y: body.position.y - initialHeight / 2,
    }))
  })

  return (
    <>
      <PixiRectangle {...state} />
    </>
  )
}
