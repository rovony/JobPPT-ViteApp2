"""Combine captured slide PNGs into a single landscape PDF.

Each slide becomes one page sized to the source PNG's aspect ratio.
"""
from pathlib import Path
from PIL import Image

SRC_DIR = Path(__file__).parent / "out" / "deck-pdf-1920"
OUT_PDF = Path(__file__).parent / "out" / "qp2-seminar-deck.pdf"

pngs = sorted(SRC_DIR.glob("*.png"))
if not pngs:
    raise SystemExit(f"No PNGs found in {SRC_DIR}")

print(f"Found {len(pngs)} slides in {SRC_DIR}")

pages = []
for p in pngs:
    img = Image.open(p)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")
    pages.append(img)

first, rest = pages[0], pages[1:]
first.save(
    OUT_PDF,
    "PDF",
    resolution=150.0,
    save_all=True,
    append_images=rest,
)

size_mb = OUT_PDF.stat().st_size / (1024 * 1024)
print(f"Wrote {OUT_PDF}  ({len(pages)} pages, {size_mb:.1f} MB)")
