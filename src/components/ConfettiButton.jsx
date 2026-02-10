import React from 'react'
import confetti from 'canvas-confetti'

export default function ConfettiButton({ children }) {
  const fire = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
  }

  return (
    <span onClick={fire} style={{ display: 'inline-block' }}>{children}</span>
  )
}
