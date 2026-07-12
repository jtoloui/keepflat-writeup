# keepflat write-up

Static render of a personal, education-only write-up: rebuilding a Nightscout-compatible CGM
platform with Smithy and Kiro CLI. Markdown source (`article.md`) is rendered to a single static
HTML page with [markdown-it](https://github.com/markdown-it/markdown-it) and deployed to GitHub
Pages via Actions.

> Not a medical device. All values are informational estimates only. Not medical advice.

## Local build

```bash
npm install
npm run build      # writes ./dist (index.html + assets + styles + carousel.js)
open dist/index.html
```

## Structure

```
article.md                   # the article (Markdown source of truth)
assets/                      # screenshots
src/template.html            # HTML shell
src/styles.css               # typography + carousel styles
src/carousel.js              # progressive-enhancement carousel controls
build.mjs                    # markdown-it render -> dist/
.github/workflows/deploy.yml # build + deploy to GitHub Pages
```

## Deploy

Pushing to `main` triggers the workflow, which builds `dist/` and publishes it to GitHub Pages
(source: GitHub Actions). Live URL: https://jtoloui.github.io/keepflat-writeup/
