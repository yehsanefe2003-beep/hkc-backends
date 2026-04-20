import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold text-gray-900">Kurumsal</div>
          <ul className="mt-3 space-y-2">
            <li><Link to="/bilgi/on-bilgilendirme" className="text-gray-700 hover:text-primary-600 transition-colors">Ön Bilgilendirme Formu</Link></li>
            <li><Link to="/bilgi/kvkk" className="text-gray-700 hover:text-primary-600 transition-colors">KVKK Aydınlatma Metni</Link></li>
            <li><Link to="/bilgi/iptal-iade" className="text-gray-700 hover:text-primary-600 transition-colors">İptal ve İade Koşulları</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">Kategoriler</div>
          <ul className="mt-3 space-y-2">
            <li><a href="/makineler" className="text-gray-700">Makineler</a></li>
            <li><a href="/el-aletleri" className="text-gray-700">El Aletleri</a></li>
            <li><a href="/hirdavat" className="text-gray-700">Hırdavat</a></li>
            <li><a href="/bataryalar" className="text-gray-700">Bataryalar</a></li>
          </ul>
        </div>
        
        <div>
          <div className="font-semibold text-gray-900">İletişim</div>
          <p className="mt-3 text-gray-700">544-876-5907</p>
          <p className="text-gray-700">hkcinsaat42@gmail.com</p> 
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:h-12 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-600 gap-2 sm:gap-0">
          <span>© {new Date().getFullYear()} <a href="https://www.yehsan.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-600">By Yehsqn</a> — Tüm hakları saklıdır.</span>
          <div className="flex gap-4">
            <Link to="/bilgi/kvkk" className="hover:text-primary-600">KVKK</Link>
            <Link to="/bilgi/iptal-iade" className="hover:text-primary-600">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
