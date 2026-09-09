#!/bin/sh
# Assemble the publishable site into dist/.
# Everything not copied here stays out of the public deploy
# (notably design-source/, which is reference material only).
set -e
mkdir -p dist
# Clear contents rather than the directory itself: on Windows an open
# handle on dist/ makes `rm -rf dist` fail with "Device or resource busy".
find dist -mindepth 1 -delete
cp index.html dist/
cp -r css js img dist/
cp _headers dist/
echo "dist/ built:"
find dist -type f | sort
