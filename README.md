# Builder Journal (GitHub Pages Starter)

Static, polished blog foundation for documenting projects, experiments, launches, and builder progress over time.

## File structure

```text
.
├── index.html
├── archive.html
├── about.html
├── styles.css
├── script.js
├── posts.js
├── assets/
│   ├── favicon.svg
│   └── og-image.svg
└── posts/
    ├── post-template.html
    ├── quiet-launch-builder-journal.html
    ├── ai-copilot-loop-notes.html
    ├── tiny-game-loop-48-hours.html
    ├── shipping-utility-app-sprints.html
    ├── weekly-builder-operating-system-v1.html
    └── micro-product-launch-checklist.html
```

## How metadata works

All post cards, archive entries, homepage "Latest Post", and homepage "Recent Posts" are powered by `posts.js`.

Each post object has:

- `slug`
- `title`
- `date` (YYYY-MM-DD)
- `excerpt`
- `tags` (array)
- `readingTime`
- `path` (example: `posts/my-post.html`)
- optional `isFeatured` (set `true` to pin one post as homepage latest)

## How to add a new blog post

1. Copy `posts/post-template.html` to a new file, for example: `posts/my-new-post.html`.
2. Update the new page:
   - `<title>`
   - meta description + OG tags
   - post headline, lead, body, date, reading time, tags
3. Add a new object to `posts.js` with matching `path`.
4. Commit and push.

## How to change the homepage "Latest Post"

Two options:

1. Recommended: set `isFeatured: true` on the post you want featured, and remove `isFeatured` from other posts.
2. If no post is featured, the newest `date` is used automatically.

## Archive behavior

`archive.html` is rendered by `script.js` using `posts.js` data:

- Search by title/excerpt/tag
- Tag filters
- Sort (`Newest first`, `Oldest first`, `Title A-Z`)
- Newest first is the default

## Local preview

You can open `index.html` directly, or run a simple static server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository.
2. In GitHub, open `Settings` → `Pages`.
3. Under `Build and deployment`, choose:
   - `Source`: `Deploy from a branch`
   - Branch: `main` (or your default branch), folder `/ (root)`
4. Save and wait for deploy.
5. Your site URL will be shown in Pages settings.
   - For this repo, that URL is `https://alexzander73.github.io/blog/`.

Because links are relative, this setup works on standard GitHub Pages project URLs.

## URLs and branding text to customize

Update these placeholders before going live:

- Main site links: `https://your-main-site.example.com` (nav + footer across pages)
- Social links: `https://github.com/AlexZander73`
- Email link: `mailto:you@example.com`
- Site name text (`Builder Journal`) if you want a different brand name

## Notes

- No backend, database, or server-side rendering required.
- GitHub Pages compatible by default.
- Keep edits simple: update post page + one entry in `posts.js`.
