import {
  Composite as MatterComposite,
  IConstraintDefinition as MatterConstraintDefinition,
  Engine as MatterEngine,
  Mouse as MatterMouse,
  MouseConstraint as MatterMouseConstraint,
  Render as MatterRender,
  IRendererOptions as MatterRendererOptions,
  Runner as MatterRunner,
} from 'matter-js'
import { ReactNode, createContext, useContext, useEffect, useRef } from 'react'

const engineContext = createContext<MatterEngine | null>(null)

export interface MatterProviderProps {
  children?: ReactNode
}

export const MatterProvider = ({ children }: MatterProviderProps) => {
  const engine = useRef<MatterEngine | null>(null)

  useEffect(() => {
    engine.current = MatterEngine.create()

    const runner = MatterRunner.create()
    MatterRunner.run(runner, engine.current)

    return () => {
      if (engine.current) {
        MatterEngine.clear(engine.current)
        engine.current = null
      }
    }
  }, [])

  return (
    <>
      {engine.current && (
        <engineContext.Provider value={engine.current}>
          {children}
        </engineContext.Provider>
      )}
    </>
  )
}

export const useEngine = () => {
  const engine = useContext(engineContext)
  if (!engine) {
    throw '"MatterProvider" has not been mounted.'
  }

  return engine
}

export const useRender = (
  element?: HTMLElement,
  renderOptions?: MatterRendererOptions
) => {
  const engine = useEngine()

  useEffect(() => {
    MatterRender.run(
      MatterRender.create({
        element: element,
        engine: engine,
        options: renderOptions,
      })
    )
  }, [])
}

export const useMouseConstraint = (
  element: HTMLElement,
  constraint?: MatterConstraintDefinition
) => {
  const engine = useEngine()

  useEffect(() => {
    MatterComposite.add(
      engine.world,
      MatterMouseConstraint.create(engine, {
        mouse: MatterMouse.create(element),
        constraint: constraint ?? {}, // Matter throws error when constaint is 'undefined'.
      })
    )
  }, [])
}
