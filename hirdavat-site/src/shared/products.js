const products = [
  {
    id: 'm1',
    category: 'makineler',
    name: 'Haispro RB-DB2108W Darbeli Vidalama-Somun Sökme 320NM 21 V 4.0 Ah',
    brand: 'HAIS',
    color: '#1d4ed8',
    image: 'images/2108-1.jpg',
    images: ['images/2108-1.jpg', 'images/2108-2.jpg','images/koşulsuz.jpg'],
   featured:true,
    stock: 12,
    description: `1 YIL KOŞULSUZ GARANTİ

Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.

TEKNİK ÖZELLİKLER
Batarya sayısı: 2 adet
Güç Kapasite: 21V / 4Ah / Li-Ion
Maksimum Tork: 320 Nm
Yüksüz Hız: 1200/1900/2500/3200 rpm
Boyut: 110*235 mm
Net Ağırlık: 1 Kg + 0,70 Kg
Kafa: 1/4" Altıgen Bits uç / 1/2" KAre

Ürün Açıklaması:
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )
ÇİFT ÇEKİÇLİ YÜKSEK PERFORMANS
SORUNSUZ GEÇİŞ
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ
VERİMLİ DİŞLİ OPERASYONU
ÜÇ DİŞLİ TORK AYARLAYICI
PLASTİK ÇANTA HEDİYELİ`,
  
  },
  {
    id: 'm2',
    category: 'makineler',
    name: 'Haispro JM-125A Profesyonel Akülü Taşlama Makinası 21 V 4.0 Ah',
    subcategory: 'taşlama',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/125a-1.jpg',
    images: ['images/125a-1.jpg', 'images/125a-2.jpg','images/koşulsuz.jpg',],  
    featured: true,
  
    description: `1 YIL KOŞULSUZ GARANTİ

Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.

TEKNİK ÖZELLİKLER
Güç Kapasite
21V / 4Ah / Li-Ion
Disk Boyutu: 125 mm
Yüksüz Hız: 3500/5000/6500/8000/9000/10000 rpm
Vites Sayısı: 6
Net Ağırlık: 1,8 Kg + 0,73 Kg
Motor Gücü: 1000 W

Ürün Açıklaması:
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )
6 KADEMELİ DEVİR AYARI
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ
PLASTİK ÇANTA HEDİYELİ`,
  
  },
  {
    id: 'm3',
    category: 'makineler',
    subcategory: 'matkap',
    name: 'Haispro RB-BH26 Profesyonel Akülü Kırıcı-Delici Matkabı 21 V 4.0 Ah',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/kırıcı1.jpg',
   featured:true,
    images: ['images/kırıcı1.jpg', 'images/kırıcı.jpg','images/koşulsuz.jpg',],  
   
    description: `1 YIL KOŞULSUZ GARANTİ

Satın almış olduğunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldığınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibarıyla 1 YIL süre ile Koşulsuz Garanti kapsamındadır.

TEKNİK ÖZELLİKLER
Güç Kapasite: 21V / 4Ah / Li-Ion
Darbe Gücü: 3.2 J
Yüksüz Hız: 1600 rpm
Çelik/Beton/Ahşap: 13/24/30 mm
Net Ağırlık: 2,45 Kg + 0,73 Kg
Model: RB-BH26

Ürün Açıklaması:
KÖMÜRSÜZ MOTOR (BRUSHLESS MOTOR)
6 KADEMELİ DEVİR AYARI
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ
PLASTİK ÇANTA HEDİYELİ`,
  
  },
    {
    id: 'm4',
    category: 'makineler',
    name: 'Hais LT891G 225 Bar İndiksiyon Motorlu Yıkama Makinesi',
  subcategory:'yıkama makineleri',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/225bar.jpg',
    images: ['images/225bar.jpg', ],    
   featured:true,
    description: `1 YIL KOŞULSUZ GARANTİ

Gerilim
220 V
Hortum Ölçüsü
8 m
Güç
3100W
Debi
11 lt/dk
Ağırlık
23,1 kg
Basınç
Maks. 225 bar
Motor
İndüksiyon Motor
Otomatik Stop Sistemi
Mevcut
Sıcaklık
40 Derece
Ebat
68x54x57,5
Ürün Açıklaması:	
3 Eksenli pistonlu pompa
Otomatik durdurma sistemi
Hızlı bağlantı aksesuarları
Tekerlekler ve alüminyum teleskopik tutma koluyla kolay taşınabilir tasarım
Paslanmaz çelik piston
Metal pompa		
Kovadan su çekebilme özelliği`,
  
  },
      {
    id: 'm5',
    category: 'makineler',
    name: 'Haispro RB-DB2109 Profesyonel Darbeli Vidalama Matkap 21 V 4.0 Ah Çift Akülü',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/2109.jpg',
    subcategory: 'matkap',
    images: ['images/2109.jpg', 'images/2109t.jpg','images/koşulsuz.jpg',],  
    
    description: `1 YIL KOŞULSUZ GARANTİ



Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili     servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.
TEKNİK ÖZELLİKLER	
Güç Kapasite
21V / 2Ah / Li-Ion
Maksimum Tork	150 Nm	
Çelik / Ahşap / Beton	13 / 40 / 13 mm	
Boşta Devir	0-550 / 2200 rpm	
Net Ağırlık	
2 Kg + 0,73 Kg
Mandren
13mm
Ürün Açıklaması:	
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )	
ÇİFT ÇEKİÇLİ PERFORMANS	
SORUNSUZ GEÇİŞ 	
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ	
3 DİŞLİ TORK AYARLAYICI	
PASLANMAZ ÇELİK MANDREN	
PLASTİK ÇANTA HEDİYELİ`,
  
  },
   {
    id: 'm6',
    category: 'makineler',
    subcategory: 'matkap',
    name: 'Haispro RB-DB2102 Profesyonel Darbeli Vidalama Matkap 21 V 2.0 Ah Çift Akülü',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/2102-2.jpg',
   
    images: ['images/2102-2.jpg', 'images/2102.jpg','images/koşulsuz.jpg','images/koşulsuz.jpg',],  
  
    description: `1 YIL KOŞULSUZ GARANTİ



Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili     servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.
TEKNİK ÖZELLİKLER	
Güç Kapasite
21V / 2Ah / Li-Ion
Maksimum Tork	50 Nm	
Çelik / Ahşap / Beton	12 / 24 / 10 mm	
Boşta Devir	0-500 / 1600 rpm	
Net Ağırlık	
1 Kg + 0,45 Kg
Mandren
1/2 inç, 10mm
Ürün Açıklaması:	
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )	
YÜKSEK PERFORMANS	
SORUNSUZ GEÇİŞ 	
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ	
VERİMLİ DİŞLİ OPERASYONU	
PASLANMAZ ÇELİK MANDREN	
PLASTİK ÇANTA HEDİYELİ`,
  
  }, {
    id: 'm7',
    category: 'makineler',
    subcategory: 'matkap',
    name: 'Haispro RB-818 Profesyonel Darbeli Somun Sıkma 1300 Nm 21 V 4.0 Ah',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/rbdb16.jpg',
   featured: true,
    images: ['images/rbdb16.jpg', 'images/rbdb162.jpg','images/koşulsuz.jpg','images/koşulsuz.jpg',],  

    description: `1 YIL KOŞULSUZ GARANTİ

Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili     servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.
TEKNİK ÖZELLİKLER	
Güç Kapasite
16V / 2.0 Ah / Li-Ion
Maksimum Tork	40 Nm	
Çelik / Ahşap / Beton	10 / 20 / 8 mm	
Boşta Devir	0-500 / 1600 rpm	
Net Ağırlık	
0,77 Kg + 0,24 Kg
Mandren
1/2 inç, 10mm
Ürün Açıklaması:	
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )	
YÜKSEK PERFORMANS	
SORUNSUZ GEÇİŞ 	
UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ	
VERİMLİ DİŞLİ OPERASYONU	
PASLANMAZ ÇELİK MANDREN	
BEZ ÇANTA HEDİYELİ`,
  
  }, {
    id: 'm8',
    category: 'makineler',
    name: 'Kuletaş 50 lt 2 Hp Hava Kompresör',
    brand: 'KULETAŞ',
    color: '#0ea5e9',
    image: 'images/kuletas50.jpg',
   subcategory:'kompresör',
    images: ['images/kuletas50.jpg'],  
   featured:true,
    description: `NOT: KULLANMADAN ÖNCE YAĞ SEVİYESİNİ KONTROL EDİNİZ, TAŞIMA YAĞ TIPASINI TURUNCU DELİKLİ TIPAYLA DEĞİŞTİRİNİZ.

TEKNİK ÖZELLİKLER	
Depo Hacmi
50 Lt
Güç
2 Hp
Hava Girişi
200 Lt/dk - m³/saat
Basınç
8 bar - 116 psi
Voltaj	220 V/50 Hz
Motor Devri	2800 D/Dk
Ebat
64x28x63 cm
Net Ağırlık
38 kg
Ürün Açıklaması:
Uzun ömürlü kullanım sağlanabilmektedir.	
Motorla çalışan bir makine çeşidi olan kompresörler, atmosferden elde edilen havayı sıkıştırma işlemi ile basıncının artmasına sebep olmaktadır.
Kullanışlı yapıları ile kullanıcılar için oldukça yüksek performans sunmaktadırlar.
Yağlı model ve direk akupledir. 	
Kolay bağlantı jakı mevcuttur.	
Tek Kafa Emiş Yapabilmektedir.	

 kuletaş kompresör, kuletaş 50 litre kompresör`,
  
  }, {
    id: 'm9',
    category: 'makineler',
    name: 'Cora 50 lt Hava Kompresörü ',
    brand: 'CORA',
    color: '#0ea5e9',
    image: 'images/cora50.jpg',
   subcategory:'kompresör',
    images: ['images/cora50.jpg'],  
featured:true,
    description: `Ürün Özellikleri:

9 kW / 2

5 Hp Hava Girişi:185 Lt/dk

m³/saat Basınç:8 bar

116 psi Ebat:64x28x63 cm Net Ağırlık:30 kg Güç:2

5 Hp Depo Hacmi:50 Lt
`,
  
  }, {
    id: 'm10',
    category: 'makineler',
    name: 'MYTOL 50 LT HAVA KOMPRESÖRÜ',
    subcategory:'kompresör',
    brand: 'MYTOL',
    color: '#0ea5e9',
    image: 'images/mytol50.jpg',
   
    images: ['images/mytol50.jpg'],  
    
    description: `Kapasite
50 L
Garanti Süresi
2 Yıl
Güç (Watt)
1001 - 1500 Watt
Hava Debisi
150-200
Motor Gücü (hp)
1,5-2
Menşei
CN
Tamir Edilebilirlik
Yetkili Servis ile Tamiri Gerekir.
Bakım Talimatları (Genel)
Nemli bir bezle silin.`,
  
  }, {
    id: 'm11',
    category: 'makineler',
    name: 'Haispro RB-818 Profesyonel Darbeli Somun Sıkma 1300 Nm 21 V 4.0 Ah',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/i2.jpg',
   
    images: ['images/i2.jpg', 'images/1300n.jpg','images/koşulsuz.jpg','images/koşulsuz.jpg',],  
  
    description: `1 YIL KOŞULSUZ GARANTİ

S1 YIL KOŞULSUZ GARANTİ

Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili     servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.
TEKNİK ÖZELLİKLER	
Güç Kapasite
21V / 4Ah / Li-Ion
Maksimum Tork	1300 Nm	
Yüksüz Hız	1800/2000/2200 rpm	
Ölçü	1/2" 	
Net Ağırlık	
2,8 Kg + 0,73 Kg
Ürün Açıklaması:	
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )	
ÇİFT ÇEKİÇLİ YÜKSEK PERFORMANS	
SORUNSUZ GEÇİŞ 	
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ	
VERİMLİ DİŞLİ OPERASYONU	
ÜÇ DİŞLİ TORK AYARLAYICI	
PLASTİK ÇANTA HEDİYELİ`,
  
  }, {
    id: 'm12',
    category: 'makineler',
    name: 'Haispro RB-809 Profesyonel Darbeli Somun Sıkma 850 Nm 21 V 4.0 Ah',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/i2.jpg',
   
    images: ['images/i2.jpg', 'images/1300n.jpg','images/koşulsuz.jpg','images/koşulsuz.jpg',],  
    
    description: `1 YIL KOŞULSUZ GARANTİ

Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili     servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.
TEKNİK ÖZELLİKLER	
Güç Kapasite
21V / 4Ah / Li-Ion
Maksimum Tork	850 Nm	
Yüksüz Hız	2200/2700/3200 rpm	
Ölçü	1/2" 	
Net Ağırlık	
1,5 Kg + 0,73 Kg
Ürün Açıklaması:	
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )	
ÇİFT ÇEKİÇLİ YÜKSEK PERFORMANS	
SORUNSUZ GEÇİŞ 	
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ	
VERİMLİ DİŞLİ OPERASYONU	
ÜÇ DİŞLİ TORK AYARLAYICI	
PLASTİK ÇANTA HEDİYELİ`,
  
  }, {
    id: 'm13',
    category: 'makineler',
    name: 'Haispro RB-810 Profesyonel Darbeli Somun Sıkma 1100 Nm 21 V 4.0 Ah',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/i2.jpg',
   
    images: ['images/i2.jpg', 'images/1100.jpg','images/koşulsuz.jpg',],  
   
    description: `1 YIL KOŞULSUZ GARANTİ


Satın almış oldugunuz HAIS PRO markalı ürünlerin 1 YIL süresince herhangi bir arıza yapması durumunda, Türkiye genelindeki tüm yetkili     servislerimiz tarafından ücretsiz olarak tamir edilmesi anlamına gelmektedir. Tamir esnasındaki tüm işçilik hizmetleri de ücretsizdir. Satın aldıgınız HAISPRO markalı Akülü El Aletleri sisteme kayıt edildikten sonra fatura tarihi itibariyle 1 YIL süre ile Koşulsuz Garanti kapsamındadır.
TEKNİK ÖZELLİKLER	
Güç Kapasite
21V / 4Ah / Li-Ion
Maksimum Tork	1100 Nm	
Yüksüz Hız	1800/2200/2800 rpm	
Ölçü	1/2" 	
Net Ağırlık	
2,1 Kg + 0,73 Kg
Ürün Açıklaması:	
KÖMÜRSÜZ MOTOR ( BRUSHLESS MOTOR )	
ÇİFT ÇEKİÇLİ YÜKSEK PERFORMANS	
SORUNSUZ GEÇİŞ 	
15C UZUN ÖMÜRLÜ / GÜÇLÜ AKÜ	
VERİMLİ DİŞLİ OPERASYONU	
ÜÇ DİŞLİ TORK AYARLAYICI	
PLASTİK ÇANTA HEDİYELİ`,
  
  },
   {
    id: 'm14',
    category: 'makineler',
    name: "HaisPro Akülü Set - 3’lü Profesyonel Akülü Set + 2X4 Ah Çift Akü - RB-01",
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/rbset1.jpg',
   subcategory:'matkap',
    images: ['images/rbset.jpg', 'images/rbset1.jpg','images/koşulsuz.jpg',],  

    description: `HAISPRO Profesyonel 21 V Akülü El Aletleri Seti - 3'LÜ SET - 1
Profesyoneller İçin Güç, Dayanıklılık ve Performans 

HAISPRO Profesyonel 21V Akülü El Aletleri 3’lü Set, hem profesyonel ustalar hem de ev kullanıcıları için tasarlanmış yüksek performanslı bir settir. Kömürsüz motor teknolojisi sayesinde uzun ömür, güçlü tork ve enerji verimliliği sağlar.

Tek çantada üç güçlü cihaz: darbeli matkap, kırıcı delici matkap ve avuç taşlama (spiral) ile her işte maksimum performans sunar.

Teknik Özellikler :

HAISPRO Profesyonel Darbeli Vidalama Matkap 21 V

Model Kodu : RB-DB2102
Voltaj: 21V DC
Yüksüz Hız: 0–500 / 1600 rpm
Maksimum Tork: 50 Nm
Mandren :10 mm
Kullanım Alanı: Çelik, ahşap, beton delme : 12 / 24 / 10 mm
Motor: Kömürsüz (Brushless)
Makine Ağırlık + akü : 1 kg + 0.45 kg

HAISPRO Profesyonel Darbeli Kırıcı Delici Matkap RB-BH26

Model : RB-BH26Voltaj: 21V DC
Yüksüz Hız: 1600 rpm
Darbe Gücü: 3.2 J
Kullanım Alanı: Beton, çelik, ahşap : 24 / 13 / 30 mm
Makine Ağırlık + Akü: 2.45 kg + 0.73 kg

HAISPRO Profesyonel Akülü Taşlama Makinesi

Model Kodu : JM-125A
Voltaj: 21V DC
Yüksüz Hız: 3500 / 5000 / 6500 / 8000 / 9000 / 10000
Disk Çapı: 125 mm
Vites Sayısı : 6 
Motor: Kömürsüz
Makine Ağırlığı: 1.8 kg + 0.73 kg akü

Set İçeriği
1 Adet RB-DB2102 Darbeli Matkap
1 Adet RB-BH26 Kırıcı Delici Matkap
1 Adet JM-125 Avuç Taşlama (Spiral)
2 Adet 4.0Ah Lityum-İyon Batarya
1 Adet Şarj Aleti
1 Adet Taşıma Çantası

Üstün Performans ve Uzun Ömür

Kömürsüz motor (brushless) teknolojisi ile donatılan bu set, daha az ısınma, daha uzun çalışma süresi ve yüksek tork gücü sunar.
21V gücüyle, hem profesyonel işlerde hem de ev tipi tamiratlarda mükemmel sonuç verir.
Kompakt ve dengeli tasarımı sayesinde dar alanlarda bile rahat kullanım sağlar.

4.0Ah Çift Akü ile Kesintisiz Çalışma

Set içeriğindeki 2 adet 4.0Ah Li-Ion batarya, uzun süreli işler için kesintisiz güç sunar.
Ayrıca hızlı şarj aleti sayesinde cihazlarınız kısa sürede yeniden kullanıma hazır hale gelir.`,
  
  }, {
    id: 'm15',
    category: 'makineler',
    name: "HaisPro Akülü Set - 2'li Profesyonel 16V Akülü Set + 2X2 Ah Çift Akü - RB-03",
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/03.jpg',
   subcategory:'matkap',
    images: ['images/03.jpg', 'images/031.jpg','images/koşulsuz.jpg',],  
    
    description: `AISPRO Profeyonel 16 V Akülü El Aletleri Seti 2'Lİ SET
Profesyonel işlerinizde maksimum verim, uzun ömür ve konforlu kullanım sunan HAISPRO 16 V Akülü Vidalama Seti, hem ustalar hem de ev kullanıcıları için tasarlandı.

Kömürsüz motor teknolojisi sayesinde daha güçlü tork, daha sessiz çalışma ve daha uzun kullanım ömrü sağlar.

Tek çantada iki güçlü vidalama matkap, şarj aleti ve 2 adet 16 V batarya ile tam donanımlı bir çözümdür.


HAISPRO Profesyonel Vidalama Matkap 16 V RB-SD1608LModel Kodu : RB-SD1608-L
Voltaj: 16V DC
Yüksüz Hız: 0–1200 / 3200 rpm
Maksimum Tork: 180 Nm
Makine Ağırlığı: 0.88 kg + 0.24 kg
Motor Tipi: Kömürsüz (Brushless)

HAISPRO Profesyonel Vidalama Matkap 16 V
Model Kodu : RB-DB16
Voltaj: 16V DC
Yüksüz Hız: 0–500 / 1600 rpm
Maksimum Tork: 40 Nm
Mandren: 10 mm
Kullanım Alanı: Çelik / Ahşap / Beton – 10 / 20 / 8 mm
Makine Ağırlığı + Akü: 0.77 kg + 0.24 kg
Motor Tipi: Kömürsüz (Brushless)

Set İçeriği

1 Adet RB-SD1608-L Vidalama Matkap
1 Adet RB-DB16 Vidalama Matkap
2 Adet 16V 2.0Ah Li-Ion Batarya
1 Adet Şarj Aleti
1 Adet Dayanıklı Taşıma Çantası`,
  
  }, {
    id: 'm16',
    category: 'makineler',
    name: 'Hais 210mm Üstten Tablalı Gönye Kesme Testeresi',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/210.jpg',
   
    images: ['images/210.jpg',],  
    
    description: `HAIS ÜSTTEN TABLALI GÖNYE KESME TESTERESİ  2000 W
 
YÜKSEK GÜÇ UZUN ÖMÜR YÜKSEK KALİTE 
 
 
Ürün Özellikleri ;
 
Çift özelliklidir. Gönye testeresi ve masa testeresi çeşitli kesme uygulamaları için uygun hale getirilebilir.
Sağlam alüminyum döküm taban
Güçlü 2000 Watt motor çeşitli kesme uygulamaları sağlar.
Testere bıçağı 0°- 45° arasında yatırılabilir.
Kompakt tezgah üstü tasarımı sayesinde küçük atölye ortamlarına rahatlıkla sığar.
Karbür uçlu bıçak keskin kalır ve temiz kesimler yapar.
Temiz bir çalışma için toz toplama torbası mevcuttur.
 
Teknik Özellikleri ;
 
Voltaj / Frekans :  220 V / 50 Hz
 
Güç : 2000 Watt
 
Devir :  4000 R /min
 
Testere :  315 x 30 x 100 T
 
Paket Ölçüleri :  71 x 58,5 x 47 cm
 
Paket Ağırlık :  25,5 Kg
 
 Kesim Derinliği ve Genişlikleri 
 
 
0° / 90 ° : 100 x 170 mm
 
45 ° / 90 ° : 67 x 170 mm
 
0° / 45 ° : 100 x 118 mm
 
45 ° / 45 ° : 62 x 62 mm
 
Gönye kesme makineleri  metal, ahşap ve plastik gibi malzemelerin kesiminde kullanılmaktadır. Hassas bir kesim gerçekleştiren Hais Gönye Kesme Makinaları, materyali her açıdan kolaylıkla kesmenizi sağlayacak. Gönye aletleri aynı zamanda toz emme özelliğine sahip olduğu için kolay ve uygun bir çalışma sağlar.Kesme makinesinin bıçak ucuna göre birçok malzemenin kesme işlemini gerçekleştirebilirsiniz. Ayrıca ürünlerde elektrik kaynağı bulunduğu için yanınızda taşıyabilir ve dilediğiniz yerde kullanabilirsiniz.`,
  
  }, {
    id: 'm17',
    category: 'makineler',
    name: 'Hais 45 Cm Benzinli Zincirli Ağaç Kesme Makinesi',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/yd.jpg',
   
    images: ['images/yd.jpg',],  
  
    description: `Hais 45 Cm Benzinli Zincirli Ağaç Kesme Makinesi

YÜKSEK GÜÇ YÜKSEK KALİTE
 
BENZİNLİ
 
45 CM PALA
 
50 CC MOTOR HACMİ
 
    Hais Benzinli ya da Elektrikli Zincirli Ağaç Kesmeler, kesme işlemlerini daha rahat bir şekilde yapmanıza yardımcı olan ürünlerden oluşur. Elektrik ya da benzinle çalışan Hais Zincirli Ağaç Kesmeler, bahçede çalışırken yapacağınız işlemlere pratiklik kazandırır. Kesmenin yanı sıra budama benzeri işlemlerde de kullanılabilen Hais Zincirli Ağaç Kesmeler, bahçe bakımıyla ilgilenen kişilerin alet çantası bulunması gereken ürünler arasında yer almalıdır. 
 Hais Zincirli Ağaç Kesmeler genel olarak bahçe dallarının hızlı ve verimli bir şekilde budanmasına, ağaçların devrilmesine ve ağır çalıların budanmasına yardımcı olur. Kendi içinde çalışma şekillerine göre çeşitli kategorilere ayrılan modellerin de bazı avantajları bulunur. Böylece ürünler, her türlü kullanım amacına pratik bir şekilde uyum sağlar. Hais Zincirli Ağaç Kesmeler pratik bir kullanıma sahip olduğu için herkes tarafından rahatlıkla kullanılabilir. 



Teknik Özellikleri ;
 
Motor Hacmi : 50 cc
 
Motor Gücü : 1,8 Kw (2.41 Hp)
 
Pala Boyu : 45 cm
 
Maksimum Hız : 10500 r / min
 
Yüksüz Hız : 3000 r / min
 
Motor Tipi : İki Zamanlı, Hava Soğutmalı, Tek Silindir
 
Ağırlık ( N.W / G.W ) : 14,5 / 16,5 Kg
 
Ölçüler : 45 x 42 x 30,5 cm`,
  
  }, {
    id: 'm18',
    category: 'makineler',
    name: 'Hais 25 Cm Benzinli Zincirli Ağaç Kesme Makinesi',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/ys.jpg',
   
    images: ['images/ys.jpg',],  

    description: `Hais 25 Cm Benzinli Zincirli Ağaç Kesme Makinesi


YÜKSEK GÜÇ YÜKSEK KALİTE
BENZİNLİ
 
25 CM PALA
 
25.4 CC MOTOR HACMİ
 
Hais Benzinli ya da Elektrikli Zincirli Ağaç Kesmeler, kesme işlemlerini daha rahat bir şekilde yapmanıza yardımcı olan ürünlerden oluşur. Elektrik ya da benzinle çalışan Hais Zincirli Ağaç Kesmeler, bahçede çalışırken yapacağınız işlemlere pratiklik kazandırır. Kesmenin yanı sıra budama benzeri işlemlerde de kullanılabilen Hais Zincirli Ağaç Kesmeler, bahçe bakımıyla ilgilenen kişilerin alet çantası bulunması gereken ürünler arasında yer almalıdır. 
Hais Zincirli Ağaç Kesmeler genel olarak bahçe dallarının hızlı ve verimli bir şekilde budanmasına, ağaçların devrilmesine ve ağır çalıların budanmasına yardımcı olur. Kendi içinde çalışma şekillerine göre çeşitli kategorilere ayrılan modellerin de bazı avantajları bulunur. Böylece ürünler, her türlü kullanım amacına pratik bir şekilde uyum sağlar. Hais Zincirli Ağaç Kesmeler pratik bir kullanıma sahip olduğu için herkes tarafından rahatlıkla kullanılabilir. 



Teknik Özellikleri ;
 
Motor Hacmi : 25.4 cc
 
Motor Gücü : 0.9 Kw (1.21 Hp)
 
Pala Boyu : 25 cm
 
Maksimum Hız : 9000 r / min
 
Yüksüz Hız : 3000 r / min
 
Motor Tipi : İki Zamanlı, Hava Soğutmalı, Tek Silindir
 
Ağırlık ( N.W / G.W ) : 8 / 10 Kg
 
Ölçüler : 51,5 x 29 x 25 cm`,
  
  }, {
    id: 'm19',
    category: 'makineler',
    name: 'Hais 150 Bar Basınçlı Yıkama Makinesi LT517-1800A',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/150.jpg',
   subcategory: 'yıkama makineleri',
    images: ['images/150.jpg',],  
   
    description: `HAIS 150 BAR BASINÇLI YIKAMA MAKİNESİ
 
YÜKSEK GÜÇ YÜKSEK KALİTE
 
HER GEÇEN GÜN DAHA KALİTELİ HİZMET İÇİN ÇALIŞIYORUZ.  HAIS AİLESİ GELİŞEN VE DEĞİŞEN ÜRÜN ÇEŞİTLİLİĞİ İLE BÜYÜMEYE DEVAM EDİYOR.
 
Hais Yüksek Basınçlı Yıkama Makinesi portatif bir üründür. Kolaylıkla taşınabilir ve kullanılabilir özelliği ile son tüketicinin de en çok tercih edeceği ürün grubu olacaktır. Hais Yüksek Basınçlı Yıkama Makinesi şebekeden çektiği suyu yıkanacak yüzeye yüksek basınçla uygulayarak son derece hızlı ve etkili bir temizleme sağlamaktadır. Tekerlekleriyle, temizlik yapılacak bölgede rahatça hareket edebilen basınçlı yıkama makinaları pratik kullanımı ile çok çabuk temizlik yapmanıza imkan verir.
 
 
Eksenli Pistonlu Pompa
 
Paslanmaz Çelik Piston
 
Otomatik Durdurma Sistemi
 
Hızlı Bağlantı Aksesuarları
 
Tekerlekler ve Tutma Koluyla Kolay Taşınabilir Tasarım
 
Metal Pompa
Ürün Özellikleri ;
 
Voltaj / Frekans : 220 V / 50 Hz
 
Güç : 1800 Watt
 
Basınç : 150 Bar
 
Akış : 7 Lt/ Dk
 
Hortum Uzunluğu : 5 Metre
 
Paket Ölçüleri : 34 x 31,5 x 50,5 cm
 
Paket Ağırlık : 8,60 Kg
 
ARAÇ YIKAMA
YOL VE KALDIRIM TEMİZLİĞİ
DIŞ KAPLAMA TEMİZLİĞİ
VERANDA TEMİZLİĞİ
BAHÇE TEMİZLİĞİ`,
  
  }, {
    id: 'm20',
    category: 'makineler',
    name: 'Hais Benzinli Yan Tırpan',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/htırpan.jpg',
   subcategory: 'tırpan',
    images: ['images/htırpan.jpg',],  
  featured:true,
    description: `HAIS BENZİNLİ YAN TIRPAN
 

YÜKSEK GÜÇ YÜKSEK KALİTE


Hais Benzinli Tırpan Motorlarınınlk tercih sebebi uzun süreli kullanım ihtiyacıdır. Engebeli araziler için sırt tipi; daha düz araziler için düz şaftlı olanları önerilir.  Bir  dönüm ve daha büyük bir bahçeniz varsa tavsiyemiz kesinlikle Hais Benzinli Tırpan Motorları olacaktır. Hais Benzinli Tırpan Motorları yüksek devir oranları, uzun süre kullanım imkanı ile normal güçteki bir insan günde 4-5 dönüm arazinin otlarını temizleyebilmektedir. Yakıt olarak ise ortalama 1 dönümde 1 litre civarında yakıt tüketmektedir. Bu arazinin durumuna göre otların cinsine göre değişiklik gösteriyor. Bazı arazilerde dikenler ve kalın çalılar olduğunda yakıt miktarı artmaktadır. Çimen vb ufak çaplı otları ise fazla yakıt tüketmeden işinizi bitirebilirsiniz.
 
BENZİNLİ
 
8 KG
 
49.3 CC MOTOR HACMİ
 
 
Teknik Özellikleri ;
 
Motor Hacmi : 49,3 CC
 
Motor Gücü : 1,6 Kw ( 2,15 Hp )
 
Rölanti Devri : 3000 r / min
 
Bıçak Kesme Genişliği : 255 mm
 
Düzeltici Kesme Genişliği : 440 mm
 
Tank Hacmi : 1.2 L
 
Mil Boru Uzunluğu : 1500 mm
 
Mil Boru Çapı : 28 mm
 
Motor Tipi : İki Zamanlı, Hava Soğutmalı, Tek Silindir
 
Ağırlık ( N.W / G.W ) : 8 / 9.2 Kg
 
Ölçüler : 31 x 23 x 35 cm`,
  
  }, {
    id: 'm21',
    category: 'makineler',
    name: 'STECHEND SX44 Akülü Avuç Taşlama Makinesi',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx44.jpg',
   subcategory:'taşlama',
    images: ['images/sx44.jpg',],  
 
    description: `Ağırlık	1,3 kg
Uyumlu Batarya Tipi	
20V Lithyum

Akü Tipi	
Li-ion

Güç Tipi	
Batarya

Gerilim	
20V

Akü Kapasitesi	
4.0 Ah, 6.0 Ah

Disk Çapı	
125 mm

Yüksüz Hız	
2600 / dak, 8500 / dak

Mil	
M14

Genel Özellikler	
Yumuşak başlangıç`,
  
  }, {
    id: 'm22',
    category: 'makineler',
    name: 'STECHEND SX17 16V 2.0Ah Akülü Darbeli Vidalama',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx17.jpg',
   subcategory:'matkap',
    images: ['images/sx17.jpg',],  
   
    description: `Ağırlık	0,85 kg
Uyumlu Batarya Tipi	
16V 2Ah Lithyum

Güç Tipi	
Batarya

Akü Tipi	
Li-ion

Akü Kapasitesi	
2.0 Ah

Gerilim	
16V

Vites sayısı	
2

Rölanti hızı Pozisyon I	
0-450 / dak

Rölanti hızı Pozisyon II	
0-2000 / dak

Yüksüz hızı	
0-30000 bpm

Tork	
50 Nm

Tork konumları	
20 + 1 kademe

Matkap mandreni genişliği	
10mm

Genel Özellikler	
Sağa-Sola Çevir, LED Çalışma Lambası, Yumuşak Kavrama`,
  
  }, {
    id: 'm23',
    category: 'makineler',
    name: 'STECHEND SX18 16V 2.0Ah Akülü Darbeli Vidalama',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx18.jpg',
   subcategory:'matkap',
    images: ['images/sx18.jpg',],  
    
    description: `Ağırlık	0,83 kg
Uyumlu Batarya Tipi	
16V 2Ah Lithyum

Gerilim	
16V

Güç Tipi	
Batarya

Akü Tipi	
Li-ion

Akü Kapasitesi	
2.0 Ah

Çıkış mili	
M4-M12 (1/4" inç)

Kademe	
3 (50/110/150 Nm tork)

Dakikadaki devir sayısı	
0-3200/dak

Dakikadaki vuruş sayısı	
0-3800/dak

Tork	
150 Nm

Genel Özellikler	
Sağa-Sola çevir, LED çalışma lambası, Yumuşak kavrama`,
  
  }, {
    id: 'm24',
    category: 'makineler',
    name: 'STECHEND SX32 20V Akülü Darbeli Vidalama',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx32.jpg',
   subcategory:'matkap',
    images: ['images/sx32.jpg',],  
    stock: 7,
    description: `Ağırlık	0,97 kg
Uyumlu Batarya Tipi	
20V Lithyum

Akü Tipi	
Li-ion

Güç Tipi	
Batarya

Gerilim	
20V

Akü Kapasitesi	
2.0 Ah, 4.0 Ah

Bağlantı/kayıt	
6,35 mm ¼” altıgen

Kademe sayısı	
3 (100/180/230 Nm tork)

Dakikadaki devir sayısı	
0-2200/dakika

Dakikadaki vuruş sayısı	
0-3000/dakika

Tork	
230 Nm

Genel Özellikler	
Sağa-Sola çevir, LED çalışma lambası, Yumuşak kavrama`,
  
  }, {
    id: 'm25',
    category: 'makineler',
    name: 'STECHEND SX35 20V Akülü Darbeli Somun Sıkma',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/sx35.jpg',
   
    images: ['images/sx35.jpg',],  
    stock: 7,
    description: `Ağırlık	1,14 kg
Uyumlu Batarya Tipi	
20V Lithyum

Akü Tipi	
Li-ion

Güç Tipi	
Batarya

Gerilim	
20V

Çıkış mili	
1/2” kare eksen

Kademe	
3 (300/400/500 Nm tork)

Dakikadaki devir sayısı	
0-2500/dak

Dakikadaki vuruş sayısı	
0-3300/dak

Tork	
500 Nm

Genel Özellikler	
LED çalışma lambası, Yumuşak kavrama`,
  
  }, {
    id: 'm26',
    category: 'makineler',
    name: 'STECHEND SX16 2 AH AKÜLÜ MATKAP',
    subcategory: 'matkap',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx16.jpg',
   
    images: ['images/sx16.jpg',],  
    stock: 7,
    description: `Ağırlık	0,76 kg
Uyumlu Batarya Tipi	
16V 2Ah Lithyum

Gerilim	
16V

Güç Tipi	
Batarya

Akü Tipi	
Li-ion

Akü Kapasitesi	
2.0 Ah

Vites sayısı	
2

Rölanti hızı Pozisyon I	
0-450 / dak

Rölanti hızı Pozisyon II	
0-2000 / dak

Yüksüz hızı	
0-30000 bpm

Tork	
50 Nm

Tork konumları	
20 + 1 kademe

Matkap mandreni genişliği	
10mm

Genel Özellikler	
Sağa-Sola Çevir, LED Çalışma Lambası, Yumuşak Kavrama`,
  
  }, {
    id: 'm27',
    category: 'makineler',
    name: 'Hais LT601GW 170 Bar Basınçlı Yıkama Makines',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/170.jpg',
   subcategory: 'yıkama makineleri',
    images: ['images/170.jpg',],  
    stock: 7,
    description: `HAIS 170 BAR İNDÜKSİYON MOTORLU YÜKSEK BASINÇLI YIKAMA MAKİNESİ
 

YÜKSEK GÜÇ YÜKSEK KALİTE
 
HER GEÇEN GÜN DAHA KALİTELİ HİZMET İÇİN ÇALIŞIYORUZ.  HAIS AİLESİ GELİŞEN VE DEĞİŞEN ÜRÜN ÇEŞİTLİLİĞİ İLE BÜYÜMEYE DEVAM EDİYOR.
 
Hais 170 Bar İndüksiyon Motorlu Yüksek Basınçlı Yıkama Makinesi portatif bir üründür. Kolaylıkla taşınabilir ve kullanılabilir özelliği ile son tüketicinin de en çok tercih edeceği ürün grubu olacaktır. Kullanımları son derece kolay Hais Yüksek Basınçlı Yıkama Makinasını su sağlayacağınız yere bağlayın, musluğu açın, basınçlı yıkama makinesini çalıştırın ve temizleme işleminin keyfini çıkarın.
 
İNDÜKSİYON MOTOR BAKIM GEREKTİRMEZ %50 DAHA FAZLA KULLANIM ÖMRÜ 
 
SU & ENERJİ & ZAMANDAN %50 TASARRUF
 
3 Eksenli Pistonlu Pompa
 
Fonksiyonel Hortum Makaralı
 
Otomatik Durdurma Sistemi
Paslanmaz Çelik Piston
 
Hızlı Bağlantı Aksesuarları 
 
Tekerlekler ve Alüminyum Teleskopik Tutma Koluyla Kolay Taşınabilir Tasarım
 
Metal Pompa
 
Ürün Özellikleri ;
 
Voltaj : 220 v/ 50 Hz
 
Güç : 1900 Watt
 
Basınç : 170 Bar
 
Akış : 7,5 Lt/ Dk
 
Hortum Uzunluğu : 8 Metre
 
Paket Ölçüleri : 365 x 345 x 725 mm
 
Paket Ağırlık : 16,30 Kg`,
  
  }, {
    id: 'm28',
    category: 'makineler',
    name: 'Hais LT701G-2500 205 Bar Yıkama Makinesi',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/205.jpg',
   subcategory: 'yıkama makineleri',
    images: ['images/205.jpg',],  
    stock: 7,
    description: `
TEKNİK ÖZELLİKLER	
Gerilim:2
Hortum Ölçüsü:8 m
Güç:2500W
Debi:7,8 lt/dk
Ağırlık:21,9 kg
Basınç:Maks. 205 bar
Motor:İndüksiyon Motor
Otomatik Stop Sistemi:Mevcut
Sıcaklık:40 Derece
Ebat:44x34x60

Ürün Açıklaması:	
Hais   markasının üretmiş olduğu kaliteli kullanıma sahip olan yıkama makinesi çeşitlerinden biridir.
Profesyonel temizlik işlemlerinde kullanılmak üzere üretilmiş olan temizlik makinesi modellerinden biridir.
Kullanımları oldukça basit ve pratik olması ile kullanıcılara kullanım kolaylığı ve rahatlığı sağlar.
Üstün kaliteli malzemeler kullanılarak üretilmiş olan yıkama makinesi dayanıklı ve sağlam bir yapıya sahiptir.
Kaliteli ve sağlam yapısı sayesinde uzun ömürlü kullanım imkanı sunmaktadır.
Genel yapıları bakımından profesyonel ortamlarda kısa süre içerisinde kolaylıkla temizlik işlemlerini halletmenize yardımcı olur.
Şapka hediyelidir.`,
  
  }, {
    id: 'm29',
    category: 'makineler',
    name: 'Hais 170-200 Bar Profesyonel İnverter Basınçlı Oto Yıkama Makinesı',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/hais170i.jpg',
   subcategory: 'yıkama makineleri',
    images: ['images/hais170i.jpg',],  
    stock: 7,
    description: `TÜRKİYE'DE İLK	
İnvertör Kontrollü İndüksiyon Motorlu	 
 	 
ALTTAKİ VİDEOYU MUTLAKA İZLEMELİSİNİZ!!!!!	 
 	 	 
İnverter Kontrol Ne İşe Yarar?
Ultra düşük valtajlarda elektriği dengeleyerek motor yanma risklerini ortadan kaldırmaktadır.
Normal şartlarda olması gereken 220 Volt luk voltaj ,Ülkemizde anlık olarak düşer veya yükselir, iste bu valtaj değişikliği elektrikle çalışan birçok cihaza zarar verir. Fakat Hais  İnvertör Kontrollü İndüksiyon Motorlu Basınçlı Oto Yıkama Makinamızda 160 Volt en düşük ve  260 Volt yüksek voltajlara karşı %100 dayanıklılık göstermektedir.
 	 	 
TEKNİK ÖZELLİKLER	 
 	 	 
Güç Kapasite	5,5 Hp	 
İzin Verilen Makimum Basınç	170 - 200 Bar	 
Maksimum Su Debisi	20 Litre/Dakika	 
Basınç Hortumu Uzunluğu	15 Metre	 
Voltaj	160 Volt-260 Volt	 
Maksimum Isı	50 Derece	
Makina Ağırlığı	32 kgs	
Motor Tipi	İnverter Motor`,
  
  }, {
    id: 'm30',
    category: 'makineler',
    name: 'Hais CV35 Kanal Açma Makinesı 2000 Watt',
    brand: 'HAIS',
    color: '#0ea5e9',
    image: 'images/kanalacma.jpg',
   
    images: ['images/kanalacma.jpg',],  
    stock: 7,
    description: `
TEKNİK ÖZELLİKLER	
Güç	2000 Watt	
Devir	2200 Devir/ Dakika
Kanal Çapı:	35 mm
Ağırlık	7,8 kg
Paket Ölçüsü	34 x 18,5 x 29,5 cm	
Ürün Açıklaması;	
YEDEK BIÇAK HEDİYELİ
KİLİTLİ TETİK ÖZELLİĞİ
TAŞIMA ÇANTALI 
4 METRE KABLOLU
Duvar ve düz yüzeylerde elektrik, su, ısıtma, soğutma, klima ve sıhhi tesisat gibi çalışmalarınızda kanal açmayı son derece kolaylaştırıyor.
2000 Watt gücünde HAIS modeli kapasite üstü hizmet vererek ytong, tuğla, briket ve bims gibi her türlü zeminde hızlı bir şekilde çalışabilmenizi sağlıyor.
HAIS kanal açma makinesi kanalın içini boşaltarak açmaktadır. Bu yüzden ayrıca çekiçle veya murçla kanalın içinin boşaltmanıza gerek kalmamaktadır. 
HAIS kanal açma makinesi çapraz dişli freze bıçağı sayesinde duvarda asılı kalabiliyor. Seçkin dizaynı sayesinde, freze bıçağı duvara girdikten sonra sadece iterek ve yönlendirerek  yatay ve dikey kanallar açabilirsiniz.
Çapraz freze bıçakları ile çok az güçlü daha fazla kanal açabilirsiniz. HAIS  kanal açma makinesi günde 8-10 daire açma kapasitesine sahiptir. Ayrıca köşelerde, tavan ve zemin kenarlarında sadece 1 cm. mesafe bırakır. `,
  
  },
{
    id: 'm31',
    category: 'makineler',
    name: 'Bosch Professional GWS 9-115 Avuç Taşlama Makinesi',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/gws750.jpg',
   subcategory: 'taşlama ',
    images: ['images/gws750.jpg',],  
    stock: 7,
    description: `
    
900 Watt%27lık güç ve tork sayesinde üstün taşlama/kesme performansı
Avuç içine sığacak tutamak boyu ve ergonomik tasarımıyla sınıfındaki en iyi el kontrolü
Dayanıklı tasarımı ve parçaları sayesinde zor çalışma koşulları ve ağır iş yükü altında uzun ömür


Teknik veriler
Özelliklere genel bakış
Nominal giriş gücü 900 W
Boştaki devir sayısı 11.000 dev/dak
Çıkış gücü 450 W
Taşlama mili dişi M 14
Disk çapı 115 mm
Takım ölçüleri (genişlik) 73 mm
Takım ölçüleri (uzunluk) 280 mm
Takım ölçüleri (yükseklik) 100 mm
Ağırlık 1.9 kg
Şalter 2 kanallı
Yüzey zımparalama (Taşlama)
Titreşim emisyon değeri ah 7.5 m/s²
Tolerans K 1.5 m/s²
Zımpara kağıdı ile zımparalama
Titreşim emisyon değeri ah 7.5 m/s²
Tolerans K 
    `,
  
  }, 
{
    id: 'm32',
    category: 'makineler',
    name: 'Bosch Gks 190 Daire Testere 190 mm 1400 Watt',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/gks190.jpg',
   subcategory: 'testere',
    images: ['images/gks190.jpg',],  
    featured:true,
   
    description: `
    Giriş gücü: 1.400 W
Rölanti devir sayısı: 5.500 dev/dak
Ağırlık: 4,2 kg
Testere bıçağı göbek çapı: 30,0 mm
Testere bıçağı çapı: 190 mm
Kesme derinliği (90°): 70 mm Kesme derinliği (45°): 50 mm
Mil kilitleme özelliği
Toz emme 

    `,
  
  }, 

{
    id: 'm33',
    category: 'makineler',
    name: 'Bosch GWS 2200 Taşlama Makinesi',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/gws2200.jpg',
   subcategory: 'taşlama ',
    images: ['images/gws2200.jpg',],  

    description: `
    Gürültü seviyesi	Elektrikli el aletinin A-dereceli gürültü seviyesi tipik olarak şu değerlere sahiptir: Ses basıncı seviyesi 97 dB(A); Ses performansı seviyesi 108 dB(A). K belirsizliği= 3 dB.
Nominal giriş gücü	2.200 W
Rölanti devir sayısı	6.500 dev/dak
Çıkış gücü	1.254 W
Taşlama mili dişi	M14
Ana tutamak	Sıçan kuyruğu
Disk çapı	230 mm
Lastik zımpara tabanı çapı	180 mm
Çanak fırça çapı	100 mm
Delik çapı	22,2 mm
Takım ölçüleri (genişlik)	310 mm
Takım ölçüleri (uzunluk)	480 mm
Takım ölçüleri (yükseklik)	140 mm
Ağırlık	5,3 kg
Şalter	PROtection switch (koruma şalteri)
Ses basıncı seviyesi	97 dB(A)
Ses gücü seviyesi	108 dB(A)
Tolerans K	3 dB

    `,
  
  },  
   {
    id: 'm34',
    category: 'makineler',
    name: 'Bosch Professional GBH 2-26 Dre Kırıcı Delici',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/boschkırıcı.jpg',
   subcategory: 'matkap ',
    images: ['images/boschkırıcı.jpg',],  

    description: `
    Bosch Professional GBH 2-26 Dre Kırıcı Delici - 0611253703
Bosch GBH 2-26 Dre Kırıcı Delici, profesyonel kullanıcılar için tasarlanmış güçlü ve dayanıklı bir el aletidir. Beton, tuğla ve taş gibi sert malzemelerde yüksek performanslı delme ve kırma işlemleri yapar. SDS-Plus sistemi sayesinde uç değiştirme hızlı ve kolaydır, darbeli ve darbessiz delme modları ile farklı uygulamalara uygun kullanım sağlar.

Ürün Avantajları
Yüksek performanslı kırıcı delici
SDS-Plus ucu hızlı değiştirme sistemi
Darbeli ve darbessiz delme modları
Ergonomik ve kompakt tasarım
Profesyonel kullanıma uygun dayanıklılık
Teknik Özellikler
Özellik	Detay
Ürün Kodu	0611253703
Marka	Bosch Professional
Model	GBH 2-26 Dre
Delme Kapasitesi (Beton)	26 mm
Delme Kapasitesi (Ahşap)	30 mm
Delme Kapasitesi (Çelik)	13 mm
Enerji	800 W
Ağırlık	2.8 kg
Bosch GBH 2-26 Dre Kırıcı Delici, sağlam ve ergonomik yapısı ile profesyonel işlerde güvenilir bir çözüm sunar. Beton ve taş delme işlerinde yüksek performans isteyen kullanıcılar için ideal bir tercihtir.


    

    `,
  
  }, {
    id: 'm35',
    category: 'makineler',
    name: 'Bosch Professional GSA 1100 E Tilki Kuyruğu Testere',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/boschtilki1.jpg',
 
    images: ['images/boschtilki1.jpg',],  

    description: `
    Cihazın Kullandığı Güç
Profesyonel tilki kuyruğu, 1100 W elektrik enerjisi sayesinde sizlere yararlı olabilir. 1100 W enerji harcayarak işini yapar. Rakiplerine göre çok daha az enerji kullanır. Ancak görevini verimli bir şekilde yerine getirir.
Gövde Yapısı
Cihazın gövdesi dişlidir. Ancak plastikle bezeli olduğu için elinize zarar vermez. Uzun süre etkili bir şekilde ürünü kullanabilirsiniz. Cihazı tutmak ve kullanmak çok da zor değildir. Hatta kolaydır. Güvenli olması açısından cihaz, plastik ile kaplanmıştır.
Ürünün Kilosu
Cihaz, 3.6 kilogram ağırlığındadır. Kolayca taşınabilir. Evinizin bir köşesine koyarak muhafaza edebilirsiniz. Arzu ettiğiniz taktirde cihazı çıkarıp kullanmaya başlayabilirsiniz. Yorulduğunuzda ya da cihazı bırakmak istediğinizde metal kancasına asabilirsiniz.
Kesme Derinliği
Cihazla boru, profil, ahşap, vb. kesebilirsiniz. Ahşap ve metal testere bıçağı son teknolojiyle üretilmiştir. En zorlu zeminleri dahi kolayca kesebilir.
Devir Hızı
Ürün hızlı bir şekilde çalışır. Dakikada 2700 devir yapabilir. Hem hızlı hem etkili bir üründür. Kullanımı çok zor değildir. Ancak güvenliğiniz için işin uzmanından cihazın kullanımını öğrenmeniz daha iyi olur. Ardından cihazı tecrübe ederek kolayca kullanabilirsiniz.
Takım Çanta Avantajı
Ürünün en büyük faydalarından biri takım çantasının varlığıdır. Yani ürünü kullandıktan sonra takım çantasının içine koyabilir, orada muhafaza edebilirsiniz. Böylece çocuklar da cihaza doğrudan erişemezler. Hem sizin hem onların huzuru için çantada kullanım önemlidir.
Paket İçeriği:
Panter testere bıçağı ile takım çantasında;
✔ Takım çantası -2 610 956 923
✔ 1 x panter testere bıçağı S 2345 X, Progressor for Wood (2 parçalı set olarak ayrı biçimde temin edilebilir: 2 608 654 403)
✔ 1 x panter testere bıçağı S 123 XF, Progressor for Metal (2 parçalı set olarak ayrı biçimde temin edilebilir: 2 608 654 416)

Teknik veriler:
Nominal giriş gücü	1.100 W
Testere, strok uzunluğu	28 mm
Rölantideki strok sayısı	0 – 2.700 strok/dak
Takım ölçüleri (genişlik x uzunluk x yükseklik)	95 mm x 497 mm x 160 mm
Kesme derinliği
Ahşapta kesme derinliği	230 mm
Metal profiller ve metal borularda kesme derinliği	20 mm
Toplam titreşim değeri (Ağaç kesme)
Titreşim emisyon değeri ah	18 m/s²
Tolerans K	1,5 m/s²

    `,
  
  }, 
{
    id: 'm36',
    category: 'makineler',
    name: 'Einhell Tp-Cd 18/60 Li-I Bl +39 2x2 Ah Akülü Darbeli Vidalama',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/t1.jpg',
 subcategory:'matkap',
    images: ['images/t1.jpg',],  

    description: `
    Delme Özelliği:Var
Darbe Özelliği:Darbeli
Led Aydınlatma:Var
Akü Kapasitesi:2 Ah
Kömürsüz:Evet
Taşıma Çantası:Var
Akü Tipi:Li-ion
Akü Voltajı:18 V
Akü Sayısı:2 adet

    `,
  
  }, {
 id: 'm37',
    category: 'makineler',
    name: 'Einhell TC MG 135 E Mini Gravür Seti',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/eg.jpg',
 
    images: ['images/eg.jpg',],  

    description: `
    Einhell TH-MG 135 E Mini Taşlama ve Gravür Seti 189 parça çantalı aksesuarları ile fırçalama, delme, kesme, oyma gibi bir çok uygulama için kullanıcılara detaylı çalışma imkanı sağlayan kompakt bir hobi aracıdır. Teleskopik standı ve esnek mil ile kullanım rahatlığı sağlar.

Özellikler

189 parça aksesuarlı

Elektronik hız kontrolü

Mil kilidi

Esnek mil (şaft)

Teleskobik stand

Kullanışlı organizer çanta

Soft yüzey kaplaması

Teknik Bilgiler

Giriş voltajı 230 V | 50 Hz

Güç 135 W

Boşta çalışma Hızı 32000 d/dk

Aksesuar girişi Ø 3.2 mm | Ø 2.4 mm | Ø 1.6 mm | Ø 0.5 mm

    `,
  
  }, 
 {
 id: 'm38',
    category: 'makineler',
    name: 'Einhell Elektrikli Zımba ve Çivi Tabancası TC-EN 20 E',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/zıme.jpg',
 
    images: ['images/zıme.jpg',],  

    description: `
    Tip 53 zımba ve Tip 47 çivi için uygundur
Elektronik darbe kuvveti ayarı
Güvenlikli burun; yalnızca çalışma pozisyonunda atış yapar
Ergonomik ve soft kaplama tutamak
Kartuş seviye göstergesi

    `,
  
  },  {
 id: 'm39', 
    category: 'makineler',
    name: 'Einhell TE-CD 12/1 Li-i (1x2,0 Ah), Akülü Darbeli Vidalama',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/a.jpg',
 subcategory:'matkap',
    images: ['images/a.jpg',],  

    description: `
    Ürün Özellikleri
• Li-ion teknolojisi sayesinde her zaman kullanıma hazır

• Güçlü vidalama ve hızlı delme için 2 vites seçeneği

• Malzeme ve uygulamaya uygun hız ayar elektroniği

• Karanlık alanlarda optimum çalışma için LED aydınlatma

• Ergonomik tasarım ve Softgrip ile çalışması son derece kolaydır

• Sağlam metal dişli takımı ile maksimum dayanıklılık

• 45 dakika şarj cihazı ve 2x 2,0 Ah akü

• Manyetik kilitli pratik saklama kartonunda verilir

    `,
  
  },  {
 id: 'm40',
    category: 'makineler',
    name: 'Einhell TE-DH 12 Kırıcı 1050W 12J ',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/kırıcı2.jpg',
 
    images: ['images/kırıcı2.jpg',],  

    description: `
    Giriş voltajı	220-240 V | 50-60 Hz
Güç	1050 W
Darbe oranı	4100 min^-1
Darbe gücü	12 J
Güç kablosu	400 cm | H07RN-F
Takım tutucu	SDS-Max

    `,
  
  },  {
 id: 'm41',
    category: 'makineler',
    name: 'Einhell TP-CD 18/60 Li-i BL Solo Darbeli Matkap',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/60n.jpg',
 
    images: ['images/60n.jpg',],  

    description: `
    Teknik özellikler
Maks. kapasiteli matkap mandreni 13 mm
Min. kapasiteli matkap mandreni 2 mm
Motor gerilimi 18 V
Motor tipi Kömürsüz motor
Teslimat kapsamındaki akü sayısı 0 pcs
Teslimata dahil olan şarj cihazı sayısı 0 pcs
Tork (sert) 50 Nm
Tork ayarlama adımları 22
Vuruş hızı dişlisi 1 8000 min^-1
Vuruş hızı dişlisi 2 28800 min^-1
Ürün ağırlığı 1.22 Kg
Şanzıman dişlisi sayısı 2

    `,
  
  },  {
 id: 'm42',
    category: 'makineler',
    name: 'Einhell GC-DW 900 N Derin Kuyu Dalgıç Pompa ',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/pompa.jpg',
 
    images: ['images/pompa.jpg',],  

    description: `
    Einhell GC-DW 900 N Derin Kuyu Dalgıç Pompa - 4170964


Dalgıç Basınç Pompa
GC-DW 900 N
Paslanmaz çelik cidarlı sağlam basınç bağlantısı
Basınç oluşturmak için çok kademeli pompa pervaneleri
Paslanmaz çelik pompa gövdesi
Yüksek kalite mekanik conta (sermik/kauçuk) ile uzun ömür
Kademesiz ayarlanır şamandıra
Üst kısma yerleştirilmiş, kolay erişilebilir hortum bağlantısı
Aşırı yük anahtarı
2 adet askı gözü
Ürün açıklaması:
Einhell GC-DW 900 N Derin Kuyu Dalgıç Pompa çok kademeli pompa pervane sistemi ile 32 metre derinlikten temiz su iletebilen verimli ve güvenilir bir yardımcıdır. 900 W gücündeki motoru ile kuyu, rezervuar ve su depolarından saatte 6000 L su basabilirsiniz. Gövdesi paslanmaz çelikten olup oldukça dayanıklıdır. Yüksek kaliteli contası ile bakım gereksinimi en aza indirgenmiştir. Şamandıra ayarı bulunur. 2 adet askı gözü daldırma halat güvenle bağlanabilir.

    `,
  
  },  {
 id: 'm43',
    category: 'makineler',
    name: 'Einhell GE-SP 750  Temiz Su Dalgıç Pompa ',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/dalgıc1.jpg',
 
    images: ['images/dalgıc1.jpg',],  

    description: `
    Ge-Sp 750 Ll, Dalgıç Pompa - Temiz Su
Einhell GE-SP 750 LL Temiz Su Dalgıç Pompa 2 mm seviyelerine kadar tahliye yapabileceğiniz sağlam, güçlü ve uzun ömürlü bir pompadır. 750 W yüksek güç çıkışı ile saatte 15000 L su iletebilir. Entegre şamandırası ile otomatik veya sürekli modda çalıştırmak için ayarlayabilirsiniz. Çok yönlü kullanım için universal bağlantıyla gelir. Taşıma kulbu ile kolay taşınırken, entegre kablo sarma oyuğu ile kolayca düzenli bir şekilde saklayabilir veya taşıyabilirsiniz.

Basınç bağlantı tipi 42mm (G11/4 AG) Güç 750 W Güç kablosu uzunluğu 10 m Maks. iletim basıncı 1 bar Maks. iletim hızı 15000 l/h Maks. iletim yüksekliği 10 m Maks. su sıcaklığı 35 °C Maks. yabancı cisim boyutu 5 mm Min. su seviyesi pompa başlangıcı 50 mm Sığ birikinti kalan kadar emiş 2 mm Ürün ağırlığı 6.2 Kg

    `,
  
  },  {
 id: 'm44',
    category: 'makineler',
    name: 'Einhell TE-HV 18/06 Li - Solo Süpürge',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/supurge.jpg',
 
    images: ['images/supurge.jpg',],  

    description: `
    Einhell TE-HV 18/06 Li Akülü El Süpürgesi Seti


El süpürgesi özellikleri
-Power X-Change ailesinin üyesi
-Optimum pil kullanımı için 2 hız (ECO/BOOST)
- 72 mbar'a kadar yüksek emiş gücüne sahip
- 0,6 litre kapasiteli büyük toz haznesi, bir düğmeye basılarak toz haznesinin hızlı ve kolay boşaltılması
-Kir filtresinin akan su altında temizlenmesi mümkündür
-Entegre duvar desteği sayesinde yerden tasarruf sağlayan depolama
-Sert zeminler ve pürüzsüz yüzeyler için zemin başlığı, ulaşılması zor yerler için 26 cm uzunluğunda aralık başlığı, döşeme ve kumaşların temizlenmesi için döşeme başlığı ve zemin süpürgesi olarak kullanılmak üzere 2 adet emiş borusu (toplam 70 cm) dahildir


Akü ve şarj cihazının ortak özellikleri:
-Tüm Power X-Change şarj edilebilir cihazlarla kullanılabilirlik
-Para tasarrufu, çevreyi koruma ve kullanım çeşitliliği


Akü özellikleri:
-ABS proses kontrollü akü yönetim sistemi,
-Maks. güvenlik, optimum performans, çalışma süresi + ömür
-Kablosuz kullanım özgürlüğü
-Yüksek kaliteli Li-Ion hücreler sayesinde hafıza etkisi yoktur
-Düşük deşarj olma özelliği ve uzun süreli güç
-3 aşamalı LED ekranla gösterilen mevcut şarj seviyesi
-Kolay çıkarılması için ergonomik tutamak
-Toza, korozyona ve mekanik hasara karşı korumalı gövde
-Güç gerektiren 36V uygulamalarda TWIN-PACK kullanımı uygundur



    `,
  
  },  {
 id: 'm45',
    category: 'makineler',
    name: 'Einhell Te-Cı 18/1 Li - Solo Torklu Darbeli Matkap',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/tork.jpg',
 
    images: ['images/tork.jpg',],  

    description: `
    Teknik özellikler
Motor gerilimi 18 V
Motor tipi Kömürlü motor
Tork (sert) 140 Nm
Ürün ağırlığı 1.17 Kg
Şanzıman dişlisi sayısı 1
Şanzıman malzemesi Metall

    `,
    },  {
 id: 'm46',
    category: 'makineler',
    name: 'Einhell TE-CD 18/2 Li-i +22 (1x2,5 Ah) Akülü Darbeli Vidalama',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/tecd.jpg',
 
    images: ['images/tecd.jpg',],  
subcategory:'matkap',
    description: `
    Yükseklik	10 cm
Genişlik	34 cm
Uzunluk	35 cm
Ağırlık	3.4 kg
Kablo Uzunluğu	0 Metre
Modeli	Darbeli
Güç Küme Aralığı	18v-44 Nm
Yüksüz Hızı	1250 rpm
Darbe Oranı	5250 bpm
Güç	0 Watt
Voltaj	18 Volt

    `,
  
  }, 
  {
 id: 'm47',
    category: 'makineler',
    name: 'Einhell Batarya ve Şarj Cihazı',
    brand: 'Einhell',
    color: '#0ea5e9',
    image: 'images/einhell batarya.jpg',
 
    images: ['images/einhell batarya.jpg',],  
subcategory:'matkap',
    description: `
        2AH
        4AH
        5.2AH
        6AH

    `,
  
  }, 
  {
 id: 'm48',
    category: 'makineler',
    name: 'Makita HR2470 Elektropnömatik Kırıcı Delici Darbeli',
    brand: 'Makita',
    color: '#0ea5e9',
    image: 'images/2470.jpg',
    featured:true,
    images: ['images/2470.jpg',],  
subcategory:'matkap',
    description: `
       Makita HR2470 Elektropnömatik Kırıcı Delici Darbeli Güçlü Performans
HR2470 Elektropnömatik Kırıcı Delici — profesyonel inşaat ve tadilat işlerinizde yüksek performans, güvenlik ve dayanıklılığı bir arada sunar.

✨ Özellikler:
- ✅ 780W güçlü motor — zorlu delme ve kırma işlemlerinde yüksek verimlilik sağlar.
- 🛡 Tork sınırlandırıcı — uç sıkışmalarında hem aleti hem kullanıcıyı korur.
- ⚡ Değişken hız ve sağ-sol devir ayarı — farklı malzemelerde hassas çalışma imkanı.
- 🧩 Darbeli, darbesiz delme ve kırma fonksiyonları — çok yönlü kullanım.
- 🪨 Çift yalıtımlı gövde — ekstra dayanıklılık ve uzun ömür.
- 👍 Yan sap ve derinlik mesnedi — kolay ve kontrollü kullanım.
- 🔗 SDSPlus tip bağlantı — hızlı ve güvenli uç değişimi.
- 💼 Plastik taşıma çantası — pratik saklama ve taşıma.

HR2470 Elektropnömatik Kırıcı Delici, inşaat profesyonelleri, ustalar ve evde tadilat yapanlar için idealdir. Beton, ahşap ve çelik gibi farklı yüzeylerde güvenli ve etkili çalışma sağlar.

    `,
  
  },
  {
 id: 'm49',
    category: 'makineler',
    name: 'Makita 6413 450W Darbesiz Matkap',
    brand: 'Makita',
    color: '#0ea5e9',
    image: 'images/6413.jpg',
 
    images: ['images/6413.jpg',],  
subcategory:'matkap',
    description: `
      Çift yalıtımlıdır.
Değişken hız özelliğine sahiptir.
Sağ-sol devir ayarlıdır.
Anahtarsız(otomatik) mandrenlidir.
Sadece ahşap ve metalde delme işleri için kullanılır.
Delik açmadan vidalama işleri için uygun değildir.

    `,
  
  },
  {
 id: 'm50',
    category: 'makineler',
    name: 'Makita GA4530R Avuç Taşlama 115 MM 720W',
    brand: 'Makita',
    color: '#0ea5e9',
    image: 'images/ga4530.jpg',
    featured:true,
    images: ['images/ga4530.jpg',],  
subcategory:'taşlama',
    description: `
      Temel kullanım amacı, metal yüzeylerde zımparalama ve kesme işleridir.Ayrıca, uygun şap diskler ve elmas testere kullanımı ile beton ve taş gibi yapı malzemeleri zımparalama ve kesme işlerinde de kullanılırlar.



Sürekli Akım Girişi : 720W
Kapasite : kesici,aşındırıcı,elmas testere: 115mm mm
Boşta Devir : 11000devir/dk
Mil Çapı : M14
Net Ağırlık : 1.8kg
Akım : 3.2Ah
    `,
  
  },
  {
 id: 'm51',
    category: 'makineler',
    name: 'Makita 5008MG 1800 W 210 MM Daire Testere',
    brand: 'Makita',
    color: '#0ea5e9',
    image: 'images/5008.jpg',
 
    images: ['images/5008.jpg',],  
subcategory:'testere',
    description: `
       
Teknik Özellikler
Sürekli Akım Girişi 1800W
Kapasite 90derece:75,5mm / 45derece:57mm mm
Testere Ölçüleri 210x2x30mm
Boşta Devir 5200devir/dk
Net Ağırlık 5.1kg
Akım 8.2Ah
Uzunluk 332mm mm
Kablo Uzunluğu 2,5 m


Ürün Açıklaması
Çift yalıtımlıdır.
Servis ömrünü uzatmak amacıyla komple rulman yataklıdır.
Maksimum 50 derece açılı kesim imkanı vardır.
Testere kalkanı, daha hafif ve dayanıklı olan Magnezyum'dan imal edilmiştir.
Ambalaj içeriğinde elmaslı testere, anahtar ve kenar gönye mevcuttur.

    `,
  
  },
  {
 id: 'm52',
    category: 'makineler',
    name: 'Makita HS7601 190 mm. Sunta Kesme Makinesi 1200W ',
    brand: 'Makita',
    color: '#0ea5e9',
    image: 'images/190.jpg',
    featured:true,
    images: ['images/190.jpg',],  
subcategory:'testere',
    description: `

●Elektrikli enerji tipine sahip olması, sürekli ve kesintisiz çalışma imkanı sunar.


●30 mm altı bıçak çapına sahip olması, hassas kesimler yapabilmenizi sağlar.


Makita HS7601 190 mm. Sunta Kesme Makinesi 1200 W: Yüksek Performans 

Gelişmiş teknolojisi ve kaliteli malzemesi ile Makita HS7601, yüksek performanslı bir makinedir. Üstün teknik özellikleriyle dikkat çeken bu model, hem evdeki küçük işlerinizde hem de profesyonel atölye çalışmalarınızda vazgeçilmez bir yardımcınız olacaktır.


Makita HS7601 190 mm. Sunta Kesme Makinesi 1200 W: Uzun Ömür 

Dayanıklılığıyla ön plana çıkan Makita HS7601, uzun süreli kullanım imkanı sunar. Hem iç mekan hem de dış mekan uygulamalarında rahatlıkla kullanabileceğiniz bu ürün, yeşil rengiyle de estetik bir görünüm kazandırır.
    `,
  
  },
   {
 id: 'm53',
    category: 'makineler',
    name: 'STECHEND SX35 20V Akülü Darbeli Somun Sıkma ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx35.jpg',
 
    images: ['images/sx35.jpg',],  
subcategory:'',
    description: `
STECH-END AKÜLÜ DARBELİ SOMUN SIK. 4.0 Ah 20V SX35 1/2"

Tork: 500nm
0-2000r/dk – 0-2500r/dk
Kömürsüz Motor
1/2 inç kare çıkış mili
2 x 4.0Ah Akü
Taşıma çantası

    `,
  
  },{
 id: 'm54',
    category: 'makineler',
    name: 'Stechend SX52 2 x 4.0 Ah 6-30 MM Akülü Kırıcı Delici ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx52.jpg',
 featured:true,
    images: ['images/sx52.jpg',],  
subcategory:'matkap',
    description: `
STECHEND SX52-2*4.0 AH AKÜLÜ KIRICI DELiCi 6-30MM

AKÜ VOLTAJI                  20V
PİL KAPASİTESİ               4.0AH
DELME ÇAPI                    24MM
YÜKSÜZ HIZ                    0-1400R/MİN
DARBE FREKANSI           0-4800bpM
JOULE                              2,5J
NET AĞIRLIK                   2,05KG

    `,
  
  },{
 id: 'm55',
    category: 'makineler',
    name: 'Stech End SAT14125S Avuç Taşlama 125 mm 1400W ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sat14125s.jpg',
 
    images: ['images/sat14125s.jpg',],   
subcategory:'taşlama',
    description: `
Stech End SAT14125S Avuç Taşlama 125 mm 1400W
GİRİŞ VOLTAJI:220-240V

GİRİŞ GÜCÜ:1400W

DİSK ÇAPI:125MM

YÜKSÜZ HIZI:3000-10500 R/MİN

DEVİR AYARI:6 KADEME

MİL BOYUTU:M14

AĞIRLIK:2,2 KG

    `,
  
  },{
 id: 'm56', 
    category: 'makineler',
    name: 'StechEnd SAT13125 125mm Avuç Taşlama 1300W ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sat13125.webp',
 
    images: ['images/sat13125.webp',],  
subcategory:'taşlama',
    description: `
StechEnd SAT13125 125mm Avuç Taşlama 1300W Giriş voltajı: 220-240VGiriş gücü: 1300WDisk çapı: 125mmYüksüz hızı: 11500 dkAğırlık: 2,1kg

    `,
  
  },{
 id: 'm57',
    category: 'makineler',
    name: 'Stechend SAT75115 750 W Avuç Taşlama ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sat13125.webp',
 
    images: ['images/sat13125.webp',],  
subcategory:'taşlama',
    description: `
Stechend SAT75115 Avuç Taşlama 115 mm 750 W



TEKNİK ÖZELLİKLER: 

Makine gerilimi: 230V
Frekans: 50Hz 
Watt gücü: 750W
Disk çapı: 115mm
Yüksüz devir hızı: 11500 d/dk
Ağırlık: 1,7kg

    `,
  
  },{
 id: 'm58',
    category: 'makineler',
    name: 'Stechend SX22-2X4.0 Çift Akülü Kömürsüz Darbeli Matkap Vidalam 20V 4.0Ah 60Nm',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/SX22.webp',
 
    images: ['images/SX22.webp',],  
subcategory:'matkap',
    description: `
Stechend SX22-2X4.0 Çift Akülü Kömürsüz Darbeli Matkap Vidalam 20V 4.0Ah 60Nm

Yeni nesil fırçasız (Kömürsüz) motor
Vidalama, delme ve darbeli delme modu
20 kademeli tork ayarı, 2 Vites
4 kademeli şarj göstergeli,
20V 4Ah Lityum batarya
Yüksek Hızlı Şarj Adaptörü
Yüksek kalite çelik otomatik metal mandren
Mandren uç kapasitesi: 3-13 mm
Led aydınlarma
Maksimum 60Nm tork
1.Vites devir: 0-450 rpm
2.Vites devir: 0-2000 rpm
Ağırlık: 1.72 kg (akü takılı)

Teslimat İçeriği
1 Adet - Akülü Matkap
2 Adet - 20V 4.0Ah Liyon akü
1 Adet - Şarj cihazı
1 Adet - Plastik taşıma çantası
1 Adet - Kullanım kılavuzu

    `,
  
  },{
 id: 'm59',
    category: 'makineler',
    name: 'Stechend SDT185 1500 W Daire Testere ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sdt185.webp',
 
    images: ['images/sdt185.webp',],  
subcategory:'testere',
    description: `
Güç:  1500W
Disk Çapı:  185 mm
Maks. Devir:  0-5500 d/dk

Ürün Açıklaması
Daire testere, ahşap, plastik, metal gibi birbirinden farklı materyalleri keser. Düz - eğri ve dalma, gerçekleştirdiği kesim türlerinden bazılarıdır. Marangozluk sektöründe, tadilat işlerinde, DIY projeleri ve el sanatları gibi alanlarda kullanılabilir.




    `,
  
  },{
 id: 'm60',
    category: 'makineler',
    name: 'Stechend SSH2000 Sıcak Hava Tabancası ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sıcakhava.webp',
 
    images: ['images/sıcakhava.webp',],  
subcategory:'',
    description: `
Stechend SSH2000 Sıcak Hava Tabancası
Sıcak hava tabancası, farklı sıcaklık ayarlarına sahip olmakla birlikte birçok materyali ısıtmak ya da eritmek için kullanılır. Bu ürünle eski boya katmanını yumuşatarak kazıyabilir, elektronik malzemeleri lehimleyebilirsiniz. DIY projelerinde bazı yapıştırıcı türlerini eritmek ya da yapıştırmak için de kullanılmaktadır. Ayrıca donmuş nesneleri çözdürmeye ve boya-vernik gibi maddeleri kurutmaya da imkan sağlar.

2 kademeli anahtara sahiptir.
1. kademede 50 °C - 100 °C - 150 °C - 200 °C - 250 °C - 350 °C
2. kademede ise 100 °C - 200 °C - 300 °C - 400 °C - 500 °C - 600 °C sıcaklıklarla çalışma imkanı sunar.

Güç: 2000 Watt

    `,
  
  },{
 id: 'm61',
    category: 'makineler',
    name: 'Stechend SM1800 Boya Harç Karıştırıcı ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sm1800.webp',
 
    images: ['images/sm1800.webp',],  
subcategory:'',
    description: `
Stechend SM1800 Boya ve Harç Karıştırıcı 1800W Motor Gücü: 1800 W1. Vites 180-400 devir/dakika2. Vites 300-700 devir/dakikaM14 Karıştırma Ucu

    `,
  
  },{
 id: 'm62',
    category: 'makineler',
    name: 'Stechend SBT20180 180mm Büyük Taşlama 2000w ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sat13125.webp',
 
    images: ['images/sat13125.webp',],  
subcategory:'taşlama',
    description: `
StechEnd SBT20180 180mm Büyük Taşlama 2000w

Giriş voltajı: 220-240V
Giriş gücü: 2000W
Disk çapı: 180mm
Yüksüz hızı: 6500 dk
Ağırlık: 5,7kg

    `,
  
  },{
 id: 'm63', 
    category: 'makineler',
    name: 'Stechend SLM60 Lazer Metre 60M ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/slm.webp',
 
    images: ['images/slm.webp',],  
subcategory:'',
    description: `
StechEnd SLM60 Lazer Metre 60M

StechEnd SLM60 Lazer Metre, 60 metreye kadar olan mesafelerde hassas ölçümlerin yapılmasını sağlar. ±(2.0mm+5x10⁵D) ölçüm keskinliği ile yüksek doğruluk sunan bu cihaz, geniş bir kullanım aralığına sahiptir. Hafızasında 30 farklı ölçüm değeri saklayabilir ve ölçüm referansını ön, tripod veya arka olarak ayarlayabilirsiniz. 490-670nm, <1mW sınıfında lazer teknolojisi ile güvenli ve etkili kullanım sağlar. Cihazın 3 farklı ölçüm ünitesi mevcuttur: metre, feet ve inç.

Bu lazer metre, inşaat, iç mekan düzenleme ve teknik işler için ideal bir çözümdür. 3 adet AAA alkalin pil ile çalışmaktadır. 

Ölçüm Aralığı : 0,2 - 60m
Ölçüm Keskinliği : ±(2.0mm+5x10⁵D)
Hafıza : 30 Değer
Ölçüm Referansı : Ön / Tripod / Arka
Lazer Sınıfı : Sınıf 2
Lazer Türü : 490-670nm, <1mW
Ölçüm Birimleri : m / ft / in / ft+in
Pil : 3 x AAA alkalin pil

    `,
  
  },
 

 
  {
 id: 'm69', 
    category: 'makineler',
    name: 'STECHEND SP180 Polisaj 1400W',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sp180.webp',
 
    images: ['images/sp180.webp',],  
subcategory:'',
    description: `
StechEnd SP180 Polisaj 1400W

StechEnd SP180 Polisaj, 1400W motor gücü ve 180mm disk çapı ile profesyonel polisaj ve parlaklık oranlarında yüksek performans sunar. 600-3500 d/dk arası ayarlanabilir hız kontrolü sayesinde farklı özelliklerde hızlarla çalışma imkanı sunar. Düzenli, ergonomik tutamaz, uzun süreli aralıklarda bile kalıcılık sağlar. Mil kilidi ile disk değiştirme işlemleri hızlı ve kolay yapılabilir. Ayrıca hız ayarlayıcı ve Açma/Kapama düğmesi ile tam kontrol sağlar.

StechEnd SP180 Polisaj, araç kaplama, metal yüzeylerin parlatılması gibi işlemler için ideal bir çözümdür. 

Giriş Voltajı : 220-240V
Motor Gücü : 1400W
Yüksüz Hız : 600-3500 d/dk
Disk Çapı : 180mm
Tutamak : D Şekilli Tutamak
Mil Bölümü : Var
Hız Ayarı : Var
Açma/Kapama Anahtarı : Var


    `,
  
  },
  {
 id: 'm70', 
    category: 'makineler',
    name: 'STECHEND SDM400 Darbesiz Matkap 400W 0-3000 r/dk',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sdd400.webp',
 
    images: ['images/sdd400.webp',],  
subcategory:'matkap',
    description: `
StechEnd SDM400 Darbesiz Matkap, 400W motor gücü ve 0-3000 r/dk yüksüz hız ile çeşitli delme ve montaj işleri için ideal bir çözümdür. Kompakt ve hafif tasarımı sayesinde rahat taşınabilir ve uzun ömürlü konfor sunar. 10mm mandren kapasitesi, geniş bir yelpazede delik delme seçeneklerinin kullanılmasına olanak sağlar. 220V - 50Hz giriş kurulumu ile evde ve atölyede kullanıma uygundur.

Bu darbesiz matkap, özellikle ahşap, plastik ve hafif metallerde etkili bir performans sunar. 

Giriş Voltajı : 220V - 50Hz
Motor Gücü : 400W
Yüksüz Hız : 0-3000 d/dk
Mandren Kapasitesi : 10mm


    `,
  
  },
  {
 id: 'm71', 
    category: 'makineler',
    name: 'STECHEND BÜYÜK TAŞLAMA 2000W 230MM SBT20230',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sat13125.webp',
 
    images: ['images/sat13125.webp',],  
subcategory:'taşlama',
    description: `
STECHEND BÜYÜK TAŞLAMA 2000W 230MM SBT20230

Ürün Özellikleri

Giriş Voltajı : 220-240V
Motor Gücü : 2000W
Disk Çapı : 230mm
Yüksüz Hız : 6500 d/dk
Mil Boyutu : M14
Ağırlık : 4,1 Kg


    `,
  
  },
  {
 id: 'm72', 
    category: 'makineler',
    name: 'STECHEND SAT95115 Avuç Taşlama 115 mm 950 W',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sat13125.webp',
 
    images: ['images/sat13125.webp',],  
subcategory:'taşlama',
    description: `
Stechend SAT95115 Avuç Taşlama 115 mm 950 W



TEKNİK ÖZELLİKLER: 

Makine gerilimi: 230V
Frekans: 50Hz 
Watt gücü: 950W
Disk çapı: 115mm
Yüksüz devir hızı: 11500 d/dk
Ağırlık: 1,8kg


    `,
  
  },
  {
 id: 'm73', 
    category: 'makineler',
    name: 'STECHEND SX62 SOLO ŞARJLI DAİRE TESTERE ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/sx62.webp',
 
    images: ['images/sx62.webp',],  
subcategory:'testere',
    description: `
STECHEND SX62 SOLO ŞARJLI DAİRE TESTERE (AKÜSÜZ)
 
STECHEND SX62 Solo Şarjlı Daire Testere, akü içermeyen kompakt yapısı ile daire kesim işlemlerinde yüksek performans sunan, dayanıklı ve ergonomik bir testeredir. STECH şarjlı sistemleriyle uyumlu olarak tercih edilebilir.
Kullanım Alanları:
- Daire kesim işlemleri
- İnşaat ve tadilat
- Endüstriyel kesim uygulamaları
Teknik Özellikler
Kutu İçeriği:(Batarya ve şarj aleti dahil değildir.)
Tip: Daire testere
Gerilim: 20V (uyumlu şarjlı sistem)
Devir Hızı: 5000rpm
Testere Bıçağı Çapı: 165mm
Maksimum Kesme Derinliği: 0-57mm
Kesim açısı: 0-45*
Tasarım: Kompakt, ergonomik
Uygulama: Kesim verimliliği


    `,
  
  },
  {
 id: 'm74', 
    category: 'makineler',
    name: 'Stechend STK210 Tilki Kuyruğu 1200w ',
    brand: 'STECHEND',
    color: '#0ea5e9',
    image: 'images/stk210.webp',
 
    images: ['images/stk210.webp',],  
subcategory:'',
    description: `
Stechend STK210 Tilki Kuyruğu 1200w Giriş voltajı 220-240VGiriş gücü 1200w Yüksüz hızı 0-2800r/dkVuruş Maksimum kesme 210mm Vuruş uzunluğu 30mm Kesme desteği kilit tuşu Orbital kesme eylemi Değişken hızlı tetik


    `,
  
  },
  
  
 

//El aletleri--------------------------------------------

  /////////////////////////
  {
    id: 'ea1',
    category: 'el-aletleri',
    name: 'İzeltaş Pense',
    brand: 'İzeltaş',
    color: '#22c55e',
    image: 'images/pense.jpg',
    images: ['images/pense.jpg',],
subcategory:'pense',
    stock: 25,
    description: `Pense Ölçüleri.

![Kutu İçeriği](images/ss.png)

`,
   
  },
  {
    id: 'ea2',
    category: 'el-aletleri',
    name: 'İzeltaş Açık Ağız Anahtar',
    brand: 'İzeltaş',
    color: '#f97316',
    image: 'images/açık.jpg',
    subcategory:'el aletleri',
    images: [],
    stock: 40,
    description: 'Ölçüler:6x7, 8x9, 10x11, 12x13, 14x15, 16x17, 18x19, 20x22, 21x23, 24x26, 25x28, 27x32, 30x32',
    features: ['Krom Vanadyum, Krom Kap'],
  },
  {
    id: 'ea3',
    category: 'el-aletleri',
    name: 'İzeltaş Kombine Anahtar',
    brand: 'İzeltaş',
    color: '#f97316',
    image: 'images/kombine.jpg',
    images: [],
    stock: 40,
    description: 'Ölçüler:8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,23, 24, 25, 26, 27, 28, 29, 30, 32',
    features: ['Krom Vanadyum, Krom Kap'],
  },
  {
    id: 'ea4',
    category: 'el-aletleri',
    name: 'İzeltaş Cırcır Kombine  Anahtar',
    brand: 'İzeltaş',
    color: '#f97316',
    image: 'images/cırcır.jpg',
    images: [],
    featured:true,
    stock: 40,
    description: 'Ölçüler:8,9,10, 11, 12, 13, 14, 15, 16, 17, 18, 19,21, 22, 24, 27, 30, 32',
    features: ['Krom Vanadyum, Krom Kap'],
  },
   {
    id: 'ea5',
    category: 'el-aletleri',
    name: 'İzeltaş Yıldız İki Ağız Anahtar',
    brand: 'İzeltaş',
    color: '#f97316',
    image: 'images/yıldız.jpg',
    images: [],
    stock: 40,
    description: 'Ölçüler:6x7, 8x9, 10x11, 12x13, 14x15, 16x17, 18x19, 20x22, 21x23, 24x26, 25x28, 27x32, 30x32',
    features: ['Krom Vanadyum, Krom Kap'],
  },
   {
    id: 'ea6',
    category: 'el-aletleri',
    name: 'İzeltaş Kurbağacık Anahtar',
    brand: 'İzeltaş',
    color: '#f97316',
    image: 'images/kurba.jpg',
    images: [],
    stock: 40,
     description: `Kurbağacık Ölçüleri.

![Kutu İçeriği](images/kurba1.png)

`,
    features: ['Krom Vanadyum, Krom Kap'],
  },
 
{
    id: 'ea8',
    category: 'el-aletleri',
    name: 'Bosch Profesyonel Pense 180MM',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/bosch180.jpg',
   subcategory: 'pense ',
    images: ['images/bosch180.jpg',],  
featured:true,
    description: `
    Bosch Profesyonel Pense 180MM
Yüksek mukavemetli krom vanadyum çelik saplar ve özel olarak sertleştirilmiş kesici kenarlar sağlam ve dayanıklıdır. Optimize edilmiş uzun tasarımı sayesinde standart ürünlere göre daha az çabayla kesme işlemi yapılabilir Yumuşak kauçuk kavraması ve kaymaz kenarları, özellikle tek elle rahat ve güvenli kullanım sağlar.

    `,
  
  },
  {
    id: 'ea9',
    category: 'el-aletleri',
    name: 'Bosch Profesyonel Yankeski 160MM',
    brand: 'Bosch',
    color: '#0ea5e9',
    image: 'images/bosch160.jpg',
   subcategory: 'pense ',
    images: ['images/bosch160.jpg',],  

    description: `
    • Yüksek mukavemetli krom vanadyum çelik saplar ve özel olarak sertleştirilmiş kesici kenarlar sağlam ve dayanıklıdır.
• Optimize edilmiş uzun tasarımı sayesinde standart ürünlere göre daha az çabayla kesme işlemi yapılabilir.
• Yumuşak kauçuk kavraması ve kaymaz kenarları, özellikle tek elle rahat ve güvenli kullanım sağlar.

    `,
  
  },
  
]

export default products
