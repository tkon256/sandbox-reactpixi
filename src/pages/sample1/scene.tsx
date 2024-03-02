import { Container, useTick } from '@pixi/react'
import { Assets } from 'pixi.js'
import { useEffect, useState } from 'react'
import { Star } from './star'
import { Textures } from './textures'

export const Scene = () => {
  const [elapsed, setElapsed] = useState(0)
  const [stars, setStars] = useState<string[]>([])
  const [nextSpawnTime, setNextSpawnTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    Assets.load(Textures.STAR).then(() => {
      setIsLoading(false)
    })
  }, [])

  useTick((delta, ticker) => {
    if (isLoading) return

    setElapsed((v) => v + delta / ticker.FPS)

    if (nextSpawnTime <= elapsed) {
      setStars((v) => [...v, crypto.randomUUID()])
      setNextSpawnTime(elapsed + Math.random() * 0.5 + 0.25)
    }
  })

  const handleStarOutOfArea = (id: string) => {
    setStars((v) => v.filter((x) => x !== id))
  }

  return (
    <>
      <Container>
        {stars.map((s) => (
          <Star key={s} id={s} onOutOfArea={handleStarOutOfArea} />
        ))}
      </Container>
    </>
  )
}
