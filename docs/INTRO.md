# Otomatik intro — 10 Eylül 2026

Güncel içerik revizesinde intro üzerindeki yazı/oynat düğmesi dekoratif Snow
Medya logosuyla değiştirildi. Aşağıdaki orta süre ayarı korunur. Bu katman
değişikliğinin doğrulaması [PERSONAL-SKI.md](PERSONAL-SKI.md) dosyasındadır.

Bu revize, önceki kaydırma/scrub introsunun yerine geçer. Ana görsel referans,
kullanıcının sağladığı **Kayıt 2026-09-10 101638.mp4** dosyasıdır. Referans
yalnızca incelendi; siteye veya Git deposuna eklenmedi.

## Kayıtta gözlenen sıra

23,45 saniyelik 1918×952 kayıttan zaman damgalı kareler çıkarıldı. Masaüstü
açılışı ilk bölümde; mobil tekrar yaklaşık 15,5 saniyede başlıyor. Mobil
geliştirici araçlarında 440×956 CSS viewport yazıyor. Kayıt bu mobil ekranın
alt kısmını kısmen kesiyor; görünmeyen alan için birebir eşleşme iddiası yok.

| Aşama                                    | Referans masaüstü kaydı | Uygulanan zaman çizelgesi* |
| ---------------------------------------- | ----------------------- | -------------------------- |
| WE ARE harflerinin perspektifli açılması | yaklaşık 0,7–1,4 sn     | 0,55–1,48 sn               |
| Marka harflerinin soldan sağa açılması   | yaklaşık 1,2–1,9 sn     | 1,05–2,00 sn               |
| Küçük medyanın yer açarak görünmesi      | yaklaşık 1,8–2,8 sn     | 1,75–2,43 sn               |
| Aynı medyanın tam ekrana büyümesi        | yaklaşık 3,9–4,6 sn     | 2,73–3,33 sn               |
| Açık manifesto yüzeyinin yükselmesi      | yaklaşık 5,2–5,8 sn     | 3,63–4,18 sn               |
| Manifesto harflerinin sırayla düzleşmesi | yaklaşık 5,5–6,7 sn     | 3,73–5,18 sn               |

*Uygulama süreleri font/poster hazırlığından sonra başlar. Referans zamanları
kayıttaki karelerden yaklaşık ölçüldü; metinler ve font oranları farklıdır.
Mevcut Barlow Condensed korunur; Manuka ile birebir font eşleşmesi yoktur.

### Güncel orta süre ayarı

Son hızlı sürüm kısa bulunduğu için önceki uzun sürüm ile hızlı sürümün
sürelerinin ortalaması alındı: küçük alan 0,675 saniyede açılır, 0,3 saniye
bekler ve 0,6 saniyede tam ekrana büyür. Tam ekran anı önceki sürümlerdeki
4,00 ve 2,65 saniyenin tam ortası olan 3,325 saniyedir. Toplam intro yaklaşık
5,18 saniye sürer. Yazı hareketleri ve tam ekran sonrası bekleme korunur.

1440×900 ve 390×844 gerçek CSS viewport'larda yeniden kaydedilip doğrulandı.
Belge hazırlığı dahil tam ekran anı masaüstünde 3,41, mobilde 3,35 saniye
ölçüldü. Video elemanı değişmedi; tek metadata yüklemesi, sabit font boyutu,
taşmasız son yerleşim ve kullanılabilir normal kaydırma doğrulandı.
Check, build ve format:check başarılıdır. Bu sürümün kayıt ve ölçümleri
Git dışında artifacts/intro-medium/ dizinindedir.

### Önceki hızlı büyüme ayarı

Kullanıcının videonun hâlâ geç büyüdüğünü belirtmesi üzerine küçük alanın
açılması 0,45 saniyeye indirildi, küçük alandaki bekleme kaldırıldı ve tam
ekrana büyüme 0,45 saniye yapıldı. Video 2,20. saniyede büyümeye başlar ve
2,65. saniyede tam ekran olur. Yazı hareketlerinin süreleri korunur.

src/main.js içindeki mediaStart, mediaRevealDuration, mediaHoldDuration,
mediaExpandDuration ve fullVideoHoldDuration değerleri tek ayar noktasıdır.
Aşama etiketleri ve takip eden animasyonlar bu değerlerden hesaplanır;
aynı başlangıç zamanını birden fazla satırda elle değiştirmek gerekmez.

Son doğrulamada gerçek CSS viewport'lar 1440×900 ve 390×844 ölçüldü.
Belge hazırlığı dahil video masaüstünde 2,73, mobilde 2,68 saniyede tam
ekran oldu. Aynı video elemanı ve tek metadata yüklemesi korundu; yatay
taşma, intro sırasında kaydırma veya font boyutu değişmesi görülmedi.
Son harf dönüşümleri temizlendi ve mobilde normal kaydırma çalıştı.
Yeni ekran kayıtları ve ölçümler yalnızca artifacts/intro-fast/ içindedir.
Check, build, format:check ve check:release kontrolleri başarılıdır.

### Önceki video bekleme süresi revizesi

**Kayıt 2026-09-10 210113.mp4** (6,85 sn, 1918×948) incelendikten sonra,
kullanıcının beklemeyi yarıya indirme isteği uygulandı. Küçük medya açıldıktan
sonraki bekleme 1,2 saniyeden 0,6 saniyeye; video tam ekran olduktan sonraki
bekleme 0,6 saniyeden 0,3 saniyeye indirildi. Büyümenin, yazı hareketlerinin ve
harf gecikmelerinin süreleri korundu. Bu önceki revizede toplam sekans
yaklaşık 6,75 yerine 5,85 saniyeydi; yukarıdaki tablo güncel orta süre
revizesinin zamanlamasını gösterir.

Bu süre revizesi gerçek 1440×900 ve 390×844 CSS viewport'larda tekrar
kaydedilip ölçüldü. Tam ekran ile manifesto başlangıcı arasında her iki
ölçümde yaklaşık 0,30 saniye var. Video elemanı değişmedi, tek metadata
yüklemesi görüldü; yatay taşma veya font boyutu değişmesi olmadı. Mobilde
PageDown/PageUp sonrası intro tamamlanmış durumda kaldı. Yeni kayıtlar ve
ölçümler Git dışında artifacts/intro-timing/ dizinindedir. Check, build,
format:check ve check:release başarılıdır.

Masaüstünde WE / medya / ARE aynı satırda, Snow Medya aşağıdadır. Mobilde
WE ARE, medya ve marka üç kat halinde dizilir. Kaydın mobil medya alanı
yaklaşık 4:3 oranındadır; mevcut dikey kayak videosu bu alanda cover ile
gösterilir, ardından aynı eleman dikey ekranı doldurur.

## Uygulama

- Tek otomatik GSAP timeline kullanılır. Introya bağlı pin/scrub kaldırıldı.
  İlk büyük manifesto başlığını yöneten başka bir animasyon yoktur.
- Giriş ve manifesto yazıları kelime/harf span'leriyle bölünür. Harfler
  aşağıdan rotateX ve hafif rotateZ ile açılır. Manifesto harfleri arasında
  32 ms gecikme vardır; tüm satıra opacity animasyonu uygulanmaz.
- Arka plan video elemanı yeniden oluşturulmaz veya başka kapsayıcıya
  taşınmaz. Küçük alanın koordinatları aynı film alanına uygulanır; büyüme
  src, currentTime veya load durumunu sıfırlamaz.
- Video tam ekran olduktan sonra manifesto kendi son yerleşimine yükselir.
  Sonunda geçici transform'lar temizlenir; başlık normal sayfa akışındadır.
- Font ve poster hazırlığı en fazla 1,8 saniye beklenir. Font hâlâ hazır
  değilse animasyon atlanır. Video beklenmez; mevcut poster kullanılabilir.
- Başlık ölçümü dönüşmemiş kelime kutularından yapılır ve piksel cinsinden
  sabitlenir. Ölçü değiştiğinde yeniden hesaplanır. Türkçe işaretler için
  maskenin üst payı korunur.
- Intro sırasında wheel/touchmove ve kaydırma tuşları ilerlemeyi değiştirmez.
  Yenilemeden taşınabilecek eski scroll konumu sıfırda tutulur. Sekans
  bitince normal kaydırma açılır; aşağı/yukarı gitmek veya rota dönüşü onu
  yeniden başlatmaz. Menü/oynatıcı kilitleriyle birlikte çalışır.
- Hareket azaltmada doğrudan poster ve düz başlık gösterilir; intro kilidi,
  otomatik video ve pin kurulmaz.

## Tarayıcı doğrulaması

Gerçek CSS viewport'lar her karede ölçüldü: **1440×900** ve **390×844**.
Tarayıcının mevcut 1,4 ölçeği için araca 2016×1260 ve 546×1182 verildi.

- İlk belge yükleme ve yenileme, intro sırasında PageDown, intro sonrası
  ileri/geri kaydırma kontrol edildi. Intro sırasında scrollY 0 kaldı;
  sonrasında normal kaydırma çalıştı ve intro yeniden başlamadı.
- Masaüstünde başlık 129,6 px, mobilde 50,7 px olarak sekans boyunca sabit.
  Yatay taşma yok. Son harf transform'ları none; harfler düz ve okunabilir.
- Her iki ölçümde arka plan video kimliği değişmedi; bir metadata yüklemesi
  görüldü. Aynı 4274798 kaynağı kullanıldı. Ek intro pin'i bulunmadı.
- Hareket azaltma yerel test sayfasında matchMedia ile benzetildi.
  Masaüstü/mobilde pin yok, başlık düz, poster mevcut, otomatik video src'leri
  boş ve sayfa kullanılabilir.
- Font ready durumunun tamamlanmaması benzetildi: bekleme sınırından sonra
  intro tamamlandı, kilit ve transform kalmadı, yatay taşma oluşmadı.
- Video src ataması 4,5 saniye geciktirilerek test edildi: küçük medya
  aşamasında poster görünür kaldı; video yaklaşık 4,60 saniyede hazır oldu.
  Aynı video elemanı devam etti, ikinci metadata yüklemesi olmadı.
- Üretim derlemesinde masaüstü tekerlek kaydırması 336 px ilerledi ve
  ters yönde 0'a döndü; intro complete durumunda kaldı. Mobilde PageDown
  739 px ilerledi ve geri dönüş introyu yeniden başlatmadı.
- Üretim oynatıcısı aynı 4274798 masaüstü/mobil dosyasını açtı, arka plan durdu.
  Yerel kontroller korundu; Esc kapattıktan sonra sayfa kullanılabildi.
- Üretim tarayıcısının hata/uyarı kaydı boştu. Teslim kayıtları masaüstünde
  1440×900 / 145 kare / yaklaşık 9 sn, mobilde 390×844 / 389 kare / yaklaşık
  9 sn. MP4 boyutları sırasıyla 3,77 MB ve 1,78 MB; bunlar site medyası değildir.

Kayıtlar ve ölçüm JSON'ları yalnızca Git dışında kalan
artifacts/auto-intro/ dizinindedir. Masaüstü ve mobil MP4 kayıtları,
gerçek tarayıcı ekran görüntülerinden gerçek zaman damgalarıyla oluşturuldu;
animasyon sonradan taklit edilmedi. Yakalama hızı tarayıcı aracının hızına
bağlıdır; bu kayıtlar performans/FPS benchmark'ı değildir. Fiziksel telefon
ve farklı tarayıcı motorları test edilmedi.

## Kaynak ve teslim

Uygulama değişiklikleri src/main.js ve src/styles.css ile sınırlıdır.
Mevcut medya, kaynak kayıtları, paket kilidi, oynatıcı ve diğer bölümler
korundu. Yeni bağımlılık eklenmedi. README ve bu rapor güncellendi.

npm.cmd run check ve npm.cmd run build başarılı; 35 gerekli varlık bulundu.
Git geçmişi korunur; geçici kayıtlar, dist, node_modules ve ortam dosyaları
commit dışında kalır. Gönderim hedefi
[furkan-akpinar/snow-medya](https://github.com/furkan-akpinar/snow-medya), dal main.
