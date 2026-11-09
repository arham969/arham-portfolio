# Arham Jawed — Creative Developer Portfolio

A responsive, editorial-style React portfolio with a character-by-character code intro, animated terminal and build progress, scroll-led motion, interactive project previews, and a validated email-form flow.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

Run the project linter with `npm run lint`.

## Personalize before publishing

Update the centralized content in [`src/data.ts`](./src/data.ts):

- Set your email address and GitHub, LinkedIn, and Instagram profile URLs.
- Replace project concept copy, imagery, and technology tags with your own work.
- Update the skill levels and learning timeline to match your experience.

The project cards are intentionally described as **creative studies**, not client work or deployed products. Their preview opens an in-site presentation of the concept. Replace the sample portrait and project images in `src/App.tsx` and `src/data.ts` with optimized images you have permission to publish.

The contact form validates the visitor's name, email, and message, then opens their configured email application with a prefilled `mailto:` message. It does not send or store submissions on a server.

## Motion and accessibility

- A real React code editor types source, reveals terminal output, and animates compilation progress. **Skip intro** is available; completion is remembered for the current browser tab.
- Framer Motion drives interface and scroll reveals. GSAP powers the desktop cursor and subtle pointer attraction.
- The intro is skipped when reduced motion is requested. Navigation and project previews are keyboard accessible; navigation adapts to mobile.
- Technology marks use Simple Icons. Project and portrait images load remotely; project images are lazy loaded.

## Deployment

The project builds as a static Vite site and can be deployed to Vercel, Netlify, or another static host. No API server is required for the email-app contact flow.
