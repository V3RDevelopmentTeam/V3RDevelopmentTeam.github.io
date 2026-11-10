document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#games');
  const scroller = root.querySelector('.game-scroll');
  const cards = [...scroller.querySelectorAll('.game-card')];
  const prev = root.querySelector('.game-arrow.prev');
  const next = root.querySelector('.game-arrow.next');
  const pagination = root.querySelector('.game-pagination');

  let active = 0;

  const dots = cards.map((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goTo(i));
    pagination.appendChild(dot);
    return dot;
  });

  function setActive(i) {
    active = i;
    dots.forEach((d, n) => d.classList.toggle('active', n === i));
  }

  function goTo(i) {
    i = Math.max(0, Math.min(cards.length - 1, i));
    cards[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActive(i);
  }

  // Track the card closest to the scroller's center
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setActive(cards.indexOf(e.target));
    });
  }, { root: scroller, threshold: 0.6 });
  cards.forEach((c) => observer.observe(c));

  prev.addEventListener('click', () => goTo(active - 1));
  next.addEventListener('click', () => goTo(active + 1));

  setActive(0);
});