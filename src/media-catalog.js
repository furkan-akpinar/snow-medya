// Each content slot owns one original photo or video across all routes.
// A video's posters and responsive renditions belong to that same slot.
export const mediaSlots = {
  'home.intro': {
    video: 'reel-4274798',
    alt: 'Karla kaplı yamaçta kayakçı',
  },
  'home.about': {
    video: 'about-mountains-4161595',
    alt: 'Karlı dağlar ve teleferikler üzerinde hava çekimi',
  },
  'home.project.ilk-iz': {
    video: 'project-ski-11246371',
    alt: 'Orman kenarındaki pistte kayan sporcu',
  },
  'home.project.yercekimine-karsi': {
    video: 'project-snowboard-6947516',
    alt: 'Karlı yamaçta snowboard yapan sporcu',
    wideMobile: true,
  },
  'home.project.zirvede-bir-gun': {
    video: 'project-resort-4185345',
    alt: 'Dağ merkezine havadan bakış',
  },
  'home.project.kis-bitmeden': {
    image: 'hero.jpg',
    position: '75% center',
    alt: 'Karla kaplı dağ yamacında kayakçı',
  },
  'home.step.4': {
    video: 'service-editing-7699548',
    alt: 'Video kurgu zaman çizelgesinin yakın planı',
  },
  'about.banner': {
    image: 'resort.jpg',
    alt: 'Kış sporları merkezi ve karlı dağlar',
  },
  'about.portrait': {
    image: 'snowboard.jpg',
    alt: 'Dağda snowboard yapan sporcu',
  },
  'home.manifesto.1': {
    image: 'photo-1881838.webp',
    alt: 'Karlı zirveler ve ormanlık kayak pistleri',
  },
  'home.manifesto.2': {
    image: 'photo-7406675.webp',
    alt: 'Snowboard hazırlığında eldivenlerini ayarlayan sporcu',
  },
  'home.manifesto.3': {
    image: 'photo-16065930.webp',
    alt: 'Karlı ormana düşen güneş ışığı',
  },
  'home.manifesto.4': {
    image: 'photo-35803004.webp',
    alt: 'Dağ evi ve kış sporları merkezi',
  },
  'home.manifesto.5': {
    image: 'photo-6141787.webp',
    alt: 'Kask ve gözlük takan kayakçı',
  },
  'home.manifesto.6': {
    image: 'photo-1008180.webp',
    alt: 'Alp dağlarında teleferik yolculuğu',
  },
  'home.manifesto.7': {
    image: 'photo-36799776.webp',
    alt: 'Mavi gökyüzü altında hazırlanmış kayak pisti',
  },
  'home.manifesto.8': {
    image: 'photo-257961.webp',
    alt: 'Ahşap zemin üzerinde kayak ekipmanı',
  },
  'home.manifesto.9': {
    image: 'photo-18592491.webp',
    alt: 'Güneşte karla kaplı ağaçlar',
  },
  'home.manifesto.10': {
    image: 'photo-36025070.webp',
    alt: 'Geniş dağ manzarasında kayakçılar',
  },
  'home.manifesto.11': {
    image: 'photo-2083159.webp',
    alt: 'Kask kamerası ve kayak gözlüğü',
  },
  'home.manifesto.12': {
    image: 'photo-3837473.webp',
    alt: 'Karlı çam ormanının üzerinde kırmızı teleferik',
  },
  'home.manifesto.13': {
    image: 'photo-31462166.webp',
    alt: 'Kış merkezinde yürüyen ziyaretçi',
  },
  'home.manifesto.14': {
    image: 'photo-2083178.webp',
    alt: 'Karla örtülü dağ sırtı',
  },
  'home.manifesto.15': {
    image: 'photo-10966480.webp',
    alt: 'Gün batımında karlı ağaçlar',
  },
  'home.manifesto.16': {
    image: 'photo-35497200.webp',
    alt: 'Güneşli pistte kayak yapan çocuk',
  },
  'home.manifesto.17': {
    image: 'photo-17789271.webp',
    alt: 'Karlı yamaçta kayakçı',
  },
  'home.manifesto.18': {
    image: 'photo-134069.webp',
    alt: 'Kayak gözlüğü ve yüz korumasının yakın planı',
  },
  'home.step.1': {
    video: 'scene-15610132',
    alt: 'Kayakçının gözünden pist ve dağ manzarası',
  },
  'home.step.2': {
    video: 'scene-11734964',
    alt: 'Karlı sırtta rotasına doğru ilerleyen kayakçı',
  },
  'home.step.3': {
    video: 'scene-35612648',
    alt: 'Karlı ormanda hareketi izleyen aksiyon kamerası çekimi',
  },
  'home.step.5': {
    video: 'scene-28454084',
    alt: 'Güneşli dağ yamacında kış sporu anı',
  },
  'services.step.1': {
    video: 'scene-4965243',
    alt: 'Pistte birlikte kayak yapan kişiler',
  },
  'services.step.2': {
    video: 'scene-4185209',
    alt: 'Kayak rotasının havadan görünümü',
  },
  'services.step.3': {
    video: 'scene-854878',
    alt: 'Kayak hareketinin yakın plan çekimi',
  },
  'services.step.4': {
    video: 'scene-33414463',
    alt: 'Kurgu ekranında video düzenleme',
  },
  'services.step.5': {
    video: 'scene-4178712',
    alt: 'Karlı dağların ve pistlerin kış manzarası',
  },
  'archive.project.ilk-iz': {
    video: 'scene-6464540',
    alt: 'Karlı ağaçlar arasında kayak yapan sporcu',
  },
  'archive.project.yercekimine-karsi': {
    video: 'scene-37010268',
    alt: 'Açık karlı yamaçta snowboard yapan sporcu',
  },
  'archive.project.zirvede-bir-gun': {
    video: 'scene-11499656',
    alt: 'Dağ manzarası önünde kayak yapan kişiler',
  },
  'detail.project.ilk-iz': {
    video: 'scene-7875576',
    alt: 'Yüksek dağ yamacında toz karda kayak',
  },
  'detail.project.yercekimine-karsi': {
    video: 'scene-11714624',
    alt: 'Orman yamacında snowboard inişi',
  },
  'detail.project.zirvede-bir-gun': {
    video: 'scene-20659481',
    alt: 'Kış manzarasında geniş bir kayak yamacı',
  },
  'archive.project.kis-bitmeden': {
    image: 'photo-15140093.webp',
    alt: 'Geniş karlı yamaçta tek kayakçı',
  },
  'detail.project.kis-bitmeden': {
    image: 'photo-36770460.webp',
    alt: 'Karlı yamaçta yalnız kayakçının izi',
  },
};
