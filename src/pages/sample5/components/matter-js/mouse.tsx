import { IConstraintDefinition } from 'matter-js'
import { useMouseConstraint } from '../../hooks/matter-js'

export interface MouseConstraintProps {
  element: HTMLElement
  constraint?: IConstraintDefinition
}

export const MouseConstraint = ({
  element,
  constraint,
}: MouseConstraintProps) => {
  useMouseConstraint(element, constraint)

  return null
}
