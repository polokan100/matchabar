(function () {
    'use strict';

    var RESERVATION_EMAIL = 'polokan100@gmail.com';
    var HOURS = { 0: [12, 18], 1: [10, 18], 2: [10, 18], 3: [10, 18], 4: [10, 18], 5: [10, 18], 6: [12, 18] };
    var MIN_LEAD_HOURS = 1;
    var TZ = 'Europe/Prague';

    var DOW = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    function pragueNow() {
        var parts = new Intl.DateTimeFormat('en-GB', {
            timeZone: TZ, weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23',
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

    function updateOpeningStatus() {
        var el = document.getElementById('opening-status');
        var pill = document.getElementById('status-pill');
        if (!el || !pill) return;
        var n = pragueNow();
        var t = n.hour + n.minute / 60;
        var h = HOURS[n.dow];
        var text, open = false;
        if (t >= h[0] && t < h[1]) {
            open = true;
            text = 'Právě otevřeno do ' + h[1] + ':00 · Poruba';
        } else if (t < h[0]) {
            text = 'Dnes otevíráme v ' + h[0] + ':00 · Poruba';
        } else {
            var next = HOURS[(n.dow + 1) % 7];
            text = 'Zavřeno · zítra otevíráme v ' + next[0] + ':00';
        }
        el.textContent = text;
        pill.classList.toggle('closed', !open);
    }

    var navToggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (navToggle && nav) {
        function setNav(open) {
            nav.classList.toggle('open', open);
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        }
        navToggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
        nav.addEventListener('click', function (e) {
            if (e.target.closest('a') || e.target.closest('button')) setNav(false);
        });
    }

    var loadReelBtn = document.getElementById('load-reel');
    if (loadReelBtn) {
        loadReelBtn.addEventListener('click', function () {
            var box = document.getElementById('reel-box');
            box.innerHTML = '<iframe src="https://www.instagram.com/reel/DeRzeYosuUJ/embed" title="Instagram reel Matcha baru" allowtransparency="true" frameborder="0" scrolling="no" loading="lazy"></iframe>';
        });
    }

    var loadMapBtn = document.getElementById('load-map');
    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', function () {
            var box = document.getElementById('map-box');
            box.innerHTML = '<iframe title="Mapa – Matcha bar Ostrava" src="https://www.google.com/maps?q=Ludv%C3%ADka+Pod%C3%A9%C5%A1t%C4%9B+1971%2F19+Ostrava&output=embed&hl=cs" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';
        });
    }

    var overlay = document.getElementById('modal-reservation');
    var form = document.getElementById('reservation-form');
    var dateInput = document.getElementById('f-date');
    var timeSelect = document.getElementById('f-time');
    var msg = document.getElementById('form-msg');
    var submitBtn = document.getElementById('form-submit');
    var lastFocus = null;

    function fillTimes() {
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
        msg.hidden = false;
        msg.className = 'form-msg ' + type;
        msg.innerHTML = html;
    }

    function openModal() {
        lastFocus = document.activeElement;
        var today = pragueNow().iso;
        dateInput.min = today;
        if (!dateInput.value) dateInput.value = today;
        fillTimes();
        msg.hidden = true;
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.getElementById('f-name').focus();
    }

    function closeModal() {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    if (overlay && form) {
        document.querySelectorAll('[data-open-modal]').forEach(function (b) { b.addEventListener('click', openModal); });
        document.querySelectorAll('[data-close-modal]').forEach(function (b) { b.addEventListener('click', closeModal); });
        overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) closeModal(); });
        dateInput.addEventListener('change', fillTimes);

        document.addEventListener('keydown', function (e) {
            if (!overlay.classList.contains('active')) return;
            if (e.key === 'Escape') { closeModal(); return; }
            if (e.key === 'Tab') {
                var f = overlay.querySelectorAll('button, input:not([tabindex="-1"]), select, textarea, a[href]');
                f = Array.prototype.filter.call(f, function (x) { return !x.disabled && x.offsetParent !== null; });
                if (!f.length) return;
                var first = f[0], last = f[f.length - 1];
                if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
                else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        });

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

    updateOpeningStatus();
    setInterval(updateOpeningStatus, 60000);
})();

    function fallbackCopy(text, onDone) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            onDone();
        } catch (err) {
            window.prompt('Zkopíruj odkaz a pošli kámošovi:', text);
        }
        document.body.removeChild(ta);
    }

    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-share-drink]');
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();

        var drink = btn.getAttribute('data-share-drink');
        var url = window.location.origin + window.location.pathname + '#limitky';
        var text = 'Hele, v Matcha baru v Porubě mají sezónní ' + drink + ' 🍵✨ Zajdeme?';
        var isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        function showCopied() {
            if (btn.dataset.copying) return;
            btn.dataset.copying = '1';
            var orig = btn.textContent;
            btn.textContent = 'Odkaz zkopírován ✓';
            setTimeout(function () {
                btn.textContent = orig;
                delete btn.dataset.copying;
            }, 2200);
        }

        if (isMobile && navigator.share) {
            navigator.share({ title: drink + ' · Matcha bar Ostrava', text: text, url: url }).catch(function () {});
        } else if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(showCopied).catch(function () {
                fallbackCopy(url, showCopied);
            });
        } else {
            fallbackCopy(url, showCopied);
        }
    });

    updateOpeningStatus();
    setInterval(updateOpeningStatus, 60000);
})();