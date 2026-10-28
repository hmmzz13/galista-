"""Régénère public/photos/manifest.json : la liste des photos officielles
des plats déposées dans public/photos/ (ex : menemen.jpg -> id « menemen »).

Usage : python3 scripts/gen_photo_manifest.py
À relancer après avoir ajouté ou retiré une photo officielle de plat.
"""
import json
import os

PHOTOS_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "photos")
IGNORE_PREFIXES = ("galerie-", "logo", "hero", "cafe-", "og-")

files = sorted(
    f[:-4]
    for f in os.listdir(PHOTOS_DIR)
    if f.endswith(".jpg") and not f.startswith(IGNORE_PREFIXES)
)

manifest = {"items": files}
out = os.path.join(PHOTOS_DIR, "manifest.json")
with open(out, "w", encoding="utf-8") as fh:
    json.dump(manifest, fh, ensure_ascii=False, indent=1)
print(f"manifest.json : {len(files)} photo(s) officielle(s) -> {out}")
