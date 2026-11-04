(function () {
  var d = document, b = d.body;

  /* ---------- Mobile menu ---------- */
  var burger = d.getElementById('burger'), nav = d.getElementById('nav'), ov = d.getElementById('navOv');
  function setNav(open) {
    if (!burger || !nav) return;
    burger.classList.toggle('open', open);
    nav.classList.toggle('open', open);
    b.classList.toggle('nav-open', open);
  }
  if (burger && nav) {
    burger.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setNav(false); }); });
    if (ov) ov.addEventListener('click', function () { setNav(false); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') setNav(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 820) setNav(false); });
  }

  var y = d.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  var loader = d.getElementById('loader'), t0 = Date.now();
  function ready() {
    if (b.classList.contains('ready')) return;
    b.classList.add('ready');
    if (loader) { loader.classList.add('done'); setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 1000); }
  }
  window.addEventListener('load', function () { setTimeout(ready, Math.max(0, 800 - (Date.now() - t0))); });
  setTimeout(ready, 2000);

  /* ---------- Scroll progress, sticky header, back-to-top ---------- */
  var bar = d.getElementById('progress'), hdr = d.getElementById('header'), topBtn = d.getElementById('totop'), ticking = false;
  function onScroll() {
    var yy = window.pageYOffset || d.documentElement.scrollTop;
    var h = d.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.width = (h > 0 ? (yy / h) * 100 : 0) + '%';
    if (hdr) hdr.classList.toggle('scrolled', yy > 40);
    if (topBtn) topBtn.classList.toggle('show', yy > 600);
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  if (topBtn) topBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* ---------- Scroll reveal with stagger ---------- */
  var els = [].slice.call(d.querySelectorAll('.reveal'));
  els.forEach(function (el) {
    var sibs = [].filter.call(el.parentElement.children, function (c) { return c.classList.contains('reveal'); });
    if (sibs.length > 1) el.style.transitionDelay = (Math.min(sibs.indexOf(el), 5) * 0.12) + 's';
  });
  function show(el) {
    el.classList.add('in');
    setTimeout(function () { el.style.transitionDelay = ''; el.classList.add('done'); }, 1600);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else { els.forEach(show); }

  /* ---------- Pause heavy animations when off-screen ---------- */
  var heroEl = d.querySelector('.hero');
  if (heroEl && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { b.classList.toggle('away', !es[0].isIntersecting); }).observe(heroEl);
  }
  d.addEventListener('visibilitychange', function () { b.classList.toggle('away', d.hidden); });

  /* ---------- Hero particles ---------- */
  var pc = d.getElementById('particles');
  if (pc) {
    var n = window.innerWidth < 640 ? 5 : 10;
    for (var i = 0; i < n; i++) {
      var p = d.createElement('i'), s = 2 + Math.random() * 4;
      p.style.cssText = 'left:' + (Math.random() * 100) + '%;width:' + s + 'px;height:' + s + 'px;animation-duration:' + (8 + Math.random() * 10) + 's;animation-delay:-' + (Math.random() * 14) + 's';
      pc.appendChild(p);
    }
  }

  /* ---------- Enquiry form ---------- */
  var f = d.getElementById('enquiry');
  if (f) {
    var build = function () {
      var fd = new FormData(f);
      return 'New enquiry from website%0A' +
        'Name: ' + encodeURIComponent(fd.get('name') || '') + '%0A' +
        'Phone: ' + encodeURIComponent(fd.get('phone') || '') + '%0A' +
        'Email: ' + encodeURIComponent(fd.get('email') || '') + '%0A' +
        'Interested in: ' + encodeURIComponent(fd.get('interest') || '') + '%0A' +
        'Message: ' + encodeURIComponent(fd.get('msg') || '');
    };
    var ok = function () {
      if (!f.elements['name'].value.trim() || !f.elements['phone'].value.trim()) { alert('Please enter your name and phone number.'); return false; }
      return true;
    };
    f.addEventListener('submit', function (e) { e.preventDefault(); if (!ok()) return; window.open('https://wa.me/919257052070?text=' + build(), '_blank'); });
    d.getElementById('mailBtn').addEventListener('click', function () {
      if (!ok()) return;
      window.location.href = 'mailto:vishugaur@gmail.com?subject=' + encodeURIComponent('Property enquiry from website') + '&body=' + build();
    });
  }
})();
