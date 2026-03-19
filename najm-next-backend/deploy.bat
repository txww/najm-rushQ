@echo off
echo ========================================
echo    Najm Rush Website Deployment Script
echo ========================================
echo.

echo [1/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/5] Setting up database...
call npx prisma db push
if %errorlevel% neq 0 (
    echo Error: Failed to setup database
    pause
    exit /b 1
)

echo.
echo [3/5] Seeding database...
call npx prisma db seed
if %errorlevel% neq 0 (
    echo Error: Failed to seed database
    pause
    exit /b 1
)

echo.
echo [4/5] Building application...
call npm run build
if %errorlevel% neq 0 (
    echo Error: Failed to build application
    pause
    exit /b 1
)

echo.
echo [5/5] Starting application...
echo Application will be available at: http://localhost:3000
echo To expose it via Cloudflare Tunnel, run in another terminal:
echo cloudflared tunnel run najm-tunnel
echo.
call npm run start:prod

pause