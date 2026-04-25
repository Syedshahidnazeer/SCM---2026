# GitHub Pages Deployment

This folder is configured for static export with Next.js.

Local static build:

```bash
npm run build:github
```

The static site is emitted to `out/`.

For GitHub project pages, the included workflow automatically sets `NEXT_PUBLIC_BASE_PATH` to the repository name. For a user or organization site ending in `.github.io`, it leaves the base path empty.
