import '@pixi/events'
import { AnimatedSprite, Container, Sprite, useApp } from '@pixi/react'
import { Assets, Texture } from 'pixi.js'
import { useEffect, useState } from 'react'

const TEXTURE_SCALE = 4
const ANIMATION_SPEED = 0.5

export const Scene1 = () => {
  const app = useApp()
  const [texture, setTexture] = useState<Texture>()
  const [textures, setTextures] = useState<Texture[]>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadAssets()
  }, [])

  const loadAssets = async () => {
    const spritesheet = await Assets.load('/assets/images/Sprite-0001.json')
    const textures = Object.keys(spritesheet.textures).map(
      (k) => spritesheet.textures[k]
    )
    setTexture(Texture.from(spritesheet.baseTexture))
    setTextures(textures)
    setIsLoading(true)
  }

  return (
    <Container>
      {isLoading && (
        <>
          <Sprite
            x={(app.view.width - texture!.width * TEXTURE_SCALE) / 2}
            y={(app.view.height - texture!.height * TEXTURE_SCALE) / 2 - 64}
            scale={TEXTURE_SCALE}
            texture={texture}
          />
          <AnimatedSprite
            x={(app.view.width - textures![0].width * TEXTURE_SCALE) / 2}
            y={(app.view.height - textures![0].height * TEXTURE_SCALE) / 2 + 64}
            scale={TEXTURE_SCALE}
            textures={textures}
            animationSpeed={ANIMATION_SPEED}
            isPlaying={true}
          />
        </>
      )}
    </Container>
  )
}
