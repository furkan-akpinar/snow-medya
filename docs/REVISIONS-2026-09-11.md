# Logo, menü ve beş çekim adımı

## Uygulanan kapsam

1. Intro üzerindeki logo görünür video çerçevesine göre ortalanır. Manifesto yükselirken çerçevenin alt kenarı onunla birlikte hareket eder; alttaki video düzlemi aynı boyutta kalır. Logo masaüstünde yaklaşık %65, 390 px mobil görünümde %32 büyütüldü; `opacity: 0.75` korundu. Header logosuna ve intro sürelerine dokunulmadı.
2. Kullanıcının açıklaması doğrultusunda yalnızca tarayıcı favicon’u değiştirildi. Header’daki mevcut dağ çizimi ve yerel Inter Bold yazısı SVG yollarına aktarıldı. Favicon açık/koyu renk tercihine uyar. README’nin eski simgesi korunur.
3. Menü üstündeki ayrı marka yazısı kaldırıldı; kapatma düğmesi sağda kaldı.
4. Menüye `data-lenis-prevent` eklendi. Böylece Lenis arka sayfayı durdururken menünün yerel kaydırması çalışır; `overscroll-behavior: contain` kaydırmanın arka sayfaya aktarılmasını önler. Menüdeki klavye odak çizgisi turkuaz zeminde görünen koyu renge alındı.
5. Video altı etiketlerin ağırlık ve harf aralığı yardımcı metin düzenine uyarlandı. Çekim açıklamalarındaki tekrar eden etiket dizileri kaldırıldı; kısa adım açıklamaları kullanıldı. İletişim alanındaki geleceğe dönük yer tutucu paragraf ve tekrarlanan hizmet listesi sadeleştirildi. İletişim kanallarının henüz açık olmadığı bilgisi ve medya atıfları korundu.
6. Çekim bölümü beş adıma çıkarıldı. Masaüstündeki seçilebilir büyük başlıklar / sağ medya alanı ve mobildeki ortak medya / akordeon düzeni korunur. Her adımın ayrı videosu ve posteri vardır. Kaynak adresi yalnızca görünür ve seçili videoya atanır; diğerleri durur. Mobil akordeon değişimleri ve breakpoint geçişleri sonrasında kaydırma ölçüleri yenilenir.

## Video eşlemesi

| Adım                      | Kaynak                 | Kullanım                                     |
| ------------------------- | ---------------------- | -------------------------------------------- |
| 01 — Tanışalım            | Mevcut Pexels 4274798  | Kişisel kayak filmi için başlangıç görüntüsü |
| 02 — Planlayalım          | Mevcut Pexels 4161595  | Dağ ve çekim rotası                          |
| 03 — Pistte Buluşalım     | Mevcut Pexels 11246371 | Pistteki kayak hareketi                      |
| 04 — Filmini Hazırlayalım | Yeni Pexels 7699548    | Video kurgu zaman çizelgesi                  |
| 05 — Hikâyeni Paylaş      | Mevcut Pexels 6947516  | Paylaşılacak kış sporu anı                   |

Yeni kurgu görüntüsü [Gilmer Diaz Estela / Pexels](https://www.pexels.com/video/computer-video-editing-7699548/) kaynağından alındı. [Pexels lisansı](https://www.pexels.com/license/) ve dosya bilgileri `public/assets/provenance.json` içinde kayıtlıdır. Kaynağın 1–9. saniyeleri, sessiz H.264, 24 fps ve hızlı başlama düzeniyle hazırlandı:

| Dosya                                 | Çözünürlük | Süre     | Boyut        |
| ------------------------------------- | ---------- | -------- | ------------ |
| `service-editing-7699548-desktop.mp4` | 1280×720   | 8 saniye | 744.414 bayt |
| `service-editing-7699548-mobile.mp4`  | 640×640    | 8 saniye | 304.032 bayt |

## Doğrulama

- Gerçek CSS viewport değerleri tarayıcıdan okundu: masaüstü **1440×900**, mobil **390×844**, kısa masaüstü menü testi **1440×450**. Tarayıcı zoom’u nedeniyle araca verilen dış ölçüler farklıdır; raporlanan değerler `innerWidth` / `innerHeight` ölçüleridir.
- Önceki Git sürümü aynı ölçülerde yeniden açıldı. Manifesto üst sınırı her iki sürümde masaüstünde yaklaşık **721,00 px**, mobilde **707,29 px** kaldı. Header logosunun ölçüleri korundu.
- Masaüstü ve mobil introdan gerçek kare kayıtları alındı. Mobilde son düzenin kare ölçümlerinde logo / video çerçevesi merkezleri arasındaki en büyük fark **0,006 px altında** kaldı. Video öğesinin kimliği değişmedi. Video düzlemi manifesto hareketi sırasında küçültülmedi.
- Intro sırasında kaydırma girişimi sayfayı hareket ettirmedi; bitişten sonra aşağı/yukarı kaydırma introyu yeniden başlatmadı. Yatay taşma gözlenmedi.
- 1440×450 menüde içerik yaklaşık 884 px yükseklikteydi; tekerlek kaydırmasıyla yaklaşık 434 px ilerleyip alt metne ulaşıldı. Arka sayfa sabit kaldı. 390×844 menü içeriği ekrana sığdı ve fazladan kaydırma oluşmadı.
- Mobilde menü öncesi ve sonrası sayfa konumu **537,86 px** olarak korundu. Escape kapatması, odağın Menü düğmesine dönmesi, dört bölüm bağlantısı ve klavye ile bağlantı seçimi kontrol edildi.
- Beş adımın tamamı masaüstünde ve mobilde seçildi. Her seçimde doğru ve ayrı MP4 `readyState: 4` ile oynadı; diğer dört video durdu. İlk görünümde ekran dışındaki beş video için `src` atanmadığı doğrulandı. Mobil kaynaklar, `muted`, `loop`, `playsinline`, posterler ve kırpma kontrol edildi.
- Hareket azaltma tercihi test sayfasında taklit edilerek içerik ve beş adımın erişilebilir kaldığı, videoların yüklenmediği doğrulandı. Otomatik oynatma engeli taklidinde kurgu posteri görünür kaldı.
- Genel sayfalar ve dört film detayı tarayıcıda incelendi; yatay taşma ve konsolda uygulama hatası görülmedi. Favicon açık ve koyu zeminde kontrol edildi.
- Mobil / masaüstü geçişinde büyük başlığın harflerinde kalan GSAP piksel ofseti, mevcut perspektif hareketi korunarak sıfırlandı. Son kontrolde tüm harfler `matrix(1, 0, 0, 1, 0, 0)` konumunda ve iki satır kendi yerindeydi; seçili dördüncü çekim adımı da korundu.
- `npm.cmd run check`, `npm.cmd run build`, `npm.cmd run format:check`, `npm.cmd run check:release` ve `git diff --check` başarılıdır. Varlık kontrolü 40 yerel dosyayı doğrular; bu bir birim test paketi değildir.

Kontroller Windows üzerindeki Chromium tabanlı tarayıcıda yapıldı. Fiziksel telefon, Safari ve gerçek trackpad/dokunmatik donanım testi yapılmadı. Test sayfaları, ekran kayıtları ve indirilen ham kaynak `artifacts/` veya `dist/` altında tutulur; commit’e dahil edilmez.
