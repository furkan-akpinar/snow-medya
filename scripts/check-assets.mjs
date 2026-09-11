import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mediaSlots } from '../src/media-catalog.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (path) => readFileSync(resolve(root, path), 'utf8');
const files = ['index.html', 'src/main.js', 'src/ambient-video.js', 'src/styles.css'];
const required = new Set([
  'hero.jpg',
  'snowboard.jpg',
  'resort.jpg',
  'reel-4274798-desktop.mp4',
  'reel-4274798-mobile.mp4',
  'reel-4274798-desktop.jpg',
  'reel-4274798-mobile.jpg',
  'project-snowboard-6947516-mobile-wide.mp4',
  'project-snowboard-6947516-mobile-wide.jpg',
  'gsap.min.js',
  'ScrollTrigger.min.js',
  'lenis.min.js',
  'fonts.css',
  'favicon.svg',
]);
const provenance = JSON.parse(read('public/assets/provenance.json'));
const sources = new Map();
const issues = [];
for (const [slot, media] of Object.entries(mediaSlots)) {
  if (!!media.video === !!media.image) {
    issues.push(`${slot}: tam bir görsel veya video tanımlanmalı`);
    continue;
  }
  const file = media.image || `${media.video}-desktop.mp4`;
  if (media.video) {
    for (const variant of ['desktop', 'mobile', ...(media.wideMobile ? ['mobile-wide'] : [])]) {
      required.add(`${media.video}-${variant}.mp4`);
      required.add(`${media.video}-${variant}.jpg`);
    }
  } else required.add(file);
  const source = provenance.assets.find((asset) => asset.file === file);
  if (!source?.sourcePage) {
    issues.push(`${slot}: ${file} için kaynak kaydı eksik`);
    continue;
  }
  const identity = source.pexelsId ? `pexels:${source.pexelsId}` : source.sourcePage;
  if (sources.has(identity))
    issues.push(`${slot} ve ${sources.get(identity)} aynı medyayı kullanıyor`);
  else sources.set(identity, slot);
}
for (const name of [
  'about-mountains-4161595',
  'project-ski-11246371',
  'project-snowboard-6947516',
  'project-resort-4185345',
  'service-editing-7699548',
]) {
  for (const variant of ['desktop', 'mobile']) {
    required.add(`${name}-${variant}.mp4`);
    required.add(`${name}-${variant}.jpg`);
  }
}

for (const file of files) {
  const content = read(file);
  for (const [, path] of content.matchAll(/(?:src|href)=["']\/?assets\/([^"']+)["']/g)) {
    if (!path.includes('${')) required.add(path);
  }
}
for (const [, font] of read('public/assets/fonts.css').matchAll(/url\(["']?([^)'"\s]+)["']?\)/g)) {
  if (!font.startsWith('data:') && !/^https?:/.test(font)) required.add(font);
}
const missing = [...required].filter((path) => !existsSync(resolve(root, 'public/assets', path)));
if (missing.length || issues.length) {
  if (missing.length) console.error('Eksik yerel dosyalar:\n' + missing.join('\n'));
  if (issues.length) console.error('Medya yerleşim hataları:\n' + issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`${required.size} yerel görsel, video, font ve kütüphane dosyası bulundu.`);
  console.log(`${sources.size} içerik alanında ${sources.size} farklı kaynak doğrulandı.`);
  console.log('Bu kontrol görsel benzerlik veya tarayıcı etkileşim testi değildir.');
}
