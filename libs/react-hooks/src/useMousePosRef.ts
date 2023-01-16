import { useLayoutEffect, useRef } from 'react';

type MousePosInfo = {
  x: number,
  y: number,
  xPercent: number,
  yPercent: number
}
export function useMousePosRef(defaultPos: MousePosInfo = {x: 0, y: 0, xPercent: 0, yPercent: 0}) {
  const posRef = useRef<MousePosInfo>(defaultPos)

  useLayoutEffect(() => {
    document.documentElement.addEventListener('mousemove', e => {
      const x = e.clientX
      const y = e.clientY
      const clientWidth = document.documentElement.clientWidth
      const clientHeight = document.documentElement.clientHeight
      const xPercent = x / clientWidth
      const yPercent = y / clientHeight

      posRef.current = {x,y,xPercent,yPercent}
    })
  }, [])
  return posRef
}
