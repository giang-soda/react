rsync -av \
  --exclude '.git' \
  --exclude '.github' \
  --exclude '.vscode' \
  --exclude '.react-router' \
  --exclude '.vercel' \
  --exclude 'build' \
  --exclude 'node_modules' \
  --exclude 'pages-github' \
  './reactjs/' \
  './new-project'
