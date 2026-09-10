import { createAmbientVideos } from './ambient-video.js';

(() => {
  'use strict';
  // Hash routes own their scroll position, including browser reload/back/forward.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  const $ = (s, root = document) => root.querySelector(s);
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = motionPreference.matches;
  const reelViewport = matchMedia('(max-width: 850px)');
  const reelMedia = () => {
    const variant = reelViewport.matches ? 'mobile' : 'desktop';
    return {
      src: `assets/reel-4274798-${variant}.mp4`,
      poster: `assets/reel-4274798-${variant}.jpg`,
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
      image: 'hero.jpg',
      video: 'project-ski-11246371',
      subtitle: 'Herkesten önce. Her şeyden uzakta.',
      description:
        'Henüz kimsenin dokunmadığı bir yamaç. Soğuk hava, ilk ışık ve tek bir çizgi. İlk İz, kayak sporunun hızından önce gelen o sessiz anın peşine düşen bir film fikri.',
    },
    {
      slug: 'yercekimine-karsi',
      title: 'Yerçekimine Karşı.',
      category: 'Snowboard',
      type: 'Sporcu hikâyesi · Konsept',
      image: 'snowboard.jpg',
      video: 'project-snowboard-6947516',
      subtitle: 'Kendi çizgini bul.',
      description:
        'Her iniş, yeni bir ifade biçimi. Snowboard kültürünü özgürlük, hareket ve sporcunun bakış açısıyla anlatan bir görsel hikâye. Yakın plan detaylar, geniş dağ manzaraları ve hareketin ritmi.',
    },
    {
      slug: 'zirvede-bir-gun',
      title: 'Zirvede Bir Gün.',
      category: 'Dağ Yaşamı',
      type: 'Destinasyon filmi · Konsept',
      image: 'resort.jpg',
      video: 'project-resort-4185345',
      subtitle: 'Bir pistten çok daha fazlası.',
      description:
        'İlk teleferikten günün son inişine uzanan bir dağ günü. Pistleri, manzarayı ve dağda olmanın hissini bir araya getiren bir destinasyon filmi yaklaşımı.',
    },
    {
      slug: 'kis-bitmeden',
      title: 'Kış Bitmeden.',
      category: 'Freeride',
      type: 'Sezon kampanyası · Konsept',
      image: 'hero.jpg',
      subtitle: 'Bir iniş daha.',
      description:
        'Kısa günler. Uzun hatıralar. Sezonun enerjisini kayak, freeride ve dağ yaşamından kesitlerle birleştiren bir kampanya fikri. Kışın içinde olma hissini ekranın ötesine taşıyan görüntüler.',
    },
  ];
  const pill = (text, href) => `<a class="pill light" href="${href}">${text}<span>↗</span></a>`;
  const ambient = (name, alt, wideMobile = false) => {
    const variant = reelViewport.matches ? (wideMobile ? 'mobile-wide' : 'mobile') : 'desktop';
    const poster = `assets/${name}-${variant}.jpg`;
    return `<div class="ambient-media" data-ambient="${name}" ${wideMobile ? 'data-mobile-wide' : ''}><img src="${poster}" alt="${alt}" loading="lazy" decoding="async"><video autoplay muted loop playsinline preload="none" aria-hidden="true"></video></div>`;
  };
  const projectMedia = (p, i = -1) =>
    p.video
      ? ambient(p.video, `${p.category} ve karlı dağ manzarası`, i === 1)
      : `<img src="assets/${p.image}" alt="${p.category} ve karlı dağ manzarası" loading="lazy" ${i === 3 ? 'style="object-position:75% center"' : ''}>`;
  const card = (p, i) =>
    `<a class="work-card" data-ambient-surface href="#/is/${p.slug}" aria-label="${p.title} projesini incele"><div class="work-media">${projectMedia(p, i)}<span class="work-number">0${i + 1} / SNOW MEDYA</span><span class="work-arrow" aria-hidden="true">↗</span></div><div class="work-info"><div><h3>${p.title}</h3><p>${p.type}</p></div><span class="tag">${p.category}.</span></div></a>`;
  const services = () =>
    `<section class="services"><p class="eyebrow" style="margin-bottom:25px">Fikirden son kareye.</p><h2 class="section-title">HER AŞAMADA.<br>AYNI TUTKU.</h2><div class="service-layout"><div class="service-image"><img src="assets/snowboard.jpg" alt="Karlı yamaçta dağ sporcusu" loading="lazy"></div><div class="service-list"><details class="service-item" open><summary><small>01</small><h3>Çekim Öncesi.</h3><span class="plus" aria-hidden="true">+</span></summary><p>Hikâyeyi dağa çıkmadan kuruyoruz. Yaratıcı fikir, lokasyon araştırması ve çekim planını; mevsim, hava ve sporun gerektirdiği koşullarla birlikte düşünüyoruz.</p><ul><li>Yaratıcı konsept</li><li>Lokasyon</li><li>Çekim planı</li></ul></details><details class="service-item"><summary><small>02</small><h3>Prodüksiyon.</h3><span class="plus" aria-hidden="true">+</span></summary><p>Hareketin içinde, hikâyenin yakınında. Kayak merkezi tanıtımları, sporcu portreleri ve dağ sporları içerikleri için film ve fotoğraf üretimi.</p><ul><li>Film</li><li>Fotoğraf</li><li>Havadan çekim</li></ul></details><details class="service-item"><summary><small>03</small><h3>Post Prodüksiyon.</h3><span class="plus" aria-hidden="true">+</span></summary><p>Görüntüye ritim, hikâyeye karakter katıyoruz. Kurgu, renk ve ses tasarımından sosyal medya uyarlamalarına kadar her kareyi bir bütünün parçası olarak ele alıyoruz.</p><ul><li>Kurgu & renk</li><li>Ses tasarımı</li><li>Sosyal içerik</li></ul></details></div></div></section>`;
  const manifesto = () => {
    const photos = ['hero.jpg', 'snowboard.jpg', 'resort.jpg'];
    const group = (reverse = false) =>
      `<span class="manifesto-images" aria-hidden="true">${(reverse ? [...photos].reverse() : photos).map((photo) => `<span class="manifesto-photo"><img src="assets/${photo}" alt="" loading="lazy" decoding="async"></span>`).join('')}</span>`;
    return `<section class="manifesto intro-linked" aria-labelledby="manifesto-title"><div class="manifesto-track"><div class="manifesto-stage"><div class="manifesto-stack">
      <div class="manifesto-line manifesto-intro"><div class="manifesto-mask"><h2 id="manifesto-title" class="manifesto-title">DAĞIN HİKÂYESİNİ ANLATIYORUZ.</h2></div></div>
      ${['PRODÜKSİYON', 'HİKÂYE ANLATIMI', 'VE UYGULAMA'].map((text, i) => `<div class="manifesto-line manifesto-chapter"><div class="manifesto-mask"><div class="manifesto-row">${group(i === 1)}<h3 class="manifesto-text">${text}</h3>${group(i !== 1)}</div></div></div>`).join('')}
      <div class="manifesto-line manifesto-outro"><div class="manifesto-mask"><p class="manifesto-impact">İZ BIRAKMAK İÇİN.</p></div><div class="manifesto-bottom"><p>Kayak, snowboard ve dağ yaşamı.<br>Dağda başlayan hikâyeler, ekranda iz bırakır.</p><a class="pill" href="#/hakkimizda">Snow Medya’yı tanı. <span>↗</span></a></div></div>
    </div></div></div></section>`;
  };
  const home = () =>
    `<div class="opening auto-intro"><section class="hero"><div class="hero-heading"><div class="hero-top display"><span class="word">WE</span><div class="hero-inset"><img data-reel-poster src="${reelMedia().poster}" alt="Karla kaplı yamaçta kayakçı" fetchpriority="high"></div><span class="word">ARE</span></div><h1>SNOW MEDYA</h1></div><div class="hero-bottom"><p>Dağın ruhunu,<br>hareketin hikâyesini çekiyoruz.</p><a class="scroll-cue" href="#film-alani">Keşfet <span>↓</span></a><div class="hero-note">Kayak. Snowboard. Dağ yaşamı.<br>Yaratıcı prodüksiyon stüdyosu.</div></div></section><section class="film-cover" id="film-alani"><img data-reel-poster src="${reelMedia().poster}" alt="Karla kaplı yamaçta kayakçı" class="parallax" loading="eager"><button class="reel-button" data-film aria-label="Kayak filmi seçkisini oynat"><span>DAĞIN</span><span class="play-disc" aria-hidden="true">▶</span><span>RİTMİ.</span></button><div class="film-caption"><span>Snow Medya / Görsel seçki</span><span>Soğuğu hisset. Anı yaşa.</span></div></section></div>${manifesto()}<section class="about about-video" data-ambient-surface>${ambient('about-mountains-4161595', 'Karlı dağlar ve teleferikler üzerinde sakin hava çekimi')}<div class="about-content"><span class="eyebrow">Biz Snow Medya.</span><h2>YÜKSEKTE.<br>HAREKETTE.<br>HİKÂYENİN<br>İÇİNDE.</h2><p><strong>Kayak merkezleri, dağ sporları ve açık hava markaları için görsel hikâyeler.</strong><br><br>Bizim için iyi bir görüntü yalnızca ne gördüğünü değil, ne hissettiğini de anlatır. Karın sesini, inişin heyecanını ve zirvenin sessizliğini bir araya getiriyoruz.</p>${pill('Bizi tanı.', '#/hakkimizda')}</div></section><section class="works home-works"><div class="section-head"><h2 class="section-title">İŞİMİZ<br>KONUŞSUN.</h2><p class="eyebrow">Snow Medya<br>Konsept seçkisi / 01—04</p></div><div class="work-grid">${projects.map((p, i) => `<div class="work-stack-item">${card(p, i)}</div>`).join('')}</div><div class="works-more">${pill('Tüm hikâyeler.', '#/isler')}</div></section><section class="disciplines"><p class="eyebrow">Aynı tutkuyu paylaşıyoruz.</p><div class="discipline-list"><span>ALP DİSİPLİNİ</span><span>SNOWBOARD</span><span>FREERIDE</span><span>DAĞ YAŞAMI</span></div></section>${services()}`;
  const archive = () =>
    `<section class="page-top"><p class="eyebrow">Snow Medya / Konsept seçkisi</p><h1 class="page-title">İŞLER.</h1><p class="page-intro">Karın üzerinde başlayan,<br>akılda kalan hikâyeler.</p></section><section class="works archive"><div class="work-grid">${projects.map(card).join('')}</div></section>`;
  const about = () =>
    `<section class="page-top"><p class="eyebrow">Dağda kendini bulanlar için.</p><h1 class="page-title">BİZ SNOW<br>MEDYA.</h1><p class="page-intro">Hareketi takip ediyoruz.<br>Hikâyeyi birlikte kuruyoruz.</p></section><div class="about-banner"><img src="assets/resort.jpg" alt="Karlı zirvelerin geniş manzarası"></div><p class="statement">Bizi bir araya getiren şey <em>dağlara duyduğumuz tutku.</em> Kayak ve snowboard kültürünü, doğanın gücünü ve sporun içindeki insan hikâyelerini film ve fotoğrafla anlatmak için buradayız.</p><section class="about" style="padding-top:20px"><div class="about-photo"><img src="assets/snowboard.jpg" alt="Dağda snowboard" loading="lazy"></div><div class="about-content"><span class="eyebrow">Bakış açımız.</span><h2>HİSSET.<br>YAKALA.<br>PAYLAŞ.</h2><p>Bir kayak merkezi için yeni bir sezon. Bir sporcu için yeni bir hedef. Bir marka için yeni bir hikâye.<br><br>Her projeye kendi ritmini bulmak için yaklaşıyoruz. Çünkü dağda birbirinin aynısı iki gün yok.</p>${pill('Nasıl çalışıyoruz?', '#/hizmetler')}</div></section>`;
  const contact = () =>
    `<section class="page-top"><p class="eyebrow">Yeni bir hikâyenin başlangıcı.</p><h1 class="page-title">KONUŞALIM.</h1></section><section class="contact-layout"><p>Bir kayak merkezi, bir sporcu hikâyesi veya bir sonraki sezon kampanyası.<br><br>Aklındaki projeyi birlikte dağa taşıyalım.</p><div class="contact-card"><span class="contact-status">Snow Medya</span><h2>Bir sonraki çekime doğru.</h2><p>İletişim kanallarımız yakında burada. Film, fotoğraf ve sezon kampanyaları için yeni hikâyeler hazırlıyoruz.</p><p style="margin-top:30px">Film prodüksiyonu<br>Spor & destinasyon fotoğrafçılığı<br>Marka ve sosyal medya içerikleri</p></div></section>`;
  const detail = (p) => {
    const i = projects.indexOf(p),
      next = projects[(i + 1) % projects.length];
    return `<section class="page-top"><p class="eyebrow">${p.category} / ${p.type}</p><h1 class="page-title">${p.title}</h1><p class="page-intro">${p.subtitle}</p></section><div class="detail-hero" data-ambient-surface>${projectMedia(p)}</div><div class="detail-body"><dl><div><dt>Proje</dt><dd>Snow Medya / Konsept</dd></div><div><dt>Disiplin</dt><dd>${p.category}</dd></div><div><dt>Format</dt><dd>Film & fotoğraf</dd></div></dl><div><p>${p.description}</p><div class="credit-note">Görsel yön çalışmasıdır; tamamlanmış müşteri projesi değildir.</div></div></div><a class="next-project" href="#/is/${next.slug}"><p class="eyebrow">Sıradaki hikâye ↗</p><div class="display">${next.title}</div></a>`;
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
      { rotationX: -85, rotationZ: -9, yPercent: 45, autoAlpha: 0 },
      {
        rotationX: 0,
        rotationZ: 0,
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
    const controls = [$('.reel-button', cover), $('.film-caption', cover)];
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
        clearProps: 'left,top,width,height,borderRadius,opacity,visibility',
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
      gsap.set(cover, { autoAlpha: 0, borderRadius: 10 });
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

  function animateServices(desktop) {
    const section = $('.services');
    if (!section || !desktop) return;
    const items = [...section.querySelectorAll('.service-item')];
    const photo = $('.service-image img', section);
    const caption = document.createElement('p');
    caption.className = 'service-caption';
    caption.setAttribute('aria-live', 'polite');
    photo.parentElement.append(caption);
    section.classList.add('interactive-services');
    let active = -1;
    const activate = (index) => {
      if (index === active) return;
      active = index;
      items.forEach((item, i) => {
        item.open = i === index;
        item.classList.toggle('is-active', i === index);
      });
      caption.textContent = `${$('p', items[index]).textContent} ${[...items[index].querySelectorAll('li')].map((item) => item.textContent).join(' · ')}`;
      photo.src = `assets/${['resort.jpg', 'snowboard.jpg', 'hero.jpg'][index]}`;
      photo.alt = ['Karlı kayak merkezi', 'Karlı yamaçta snowboard', 'Dağda kayak'][index];
      gsap.fromTo(
        [photo, caption],
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.06, overwrite: true },
      );
    };
    activate(0);
    const handlers = items.map((item, i) => {
      const handler = (event) => {
        event.preventDefault();
        activate(i);
      };
      $('summary', item).addEventListener('click', handler);
      return handler;
    });
    return () => {
      handlers.forEach((handler, i) =>
        $('summary', items[i]).removeEventListener('click', handler),
      );
      items.forEach((item, i) => {
        item.open = i === 0;
        item.classList.remove('is-active');
      });
      gsap.killTweensOf([photo, caption]);
      photo.src = 'assets/snowboard.jpg';
      photo.alt = 'Karlı yamaçta dağ sporcusu';
      photo.style.removeProperty('opacity');
      photo.style.removeProperty('transform');
      caption.remove();
      section.classList.remove('interactive-services');
    };
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
          const clearServices = animateServices(desktop);
          return () => {
            clearServices?.();
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
      title = 'İşler';
    } else if (path[0] === 'hakkimizda') {
      view = about();
      title = 'Biz';
    } else if (path[0] === 'hizmetler') {
      view = `<section class="page-top"><p class="eyebrow">Snow Medya / Ne yapıyoruz?</p><h1 class="page-title">FİKİRDEN<br>ZİRVEYE.</h1><p class="page-intro">Hikâyenin her aşamasında,<br>seninle aynı rotadayız.</p></section>${services()}`;
      title = 'Hizmetler';
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
        if (!event.target.closest('.interactive-services')) refreshMeasurements();
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
    const project = projects.find((item) => item.slug === slug);
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
    if (!button) return;
    {
      video.poster = reelMedia().poster;
      button.addEventListener('click', () => {
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
      if (!reduced) {
        const cover = $('.film-cover');
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
