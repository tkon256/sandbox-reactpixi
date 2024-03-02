import { useRef } from 'react'

export const useConst = <T>(value: T | (() => T)) => {
  const ref = useRef<{ value: T }>()
  if (ref.current === undefined) {
    ref.current = {
      value: typeof value === 'function' ? (value as Function)() : value,
    }
  }
  return ref.current.value
}
