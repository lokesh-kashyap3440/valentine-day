import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import TypeWriter from './TypeWriter'

export default function LoveLetter({ open, onClose }) {
  const closeBtnRef = useRef(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const fallbackMessage = `My love,\n\nYou make my life brighter every day. I cherish your laugh, your kindness, and the warmth of your hand in mine. Thank you for being you — my partner, my best friend, and my heart.\n\nForever yours,\n❤️`

  useEffect(() => {
    if (!open) return

    let ignore = false

    const fetchFromSources = async () => {
      const ts = Date.now()
      const sources = [
        {
          url: `https://api.quotable.io/random?tags=love&maxLength=140&_=${ts}`,
          parse: (data) => ({
            content: data?.content,
            author: data?.author,
          }),
        },
        {
          url: `https://zenquotes.io/api/random?_=${ts}`,
          parse: (data) => ({
            content: data?.[0]?.q,
            author: data?.[0]?.a,
          }),
        },
        {
          url: `https://dummyjson.com/quotes/random?_=${ts}`,
          parse: (data) => ({
            content: data?.quote,
            author: data?.author,
          }),
        },
      ]

      for (const source of sources) {
        try {
          const res = await fetch(source.url, { cache: 'no-store' })
          if (!res.ok) continue
          const raw = await res.json()
          const parsed = source.parse(raw)
          if (parsed?.content) return parsed
        } catch {
          // try next source
        }
      }

      return null
    }

    const fetchLoveMessage = async () => {
      setLoading(true)
      try {
        const data = await fetchFromSources()
        if (!data?.content) throw new Error('Failed to load love quote')
        if (!ignore) {
          const dynamicMessage = `My love,\n\n${data.content}\n\n— ${data.author || 'Someone who believes in love'}\n\nForever yours,\n❤️`
          setMessage(dynamicMessage)
        }
      } catch {
        if (!ignore) setMessage(fallbackMessage)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchLoveMessage()

    return () => {
      ignore = true
    }
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    closeBtnRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <section id="love-letter" className="letter-card" aria-labelledby="love-letter-title">
      <div className="letter-head">
        <h3 id="love-letter-title" className="modal-title">A Love Letter</h3>
        <button
          ref={closeBtnRef}
          type="button"
          className="close"
          onClick={onClose}
          aria-label="Close love letter"
        >
          ✕
        </button>
      </div>
      <div className="letter-body">
        {loading ? <p className="hint">Fetching a love note…</p> : <TypeWriter text={message || fallbackMessage} speed={25} />}
      </div>
    </section>
  )
}
