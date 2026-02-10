# Valentine Website ❤️

A small Vite + React single-page site to surprise your loved one. Includes an animated hero, simple gallery, love letter modal with a typewriter effect and a confetti button.

How to use

1. Install dependencies: `npm install` (or `pnpm install`)
2. Run dev server: `npm run dev`
3. Build: `npm run build`
4. Deploy (GitHub Pages): `npm run deploy` (requires `gh-pages` and a repo)

Add your own media

- Put your photos in `public/assets/` replacing the placeholder images (use names like `pic1.jpg`, `pic2.jpg`, `pic3.jpg`; supported: .jpg, .jpeg, .png, .svg).
- Run `npm run convert-images` to generate optional WebP files (`pic1.webp`) and small blurred placeholders (`pic1-blur.jpg`).
- Add an MP3 named `love-song.mp3` to `public/assets/` or edit the audio `src` in `App.jsx`.

Customize the message by editing `src/components/LoveLetter.jsx`.

Enjoy — and Happy Valentine’s Day! 🎉