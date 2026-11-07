# Repository Rules & Architecture Guide: Peakform Fitness Club

> **Audience**: AI Agents (including Antigravity) & Human Developers  
> **Repository Type**: Astro Static Site with React Islands & Tailwind CSS  
> **Primary Reference**: `raw/reference/reference.png`  
> **Deployment Target**: Cloudflare Pages / Static Hosting  
> **Media CDN**: Cloudinary (`me9hwxub` / `peakform/`)

---

## 1. Tech Stack & Architecture Overview

This project is built with:
- **Framework**: [Astro 5](https://astro.build/) (`astro` ^5.18.x)
- **UI Islands**: React 19 (`react`, `react-dom` ^19.3.x)
- **React Astro Integration**: `@astrojs/react` ^4.4.2 (**STRICT CRITICAL RULE: DO NOT UPGRADE TO 7.x**)
- **Styling**: Tailwind CSS 3.4 (`@astrojs/tailwind` ^6.0.2, `tailwindcss` ^3.4.17)
- **Icons**: `lucide-react`
- **Output Mode**: Static (`output: 'static'` in `astro.config.mjs`)
- **Asset Pipeline**: Cloudinary CDN with automatic WebP conversion and MP4 video streaming

---

## 2. Critical Dependency & Build Rules

### ⚠️ `@astrojs/react` Version Lock
- **DO NOT** run `npm i @astrojs/react@latest` or install version 7.x.
- **Why**: `@astrojs/react@7.x` depends on experimental Vite 8 / Rolldown, whereas Astro 5 uses Vite 6. Installing 7.x breaks the Astro dev server with `[ERROR] [vite] Internal server error: Missing field moduleType in builtin:vite-react-refresh-wrapper`.
- **Enforced version**: Keep `@astrojs/react` pinned to `^4.4.2` in `package.json`.

### ⚠️ Zero Local PNG Fallbacks for Content Assets
- All images are hosted on Cloudinary as WebP assets in the `peakform` folder.
- **DO NOT** hardcode local `/assets/*.png` paths for content images.
- Always import and call `getAssetUrl(key)` from `src/utils/cloudinary.ts`.
- All video streaming MUST use `getVideoUrl(key)` from `src/utils/cloudinary.ts` pointing to the Cloudinary video endpoint.

---

## 3. How to Write Astro Code in this Repository

### Frontmatter & Templating
Astro files (`.astro`) combine a frontmatter code fence (`---`) with HTML-like JSX templating:
```astro
---
// Server/build-time JavaScript/TypeScript only.
// NO client-side event handlers or state here!
import { getAssetUrl } from '../utils/cloudinary';
import ReactIsland from './ReactIsland';

const heroUrl = getAssetUrl('hero');
---

<!-- Standard HTML syntax: use 'class', not 'className' in Astro files -->
<section class="relative bg-[#070709]">
  <img src={heroUrl} alt="Hero" class="w-full h-auto" />

  <!-- Client hydration for interactive React islands -->
  <ReactIsland client:visible />
</section>
```

### Event Handling in Astro vs React Islands
- In `.astro` templates, inline browser event listeners use standard lowercase HTML syntax:
  ```html
  <button onclick="window.dispatchEvent(new CustomEvent('open-join-modal', { detail: { plan: 'Premium' } }))">
    Join the Club
  </button>
  ```
- In React components (`.tsx`), use standard React JSX props:
  ```tsx
  <button onClick={() => window.dispatchEvent(new CustomEvent('open-join-modal'))}>
    Get Started
  </button>
  ```

### Cross-Component Event Bus
To allow static Astro sections (Navbar, Hero, Programs, CTA) to open interactive React modals without rendering heavy client bundles upfront, use the standard `window.CustomEvent` pattern:
1. `open-join-modal`: `{ detail: { plan?: string, trainer?: string } }`
2. `open-video-modal`: `{}` (opens Cloudinary gym tour video player)
3. `open-trainer-modal`: `{ detail: { trainer: TrainerData } }`

### Client Hydration Directives
- `client:load`: For critical above-the-fold or global overlays (e.g., `VideoModal`, `JoinModal`, `TrainerModal`, `MobileNav`).
- `client:visible`: For lazy-loaded below-the-fold interactive components (e.g., `PricingSection`, `Testimonials`, `TrainerCard`).
- Never add `client:*` to a component that doesn't need client JavaScript.

---

## 4. Design System & Tokens

Matches `raw/reference/reference.png` precisely:

### Colors
- **Neon Lime Accent**: `#CCFF00` (Hover: `#D4F933`, Border/Glow: `rgba(204, 255, 0, 0.35)`)
- **Dark Canvas**: `#070709` (Primary background)
- **Surface Dark**: `#0E0E14` (Card background)
- **Card Highlight**: `#111118`
- **Text White**: `#FFFFFF` / Text Muted: `#9CA3AF` (`text-gray-400`)

### Typography
- **Headings / Numbers**: `'Barlow Condensed'`, sans-serif. Always styled as:
  `font-display italic font-black uppercase leading-[0.88]`
- **Body / Labels**: `'Plus Jakarta Sans'`, sans-serif. Clean, geometric, legible.

### Visual Effects
- **Neon Glow**: `shadow-[0_0_25px_rgba(204,255,0,0.35)]`
- **Pill Badges**: `rounded-full`, uppercase, tracking-wider
- **Dividers**: `divide-white/[0.08]` or `border-white/10`

---

## 5. Cloudinary Asset Mapping (`src/utils/cloudinary.ts`)

Cloud Name: `me9hwxub`  
Folder: `peakform`  
Format: `f_auto,q_auto`

| Key | Asset Name | Usage |
|---|---|---|
| `logo` | `logo.webp` | Header & Footer Brand Logo |
| `hero` | `hero.webp` | Hero athlete background |
| `programStrength` | `program-strength.webp` | Programs card 1 |
| `programWeightloss` | `program-weightloss.webp` | Programs card 2 |
| `programEndurance` | `program-endurance.webp` | Programs card 3 |
| `programMobility` | `program-mobility.webp` | Programs card 4 |
| `gymInterior` | `gym-interior.webp` | About Us facility photo |
| `trainerRohan` | `trainer-rohan.webp` | Rohan Patil portrait |
| `trainerAarya` | `trainer-aarya.webp` | Aarya Deshmukh portrait |
| `trainerKaran` | `trainer-karan.webp` | Karan Shetty portrait |
| `trainerNikita` | `trainer-nikita.webp` | Nikita More portrait |
| `membershipKettlebell` | `membership-kettlebell.webp` | Pricing kettlebell graphic |
| `memberAditya` | `member-aditya.webp` | Aditya K. avatar / Hero avatar |
| `memberSneha` | `member-sneha.webp` | Sneha M. avatar / Hero avatar |
| `memberRohit` | `member-rohit.webp` | Rohit S. avatar / Hero avatar |
| `ctaAthlete` | `cta-athlete.webp` | CTA Banner athlete cutout |
| `gymTour` (video) | `gym-tour.mp4` | Gym Tour streaming video modal |

---

## 6. Pre-Commit / Build Verification
Always run:
```bash
npm run build
```
Verify exit code is 0 and output directory `dist/` is generated cleanly with no missing modules or JSX errors.
