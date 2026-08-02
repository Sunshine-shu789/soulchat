#!/usr/bin/env python3
"""
Post-process the Next.js static `out/` export so that EVERY route resolves
whether the host prefers directory indexes or flat .html files.

Next.js 16 app-router export emits a mixed layout:
  - leaf routes:  out/<route>.html   (flat) + out/<route>/  (txt metadata only)
  - parent routes: out/<route>.html  (flat) + out/<route>/  (holds child .html + subdirs, NO index.html)

EdgeOne's filesystem handler prefers a real directory when one exists. For
parent routes the directory exists but has no index.html -> 404. /chat worked
only because its directory held no index.html and no subdirs, so the handler
fell back to the flat chat.html.

Fix: for every route .html, also write <dir>/index.html. Now both
`/admin` -> admin/index.html and the flat admin.html coexist safely.
"""
import os
import shutil

OUT = "out"
SKIP_BASES = {"index", "404", "_not-found"}

created = 0
for root, dirs, files in os.walk(OUT):
    if "_next" in root.split(os.sep):
        continue
    for f in files:
        if not f.endswith(".html"):
            continue
        base = f[:-5]
        if base in SKIP_BASES:
            continue
        src = os.path.join(root, f)
        dst_dir = os.path.join(root, base)
        dst = os.path.join(dst_dir, "index.html")
        os.makedirs(dst_dir, exist_ok=True)
        shutil.copy2(src, dst)
        created += 1
        print(f"+ {os.path.relpath(dst, OUT)}")

print(f"\nDone. Created {created} directory-index copies.")
