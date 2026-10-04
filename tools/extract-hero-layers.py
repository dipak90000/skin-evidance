"""Split a frame of the brand animation into independently floatable layers.

  bg        smooth warm gradient, no product
  bottleL   serum bottle (+ anything touching it)
  bottleR   body-wash bottle
  drops     every detached droplet, one PNG each, so they float separately
"""
import json
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

SRC, OUTDIR = sys.argv[1], sys.argv[2]
SPLIT_X = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5

im = Image.open(SRC).convert("RGB")
W, H = im.size
a = np.asarray(im).astype(np.float32)

# ---------------------------------------------------------------- background
yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
xn = (xx / W) * 2 - 1
yn = (yy / H) * 2 - 1
terms = [
    (xn**i) * (yn**j) for i in range(5) for j in range(5) if i + j <= 4
]
A = np.stack([t.ravel() for t in terms], axis=1)

inliers = np.ones(H * W, dtype=bool)
fit = np.zeros_like(a)
for _ in range(6):
    for c in range(3):
        coef, *_ = np.linalg.lstsq(A[inliers], a[:, :, c].ravel()[inliers], rcond=None)
        fit[:, :, c] = (A @ coef).reshape(H, W)
    resid = np.abs(a - fit).max(axis=2).ravel()
    inliers = resid < max(np.percentile(resid, 62), 6.0)

bg = np.clip(fit, 0, 255).astype(np.uint8)
Image.fromarray(bg).resize((480, 270), Image.LANCZOS).save(
    f"{OUTDIR}/layer_bg.jpg", quality=90
)

resid = np.abs(a - fit).max(axis=2)

# ---------------------------------------------------------------- foreground
fg = resid > 26
m = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5))
fg = np.asarray(m) > 127
fg = ndimage.binary_closing(fg, np.ones((9, 9)))
fg = ndimage.binary_fill_holes(fg)
fg = ndimage.binary_opening(fg, np.ones((5, 5)))

lab, n = ndimage.label(fg)
sizes = ndimage.sum(fg, lab, range(1, n + 1))
order = np.argsort(-sizes)
print(f"components: {n}; largest: {[int(sizes[i]) for i in order[:8]]}")

main_id = int(order[0]) + 1
main = lab == main_id
ys, xs = np.where(main)
print(f"main blob bbox x[{xs.min()},{xs.max()}] y[{ys.min()},{ys.max()}]")


def soft(mask, feather=2.0):
    return Image.fromarray((mask * 255).astype(np.uint8)).filter(
        ImageFilter.GaussianBlur(feather)
    )


def export(mask, name, feather=2.0):
    ys, xs = np.where(mask)
    if len(xs) == 0:
        return None
    pad = 14
    x0, x1 = max(0, xs.min() - pad), min(W, xs.max() + pad + 1)
    y0, y1 = max(0, ys.min() - pad), min(H, ys.max() + pad + 1)
    rgba = im.crop((x0, y0, x1, y1)).convert("RGBA")
    rgba.putalpha(soft(mask, feather).crop((x0, y0, x1, y1)))
    rgba.save(f"{OUTDIR}/{name}.png")
    return {
        "name": name,
        "x": x0 / W,
        "y": y0 / H,
        "w": (x1 - x0) / W,
        "h": (y1 - y0) / H,
        "area": int(mask.sum()),
    }


# Split the product cluster into left and right bottle at the narrowest waist.
cut = int(W * SPLIT_X)
left = main.copy()
left[:, cut:] = False
right = main.copy()
right[:, :cut] = False

meta = {"frame": [W, H], "splitX": SPLIT_X, "layers": []}
for mask, name in ((left, "layer_bottle_l"), (right, "layer_bottle_r")):
    info = export(mask, name, 1.6)
    if info:
        meta["layers"].append(info)

# Detached droplets, each its own layer so each floats on its own path.
drops = []
for idx in order[1:]:
    if sizes[idx] < 350:
        continue
    drops.append(idx)
print(f"droplet components kept: {len(drops)}")

for k, idx in enumerate(drops[:26]):
    info = export(lab == int(idx) + 1, f"layer_drop_{k:02d}", 1.2)
    if info:
        info["kind"] = "drop"
        meta["layers"].append(info)

json.dump(meta, open(f"{OUTDIR}/layers.json", "w"), indent=1)

# visual check: colour the split
vis = np.asarray(im).copy()
vis[left] = (vis[left] * 0.4 + np.array([255, 60, 60]) * 0.6).astype(np.uint8)
vis[right] = (vis[right] * 0.4 + np.array([60, 140, 255]) * 0.6).astype(np.uint8)
for idx in drops:
    sel = lab == int(idx) + 1
    vis[sel] = (vis[sel] * 0.3 + np.array([80, 255, 120]) * 0.7).astype(np.uint8)
Image.fromarray(vis).resize((760, 428)).save(f"{OUTDIR}/split_vis.png")
print("done")
