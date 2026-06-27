/* ============================================================================
   QUEENS PERENNIAL, interactions. Vanilla JS, no build step.
   Respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var TICKER = [
    'Peonies', 'Dahlias', 'Sunflowers', 'Lisianthus', 'Cosmos', 'Marigold',
    'Celosia', 'Snapdragon', 'Zinnia', 'Larkspur', 'Strawflower', 'Ranunculus',
    'Grown without synthetic pesticides', 'Cut the same morning', 'Supporting BIPOC farmers'
  ];

  var CALENDAR = [
    { m: 'May',       note: 'Spring’s first soft blooms',  f: ['Tulip','Hydrangea','Peony','Cherry Blossom','Lilac','Buttercup','Spirea','Daisy'] },
    { m: 'June',      note: 'Early summer color arrives',       f: ['Peony','Cornflower','Crimson Clover','Sunflower','Larkspur','Pastel Yarrow'] },
    { m: 'July',      note: 'High summer texture',              f: ['Pastel Yarrow','Feverfew','Lisianthus','Snapdragon','Celosia','Coxcomb','Sunflower'] },
    { m: 'August',    note: 'Peak abundance',                   f: ['Sunflower (Vincent)','Celosia','Coxcomb','Gomphrena','Lisianthus','Marigold','Rudbeckia','Snow-on-the-Mountain','Dahlia','Foxtail','Strawflower','Sunflower (Teddy Bear)'] },
    { m: 'September', note: 'Late-summer jewels',               f: ['Sunflower (Vincent)','Celosia','Coxcomb','Gomphrena','Lisianthus','Marigold','Dahlia','Strawflower','Sunflower (Teddy Bear)','Balloon Vine'] },
    { m: 'October',   note: 'Autumn’s warm tones',         f: ['Mini-Pumpkins-on-a-Stick','Eucalyptus','Gomphrena','Sorghum & Broomcorn','Coxcomb','Sunflower (Vincent)','Sunflower (Teddy Bear)','Marigold','Dahlia','Balloon Vine','Celosia','Amaranth'] },
    { m: 'November',  note: 'The season’s last gathering', f: ['Ornamental Kale','Celosia','Marigold','Winterberry','Eucalyptus','Sunflower (Teddy Bear)','Bittersweet'] }
  ];

  var LOCATIONS = [
    { name: 'Lockwood',                          boro: 'Queens',    hood: 'Astoria (Broadway)', time: 'Wednesdays · 5–8pm',   keys: ['astoria','broadway'] },
    { name: 'The Honey House at Astor Apiaries', boro: 'Queens',    hood: 'Astoria–Ditmars', time: 'Tuesdays · 2–7pm',   keys: ['ditmars','astoria'] },
    { name: 'Lockwood',                          boro: 'Queens',    hood: 'Jackson Heights',     time: 'Tuesdays · 5–8pm',    keys: ['jackson heights','elmhurst','corona'] },
    { name: 'Lockwood',                          boro: 'Queens',    hood: 'Sunnyside',           time: 'Tuesdays · 5–8pm',    keys: ['sunnyside','woodside'] },
    { name: 'The Greats of Craft',               boro: 'Queens',    hood: 'Long Island City',    time: 'Tuesdays · 2–10pm',   keys: ['lic','long island city'] },
    { name: 'The Greats of Craft',               boro: 'Queens',    hood: 'Hunters Point',       time: 'Tuesdays · 2–10pm',   keys: ['hunters point','lic'] },
    { name: 'Dada',                              boro: 'Queens',    hood: 'Ridgewood',           time: 'Tuesdays · 3–9pm',    keys: ['ridgewood','bushwick'] },
    { name: 'Jupiter Club',                      boro: 'Queens',    hood: 'Arverne (Rockaway)',  time: 'Tuesdays · 5–7:30pm', keys: ['arverne','rockaway','far rockaway','beach'] },
    { name: 'The WonderMart',                    boro: 'Brooklyn',  hood: 'Greenpoint',          time: 'Tuesdays · 2–7pm',    keys: ['greenpoint'] },
    { name: 'Depanneur',                         boro: 'Brooklyn',  hood: 'Williamsburg',        time: 'Tuesdays · 3–7pm',    keys: ['williamsburg'] },
    { name: 'Art Cafe & Bar',                    boro: 'Brooklyn',  hood: 'Prospect Heights',    time: 'Tuesdays · 4–8:30pm', keys: ['prospect heights','crown heights'] },
    { name: 'Commonwealth',                      boro: 'Brooklyn',  hood: 'Park Slope',          time: 'Tuesdays · 4–7pm',    keys: ['park slope','gowanus'] },
    { name: 'The Greats of Craft',               boro: 'Manhattan', hood: 'Midtown East',        time: 'Tuesdays · 2–10pm',   keys: ['midtown','midtown east','murray hill','manhattan'] }
  ];

  var TESTIMONIALS = [
    { n: 'Suzy',      q: 'Wednesday pickup quickly became one of the highlights of my week. The flowers were always beautiful.' },
    { n: 'Hannah',    q: 'This flower CSA is such a bright spot, the QP team is so friendly and fun, and will go above and beyond.' },
    { n: 'Hisami',    q: 'It’s been such an amazing add to my weekly routine, seeing familiar faces and connecting with the community.' },
    { n: 'Katie',     q: 'I first signed up in the midst of the pandemic, when weekly flowers felt like one way to brighten those months.' },
    { n: 'Deirdre',   q: 'It’s so fun to learn about the local, seasonal picks in the weekly emails. So many flower fun facts!' },
    { n: 'Courtney',  q: 'Not only do I get a wide array of beautiful flowers that brighten up my apartment, I also get to go for a nice walk.' },
    { n: 'Matthew',   q: 'As I walked to flower pickup each week, seeing others around my neighborhood with their bouquets filled me with joy.' },
    { n: 'Lesslie',   q: 'How many things in your week are just purely joyful? I look forward to Queens Perennial pick-ups every week.' },
    { n: 'Morgan',    q: 'I’ve been a member of Queens Perennial since the day they started, and will be for life!' },
    { n: 'Emily',     q: 'Such an incredible way to have fresh flowers at home while also supporting a small local farm.' },
    { n: 'Jen',       q: 'Do yourself a favor and shop small for your flowers this year, you won’t regret it!' },
    { n: 'Katie B.',  q: 'Helen and Jenn are equally delightful, I’m always impressed with how they remember every human and dog.' },
    { n: 'Judy',      q: 'I was a cranky old broad who didn’t like surprises, I stopped being that woman when I joined Queens Perennial.' },
    { n: 'Liz',       q: 'As someone with a taupe/olive thumb, it’s refreshing to have beautiful color in the house for the season!' },
    { n: 'Grace',     q: 'Truly one of the highlights of my week. Every week I was surprised by a beautiful bouquet.' },
    { n: 'Catherine', q: 'As the days got shorter and darker, my weekly bouquet provided a beacon of sunshine inside my home.' },
    { n: 'Neha',      q: 'My 3-year-old really looked forward to it, he’d even wear his flower mask on pick-up days :)' },
    { n: 'Lauren',    q: 'I joined during the pandemic, and Queens Perennial has now seen us through the first 2 years of our daughter’s life.' },
    { n: 'My Linh',   q: 'One of my all-time favorite self-care activities. I look forward to Helen’s weekly emails.' },
    { n: 'Kristine',  q: 'After 2+ years of feeling isolated, my weekly flower pickup helped me feel connected again.' },
    { n: 'Kristina',  q: 'I’m counting down the days until the next subscription season opens.' },
    { n: 'Amy',       q: 'Such a delight to have fresh flowers each week, and we loved the surprise: what would we get this time?!' }
  ];

  var FAQ = [
    { q: 'What is a CSA?', a: 'CSA stands for Community Supported Agriculture, a group of people who get together at the start of the farming season and pledge to support a farm for the whole season. It stabilizes income for small farmers facing weather and market volatility, and gives you a personal share of the harvest.' },
    { q: 'What flowers will we receive?', a: 'The selection varies week to week, and we won’t announce it until the day of distribution, unseasonal weather like frost or wind can always cause a pivot. Expect varieties like peonies, dahlias, lisianthus, German irises and sunflowers across the season.' },
    { q: 'Why pick up earlier in the day?', a: 'All of our distribution locations are outdoors, so the flowers are exposed to the weather of the day. Picking up earlier lets you get them into water sooner, which noticeably improves their lifespan.' },
    { q: 'What if I miss a pickup?', a: 'If you can anticipate it, it’s great to have a friend or family member pick up for you during pickup hours. Because the flowers are perishable, we can’t guarantee availability after the designated times, any unclaimed flowers are donated.' },
    { q: 'Can I pause for vacation?', a: 'Yes. Email us at least two weeks beforehand and we’ll pause your share, or you can receive two bouquets in another week. Prorated subscriptions are available for scheduling conflicts.' },
    { q: 'Are the flowers pet-safe?', a: 'Most flowers are toxic to pets. The celosia family is an exception, though specific availability varies by season, reach out if you’d like us to help you plan around it.' },
    { q: 'How do I cancel?', a: 'A $25 cancellation fee applies for mid-season cancellations. Just email queensperennial@gmail.com and we’ll take care of the rest.' }
  ];

  var nav = $('#nav');
  var onScrollNav = function () { nav.classList.toggle('is-stuck', window.scrollY > 40); };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  var burger = $('#burger');
  var closeMenu = function () { document.body.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); };
  burger.addEventListener('click', function () {
    var open = document.body.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', String(open));
  });
  $$('.drawer__links a').forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  var vine = $('#scroll-vine span');
  var onScrollVine = function () {
    var h = document.documentElement;
    var pct = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (vine) vine.style.width = (pct * 100) + '%';
  };
  onScrollVine();
  window.addEventListener('scroll', onScrollVine, { passive: true });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('[data-reveal]').forEach(function (el) { io.observe(el); });

  var dollar = $('.dollar');
  if (dollar) {
    var dio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); dio.unobserve(e.target); } });
    }, { threshold: 0.3 });
    dio.observe(dollar);
  }

  $$('.stat').forEach(function (el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || '';
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(el);
        if (reduce) { el.textContent = target + suffix; return; }
        var dur = 1400; var t0 = performance.now();
        var tick = function (now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    cio.observe(el);
  });

  var tickerTrack = $('#ticker-track');
  if (tickerTrack) {
    var items = TICKER.concat(TICKER);
    tickerTrack.innerHTML = items.map(function (t) { return '<span>' + t + '</span>'; }).join('');
  }

  var calMonths = $('#cal-months');
  var calSeason = $('#cal-season');
  var calBlooms = $('#cal-blooms');
  if (calMonths) {
    var renderMonth = function (i) {
      var mo = CALENDAR[i];
      calSeason.textContent = mo.m + ': ' + mo.note;
      calBlooms.innerHTML = '';
      mo.f.forEach(function (flower, j) {
        var li = document.createElement('li');
        li.textContent = flower;
        li.style.animationDelay = (j * 45) + 'ms';
        calBlooms.appendChild(li);
      });
    };
    var selectMonth = function (i) {
      $$('.cal-month', calMonths).forEach(function (b, bi) { b.classList.toggle('is-active', bi === i); });
      renderMonth(i);
    };
    CALENDAR.forEach(function (mo, i) {
      var b = document.createElement('button');
      b.className = 'cal-month' + (i === 1 ? ' is-active' : '');
      b.textContent = mo.m;
      b.setAttribute('role', 'tab');
      b.addEventListener('click', function () { selectMonth(i); });
      calMonths.appendChild(b);
    });
    renderMonth(1);
  }

  var grid = $('#loc-grid');
  var filterWrap = $('#loc-filter');
  if (grid) {
    LOCATIONS.forEach(function (l) {
      var card = document.createElement('div');
      card.className = 'loc-card';
      card.dataset.boro = l.boro;
      card.innerHTML =
        '<div class="loc-card__top"><h3>' + l.name + '</h3><span class="loc-card__boro">' + l.boro + '</span></div>' +
        '<p class="loc-card__hood">' + l.hood + '</p>' +
        '<span class="loc-card__time">🌸 ' + l.time + '</span>';
      grid.appendChild(card);
    });

    var boros = ['All'].concat(LOCATIONS.map(function (l) { return l.boro; }).filter(function (v, i, a) { return a.indexOf(v) === i; }));
    boros.forEach(function (b, i) {
      var pill = document.createElement('button');
      pill.className = 'loc-pill' + (i === 0 ? ' is-active' : '');
      pill.textContent = b;
      pill.addEventListener('click', function () {
        $$('.loc-pill', filterWrap).forEach(function (p) { p.classList.remove('is-active'); });
        pill.classList.add('is-active');
        $$('.loc-card', grid).forEach(function (c) {
          c.classList.toggle('is-hidden', b !== 'All' && c.dataset.boro !== b);
        });
      });
      filterWrap.appendChild(pill);
    });

    var fInput = $('#finder-input');
    var fBtn = $('#finder-btn');
    var fResult = $('#finder-result');
    var runFinder = function () {
      var q = (fInput.value || '').trim().toLowerCase();
      $$('.loc-card', grid).forEach(function (c) { c.classList.remove('is-highlight'); });
      if (!q) { fResult.textContent = ''; return; }
      var match = null;
      for (var i = 0; i < LOCATIONS.length; i++) {
        var l = LOCATIONS[i];
        var hit = l.keys.some(function (k) { return k.indexOf(q) !== -1 || q.indexOf(k) !== -1; }) ||
          l.hood.toLowerCase().indexOf(q) !== -1 || l.name.toLowerCase().indexOf(q) !== -1;
        if (hit) { match = l; break; }
      }
      if (match) {
        var idx = LOCATIONS.indexOf(match);
        var card = $$('.loc-card', grid)[idx];
        $$('.loc-pill', filterWrap).forEach(function (p, pi) { p.classList.toggle('is-active', pi === 0); });
        $$('.loc-card', grid).forEach(function (c) { c.classList.remove('is-hidden'); });
        card.classList.add('is-highlight');
        card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
        fResult.innerHTML = 'Your closest spot: <strong>' + match.name + '</strong> in ' + match.hood + ' · ' + match.time + '.';
      } else {
        fResult.innerHTML = 'No exact match, we’re always adding spots. <a href="mailto:queensperennial@gmail.com?subject=Pickup%20near%20me">Ask us about your neighborhood</a>.';
      }
    };
    fBtn.addEventListener('click', runFinder);
    fInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') runFinder(); });
  }

  var cardHTML = function (t) { return '<figure class="tm-card"><p>“' + t.q + '”</p><cite>' + t.n + '</cite></figure>'; };
  var half = Math.ceil(TESTIMONIALS.length / 2);
  var fillRow = function (sel, list) {
    var track = $(sel + ' .marquee__track');
    if (!track) return;
    var html = list.map(cardHTML).join('');
    track.innerHTML = html + html;
  };
  fillRow('#tm-row-1', TESTIMONIALS.slice(0, half));
  fillRow('#tm-row-2', TESTIMONIALS.slice(half));

  var faqList = $('#faq-list');
  if (faqList) {
    FAQ.forEach(function (item) {
      var wrap = document.createElement('div');
      wrap.className = 'faq-item';
      wrap.innerHTML =
        '<button class="faq-q" aria-expanded="false"><span>' + item.q + '</span><span class="faq-q__icon" aria-hidden="true"></span></button>' +
        '<div class="faq-a"><p>' + item.a + '</p></div>';
      var btn = $('.faq-q', wrap);
      var ans = $('.faq-a', wrap);
      btn.addEventListener('click', function () {
        var open = wrap.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
        ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0';
      });
      faqList.appendChild(wrap);
    });
  }

  var igFeed = $('#ig-feed');
  if (igFeed) {
    var grads = [
      'radial-gradient(circle at 30% 30%, #e8a23d, #c97a4a)',
      'radial-gradient(circle at 60% 40%, #d98a86, #c06b67)',
      'radial-gradient(circle at 40% 60%, #9a86c4, #6f5ea0)',
      'radial-gradient(circle at 50% 30%, #2f5a3f, #1f3d2b)',
      'radial-gradient(circle at 70% 50%, #e8a23d, #d98a86)',
      'radial-gradient(circle at 35% 65%, #6f8770, #2f5a3f)'
    ];
    grads.forEach(function (g) {
      var a = document.createElement('a');
      a.className = 'ig-tile';
      a.href = 'https://www.instagram.com/queensperennial/';
      a.target = '_blank'; a.rel = 'noopener';
      a.style.background = g;
      a.setAttribute('aria-label', 'Queens Perennial on Instagram');
      a.innerHTML = '<svg viewBox="0 0 32 32" width="28" height="28"><use href="#bloom-mark"/></svg>';
      igFeed.appendChild(a);
    });
  }

  $$('[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = form.parentElement.querySelector('[data-msg]') || form.nextElementSibling;
      var emailEl = form.querySelector('input[type=email]');
      var email = emailEl ? emailEl.value : '';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        if (msg) { msg.textContent = 'Please enter a valid email.'; msg.style.color = '#c06b67'; }
        return;
      }
      if (msg) { msg.textContent = '🌸 You’re on the list, we’ll be in touch soon!'; msg.style.color = ''; }
      form.reset();
    });
  });

  var yr = $('#year');
  if (yr) yr.textContent = String(new Date().getFullYear());

  var canvas = $('#petal-canvas');
  if (canvas && !reduce) {
    var ctx = canvas.getContext('2d');
    var w, h, petals = [];
    var COLORS = ['#d98a86', '#e8a23d', '#9a86c4', '#f0c9a0', '#c06b67'];
    var COUNT = Math.min(28, Math.floor(window.innerWidth / 48));
    var rnd = function (a, b) { return a + Math.random() * (b - a); };
    var resize = function () { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    var make = function (y) {
      return {
        x: rnd(0, w), y: y == null ? rnd(-h, 0) : y,
        r: rnd(5, 11), sp: rnd(0.4, 1.3), sway: rnd(0.5, 1.6),
        ph: rnd(0, Math.PI * 2), rot: rnd(0, Math.PI * 2), rs: rnd(-0.02, 0.02),
        c: COLORS[(Math.random() * COLORS.length) | 0], a: rnd(0.35, 0.8)
      };
    };
    var drawPetal = function (p) {
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 0.56, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    var raf;
    var frame = function () {
      ctx.clearRect(0, 0, w, h);
      petals.forEach(function (p) {
        p.y += p.sp; p.ph += 0.01; p.x += Math.sin(p.ph) * p.sway * 0.4; p.rot += p.rs;
        if (p.y > h + 20) { var np = make(-20); for (var k in np) p[k] = np[k]; }
        drawPetal(p);
      });
      raf = requestAnimationFrame(frame);
    };
    var init = function () { resize(); petals = []; for (var i = 0; i < COUNT; i++) petals.push(make()); };
    init();
    frame();
    var rt;
    window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(init, 200); });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) cancelAnimationFrame(raf); else frame();
    });
  }
})();