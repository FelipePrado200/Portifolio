$css = Get-Content -Raw -Encoding UTF8 style.css

$newCssLoader = @"

/* ===========================================
   TELA DE LOADING LINDA (Override / Restored)
   =========================================== */
#welcome-screen {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100vh;
    background: var(--darker-color);
    display: flex; justify-content: center; align-items: center; z-index: 9999;
}

.welcome-content {
    text-align: center;
    color: white;
    max-width: 800px; padding: 2rem; position: relative;
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
}

.welcome-content h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: 2rem;
    font-weight: 700;
    background: linear-gradient(90deg, var(--accent-color-2), var(--primary-color), var(--accent-color));
    background-size: 200% auto;
    -webkit-background-clip: text; background-clip: text; color: transparent;
    animation: gradientShift 3s ease infinite;
    font-family: 'Outfit', sans-serif;
    position: relative;
}

.glitch {
    position: relative;
    animation: glitch 1.5s infinite;
}

.glitch::before,
.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--darker-color);
}

.glitch::before {
    left: 2px;
    text-shadow: -1px 0 var(--accent-color);
    clip: rect(24px, 550px, 90px, 0);
    animation: glitch-anim 2.5s infinite linear alternate-reverse;
}

.glitch::after {
    left: -2px;
    text-shadow: -1px 0 var(--accent-color-2);
    clip: rect(85px, 550px, 140px, 0);
    animation: glitch-anim 3s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
    0% { clip: rect(10px, 9999px, 80px, 0); }
    20% { clip: rect(60px, 9999px, 20px, 0); }
    40% { clip: rect(30px, 9999px, 100px, 0); }
    60% { clip: rect(90px, 9999px, 40px, 0); }
    80% { clip: rect(15px, 9999px, 70px, 0); }
    100% { clip: rect(50px, 9999px, 10px, 0); }
}

.premium-loader {
    position: relative; width: 120px; height: 120px; margin: 0 auto 2rem;
    display: flex; justify-content: center; align-items: center;
}

.svg-loader {
    width: 100%; height: 100%;
    animation: spin 3s linear infinite;
}

.loader-ring {
    stroke-dasharray: 283; stroke-dashoffset: 283;
    animation: dashRing 2s ease-in-out infinite alternate;
}

.pulse-core {
    position: absolute; width: 40px; height: 40px;
    background: rgba(139, 92, 246, 0.2); border-radius: 50%;
    box-shadow: 0 0 30px var(--primary-color);
    animation: innerPulse 1.5s ease-out infinite;
}

.loading-progress {
    width: 300px; height: 4px; background: rgba(255,255,255,0.05);
    border-radius: 4px; overflow: hidden; margin: 0 auto;
}

.progress-bar {
    width: 0%; height: 100%; background: var(--gradient-primary);
    transition: width 0.1s ease;
}

@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes dashRing { 0% { stroke-dashoffset: 283; } 100% { stroke-dashoffset: 0; } }
@keyframes innerPulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
@keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }

"@

$css += $newCssLoader
$css | Set-Content -Encoding UTF8 style.css
Write-Host "CSS Appended Successfully!"
