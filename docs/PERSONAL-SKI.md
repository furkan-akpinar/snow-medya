# Kişisel kayak çekimi revizesi

Site, ziyaretçinin kendi kayak gününü profesyonel bir ekiple sinematik filme
dönüştürebileceğini anlatır. Ana sayfa, mevcut dört sayfa, seçki açıklamaları,
menü, footer ve arama motoru açıklaması bu konsepte uyarlandı. Seçkinin
konsept/stok görüntü olduğu bilgisi korundu. Fiyat, garanti, müşteri yorumu,
ekip üyesi veya deneyim rakamı eklenmedi. İletişim kanallarının henüz hazır
olmadığını belirten mevcut durum açıkça korunur.

## Tasarım ve davranış

- Dört menü maddesi: 01 Filmler, 02 Çekimler, 03 Ekibimiz, 04 İletişim.
  Rotalar sırasıyla #/isler, #/hizmetler, #/hakkimizda ve #/iletisim olarak
  kaldı. Sayfa başlıkları, footer ve erişilebilir bağlantı adları güncellendi.
- Menü fontu, boyutu, turkuaz zemin, hizalama, hover ve animasyon kodu aynı.
- Header yazıları aynı Inter ailesinde, 600 ağırlıkta; 1440 CSS pikselde
  25,92 px, 390 CSS pikselde 19,5 px. Header yüksekliği ve logo yerleşimi aynı.
- Intro logosu mevcut header SVG'si ve marka yazısının birebir kopyasıdır.
  Yeni logo veya medya üretilmedi. Katman %75 opaklıkta, dekoratif ve
  pointer-events: none; merkezine tıklamak oynatıcı açmaz.
- Eski intro düğmesi/yazısı ve bunlara özel CSS kaldırıldı. Otomatik video
  kurulumu oynat düğmesinin varlığına bağımlı olmaktan çıkarıldı. Paylaşılan
  oynatıcı kodu korundu; introya bir açma dinleyicisi eklenmez.
- Video dosyaları, posterler, kaynak kayıtları, renkler, font ailesi, bölüm
  sırası, görsel yerleşimleri ve GSAP/Lenis geçiş süreleri korundu. Yeni
  bağımlılık veya sayfa eklenmedi. Manifestonun ana başlığı aynıdır.

## Doğrulama

Önceki üretim çıktısı ve yeni sürüm 1440×900 ve 390×844 gerçek CSS viewport
ölçülerinde karşılaştırıldı. Her ölçüde taze yükleme kullanıldı. Ekran
görüntüleri, intro kayıtları ve DOM ölçümleri yalnızca Git dışında kalan
artifacts/personal-ski/ dizininde tutulur.

- Ana sayfanın ve dört mevcut sayfanın bölüm yükseklikleri karşılaştırıldı.
  Mobilde ek satır oluşturan metinler kısaltıldı; mevcut satır düzeni korundu.
- Menüde dört bağlantı masaüstü/mobilde doğru rotayı açtı ve menü kapandı.
  Yeni menü metinlerinde yatay taşma görülmedi. Kapatma/Esc davranışı korundu.
- Header yazıları eşit boyut/ağırlıkta; orta logo ile çakışmıyor. İletişim
  bağlantısı mevcut iletişim sayfasını açıyor.
- Logo header işaretiyle aynı, opaklığı 0,75, tıklama katmanı yok. Arka plan
  videosu aynı masaüstü/mobil kaynakla otomatik ve sessiz oynuyor.
- Hareket azaltma yerel test sayfasında benzetildi: intro doğrudan son
  yerleşime geçiyor; poster ve logo görünür, otomatik video oluşturulmuyor.
- Fiziksel telefon, dokunmatik donanım ve farklı tarayıcı motorları denenmedi.

Check, build, format:check ve check:release başarılıdır. Ana sayfanın ve
dört sayfanın ölçülen bölüm yükseklikleri önceki sürümle eşleşir. Yerelde
yapılan header noktaları ve menü Kapat metni düzenlemeleri korundu; ×
düğmesine görünmeyen "Menüyü kapat" erişilebilir adı eklendi. Geçici test
dosyaları, ekran kayıtları, dist ve node_modules commit'e dahil edilmez.
