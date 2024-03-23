import { useConst } from '@/hooks'
import { Bodies, Composite, IChamferableBodyDefinition } from 'matter-js'
import { useEngine } from '..'

export const useRectangleBody = (
  x: number,
  y: number,
  width: number,
  height: number,
  options?: IChamferableBodyDefinition
) => {
  const engine = useEngine()

  return useConst(() => {
    const body = Bodies.rectangle(x, y, width, height, options)
    Composite.add(engine.world, body)
    return body
  })
}
