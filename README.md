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
├── .github/workflows/
│   └── post-announcements.yml
├── scripts/
│   ├── load-posts.mjs
│   └── send_post_announcements.py
├── newsletter/
│   ├── public-subscribers.json
│   └── announced-posts.json
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

## Scheduled posts

Posts with a future `date` stay hidden from the homepage, archive, and tag previews until that date arrives in the `Australia/Brisbane` timezone.

- Scheduled post pages are also blocked client-side if opened early.
- This is a front-end scheduling layer only. If the repository is public, the raw HTML still exists in git history and the repo contents before the date. For a true embargo, keep unpublished posts off the public branch until release day.

## Automatic email announcements

The repo now includes a GitHub Actions workflow that can email newly published posts automatically.

How it works:

- `.github/workflows/post-announcements.yml` runs on:
  - pushes that change posts or the newsletter scripts
  - manual `workflow_dispatch`
  - an hourly schedule
- `scripts/send_post_announcements.py` reads `posts.js`, checks which posts are published in the `Australia/Brisbane` timezone, and emails only slugs that have not already been announced.
- `newsletter/announced-posts.json` is the send-state file. The workflow commits updates to this file after a successful send so scheduled posts only go out once.
- `newsletter/public-subscribers.json` is a committed list for public inboxes only.

Important:

- The current live archive was bootstrapped into `newsletter/announced-posts.json` on setup. That means the first workflow run will not resend older published posts.
- Future publish dates in `posts.js` are respected. A post is only eligible for email once its publish date has arrived in Brisbane time.

Current public subscriber:

- `index-hearty6c@icloud.com`

### Activate sending with iCloud SMTP

The workflow is already configured around your support inbox:

- SMTP host: `smtp.mail.me.com`
- SMTP port: `587`
- SMTP username: `index-hearty6c@icloud.com`
- From: `Builder Journal <index-hearty6c@icloud.com>`
- Reply-To: `index-hearty6c@icloud.com`

To make sending live, add this repository secret in GitHub:

- `SMTP_PASSWORD`
  - value: an iCloud app-specific password for `index-hearty6c@icloud.com`

Optional secret:

- `EMAIL_SUBSCRIBERS`
  - newline-, comma-, or semicolon-separated private recipients
  - use this for real subscriber addresses you do not want stored in the public repo

### Local commands

Preview the next email without sending:

```bash
python3 scripts/send_post_announcements.py --dry-run
```

Re-bootstrap current published posts as already announced:

```bash
python3 scripts/send_post_announcements.py --bootstrap-published
```

Use `newsletter/private-subscribers.json` for local-only recipients if needed. That file is gitignored.

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

- Main site links: `https://alexzander73.github.io` (nav + footer across pages)
- Social links: `https://github.com/AlexZander73`
- Email link: `mailto:index-hearty6c@icloud.com`
- Site name text (`Builder Journal`) if you want a different brand name

## Notes

- No backend, database, or server-side rendering required.
- GitHub Pages compatible by default.
- Keep edits simple: update post page + one entry in `posts.js`.
