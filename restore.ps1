$html = Get-Content -Raw -Encoding UTF8 index.html

$oldLoaderStr = @"
        <div class="welcome-content">
            <div class="minimal-loader"></div>
            <p class="loading-text">Carregando</p>
        </div>
"@

$newLoaderStr = @"
        <div class="welcome-content">
            <h1 class="glitch" data-text="Inicializando...">Inicializando...</h1>
            <div class="premium-loader">
                <svg viewBox="0 0 100 100" class="svg-loader">
                    <defs>
                        <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="var(--accent-color-2)" />
                            <stop offset="50%" stop-color="var(--primary-color)" />
                            <stop offset="100%" stop-color="var(--accent-color)" />
                        </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="45" stroke="url(#glow-gradient)" stroke-width="3" fill="none" stroke-linecap="round" class="loader-ring"></circle>
                </svg>
                <div class="pulse-core"></div>
            </div>
            <div class="loading-progress">
                <div class="progress-bar"></div>
            </div>
        </div>
"@

$htmlStr = $html -replace '\r\n', "`n"
$target = $oldLoaderStr -replace '\r\n', "`n"

if ($htmlStr.Contains($target)) {
   $htmlStr = $htmlStr.Replace($target, $newLoaderStr)
   $htmlStr | Set-Content -Encoding UTF8 index.html
   Write-Host "HTML restored!"
}

# --- CSS Restore ---
$css = Get-Content -Raw -Encoding UTF8 style.css

$oldCssLoader = @"
/* ===========================================
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
    width: 48px; height: 48px;
    border: 3px solid rgba(255, 255, 255, 0.05);
    border-top: 3px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
.loading-text {
    color: var(--text-light); font-size: 0.8rem; letter-spacing: 4px; font-weight: 500;
    text-transform: uppercase; animation: pulse 2s infinite; font-family: 'Inter', monospace;
}
@keyframes spin { 100% { transform: rotate(360deg); } }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

"@

$newCssLoader = @"
/* ===========================================
   TELA DE LOADING LINDA
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

$cssStr = $css -replace '\r\n', "`n"
$targetCss = $oldCssLoader -replace '\r\n', "`n"

if ($cssStr.Contains($targetCss)) {
    $cssStr = $cssStr.Replace($targetCss, $newCssLoader)
    $cssStr | Set-Content -Encoding UTF8 style.css
    Write-Host "CSS restored!"
}
