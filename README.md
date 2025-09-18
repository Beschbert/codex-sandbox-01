# Packr

Packr is a production-ready Next.js 14 application that guides travellers through building a personalised packing checklist. A wizard collects trip details, generates a smart list from curated presets, and lets users fine-tune items before saving to local storage. The main checklist view supports filtering, editing, printing, and JSON import/export so packing plans stay organised across devices.

## Features

- **Guided wizard** covering trip type, climate, duration, companions, activities, accommodation, and health requirements with contextual validation.
- **Rule-driven checklist generation** that merges presets, scales clothing quantities by trip length, and adapts to luggage or amenity constraints.
- **Interactive review step** with inline item editing, must-bring tagging, smart removal/restoration, and trip notes.
- **Persistent checklists** stored in `localStorage`, including a trips manager for renaming, duplicating, activating, or deleting saved plans.
- **Checklist workspace** featuring category grouping, search, filters for unpacked items, progress and weight stats, plus quick actions like “smart uncheck,” print mode, and JSON import/export.
- **Design system** using Tailwind CSS with light/dark theming, custom UI primitives, keyboard-friendly controls, and toast notifications for key actions.

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/) with TypeScript and React 18
- Tailwind CSS with custom component primitives inspired by shadcn/ui
- Local storage persistence (no backend requirements)
- ESLint, Prettier, and strict TypeScript configuration

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   pnpm dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) to explore the wizard and checklist.

3. **Lint and type-check**
   ```bash
   pnpm lint
   pnpm typecheck
   ```

4. **Create a production build**
   ```bash
   pnpm build
   pnpm start
   ```

## Project Structure

```
app/                 # App Router pages (wizard, checklist, trips, about)
components/          # UI primitives, wizard steps, checklist views, shared helpers
lib/                 # Types, presets, generation logic, storage helpers, utilities
public/              # Static assets
styles/              # Additional styles (if required)
```

Key library modules live in `lib/presets/*` and `lib/generate.ts`, which define the rule engine that powers dynamic list creation. The wizard step components under `components/Wizard/` share a common props contract to keep the flow cohesive and maintainable.

## Environment Variables

No environment variables are required today, but an `.env.example` file is provided for future use.

## Deployment

The project is ready for Vercel deployment:

1. Push the repository to GitHub or GitLab.
2. In Vercel, create a new project from the repository and keep the default build command (`pnpm build`) and output (`.next`).
3. Set the install command to `pnpm install` (Vercel detects `pnpm-lock.yaml` automatically once generated locally).
4. Deploy—no additional configuration is required.

## Contributing

- Follow the established TypeScript, ESLint, and Prettier rules (`pnpm lint` / `pnpm typecheck`).
- Keep components focused and typed; complex logic should be documented with inline comments.
- Run `pnpm build` before submitting to ensure the production bundle succeeds.

Enjoy planning smarter trips with Packr!
