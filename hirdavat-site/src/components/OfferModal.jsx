import { useState } from 'react'

export default function OfferModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', message: '' })
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const ok = form.name && form.company && form.phone
    if (!ok) return
    console.log('Teklif', form)
    onClose()
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="px-6 py-4 border-b font-semibold">Teklif Al</div>
        <form onSubmit={submit} className="px-6 py-4 space-y-3">
          <input name="name" value={form.name} onChange={change} placeholder="Ad Soyad" className="w-full border rounded px-3 py-2" />
          <input name="company" value={form.company} onChange={change} placeholder="Firma" className="w-full border rounded px-3 py-2" />
          <input name="phone" value={form.phone} onChange={change} placeholder="Telefon" className="w-full border rounded px-3 py-2" />
          <input name="email" value={form.email} onChange={change} placeholder="E-posta" className="w-full border rounded px-3 py-2" />
          <textarea name="message" value={form.message} onChange={change} placeholder="Mesaj" className="w-full border rounded px-3 py-2 h-24" />
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Kapat</button>
            <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">Gönder</button>
          </div>
        </form>
      </div>
    </div>
  )
}
