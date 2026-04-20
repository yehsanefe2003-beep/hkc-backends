export default function PlaceholderImage({ text = '', color = '#e5e7eb', ratio = '4/3', className = '' }) {
  const initial = (text || '').trim().charAt(0).toUpperCase()
  return (
    <div className={`aspect-[${ratio}] rounded ${className}`} style={{ backgroundColor: color }}>
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white/90 text-3xl font-bold drop-shadow">{initial}</span>
      </div>
    </div>
  )
}
