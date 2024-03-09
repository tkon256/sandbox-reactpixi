import { CollisionManager } from '@/types/game/collision'
import { useTick } from '@pixi/react'
import { ReactNode, createContext, useContext, useEffect } from 'react'
import { useConst } from '..'

const collisionManagerContext = createContext(new CollisionManager())

export interface CollisionProviderProps {
  children: ReactNode
}

export const CollisionProvider = ({ children }: CollisionProviderProps) => {
  const collisionManager = useConst<CollisionManager>(new CollisionManager([]))

  useTick(() => {
    collisionManager.update()
  })

  return (
    <collisionManagerContext.Provider value={collisionManager}>
      {children}
    </collisionManagerContext.Provider>
  )
}

export const useCollision = () => {
  const collisionManager = useContext(collisionManagerContext)

  if (!collisionManager) throw '"CollisionProvider" has not been mounted.'

  return collisionManager
}

export const useCircleCollider = (x: number, y: number, radius: number) => {
  const manager = useCollision()
  const collider = useConst(() => manager.addCircleCollider(x, y, radius))

  useEffect(() => {
    return () => {
      manager.removeCollider(collider)
    }
  }, [])

  return collider
}

export const useRectCollider = (
  x: number,
  y: number,
  width: number,
  height: number
) => {
  const manager = useCollision()
  const collider = useConst(() => manager.addRectCollider(x, y, width, height))

  useEffect(() => {
    return () => {
      manager.removeCollider(collider)
    }
  }, [])

  return collider
}
