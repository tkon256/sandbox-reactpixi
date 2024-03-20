import { useApp } from '@pixi/react'
import { useEffect, useState } from 'react'

interface Pointer {
  x: number
  y: number
}

export const usePointer = () => {
  const app = useApp()
  const [pointer, setPointer] = useState({} as Pointer)

  const handleMouseMove = (event: MouseEvent) => {
    if (!app.view.getBoundingClientRect) return

    const canvasRect = app.view.getBoundingClientRect()
    const canvasX = event.clientX - canvasRect.x
    const canvasY = event.clientY - canvasRect.y

    setPointer({
      x: canvasX,
      y: canvasY,
    })
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return pointer
}
