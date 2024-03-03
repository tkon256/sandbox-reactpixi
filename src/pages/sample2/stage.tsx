import { Stage as PixiStage, _ReactPixi } from '@pixi/react'
import { ReactNode, useState } from 'react'
import { Pointer, PointerContext, PointerContextBridge } from './contexts'

export interface StageProps extends _ReactPixi.IStage {
  children: ReactNode
}

/** Custom Stage */
export const Stage = ({ children, ...props }: StageProps) => {
  const [pointer, setPointer] = useState<Pointer>({ x: 0, y: 0 })

  /** Handle mouse move */
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvasX = event.clientX - (event.target as HTMLElement).offsetLeft
    const canvasY = event.clientY - (event.target as HTMLElement).offsetTop

    setPointer({
      x: canvasX,
      y: canvasY,
    })
  }

  // Delegate props to PIXI.Stage.
  const render = (children: ReactNode) => {
    return (
      <PixiStage {...props} onMouseMove={handleMouseMove}>
        {children}
      </PixiStage>
    )
  }

  return (
    <>
      <PointerContext.Provider value={pointer}>
        <PointerContextBridge Context={PointerContext} render={render}>
          {children}
        </PointerContextBridge>
      </PointerContext.Provider>
    </>
  )
}
