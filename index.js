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
});

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
