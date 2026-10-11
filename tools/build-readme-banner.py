#!/usr/bin/env python3
"""Build the animated README banner for this repo.

    python -I tools/build-readme-banner.py

Writes docs/media/banner.svg — self-contained: the fonts are inlined as base64
and the motion is CSS/SMIL only, so GitHub's image proxy renders it with no
network requests. Design tokens match the dipak90000 profile README so the repo
and the profile read as one set.
"""
import base64
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "docs" / "media" / "banner.svg"

# Fonts live with the profile build; fall back to system stacks if absent.
FONT_DIR = pathlib.Path(r"D:/github-profile/assets/fonts")
DISPLAY_FILE = FONT_DIR / "SpaceGrotesk-Bold-latin.woff2"
MONO_FILE = FONT_DIR / "JetBrainsMono-Medium-latin.woff2"

NAVY = "#070b16"
CRIMSON = "#ff354f"
AMBER = "#f0b27a"
TEXT = "#eef2f9"
MUTED = "#8b97ad"

NS = "se"
W, H = 1200, 340

TECH = ["NEXT.JS", "TYPESCRIPT", "TAILWIND", "GSAP", "LENIS"]


def b64(path):
    return base64.b64encode(path.read_bytes()).decode("ascii")


def fonts_css():
    if not (DISPLAY_FILE.exists() and MONO_FILE.exists()):
        print(f"! fonts not found under {FONT_DIR} — falling back to system stacks")
        return ""
    return f"""
  @font-face {{
    font-family: 'Disp{NS}';
    src: url(data:font/woff2;base64,{b64(DISPLAY_FILE)}) format('woff2');
    font-weight: 700;
  }}
  @font-face {{
    font-family: 'Mono{NS}';
    src: url(data:font/woff2;base64,{b64(MONO_FILE)}) format('woff2');
    font-weight: 500;
  }}"""


def chips():
    """Tech labels laid out left to right, each fading up slightly after the last."""
    out, x = [], 64
    for i, label in enumerate(TECH):
        w = 20 + len(label) * 10.5
        out.append(
            f'<g class="chip" style="animation-delay:{1.15 + i * 0.09:.2f}s">'
            f'<rect x="{x}" y="250" width="{w:.0f}" height="30" rx="15" '
            f'fill="#ffffff" fill-opacity="0.05" stroke="#ffffff" stroke-opacity="0.12"/>'
            f'<text x="{x + w / 2:.0f}" y="270" class="chiptext" text-anchor="middle">{label}</text>'
            f"</g>"
        )
        x += w + 12
    return "\n    ".join(out)


SVG = f"""<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img"
     aria-label="Skin Evidance — proof, not promises. Built with Next.js, TypeScript, Tailwind, GSAP and Lenis.">
  <defs>
    <linearGradient id="{NS}-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1020"/>
      <stop offset="60%" stop-color="{NAVY}"/>
      <stop offset="100%" stop-color="#120509"/>
    </linearGradient>
    <radialGradient id="{NS}-glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{CRIMSON}" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="{CRIMSON}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="{NS}-glow2" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{AMBER}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="{AMBER}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="{NS}-sheen" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="50%" stop-color="#ffffff" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <clipPath id="{NS}-clip"><rect width="{W}" height="{H}" rx="18"/></clipPath>
    <mask id="{NS}-titlemask">
      <text x="64" y="150" class="title" fill="#fff">Skin Evidance</text>
    </mask>

    <style>{fonts_css()}
  text {{ font-family: 'Disp{NS}', 'Segoe UI', system-ui, sans-serif; }}
  .title {{ font-size: 76px; letter-spacing: -2px; }}
  .tagline {{ font-size: 30px; fill: {AMBER}; font-style: italic; }}
  .kicker, .chiptext, .meta {{ font-family: 'Mono{NS}', ui-monospace, monospace; }}
  .kicker {{ font-size: 14px; letter-spacing: 4px; fill: {MUTED}; }}
  .chiptext {{ font-size: 12px; letter-spacing: 1.5px; fill: {TEXT}; fill-opacity: 0.72; }}
  .meta {{ font-size: 13px; letter-spacing: 1px; fill: {MUTED}; }}

  .reveal {{ opacity: 0; animation: rise 0.9s cubic-bezier(.22,1,.36,1) forwards; }}
  @keyframes rise {{ from {{ opacity: 0; transform: translateY(16px); }}
                     to   {{ opacity: 1; transform: translateY(0); }} }}

  .chip {{ opacity: 0; animation: rise 0.7s cubic-bezier(.22,1,.36,1) forwards; }}

  /* a slow highlight that sweeps across the wordmark, like light on glass */
  .sheen {{ animation: sweep 4.6s ease-in-out 1.6s infinite; }}
  @keyframes sweep {{ 0% {{ transform: translateX(-420px); }}
                      55%, 100% {{ transform: translateX(760px); }} }}

  .drift1 {{ animation: drift1 13s ease-in-out infinite; }}
  .drift2 {{ animation: drift2 17s ease-in-out infinite; }}
  @keyframes drift1 {{ 0%,100% {{ transform: translate(0,0); }} 50% {{ transform: translate(42px,-22px); }} }}
  @keyframes drift2 {{ 0%,100% {{ transform: translate(0,0); }} 50% {{ transform: translate(-34px,18px); }} }}

  .bead {{ animation: bob 6s ease-in-out infinite; }}
  @keyframes bob {{ 0%,100% {{ transform: translateY(0); }} 50% {{ transform: translateY(-9px); }} }}

  @media (prefers-reduced-motion: reduce) {{
    * {{ animation: none !important; }}
    .reveal, .chip {{ opacity: 1 !important; transform: none !important; }}
    .sheen {{ opacity: 0 !important; }}
  }}
    </style>
  </defs>

  <g clip-path="url(#{NS}-clip)">
    <rect width="{W}" height="{H}" fill="url(#{NS}-bg)"/>
    <ellipse class="drift1" cx="930" cy="110" rx="330" ry="240" fill="url(#{NS}-glow)"/>
    <ellipse class="drift2" cx="1090" cy="300" rx="260" ry="200" fill="url(#{NS}-glow2)"/>

    <!-- serum beads -->
    <circle class="bead" cx="1016" cy="92"  r="7" fill="{AMBER}" fill-opacity="0.5"/>
    <circle class="bead" cx="1092" cy="196" r="4" fill="{TEXT}"  fill-opacity="0.35" style="animation-delay:1.1s"/>
    <circle class="bead" cx="962"  cy="252" r="5" fill="{CRIMSON}" fill-opacity="0.45" style="animation-delay:2.2s"/>

    <text x="64" y="74" class="kicker reveal">EVIDENCE-LED SKINCARE</text>
    <text x="64" y="150" class="title reveal" fill="{TEXT}" style="animation-delay:.12s">Skin Evidance</text>

    <!-- sheen rides over the wordmark only -->
    <g mask="url(#{NS}-titlemask)">
      <rect class="sheen" x="0" y="80" width="190" height="90" fill="url(#{NS}-sheen)"/>
    </g>

    <text x="64" y="198" class="tagline reveal" style="animation-delay:.24s">proof, not promises.</text>
    <text x="64" y="228" class="meta reveal" style="animation-delay:.36s">
      Next.js storefront · scroll-scrubbed hero · 30 static pages
    </text>

    {chips()}

    <rect x="0" y="{H - 3}" width="{W}" height="3" fill="{CRIMSON}" fill-opacity="0.55"/>
  </g>
</svg>
"""


def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(SVG, encoding="utf-8")
    print(f"wrote {OUT}  ({OUT.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
