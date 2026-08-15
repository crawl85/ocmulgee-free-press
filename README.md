# The Ocmulgee Free Press

An independent public-interest news site for Macon-Bibb County, Middle Georgia, and accountability reporting beyond the region.

## Included

- Responsive home page and section pages
- Local reporting and full article pages
- Searchable, filterable Open Records Library with view/download links
- Dedicated FLOCK Watch investigations section
- Citizen Empowerment resource center
- Contact, tips, and corrections information
- Browser-based Content Studio at `/admin/`
- Structured JSON content that is easy to edit and version
- Static deployment configuration for Cloudflare Pages and Vercel

## Quick start

```bash
npm install
npm run dev
```

For deployment and Content Studio setup, read [DEPLOYMENT.md](DEPLOYMENT.md).

## Content files

- `content/articles.json` — stories and article bodies
- `content/records.json` — public-record metadata and file links
- `content/resources.json` — citizen guides and tools
- `content/site.json` — newsroom name, descriptions, and contact addresses

Uploaded public records live in `public/uploads/`. Publish only records you are legally and ethically prepared to make public.
