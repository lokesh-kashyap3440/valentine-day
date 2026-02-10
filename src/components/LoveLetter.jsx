import React from 'react'
import TypeWriter from './TypeWriter'

export default function LoveLetter({ open, onClose }) {
  if (!open) return null

  const message = `My love,\n\nYou make my life brighter every day. I cherish your laugh, your kindness, and the warmth of your hand in mine. Thank you for being you — my partner, my best friend, and my heart.\n\nForever yours,\n❤️`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close">✕</button>
        <h3 className="modal-title">A Love Letter</h3>
        <div className="modal-body">
          <TypeWriter text={message} speed={25} />
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
