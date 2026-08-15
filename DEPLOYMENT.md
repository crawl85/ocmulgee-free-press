# Deploy The Ocmulgee Free Press

This project builds to a fully static `out` folder and works on both Cloudflare Pages and Vercel.

## Before the first deployment

1. Create a GitHub repository and upload this project.
2. Open `public/admin/config.yml`.
3. Replace `YOUR_GITHUB_USERNAME/ocmulgee-free-press` with the repository owner and name.
4. For the browser-based Content Studio, deploy the official Sveltia CMS Authenticator and replace `https://YOUR-AUTH-WORKER.workers.dev` with its URL. Register its `/callback` URL in a GitHub OAuth App.

The public site works before CMS authentication is connected. Content can always be edited directly in the four JSON files inside `content/`.

## Cloudflare Pages

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build:static`
- Build output directory: `out`
- Node version: `22`

Connect the GitHub repository in Cloudflare Pages. Every commit—including one made in the Content Studio—will trigger a new deployment.

## Vercel

Import the GitHub repository in Vercel and click **Deploy**. The included `vercel.json` and Next.js configuration require no custom build settings.

## Publishing workflow

- Visit `/admin/` on the deployed site.
- Sign in with the GitHub account that can edit the repository.
- Add or edit stories, upload public records, change resources, or update newsroom settings.
- Click **Publish**. The CMS commits the change and the hosting provider rebuilds the site.

## Local editing

Run `npm install`, then `npm run dev`. The site opens locally. The Content Studio also supports a local proxy workflow documented by Sveltia CMS.

## Important launch edits

- Replace the placeholder newsroom and tips addresses in `content/site.json`.
- Replace sample stories and records with verified reporting and source files.
- Update the fixed edition date in `components/Header.tsx` or connect it to your preferred date workflow.
- Review the corrections policy and confidential-tip language with your newsroom's actual practices.
