import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entries = [
  'index.html',
  'src',
  'public',
  'scripts',
  'docs',
  'README.md',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  '.gitignore',
  '.gitattributes',
  '.editorconfig',
  '.nvmrc',
  '.prettierrc.json',
  '.prettierignore',
];
const files = [];
function visit(path) {
  if (statSync(path).isDirectory()) readdirSync(path).forEach((name) => visit(resolve(path, name)));
  else files.push(path);
}
entries.forEach((entry) => visit(resolve(root, entry)));
const failures = [];
for (const file of files) {
  const name = relative(root, file).replaceAll('\\', '/');
  if (statSync(file).size > 25 * 1024 * 1024) failures.push(`${name}: 25 MiB üzerinde`);
  if (
    name.startsWith('public/assets/') ||
    name === 'scripts/check-release.mjs' ||
    name === 'package-lock.json'
  )
    continue;
  const content = readFileSync(file, 'utf8');
  if (
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:ghp_|github_pat_)[a-zA-Z0-9_]{30,}/.test(
      content,
    )
  )
    failures.push(`${name}: olası gizli anahtar`);
}
const provenance = JSON.parse(readFileSync(resolve(root, 'public/assets/provenance.json'), 'utf8'));
for (const asset of provenance.assets) {
  for (const path of [asset.file, asset.poster].filter(Boolean)) {
    if (!existsSync(resolve(root, 'public/assets', path)))
      failures.push(`${path}: kaynak kaydı var, dosya yok`);
  }
  if (asset.bytes && statSync(resolve(root, 'public/assets', asset.file)).size !== asset.bytes)
    failures.push(`${asset.file}: kaynak kaydındaki boyut uyuşmuyor`);
}
for (const library of provenance.libraries) {
  for (const path of [...library.files, library.licenseFile].filter(Boolean)) {
    if (!existsSync(resolve(root, 'public/assets', path)))
      failures.push(`${path}: kütüphane veya lisans dosyası eksik`);
  }
}
const largest = files.toSorted((a, b) => statSync(b).size - statSync(a).size)[0];
console.log(
  `${files.length} teslim dosyası, toplam ${(files.reduce((sum, path) => sum + statSync(path).size, 0) / 1e6).toFixed(2)} MB.`,
);
console.log(
  `En büyük dosya: ${relative(root, largest)} — ${(statSync(largest).size / 1e6).toFixed(2)} MB.`,
);
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else
  console.log(
    'Teslim dosyaları, boyutlar ve kaynak kayıtları uygun. Bu kontrol kapsamlı bir gizli bilgi tarayıcısı değildir.',
  );
