(function () {
  var root = document.documentElement;
  try { var saved = localStorage.getItem('theme'); if (saved) root.setAttribute('data-theme', saved); } catch (e) {}
  document.getElementById('theme').addEventListener('click', function () {
    var dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    var next = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
  var menu = document.getElementById('menu');
  document.getElementById('burger').addEventListener('click', function () { menu.classList.toggle('open'); });
  menu.addEventListener('click', function () { menu.classList.remove('open'); });
  document.getElementById('yr').textContent = new Date().getFullYear();

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  document.querySelectorAll('[data-count]').forEach(function (el) {
    var end = parseFloat(el.dataset.count), dec = 'dec' in el.dataset, plus = 'plus' in el.dataset, t0 = null;
    function step(t) {
      t0 = t0 || t;
      var p = Math.min((t - t0) / 1200, 1);
      el.textContent = (dec ? (end * p).toFixed(1) : Math.round(end * p)) + (p === 1 && plus ? '+' : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
})();
