document.addEventListener("DOMContentLoaded", () => {
    // ==================== TELA DE LOADING ====================
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    
    // Adiciona o ponto animado ao loader
    const loaderDot = document.createElement('div');
    loaderDot.className = 'loader-dot';
    if (document.querySelector('.loader')) {
        document.querySelector('.loader').appendChild(loaderDot);
    }
    
    // Efeito de digitação para o título (se existir)
    const welcomeTitle = document.querySelector('.welcome-content h1');
    if (welcomeTitle) {
        const text = welcomeTitle.textContent;
        welcomeTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                welcomeTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
    
    // Remove a tela de loading após 2.5 segundos
    setTimeout(() => {
        welcomeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            if (mainContent) {
                mainContent.classList.remove("hidden");
            }
            document.body.style.overflow = 'auto';
        }, 800);
    }, 2500);

    // ==================== ANIMAÇÃO DE SEÇÕES ====================
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Adiciona delay para cada elemento dentro da seção
                const cards = entry.target.querySelectorAll('.card, .projeto, .formacao-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(40px)';
        
        const cards = section.querySelectorAll('.card, .projeto, .formacao-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        observer.observe(section);
    });
    
    // ==================== HEADER SCROLL EFFECT ====================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // ==================== NAVEGAÇÃO SUAVE ====================
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==================== EFEITO HOVER PARA CARDS ====================
    document.querySelectorAll('#habilidades .card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // ==================== FORMULÁRIO DE WHATSAPP ====================
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
    
    // ==================== FORMULÁRIO DE CONTATO (ORIGINAL) ====================
    const contactForm = document.querySelector('#contato form');
    if (contactForm) {
        // Adicionar labels flutuantes
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder) {
                const label = document.createElement('span');
                label.className = 'floating-label';
                label.textContent = placeholder;
                input.parentNode.insertBefore(label, input.nextSibling);
                input.setAttribute('placeholder', '');
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verifica se é o formulário do WhatsApp
            const isWhatsAppForm = this.id === 'whatsappForm';
            
            if (!isWhatsAppForm) {
                // Animação de envio para o formulário normal
                const button = this.querySelector('button');
                const originalText = button.textContent;
                button.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
                button.disabled = true;
                
                // Simulação de envio
                setTimeout(() => {
                    button.innerHTML = 'Enviado! <i class="fas fa-check"></i>';
                    button.style.background = 'var(--gradient-cyber)';
                    
                    // Reset após 3 segundos
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.disabled = false;
                        button.style.background = '';
                        contactForm.reset();
                        
                        // Reset labels
                        const labels = contactForm.querySelectorAll('.floating-label');
                        labels.forEach(label => {
                            label.style.top = '1.5rem';
                            label.style.left = '1.8rem';
                            label.style.fontSize = '1.1rem';
                            label.style.color = 'rgba(255, 255, 255, 0.6)';
                        });
                    }, 3000);
                }, 2000);
            }
        });
    }
});

// ==================== ANIMAÇÕES GLOBAIS ====================
window.addEventListener('load', function() {
    // Efeito de partículas para o fundo
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6C63FF" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6C63FF",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
});
