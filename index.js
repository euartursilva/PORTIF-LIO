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
        emailInput.addEventListener('blur', () => {
            if (emailInput.value.trim() && emailInput.checkValidity()) triggerEmojiBurst(emailBurst);
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
});

function triggerEmojiBurst(container) {
    const emojis = Array.from({ length: 12 }, () => '👾');
    const positions = [
        [-30, -90], [-75, -145], [-120, -55], [-165, -125],
        [-210, -200], [-255, -85], [-300, -165], [-345, -245],
        [-390, -115], [-435, -190], [-480, -70], [-525, -145],
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
    event.preventDefault();
    const form = event.currentTarget;
    const message = document.getElementById('form-message');

    message.textContent = 'Mensagem preparada com sucesso. Obrigado pelo contato!';
    message.className = 'form-message success';
    form.reset();
}
