# alexcrooks.me

Personal site. Plain HTML, CSS and JS with no build step, served on Cloudflare Workers.

```
public/
  index.html                page content
  styles.css                all styles
  main.js                   clock, dot field, contribution grid, GitHub repos
  assets/repos.json         fallback when the GitHub API is rate limited
  assets/contributions.json fallback when /api/contributions is unavailable
  _headers                  security and cache headers
src/
  worker.js                 /api/contributions: parses the public GitHub
                            contribution calendar, cached for 6 hours
```

Everything outside `/api/*` is served straight from `public/`.

## Develop

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```
