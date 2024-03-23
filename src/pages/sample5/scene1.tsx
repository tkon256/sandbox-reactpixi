import { useConst } from '@/hooks'
import { Container, useApp } from '@pixi/react'
import { Rectangle } from './components'
import { MouseConstraint } from './components/matter-js/mouse'
import { Renderer } from './components/matter-js/render'
import { MatterProvider } from './hooks/matter-js'

export const Scene1 = () => {
  const app = useApp()

  const matterRenderTarget = useConst(
    () => document.getElementById('matter-render')!
  )

  const box = (
    <Rectangle
      initialX={app.view.width / 2}
      initialY={0}
      initialWidth={50}
      initialHeight={50}
      tint="blue"
    />
  )

  const walls = (
    <>
      <Rectangle
        initialX={-10}
        initialY={app.view.height / 2}
        initialWidth={20}
        initialHeight={app.view.height * 5}
        bodyOptions={{ isStatic: true }}
      />
      <Rectangle
        initialX={app.view.width + 10}
        initialY={app.view.height / 2}
        initialWidth={20}
        initialHeight={app.view.height * 5}
        bodyOptions={{ isStatic: true }}
      />
    </>
  )

  const ground = (
    <Rectangle
      initialX={app.view.width / 2}
      initialY={app.view.height - 10}
      initialWidth={app.view.width * 2}
      initialHeight={20}
      bodyOptions={{ isStatic: true }}
    />
  )

  return (
    <>
      <Container>
        <MatterProvider>
          {box}
          {walls}
          {ground}
          <Renderer
            element={matterRenderTarget}
            options={{
              width: app.view.width,
              height: app.view.height,
              showAngleIndicator: true,
              showCollisions: true,
              showDebug: false,
              showIds: true,
              showVelocity: true,
              hasBounds: true,
              wireframes: true,
            }}
          />
          <MouseConstraint element={matterRenderTarget} />
          <MouseConstraint element={app.view as unknown as HTMLElement} />
        </MatterProvider>
      </Container>
    </>
  )
}
