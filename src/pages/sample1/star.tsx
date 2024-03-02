import { useConst } from '@/hooks'
import { Sprite, useApp, useTick } from '@pixi/react'
import { SCALE_MODES, Texture } from 'pixi.js'
import { useState } from 'react'
import { Textures } from './textures'

export interface StarProps {
  id: string
  onOutOfArea: (id: string) => void
}

export const Star = ({ id, onOutOfArea }: StarProps) => {
  const app = useApp()
  const texture = useConst(
    Texture.from(Textures.STAR, {
      scaleMode: SCALE_MODES.NEAREST,
    })
  )
  const [x, setX] = useState(() => Math.random() * app.view.width)
  const [y, setY] = useState(0)
  const velocityX = useConst(
    (Math.random() + 0.5) * Math.sign(Math.random() - 0.5)
  )
  const velocityY = useConst(1)

  useTick((delta) => {
    setX((v) => v + velocityX * delta)
    setY((v) => v + velocityY * delta)

    // Check out of area.
    if (
      x + texture.width < -50 ||
      app.view.width + 50 <= x ||
      app.view.height + 50 <= y
    ) {
      onOutOfArea(id)
    }
  })

  return (
    <>
      <Sprite x={x} y={y} scale={4} texture={texture} />
    </>
  )
}
