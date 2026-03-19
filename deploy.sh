#!/bin/bash
# deploy.sh — Run on the VPS to deploy/update Najm Rush
set -e

APP_DIR="/var/www/najmrush"
NEXT_DIR="$APP_DIR/najm-next-backend"
STRAPI_DIR="$APP_DIR/najm-strapi"

echo "======================================"
echo "  Deploying Najm Rush"
echo "======================================"

# ─── Update Next.js ────────────────────────────────────────────────
echo ""
echo "[1/4] Pulling latest Next.js code..."
cd "$NEXT_DIR"
git pull

echo "[2/4] Installing & building Next.js..."
npm ci
npm run build

# ─── Update Strapi ─────────────────────────────────────────────────
echo ""
echo "[3/4] Pulling latest Strapi code..."
cd "$STRAPI_DIR"
git pull

echo "[4/4] Installing & building Strapi..."
npm ci
NODE_ENV=production npm run build

# ─── Restart processes ─────────────────────────────────────────────
echo ""
echo "[PM2] Restarting services..."
cd "$APP_DIR"
pm2 restart ecosystem.config.js --update-env
pm2 save

echo ""
echo "======================================"
echo "  Deployment complete!"
echo "  Site: https://najmrush.com"
echo "  CMS:  https://cms.najmrush.com"
echo "======================================"
