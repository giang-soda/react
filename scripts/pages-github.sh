#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."


# Get the root directory of the project
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/build/client"
TARGET_DIR="${ROOT_DIR}/pages-github"

# Đảm bảo file .env tồn tại
if [ -f "${ROOT_DIR}/.env" ]; then
    # Sử dụng source để load các biến môi trường
    source ${ROOT_DIR}/.env
else
    echo "Lỗi: File .env không tồn tại, vẫn tiếp tục"
fi

# Get SUB_PATH from environment variable [BASE_URL] or use default
SUB_PATH="${VITE_BASE_URL:-/}"
echo "SUB_PATH: $SUB_PATH"
# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR$SUB_PATH"

# Remove all files and subdirectories in the target directory except excluded ones
echo "Cleaning target directory (excluding .git and scripts)..."
find "$TARGET_DIR$SUB_PATH" -mindepth 1 -not \( -path "$TARGET_DIR/.git" -o -path "$TARGET_DIR/scripts" \) -delete

echo "Run build npm"
npm run build

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build directory does not exist at $BUILD_DIR"
  exit 1
fi

# Copy all files from build to pages-github
echo "Copying files from build to pages-github..."

# Check if SUB_PATH exists and is not root, then move files to SUB_PATH
if [ -n "$SUB_PATH" ] && [ "$SUB_PATH" != "/" ]; then
  echo "Moving all files from build to $SUB_PATH subdirectory..."
  # Move all files and folders from BUILD_DIR to SUB_PATH, excluding SUB_PATH itself
  find "$BUILD_DIR" -mindepth 1 -maxdepth 1 -not -name "$(basename "$SUB_PATH")" -exec mv {} "$BUILD_DIR$SUB_PATH" \;
fi

echo "No subpath, copying files directly..."
rsync -av "$BUILD_DIR$SUB_PATH" "$TARGET_DIR$SUB_PATH"

# Copy index.html to 404.html for GitHub Pages SPA support
if [ -f "$TARGET_DIR${SUB_PATH}__spa-fallback.html" ]; then
  cp "$TARGET_DIR${SUB_PATH}__spa-fallback.html" "$TARGET_DIR${SUB_PATH}404.html"
  
  ### TODO for subpath same main
  # no subpath
  if [ -z "$SUB_PATH" ] || [ "$SUB_PATH" = "/" ]; then
    echo "No subpath, copy index.html to 404.html"
  else
    echo "Subpath, copy 404.html redirect from scripts"
    cp "$ROOT_DIR/scripts/404.html" "$TARGET_DIR/404.html"
  fi

  echo "Created 404.html from index.html"
fi

echo "Build files copied successfully to $TARGET_DIR$SUB_PATH"
echo "----------------------------- DONE -----------------------------"

