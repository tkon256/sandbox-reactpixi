import { Collider, Collision, CollisionManager } from '@/types/collision'
import { useEffect, useRef } from 'react'
import { useConst } from '..'

export const useCollision = () => {
  const manager = useConst(new CollisionManager())

  useEffect(() => {
    return () => {
      manager.dispose()
    }
  }, [])

  return manager
}

const useCollider = <T extends Collider>(
  addCollider: () => T,
  onCollisionEnter?: (collision: Collision) => void,
  onCollisionExit?: (collision: Collision) => void
) => {
  const collider = useRef<T>()
  const unregisterCollisionEnter = useRef<() => void>()
  const unregisterCollisionExit = useRef<() => void>()

  useEffect(() => {
    collider.current = addCollider()

    return () => {
      unregisterCollisionEnter.current?.()
      unregisterCollisionExit.current?.()
      collider.current?.dispose()
    }
  }, [])

  useEffect(() => {
    unregisterCollisionEnter.current = registerCollisionEvent(
      collider.current?.registerCollisionEnter,
      (collision: Collision) => {
        if (collision.collider !== collider.current) return
        if (collision.target === collider.current) return
        onCollisionEnter?.(collision)
      },
      unregisterCollisionEnter.current
    )
  }, [onCollisionEnter])

  useEffect(() => {
    unregisterCollisionExit.current = registerCollisionEvent(
      collider.current?.registerCollisionExit,
      (collision: Collision) => {
        if (collision.collider !== collider.current) return
        if (collision.target === collider.current) return
        onCollisionExit?.(collision)
      },
      unregisterCollisionExit.current
    )
  }, [onCollisionExit])

  const registerCollisionEvent = (
    register?: (callback: (collision: Collision) => void) => () => void,
    action?: (collision: Collision) => void | undefined,
    unregister?: () => void
  ) => {
    unregister?.()

    if (register && action) {
      return register(action)
    }
  }

  return collider.current
}

export const useCircleCollider = (
  manager: CollisionManager,
  x: number,
  y: number,
  radius: number,
  onCollisionEnter?: (collision: Collision) => void,
  onCollisionExit?: (collision: Collision) => void
) => {
  return useCollider(
    () => manager.addCircleCollider(x, y, radius),
    onCollisionEnter,
    onCollisionExit
  )
}

export const useRectCollider = (
  manager: CollisionManager,
  x: number,
  y: number,
  width: number,
  height: number,
  onCollisionEnter?: (collision: Collision) => void,
  onCollisionExit?: (collision: Collision) => void
) => {
  return useCollider(
    () => manager.addRectCollider(x, y, width, height),
    onCollisionEnter,
    onCollisionExit
  )
}
