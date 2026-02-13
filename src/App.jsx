import React, { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import Hero from './components/Hero'
import ConfettiButton from './components/ConfettiButton'

const Gallery = lazy(() => import('./components/Gallery'))
const LoveLetter = lazy(() => import('./components/LoveLetter'))

export default function App() {
  const [open, setOpen] = useState(false)
  const [audioError, setAudioError] = useState('')
  const audioRef = useRef(null)

  const toggleLetter = useCallback(() => setOpen((prev) => !prev), [])
  const closeLetter = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => {
      document.getElementById('love-letter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)

    return () => clearTimeout(timer)
  }, [open])

  return (
    <div className="app-root">
      <Hero onOpen={toggleLetter} audioRef={audioRef} />

      <main className="container">
        <section className="message-card">
          <h2>Because you are my whole heart ❤️</h2>
          <p>Happy Valentine’s Day — a little site made just for you.</p>
          <div className="actions">
            <button type="button" className="btn" onClick={toggleLetter}>
              {open ? 'Hide Love Letter' : 'Open Love Letter'}
            </button>
            <ConfettiButton>
              <button type="button" className="btn ghost">Celebrate 🎉</button>
            </ConfettiButton>
          </div>
        </section>

        <Suspense fallback={<p className="hint">Loading memories…</p>}>
          <Gallery />
        </Suspense>

        <Suspense fallback={null}>
          <LoveLetter open={open} onClose={closeLetter} />
        </Suspense>
      </main>

      <audio
        ref={audioRef}
        src="assets/love-song.mp3"
        preload="metadata"
        onError={() => setAudioError('Music could not be loaded on this device.')}
      />

      {audioError ? <p className="hint">{audioError}</p> : null}

      <footer className="footer">Made with love ❤️</footer>
    </div>
  )
}
