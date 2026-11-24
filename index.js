document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-btn[data-section]');
    const sections = document.querySelectorAll('main > .section');
    const setActiveSection = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.dataset.section === sectionId;
            link.classList.toggle('active', isActive);
            if (isActive) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);
            if (visibleSections[0]) setActiveSection(visibleSections[0].target.id);
        }, { rootMargin: '-20% 0px -65% 0px' });

        sections.forEach((section) => sectionObserver.observe(section));
    }

    const tiltCard = document.querySelector('[data-tilt]');
    if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
        tiltCard.addEventListener('pointermove', (event) => {
            const bounds = tiltCard.getBoundingClientRect();
            const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -8;
            const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 8;
            tiltCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(2deg)`;
        });
        tiltCard.addEventListener('pointerleave', () => {
            tiltCard.style.transform = '';
        });
    }

    setupLogo();
    setupGameboy();
});

function setupLogo() {
    const brand = document.querySelector('.brand');
    if (!brand || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cores = ['#d5f36b', '#b04532', '#14211f'];
    brand.addEventListener('click', () => {
        brand.classList.remove('voando');
        void brand.offsetWidth;
        brand.classList.add('voando');
        for (let i = 0; i < 7; i += 1) {
            const pena = document.createElement('span');
            pena.className = 'pena';
            pena.style.background = cores[i % cores.length];
            pena.style.setProperty('--px', `${(Math.random() - 0.5) * 90}px`);
            pena.style.setProperty('--py', `${20 + Math.random() * 50}px`);
            pena.style.setProperty('--pr', `${Math.random() * 540 - 270}deg`);
            pena.style.animationDelay = `${i * 40}ms`;
            brand.appendChild(pena);
            setTimeout(() => pena.remove(), 1500);
        }
    });
    brand.addEventListener('animationend', (event) => {
        if (event.animationName === 'asa-voo') brand.classList.remove('voando');
    });
}

function setupGameboy() {
    const content = document.getElementById('screen-content');
    const status = document.getElementById('screen-status');
    const screen = document.getElementById('game-screen');
    if (!content || !status || !screen) return;

    const menu = [
        ['SOBRE MIM', 'Construo software com curiosidade, disciplina e atenção aos detalhes.'],
        ['PROJETOS', 'Ideias que saíram do papel e ganharam código.'],
        ['STACK', 'Java · Python · React · SQL · Git'],
        ['CONTATO', 'artursilvaaraujo31@gmail.com'],
    ];
    let mode = 'start';
    let selected = 0;
    let player = { x: 0, y: 0 };
    let stars = [];

    const showStart = () => { mode = 'start'; content.innerHTML = '<div class="pixel-logo">ARTUR<br><strong>QUEST</strong></div><p class="screen-hint">PRESS START</p>'; status.textContent = 'A: selecionar   B: voltar'; };
    const renderInfo = () => { mode = 'info'; content.innerHTML = `<div class="game-info"><strong>${menu[selected][0]}</strong><span>${menu[selected][1]}</span></div>`; status.textContent = 'B: voltar ao menu   START: jogar'; };
    const renderMenu = () => {
        mode = 'menu';
        content.innerHTML = `<div class="game-menu">${menu.map((item, index) => `<button class="${index === selected ? 'selected' : ''}" data-menu-index="${index}">${index + 1}. ${item[0]}</button>`).join('')}</div>`;
        status.textContent = 'A: abrir   ▲▼: navegar   B: início';
        content.querySelectorAll('[data-menu-index]').forEach((button) => button.addEventListener('click', () => { selected = Number(button.dataset.menuIndex); renderInfo(); }));
    };
    const renderQuest = () => {
        mode = 'quest';
        const cells = [];
        for (let y = 0; y < 4; y += 1) for (let x = 0; x < 8; x += 1) { const isPlayer = player.x === x && player.y === y; const isStar = stars.some((star) => star.x === x && star.y === y); cells.push(`<span class="quest-cell ${isPlayer ? 'player' : ''} ${isStar ? 'star' : ''}">${isPlayer ? '▲' : isStar ? '✦' : ''}</span>`); }
        content.innerHTML = `<div class="game-info"><strong>${stars.length ? 'COLETE AS IDEIAS' : 'MISSÃO CUMPRIDA!'}</strong><div class="quest-grid">${cells.join('')}</div></div>`;
        status.textContent = stars.length ? `✦ ${3 - stars.length}/3 coletadas   D-pad: mover   B: sair` : 'A: jogar de novo   B: menu';
    };
    const startQuest = () => { player = { x: 0, y: 0 }; stars = [{ x: 3, y: 1 }, { x: 6, y: 3 }, { x: 7, y: 0 }]; renderQuest(); };
    const move = (direction) => {
        if (mode !== 'quest' || !stars.length) return;
        const delta = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[direction];
        if (!delta) return;
        player.x = Math.max(0, Math.min(7, player.x + delta[0])); player.y = Math.max(0, Math.min(3, player.y + delta[1]));
        stars = stars.filter((star) => star.x !== player.x || star.y !== player.y); renderQuest();
    };
    const action = (name) => {
        if (name === 'start') { mode === 'quest' ? startQuest() : renderMenu(); return; }
        if (name === 'select') { startQuest(); return; }
        if (name === 'a') { if (mode === 'start') renderMenu(); else if (mode === 'menu') renderInfo(); else if (mode === 'quest' && !stars.length) startQuest(); return; }
        if (name === 'b') { if (mode === 'start') return; if (mode === 'menu') showStart(); else renderMenu(); return; }
        if (mode === 'menu' && (name === 'up' || name === 'down')) { selected = (selected + (name === 'down' ? 1 : menu.length - 1)) % menu.length; renderMenu(); return; }
        move(name);
    };
    document.querySelectorAll('[data-game-action]').forEach((button) => button.addEventListener('click', () => action(button.dataset.gameAction)));
    screen.addEventListener('keydown', (event) => {
        const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
        const keys = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', z: 'a', x: 'b', Enter: 'start' };
        if (!keys[key]) return;
        event.preventDefault();
        action(keys[key]);
    });
}
