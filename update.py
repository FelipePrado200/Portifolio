import re
with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# 1. Remove particles
css = re.sub(r'/\* Efeito de partículas de fundo \*/.*?\}', '', css, flags=re.DOTALL)

# 2. Replace loader
loader_replacement = '''/* ===========================================
   TELA DE LOADING MINIMALISTA
   =========================================== */
#welcome-screen {
    position: fixed; top: 0; left: 0; width: 100%; height: 100vh;
    background: var(--darker-color);
    display: flex; justify-content: center; align-items: center; z-index: 9999;
}
.welcome-content {
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
}
.minimal-loader {
    width: 40px; height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.05);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
.loading-text {
    color: var(--text-light); font-size: 0.8rem; letter-spacing: 3px; font-weight: 600;
    text-transform: uppercase; animation: pulse 1.5s infinite; font-family: 'Outfit', sans-serif;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
'''

css = re.sub(r'/\* ===========================================\n   TELA DE LOADING LINDA\n   =========================================== \*/.*?(?=/\* ===========================================\n   CONTEÚDO PRINCIPAL\n   =========================================== \*/)', loader_replacement, css, flags=re.DOTALL)

# 3. Bento Box styling
css = css.replace('border: 1px solid rgba(108, 99, 255, 0.15);', 'border: 1px solid rgba(255, 255, 255, 0.05);')
css = css.replace('border: 1px solid rgba(108, 99, 255, 0.2);', 'border: 1px solid rgba(255, 255, 255, 0.05);')
css = css.replace('box-shadow: 0 15px 35px rgba(0,0,0,0.3);', 'box-shadow: 0 10px 30px rgba(0,0,0,0.5);')
css = css.replace('box-shadow: 0 20px 40px rgba(0,0,0,0.4);', 'box-shadow: 0 10px 30px rgba(0,0,0,0.5);')
css = css.replace('background: rgba(20, 20, 40, 0.5);', 'background: rgba(15, 15, 15, 0.6);')
css = css.replace('rgba(20, 20, 40, 0.4)', 'rgba(10, 10, 10, 0.8)')
css = css.replace('rgba(15, 15, 35, 0.7)', 'rgba(15, 15, 15, 0.6)')

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
