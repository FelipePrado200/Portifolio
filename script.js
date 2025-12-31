// ===========================================
// TELA DE LOADING
// ===========================================
document.addEventListener("DOMContentLoaded", () => {
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainContent = document.getElementById("main-content");
    
    // Animação de digitação para o título
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
    
    // Remove a tela de loading após 3 segundos
    setTimeout(() => {
        welcomeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            mainContent.classList.remove("hidden");
            document.body.style.overflow = 'auto';
            
            // Animações após carregamento
            iniciarAnimações();
        }, 800);
    }, 3000);

    // ===========================================
    // FORMULÁRIO DE WHATSAPP
    // ===========================================
    const whatsappForm = document.getElementById("whatsappForm");
    if (whatsappForm) {
        whatsappForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            // Validação básica
            if (!nome || !email || !mensagem) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Por favor, insira um email válido!");
                return;
            }

            const numeroWhatsApp = "5513981175814";
            const textoWhatsApp = `Olá, meu nome é ${nome}. Meu e-mail é ${email}. ${mensagem}`;

            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoWhatsApp)}`;
            window.open(url, "_blank");
            
            // Limpa o formulário após envio
            whatsappForm.reset();
            
            // Reseta os labels
            const labels = whatsappForm.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.left = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'var(--text-light)';
            });
        });
    }

    // ===========================================
    // NAVEGAÇÃO SUAVE
    // ===========================================
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================================
    // HEADER SCROLL EFFECT
    // ===========================================
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

    // ===========================================
    // ANIMAÇÃO DAS BARRAS DE HABILIDADE
    // ===========================================
    function animarBarrasHabilidade() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }

    // ===========================================
    // TOOLTIP PARA AS HABILIDADES
    // ===========================================
    const skillCards = document.querySelectorAll('#habilidades .card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                const tooltipEl = document.createElement('div');
                tooltipEl.className = 'skill-tooltip';
                tooltipEl.textContent = tooltip;
                document.body.appendChild(tooltipEl);
                
                const rect = this.getBoundingClientRect();
                tooltipEl.style.position = 'fixed';
                tooltipEl.style.top = (rect.top - tooltipEl.offsetHeight - 10) + 'px';
                tooltipEl.style.left = (rect.left + rect.width / 2 - tooltipEl.offsetWidth / 2) + 'px';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // ===========================================
    // CONTADOR DE VISITAS (SIMULAÇÃO)
    // ===========================================
    function atualizarContadorVisitas() {
        const contadorEl = document.querySelector('.visitas-counter');
        if (contadorEl) {
            let visitas = localStorage.getItem('portfolioVisitas') || 0;
            visitas = parseInt(visitas) + 1;
            localStorage.setItem('portfolioVisitas', visitas);
            contadorEl.textContent = visitas;
        }
    }

    // ===========================================
    // MODAL PARA IMAGENS DOS PROJETOS
    // ===========================================
    const projectImages = document.querySelectorAll('.projeto-img img');
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // ===========================================
    // ANIMAÇÃO DE DIGITAÇÃO PARA TEXTOS
    // ===========================================
    function typeWriterEffect(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ===========================================
    // INICIAR TODAS AS ANIMAÇÕES
    // ===========================================
    function iniciarAnimações() {
        // Animar barras de habilidade
        setTimeout(animarBarrasHabilidade, 500);
        
        // Atualizar contador de visitas
        setTimeout(atualizarContadorVisitas, 1000);
        
        // Animar elementos ao scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        // Observar todas as seções e cards
        document.querySelectorAll('section, .card, .projeto, .timeline-item').forEach(el => {
            observer.observe(el);
        });
        
        // Efeito hover nos cards de habilidades
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
    }
});

// ===========================================
// ANIMAÇÃO DO SCROLL PARA TOPO
// ===========================================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===========================================
// BOTÃO VOLTAR AO TOPO
// ===========================================
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (!scrollTopBtn) {
        const btn = document.createElement('button');
        btn.className = 'scroll-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.addEventListener('click', scrollToTop);
        document.body.appendChild(btn);
    }
    
    const btn = document.querySelector('.scroll-top');
    if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.visibility = 'visible';
    } else {
        btn.style.opacity = '0';
        btn.style.visibility = 'hidden';
    }
});

// ===========================================
// ESTILOS DINÂMICOS PARA ELEMENTOS CRIADOS
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar CSS dinâmico para tooltips
    const style = document.createElement('style');
    style.textContent = `
        .skill-tooltip {
            position: fixed;
            background: rgba(15, 15, 35, 0.95);
            color: var(--light-color);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 10000;
            border: 1px solid var(--primary-color);
            box-shadow: var(--shadow);
            pointer-events: none;
            max-width: 200px;
            text-align: center;
        }
        
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        }
        
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .modal-content img {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 10px;
        }
        
        .close-modal {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            background: none;
            border: none;
        }
        
        .scroll-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-hover);
        }
        
        .scroll-top:hover {
            background: var(--gradient-accent);
            transform: translateY(-3px);
        }
        
        .animate {
            animation: fadeInUp 0.8s ease forwards;
        }
    `;
    document.head.appendChild(style);
});

// ===========================================
// DETECÇÃO DE CONEXÃO
// ===========================================
window.addEventListener('online', function() {
    mostrarNotificacao('Conexão restaurada!', 'success');
});

window.addEventListener('offline', function() {
    mostrarNotificacao('Você está offline', 'error');
});

function mostrarNotificacao(mensagem, tipo) {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao ${tipo}`;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// ===========================================
// COPYRIGHT DINÂMICO
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    const anoAtual = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('footer p');
    copyrightElements.forEach(el => {
        if (el.textContent.includes('2025')) {
            el.textContent = el.textContent.replace('2025', anoAtual);
        }
    });
});
