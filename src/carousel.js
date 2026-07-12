// Progressive enhancement: turn each .gallery into a carousel with prev/next
// buttons and dot indicators. Native scroll/swipe still works without this.
(function () {
  var galleries = document.querySelectorAll('.gallery');

  galleries.forEach(function (g) {
    var slides = Array.prototype.slice.call(g.children);
    if (slides.length < 2) return;

    var wrap = document.createElement('div');
    wrap.className = 'carousel';
    g.parentNode.insertBefore(wrap, g);
    wrap.appendChild(g);

    var prev = button('carousel-btn carousel-prev', 'Previous image', '\u2039');
    var next = button('carousel-btn carousel-next', 'Next image', '\u203A');
    wrap.appendChild(prev);
    wrap.appendChild(next);

    var dots = document.createElement('div');
    dots.className = 'carousel-dots';
    slides.forEach(function (_, i) {
      var d = button('carousel-dot', 'Go to image ' + (i + 1), '');
      d.addEventListener('click', function () { scrollToIndex(i); });
      dots.appendChild(d);
    });
    wrap.appendChild(dots);

    function current() {
      var best = 0, bestDist = Infinity;
      var center = g.scrollLeft + g.clientWidth / 2;
      slides.forEach(function (s, i) {
        var c = s.offsetLeft + s.offsetWidth / 2;
        var dist = Math.abs(c - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }

    function scrollToIndex(i) {
      var idx = Math.max(0, Math.min(slides.length - 1, i));
      var s = slides[idx];
      g.scrollTo({ left: s.offsetLeft - (g.clientWidth - s.offsetWidth) / 2, behavior: 'smooth' });
    }

    function sync() {
      var c = current();
      Array.prototype.slice.call(dots.children).forEach(function (d, i) {
        d.setAttribute('aria-current', i === c ? 'true' : 'false');
      });
    }

    prev.addEventListener('click', function () { scrollToIndex(current() - 1); });
    next.addEventListener('click', function () { scrollToIndex(current() + 1); });
    g.addEventListener('scroll', function () { window.requestAnimationFrame(sync); }, { passive: true });
    sync();
  });

  function button(cls, label, text) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = cls;
    b.setAttribute('aria-label', label);
    if (text) b.innerHTML = text;
    return b;
  }
})();
