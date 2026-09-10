# Intro revizesi — 10 Eylül 2026

Kapsam yalnızca açılıştaki video büyümesi ve ilk büyük başlığın girişidir.
Önceki altı revize yeniden ele alınmadı. Uygulama değişiklikleri
`src/main.js` ve `src/styles.css` ile sınırlı; medya dosyaları, metinler,
marka, renkler, oynatıcı ve sonraki bölümler korunuyor.

## Referans gözlemi

[Sadu Media](https://www.sadumedia.com/) canlı tarayıcıda masaüstü ve mobilde
incelendi. Sayfa başına dönülerek küçük aşağı/yukarı kaydırmalar yapıldı.
1440×900 CSS viewport'ta video alanı 1435×900 px; ilk başlık 146 px yüksek.
135, 280, 153 ve 12 px kaydırma örneklerinde başlığın üst konumu sırasıyla
599, 454, 581 ve 722 px oldu. Video ve başlık sınırı birlikte ilerledi.
Başlangıçta başlık üstü yaklaşık 734 px idi; açık alan videonun alt kısmını
örtüyordu. 390×844 mobilde video 386×844 px, başlık yaklaşık 126 px yüksek
ve üst konumu 718 px olarak ölçüldü.

Referansın ilk yükleme sırasında küçük videodan büyümeye geçtiği en erken
kareyi güvenilir biçimde yakalayamadım. Bu fazın kesin başlangıç boyutu ve
zamanlaması doğrulanmış sayılmıyor. Mevcut küçük video alanının geometrisi
korunarak kullanıcının istediği kaydırmaya bağlı büyüme uygulandı. Manuka
yerine mevcut Barlow Condensed kullanılıyor; birebir font eşleşmesi yok.

## Değişiklik

Önceki zaman tabanlı giriş, ilk wheel/touch/klavye girdisinde videoyu son
kareye taşıyordu. Ardından başlığı başka bir ScrollTrigger hareket ettiriyordu.
Bu iki ayrı akış kaldırıldı. Tek scrub zaman çizelgesi video boyutunu ve
ilk başlığın yükselişini yönetiyor; geri kaydırma aynı ilerlemeyi geri alıyor.
Videoyu başka kapsayıcıya taşıyan geçici DOM/spacer işlemi de kaldırıldı.

Masaüstü büyümesi ekran yüksekliğinin %90'ı, mobil büyümesi %70'i kadar
kaydırma mesafesi kullanır. Video önce dikey alanı doldurur; son yatay
büyüme sırasında açık başlık alanı ekrana girer. Başlık translateY ile
yükselir, opacity ile açılmaz. Başlığın maskesi ve 20 px üst payı Türkçe
işaretleri korur. Açık alanın video üzerindeki payı, fontlar hazır olduğunda
gerçek ilk satır yüksekliğinden hesaplanır; resize sırasında yenilenir.

Başlangıç video alanı masaüstünde yaklaşık 418×202 px, mobilde 144×78 px.
Masaüstünde video yaklaşık 1403 px genişlikteyken başlık üstü 762 px;
mobilde video 360 px genişlikteyken başlık üstü 775 px idi. Bu karelerde
başlık görünürken video henüz tam genişliğe ulaşmamıştı.

Keşfet bağlantısı büyümenin son kaydırma konumuna gider. Menü ve oynatıcı
artık intro ilerlemesini sona atlatmaz. Hareket azaltmada sabitleme ve
animasyon kurulmaz; poster, başlıklar ve bağlantılar doğal akışta kalır.

## Kontroller

- Gerçek CSS viewport değerleri DOM üzerinden doğrulandı: 1440×900 ve
  390×844. Yerel tarayıcının 1,4 ölçeğini telafi etmek için araca sırasıyla
  2016×1260 ve 546×1182 verildi.
- Masaüstünde küçük tekerlek adımlarıyla ileri/geri, mobilde küçük klavye
  adımlarıyla ileri/geri ve PageDown/PageUp ile hızlı kaydırma denendi.
  Video boyutu ve başlık konumu iki yönde aynı ilerlemeyi takip etti.
- Yerel test sayfasında görünür maske sınırları ölçüldü; başlıkla sonraki
  satırın görünür alanında çakışma ve yatay taşma bulunmadı. Başlığı yöneten
  tween sayısı 1 olarak doğrulandı. Test araçları `artifacts/` altında
  commit dışında tutuluyor.
- Geçişin masaüstü/mobil kareleri görsel olarak incelendi. İlave karartma
  veya video–açık alan arasında boş şerit kalmadı. Videonun mevcut sabit
  okunabilirlik katmanı değişmedi.
- Mobil üretim sürümünde Keşfet bağlantısı intro sonuna (yaklaşık 591 px)
  ulaştı. Film aynı 4274798 mobil kaynağıyla açıldı; arka plan durdu.
  Esc kapattıktan sonra odak oynat düğmesine döndü, arka plan devam etti
  ve kaydırma konumu değişmedi. Yerel oynatıcının kontrolleri korundu.
- Mobilde sayfa başında yenilemeden sonra video genişliği 144 px ve
  başlık üstü 1444 px olarak sabit kaldı; ilk küçük kaydırmada tam boyuta
  atlamadı. Masaüstünde yenileme öncesi ve sonrası 0 px kaydırmada video
  genişliği 418 px, başlık üstü 1712 px idi. Üretim sürümünün tarayıcı
  konsolunda hata bulunmadı.
- Hareket azaltma tercihi yerel test sayfasında `matchMedia` üzerinden
  benzetildi: 390×844 ölçüsünde pin ve başlık tween sayısı 0, başlığın
  transform değeri `none`, poster mevcut ve otomatik video kaynakları
  yüklenmemiş durumdaydı. Bu kontrol işletim sistemi ayarını değiştirmedi.
- `npm.cmd run check` ve `npm.cmd run build` başarılı. 35 gerekli varlık
  bulundu. `format:check` ve `check:release` de başarılı; 57 teslim dosyası
  toplam 48,04 MB. Bağımlılık eklenmedi veya yükseltilmedi.
- `public/assets/` kökündeki 36 dosyanın SHA-256 değerleri revize öncesiyle
  karşılaştırıldı; değişen dosya yok. Mevcut videolar yeniden indirilmedi.

Fiziksel telefon, dokunma donanımı ve farklı tarayıcı motorları test edilmedi.
Referansın yakalanamayan ilk yükleme karesinin zamanlaması birebir eşleşme
olarak sunulmuyor.

## Git teslimi

Başlangıçta yerel Git deposu yoktu. Kullanıcının belirttiği uzak depo Git
üzerinden okundu; dal veya commit içermediği doğrulandı. Yerel `main` ve
`origin` oluşturuldu. Kaynaklar ve gerekli medya birlikte teslim edilir;
`node_modules`, `dist`, `artifacts`, yerel ayarlar ve `.env` dosyaları hariçtir.

En büyük dosya 11.623.800 byte. [GitHub'ın dosya sınırları](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
kontrol edildi; bu boyutlar için Git LFS gerekmedi. Force push kullanılmaz.
