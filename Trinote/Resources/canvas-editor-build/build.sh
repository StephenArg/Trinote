#!/bin/bash
set -e
cd "$(dirname "$0")"
echo "Installing dependencies..."
npm install
echo "Building Excalidraw bundle..."
npm run build
echo "Done! Built assets are in ../canvas-editor-assets/"
