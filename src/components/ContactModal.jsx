import { useEffect, useId, useRef } from 'react'

export default function ContactModal({ open, onClose, contact }) {
  const titleId = useId()
  const titleRef = useRef(null)

  useEffect(() => {
    if (!open) return
    titleRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose?.()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const modalCopy = contact?.modal
  const email = contact?.email
  const linkedin = contact?.linkedin

  function handleEmail() {
    if (!email) return
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`
    window.open(url, "_blank")
    onClose?.()
  }


  function handleLinkedIn() {
    if (!linkedin) return
    window.open(linkedin, '_blank', 'noreferrer')
    onClose?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/70"
        aria-label={modalCopy?.closeLabel}
        onClick={() => onClose?.()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl"
      >
        <h2
          id={titleId}
          ref={titleRef}
          tabIndex={-1}
          className="text-lg font-semibold tracking-tight text-white focus:outline-none"
        >
          {modalCopy?.title}
        </h2>
        {modalCopy?.description ? <p className="mt-2 text-sm text-slate-300">{modalCopy.description}</p> : null}

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            onClick={handleEmail}
            disabled={!email}
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {modalCopy?.emailOptionLabel}
          </button>

          <button
            type="button"
            onClick={handleLinkedIn}
            disabled={!linkedin}
            className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-100 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {modalCopy?.linkedinOptionLabel}
          </button>

          <button
            type="button"
            onClick={() => onClose?.()}
            className="mt-2 text-sm text-slate-300 underline underline-offset-4 hover:text-white"
          >
            {modalCopy?.closeLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
