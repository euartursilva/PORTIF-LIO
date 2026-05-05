// ========================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Pega todos os botões de navegação
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    // Adiciona evento de clique em cada botão
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            
            // Remove a classe 'active' de todos os botões
            navBtns.forEach(b => b.classList.remove('active'));
            
            // Adiciona a classe 'active' ao botão clicado
            this.classList.add('active');
            
            // Remove a classe 'active' de todas as seções
            sections.forEach(section => section.classList.remove('active'));
            
            // Adiciona a classe 'active' à seção correspondente
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.classList.add('active');
                
                // Scroll suave para o topo
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Pega os valores do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Valida os campos
    if (!name || !email || !subject || !message) {
        showFormMessage('Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    // Valida o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Por favor, insira um email válido!', 'error');
        return;
    }
    
    // Simula envio (em um caso real, isso seria enviado para um servidor)
    console.log('Formulário enviado:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toLocaleString('pt-BR')
    });
    
    // Mostra mensagem de sucesso
    showFormMessage('✓ Mensagem enviada com sucesso! Obrigado pelo contato!', 'success');
    
    // Limpa o formulário após 2 segundos
    setTimeout(() => {
        document.querySelector('.contact-form').reset();
        document.getElementById('form-message').style.display = 'none';
    }, 3000);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Remove mensagem de erro após 5 segundos
    if (type === 'error') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ========================================
// EFEITOS ADICIONAIS
// ========================================

// Animação ao carregar skill bars
window.addEventListener('load', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 0.8s ease-out';
            bar.style.width = width;
        }, 100);
    });
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Adiciona efeito de ripple nos botões
const buttons = document.querySelectorAll('button, .nav-btn, .form-btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});
