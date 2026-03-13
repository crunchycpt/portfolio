/* ════════════════════════════════════════════════════════════════
   GAME DEVELOPER PORTFOLIO — main.js
   Initialisiert: Lenis, tsParticles, GSAP, GLightbox, Filter, etc.
   ════════════════════════════════════════════════════════════════ */

/* ────────────────────────────────────────────────────────────────
   1. PROJEKT-DATEN
   engine: 'unity' | 'unreal' | 'blender' | 'other'
   category: 'grundlagen' | 'hochschule' | 'prototyp' | 'blender'
   type: 'webgl' (Unity im Browser) | 'video' (YouTube/lokal) | 'image'
   featured: true  →  erscheint im Showcase-Block (nur ein Eintrag!)
   ──────────────────────────────────────────────────────────────── */
const PROJECTS = [
    // ── Unity-Übungen (Grundlagen) ───────────────────────────────
    {
        id:          'game-1',
        title:       'Whatever Floats Your Balloon',
        engine:      'unity',
        category:    'grundlagen',
        type:        'webgl',
        description: 'Beschreibung einfügen',
        thumbnail:   'assets/images/thumbnails/game-1.png',
        tags:        ['Action', '3D', '2024'],
        src:         '/games/game-1/index.html',
    },
    {
        id:          'game-2',
        title:       'Zweites Unity Projekt',
        engine:      'unity',
        category:    'grundlagen',
        type:        'webgl',
        description: 'Beschreibung einfügen',
        thumbnail:   'assets/images/thumbnails/game-2.jpg',
        tags:        ['Puzzle', 'Platformer', '2023'],
        src:         '/games/game-2/index.html',
    },
    // ── Hochschulprojekte ────────────────────────────────────────
    {
        id:          'game-3',
        title:       'Unreal Engine Projekt',
        engine:      'unreal',
        category:    'hochschule',
        type:        'video',
        description: 'Beschreibung einfügen',
        thumbnail:   'assets/images/thumbnails/game-3.jpg',
        tags:        ['Horror', 'UE5', 'Hochschule'],
        // YouTube-URL (youtube-nocookie.com für DSGVO-Konformität)
        // src: 'https://www.youtube-nocookie.com/embed/DEIN_VIDEO_ID',
        // ODER lokale MP4:
        src:         'videos/game-3-trailer.mp4',
        videoType:   'video',
    },
    {
        id:          'game-4',
        title:       'Indie Experiment',
        engine:      'other',
        category:    'hochschule',
        type:        'video',
        description: 'Beschreibung einfügen',
        thumbnail:   'assets/images/thumbnails/game-4.jpg',
        tags:        ['Arcade', 'GameJam', 'Hochschule'],
        src:         'https://www.youtube-nocookie.com/embed/DEIN_VIDEO_ID',
    },
    // ── Unity-Prototyp (★ HIGHLIGHT) ─────────────────────────────
    {
        id:          'prototype',
        title:       'Unity Prototyp',
        engine:      'unity',
        category:    'prototyp',
        featured:    true,
        type:        'webgl',
        description: 'Ein Golfspiel-Prototyp mit regelbasiertem Gameplay, Echtzeit-3D-Rendering und eigenem Event-System. Entwickelt in Unity mit C# — Fokus auf saubere Architektur und erweiterbare Systeme.',
        thumbnail:   'assets/images/thumbnails/prototype.jpg',
        tags:        ['Unity', 'C#', 'Prototyp', '2025'],
        src:         '/games/prototype/index.html',
    },
    // ── Blender / 3D-Projekte ────────────────────────────────────
    {
        id:          'blender-1',
        title:       'Blender Projekt 1',
        engine:      'blender',
        category:    'blender',
        type:        'image',           // 'image' für einen Render, 'video' für Turntable/Animation
        description: 'Beschreibung einfügen',
        thumbnail:   'assets/images/thumbnails/blender-1.jpg',
        tags:        ['Blender', '3D', '2024'],
        src:         'assets/images/blender/blender-1.jpg',  // Pfad zum vollauflösenden Bild
    },
    {
        id:          'blender-2',
        title:       'Blender Projekt 2',
        engine:      'blender',
        category:    'blender',
        type:        'video',           // Video-Turntable oder Animation
        description: 'Beschreibung einfügen',
        thumbnail:   'assets/images/thumbnails/blender-2.jpg',
        tags:        ['Blender', 'Animation', '2024'],
        // src: 'https://www.youtube-nocookie.com/embed/DEIN_VIDEO_ID',
        src:         'videos/blender-2.mp4',
        videoType:   'video',
    },
];

/* ────────────────────────────────────────────────────────────────
   2. NAV — scrolled class + active link + hamburger
   ──────────────────────────────────────────────────────────────── */
function initNav() {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks  = document.querySelectorAll('.nav-link');
    const sections  = document.querySelectorAll('section[id]');

    // Scrolled class
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    hamburger?.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    // Active nav link via IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));

    // Anker-Links: smooth scroll mit nav-Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 70;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Mobile link click closes menu
    document.querySelectorAll('.nav-mobile a').forEach(a => {
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('open');
        });
    });
}

/* ────────────────────────────────────────────────────────────────
   4. HERO PARTIKEL — tsParticles
   ──────────────────────────────────────────────────────────────── */
async function initParticles() {
    if (typeof tsParticles === 'undefined') return;

    // Motion-Präferenz respektieren
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    await tsParticles.load('particles-canvas', {
        fpsLimit: 60,
        particles: {
            number: { value: reducedMotion ? 0 : 55, density: { enable: true, area: 800 } },
            color:  { value: ['#39ff14', '#00cc44', '#1a5c1a'] },
            shape: {
                type: ['circle', 'triangle'],
            },
            opacity: {
                value: { min: 0.05, max: 0.35 },
                animation: { enable: true, speed: 0.5, sync: false },
            },
            size: {
                value: { min: 1, max: 4 },
                animation: { enable: true, speed: 1.5, sync: false },
            },
            move: {
                enable: true,
                speed: { min: 0.2, max: 0.6 },
                direction: 'none',
                random: true,
                straight: false,
                outModes: { default: 'out' },
            },
            links: {
                enable: true,
                distance: 160,
                color: '#39ff14',
                opacity: 0.08,
                width: 1,
            },
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'grab' },
                resize:  { enable: true },
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.25 } },
            },
        },
        detectRetina: true,
        fullScreen: { enable: false },
        background: { color: 'transparent' },
    });
}

/* ────────────────────────────────────────────────────────────────
   5. GSAP ANIMATIONEN
   ──────────────────────────────────────────────────────────────── */
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        // Alle Elemente sichtbar machen ohne Animation
        gsap.set('.hero-eyebrow, .hero-title .char, .hero-subtitle, .hero-cta, .hero-scroll-indicator', {
            opacity: 1, y: 0, rotationX: 0,
        });
        return;
    }

    /* ── Hero Intro ── */
    gsap.set('.hero-title', { opacity: 1 }); // Chars sind bereits opacity:0 — kein Flash
    const heroTl = gsap.timeline({ delay: 0.3 });

    heroTl
        .to('.hero-eyebrow', { opacity: 1, duration: 0.8, ease: 'power2.out' })
        .to('.hero-title .char', {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.04,
        }, '-=0.3')
        .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .to('.hero-cta',      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to('.hero-scroll-indicator', { opacity: () => window.scrollY < 50 ? 1 : 0, duration: 0.6 }, '-=0.2')
        .to('.hero-title .char', {
            color: '#39ff14',
            textShadow: '0 0 20px rgba(57,255,20,0.8), 0 0 50px rgba(57,255,20,0.4)',
            duration: 0.25,
            stagger: 0.05,
            ease: 'power2.in',
        }, '+=0.3')
        .to('.hero-title .char', {
            color: '',
            textShadow: 'none',
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.out',
        });

    /* ── Section Heading Lines ── */
    document.querySelectorAll('.section-heading-line').forEach(line => {
        ScrollTrigger.create({
            trigger: line,
            start: 'top 85%',
            onEnter: () => gsap.to(line, { width: 60, duration: 0.7, ease: 'power2.inOut' }),
        });
    });

    /* ── About ── */
    if (document.getElementById('aboutImage')) {
        gsap.fromTo('#aboutImage',
            { x: -60, opacity: 0 },
            { scrollTrigger: { trigger: '#about', start: 'top 40%', once: true },
              x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
        gsap.fromTo('#aboutText',
            { x: 60, opacity: 0 },
            { scrollTrigger: { trigger: '#about', start: 'top 40%', once: true },
              x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );
    }

    /* ── Stat counters — alle gleichzeitig ── */
    const statEls = document.querySelectorAll('.stat-number');
    if (statEls.length) {
        const targets = Array.from(statEls).map(el => parseInt(el.dataset.target, 10));
        const max = Math.max(...targets);
        ScrollTrigger.create({
            trigger: '.about-stats',
            start: 'top 95%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: max,
                    duration: 3,
                    ease: 'none',
                    onUpdate() {
                        const cur = Math.round(this.targets()[0].val);
                        statEls.forEach((el, i) => {
                            el.textContent = Math.min(cur, targets[i]);
                        });
                    },
                });
            },
        });
    }

    /* ── Skills groups ── */
    gsap.fromTo('.skills-group',
        { y: 40, opacity: 0 },
        { scrollTrigger: { trigger: '#skills', start: 'top 40%', once: true },
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out', stagger: 0.15 }
    );

    /* ── Badges inside skills ── */
    gsap.fromTo('.skills-group .badge',
        { y: 20, opacity: 0 },
        { scrollTrigger: { trigger: '#skills', start: 'top 30%', once: true },
          y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.04 }
    );

    /* ── Contact ── */
    gsap.fromTo('.contact-email, .social-link',
        { y: 30, opacity: 0 },
        { scrollTrigger: { trigger: '#contact', start: 'top 85%', once: true },
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12 }
    );

    ScrollTrigger.refresh();
}

/* Projekt-Karten-Animation (nach renderProjects) */
function animateCards() {
    if (typeof gsap === 'undefined') return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.fromTo('.game-card',
        { y: 50, opacity: 0 },
        { scrollTrigger: { trigger: '#gamesGrid', start: 'top 50%', once: true },
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.1 }
    );
}

/* ────────────────────────────────────────────────────────────────
   6. PROJEKTE RENDERN
   ──────────────────────────────────────────────────────────────── */
function getEngineLabel(engine) {
    const map = { unity: 'Unity', unreal: 'Unreal Engine', blender: 'Blender', other: 'Andere' };
    return map[engine] || engine;
}

function getCategoryLabel(category) {
    const map = { grundlagen: 'Grundlagen', hochschule: 'Hochschulprojekt', prototyp: 'Prototyp', blender: 'Blender / 3D' };
    return map[category] || category;
}

/* ── Showcase-Block für das featured Projekt ── */
function renderShowcase(visible, highlighted = false) {
    const showcase = document.getElementById('gameShowcase');
    if (!showcase) return;

    const featuredProject = PROJECTS.find(p => p.featured);
    if (!featuredProject || !visible) {
        showcase.style.display = 'none';
        return;
    }

    showcase.style.display = 'grid';
    showcase.classList.toggle('showcase-highlighted', highlighted);

    const playIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

    showcase.innerHTML = `
        <div class="showcase-thumb">
            <img
                src="${featuredProject.thumbnail}"
                alt="${featuredProject.title}"
                class="showcase-thumb-img"
                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
            >
            <div class="showcase-thumb-placeholder" style="display:none">
                <span>${featuredProject.title.slice(0, 2).toUpperCase()}</span>
            </div>
        </div>
        <div class="showcase-info">
            <div class="showcase-badges">
                <span class="showcase-badge badge-unity-card">Unity</span>
                <span class="showcase-badge showcase-badge-cat">Prototyp ★</span>
            </div>
            <h3 class="showcase-title">${featuredProject.title}</h3>
            <p class="showcase-desc">${featuredProject.description}</p>
            <div class="showcase-tags">
                ${featuredProject.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
            </div>
            <button class="showcase-cta btn btn-primary" id="showcaseCta">
                ${playIcon}
                Im Browser spielen
            </button>
        </div>
    `;

    document.getElementById('showcaseCta')?.addEventListener('click', () => {
        openProject(featuredProject);
    });
}

function renderProjects(filter = 'all') {
    const grid = document.getElementById('gamesGrid');
    const empty = document.getElementById('gamesEmpty');
    if (!grid) return;

    // Prototyp-Filter: Showcase hervorheben, Grid ausblenden
    if (filter === 'prototyp') {
        renderShowcase(true, true);
        grid.style.display = 'none';
        if (empty) empty.style.display = 'none';
        return;
    }

    // Alle anderen Filter: Grid einblenden
    grid.style.display = 'grid';

    if (filter === 'all') {
        // Showcase sichtbar, Grid zeigt nur Grundlagen + Hochschule
        renderShowcase(true, false);
    } else {
        // Grundlagen / Hochschule / Blender: Showcase ausblenden
        renderShowcase(false);
    }

    grid.innerHTML = '';

    // Featured-Projekt nie im Grid zeigen (es ist im Showcase)
    const filtered = filter === 'all'
        ? PROJECTS.filter(p => !p.featured)
        : PROJECTS.filter(p => p.category === filter && !p.featured);

    if (filtered.length === 0) {
        if (empty) empty.style.display = 'block';
        return;
    }
    if (empty) empty.style.display = 'none';

    filtered.forEach(project => {
        const isWebGL    = project.type === 'webgl';
        const badgeCls   = `badge-${project.engine}-card`;
        const actionIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        const actionLabel = isWebGL ? 'Im Browser spielen' : 'Ansehen';

        const card = document.createElement('article');
        card.className = 'game-card';
        card.dataset.engine = project.engine;
        card.dataset.id = project.id;
        card.innerHTML = `
            <div class="card-thumb">
                <img
                    class="card-thumb-img"
                    src="${project.thumbnail}"
                    alt="${project.title}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                >
                <div class="card-thumb-placeholder" style="display:none">
                    <span>${project.title.slice(0,2).toUpperCase()}</span>
                </div>
                <div class="card-overlay">
                    <div class="card-play-icon">
                        ${actionIcon}
                    </div>
                    <span class="card-overlay-text">${actionLabel}</span>
                </div>
                <span class="card-engine-badge ${badgeCls}">${getEngineLabel(project.engine)}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-desc">${project.description}</p>
                <div class="card-tags">
                    ${project.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}
                </div>
            </div>
            <button class="card-action glightbox" data-gallery="projects" aria-label="${actionLabel}: ${project.title}">
                ${actionIcon}
                ${actionLabel}
            </button>
        `;

        // Click auf ganzes Karten-Thumb öffnet ebenfalls
        card.querySelector('.card-thumb').addEventListener('click', () => {
            openProject(project);
        });
        card.querySelector('.card-action').addEventListener('click', () => {
            openProject(project);
        });

        grid.appendChild(card);
    });

    animateCards();
}

/* ────────────────────────────────────────────────────────────────
   7. PROJEKT ÖFFNEN (GLightbox)
   ──────────────────────────────────────────────────────────────── */
function openProject(project) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (project.type === 'webgl' && isIOS) {
        showIOSWarning(project);
        return;
    }

    if (project.type === 'webgl') {
        openWebGLModal(project);
        return;
    }

    if (project.type === 'image') {
        const lightbox = GLightbox({
            elements: [{ href: project.src, type: 'image', title: project.title }],
            touchNavigation: true,
            loop: false,
        });
        lightbox.open();
        return;
    }

    const isYouTube = project.src && project.src.includes('youtube');
    const isVimeo   = project.src && project.src.includes('vimeo');

    let type = 'iframe';
    if (project.videoType === 'video' || (!isYouTube && !isVimeo && project.type === 'video')) {
        type = 'video';
    }

    const lightbox = GLightbox({
        elements: [{
            href: project.src,
            type: type,
            title: project.title,
        }],
        touchNavigation: true,
        loop: false,
        autoplayVideos: true,
        width:  '90vw',
        height: project.type === 'webgl' ? '85vh' : 'auto',
    });

    lightbox.open();

    // Keyboard-Fix: Unity WebGL benötigt Fokus im iframe
    if (project.type === 'webgl') {
        lightbox.on('open', () => {
            setTimeout(() => {
                const iframe = document.querySelector('.gslide-iframe iframe');
                if (iframe) iframe.contentWindow?.focus();
            }, 500);
        });
    }
}

/* WebGL Modal */
function openWebGLModal(project) {
    const modal = document.createElement('div');
    modal.className = 'webgl-modal';
    modal.innerHTML = `
        <div class="webgl-modal-inner">
            <button class="webgl-modal-close" aria-label="Schließen">✕</button>
            <p class="webgl-modal-title">${project.title}</p>
            <iframe
                class="webgl-modal-iframe"
                src="${project.src}"
                allowfullscreen
                allow="fullscreen"
                scrolling="no"
            ></iframe>
        </div>
    `;
    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('open'));

    const close = () => { modal.classList.remove('open'); setTimeout(() => modal.remove(), 300); };
    modal.querySelector('.webgl-modal-close').onclick = close;
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    setTimeout(() => modal.querySelector('iframe')?.contentWindow?.focus(), 600);
}

/* iOS-Warnung */
function showIOSWarning(project) {
    const el = document.createElement('div');
    el.className = 'ios-warning';
    el.innerHTML = `
        <div class="ios-warning-box">
            <h3>⚠ Hinweis</h3>
            <p>Unity WebGL-Spiele funktionieren auf iOS-Geräten möglicherweise nicht vollständig.
            Für das beste Erlebnis empfehlen wir einen Desktop-Browser (Chrome oder Firefox).</p>
            <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap">
                <button class="btn btn-primary" id="iosOpen">Trotzdem öffnen</button>
                <button class="btn btn-outline" id="iosClose">Abbrechen</button>
            </div>
        </div>
    `;
    document.body.appendChild(el);

    document.getElementById('iosOpen').onclick = () => {
        el.remove();
        const lb = GLightbox({ elements: [{ href: project.src, type: 'iframe', title: project.title }] });
        lb.open();
    };
    document.getElementById('iosClose').onclick = () => el.remove();
    el.addEventListener('click', (e) => { if (e.target === el) el.remove(); });
}

/* ────────────────────────────────────────────────────────────────
   8. FILTER TABS
   ──────────────────────────────────────────────────────────────── */
function initFilter() {
    const tabs = document.querySelectorAll('.filter-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const filter = btn.dataset.filter;
            if (typeof gsap !== 'undefined') {
                gsap.to('#gamesGrid', {
                    opacity: 0, y: 10, duration: 0.2,
                    onComplete: () => {
                        renderProjects(filter);
                        gsap.to('#gamesGrid', { opacity: 1, y: 0, duration: 0.3 });
                    },
                });
            } else {
                renderProjects(filter);
            }
        });
    });
}

/* ────────────────────────────────────────────────────────────────
   9. COPY-TO-CLIPBOARD (E-Mail)
   ──────────────────────────────────────────────────────────────── */
function initCopyEmail() {
    const btn = document.getElementById('copyEmail');
    const feedback = document.getElementById('copyFeedback');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const email = btn.dataset.email;
        navigator.clipboard.writeText(email).then(() => {
            feedback.classList.add('show');
            setTimeout(() => feedback.classList.remove('show'), 2200);
        }).catch(() => {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = email;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            ta.remove();
            feedback.classList.add('show');
            setTimeout(() => feedback.classList.remove('show'), 2200);
        });
    });
}

/* ────────────────────────────────────────────────────────────────
   10. HERO TITLE — Splitting.js
   ──────────────────────────────────────────────────────────────── */
function initSplitting() {
    if (typeof Splitting === 'undefined') return;
    Splitting({ target: '.hero-title[data-splitting]', by: 'chars' });
}

/* ────────────────────────────────────────────────────────────────
   INIT — alles starten wenn DOM bereit
   ──────────────────────────────────────────────────────────────── */
// Scroll-Restore deaktivieren
history.scrollRestoration = 'manual';
// Doppelter rAF: sicher nach dem Browser-eigenen Scroll-Restore-Frame
window.addEventListener('load', () => {
    requestAnimationFrame(() => requestAnimationFrame(() => window.scrollTo(0, 0)));
});

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    initSplitting();    // Splitting.js zuerst (bevor Animationen)
    initNav();
    initParticles();
    initAnimations();
    renderProjects('all'); // Karten rendern
    initFilter();
    initCopyEmail();

    // Scroll-Indikator: ausblenden beim Scrollen, einblenden wenn wieder oben
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        let visible = window.scrollY < 50;
        window.addEventListener('scroll', () => {
            const atTop = window.scrollY < 50;
            if (atTop && !visible) {
                gsap.to(scrollIndicator, { opacity: 1, duration: 0.4, ease: 'power2.out' });
                visible = true;
            } else if (!atTop && visible) {
                gsap.to(scrollIndicator, { opacity: 0, duration: 0.4, ease: 'power2.out' });
                visible = false;
            }
        }, { passive: true });
        if (!visible) gsap.set(scrollIndicator, { opacity: 0 });
    }
});
