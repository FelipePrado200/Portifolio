        document.addEventListener("DOMContentLoaded", () => {
            const welcomeScreen = document.getElementById("welcome-screen");
            const mainContent = document.getElementById("main-content");

            setTimeout(() => {
                welcomeScreen.style.display = "none";
                mainContent.classList.remove("hidden");
            }, 3000);
        });

        const whatsappForm = document.getElementById("whatsappForm");
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