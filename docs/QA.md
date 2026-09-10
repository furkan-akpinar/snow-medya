# Snow Medya — altı revizenin doğrulaması

10 Eylül 2026 intro değişikliği ve Git hazırlığı için güncel kayıt:
[INTRO.md](INTRO.md). Aşağıdaki rapor önceki altı revizenin 9 Eylül durumudur.

9 Eylül 2026. Güncel altı maddelik plan uygulandı. Önceki video değiştirme görevi sürdürülmedi; 4274798 yeniden indirilmedi. Mevcut dosyalar topluca geri alınmadı. Bu klasörde Git deposu bulunmuyor.

## Revizeler ve doğrulanan nedenler

1. **Tipografi çakışması düzeltildi.** Önceki sürümde gerçek 1440×900 tarayıcıda, yaklaşık 3664 px kaydırmada “HİKÂYE ANLATIMI” ve “VE UYGULAMA” aynı 9–136 px dikey aralığa sıkıştı. Mutlak konumlandırılmış satır kapsayıcılarının ortak alt sınırı, ayrı sticky satırları aynı noktada durduruyordu. Açıklama ve CTA içeren daha uzun kapanış da bu alana giriyordu. Satırlar artık normal akışta kendi yüksekliklerini ayırıyor. Masaüstünde tek kapsayıcı sabitleniyor; grup birlikte yükseliyor. Açıklama ve CTA kendi alanında. Ölçümler fontlar hazırken ve resize sırasında yenileniyor. Tüm sayfaya taşmayı gizleyen yeni bir kural eklenmedi.
2. **Geçiş kararması kaldırıldı.** Kaynakta tüm karta uygulanan GSAP `brightness(0.48)`, hover'daki `brightness(0.85)` ve siyah rota örtüsü tespit edildi. Bunlar kaldırıldı; ölçek hareketi ve hafif sabit kart gradient'i korundu. Kart geçişinde ölçülen filter `none`, opacity `1`. Yeni detay posteri çözülene kadar mevcut sayfa görünür kalıyor; giriş yalnızca kısa bir konum hareketi kullanıyor.
3. **Giriş başlığı alttan yükseliyor.** Başlangıç konumu animasyon kurulmadan hazırlanıyor. Hareket kaydırmaya bağlı; zaman gecikmesine veya yalnızca opacity değişimine dayanmıyor. Maskeler satırlara ait; Türkçe karakterler için pay bırakıldı. [Canlı referansta](https://www.sadumedia.com/) açık alanın sınırıyla giriş başlığının birlikte yukarı geldiği, sonraki satırların aşağıdan girdiği ileri/geri kaydırmada görüldü. Referansın kaynak kodu veya marka varlıkları projeye alınmadı.
4. **Hakkımızda bloğunun tamamına video eklendi.** Dağ ve teleferiklerin sakin hava çekimi tüm bloğu dolduruyor. Başlık, açıklama ve buton önde; masaüstü ve mobilde gradient ile okunuyor. Tablet ölçümünde video kapsayıcısı ve bölüm aynı 757,14×1108,35 px alanı kapladı. Mobil poster görünümü de incelendi.
5. **İlk üç proje ayrı videolar kullanıyor.** Kayak, snowboard ve kayak merkezi içerikleri eşleştirildi. Kart boyutları, yuvarlatma, metinler, etiketler ve bağlantılar korundu. Kısa yatay snowboard kartında dikey videonun üst gövdeyi kestiği mobil testte görüldü; aynı kaynaktan yatay mobil sürüm üretildi. Detay sayfasının dikey mobil sürümü ayrı. Masaüstü snowboard kadrajı üst kenara hizalanarak başın kesilmesi giderildi.
6. **Marka Snow Medya oldu.** Header, menü, footer, SM monogramı, sayfalar, proje etiketleri, oynatıcı, erişilebilirlik etiketleri, metadata, README, paket ve kaynak kayıtları güncellendi. Aktif kaynaklarda eski marka kullanımı bulunmadı. Spor adı “kayak” ve üçüncü taraf lisans bilgileri korundu. Paket kilidinde yalnızca kök proje adı değişti; bağımlılık verisinin aynı kaldığı karşılaştırıldı.

## Videolar

Kaynak sayfaları ve [Pexels lisansı](https://www.pexels.com/license/) kontrol edildi. Dosyalar yerel `public/assets/` içindedir; web sayfası adresleri video src olarak kullanılmaz. Ayrıntılı üretim, poster, byte ve SHA-256 kayıtları `public/assets/provenance.json` içindedir. MB değerleri ondalıktır.

| Alan / üretici / kaynak                                                                                                    | Masaüstü             | Mobil                                             | Süre     |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------------------------------------------------- | -------- |
| Hakkımızda — Igor Deshkin / [4161595](https://www.pexels.com/video/drone-shot-over-a-ski-resort-4161595/)                  | 1600×900 · 3,19 MB   | 720×1280 · 1,66 MB                                | 12 sn    |
| İlk İz — Ella Wei / [11246371](https://www.pexels.com/video/skiing-down-slope-11246371/)                                   | 1280×720 · 4,81 MB   | 720×960 · 2,32 MB                                 | 9,5 sn   |
| Yerçekimine Karşı — Be The Observer / [6947516](https://www.pexels.com/video/a-person-snowboarding-downhill-6947516/)      | 1600×900 · 6,06 MB   | Kart: 960×540 · 2,42 MB; detay: 720×960 · 2,42 MB | 10 sn    |
| Zirvede Bir Gün — Grisha Grishkoff / [4185345](https://www.pexels.com/video/a-drone-shot-over-a-ski-resort-4185345/)       | 1600×844 · 3,75 MB   | 720×960 · 1,24 MB                                 | 8,38 sn  |
| Korunan açılış — Adrien JACTA / [4274798](https://www.pexels.com/tr-tr/video/kayak-montagne-kayakci-kayak-yapmak-4274798/) | 1920×1080 · 11,62 MB | 720×1280 · 3,25 MB                                | 14,12 sn |

Yeni dokuz MP4, H.264/yuv420p, 24 fps ve faststart ile hazırlandı; ses kanalı içermez. Dokuz dosyanın tüm kareleri decoder ile hatasız okundu. Her sürümün aynı çekimden JPEG posteri bulunuyor (98–272 KB). Kayak ve dikey snowboard kadrajları sporcuyu takip ediyor. Resort kaynağının koyu pozlaması üretimde 1,35 katsayısıyla açıldı; kayıt altına alındı. 4274798 MP4 ve posterleri korunmuştur; önceki MP4 hash'leriyle eşleşti.

Yeni videoların kaynakları görünür alan dışında atanmaz. Görünmez veya başka kartın altında kalan video durur. Menü, film ve gizli sekme de oynatmayı durdurur. 850 CSS piksel ve altı için mobil kaynak seçilir; breakpoint değişiminde eski kaynak önce bırakılır. Aynı alanda iki sürüm birlikte yüklenmez. Görünür iki ayrı kartın aynı anda oynaması mümkündür.

## Gerçek tarayıcı kontrolleri

Yerel tarayıcının 1,4 ölçeği, kullanıcının istediği gerçek ölçülere ulaşacak şekilde araç boyutuyla telafi edildi. Hedefler DOM `innerWidth/innerHeight` üzerinden doğrulandı; aşağıdaki değerler hedef tahmini değildir.

| Araca verilen boyut | Gerçek CSS viewport | Tipografi ileri/geri | Yatay taşma |
| ------------------- | ------------------- | -------------------- | ----------- |
| 2016×1260           | **1440×900**        | Çakışma yok          | Yok         |
| 1075×1434           | **768×1024**        | Çakışma yok          | Yok         |
| 546×1182            | **390×844**         | Çakışma yok          | Yok         |
| 504×1120            | **360×800**         | Çakışma yok          | Yok         |

Tarayıcıdaki test sayfası gerçek DOM sınırlarını ve maskelerin görünür alanını ölçtü. 3 saniyelik ileri/ters taramalar ve masaüstünde 12 saniyelik yavaş tarama kullanıldı. Giriş, satırlar, kapanış ve bölüm çıkışı kapsandı. Bu örneklemde başlık–başlık veya başlık–açıklama/CTA çakışması kaydedilmedi. Ekran görüntüleriyle görsel kontrol de yapıldı. Her olası scroll hızının matematiksel kanıtı olarak sunulmaz.

- Tipografi ortasında masaüstünden tablete geçildi: sabitlemeler 5'ten 0'a döndü; yerleşim çakışmadı. Mobilde doğal akış korundu.
- İlk üç kart, kayakçı/snowboardcu kadrajı, tüm blok arka planı, kart geçişi ve detay girişi incelendi. Geçiş sırasında tüm karta uygulanan kararma kalmadı.
- Açılışta dört yeni arka planın video src değerleri boştu. Hakkımızda görünür olduğunda yalnızca onun videosu yüklendi. Mobil kartlarda uygun mobil dosya ve snowboard için `mobile-wide` seçildi. Ekran dışındaki yüklenmiş videoların paused durumu doğrulandı.
- 360 px menüde bağlantılar 20–340 px yatay aralıkta kaldı. Menü açılınca oynayan video sayısı sıfıra düştü ve kaydırma kilitlendi; Esc sonrasında odak menü düğmesine döndü.
- Mobil oynatıcı 4274798 mobil dosyasını elle oynattı. Açıkken tüm arka planlar durdu; kapatma düğmesi ve Esc çalıştı, odak oynat düğmesine döndü. Yerel video kontrolleri korundu. Ses ve tam ekranın bu revizede fiziksel cihazda uçtan uca testi yapılmadı.
- İki ana sayfa–proje–ana sayfa döngüsünde ana sayfa her defasında 13 ScrollTrigger, 5 pin ve dört yeni video alanına; detay 3 ScrollTrigger, 0 pin ve tek video alanına döndü. Birikme görülmedi. Bu ölçüm kapsamlı bellek sızıntısı profili değildir.
- Autoplay reddi, test sayfasında play çağrısı reddedilerek simüle edildi. Görünür kayak ve snowboard kartları paused kaldı; video opacity 0, poster opacity 1 oldu. HTML autoplay niteliği de yalnız testte kaldırıldı.
- Hareket azaltma medya sorgusu test sayfasında simüle edildi: 0 ScrollTrigger, 0 pin, 0 oynayan video; dört yeni video src'si boş ve posterler görünür kaldı. İşletim sistemi ayarı üzerinden test edilmedi.

## Son derleme ve sınırlar

Başarıyla tamamlandı: `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run format:check` ve `npm.cmd run check:release`. Denetim 35 gerekli varlığı doğruladı. Teslim kapsamı 56 dosya, yaklaşık 48,03 MB; en büyük dosya korunan 11,62 MB açılış videosu. Son üretim önizlemesinde başlangıçta yalnız 4274798 masaüstü MP4 isteği görüldü. Hakkımızda, proje kartları, ileri/geri geçiş ve tablet kadrajları kontrol edildi; yeni konsol hatası veya yüklenemeyen görüntü görülmedi.

Ayrı yerel test sunucusunda MP4 HTTP yanıtı 25 saniye geciktirildi. Video readyState 0 iken kayak ve snowboard posterleri görünür kaldı. Kayak videosu readyState 4 ile oynadığında kart ölçüsü yine 339,29×448,49 px idi. Snowboard kartı her iki durumda da 339,29×175,49 px kaldı. Bu kontrollü yanıt gecikmesidir; gerçek mobil ağ veya sürekli bant genişliği profili değildir. Yeniden boyutlandırmada kısa boş kare saptanınca yeni poster çözülene kadar eski posterin korunması eklendi. Bekleyen eski play isteği de yeni kaynağın durumunu bozamaz.

Sekiz ekran görüntüsü bu isteğin ek klasöründe bulunamadı; yalnız ayrıntılı plan metni erişilebildi. Bu nedenle görsel 1–8 eşleştirmesi planın tarifine dayanır; ekran görüntülerinin incelendiği iddia edilmez. Canlı referans erişilebildi. Manuka sağlanmadığından Barlow Condensed kullanılıyor. Fiziksel telefon/tablet ve farklı tarayıcı motorları test edilmedi.

Değişen uygulama dosyaları: `index.html`, `src/main.js`, yeni `src/ambient-video.js`, `src/styles.css`, `package.json`, `package-lock.json`, `scripts/check-assets.mjs`, `README.md`, `docs/QA.md` ve `public/assets/provenance.json`. Dokuz MP4 ve dokuz JPEG poster eklendi. Mevcut fotoğraflar diğer bölümlerde kullanıldığı için korundu.

Test araçları ve eski geliştirme notları `artifacts/` altında teslim dışında tutuluyor. Bu görevde uzak depo, push veya yayınlama yapılmadı. Stok medya ve konsept projeler gerçek müşteri işi olarak sunulmuyor; iletişim bilgisi veya backend uydurulmadı.
