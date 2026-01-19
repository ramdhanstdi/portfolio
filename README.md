# Portfolio Site (Vite + React)

## Requirements

- Node.js 18+ recommended

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Editing content (data-only)

All site content is driven by JSON files:

- `src/data/site.json`
- `src/data/portfolio.json`

### Add a new portfolio item

Open `src/data/portfolio.json` and add an object like:

- `id`: unique string
- `title`: project title
- `description`: short description
- `tags`: array of strings
- `image`: path under `public/` (example: `/images/project-4.svg`)
- `liveUrl` (optional)
- `repoUrl` (optional)

In development, changes to the JSON should show up immediately (a reload may occur).

## Images

Example images live in `public/images/`. You can replace them with your own images and update the JSON paths.
