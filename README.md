# Snow Medya

Kayak, snowboard ve dağ sporları için film, fotoğraf ve yaratıcı prodüksiyon sitesi.
HTML, CSS ve vanilla JavaScript kullanır. Vite geliştirme sunucusu ve üretim derlemesini sağlar.

## Kurulum

Node.js 24 önerilir. Desteklenen sürümler `package.json` içindeki `engines` alanındadır.
Proje klasöründe PowerShell ile:

```powershell
npm.cmd ci
npm.cmd run dev
```

Geliştirme adresi: `http://127.0.0.1:5173/`. Terminali açık tutun.
Port kullanımdaysa başka bir port seçin: `npm.cmd run dev -- --port 5174`.

## Kontrol ve build

```powershell
npm.cmd run check
npm.cmd run format:check
npm.cmd run check:release
npm.cmd run build
npm.cmd run preview
```

Son komut `dist/` çıktısını `http://127.0.0.1:4173/` üzerinde sunar.
`npm.cmd run format` kaynakları biçimlendirir. Diğer işletim sistemlerinde `npm.cmd` yerine `npm` kullanın.

## Yapı

- `index.html`: header, tam ekran menü, footer ve video oynatıcı.
- `src/main.js`: içerik, hash rotaları, kaydırma sahneleri ve video yaşam döngüsü.
- `src/ambient-video.js`: görünür alan, ekran boyutu ve dialog durumuna göre arka plan videoları.
- `src/styles.css`: yerleşim, responsive kurallar ve hareket azaltma stilleri.
- `public/assets/`: yerel görüntüler, videolar, fontlar ve animasyon kütüphaneleri.
- `public/assets/provenance.json`: medya kaynakları, üreticiler ve lisans kayıtları.
- `public/assets/licenses/`: font ve Lenis lisansları. GSAP bildirimleri kendi dosyalarında korunur.
- `scripts/`: varlık ve teslim kontrolleri.
- `docs/QA.md`: tarayıcı testleri ve doğrulama sınırları.
- `docs/INTRO.md`: video büyümesi ve başlık girişinin güncel doğrulaması.

Rotalar: `/#/`, `/#/isler`, `/#/hizmetler`, `/#/hakkimizda`, `/#/iletisim` ve
`/#/is/{ilk-iz,yercekimine-karsi,zirvede-bir-gun,kis-bitmeden}`.
Hash rotaları nedeniyle sunucuda ayrı sayfa yönlendirme kuralı gerekmez.
Vite `base: './'` ayarı alt klasörden sunmayı destekler.

Animasyonlar yerel GSAP/ScrollTrigger ve Lenis ile çalışır. Sayfa değişiminde
timeline, observer ve sayfa dinleyicileri temizlenir. Açılıştaki video büyümesi
ve ilk başlığın yükselişi masaüstü ve mobilde tek bir kaydırma sahnesine bağlıdır.
Sonraki tipografi satırları normal akışta kendi alanlarını korur; masaüstünde
grup olarak sabitlenip yukarı ilerler, mobilde doğal akışta kalır. Ölçümler
fontlar hazırken yapılır ve ekran değişiminde yenilenir. Hareket azaltma tercihi
otomatik video, giriş ve sabitlemeleri kapatır.

## Medya ve içerik

4274798 numaralı Pexels videosunun 1920×1080 sürümü yaklaşık 11,62 MB,
720×1280 mobil sürümü 3,25 MB'tır. İkisi aynı 14,12 saniyelik kaynaktan
üretilmiştir. Mobil kırpma kayakçıyı takip eder. Başlangıçta yalnızca ekrana
uygun sürüm seçilir; oynatıcı açıkken arka plan durur. Her sürümün kendi posteri vardır.

Hakkımızda bloğu ve ilk üç proje yerel Pexels videoları kullanır. Boyutlar
ondalık MB cinsindendir:

| Alan / Pexels kimliği       | Masaüstü           | Mobil                                             | Süre    |
| --------------------------- | ------------------ | ------------------------------------------------- | ------- |
| Hakkımızda / 4161595        | 1600×900 · 3,19 MB | 720×1280 · 1,66 MB                                | 12 sn   |
| İlk İz / 11246371           | 1280×720 · 4,81 MB | 720×960 · 2,32 MB                                 | 9,5 sn  |
| Yerçekimine Karşı / 6947516 | 1600×900 · 6,06 MB | Kart: 960×540 · 2,42 MB; detay: 720×960 · 2,42 MB | 10 sn   |
| Zirvede Bir Gün / 4185345   | 1600×844 · 3,75 MB | 720×960 · 1,24 MB                                 | 8,38 sn |

Yeni videolar sessiz H.264 MP4'tür; her sürüm aynı çekimden oluşturulan bir
JPEG poster taşır. Snowboard kartının mevcut kısa yüksekliği için yatay mobil
sürüm seçilir. Kayak ve snowboard dikey sürümlerinin kırpması sporcuyu takip eder.
Videolar görünür alanda yüklenip oynar; ekran dışında, başka kartın altında,
menü veya film açıkken durur. 850 CSS piksel ve altında mobil kaynak seçilir;
bir alan aynı anda iki sürüm indirmez. Autoplay reddinde ve hareket azaltmada
poster görünür. Kaynak sayfaları, üreticiler, düzenlemeler, dosya boyutları ve
SHA-256 kayıtları `public/assets/provenance.json` içindedir.

Görüntüler stoktur; proje seçkisi konsept çalışmalardan oluşur. Gerçek müşteri
projesi veya özgün çekim iddiası taşımaz. İletişim backend'i ve resmi iletişim
bilgileri henüz yoktur. Gönderilmiş mesaj taklit edilmez.

Tipografi Barlow Condensed ve Inter'dir. Lisanslı Manuka dosyası dahil değildir.
Görsel davranış referansı: [Sadu Media](https://www.sadumedia.com/).

## Depoya hazırlık

Kaynaklar, `public/`, `scripts/`, `docs/`, yapılandırma dosyaları ve
`package-lock.json` depoya dahil edilir. `.gitignore`, bağımlılıkları, build
çıktısını, yerel ayarları, logları, gizli ortam dosyalarını ve test kayıtlarını dışarıda tutar.
Kilit dosyasını koruyun; `dist/` dosyalarını elle değiştirmeyin.

En büyük teslim dosyası 11,62 MB'tır; bu sürüm için Git LFS gerekli değildir.
[GitHub dosya sınırları](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)
değişebileceğinden daha büyük video eklerken yeniden kontrol edin.
`check:release` 25 MiB üstü dosyaları, eksik kaynakları ve istenmeyen teslim içeriğini denetler.

Kaynak deposu: [furkan-akpinar/snow-medya](https://github.com/furkan-akpinar/snow-medya).
Yayın adresi veya erişim anahtarı projeye eklenmemiştir.
