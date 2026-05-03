import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/60 backdrop-blur-xl mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">Kurumsal</div>
          <ul className="space-y-3">
            <li><Link to="/bilgi/hakkimizda" className="text-gray-600 hover:text-primary-600 transition-colors">Hakkımızda</Link></li>
            <li><Link to="/bilgi/kvkk" className="text-gray-600 hover:text-primary-600 transition-colors">KVKK Aydınlatma Metni</Link></li>
            <li><Link to="/bilgi/gizlilik-sozlesmesi" className="text-gray-600 hover:text-primary-600 transition-colors">Gizlilik Sözleşmesi</Link></li>
            <li><Link to="/bilgi/mesafeli-satis-sozlesmesi" className="text-gray-600 hover:text-primary-600 transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
            <li><Link to="/bilgi/on-bilgilendirme" className="text-gray-600 hover:text-primary-600 transition-colors">Ön Bilgilendirme Formu</Link></li>
            <li><Link to="/bilgi/teslimat-iade" className="text-gray-600 hover:text-primary-600 transition-colors">Teslimat ve İade Şartları</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">Kategoriler</div>
          <ul className="space-y-3">
            <li><a href="/makineler" className="text-gray-600 hover:text-primary-600 transition-colors">Makineler</a></li>
            <li><a href="/el-aletleri" className="text-gray-600 hover:text-primary-600 transition-colors">El Aletleri</a></li>
            <li><a href="/hirdavat" className="text-gray-600 hover:text-primary-600 transition-colors">Hırdavat</a></li>
            <li><a href="/bataryalar" className="text-gray-600 hover:text-primary-600 transition-colors">Bataryalar</a></li>
          </ul>
        </div>
        
        <div>
          <div className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">İletişim</div>
          <ul className="space-y-3 text-gray-600">
            <li><a href="tel:05448765907" className="hover:text-primary-600 transition-colors font-medium">0544 876 59 07</a></li>
            <li><a href="mailto:hkcinsaat42@gmail.com" className="hover:text-primary-600 transition-colors font-medium">hkcinsaat42@gmail.com</a></li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-gray-900 mb-4 tracking-wide uppercase text-xs">Güvenli Alışveriş</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-green-700 bg-green-50 px-4 py-3 rounded-xl border border-green-200 shadow-sm">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[11px] leading-tight font-medium">256-Bit SSL Sertifikası ile %100 Güvenli Alışveriş</span>
            </div>
            <div className="bg-white p-2 border border-gray-100 rounded-xl inline-block shadow-sm">
              <img src="/iyzico_logo.svg" alt="iyzico ile Öde - Visa & MasterCard" className="w-full max-w-[180px] opacity-90 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <span>© {new Date().getFullYear()} <a href="https://www.yehsan.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-700 hover:text-primary-600 transition-colors">By Yehsqn</a> — Tüm hakları saklıdır.</span>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/bilgi/gizlilik-sozlesmesi" className="hover:text-primary-600 transition-colors">Gizlilik Sözleşmesi</Link>
            <Link to="/bilgi/mesafeli-satis-sozlesmesi" className="hover:text-primary-600 transition-colors">Mesafeli Satış</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
