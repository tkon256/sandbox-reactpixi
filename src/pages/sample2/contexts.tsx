import { ContextBridge, ContextBridgeProps } from '@/components/context-bridge'
import { createContext } from 'react'

export interface Pointer {
  x: number
  y: number
}

export const PointerContext = createContext<Pointer>({ x: 0, y: 0 })

export const PointerContextBridge = ({
  ...props
}: ContextBridgeProps<Pointer>) => {
  return (
    <>
      <ContextBridge<Pointer> {...props} />
    </>
  )
}
