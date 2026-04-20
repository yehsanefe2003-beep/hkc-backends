import { useParams } from 'react-router-dom'

const CONTENT = {
  'on-bilgilendirme': {
    title: 'Ön Bilgilendirme Formu',
    text: `
      <h2>1. TARAFLAR</h2>
      <p>İşbu Ön Bilgilendirme Formu ("Form"), [HKC İnşaat ve Yapı Malzemeleri] ("Satıcı") ile sipariş veren müşteri ("Alıcı") arasında düzenlenmiştir.</p>
      
      <h2>2. SÖZLEŞMENİN KONUSU</h2>
      <p>İşbu Form'un konusu, Alıcı'nın Satıcı'ya ait web sitesinden sipariş verdiği ürün ve hizmetlerin satışı ve teslimatı ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri uyarınca bilgilendirilmesidir.</p>
      
      <h2>3. TESLİMAT BİLGİLERİ</h2>
      <p>Ürün, Alıcı'nın sipariş sayfasında belirttiği adrese kargo şirketi aracılığıyla teslim edilecektir. Teslimat masrafları sipariş esnasında aksi belirtilmedikçe Alıcı'ya aittir.</p>

      <h2>4. CAYMA HAKKI</h2>
      <p>Alıcı, ürünü teslim aldığı andan itibaren 14 gün içerisinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkına sahiptir. Cayma hakkı süresi içinde ürünün kullanılmamış olması şarttır.</p>
    `
  },
  'kvkk': {
    title: 'KVKK Aydınlatma Metni',
    text: `
      <h2>1. VERİ SORUMLUSU</h2>
      <p>Kişisel verileriniz, veri sorumlusu sıfatıyla [HKC İnşaat ve Yapı Malzemeleri] tarafından 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında işlenmektedir.</p>

      <h2>2. KİŞİSEL VERİLERİN İŞLENME AMACI</h2>
      <p>Toplanan kişisel verileriniz; sipariş süreçlerinin yürütülmesi, müşteri iletişimi, faturalandırma ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</p>

      <h2>3. AKTARIM</h2>
      <p>Kişisel verileriniz, sadece hukuki zorunluluklar ve teslimatın sağlanması (kargo şirketleri) amaçlarıyla KVKK'ya uygun olarak üçüncü kişilere aktarılabilir.</p>

      <h2>4. İLGİLİ KİŞİNİN HAKLARI</h2>
      <p>KVKK Madde 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, işlenme amacını öğrenme, eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahipsiniz.</p>
    `
  },
  'iptal-iade': {
    title: 'İptal ve İade Koşulları',
    text: `
      <h2>1. SİPARİŞ İPTALİ</h2>
      <p>Siparişiniz kargoya verilmeden önce "Siparişlerim" sayfası üzerinden veya müşteri hizmetleri aracılığıyla iptal talebinde bulunabilirsiniz.</p>

      <h2>2. İADE KOŞULLARI</h2>
      <p>Satın aldığınız ürünleri, kargo teslim tarihinden itibaren 14 (on dört) gün içerisinde ambalajı bozulmamış, kullanılmamış ve tekrar satılabilir halde iade edebilirsiniz.</p>

      <h2>3. İADE SÜRECİ</h2>
      <ul>
        <li>İade etmek istediğiniz ürünü orijinal kutusuyla paketleyin.</li>
        <li>Bize ulaşarak iade kargo kodu alın.</li>
        <li>Ürünü anlaşmalı kargo şubemize teslim edin.</li>
      </ul>

      <h2>4. İADE KAPSAMI DIŞINDAKİ ÜRÜNLER</h2>
      <p>Tek kullanımlık ürünler, hızlı bozulan veya son kullanma tarihi geçme ihtimali olan ürünler, kullanıldıktan sonra sağlık veya hijyen açısından iadeye uygun olmayan (koruyucu ekipman vb.) iade alınamaz.</p>
    `
  }
}

export default function Legal() {
  const { pageId } = useParams()
  const content = CONTENT[pageId]

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Sayfa Bulunamadı</h1>
        <p className="text-gray-500">Aradığınız bilgilendirme sayfası mevcut değil.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="bg-white border rounded-2xl p-6 md:p-12 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 pb-4 border-b">
          {content.title}
        </h1>
        <div
          className="prose max-w-none text-gray-700 space-y-6 prose-headings:text-gray-900 prose-headings:font-bold prose-headings:text-lg prose-p:text-sm prose-li:text-sm"
          dangerouslySetInnerHTML={{ __html: content.text }}
        />
      </div>
    </div>
  )
}
