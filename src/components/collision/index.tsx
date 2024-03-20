import { useCircleCollider, useRectCollider } from '@/hooks/collision'
import { Collision, CollisionManager } from '@/types/collision'
import { useEffect } from 'react'

export interface CircleColliderProps {
  manager: CollisionManager
  x: number
  y: number
  radius: number
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const CircleCollider = ({
  manager,
  x,
  y,
  radius,
  onCollisionEnter,
  onCollisionExit,
}: CircleColliderProps) => {
  const collider = useCircleCollider(
    manager,
    x,
    y,
    radius,
    onCollisionEnter,
    onCollisionExit
  )

  useEffect(() => {
    if (!collider) return
    collider!.x = x
    collider!.y = y
    collider!.radius = radius
  }, [x, y, radius])

  return null
}

export interface RectColliderProps {
  manager: CollisionManager
  x: number
  y: number
  width: number
  height: number
  onCollisionEnter?: (collision: Collision) => void
  onCollisionExit?: (collision: Collision) => void
}

export const RectCollider = ({
  manager,
  x,
  y,
  width,
  height,
  onCollisionEnter,
  onCollisionExit,
}: RectColliderProps) => {
  const collider = useRectCollider(
    manager,
    x,
    y,
    width,
    height,
    onCollisionEnter,
    onCollisionExit
  )

  useEffect(() => {
    if (!collider) return
    collider!.x = x
    collider!.y = y
    collider!.width = width
    collider!.height = height
  }, [x, y, width, height])

  return null
}
