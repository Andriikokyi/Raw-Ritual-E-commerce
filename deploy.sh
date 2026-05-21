#!/bin/bash
# Raw Ritual — Deploy to Vercel
# Run this script once from Terminal to publish your site.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo ""
echo "🌿 Raw Ritual — Deploying to Vercel"
echo "===================================="
echo ""

# Check for Node
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install it from https://nodejs.org"
  exit 1
fi

# Install deps if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Deploy (will open browser for login if not already authenticated)
echo "🚀 Deploying..."
npx vercel --prod --yes

echo ""
echo "✅ Done! Your site is live on Vercel."
