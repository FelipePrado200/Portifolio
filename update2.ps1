$css = Get-Content -Raw -Encoding UTF8 style.css

$startStr = "/* ===========================================`r`n   TELA DE LOADING LINDA"
$endStr = "/* ===========================================`r`n   CONTEÚDO PRINCIPAL"

$startIdx = $css.IndexOf($startStr)
$endIdx = $css.IndexOf($endStr)

if ($startIdx -lt 0 -or $endIdx -lt 0) {
    # Tentar com `n
    $startStr = "/* ===========================================`n   TELA DE LOADING LINDA"
    $endStr = "/* ===========================================`n   CONTEÚDO PRINCIPAL"
    $startIdx = $css.IndexOf($startStr)
    $endIdx = $css.IndexOf($endStr)
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

"@
    $css = $css.Substring(0, $startIdx) + $loaderReplace + $css.Substring($endIdx)
} else {
    Write-Host "No match found"
}

# Remove particles
$pStart = $css.IndexOf("/* Efeito")
if ($pStart -ge 0) {
    $pEnd = $css.IndexOf("}", $pStart)
    $css = $css.Substring(0, $pStart) + $css.Substring($pEnd+1)
}

$css | Set-Content -Encoding UTF8 style.css
