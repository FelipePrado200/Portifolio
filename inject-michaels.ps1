$css = Get-Content -Raw -Encoding UTF8 style.css

# 1. Update Core Variables to match michaels.dev.br
$varsReplacement = @"
:root {
    /* Theme Michaels.dev.br */
    --primary-color: #8b5cf6;
    --secondary-color: #7c3aed;
    --accent-color: #d8b4fe;
    --accent-color-2: #c084fc;
    --dark-color: #18181b;
    --darker-color: #09090b;
    --light-color: #fafafa;
    --text-color: #e4e4e7;
    --text-light: #a1a1aa;
    
    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
    --gradient-accent: linear-gradient(135deg, #c084fc 0%, #a855f7 100%);
    --gradient-cyber: linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%);
    --gradient-dark: linear-gradient(135deg, #09090b 0%, #18181b 100%);
    
    /* Bento Box Effects */
    --transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    --shadow-hover: 0 10px 40px rgba(139, 92, 246, 0.15), 0 0 0 1px rgba(255,255,255,0.05);
    --border-radius: 20px;
    --border-radius-lg: 32px;
}
"@
# Replace :root section
$css = $css -replace '(?s):root \{.*?\}', $varsReplacement

# 2. Update Background Bubbles to be subtle purple/blue plexus
$particlesReplacement = @"
body::before {
    content: '';
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: 
        radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.06), transparent 50%),
        radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.04), transparent 50%);
    z-index: -1;
    pointer-events: none;
}
"@
$css = $css -replace '(?s)/\* Efeito de partículas de fundo \*/.*?\}', "/* Fundo Michaels (Plexus/Constellation) */`n$particlesReplacement"

# 3. Update the Bento Box Cards Styling
$css = $css.Replace('border: 1px solid rgba(108, 99, 255, 0.15);', 'border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);')
$css = $css.Replace('border: 1px solid rgba(108, 99, 255, 0.2);', 'border: 1px solid rgba(255, 255, 255, 0.08); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);')
$css = $css.Replace('background: rgba(20, 20, 40, 0.5);', 'background: rgba(24, 24, 27, 0.4);')
$css = $css.Replace('rgba(20, 20, 40, 0.4)', 'rgba(9, 9, 11, 0.8)')
$css = $css.Replace('rgba(15, 15, 35, 0.7)', 'rgba(24, 24, 27, 0.6)')

# 4. Loader Replacement
$startIdx = $css.IndexOf("/* ===========================================`r`n   TELA DE LOADING LINDA")
$endIdx = $css.IndexOf("/* ===========================================`r`n   CONTEÚDO PRINCIPAL")

if ($startIdx -lt 0) {
    $startIdx = $css.IndexOf("/* ===========================================`n   TELA DE LOADING LINDA")
    $endIdx = $css.IndexOf("/* ===========================================`n   CONTEÚDO PRINCIPAL")
}

if ($startIdx -ge 0 -and $endIdx -ge 0) {
    $loaderReplace = @"
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
    $css = $css.Substring(0, $startIdx) + $loaderReplace + $css.Substring($endIdx)
}

$css | Set-Content -Encoding UTF8 style.css
