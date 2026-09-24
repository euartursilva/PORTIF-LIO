document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('[data-section]');
    const sections = document.querySelectorAll('.section');

    function showSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (!target) return;

        sections.forEach((section) => section.classList.toggle('active', section.id === sectionId));
        document.querySelectorAll('.nav-btn').forEach((button) => {
            button.classList.toggle('active', button.dataset.section === sectionId);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navButtons.forEach((button) => button.addEventListener('click', () => showSection(button.dataset.section)));

    const emailInput = document.getElementById('email');
    const emailBurst = document.getElementById('email-emoji-burst');
    if (emailInput && emailBurst) {
        let lastTriggeredEmail = '';
        const triggerWhenValid = () => {
            const currentEmail = emailInput.value.trim();
            if (currentEmail && emailInput.checkValidity() && currentEmail !== lastTriggeredEmail) {
                lastTriggeredEmail = currentEmail;
                triggerEmojiBurst(emailBurst);
            }
        };

        emailInput.addEventListener('input', triggerWhenValid);
        emailInput.addEventListener('blur', () => {
            triggerWhenValid();
        });
    }

    document.querySelectorAll('.skill-progress').forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => { bar.style.width = width; });
    });

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

    setupGameboy();
});

function setupGameboy() {
    const content = document.getElementById('screen-content');
    const status = document.getElementById('screen-status');
    if (!content || !status) return;

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
        if (mode === 'menu' && (name === 'up' || name === 'down')) { selected = (selected + (name === 'down' ? 1 : 3)) % 4; renderMenu(); return; }
        move(name);
    };
    document.querySelectorAll('[data-game-action]').forEach((button) => button.addEventListener('click', () => action(button.dataset.gameAction)));
    document.addEventListener('keydown', (event) => { const keys = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', z: 'a', x: 'b', Enter: 'start' }; if (keys[event.key]) { event.preventDefault(); action(keys[event.key]); } });
}

function triggerEmojiBurst(container) {
    const emojis = Array.from({ length: 12 }, () => '👾');
    const positions = [
        [-180, -120], [-120, -190], [-60, -85], [0, -165],
        [60, -105], [120, -215], [180, -135], [-150, -275],
        [-45, -245], [75, -285], [165, -245], [240, -180],
    ];

    container.replaceChildren();
    emojis.forEach((emoji, index) => {
        const particle = document.createElement('span');
        particle.className = 'emoji-particle';
        particle.textContent = emoji;
        particle.style.setProperty('--particle-index', index);
        particle.style.setProperty('--particle-x', `${positions[index][0]}px`);
        particle.style.setProperty('--particle-y', `${positions[index][1]}px`);
        container.appendChild(particle);
    });
    window.setTimeout(() => container.replaceChildren(), 3000);
}

function handleFormSubmit(event) {
    const form = event.currentTarget;
    const message = document.getElementById('form-message');
    const emailBurst = document.getElementById('email-emoji-burst');

    triggerEmojiBurst(emailBurst);
    message.textContent = 'Enviando sua mensagem...';
    message.className = 'form-message success';
    form.querySelector('.form-btn').disabled = true;
}
