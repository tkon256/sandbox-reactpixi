import '@pixi/events'
import { Container, useApp } from '@pixi/react'
import { Rectangle } from 'pixi.js'
import { useContext } from 'react'
import { Box } from './box'
import { PointerContext } from './contexts'

export const Scene = () => {
  const app = useApp()
  const pointer = useContext(PointerContext)

  const RedBox = () => (
    <Box
      bounds={new Rectangle(pointer.x - 32, pointer.y - 32, 64, 64)}
      tint={'#f44336'}
    />
  )

  const BlueBox = () => (
    <Box
      bounds={
        new Rectangle(
          (2 * app.view.width) / 3 - 32,
          app.view.height / 2 - 32,
          64,
          64
        )
      }
      tint={'#3f51b5'}
    />
  )

  return (
    <>
      <Container>
        <RedBox />
        <BlueBox />
      </Container>
    </>
  )
}
