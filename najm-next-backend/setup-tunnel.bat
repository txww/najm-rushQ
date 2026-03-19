@echo off
echo ========================================
echo    Cloudflare Tunnel Setup for Najm Rush
echo ========================================
echo.

echo Checking if cloudflared is installed...
cloudflared version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: cloudflared is not installed.
    echo Please install it from: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/
    echo Or run: winget install --id Cloudflare.cloudflared
    pause
    exit /b 1
)

echo.
echo [1/4] Logging into Cloudflare...
cloudflared tunnel login

echo.
echo [2/4] Creating tunnel 'najm-tunnel'...
cloudflared tunnel create najm-tunnel

echo.
echo [3/4] Setting up DNS route...
echo Please enter your domain (e.g., najm-rush.com):
set /p DOMAIN="Domain: "
cloudflared tunnel route dns najm-tunnel %DOMAIN%

echo.
echo [4/4] Creating configuration file...
(
echo tunnel: najm-tunnel
echo credentials-file: %%USERPROFILE%%/.cloudflared/credentials.json
echo.
echo ingress:
echo   - hostname: %DOMAIN%
echo     service: http://localhost:3000
echo   - hostname: www.%DOMAIN%
echo     service: http://localhost:3000
echo   - service: http_status:404
) > cloudflared.yml

echo.
echo Configuration complete!
echo.
echo To start the tunnel, run:
echo cloudflared tunnel run --config cloudflared.yml najm-tunnel
echo.
echo Make sure your website is running on localhost:3000 first:
echo npm run start:prod
echo.
pause