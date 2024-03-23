import { IRendererOptions } from 'matter-js'
import { useRender } from '../../hooks/matter-js'

export interface RendererProps {
  element: HTMLElement
  options?: IRendererOptions
}

export const Renderer = ({ element, options }: RendererProps) => {
  useRender(element, options)

  return null
}
