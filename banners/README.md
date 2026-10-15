# banners

Header banners for every gabela-io README, built from the gabela design system
(Archivo + Spline Sans Mono, paper and rojo, "ficha técnica" card).

## Generate

```bash
CHROME=$(nix shell nixpkgs#chromium -c sh -c 'command -v chromium') node render.mjs        # all
CHROME=... node render.mjs llave puntoBOE                                                 # some
```

Each banner is written as `out/<name>-light.png` and `out/<name>-dark.png` (2560×800).
`CHROME` defaults to `chromium` on your `PATH`.

## Add a project

Add an entry to `banners` in `render.mjs`:

| Field | Meaning |
|-------|---------|
| `crumb` | Top-left path, use `crumb('<repo>')` |
| `kicker` | Red mono line above the name |
| `name` | Big title; the red period is added for you |
| `fs` | Optional title size in px (default 112), shrink for long names |
| `head` | One-line pitch; wrap the punchline in `<em>` to make it red |
| `form`, `tag` | Card header and red tag (licence, status…) |
| `rows` | Four `[label, value]` pairs; `<small>` gives a mono aside |

## Use in a README

Copy both PNGs to `.github/assets/` in the project repo, then:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.png">
  <img alt="<name>. — <pitch>" src=".github/assets/banner-light.png" width="100%">
</picture>
```
