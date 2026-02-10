/*
  Simple image conversion script using sharp.
  - Generates WebP versions next to originals (e.g., pic1.webp)
  - Creates a blurred small JPEG placeholder (e.g., pic1-blur.jpg)

  Usage:
    npm run convert-images
*/

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const assetsDir = path.join(__dirname, '..', 'public', 'assets')
const bases = ['pic1', 'pic2', 'pic3']
const exts = ['.jpg', '.jpeg', '.png', '.svg']

async function findSource(base) {
  for (const e of exts) {
    const p = path.join(assetsDir, base + e)
    if (fs.existsSync(p)) return p
  }
  return null
}

async function convert() {
  await Promise.all(
    bases.map(async (base) => {
      const src = await findSource(base)
      if (!src) {
        console.warn(`Skipping ${base}: no source found in ${exts.join(', ')}`)
        return
      }

      const webpOut = path.join(assetsDir, `${base}.webp`)
      const blurOut = path.join(assetsDir, `${base}-blur.jpg`)

      try {
        // auto-rotate based on EXIF so orientation is preserved
        await sharp(src).rotate().webp({ quality: 80 }).toFile(webpOut)
        console.log(`Created ${path.basename(webpOut)}`)
      } catch (err) {
        console.error(`WebP conversion failed for ${src}:`, err.message)
      }

      try {
        // small blurred JPEG placeholder (also auto-rotated)
        await sharp(src).rotate().resize({ width: 40 }).blur(2).jpeg({ quality: 40 }).toFile(blurOut)
        console.log(`Created ${path.basename(blurOut)}`)
      } catch (err) {
        console.error(`Placeholder creation failed for ${src}:`, err.message)
      }
    })
  )
}

convert().catch((err) => {
  console.error('Image conversion script failed:', err)
  process.exit(1)
})