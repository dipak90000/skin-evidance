# Reference Site Analysis — medicube.us
_Captured 2026-10-04 for the Skin Evidance build._

## 1. Tech stack (confirmed by live inspection)

| Layer | What they actually run |
|---|---|
| Platform | **Shopify** (store `medicube-us.myshopify.com`, shop_id 15639052336) |
| Theme | **Dawn 12.0.0**, heavily customized. Internal theme name `운영테마_260623` (Korean — built by their KR team), theme id 142564196400, assets served from `/cdn/shop/t/297/` |
| Templating | Liquid + Shopify Sections/Blocks (`shopify-section-*` wrappers, section schema JSON) |
| JS architecture | **Vanilla JS Web Components** (the Dawn pattern) — no React/Vue/Next. Custom elements observed: `sticky-header`, `header-menu`, `menu-drawer`, `details-modal`, `predictive-search`, `cart-drawer`, `cart-drawer-items`, `product-form`, `product-info`, `media-gallery`, `slider-component`, `modal-opener`, `product-modal`, `variant-radios`, `pickup-availability`, `product-recommendations`, `facet-filters-form`, `facet-remove`, `price-range`, `localization-form` |
| Extra libs | **Swiper 11** (jsDelivr) for every carousel, **jQuery 3.4.1 + 3.7.1** (two copies — legacy cruft), `lazysizes` for lazy images, `sweetalert` 1.1.3 for alerts |
| CSS | Plain CSS split into `component-*.css` files + CSS custom properties on `:root`. **No Tailwind, no SCSS build step.** `--page-width: 120rem` (1200px). Font `Inter` for body and headings; Google Fonts also loads `Open Sans`, `EB Garamond`, `Nunito` |
| Checkout | Shopify Checkout + Shop Pay / accelerated wallets (`shop-cart-sync`, portable-wallets) |

### Third-party apps / scripts layered on top
- **GA4** (`G-PZ4BJ9LLR2`) + **GTM** (`GTM-5C2S54Q`) + Shopify Trekkie/WPM analytics + Shopify perf-kit
- **Zendesk** chat widget (`static.zdassets.com`)
- **Stamped.io** — product reviews & ratings (`cdn1.stamped.io/files/widget.min.js`)
- **Smile.io** — loyalty / rewards (membership page)
- **Recharge** — subscriptions ("Subscribe & Save", `recharge_custom.css`)
- **OrderLogic** — order quantity / purchase constraints (`orderlogicapp.com`)
- **BOGOS / freegifts** — free-gift-with-purchase engine (`cdn.bogos.io`)
- **UpCart** — slide-out cart upgrade
- **Globo Color Swatch** — variant swatches
- **RevenueHunt Quiz** — powers the "Find your routine" recommendation quiz
- **Content Translation / advanced switcher** — multi-currency + locale switcher
- **accessiBe** (`acsbapp.com`) + custom `accessibility-remediation.js` — a11y overlay
- Announcement-bar slider app (`ws-announcement`)

## 2. Site architecture (URL map)

```
/                           home
/collections/all            shop all
/collections/best-sellers
/collections/trending-on-social
/collections/medicube-sets
/collections/subscribe-save
by product type   /collections/{toner,moisturizer,treatment,cleanser,exfoliator,
                                bath-body,mask,tool,eyecream,sunscreen,soyxidil-line}
by product line   /collections/{pink-pdrn-line,zero-line,glass-glow-line,deep-line,
                                red-line,kojic-acid-line,txa-line,super-cica-line,special-care}
devices           /collections/beauty-tech, /collections/age-r
                  /products/{booster-pro-x2, mini-booster-pro-plus, age-r-ultra-tune-40-68}
content pages     /pages/{brandstory, ager_guide, devices_spec, skincare_guide, device-intro,
                          medicube-ambassadors, stamped-reviews, counterfeit-products,
                          booster-pro, shop-our-instagram, guide, shipping-policy,
                          membership-rewards, cookie-policy}
```

## 3. Page-by-page structure

### Global chrome
1. **Announcement bar** — auto-rotating slider, 4 messages:
   "Experience Pro-Level Treatment Results with AGE-R" / "YOU'RE SHOPPING THE OFFICIAL MEDICUBE STORE" / "Free US Shipping on Orders Over $80" / "Share Your Valuable Review and Enjoy $4 Off"
2. **Sticky header** (`sticky-header` element — hides on scroll down, reveals on scroll up)
   - Left: hamburger → full **sidebar mega-drawer**; country-flag currency selector
   - Center: logo (`medicube` + `K-BEAUTY TECH` lockup)
   - Right: search (modal with **predictive search**), cart icon with count bubble → **cart drawer**, account icon
   - Desktop second row: `shop all` · `best sellers` · `AGE-R` · `AMBASSADOR` · `Find your routine` · `about us` · `contact us`
3. **Mega menu** under "shop all" — 5 columns: *skincare* (All Products, Best Sellers, Trending on Social, Save with Sets, Subscribe & Save + "how to use" links) · *by Product type* · *by collection* (the lines) · *by skin concern* · *devices* (image cards: device name + tagline)
4. **Sidebar drawer** (mobile + hamburger on desktop) — whole menu tree, each line shown with its concern label underneath (e.g. "Zero Line / Pores")
5. **Footer** — email capture ("10% OFF SITEWIDE COUPON FOR EMAIL SUBSCRIBERS"), socials (YouTube, Instagram, Facebook, TikTok), three link columns (SHOP / INFORMATION / HELP), contact + address, legal row, payment icons
6. **Overlays**: cookie consent banner (Accept All / Decline / Manage preferences), 10% OFF email popup modal, Zendesk chat bubble, accessiBe button, Smile rewards launcher, geo "change location" popup

### Homepage sections (in render order)
1. `slide_video` — full-bleed hero carousel, video/image slides, prev/next arrows, headline + sub + SHOP NOW
2. `slide_icon` — horizontally scrolling icon/text nav strip: SHOP ALL, STORE GUIDE, SUBSCRIBE, BEST, SET, HOW TO USE, APP, DEVICE, ZERO LINE, GLOW LINE, DEEP LINE, KOJIC ACID LINE, PDRN LINE, TXA LINE, CLEAR LINE
3. `main_device` — "Now Trending: Korean Skincare *Devices*" + VIEW ALL, Swiper carousel of device cards (tagline / name / SHOP NOW)
4. custom-liquid promo banner
5. `main_skincare` — "All Our Skincare Is 100% Dermatologist Tested." + VIEW ALL, carousel of line cards keyed to a concern (Pores & Blackheads → Zero Line, Dark Spots & Dullness → Deep Line, …)
6. `youtube` — "RECOMMENDED BY BEAUTY EXPERTS": influencer video carousel (Tati, Michelle Phan, Laura Lee, Shea Whitney, Beauty Within, …) with creator name, video title, blurb; click opens modal player
7. `categorize` — bottom tab strip: DEVICES / SKIN-CARE / BEST SELLERS / SUBSCRIBE & SAVE

### Collection page (`/collections/best-sellers`)
Sections: `header → sidebar_menu → custom banner → banner → product-grid → footer`
- Filter/sort bar via `facet-filters-form` (Availability, Price via `price-range`), removable `facet-remove` chips
- Grid of `card-wrapper` cards: badge (NEW/SALE), image with hover-swap second image, title, **Stamped review count**, sale price + struck regular price, **color swatch row** (Pink / White)
- 50 products rendered; no classic pagination on this collection

### PDP (`/products/booster-pro-x2`)
Sections: `header → sidebar_menu → main → custom banner → custom_liquid → related-products → footer`
- `media-gallery` with ~30 media items, thumbnail rail, `modal-opener`/`product-modal` lightbox, sticky `product__info-wrapper` info column
- Title → review count (Stamped, anchors to reviews) → short benefit line → `variant-radios` swatches showing per-variant price → quantity stepper with "(0 in cart)" → **Add To Cart** → Shopify dynamic checkout button → `shopify-payment-terms` (Shop Pay installments)
- Meta rows: Skin Type, Skin Concerns
- Long-form custom-liquid content below the fold (ingredients, how-to-use, clinical results, comparison tables)
- `product-recommendations` + `product-recommendations-related` carousels

## 4. Interactivity inventory (what a clone must reproduce)
- Sticky / auto-hide scroll-aware header
- Mega menu on hover (desktop), accordion drawer (mobile), `<details>`-driven
- Hero slider + multiple Swiper carousels (devices, lines, influencer videos, related products)
- Predictive search modal with live results
- Cart drawer: qty update, free-gift progress bar, upsells
- Variant swatch selection updating price / image / URL without reload (Section Rendering API)
- Collection filtering + sorting without reload (facets re-render the grid section)
- Video modal player for the influencer section
- Email-capture popup, cookie consent, geo + currency switcher
- Reviews widget: photos, star distribution, write-a-review
- Subscription toggle (one-time vs Subscribe & Save) on PDP
- Multi-step quiz flow ("Find your routine")

## 5. Design language
- Palette: near-white page, black text, **magenta / hot-pink accent** for CTAs and sale prices; product photography (lilac/blue gradients) carries the color
- Type: `Inter` throughout; uppercase with tight letterspacing for labels and buttons; occasional italic-serif emphasis word inside section headings ("Korean Skincare *Devices*")
- Sharp corners (`--*-corner-radius: 0`), no shadows (`--*-shadow-opacity: 0`), no card borders — flat, editorial, image-led
- Max content width 1200px; hero and banners break out full-bleed
- Pill shapes used only for badges (`--badge-corner-radius: 4rem`)
