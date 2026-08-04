"use client"

type Listener = (x: number, y: number) => void

const target = { x: 0, y: 0 }
const current = { x: 0, y: 0 }
const LERP = 0.35
let subscribers: Listener[] = []
let rafId = 0
let moveHandler: ((e: PointerEvent) => void) | null = null

function tick() {
  current.x += (target.x - current.x) * LERP
  current.y += (target.y - current.y) * LERP
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i](current.x, current.y)
  }
  rafId = requestAnimationFrame(tick)
}

/**
 * Subscribe to a single unified rAF loop that polls the pointer position
 * with lerp 0.35 smoothing. The callback receives the smoothed (current.x, current.y)
 * pixel coordinates every frame.
 *
 * Returns an unsubscribe function. The pointermove listener and rAF loop are
 * lazily started on first subscriber and torn down when the last subscriber leaves.
 */
export function subscribePointer(fn: Listener): () => void {
  subscribers.push(fn)
  if (subscribers.length === 1) {
    moveHandler = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }
    document.addEventListener("pointermove", moveHandler, { passive: true })
    rafId = requestAnimationFrame(tick)
  }
  return () => {
    subscribers = subscribers.filter((s) => s !== fn)
    if (subscribers.length === 0 && rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
      if (moveHandler) {
        document.removeEventListener("pointermove", moveHandler)
        moveHandler = null
      }
    }
  }
}
