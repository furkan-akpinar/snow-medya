// One selected rendition per surface; video requests start only in view.
export function createAmbientVideos(root, { reduced, viewport, blocked, signal }) {
  let frame = 0;
  let disposed = false;
  const entries = [...root.querySelectorAll('[data-ambient]')].map((host) => ({
    host,
    surface: host.closest('[data-ambient-surface]') || host,
    video: host.querySelector('video'),
    poster: host.querySelector('img'),
    visible: false,
    pending: false,
    failed: false,
    generation: 0,
  }));
  const media = (entry) => {
    const variant = viewport.matches
      ? entry.host.hasAttribute('data-mobile-wide')
        ? 'mobile-wide'
        : 'mobile'
      : 'desktop';
    const base = `assets/${entry.host.dataset.ambient}-${variant}`;
    return { src: `${base}.mp4`, poster: `${base}.jpg` };
  };
  const showPoster = (entry) => entry.host.classList.remove('is-playing');
  const clear = (entry) => {
    entry.generation += 1;
    entry.pending = false;
    entry.video.pause();
    entry.video.removeAttribute('src');
    entry.video.load();
    entry.failed = false;
    showPoster(entry);
  };
  const uncovered = (entry) => {
    const rect = entry.host.getBoundingClientRect();
    const left = Math.max(0, rect.left);
    const right = Math.min(innerWidth, rect.right);
    const top = Math.max(0, rect.top);
    const bottom = Math.min(innerHeight, rect.bottom);
    if (right <= left || bottom - top < 24) return false;
    const front = document.elementFromPoint((left + right) / 2, (top + bottom) / 2);
    return !!front && entry.surface.contains(front);
  };
  const wantsPlay = (entry) =>
    !disposed && !reduced && !document.hidden && !blocked() && entry.visible && uncovered(entry);
  const sync = () => {
    if (disposed) return;
    for (const entry of entries) {
      if (!wantsPlay(entry)) {
        entry.video.pause();
        continue;
      }
      if (entry.failed || entry.pending || !entry.video.paused) continue;
      const selected = media(entry);
      if (entry.video.getAttribute('src') !== selected.src) entry.video.src = selected.src;
      entry.pending = true;
      const generation = entry.generation;
      entry.video
        .play()
        .catch(() => {
          if (generation === entry.generation && wantsPlay(entry) && entry.video.paused) {
            entry.failed = true;
            showPoster(entry);
          }
        })
        .finally(() => {
          if (generation === entry.generation) entry.pending = false;
        });
    }
  };
  const schedule = () => {
    if (!frame && !disposed)
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
  };
  const observer = new IntersectionObserver(
    (changes) => {
      for (const change of changes) {
        const entry = entries.find((item) => item.host === change.target);
        entry.visible = change.isIntersecting;
        if (!entry.visible) entry.failed = false;
      }
      sync();
    },
    { threshold: [0, 0.05, 0.5] },
  );
  for (const entry of entries) {
    const selected = media(entry);
    entry.video.muted = true;
    entry.video.defaultMuted = true;
    entry.video.poster = selected.poster;
    entry.video.addEventListener(
      'playing',
      () => {
        if (wantsPlay(entry)) entry.host.classList.add('is-playing');
        else entry.video.pause();
      },
      { signal },
    );
    entry.video.addEventListener(
      'error',
      () => {
        entry.failed = true;
        showPoster(entry);
      },
      { signal },
    );
    if (!reduced) observer.observe(entry.host);
  }
  viewport.addEventListener(
    'change',
    () => {
      for (const entry of entries) {
        clear(entry);
        const selected = media(entry);
        // Retain the decoded poster while the other crop loads.
        const replacement = new Image();
        replacement.src = selected.poster;
        replacement
          .decode()
          .then(() => {
            if (disposed || media(entry).poster !== selected.poster) return;
            entry.poster.src = selected.poster;
            entry.video.poster = selected.poster;
          })
          .catch(() => {});
      }
      schedule();
    },
    { signal },
  );
  window.addEventListener('scroll', schedule, { passive: true, signal });
  window.addEventListener('resize', schedule, { passive: true, signal });
  document.addEventListener('visibilitychange', sync, { signal });
  return {
    sync,
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      entries.forEach(clear);
    },
  };
}
