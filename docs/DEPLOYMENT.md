# Cloudflare yayını

Snow Medya, Cloudflare Workers üzerinde statik dosyalarla yayınlanır. Canlı adres:
[snow-medya.furkan-akpinar.workers.dev](https://snow-medya.furkan-akpinar.workers.dev/).

## Bağlantı ve ayarlar

11 Eylül 2026 tarihinde Cloudflare panelinde doğrulanan yapılandırma:

| Ayar                       | Değer                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------- |
| GitHub deposu              | `furkan-akpinar/snow-medya`                                                             |
| Üretim dalı                | `main`                                                                                  |
| Worker adı                 | `snow-medya`                                                                            |
| Kök dizin                  | `/`                                                                                     |
| Derleme komutu             | `npm run build`                                                                         |
| Yayın komutu               | `npx wrangler deploy --assets ./dist --name snow-medya --compatibility-date 2026-09-10` |
| İzlenen yollar             | `*`; hariç tutulan yol yok                                                              |
| Diğer dalların derlemeleri | Kapalı                                                                                  |

Bu ayarlar Cloudflare panelinde tutulur; depoda Wrangler yapılandırma dosyası bulunmaz. `npm run build`, önce kaynak ve medya kontrollerini çalıştırır, ardından Vite çıktısını `dist/` içine yazar. `dist/` Git'e eklenmez.

## Otomatik yayın

Cloudflare Workers and Pages GitHub uygulamasının seçili depolarında `furkan-akpinar/snow-medya` bulunmalıdır. Bu erişim, Cloudflare'daki depo bağlantısı ve `main` üretim dalı ayarı birlikte korunmalıdır. Üretim dalına gönderilen değişiklikler derlemeyi tetikler; başarılı derlemenin çıktısı aynı Worker'a yayınlanır.

Gönderim öncesi yerel kontroller (Windows PowerShell):

```powershell
npm.cmd run check
npm.cmd run build
npm.cmd run check:release
```

Gönderim sonrasında Cloudflare **Workers & Pages → snow-medya → Deployments** ekranında yeni commit'in derlemesini ve başarılı yayın sonucunu kontrol et. Etkin sürümün üretim trafiğini aldığını doğrula; ardından canlı sayfayı açarak değişikliği incele. Paneldeki başarılı derleme, tek başına tarayıcıdaki görsel kontrolün yerine geçmez.

GitHub güncel olduğu hâlde yeni bir derleme oluşmuyorsa **Settings → Builds** altındaki depo bağlantısını ve GitHub uygulamasının seçili depo erişimini kontrol et. 11 Eylül 2026 tarihinde Snow Medya erişiminin eksik olması giderildi; mevcut diğer depo erişimi korundu.

Kaynak: [Cloudflare GitHub entegrasyonu](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/).
