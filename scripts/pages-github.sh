#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Get the root directory of the project
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/build/client"
TARGET_DIR="${ROOT_DIR}/pages-github"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Error: Build directory does not exist at $BUILD_DIR"
  exit 1
fi

# Create target directory if it doesn't exist
mkdir -p "$TARGET_DIR"

# Remove all files and subdirectories in the target directory except excluded ones
echo "Cleaning target directory (excluding .git and scripts)..."
find "$TARGET_DIR" -mindepth 1 -not \( -path "$TARGET_DIR/.git" -o -path "$TARGET_DIR/scripts" \) -delete


# Copy all files from build to pages-github
echo "Copying files from build to pages-github..."
rsync -av "$BUILD_DIR/" "$TARGET_DIR/"

echo "Build files copied successfully to $TARGET_DIR"
