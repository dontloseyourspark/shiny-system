// Process page step bar: highlights the step currently being read and keeps
// the active pill visible when the bar scrolls sideways on small screens.
(function () {
  var bar = document.querySelector('.step-bar');
  if (!bar) return;
  var links = Array.prototype.slice.call(bar.querySelectorAll('a'));
  var steps = links.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });
  var current = -1;

  function update() {
    var offset = bar.getBoundingClientRect().bottom + 24;
    var active = -1;
    steps.forEach(function (step, i) {
      if (step && step.getBoundingClientRect().top <= offset) active = i;
    });
    if (active === current) return;
    current = active;
    links.forEach(function (link, i) {
      link.classList.toggle('is-active', i === active);
      if (i === active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    var link = links[active];
    if (link && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({ left: link.offsetLeft - 16, behavior: 'smooth' });
    }
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }, { passive: true });
  update();
})();
