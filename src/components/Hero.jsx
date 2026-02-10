import React, { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Hero({ onOpen, audioRef }) {
  const [playing, setPlaying] = useState(false) 

  const toggleMusic = () => {
    if (!audioRef?.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }

  return (
    <header className="hero">
      <div className="hero-inner">
        <h1 className="title">For My Lovely Wife</h1>
        <p className="subtitle">Every day with you is my favourite day.</p>

        <div className="hero-actions">
          <button className="btn" onClick={onOpen}>Open Love Letter</button>
          <button className="btn ghost" onClick={toggleMusic}>{playing ? 'Pause' : 'Play'} Music</button>
          <ThemeToggle />
        </div>

        <div className="hearts">
          <div className="heart" />
          <div className="heart small" />
          <div className="heart tiny" />
        </div>
      </div>
    </header>
  )
}
