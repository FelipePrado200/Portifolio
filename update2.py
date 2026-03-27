import sys

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Replace loading spinner using generic indexing
start_str = "/* ===========================================\n   TELA DE LOADING LINDA"
end_str = "/* ===========================================\n   CONTEÚDO PRINCIPAL"

start_idx = css.find(start_str)
end_idx = css.find(end_str)

if start_idx != -1 and end_idx != -1:
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
    border-top: 3px solid #FFF;
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
    css = css[:start_idx] + loader_replacement + css[end_idx:]
else:
    print("Could not find boundaries.")

# Remove particles block entirely
p_start = css.find("/* Efeito de partículas de fundo */")
p_end = css.find("}", p_start)
if p_start != -1 and p_end != -1:
    css = css[:p_start] + css[p_end+1:]

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)
