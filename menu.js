(function () {
    'use strict';

    var MENU_ITEMS = [
        // ✨ Limitované příchutě (5)
        { id: 1, name: "Matcha Marlenka", price: 159, cat: "limitky", tag: "✨ Limitovaná příchuť", desc: "Pravá matcha, vrstva šlehačky, bohatý karamel a křupavý popcorn s příchutí marlenky." },
        { id: 2, name: "Jablečný koláč", price: 149, cat: "limitky", tag: "✨ Limitovaná příchuť", desc: "Podzimní pohlazení – lahodná matcha, šlehačka, skořice a čerstvé plátky jablek." },
        { id: 3, name: "Pumpkin Spice", price: 149, cat: "limitky", tag: "✨ Limitovaná příchuť", desc: "Hřejivé dýňové koření, šlehačka a křupavá skořicová drobenka." },
        { id: 4, name: "Slaný karamel", price: 139, cat: "limitky", tag: "✨ Limitovaná příchuť", desc: "Domácí slaný karamel, křupavá posypka a jemná matcha." },
        { id: 5, name: "Toffee Matcha", price: 139, cat: "limitky", tag: "✨ Limitovaná příchuť", desc: "Sametově krémová karamelka v kombinaci s výběrovou matchou." },

        // 🍵 Matcha s mlékem (10)
        { id: 6, name: "Malina", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Intenzivní sladkokyselá chuť čerstvých malin s matchou a mlékem.", featured: true },
        { id: 7, name: "Ube Matcha", price: 159, cat: "mleko", tag: "🍵 S mlékem", desc: "Exotický fialový jam s jemnou oříškovou sladkostí." },
        { id: 8, name: "Mango", price: 149, cat: "mleko", tag: "🍵 S mlékem", desc: "Bohatá tropická chuť zralého manga v harmonii s matchou." },
        { id: 9, name: "Čokoláda", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Krémová čokoláda v kombinaci s pravou japonskou matchou." },
        { id: 10, name: "Borůvka", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Osvěžující lesní borůvky zalité mlékem a čerstvou matchou." },
        { id: 11, name: "Karamel", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Sladký karamelový nádech zjemňující zemitost zeleného čaje." },
        { id: 12, name: "Banán", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Sametově krémová kombinace banánu, mléka a matchy." },
        { id: 13, name: "Kokos", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Lehký exotický tón kokosu s jemně šlehanou matchou." },
        { id: 14, name: "Vanilka", price: 139, cat: "mleko", tag: "🍵 S mlékem", desc: "Klasická voňavá vanilka s matchou a mlékem dle výběru." },
        { id: 15, name: "Klasik Matcha Latte", price: 119, cat: "mleko", tag: "🍵 S mlékem", desc: "Čistá ceremoniální matcha našlehaná do sametové pěny s mlékem." },

        // 💧 Matcha s vodou (3)
        { id: 16, name: "Usucha (čistá matcha)", price: 99, cat: "voda", tag: "💧 S vodou", desc: "Tradiční japonská příprava čisté matchy šlehané s vodou." },
        { id: 17, name: "Matcha Tonic", price: 129, cat: "voda", tag: "💧 S vodou", desc: "Osvěžující kombinace toniku, ledu a čerstvě vyšlehané matchy." },
        { id: 18, name: "Matcha Pomeranč", price: 129, cat: "voda", tag: "💧 S vodou", desc: "Čerstvá pomerančová šťáva s vrstvou japonské matchy na ledu." },

        // ☕ Káva (4)
        { id: 19, name: "Espresso", price: 59, cat: "kava", tag: "☕ Káva", desc: "Výběrová káva s bohatou cremou." },
        { id: 20, name: "Espresso Tonic", price: 109, cat: "kava", tag: "☕ Káva", desc: "Ledové osvěžení z výběrového espressa a kvalitního toniku." },
        { id: 21, name: "Cappuccino", price: 79, cat: "kava", tag: "☕ Káva", desc: "Espresso s jemně našlehanou mléčnou mikropěnou." },
        { id: 22, name: "Flat White", price: 89, cat: "kava", tag: "☕ Káva", desc: "Dvojité espresso se sametově našlehaným mlékem." },

        // 🍋 Nealko & limonády (6)
        { id: 23, name: "Malinová limonáda", price: 89, cat: "nealko", tag: "🍋 Nealko", desc: "Domácí perlivá limonáda z čerstvých malin a máty." },
        { id: 24, name: "Marakuja limonáda", price: 89, cat: "nealko", tag: "🍋 Nealko", desc: "Exotická osvěžující limonáda s pravou marakujou." },
        { id: 25, name: "Mango limonáda", price: 89, cat: "nealko", tag: "🍋 Nealko", desc: "Sladká ovocná limonáda ze zralého manga." },
        { id: 26, name: "Yuzu limonáda", price: 95, cat: "nealko", tag: "🍋 Nealko", desc: "Japonský citrus yuzu v osvěžující perlivé podobě." },
        { id: 27, name: "Domácí ledový čaj", price: 79, cat: "nealko", tag: "🍋 Nealko", desc: "Louhovaný sypaný čaj s ovocem a bylinkami." },
        { id: 28, name: "Filtrovaná voda (0,5 l)", price: 35, cat: "nealko", tag: "🍋 Nealko", desc: "Čerstvá perlivá nebo neperlivá voda s citronem." },

        // 🍩 Dezerty (7)
        { id: 29, name: "Koláč tvaroh / borůvka", price: 69, cat: "dezerty", tag: "🍩 Dezerty", desc: "Vláčný domácí koláč s tvarohem, borůvkami a křupavou drobenkou." },
        { id: 30, name: "Kobliha pistácie", price: 79, cat: "dezerty", tag: "🍩 Dezerty", desc: "Nadýchaná ručně dělaná kobliha plněná jemným pistáciovým krémem." },
        { id: 31, name: "Kobliha malina", price: 75, cat: "dezerty", tag: "🍩 Dezerty", desc: "Čerstvá kobliha s domácím malinovým rozvarem." },
        { id: 32, name: "Kobliha vanilkový krém", price: 75, cat: "dezerty", tag: "🍩 Dezerty", desc: "Klasická nadýchaná kobliha s pravou vanilkou." },
        { id: 33, name: "Matcha Makronky", price: 49, cat: "dezerty", tag: "🍩 Dezerty", desc: "Křupavé makronky od Maliny." },
        { id: 34, name: "Matcha Cheesecake", price: 99, cat: "dezerty", tag: "🍩 Dezerty", desc: "Krémový cheesecake s výraznou chutí japonské matchy." },
        { id: 35, name: "Skořicový šnek", price: 69, cat: "dezerty", tag: "🍩 Dezerty", desc: "Voňavý kynutý šnek se skořicí a jemnou polevou." }
    ];

    var grid = document.getElementById('menu-grid');
    var emptyBox = document.getElementById('menu-empty');
    var searchInput = document.getElementById('menu-search');
    var isicToggle = document.getElementById('isic-toggle');
    var filterButtons = document.querySelectorAll('.filter-chip');

    var trayBar = document.getElementById('tray-bar');
    var trayCount = document.getElementById('tray-count');
    var trayNames = document.getElementById('tray-names');
    var trayTotal = document.getElementById('tray-total');
    var trayTotalIsic = document.getElementById('tray-total-isic');
    var trayClear = document.getElementById('tray-clear');

    var currentFilter = 'all';
    var searchQuery = '';
    var isicActive = false;
    var tray = [];

    function calcIsic(price) {
        return Math.round(price * 0.9);
    }

    function renderMenu() {
        if (!grid) return;
        var filtered = MENU_ITEMS.filter(function (item) {
            var matchCat = currentFilter === 'all' || item.cat === currentFilter;
            var q = searchQuery.toLowerCase().trim();
            var matchSearch = !q ||
                item.name.toLowerCase().indexOf(q) !== -1 ||
                item.desc.toLowerCase().indexOf(q) !== -1 ||
                item.tag.toLowerCase().indexOf(q) !== -1;
            return matchCat && matchSearch;
        });

        grid.innerHTML = '';
        if (emptyBox) emptyBox.hidden = filtered.length > 0;

        filtered.forEach(function (item) {
            var card = document.createElement('article');
            card.className = 'menu-card' + (item.featured ? ' featured' : '');

            var finalPrice = isicActive ? calcIsic(item.price) : item.price;
            var priceHtml = isicActive
                ? '<span class="old-price">' + item.price + ' Kč</span> ' + finalPrice + ' Kč'
                : item.price + ' Kč';

            card.innerHTML =
                '<div>' +
                    '<div class="menu-card-top">' +
                        '<h3 class="menu-title">' + item.name + '</h3>' +
                        '<span class="menu-price' + (isicActive ? ' isic-active' : '') + '">' + priceHtml + '</span>' +
                    '</div>' +
                    '<p class="menu-desc">' + item.desc + '</p>' +
                '</div>' +
                '<div class="menu-card-bottom">' +
                    '<span class="menu-cat-tag">' + item.tag + '</span>' +
                    '<button type="button" class="btn-add-tray" data-add-id="' + item.id + '">+ Do výběru</button>' +
                '</div>';

            grid.appendChild(card);
        });
    }

    function updateTray() {
        if (!trayBar) return;
        if (tray.length === 0) {
            trayBar.hidden = true;
            return;
        }
        trayBar.hidden = false;
        var sum = tray.reduce(function (acc, i) { return acc + i.price; }, 0);
        var sumIsic = tray.reduce(function (acc, i) { return acc + calcIsic(i.price); }, 0);

        if (trayCount) trayCount.textContent = tray.length + ' ' + (tray.length === 1 ? 'položka' : (tray.length < 5 ? 'položky' : 'položek'));
        if (trayNames) trayNames.textContent = tray.map(function (i) { return i.name; }).join(', ');
        if (trayTotal) trayTotal.textContent = sum + ' Kč';
        if (trayTotalIsic) trayTotalIsic.textContent = sumIsic + ' Kč';
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterButtons.forEach(function (b) {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            currentFilter = btn.getAttribute('data-filter');
            renderMenu();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            searchQuery = searchInput.value;
            renderMenu();
        });
    }

    if (isicToggle) {
        isicToggle.addEventListener('change', function () {
            isicActive = isicToggle.checked;
            renderMenu();
        });
    }

    if (grid) {
        grid.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-add-id]');
            if (!btn) return;
            var id = parseInt(btn.getAttribute('data-add-id'), 10);
            var found = MENU_ITEMS.find(function (i) { return i.id === id; });
            if (found) {
                tray.push(found);
                updateTray();
                btn.textContent = 'Přidáno ✓';
                setTimeout(function () { btn.textContent = '+ Do výběru'; }, 900);
            }
        });
    }

    if (trayClear) {
        trayClear.addEventListener('click', function () {
            tray = [];
            updateTray();
        });
    }

    // Mobilní menu
    var navToggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (navToggle && nav) {
        navToggle.addEventListener('click', function () {
            var open = !nav.classList.contains('open');
            nav.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a') || e.target.closest('button')) {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Rezervační modal a odeslání
    var RESERVATION_EMAIL = 'polokan100@gmail.com';
    var HOURS = { 0: [12, 18], 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 18], 6: [12, 18] };
    var MIN_LEAD_HOURS = 1;
    var DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

    function pragueNow() {
        var parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Prague', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
            year: 'numeric', month: '2-digit', day: '2-digit'
        }).formatToParts(new Date());
        var o = {};
        parts.forEach(function (p) { o[p.type] = p.value; });
        return {
            dow: DOW[o.weekday],
            hour: parseInt(o.hour, 10),
            minute: parseInt(o.minute, 10),
            iso: o.year + '-' + o.month + '-' + o.day
        };
    }

    var overlay = document.getElementById('modal-reservation');
    var form = document.getElementById('reservation-form');
    var dateInput = document.getElementById('f-date');
    var timeSelect = document.getElementById('f-time');
    var msg = document.getElementById('form-msg');
    var submitBtn = document.getElementById('form-submit');

    function fillTimes() {
        if (!dateInput || !timeSelect) return;
        var n = pragueNow();
        var val = dateInput.value;
        timeSelect.innerHTML = '';
        if (!val) {
            timeSelect.innerHTML = '<option value="">Nejdřív vyber datum</option>';
            return;
        }
        var d = new Date(val + 'T12:00:00');
        var h = HOURS[d.getDay()];
        var first = h[0];
        var last = h[1] - 1;
        if (val === n.iso) first = Math.max(first, n.hour + MIN_LEAD_HOURS + (n.minute > 0 ? 1 : 0));
        var count = 0;
        for (var hr = first; hr <= last; hr++) {
            var o = document.createElement('option');
            o.value = o.textContent = hr + ':00';
            timeSelect.appendChild(o);
            count++;
        }
        if (!count) {
            timeSelect.innerHTML = '<option value="">Na tento den už nejsou volné časy</option>';
        }
    }

    function showMsg(type, html) {
        if (!msg) return;
        msg.hidden = false;
        msg.className = 'form-msg ' + type;
        msg.innerHTML = html;
    }

    if (overlay && form) {
        document.querySelectorAll('[data-open-modal]').forEach(function (b) {
            b.addEventListener('click', function () {
                var today = pragueNow().iso;
                dateInput.min = today;
                if (!dateInput.value) dateInput.value = today;
                fillTimes();
                msg.hidden = true;
                overlay.classList.add('active');
                overlay.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            });
        });
        document.querySelectorAll('[data-close-modal]').forEach(function (b) {
            b.addEventListener('click', function () {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            });
        });
        overlay.addEventListener('mousedown', function (e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                overlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
        dateInput.addEventListener('change', fillTimes);

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            msg.hidden = true;

            if (!form.checkValidity() || !timeSelect.value) {
                form.reportValidity();
                if (!timeSelect.value) showMsg('err', 'Vyber prosím datum a čas, na který lze rezervovat.');
                return;
            }
            if (form.elements._honey.value) return;

            var igLink = '<a href="https://ig.me/m/matchabar_ostrava" target="_blank" rel="noopener">napiš nám na Instagram</a>';
            var data = {
                _subject: 'Rezervace: ' + form.elements['Jméno'].value + ', ' + dateInput.value + ' ' + timeSelect.value,
                _template: 'table',
                _captcha: 'false',
                'Jméno': form.elements['Jméno'].value,
                'email': form.elements.email.value,
                'Telefon': form.elements['Telefon'].value || '–',
                'Datum': dateInput.value,
                'Čas': timeSelect.value,
                'Počet osob': form.elements['Počet osob'].value,
                'Poznámka': form.elements['Poznámka'].value || '–'
            };

            submitBtn.disabled = true;
            submitBtn.textContent = 'Odesílám…';

            fetch('https://formsubmit.co/ajax/' + encodeURIComponent(RESERVATION_EMAIL), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
            .then(function (res) {
                if (res.ok && String(res.j.success) === 'true') {
                    form.reset();
                    showMsg('ok', 'Děkujeme! Žádost jsme odeslali, potvrdíme ti ji e-mailem. Rezervace je platná až po našem potvrzení.');
                    submitBtn.textContent = 'Odesláno ✓';
                    setTimeout(function () { submitBtn.disabled = false; submitBtn.textContent = 'Odeslat žádost'; }, 4000);
                } else {
                    throw new Error('send failed');
                }
            })
            .catch(function () {
                showMsg('err', 'Odeslání se nepovedlo. Zkus to prosím znovu, nebo ' + igLink + '.');
                submitBtn.disabled = false;
                submitBtn.textContent = 'Odeslat žádost';
            });
        });
    }

    renderMenu();
})();