import React, { useState, useRef } from 'react'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import LoveLetter from './components/LoveLetter'
import ConfettiButton from './components/ConfettiButton'

export default function App() {
  const [open, setOpen] = useState(false)
  const audioRef = useRef(null)

  return (
    <div className="app-root">
      <Hero onOpen={() => setOpen(true)} audioRef={audioRef} />

      <main className="container">
        <section className="message-card">
          <h2>Because you are my whole heart ❤️</h2>
          <p>Happy Valentine’s Day — a little site made just for you.</p>
          <div className="actions">
            <button className="btn" onClick={() => setOpen(true)}>Open Love Letter</button>
            <ConfettiButton>
              <button className="btn ghost">Celebrate 🎉</button>
            </ConfettiButton>
          </div>
        </section>

        <Gallery />
      </main>

      <LoveLetter open={open} onClose={() => setOpen(false)} />

      <audio ref={audioRef} src="assets/love-song.mp3" preload="none" />

      <footer className="footer">Made with love ❤️</footer>
    </div>
  )
}
