import { useState } from 'react'
import PlaceholderImage from './PlaceholderImage.jsx'

const resolve = (src) => {
  if (!src) return ''
  if (src.startsWith('http')) return src
  return encodeURI(src.startsWith('/') ? src : `/${src}`)
}

export default function ImageOrPlaceholder({ src, alt, color, ratio = '4/3', fit = 'cover', wrapperClass = '', style, hideOnError = false }) {
  const [err, setErr] = useState(false)
  const url = resolve(src)
  if (!url || err) {
    if (hideOnError) return null
    return <PlaceholderImage text={alt} color={color} ratio={ratio} />
  }
  return (
    <div className={`aspect-[${ratio}] bg-gray-100 ${wrapperClass}`} style={style}>
      <img src={url} alt={alt} className={`w-full h-full object-${fit}`} onError={() => setErr(true)} />
    </div>
  )
}
