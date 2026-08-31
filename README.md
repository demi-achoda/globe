# Globe Portfolio

A dependency-free static portfolio for me, Saviour Achoda (Demi), built with HTML, CSS, JavaScript, and Three.js.

## Local preview

Run a static server from the repository root so root-absolute asset paths resolve correctly:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173/html/index.html`.

## Netlify deployment

Connect the GitHub repository to Netlify with these settings:

- Base directory: leave empty
- Build command: leave empty
- Publish directory: `.`

Do not set the publish directory to `html/`. The HTML pages depend on the sibling `assets/`, `css/`, and `js/` directories. The root-level `netlify.toml` publishes the complete repository and serves `html/index.html` at `/`.

## SEO deployment checklist

After assigning the final Netlify or custom domain:

1. Add absolute canonical and social-preview URLs to each HTML page.
2. Add a root-level `sitemap.xml` containing the canonical homepage and utility URLs.
3. Reference that sitemap from `robots.txt`.
4. Verify the domain in Google Search Console and submit the sitemap.
