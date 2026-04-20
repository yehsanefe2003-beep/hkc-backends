import { useEffect, useState } from 'react'

export default function RichDescription({ text = '' }) {
  const [expanded, setExpanded] = useState(false)
  const [light, setLight] = useState(false)
  const [lightSrc, setLightSrc] = useState('')

  const resolve = (src) => {
    if (!src) return ''
    if (src.startsWith('http')) return src
    return encodeURI(src.startsWith('/') ? src : `/${src}`)
  }
  const re = /!\[([^\]]*)\]\(([^)]+)\)/g
  const lines = String(text).split('\n')

  // İlk 5 satırı göster, geri kalanı "Devamını Oku" ile aç
  const PREVIEW_LINES = 5
  const hasMore = lines.length > PREVIEW_LINES
  const visibleLines = expanded ? lines : lines.slice(0, PREVIEW_LINES)

  useEffect(() => {
    const onKey = (e) => {
      if (!light) return
      if (e.key === 'Escape') setLight(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [light])

  const renderLine = (line, i) => {
    const parts = []
    let lastIndex = 0
    for (const m of line.matchAll(re)) {
      const [full, alt, src] = m
      const idx = m.index ?? 0
      if (idx > lastIndex) parts.push(line.slice(lastIndex, idx))
      const url = resolve(src)
      parts.push(
        <img
          key={`${i}-${idx}`}
          src={url}
          alt={alt || 'image'}
          className="inline-block align-middle max-w-full rounded border border-gray-200 mx-1 cursor-zoom-in hover:ring-1 hover:ring-primary-200"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          onClick={() => { setLightSrc(url); setLight(true) }}
        />
      )
      lastIndex = idx + full.length
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex))
    return <p key={i} className="leading-relaxed whitespace-pre-line">{parts.length ? parts : line}</p>
  }

  return (
    <div className="mt-6">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Ürün Açıklaması</h2>
      <div className="relative text-sm text-gray-700 space-y-2 bg-gray-50 rounded-xl p-4 border border-gray-100">
        {visibleLines.map((line, i) => renderLine(line, i))}
        {/* Gradient overlay gizleme efekti */}
        {hasMore && !expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent rounded-b-xl pointer-events-none" />
        )}
      </div>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
        >
          {expanded ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Daha az göster
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Devamını Oku
            </>
          )}
        </button>
      )}
      {light && lightSrc && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setLight(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img src={lightSrc} alt="description" className="max-h-[80vh] max-w-[90vw] object-contain" />
            <button type="button" onClick={() => setLight(false)} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 border flex items-center justify-center">×</button>
          </div>
        </div>
      )}
    </div>
  )
}
