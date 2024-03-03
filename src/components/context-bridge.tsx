import { ReactNode } from 'react'

export interface ContextBridgeProps<T> {
  children: ReactNode
  Context: React.Context<T>
  render: (children: ReactNode) => ReactNode
}

export const ContextBridge = <T,>({
  children,
  Context,
  render,
}: ContextBridgeProps<T>) => {
  return (
    <>
      <Context.Consumer>
        {(value: T) =>
          render(<Context.Provider value={value}>{children}</Context.Provider>)
        }
      </Context.Consumer>
    </>
  )
}
