import React, { useEffect, useState } from 'react'

export default function TypeWriter({ text = '', speed = 40 }) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let i = 0
    setDisplay('')
    const id = setInterval(() => {
      setDisplay((d) => d + text[i])
      i++
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <pre className="typewriter">{display}</pre>
  )
}
