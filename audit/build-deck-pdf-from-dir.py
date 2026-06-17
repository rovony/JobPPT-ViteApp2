"""Combine captured slide PNGs in a directory into one landscape PDF."""
import sys
from pathlib import Path
from PIL import Image

if len(sys.argv) != 3:
    raise SystemExit(f"Usage: {sys.argv[0]} <png-dir> <out.pdf>")

src_dir = Path(sys.argv[1])
out_pdf = Path(sys.argv[2])

pngs = sorted(src_dir.glob("*.png"))
if not pngs:
    raise SystemExit(f"No PNGs found in {src_dir}")

pages = []
for p in pngs:
    img = Image.open(p)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    pages.append(img)

first, rest = pages[0], pages[1:]
first.save(out_pdf, "PDF", resolution=150.0, save_all=True, append_images=rest)
size_mb = out_pdf.stat().st_size / (1024 * 1024)
print(f"Wrote {out_pdf} ({len(pages)} pages, {size_mb:.1f} MB)")
