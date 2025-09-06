import * as React from 'react'

export type Edge = 'top' | 'bottom' | 'left' | 'right'

/**
 * Determine the closest edge of the target element where the mouse event happened.
 *
 * @param {React.MouseEvent} mouseEvent
 * @returns {Edge}
 */
export function getClosestEdge (mouseEvent: React.MouseEvent): Edge {
  const target = (mouseEvent.target as HTMLElement)
  if (!target) {
    throw Error('No target for mouse event.')
  }

  const x: number = mouseEvent.nativeEvent.offsetX
  const y: number = mouseEvent.nativeEvent.offsetY
  const w: number = target.offsetWidth
  const h: number = target.offsetHeight

  const distTop = y
  const distBottom = h - y
  const distLeft = x
  const distRight = w - x

  const minDist = Math.min(distTop, distBottom, distLeft, distRight)

  switch (minDist) {
    case distTop:
      return 'top'
    case distBottom:
      return 'bottom'
    case distLeft:
      return 'left'
    case distRight:
      return 'right'
    default:
      throw Error('Failed to determine closest edge.')
  }
}
