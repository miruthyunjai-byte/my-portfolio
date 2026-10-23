# S M Miruthyunjai Portfolio

A responsive React + Vite portfolio prepared for GitHub Pages at `https://miruthyunjai-codes.github.io/miruthyunjai-codes/`.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open the local address Vite prints.
4. Run `npm run build` to create the production site in `dist`.

## Add the resume

Place the real resume PDF at `public/resume.pdf`. Both resume buttons already point there. No placeholder resume is included deliberately.

## Contact form

The form opens the visitor’s mail application when no endpoint is configured. To receive submissions through Formspree, create a Formspree form, copy `.env.example` to `.env`, and set `VITE_FORMSPREE_ENDPOINT` to its endpoint. Rebuild after changing it. For GitHub Pages, add this value as a repository Actions secret and update the workflow build command to pass it as `VITE_FORMSPREE_ENDPOINT` if you do not want it embedded in the repository.

## Publish to GitHub Pages

1. Create or use the `miruthyunjai-codes` repository under the `miruthyunjai-codes` GitHub account.
2. Commit and push the project to the `main` branch: `git add .`, `git commit -m "Create portfolio site"`, then `git push -u origin main`.
3. In the GitHub repository, open **Settings → Pages** and set the source to **GitHub Actions**.
4. The included workflow builds and deploys automatically. Once it completes, the expected URL is `https://miruthyunjai-codes.github.io/miruthyunjai-codes/`.

## Update project links

Project cards intentionally have no invented demo or repository links. When real links are available, add them to the project data in `src/main.jsx` and link them in the relevant card.
