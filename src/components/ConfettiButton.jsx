import React from 'react'
import confetti from 'canvas-confetti'

export default function ConfettiButton({ children }) {
  const fire = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (event) => {
        children.props?.onClick?.(event)
        fire()
      },
    })
  }

  return <>{children}</>
}
