import { createAmbientVideos } from './ambient-video.js';
import { mediaSlots } from './media-catalog.js';

(() => {
  'use strict';
  // Hash routes own their scroll position, including browser reload/back/forward.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const $ = (s, root = document) => root.querySelector(s);
  // Keep the intro wordmark independent of the header icon.
  const snowLogo = `<svg viewBox="0 0 100 42" aria-hidden="true"><path d="M2 36 32 5l13 14L57 6l41 30H76L58 20 44 35 31 21 16 36Z" fill="currentColor"/></svg><span>SNOW MEDYA</span>`;
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = motionPreference.matches;
  const reelViewport = matchMedia('(max-width: 850px)');
  const reelMedia = () => {
    const variant = reelViewport.matches ? 'mobile' : 'desktop';
    const base = mediaSlots['home.intro'].video;
    return {
      src: `assets/${base}-${variant}.mp4`,
      poster: `assets/${base}-${variant}.jpg`,
    };
  };
  const hasGsap = typeof gsap !== 'undefined';
  if (hasGsap && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);
  let lenis =
    typeof Lenis !== 'undefined' && !reduced
      ? new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.95 })
      : null;
  {
    const raf = (time) => lenis?.raf(time * 1000);
    if (hasGsap) gsap.ticker.add(raf);
    else {
      const tick = (time) => {
        lenis?.raf(time);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    if (typeof ScrollTrigger !== 'undefined') lenis?.on('scroll', ScrollTrigger.update);
  }
  const projects = [
    {
      slug: 'ilk-iz',
      title: 'İlk İz.',
      category: 'Kayak',
      type: 'Konsept film',
      subtitle: 'Herkesten önce. Her şeyden uzakta.',
      description:
        'İlk inişin heyecanı, karın sesi ve sana ait bir çizgi. Bu konsept film, kişisel kayak çekiminin nasıl sinematik bir hikâyeye dönüşebileceğini gösteren bir görsel örnek.',
    },
    {
      slug: 'yercekimine-karsi',
      title: 'Yerçekimine Karşı.',
      category: 'Snowboard',
      type: 'Sporcu hikâyesi · Konsept',
      subtitle: 'Kendi çizgini bul.',
      description:
        'Her inişte kendi çizgin, her karede senin ritmin. Snowboard deneyimini yakın plan detaylar, dağ manzaraları ve hareketin içinden çekimlerle anlatan kişisel bir film için konsept çalışma.',
    },
    {
      slug: 'zirvede-bir-gun',
      title: 'Zirvede Bir Gün.',
      category: 'Dağ Yaşamı',
      type: 'Dağ günü · Konsept',
      subtitle: 'Bir pistten çok daha fazlası.',
      description:
        'İlk teleferikten son inişe, sana ait bir kayak günü. Pistteki anlarını, manzarayı ve dağda olmanın hissini aynı filmde buluşturan bir kişisel çekim fikri.',
    },
    {
      slug: 'kis-bitmeden',
      title: 'Kış Bitmeden.',
      category: 'Freeride',
      type: 'Kayak anısı · Konsept',
      subtitle: 'Bir iniş daha.',
      description:
        'Kısa günler. Uzun hatıralar. En sevdiğin inişi, karın üzerinde bıraktığın izi ve günün heyecanını yeniden izlemek için bir film fikri. Kişisel kayak çekimine dair bir konsept çalışma.',
    },
  ];
  const pill = (text, href) => `<a class="pill light" href="${href}">${text}<span>↗</span></a>`;
  const renderMedia = (slot, decorative = false) => {
    const item = mediaSlots[slot];
    if (!item) throw new Error(`Unknown media slot: ${slot}`);
    if (item.video) {
      const variant = reelViewport.matches
        ? item.wideMobile
          ? 'mobile-wide'
          : 'mobile'
        : 'desktop';
      const poster = `assets/${item.video}-${variant}.jpg`;
      return `<div class="ambient-media" data-media-slot="${slot}" data-ambient="${item.video}" ${item.wideMobile ? 'data-mobile-wide' : ''}><img src="${poster}" alt="${item.alt}" loading="lazy" decoding="async"><video autoplay muted loop playsinline preload="none" aria-hidden="true"></video></div>`;
    }
    return `<img data-media-slot="${slot}" src="assets/${item.image}" alt="${decorative ? '' : item.alt}" loading="lazy" decoding="async" ${item.position ? `style="object-position:${item.position}"` : ''}>`;
  };
  const projectMedia = (p, location = 'home') => renderMedia(`${location}.project.${p.slug}`);
  const card = (p, i, location = 'home') =>
    `<a class="work-card" data-ambient-surface href="#/is/${p.slug}" aria-label="${p.title} filmini incele"><div class="work-media">${projectMedia(p, location)}<span class="work-number">0${i + 1} / SNOW MEDYA</span><span class="work-arrow" aria-hidden="true">↗</span></div><div class="work-info"><div><h3>${p.title}</h3><p>${p.type}</p></div><span class="tag">${p.category}.</span></div></a>`;
  const shootingSteps = [
    {
      title: 'Tanışalım.',
      description: 'Kayak deneyimini ve nasıl bir film istediğini konuşalım.',
    },
    {
      title: 'Planlayalım.',
      description: 'Çekimin yerini, zamanını ve akışını birlikte belirleyelim.',
    },
    {
      title: 'Pistte Buluşalım.',
      description: 'Kayak anlarını profesyonel çekimlerle kaydedelim.',
    },
    {
      title: 'Filmini Hazırlayalım.',
      description: 'Görüntüleri seçip sinematik bir kurguya dönüştürelim.',
    },
    {
      title: 'Hikâyeni Paylaş.',
      description: 'Filminle pistteki anlarını yeniden yaşa ve paylaş.',
    },
  ];
  const services = (location = 'home') =>
    `<section class="services"><p class="eyebrow">Kayak çekimin, adım adım.</p><h2 class="section-title">HER AŞAMADA.<br>AYNI TUTKU.</h2><div class="service-layout"><div class="service-image"><div class="service-media">${shootingSteps.map((step, i) => `<div class="service-shot" id="service-shot-${i}" ${i ? 'hidden' : ''}>${renderMedia(`${location}.step.${i + 1}`)}</div>`).join('')}</div><p class="service-caption" aria-live="polite">${shootingSteps[0].description}</p></div><div class="service-list">${shootingSteps.map((step, i) => `<details class="service-item" ${i ? '' : 'open'}><summary aria-controls="service-shot-${i} service-copy-${i}"><small>0${i + 1}</small><h3>${step.title}</h3><span class="plus" aria-hidden="true">+</span></summary><p id="service-copy-${i}">${step.description}</p></details>`).join('')}</div></div></section>`;
  const manifesto = () => {
    const group = (row, side) =>
      `<span class="manifesto-images" aria-hidden="true">${Array.from({ length: 3 }, (_, index) => `<span class="manifesto-photo">${renderMedia(`home.manifesto.${row * 6 + side * 3 + index + 1}`, true)}</span>`).join('')}</span>`;
    return `<section class="manifesto intro-linked" aria-labelledby="manifesto-title"><div class="manifesto-track"><div class="manifesto-stage"><div class="manifesto-stack">
      <div class="manifesto-line manifesto-intro"><div class="manifesto-mask"><h2 id="manifesto-title" class="manifesto-title">DAĞIN HİKÂYESİNİ ANLATIYORUZ.</h2></div></div>
      ${['KAYAK ÇEKİMİ', 'SİNEMATİK DİL', 'SENİN FİLMİN'].map((text, i) => `<div class="manifesto-line manifesto-chapter"><div class="manifesto-mask"><div class="manifesto-row">${group(i, 0)}<h3 class="manifesto-text">${text}</h3>${group(i, 1)}</div></div></div>`).join('')}
      <div class="manifesto-line manifesto-outro"><div class="manifesto-mask"><p class="manifesto-impact">ANI YAŞATMAK İÇİN.</p></div><div class="manifesto-bottom"><p><strong>Sen kayarken biz çekelim.</strong>Kayak günün, sana ait bir filme dönüşsün.</p><a class="pill" href="#/hakkimizda">Ekibimizi tanı. <span>↗</span></a></div></div>
    </div></div></div></section>`;
  };
  const home = () =>
    `<div class="opening auto-intro" data-media-slot="home.intro"><section class="hero"><div class="hero-heading"><div class="hero-top display"><span class="word">WE</span><div class="hero-inset"><img data-reel-poster src="${reelMedia().poster}" alt="Karla kaplı yamaçta kayakçı" fetchpriority="high"></div><span class="word">ARE</span></div><h1>SNOW MEDYA</h1></div><div class="hero-bottom"><p>Sen kay.<br>Biz hikâyeni çekelim.</p><a class="scroll-cue" href="#film-alani">Keşfet <span>↓</span></a><div class="hero-note">Pistte sen. Kadrajda hikâyen.<br>Profesyonel kayak çekimi.</div></div></section><section class="film-cover" id="film-alani"><img data-reel-poster src="${reelMedia().poster}" alt="Karla kaplı yamaçta kayakçı" class="parallax" loading="eager"><div class="intro-brand-layer" aria-hidden="true"><div class="intro-logo">${snowLogo}</div></div><div class="film-caption"><span>Kayak / Konsept seçki</span><span>Sen kay. Anın film olsun.</span></div></section></div>${manifesto()}<section class="about about-video" data-ambient-surface>${renderMedia('home.about')}<div class="about-content"><span class="eyebrow">Ekibimiz.</span><h2>YÜKSEKTE.<br>HAREKETTE.<br>HİKÂYENİN<br>İÇİNDE.</h2><p><strong>Kayak gününü profesyonel bir çekim ekibiyle sinematik bir filme dönüştür.</strong><br><br>Sen kayarken biz hareketini, manzarayı ve o anın hissini yakalarız. Çekimden kurguya, kayak gününü yeniden izlemek isteyeceğin bir hikâyeye dönüştürürüz.</p>${pill('Ekibimizi tanı.', '#/hakkimizda')}</div></section><section class="works home-works"><div class="section-head"><h2 class="section-title">FİLMLER.<br>İZ BIRAKIR.</h2><p class="eyebrow">Snow Medya<br>Konsept seçkisi / 01—04</p></div><div class="work-grid">${projects.map((p, i) => `<div class="work-stack-item">${card(p, i)}</div>`).join('')}</div><div class="works-more">${pill('Tüm filmler.', '#/isler')}</div></section><section class="disciplines"><p class="eyebrow">Aynı tutkuyu paylaşıyoruz.</p><div class="discipline-list"><span>ALP DİSİPLİNİ</span><span>SNOWBOARD</span><span>FREERIDE</span><span>DAĞ YAŞAMI</span></div></section>${services()}`;
  const archive = () =>
    `<section class="page-top"><p class="eyebrow">Snow Medya / Konsept seçkisi</p><h1 class="page-title">FİLMLER.</h1><p class="page-intro">Kendi kayak filmin için<br>görsel ilhamlar.</p></section><section class="works archive"><div class="work-grid">${projects.map((p, i) => card(p, i, 'archive')).join('')}</div></section>`;
  const about = () =>
    `<section class="page-top"><p class="eyebrow">Senin anına odaklanan ekip.</p><h1 class="page-title">EKİBİMİZ.<br>SENİNLE.</h1><p class="page-intro">Sen kaymanın keyfini çıkar.<br>Biz hikâyeni çekelim.</p></section><div class="about-banner">${renderMedia('about.banner')}</div><p class="statement">Odağımız <em>senin kayak deneyimin.</em> Profesyonel çekim ekibi olarak pistteki anlarını sinematik bir filme dönüştürmek için buradayız. Kayış tarzını, günün heyecanını ve sana ait detayları izliyoruz.</p><section class="about" style="padding-top:20px"><div class="about-photo">${renderMedia('about.portrait')}</div><div class="about-content"><span class="eyebrow">Bakış açımız.</span><h2>HİSSET.<br>YAKALA.<br>PAYLAŞ.</h2><p>Bir inişin heyecanı. Zirvede kısa bir mola. Arkadaşlarınla pistte paylaştığın, sana özel bir kayak günü.<br><br>Çekimi senin deneyimin etrafında kuruyoruz. Kayışını ve dağdaki anlarını sana ait bir hikâyede buluşturuyoruz.</p>${pill('Nasıl çalışıyoruz?', '#/hizmetler')}</div></section>`;
  const contact = () =>
    `<section class="page-top"><p class="eyebrow">Kendi kayak filminin başlangıcı.</p><h1 class="page-title">İLETİŞİM.</h1></section><section class="contact-layout"><p>Kayak gününü nerede geçirmek, hangi anlarını filme almak istiyorsun?<br><br>Kendi kayak çekimini ve hayalindeki filmi birlikte konuşalım.</p><div class="contact-card"><span class="contact-status">Snow Medya</span><h2>Senin kayak filmin.</h2><p>Çekim talepleri için iletişim kanalları henüz açık değil.</p></div></section>`;
  const detail = (p) => {
    const i = projects.indexOf(p),
      next = projects[(i + 1) % projects.length];
    return `<section class="page-top"><p class="eyebrow">${p.category} / ${p.type}</p><h1 class="page-title">${p.title}</h1><p class="page-intro">${p.subtitle}</p></section><div class="detail-hero" data-ambient-surface>${projectMedia(p, 'detail')}</div><div class="detail-body"><dl><div><dt>Film</dt><dd>Snow Medya / Konsept</dd></div><div><dt>Disiplin</dt><dd>${p.category}</dd></div><div><dt>Format</dt><dd>Sinematik video</dd></div></dl><div><p>${p.description}</p><div class="credit-note">Görsel yön çalışmasıdır; tamamlanmış müşteri projesi değildir.</div></div></div><a class="next-project" href="#/is/${next.slug}"><p class="eyebrow">Sıradaki hikâye ↗</p><div class="display">${next.title}</div></a>`;
  };
  let animationContext, responsiveMotion, openingTimeline, clearOpening, ambientVideos;
  let introPlayed = false,
    introActive = false,
    introWaitTimer;
  const titleMeasurements = new WeakMap();
  let backgroundVideo,
    videoObserver,
    videoVisible = false;
  let pageEvents,
    pageFrame,
    refreshFrame,
    routeTween,
    menuTween,
    filmTween,
    pageVersion = 0,
    routeToken = 0;

  // Split only text nodes: inline photos, explicit line breaks and emphasis survive.
  // A single accessible label prevents screen readers from spelling out the animation.
  function splitHeading(element) {
    if (element.dataset.split) return;
    element.dataset.split = 'true';
    const accessibleCopy = element.cloneNode(true);
    accessibleCopy.querySelectorAll('br').forEach((br) => br.replaceWith(' '));
    element.setAttribute('aria-label', accessibleCopy.textContent.replace(/\s+/g, ' ').trim());
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (!node.textContent.trim() || node.parentElement.closest('.inline-img,small')) return;
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(part));
          return;
        }
        const word = document.createElement('span');
        word.className = 'motion-word';
        word.setAttribute('aria-hidden', 'true');
        Array.from(part).forEach((letter) => {
          const char = document.createElement('span');
          char.className = 'motion-char';
          char.textContent = letter;
          word.append(char);
        });
        fragment.append(word);
      });
      node.replaceWith(fragment);
    });
  }

  function revealLetters(element, options = {}) {
    const chars = element.querySelectorAll('.motion-char');
    return gsap.fromTo(
      chars,
      { rotationX: -85, rotationZ: -9, y: 0, yPercent: 45, autoAlpha: 0 },
      {
        rotationX: 0,
        rotationZ: 0,
        y: 0,
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.85,
        stagger: 0.028,
        ease: 'power3.out',
        ...options,
      },
    );
  }

  function syncBackgroundVideo() {
    ambientVideos?.sync();
    const bg = backgroundVideo;
    if (!bg) return;
    if (videoVisible && !film.open && !$('#menu').open && !document.hidden && !reduced)
      bg.play().catch(() => {
        if (bg !== backgroundVideo || !bg.paused) return;
        document
          .querySelectorAll('[data-reel-poster]')
          .forEach((poster) => (poster.style.opacity = '1'));
      });
    else bg.pause();
  }

  function releaseVideo(media) {
    if (!media) return;
    media.pause();
    media.removeAttribute('src');
    media.load();
  }

  function disposePage() {
    pageVersion += 1;
    clearTimeout(introWaitTimer);
    clearOpening?.();
    clearOpening = null;
    lockIntro(false);
    cancelAnimationFrame(pageFrame);
    cancelAnimationFrame(refreshFrame);
    pageEvents?.abort();
    ambientVideos?.destroy();
    ambientVideos = null;
    if (hasGsap) gsap.killTweensOf($('#main').querySelectorAll('*'));
    openingTimeline?.kill();
    openingTimeline = null;
    videoObserver?.disconnect();
    videoObserver = null;
    releaseVideo(backgroundVideo);
    releaseVideo(video);
    backgroundVideo = null;
    videoVisible = false;
    responsiveMotion?.revert();
    responsiveMotion = null;
    animationContext?.revert();
    animationContext = null;
  }

  function lockIntro(active) {
    introActive = active;
    document.documentElement.classList.toggle('intro-lock', active);
    $('#main').inert = active;
    $('.footer').inert = active;
    if (active) {
      lenis?.stop();
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
    } else if (!film.open && !$('#menu').open) lenis?.start();
  }

  function fitManifestoTitle(title) {
    const key = `${innerWidth}/${reelViewport.matches}`;
    const previous = titleMeasurements.get(title);
    if (previous?.key === key) {
      title.style.fontSize = previous.size;
      return;
    }
    title.style.removeProperty('font-size');
    if (reelViewport.matches) {
      title.style.fontSize = getComputedStyle(title).fontSize;
      titleMeasurements.set(title, { key, size: title.style.fontSize });
      return;
    }
    // Rotating letters can inflate scrollWidth; word layout boxes stay stable.
    const width = [...title.childNodes].reduce((total, node) => {
      if (node.nodeType === Node.ELEMENT_NODE) return total + node.offsetWidth;
      const range = document.createRange();
      range.selectNode(node);
      return total + range.getBoundingClientRect().width;
    }, 0);
    if (width > title.clientWidth)
      title.style.fontSize = `${(parseFloat(getComputedStyle(title).fontSize) * (title.clientWidth - 2)) / width}px`;
    else title.style.fontSize = getComputedStyle(title).fontSize;
    titleMeasurements.set(title, { key, size: title.style.fontSize });
  }

  function measureOpening(opening) {
    if (!opening) return;
    const section = $('.manifesto');
    fitManifestoTitle($('.manifesto-title', section));
    const overlap = $('.manifesto-intro', section).offsetHeight;
    section.style.setProperty('--intro-overlap', overlap + 'px');
    opening.style.setProperty('--intro-overlap', overlap + 'px');
    return overlap;
  }

  function animateOpening(opening) {
    const section = $('.manifesto');
    const hero = $('.hero', opening);
    const inset = $('.hero-inset', opening);
    const cover = $('.film-cover', opening);
    const title = $('.manifesto-title', section);
    const controls = [$('.intro-brand-layer', cover), $('.film-caption', cover)];
    const measure = () => measureOpening(opening);
    const overlap = measure();
    const canPlay =
      opening.classList.contains('intro-pending') && document.fonts.status === 'loaded';
    introPlayed = true;
    const originalWidth = opening.clientWidth;
    const finish = () => {
      opening.classList.remove('intro-pending');
      opening.classList.add('intro-complete');
      opening.dataset.introPhase = 'complete';
      gsap.set([cover, ...controls], {
        clearProps: 'left,top,width,height,borderRadius,opacity,visibility,--covered-height',
      });
      gsap.set(section, { clearProps: 'transform' });
      gsap.set(title.querySelectorAll('.motion-char'), {
        clearProps: 'transform,opacity,visibility',
      });
      lockIntro(false);
      measure();
      refreshMeasurements();
    };
    ScrollTrigger.addEventListener('refreshInit', measure);
    if (canPlay) {
      lockIntro(true);
      const mobile = reelViewport.matches;
      const slot = inset.getBoundingClientRect();
      const placeCover = () => {
        const anchor = inset.getBoundingClientRect();
        const parent = opening.getBoundingClientRect();
        gsap.set(cover, {
          left: anchor.left - parent.left,
          top: anchor.top - parent.top,
          width: anchor.width,
          height: anchor.height,
        });
      };
      const heroChars = hero.querySelectorAll('.motion-char');
      const titleChars = title.querySelectorAll('.motion-char');
      gsap.set($('.hero-heading', hero), { autoAlpha: 1 });
      gsap.set([...heroChars, ...titleChars], {
        rotationX: -88,
        rotationZ: -8,
        yPercent: 105,
        autoAlpha: 0,
        transformOrigin: '50% 100%',
      });
      gsap.set(inset, { [mobile ? 'height' : 'width']: 0 });
      gsap.set(cover, { autoAlpha: 0, borderRadius: 10, '--covered-height': '0px' });
      gsap.set(controls, { autoAlpha: 0 });
      gsap.set(section, { y: overlap });
      placeCover();
      opening.dataset.introPhase = 'letters';
      // Video zamanlaması (saniye). Sonraki aşamalar bu değerlerden hesaplanır.
      const mediaStart = 1.75;
      const mediaRevealDuration = 0.675;
      const mediaHoldDuration = 0.3;
      const mediaExpandDuration = 0.6;
      const fullVideoHoldDuration = 0.3;
      const expandStart = mediaStart + mediaRevealDuration + mediaHoldDuration;
      const fullVideoStart = expandStart + mediaExpandDuration;
      const manifestoStart = fullVideoStart + fullVideoHoldDuration;
      // One automatic sequence owns the media and heading; it has no ScrollTrigger.
      openingTimeline = gsap.timeline({ onComplete: finish });
      openingTimeline.to(
        hero.querySelectorAll('.hero-top .motion-char'),
        {
          rotationX: 0,
          rotationZ: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.07,
          ease: 'power3.out',
        },
        0.55,
      );
      openingTimeline.to(
        hero.querySelectorAll('h1 .motion-char'),
        {
          rotationX: 0,
          rotationZ: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.038,
          ease: 'power3.out',
        },
        1.05,
      );
      openingTimeline.set(cover, { autoAlpha: 1 }, mediaStart);
      openingTimeline.call(
        () => {
          opening.dataset.introPhase = 'small-media';
        },
        [],
        mediaStart,
      );
      openingTimeline.to(
        inset,
        {
          [mobile ? 'height' : 'width']: mobile ? slot.height : slot.width,
          duration: mediaRevealDuration,
          ease: 'power3.inOut',
          onUpdate: placeCover,
        },
        mediaStart,
      );
      openingTimeline.call(
        () => {
          opening.dataset.introPhase = 'expanding';
        },
        [],
        expandStart,
      );
      openingTimeline.to(
        cover,
        {
          left: 0,
          top: 0,
          width: () => opening.clientWidth,
          height: () => opening.clientHeight,
          borderRadius: 0,
          duration: mediaExpandDuration,
          ease: 'power3.inOut',
        },
        expandStart,
      );
      openingTimeline.set(hero, { autoAlpha: 0 }, fullVideoStart);
      openingTimeline.call(
        () => {
          opening.dataset.introPhase = 'full-video';
        },
        [],
        fullVideoStart,
      );
      openingTimeline.to(controls, { autoAlpha: 1, duration: 0.35 }, fullVideoStart + 0.15);
      openingTimeline.call(
        () => {
          opening.dataset.introPhase = 'manifesto';
        },
        [],
        manifestoStart,
      );
      openingTimeline.to(section, { y: 0, duration: 0.55, ease: 'power3.inOut' }, manifestoStart);
      // Shrink the visible frame with the manifesto edge, keeping the same video
      // plane underneath. The logo is centred inside that frame at every stage.
      openingTimeline.to(
        cover,
        {
          height: () => opening.clientHeight - overlap,
          '--covered-height': overlap + 'px',
          duration: 0.55,
          ease: 'power3.inOut',
        },
        manifestoStart,
      );
      openingTimeline.to(
        titleChars,
        {
          rotationX: 0,
          rotationZ: 0,
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.65,
          stagger: 0.032,
          ease: 'power3.out',
        },
        manifestoStart + 0.1,
      );
    } else finish();
    const resize = () => {
      // A breakpoint change settles this one-shot intro, never starts another one.
      if (introActive && Math.abs(opening.clientWidth - originalWidth) > 1)
        openingTimeline?.progress(1);
      measure();
    };
    window.addEventListener('resize', resize, { signal: pageEvents.signal });
    return () => {
      openingTimeline?.kill();
      ScrollTrigger.removeEventListener('refreshInit', measure);
      lockIntro(false);
    };
  }

  function configureServices() {
    const section = $('.services');
    if (!section) return;
    const items = [...section.querySelectorAll('.service-item')];
    const shots = [...section.querySelectorAll('.service-shot')];
    const caption = $('.service-caption', section);
    section.classList.add('interactive-services');
    let active = -1;
    let transition;
    const activate = (index, animate = true) => {
      if (index === active) return;
      active = index;
      transition?.kill();
      items.forEach((item, i) => {
        item.open = i === index;
        item.classList.toggle('is-active', i === index);
        shots[i].hidden = i !== index;
      });
      caption.textContent = shootingSteps[index].description;
      // Hidden shots never request video. The shared observer resumes the selected
      // shot only when its frame is visible and no modal covers the page.
      ambientVideos?.sync();
      if (hasGsap && !reduced && animate) {
        transition = gsap.fromTo(
          [shots[index], caption],
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.06,
            overwrite: true,
            onComplete: () =>
              gsap.set([shots[index], caption], { clearProps: 'opacity,transform' }),
          },
        );
      }
      refreshMeasurements();
    };
    activate(0, false);
    items.forEach((item, i) => {
      $('summary', item).addEventListener(
        'click',
        (event) => {
          // Preserve the mobile accordion's ability to collapse its current text.
          if (reelViewport.matches && i === active) return;
          event.preventDefault();
          activate(i);
        },
        { signal: pageEvents.signal },
      );
    });
    reelViewport.addEventListener(
      'change',
      () => {
        if (!reelViewport.matches) items[active].open = true;
        refreshMeasurements();
      },
      { signal: pageEvents.signal },
    );
    pageEvents.signal.addEventListener('abort', () => transition?.kill(), { once: true });
  }

  function animateManifesto(desktop) {
    const section = $('.manifesto');
    if (!section) return;
    const stage = $('.manifesto-stage', section);
    const stack = $('.manifesto-stack', section);
    const title = $('.manifesto-title', section);
    const chapters = [...section.querySelectorAll('.manifesto-chapter')];
    let travel = 0;
    const measure = () => {
      fitManifestoTitle(title);
      travel = Math.max(0, stack.scrollHeight - innerHeight + 48);
    };
    section.classList.toggle('manifesto-scrolling', desktop);
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);
    if (desktop) {
      const sequence = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: () => `+=${Math.max(innerHeight * 1.5, stack.scrollHeight * 1.4)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.25,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      sequence.to(stack, { y: () => -travel, duration: 4, ease: 'none' }, 0);
      chapters.forEach((line, index) => {
        const row = $('.manifesto-row', line);
        const groups = line.querySelectorAll('.manifesto-images');
        const at = index * 0.85;
        sequence.fromTo(
          row,
          { y: 0, yPercent: 115 },
          { yPercent: 0, duration: 0.85, ease: 'power2.out' },
          at,
        );
        sequence.fromTo(
          groups[0].children,
          { rotationX: -85, autoAlpha: 0 },
          { rotationX: 0, autoAlpha: 1, stagger: 0.06, duration: 0.45 },
          at,
        );
        sequence.fromTo(
          groups[1].children,
          { rotationX: -85, autoAlpha: 0 },
          { rotationX: 0, autoAlpha: 1, stagger: 0.06, duration: 0.45 },
          at + 0.35,
        );
        if (index > 0)
          sequence.to(
            chapters[index - 1].querySelectorAll('.manifesto-photo'),
            { autoAlpha: 0, duration: 0.25 },
            at + 0.2,
          );
      });
      sequence.fromTo(
        $('.manifesto-impact', section),
        { y: 0, yPercent: 115 },
        { yPercent: 0, duration: 0.8, ease: 'power2.out' },
        2.6,
      );
      sequence.to(
        chapters[2].querySelectorAll('.manifesto-photo'),
        { autoAlpha: 0, duration: 0.25 },
        2.8,
      );
      sequence.fromTo(
        $('.manifesto-bottom', section),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55 },
        3.15,
      );
    } else {
      [
        ...chapters.map((line) => $('.manifesto-row', line)),
        $('.manifesto-impact', section),
      ].forEach((row) => {
        gsap.fromTo(
          row,
          { y: 0, yPercent: 115 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: row.parentElement,
              start: 'top 96%',
              end: 'top 70%',
              scrub: true,
            },
          },
        );
      });
    }
    return () => {
      ScrollTrigger.removeEventListener('refreshInit', measure);
      section.classList.remove('manifesto-scrolling');
      title.style.removeProperty('font-size');
    };
  }

  function animatePage() {
    if (!hasGsap || reduced) {
      const measure = () => measureOpening($('.opening'));
      measure();
      window.addEventListener('resize', measure, { signal: pageEvents.signal });
      $('.opening')?.classList.add('intro-complete');
      if ($('.opening')) introPlayed = true;
      lockIntro(false);
      return;
    }
    animationContext = gsap.context(() => {
      const opening = $('.opening');
      document.querySelectorAll('.page-title').forEach((title) => revealLetters(title));
      if (typeof ScrollTrigger === 'undefined') return;
      responsiveMotion = gsap.matchMedia();
      responsiveMotion.add(
        { desktop: '(min-width: 851px)', mobile: '(max-width: 850px)' },
        (context) => {
          const desktop = context.conditions.desktop;
          const clearManifesto = animateManifesto(desktop);
          document
            .querySelectorAll(
              '.about-content h2,.services > .section-title,.footer-title,.home-works .section-title',
            )
            .forEach((title) => {
              revealLetters(title, {
                stagger: 0.025,
                scrollTrigger: {
                  trigger: title,
                  start: 'top 86%',
                  end: 'top 42%',
                  scrub: desktop ? 0.5 : 0.25,
                },
              });
            });
          document.querySelectorAll('.about-photo,.about-banner,.detail-hero').forEach((media) => {
            gsap.fromTo(
              media,
              { clipPath: 'inset(12% 8% 12% 8%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'none',
                scrollTrigger: { trigger: media, start: 'top 92%', end: 'top 28%', scrub: 0.5 },
              },
            );
            gsap.fromTo(
              $('.ambient-media', media) || $('img', media),
              { scale: 1.16, yPercent: -4 },
              {
                scale: 1.02,
                yPercent: 3,
                ease: 'none',
                scrollTrigger: {
                  trigger: media,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.5,
                },
              },
            );
          });
          const works = $('.home-works');
          if (works && desktop) {
            const head = $('.section-head', works);
            const grid = $('.work-grid', works);
            const items = [...works.querySelectorAll('.work-stack-item')];
            ScrollTrigger.create({
              trigger: head,
              start: 'center center',
              end: () => `+=${innerHeight * 0.55}`,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });
            items.forEach((item, i) => {
              item.style.zIndex = i + 1;
              if (i === items.length - 1) return;
              ScrollTrigger.create({
                trigger: item,
                start: 'top 20px',
                endTrigger: grid,
                end: 'bottom bottom',
                pin: true,
                pinSpacing: false,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              });
              gsap.to($('.work-card', item), {
                scale: 0.88,
                ease: 'none',
                scrollTrigger: {
                  trigger: items[i + 1],
                  start: 'top bottom',
                  end: 'top 20px',
                  scrub: 0.5,
                },
              });
            });
          } else {
            document.querySelectorAll('.work-card').forEach((card) => {
              gsap.fromTo(
                $('.work-media', card),
                { clipPath: 'inset(10% 0% 0% 0%)', y: 30 },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  y: 0,
                  ease: 'power2.out',
                  scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 65%', scrub: 0.3 },
                },
              );
            });
          }
          return () => {
            clearManifesto?.();
          };
        },
      );
      if (opening) clearOpening = animateOpening(opening);
    });
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    lenis?.resize();
  }
  function closeMenu({ immediate = false, restoreFocus = true } = {}) {
    const menu = $('#menu');
    menuTween?.kill();
    const finish = () => {
      menu.close();
      $('.menu-button').setAttribute('aria-expanded', 'false');
      document.body.classList.remove('locked');
      if (!introActive) lenis?.start();
      syncBackgroundVideo();
      if (restoreFocus) $('.menu-button').focus({ preventScroll: true });
    };
    if (!menu.open) return;
    if (hasGsap && !reduced && !immediate)
      menuTween = gsap.to(menu, {
        yPercent: -100,
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: finish,
      });
    else finish();
  }
  function refreshMeasurements() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
      lenis?.resize();
      updateHeaderContrast();
    });
  }
  function updateHeaderContrast() {
    const header = $('.header');
    const middle = header.getBoundingClientRect().top + header.offsetHeight / 2;
    header.classList.toggle(
      'on-light',
      [...document.querySelectorAll('.manifesto,.services')].some((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= middle && bounds.bottom > middle;
      }),
    );
  }
  function render() {
    disposePage();
    pageEvents = new AbortController();
    if (film.open) closeFilm({ immediate: true });
    closeMenu({ immediate: true, restoreFocus: false });
    const path = location.hash.replace(/^#\/?/, '').split('/');
    let view = home(),
      title = 'Dağın hikâyesini anlatıyoruz.';
    if (path[0] === 'isler') {
      view = archive();
      title = 'Filmler';
    } else if (path[0] === 'hakkimizda') {
      view = about();
      title = 'Ekibimiz';
    } else if (path[0] === 'hizmetler') {
      view = `<section class="page-top"><p class="eyebrow">Snow Medya / Kişisel kayak çekimi</p><h1 class="page-title">ÇEKİMLER.<br>SANA ÖZEL.</h1><p class="page-intro">Pistteki anlarından,<br>senin sinematik filmine.</p></section>${services('services')}`;
      title = 'Çekimler';
    } else if (path[0] === 'iletisim') {
      view = contact();
      title = 'İletişim';
    } else if (path[0] === 'is') {
      const p = projects.find((p) => p.slug === path[1]);
      if (p) {
        view = detail(p);
        title = p.title;
      }
    }
    $('#main').innerHTML = view;
    $('#main').inert = false;
    $('.footer').inert = false;
    $('#main').addEventListener(
      'load',
      (event) => {
        if (event.target instanceof HTMLImageElement) refreshMeasurements();
      },
      { capture: true, signal: pageEvents.signal },
    );
    $('#main').addEventListener(
      'toggle',
      (event) => {
        if (reelViewport.matches || !event.target.closest('.interactive-services'))
          refreshMeasurements();
      },
      {
        capture: true,
        signal: pageEvents.signal,
      },
    );
    document.body.classList.toggle('motion-enabled', hasGsap && !reduced);
    if (hasGsap && !reduced) {
      document
        .querySelectorAll(
          '.hero-top .word,.hero h1,.manifesto-title,.page-title,.about-content h2,.section-title,.footer-title',
        )
        .forEach(splitHeading);
      const opening = $('.opening');
      if (opening && !introPlayed) {
        opening.classList.add('intro-pending');
        lockIntro(true);
      }
      $('.manifesto')?.classList.add('manifesto-motion');
    }
    document.title = `Snow Medya — ${title}`;
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
    lenis?.resize();
    updateHeaderContrast();
    configureVideo();
    ambientVideos = createAmbientVideos($('#main'), {
      reduced,
      viewport: reelViewport,
      blocked: () => film.open || $('#menu').open,
      signal: pageEvents.signal,
    });
    configureServices();
    const version = pageVersion;
    const poster = $('[data-reel-poster]');
    const ready = Promise.all([document.fonts.ready, poster?.decode().catch(() => {})]);
    // A failed/slow resource must never trap the page in its opening state.
    Promise.race([
      ready,
      new Promise((resolve) => {
        introWaitTimer = setTimeout(resolve, 1800);
      }),
    ]).then(() => {
      clearTimeout(introWaitTimer);
      if (version !== pageVersion) return;
      pageFrame = requestAnimationFrame(animatePage);
    });
    document.fonts.ready.then(() => {
      if (version === pageVersion) {
        if (!openingTimeline) titleMeasurements.delete($('.manifesto-title'));
        measureOpening($('.opening'));
        refreshMeasurements();
      }
    });
  }
  async function navigate() {
    if (location.hash === '#film-alani' || location.hash === '#main') return;
    const token = ++routeToken;
    routeTween?.kill();
    closeMenu({ immediate: true, restoreFocus: false });
    if (film.open) closeFilm({ immediate: true });
    // Keep the current page visible while the destination's first image decodes.
    const slug = location.hash.replace(/^#\/?/, '').split('/')[1];
    const project = mediaSlots[`detail.project.${slug}`];
    const variant = reelViewport.matches ? 'mobile' : 'desktop';
    const image = new Image();
    image.src = project
      ? project.video
        ? `assets/${project.video}-${variant}.jpg`
        : `assets/${project.image}`
      : reelMedia().poster;
    await image.decode().catch(() => {});
    if (token !== routeToken) return;
    render();
    $('#main').focus({ preventScroll: true });
    if (hasGsap && !reduced)
      routeTween = gsap.fromTo(
        $('#main'),
        { y: 18 },
        { y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'transform' },
      );
  }
  $('.menu-button').addEventListener('click', () => {
    const menu = $('#menu');
    menuTween?.kill();
    menu.showModal();
    $('.menu-button').setAttribute('aria-expanded', 'true');
    document.body.classList.add('locked');
    lenis?.stop();
    syncBackgroundVideo();
    if (hasGsap && !reduced) {
      menu.querySelectorAll('nav a').forEach(splitHeading);
      menuTween = gsap
        .timeline()
        .fromTo(menu, { yPercent: -100 }, { yPercent: 0, duration: 0.65, ease: 'power3.inOut' })
        .fromTo(
          menu.querySelectorAll('nav .motion-char'),
          { rotationX: -85, yPercent: 30, autoAlpha: 0 },
          {
            rotationX: 0,
            yPercent: 0,
            autoAlpha: 1,
            stagger: 0.016,
            duration: 0.65,
            ease: 'power3.out',
          },
          0.25,
        );
    } else if (hasGsap) gsap.set(menu, { clearProps: 'transform' });
  });
  $('.menu-close').addEventListener('click', () => closeMenu());
  $('#menu').addEventListener('cancel', (event) => {
    event.preventDefault();
    closeMenu();
  });
  $('#menu').addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (link) closeMenu({ immediate: link.hash !== location.hash });
  });
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href="#film-alani"]');
    const skip = e.target.closest('a[href="#main"]');
    if (skip) {
      e.preventDefault();
      $('#main').focus({ preventScroll: true });
    }
    if (a) {
      e.preventDefault();
      const target = $('#film-alani');
      if (introActive) return;
      if (lenis) lenis.scrollTo(target);
      else target?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' });
    }
  });
  $('#back-top').addEventListener('click', () =>
    lenis
      ? lenis.scrollTo(0)
      : window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' }),
  );
  const film = $('#film'),
    video = $('video', film);
  function closeFilm({ immediate = false } = {}) {
    filmTween?.kill();
    video.pause();
    const fullscreenExit =
      document.fullscreenElement === video
        ? document.exitFullscreen().catch(() => {})
        : Promise.resolve();
    const finish = () => {
      film.close();
      document.body.classList.remove('locked');
      if (!introActive) lenis?.start();
      syncBackgroundVideo();
      fullscreenExit.then(() =>
        requestAnimationFrame(() => {
          if (!film.open && !$('#menu').open) $('[data-film]')?.focus({ preventScroll: true });
        }),
      );
    };
    if (hasGsap && !reduced && !immediate)
      filmTween = gsap.to(film, { opacity: 0, duration: 0.2, onComplete: finish });
    else finish();
  }
  $('.film-close').addEventListener('click', () => closeFilm());
  film.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeFilm();
  });
  function configureVideo() {
    const button = $('[data-film]');
    const cover = $('.film-cover');
    if (!cover && !button) return;
    {
      video.poster = reelMedia().poster;
      button?.addEventListener('click', () => {
        const media = reelMedia();
        if (video.getAttribute('src') !== media.src) video.src = media.src;
        filmTween?.kill();
        film.showModal();
        if (hasGsap && !reduced)
          filmTween = gsap.fromTo(film, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        else film.style.opacity = '1';
        document.body.classList.add('locked');
        lenis?.stop();
        syncBackgroundVideo();
        video.play().catch(() => {});
      });
      if (!reduced && cover) {
        const bg = document.createElement('video');
        backgroundVideo = bg;
        bg.className = 'reel-background';
        bg.muted = true;
        bg.defaultMuted = true;
        bg.autoplay = true;
        bg.loop = true;
        bg.playsInline = true;
        bg.preload = 'metadata';
        bg.poster = reelMedia().poster;
        bg.src = reelMedia().src;
        bg.setAttribute('aria-hidden', 'true');
        cover.prepend(bg);
        bg.addEventListener(
          'playing',
          () => {
            if (!videoVisible || film.open || $('#menu').open || document.hidden || reduced) {
              bg.pause();
              return;
            }
            document
              .querySelectorAll('[data-reel-poster]')
              .forEach((poster) => (poster.style.opacity = '0'));
          },
          { signal: pageEvents.signal },
        );
        bg.addEventListener('loadeddata', syncBackgroundVideo, { signal: pageEvents.signal });
        bg.addEventListener(
          'error',
          () => {
            document
              .querySelectorAll('[data-reel-poster]')
              .forEach((poster) => (poster.style.opacity = '1'));
          },
          { signal: pageEvents.signal },
        );
        videoObserver = new IntersectionObserver(
          (entries) => {
            videoVisible = entries.some((e) => e.isIntersecting);
            syncBackgroundVideo();
          },
          { threshold: 0.05 },
        );
        videoObserver.observe(cover);
        const rect = cover.getBoundingClientRect();
        videoVisible = rect.top < innerHeight && rect.bottom > 0;
        syncBackgroundVideo();
      }
      // Stop both old requests before a breakpoint selects the other rendition.
      reelViewport.addEventListener(
        'change',
        () => {
          const media = reelMedia();
          const resume = film.open && !video.paused;
          const time = film.open ? video.currentTime : 0;
          releaseVideo(backgroundVideo);
          releaseVideo(video);
          video.poster = media.poster;
          document.querySelectorAll('[data-reel-poster]').forEach((poster) => {
            poster.src = media.poster;
            poster.style.opacity = '1';
          });
          if (backgroundVideo) {
            backgroundVideo.poster = media.poster;
            backgroundVideo.src = media.src;
            syncBackgroundVideo();
          }
          if (film.open) {
            // A paused preload="none" player will not emit loadedmetadata until
            // explicitly loaded; the breakpoint switch still needs its seek state.
            video.preload = 'metadata';
            video.src = media.src;
            video.addEventListener(
              'loadedmetadata',
              () => {
                video.currentTime = Math.min(time, video.duration);
                if (resume) video.play().catch(() => {});
              },
              { once: true, signal: pageEvents.signal },
            );
            video.load();
          }
        },
        { signal: pageEvents.signal },
      );
    }
  }
  $('#year').textContent = new Date().getFullYear();
  window.addEventListener('hashchange', navigate);
  document.addEventListener('visibilitychange', syncBackgroundVideo);
  const introOwnsScroll = () => introActive && !film.open && !$('#menu').open;
  const preventIntroScroll = (event) => {
    if (introOwnsScroll()) event.preventDefault();
  };
  window.addEventListener('wheel', preventIntroScroll, { passive: false });
  window.addEventListener('touchmove', preventIntroScroll, { passive: false });
  window.addEventListener('keydown', (event) => {
    if (
      introOwnsScroll() &&
      ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)
    )
      event.preventDefault();
  });
  window.addEventListener(
    'scroll',
    () => {
      if (introOwnsScroll() && scrollY !== 0) {
        window.scrollTo(0, 0);
        lenis?.scrollTo(0, { immediate: true, force: true });
      }
    },
    { passive: true },
  );
  let headerFrame;
  window.addEventListener(
    'scroll',
    () => {
      if (headerFrame) return;
      headerFrame = requestAnimationFrame(() => {
        headerFrame = null;
        updateHeaderContrast();
      });
    },
    { passive: true },
  );
  motionPreference.addEventListener('change', () => {
    reduced = motionPreference.matches;
    routeToken += 1;
    routeTween?.kill();
    lenis?.destroy();
    lenis =
      !reduced && typeof Lenis !== 'undefined'
        ? new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.95 })
        : null;
    if (typeof ScrollTrigger !== 'undefined') lenis?.on('scroll', ScrollTrigger.update);
    render();
  });
  render();
})();
