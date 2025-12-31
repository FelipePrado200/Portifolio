document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");

    // Remove a tela de loading após 3 segundos
    setTimeout(() => {
        welcomeScreen.style.opacity = "0";
        welcomeScreen.style.transition = "opacity 0.5s ease";
        
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContent.style.opacity = "1";
            mainContent.style.transition = "opacity 0.5s ease";
        }, 500);
    }, 3000);

    // Formulário WhatsApp
    const whatsappForm = document.getElementById("whatsappForm");
    if (whatsappForm) {
        whatsappForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome").value;
            const email = document.getElementById("email").value;
            const mensagem = document.getElementById("mensagem").value;

            const numeroWhatsApp = "5513981175814";
            const textoWhatsApp = `Olá, meu nome é ${nome}. Meu e-mail é ${email}. ${mensagem}`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;
            window.open(url, "_blank");
        });
    }

    // Navegação suave
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animar barras de habilidade quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(document.getElementById('habilidades'));
});

// Efeito de tooltip para habilidades
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.habilidade-card')) {
        const card = e.target.closest('.habilidade-card');
        const tooltip = card.getAttribute('data-tooltip');
        
        if (tooltip) {
            // Criar tooltip
            let tooltipEl = document.querySelector('.skill-tooltip');
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.className = 'skill-tooltip';
                document.body.appendChild(tooltipEl);
            }
            
            tooltipEl.textContent = tooltip;
            const rect = card.getBoundingClientRect();
            
            tooltipEl.style.position = 'fixed';
            tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 10) + 'px';
            tooltipEl.style.left = (rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
            tooltipEl.style.opacity = '1';
        }
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.habilidade-card')) {
        const tooltip = document.querySelector('.skill-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
        }
    }
});

// Adicionar estilo para tooltip
const style = document.createElement('style');
style.textContent = `
    .skill-tooltip {
        position: fixed;
        background: rgba(15, 15, 35, 0.95);
        color: var(--light-color);
        padding: 0.8rem 1.2rem;
        border-radius: 8px;
        font-size: 0.9rem;
        z-index: 10000;
        border: 1px solid var(--primary-color);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        pointer-events: none;
        max-width: 250px;
        text-align: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
