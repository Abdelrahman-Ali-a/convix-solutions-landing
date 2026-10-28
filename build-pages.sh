#!/bin/sh
# Assemble variants/b-refined/ into pages-dist/ for Cloudflare Pages.
# The variant links to ../../img and ../shared, which a single-folder Pages
# upload cannot reach, so those files are copied in and the links rewritten.
# Working files (DESIGN.md, README, .impeccable/, the image prompt and the
# PNG generation master) stay out of the public deploy.
set -e
SRC=variants/b-refined
OUT=pages-dist
mkdir -p "$OUT"
find "$OUT" -mindepth 1 -delete

cp "$SRC/index.html" "$SRC/style.css" "$SRC/main.js" "$OUT/"
mkdir -p "$OUT/assets/fonts" "$OUT/img" "$OUT/shared/clients"
cp "$SRC/assets/connected-operations.webp" "$OUT/assets/"
cp "$SRC"/assets/fonts/*.ttf "$SRC"/assets/fonts/fonts.css "$SRC"/assets/fonts/*-OFL.txt "$OUT/assets/fonts/"
cp img/logo.png img/icon-32.png img/icon-180.png "$OUT/img/"
cp variants/shared/lang.js "$OUT/shared/"
cp variants/shared/clients/*.png "$OUT/shared/clients/"

sed -i 's#\.\./\.\./img/#img/#g; s#\.\./shared/#shared/#g' "$OUT/index.html"

cat > "$OUT/_headers" <<'EOF'
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
EOF

if grep -q '\.\./' "$OUT/index.html"; then
  echo "error: index.html still links outside pages-dist/" >&2
  exit 1
fi
echo "pages-dist/ built:"
find "$OUT" -type f | sort
