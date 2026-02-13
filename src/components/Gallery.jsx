import React, { useEffect, useMemo, useState } from 'react'

export default function Gallery() {
  // base names (user said they are using pic1-3)
  const bases = ['pic1', 'pic2', 'pic3']
  const exts = ['.jpg', '.jpeg', '.png', '.svg']
  const [indices, setIndices] = useState(bases.map(() => 0))
  const [loaded, setLoaded] = useState(bases.map(() => false))
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % bases.length)
    }, 3500)

    return () => clearInterval(id)
  }, [bases.length])

  const slides = useMemo(
    () =>
      bases.map((b, i) => ({
        src: `assets/${b}${exts[indices[i]]}`,
        blur: `assets/${b}-blur.jpg`,
        webp: `assets/${b}.webp`,
        altText: `Memory ${i + 1} together`,
      })),
    [bases, exts, indices],
  )

  function onImgError(i) {
    setIndices((prev) => {
      const next = Math.min(prev[i] + 1, exts.length - 1)
      if (next === prev[i]) return prev
      const copy = [...prev]
      copy[i] = next
      return copy
    })
  }

  function onLoad(i) {
    setLoaded((prev) => {
      const copy = [...prev]
      copy[i] = true
      return copy
    })
  }

  return (
    <section className="gallery">
      <h3 id="gallery-title">Moments Together</h3>
      <div className="carousel" role="region" aria-label="Photo memories carousel">
        <div className="carousel-viewport">
          <div className="carousel-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {slides.map((slide, i) => (
              <div key={i} className="carousel-slide">
                <div className="photo portrait">
                  <picture>
                    <source srcSet={slide.webp} type="image/webp" />
                    <img
                      className="main"
                      src={slide.src}
                      alt={slide.altText}
                      loading="lazy"
                      decoding="async"
                      onError={() => onImgError(i)}
                      onLoad={() => onLoad(i)}
                    />
                  </picture>

                  <img
                    className={`placeholder ${loaded[i] ? 'hidden' : ''}`}
                    src={slide.blur}
                    alt=""
                    aria-hidden="true"
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-controls">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot-btn ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show memory ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}  
