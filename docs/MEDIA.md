# Medya yerleşimleri ve footer

11 Eylül 2026 revizesi.

Her içerik alanı, diğer sayfalarda tekrarlanmayan bir özgün fotoğraf veya video kullanır. Atamalar [src/media-catalog.js](../src/media-catalog.js), kaynak ve üretici bilgileri [provenance.json](../public/assets/provenance.json) içindedir.

| Alan                                                         | Özgün kaynak sayısı |
| ------------------------------------------------------------ | ------------------: |
| Ana sayfa: intro, manifesto, ekip, filmler ve çekim adımları |                  29 |
| Film arşivi                                                  |                   4 |
| Dört film detay sayfası                                      |                   4 |
| Çekimler sayfası                                             |                   5 |
| Ekibimiz sayfası                                             |                   2 |
| **Toplam**                                                   |              **44** |

Toplam 21 video ve 23 fotoğraf kullanılır. Seçkiye 15 video ve 20 fotoğraf eklendi. Yeni videoların masaüstü ve mobil MP4 sürümleri toplam 38,98 MB; yeni WebP fotoğraflar toplam 1,25 MB'tır. JPEG posterler ayrıca tutulur. Büyük özgün indirmeler ve geçici kontrol çıktıları depoya dahil edilmez.

Videoların masaüstü/mobil sürümleri ve kendi karelerinden alınan posterleri aynı alana aittir. Introda küçükten tam ekrana büyüyen mevcut video korunmuştur. Navigasyondaki marka işaretleri bu içerik sayımının dışında tutulur. Mobil manifesto fotoğraflarının gizlenmesi mevcut tasarım davranışıdır.

Footer'daki **Furkan Akpınar** imzası geliştiricinin GitHub profiline bağlanır; sitenin koyu zemin, dar başlık fontu ve turkuaz vurgu düzenini kullanır.

## Kontroller

- `npm.cmd run check`: 120 gerekli yerel dosya ve katalogda 44 farklı kaynak doğrulandı. Kaynak tekrarları veya eksik atıflar bu kontrolü başarısız kılar.
- `npm.cmd run build`, `npm.cmd run format:check` ve `npm.cmd run check:release` başarılı.
- Yerel üretim önizlemesinde dokuz rota, gerçek **1440×900** ve **390×844 CSS viewport** ölçülerinde kontrol edildi. DOM'daki 44 alanın kaynakları farklı; yatay taşma tespit edilmedi.
- Masaüstünde çekim sayfasının beş videosu ve film arşivi videolarının oynatılması kontrol edildi. Mobilde intro, yeni kayak çekimleri ve dağ manzarası için mobil kaynak seçimi, video yüklenmesi ve kırpma incelendi.
- Masaüstü manifesto akışında 18 farklı fotoğrafın tamamının yüklendiği doğrulandı. Mevcut geçiş ve tipografi düzeni korundu.
- Footer imzası masaüstünde, 390 piksel mobilde ve ek olarak **320×844** dar görünümde incelendi; profil bağlantısı ve taşma kontrolü geçti.
- Son derlemenin tarayıcı hata günlüğünde hata görülmedi. Bunlar masaüstü tarayıcısında yapılan kontrollerdir; fiziksel telefon testi değildir.

Kalıcı bir uçtan uca tarayıcı test paketi eklenmedi. Geçici ekran görüntüleri ve rota kontrol çıktıları git tarafından yok sayılan `artifacts/media-diversity/` klasöründedir.
