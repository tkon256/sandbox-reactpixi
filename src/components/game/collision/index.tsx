import { useCircleCollider, useRectCollider } from '@/hooks/game'
import { Collision } from '@/types/game/collision'
import { useTick } from '@pixi/react'
import { useEffect } from 'react'

export interface CircleColliderProps {
  x: number
  y: number
  radius: number
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const CircleCollider = ({
  x,
  y,
  radius,
  onCollisionEnter,
  onCollisionExit,
}: CircleColliderProps) => {
  const collider = useCircleCollider(x, y, radius)

  const unregisterCollisionEnter =
    onCollisionEnter && collider.registerCollisionEnter(onCollisionEnter)
  const unregisterCollisionExit =
    onCollisionExit && collider.registerCollisionExit(onCollisionExit)

  useEffect(() => {
    return () => {
      unregisterCollisionEnter?.()
      unregisterCollisionExit?.()
    }
  }, [])

  useTick(() => {
    collider.x = x
    collider.y = y
    collider.radius = radius
  })

  return null
}

export interface RectColliderProps {
  x: number
  y: number
  width: number
  height: number
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const RectCollider = ({
  x,
  y,
  width,
  height,
  onCollisionEnter,
  onCollisionExit,
}: RectColliderProps) => {
  const collider = useRectCollider(x, y, width, height)

  const unregisterCollisionEnter =
    onCollisionEnter && collider.registerCollisionEnter(onCollisionEnter)
  const unregisterCollisionExit =
    onCollisionExit && collider.registerCollisionEnter(onCollisionExit)

  useEffect(() => {
    return () => {
      unregisterCollisionEnter?.()
      unregisterCollisionExit?.()
    }
  }, [])

  useTick(() => {
    collider.x = x
    collider.y = y
    collider.width = width
    collider.height = height
  })

  return null
}
