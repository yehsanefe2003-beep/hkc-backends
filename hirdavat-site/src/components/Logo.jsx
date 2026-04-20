import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Logo() {
  const [err, setErr] = useState(false)
  return (
    <NavLink to="/" className="flex items-center gap-3">
      {!err ? (
        <img src="/images/logo.png" alt="HKC İnşaat" className="h-10 w-auto object-contain" onError={() => setErr(true)} />
      ) : (
        <span className="text-2xl font-bold tracking-wide text-black">HKC İNŞAAT</span>
      )}
    </NavLink>
  )
}
