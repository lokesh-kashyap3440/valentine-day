import React, { useState } from 'react'

export default function Gallery() {
  // base names (user said they are using pic1-3)
  const bases = ['pic1', 'pic2', 'pic3']
  const exts = ['.jpg', '.jpeg', '.png', '.svg']
  const [indices, setIndices] = useState(bases.map(() => 0))
  const [loaded, setLoaded] = useState(bases.map(() => false))

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
      <h3>Moments Together</h3>
      <div className="grid">
        {bases.map((b, i) => {
          const src = `assets/${b}${exts[indices[i]]}`
          const blur = `assets/${b}-blur.jpg`
          const webp = `assets/${b}.webp`
          return (
            <div key={i} className="photo portrait">
              <picture>
                <source srcSet={webp} type="image/webp" />
                <img className="main" src={src} alt={`memory-${i}`} loading="lazy" onError={() => onImgError(i)} onLoad={() => onLoad(i)} />
              </picture>

              <img
                className={`placeholder ${loaded[i] ? 'hidden' : ''}`}
                src={blur}
                alt=""
                aria-hidden="true"
                onError={(e) => (e.target.style.display = 'none')}
              />
            </div>
          )
        })}
      </div>
      <p className="hint">Replace the images in <code>public/assets/</code> with your photos (supported: <code>.jpg</code>, <code>.jpeg</code>, <code>.png</code>, <code>.svg</code>). Run <code>npm run convert-images</code> to generate WebP and blurred placeholders.</p>
    </section>
  )
}  
