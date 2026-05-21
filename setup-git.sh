#!/bin/bash
# Raw Ritual — Move project to ~/Projects and push to GitHub
set -e

SRC="/Users/andriy_ko/Library/Application Support/Claude/local-agent-mode-sessions/a72c4d31-f06e-4646-b80a-350f8fdb7fc2/cb2f65c0-45b2-4968-b910-b06b98cb67ba/local_7cec4ffe-438e-44b8-99e9-31cfe18f1875/outputs/raw-ritual-react"
DEST="$HOME/Projects/raw-ritual-react"

echo ""
echo "🌿 Raw Ritual — Git Setup"
echo "=========================="

# 1. Copy project to ~/Projects/
echo ""
echo "1️⃣  Copying project to $DEST ..."
mkdir -p "$HOME/Projects"
cp -r "$SRC" "$DEST"
echo "   ✅ Done"

# 2. Create .gitignore
cat > "$DEST/.gitignore" << 'EOF'
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
__pycache__/
*.pyc
backend/.venv/
EOF
echo ""
echo "2️⃣  Created .gitignore ✅"

# 3. Init git and first commit
cd "$DEST"
git init -b main
git add .
git commit -m "feat: initial Raw Ritual site — React + Vite + FastAPI"
echo ""
echo "3️⃣  Git repo initialized, first commit made ✅"

# 4. Try GitHub CLI, otherwise print manual steps
echo ""
echo "4️⃣  Creating GitHub repo..."
if command -v gh &> /dev/null; then
  gh repo create raw-ritual-react --public --source=. --remote=origin --push
  echo "   ✅ Repo created and pushed!"
  echo ""
  echo "🔗 GitHub: https://github.com/$(gh api user --jq .login)/raw-ritual-react"
else
  echo "   ⚠️  GitHub CLI (gh) not found."
  echo ""
  echo "   Зроби вручну:"
  echo "   1. Відкрий https://github.com/new"
  echo "   2. Назви репо: raw-ritual-react → Create repository"
  echo "   3. Скопіюй SSH або HTTPS URL і виконай:"
  echo ""
  echo "      cd ~/Projects/raw-ritual-react"
  echo "      git remote add origin <твій URL>"
  echo "      git push -u origin main"
fi

echo ""
echo "✅ Готово! Проєкт у ~/Projects/raw-ritual-react"
