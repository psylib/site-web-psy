# Refonte Site Web Psy — Spec de Design

## Contexte

Site vitrine statique pour Claire Clavel, psychologue clinicienne a Seichamps (54280). Le site actuel est en HTML/CSS/JS pur. La refonte vise un design plus premium, organique et une meilleure UX, avec migration vers Astro.

## Decisions de design validees

| Aspect | Choix |
|--------|-------|
| Stack | Astro 5 (SSG, deploy Vercel) |
| Palette | Foret & Miel — vert profond + dore miel + lin |
| Typographie | Fraunces (display) + Work Sans (body) |
| Hero | Immersif plein ecran — photo cabinet en fond, texte centre |
| Sections contenu | Liste organique — pilules arrondies, mobile-first, liens vers articles |
| Approche | Refonte complete one-shot (pas de migration progressive) |

## Evolution de la palette (justification)

La palette evolue par rapport a l'actuel (#4a7c6f vert + #c9a96e or) vers un vert plus profond/foret et un dore plus chaud/miel. Decisions validees par le client lors du brainstorming (session du 2026-04-20). L'objectif : conserver l'identite verte du cabinet tout en rendant l'ensemble plus organique, chaleureux et raffine. Le changement reste une evolution, pas une rupture.

Note : `--clr-primary-light` (#8fae9b) est un vert sauge mid-tone utilise pour accents decoratifs. Pour les fonds legers, utiliser `--clr-bg` ou `--clr-bg-alt`.

## Architecture

```
site-web-psy/
├── astro.config.mjs
├── package.json
├── src/
│   ├── content.config.ts       (Astro 5 Content Layer API)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── ServicePill.astro
│   │   ├── ServiceList.astro
│   │   ├── Testimonial.astro
│   │   ├── TestimonialCarousel.astro
│   │   ├── FAQ.astro
│   │   ├── ContactForm.astro
│   │   ├── BlogCard.astro
│   │   ├── Citation.astro
│   │   ├── Breadcrumb.astro
│   │   └── OrganicShape.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── a-propos.astro
│   │   ├── mentions-legales.astro
│   │   ├── confidentialite.astro
│   │   ├── merci.astro
│   │   ├── 404.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── content/
│   │   └── blog/
│   │       ├── psychologue-nancy.md
│   │       ├── psychologue-anxiete-nancy.md
│   │       ├── psychologue-burnout-nancy.md
│   │       ├── psychologue-depression-nancy.md
│   │       ├── psychologue-tcc-nancy.md
│   │       ├── psychologue-hypnose-nancy.md
│   │       ├── psychologue-seichamps.md
│   │       └── maison-sante-seichamps.md
│   └── styles/
│       └── global.css
├── public/
│   ├── fonts/              (Fraunces + Work Sans woff2, self-hosted RGPD)
│   ├── images/             (existant: cabinet-bureau.webp, etc.)
│   │   └── favicon.svg     (meme path que l'actuel)
│   ├── robots.txt
│   └── llms.txt
└── vercel.json
```

### astro.config.mjs

```js
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.claire-clavel-psychologue.fr',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
});
```

Note : le domaine `claire-clavel.fr` redirige vers `claire-clavel-psychologue.fr` (redirect Vercel). Le canonical reste sur le domaine long.

### src/content.config.ts (Astro 5 Content Layer API)

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    dateModified: z.coerce.date().optional(),
    author: z.string().default('Claire Clavel'),
    tags: z.array(z.string()),
    image: z.string().optional(),
    noindex: z.boolean().default(false),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    related: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

## Design Tokens

```css
:root {
  /* Palette Foret & Miel */
  --clr-primary: #4a6b5c;
  --clr-primary-dark: #2c3e35;
  --clr-primary-light: #8fae9b;
  --clr-accent: #d4a84b;
  --clr-bg: #f7f5f0;
  --clr-bg-alt: #eae5dc;
  --clr-text: #2c3e35;
  --clr-text-muted: #5a6b62;
  --clr-white: #ffffff;
  --clr-border: #dde3d8;

  /* Typographie */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Work Sans', system-ui, sans-serif;

  /* Echelle typo fluid */
  --text-sm: clamp(0.875rem, 0.8rem + 0.2vw, 0.9375rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1vw, 1.75rem);
  --text-2xl: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
  --text-3xl: clamp(2.25rem, 1.8rem + 2vw, 3.25rem);

  /* Espacement */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;

  /* Formes */
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-pill: 9999px;

  /* Ombres */
  --shadow-soft: 0 2px 16px rgba(44, 62, 53, 0.06);
  --shadow-medium: 0 4px 24px rgba(44, 62, 53, 0.1);

  /* Transitions */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration: 300ms;
}
```

## Pages

### index.astro — Page d'accueil

Flow vertical :

1. **Hero immersif** — 100vh, photo cabinet-bureau.webp en fond (object-fit cover, filter brightness 0.4), texte centre (Fraunces 3xl), sous-titre Work Sans, 2 CTAs (bouton primary Doctolib + bouton ghost Decouvrir), badge ADELI discret
2. **Barre de confiance** — fond blanc, flex row, items : note Google 4.5/5 | 65€/seance | MonPsy | MSP Seichamps
3. **Services (liste organique)** — titre section "Comment je peux vous aider", liste de ServicePill color-codees (anxiete → vert, burnout → dore, depression → vert clair, sommeil → vert, TCC → dore, hypnose → vert clair). Chaque pilule lien vers /blog/[article]
4. **Approche therapeutique** — fond clr-bg-alt, 3 cards horizontales (icone SVG + titre + description courte) pour TCC, Hypnose, Sur-mesure
5. **Temoignages** — scroll horizontal (CSS scroll-snap), cartes blanches avec etoiles dorees, texte avis, nom/date
6. **A propos (teaser)** — section avec texte court sur Claire + CTA vers /a-propos
7. **FAQ** — accordion details/summary, 6-8 questions, titre Fraunces
8. **Contact** — fond clr-primary-dark (vert profond), texte clair. Grid 2 cols : formulaire (nom, email, tel, message, submit) | infos (adresse, horaires, tel, email, lien Maps)

### a-propos.astro

- Hero bandeau (pas plein ecran, hauteur ~30vh, fond clr-bg-alt, titre centre)
- Sections : parcours, formation/diplomes, valeurs/philosophie
- JSON-LD : ProfilePage/Person + BreadcrumbList (dans un @graph)

### blog/index.astro

- Hero bandeau titre "Blog & Ressources"
- Grille BlogCards (2 cols desktop, 1 mobile)
- Chaque card : tag couleur, titre, extrait, date, lien
- JSON-LD : @type Blog (preserve l'existant)

### blog/[...slug].astro

- Breadcrumb
- Article header : titre Fraunces 2xl, meta (auteur, date, badge specialite)
- Corps Markdown rendu avec styles article (prose)
- Composant Citation pour refs scientifiques (HAS, INSERM)
- FAQ section (si present dans frontmatter)
- Articles connexes (pilules organiques)
- JSON-LD genere : Article + FAQPage + BreadcrumbList

### Autres pages

- mentions-legales.astro, confidentialite.astro : contenu texte simple, layout commun, **noindex, follow**
- merci.astro : message de confirmation post-formulaire, **noindex, follow**
- 404.astro : page erreur stylee, **noindex, follow**

Le composant BaseLayout accepte une prop `noindex?: boolean` qui ajoute `<meta name="robots" content="noindex, follow">` quand true.

## Composants

### Header.astro
- Position sticky, top 0, z-index 100
- Backdrop-filter blur(12px) + bg rgba(clr-bg, 0.9)
- Logo (texte "Claire Clavel" en Fraunces) + nav links
- Mobile : hamburger → menu fullscreen overlay
- Se compacte au scroll (padding reduit)

### Hero.astro
- Props : title, subtitle, ctas[], backgroundImage
- 100vh, position relative, image en bg cover
- Overlay gradient (clr-primary-dark 60% → transparent)
- Texte centre vertical + horizontal
- Scroll indicator anime en bas

### ServicePill.astro
- Props : label, href, color (primary | accent | primary-light)
- Border-radius pill, border-left 3px couleur, fond blanc
- Hover : translateY(-2px) + shadow-soft, fleche anime

### Testimonial.astro
- Props : text, author, date, rating
- Carte blanche, border-radius-lg, padding genereux
- Etoiles SVG dorees, texte italique, attribution en bas

### FAQ.astro
- Props : items[{question, answer}]
- details/summary natif, un seul ouvert a la fois (JS minimal)
- Question en Fraunces text-lg, reponse Work Sans text-base
- Chevron anime rotation 180deg

### ContactForm.astro
- Action Formspree (POST https://formspree.io/f/xreaooqy)
- Champs : nom, email, telephone, message
- Validation HTML5 + message erreur inline
- Submit → loading state → success message (remplace le form)
- Style inputs : border-radius-md, border clr-border, focus ring clr-primary

### BlogCard.astro
- Props : title, slug, excerpt, date, tag, image?
- Carte avec hover lift, tag colore en haut, titre Fraunces, extrait tronque

### OrganicShape.astro
- Props : variant (1-4 shapes differentes), color, opacity, position
- SVG blob en position absolute, z-index -1
- Utilise pour decorer les sections (arriere-plan subtil)

### Citation.astro
- Props : source, year, text
- Encadre avec border-left accent, fond clr-bg-alt, texte italique
- Utilise dans les articles blog pour refs HAS/INSERM

## Interactions & Animations

- **Scroll reveal** : IntersectionObserver, elements translateY(20px) → 0 + opacity 0 → 1, stagger 100ms entre elements
- **Pilules hover** : translateY(-2px), box-shadow grow, fleche translateX(4px)
- **Hero parallax** : transform-based parallax (JS IntersectionObserver), scope a `@media (hover: hover)` uniquement — `background-attachment: fixed` est casse sur iOS Safari
- **Header compact** : classe ajoutee au scroll > 50px, padding reduit, logo scale(0.9)
- **Testimonials** : scroll-snap-type: x mandatory, scroll-snap-align: start
- **FAQ** : max-height transition + opacity, chevron rotation
- **prefers-reduced-motion** : tout desactive (transitions → 0ms, transforms → none)

## SEO — Zero regression

| Element | Implementation |
|---------|---------------|
| URLs | Identiques a l'actuel, vercel.json cleanUrls: true |
| Canonical | site: 'https://www.claire-clavel-psychologue.fr' dans astro.config.mjs |
| JSON-LD MedicalBusiness | Genere dans index.astro |
| JSON-LD WebSite | Genere dans BaseLayout (avec potentialAction SearchAction) |
| JSON-LD Blog | Genere dans blog/index.astro |
| JSON-LD Article | Genere dans [...slug].astro depuis frontmatter |
| JSON-LD FAQPage | Genere si FAQ present dans frontmatter |
| JSON-LD BreadcrumbList | Genere dans [...slug].astro et a-propos.astro |
| JSON-LD ProfilePage/Person | Genere dans a-propos.astro |
| Meta OG + Twitter | Props dans BaseLayout, valeurs depuis chaque page |
| noindex | Prop BaseLayout, active sur mentions-legales, confidentialite, merci, 404 |
| Sitemap | @astrojs/sitemap (auto, supprime l'ancien sitemap.xml manuel) |
| robots.txt | Fichier statique dans public/ (identique actuel) |
| llms.txt | Fichier statique dans public/ (identique actuel) |
| Vercel Analytics | @vercel/analytics injecte dans BaseLayout |
| Performance | Lighthouse 100 — zero JS client par defaut (Astro) |
| Fonts | Self-hosted dans public/fonts/ (RGPD, pas de CDN) |

## Migration du contenu blog

Chaque article HTML actuel → fichier Markdown avec frontmatter :

```yaml
---
title: "Psychologue a Nancy : consultation et accompagnement"
description: "Meta description SEO..."
date: 2026-03-23
dateModified: 2026-04-15
author: "Claire Clavel"
tags: ["nancy", "psychologue", "consultation"]
image: "/images/cabinet-bureau.webp"
faq:
  - question: "Combien coute une consultation ?"
    answer: "Le tarif est de 65€ la seance..."
related: ["psychologue-anxiete-nancy", "psychologue-tcc-nancy"]
---
```

Le contenu textuel reste identique (pas de perte SEO). Les citations deviennent des composants Markdown custom.

## Donnees praticienne (inchangees)

- Nom : Claire Clavel
- Titre : Psychologue Clinicienne
- ADELI : 54 94 1743 0
- Adresse : 2 Rue Emmanuel Here, 54280 Seichamps
- Tel : 06 10 50 17 18
- Email : claire.clavel.psy@gmail.com
- Horaires : Lun-Ven 9h-17h30
- Doctolib : lien existant conserve
- Tarif : 65€/seance (50 min) — Hypnose : 70€/seance (60 min)

## Dependances Astro

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/vercel": "^8.x",
    "@astrojs/sitemap": "^4.x",
    "@vercel/analytics": "^1.x"
  }
}
```

Pas d'autres dependances. Zero framework JS client (pas de React/Vue/Svelte).

## Vercel config

```json
{
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    { "source": "/fonts/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}] },
    { "source": "/images/(.*)", "headers": [{"key": "Cache-Control", "value": "public, max-age=31536000, immutable"}] },
    { "source": "/(.*)", "headers": [
      {"key": "X-Content-Type-Options", "value": "nosniff"},
      {"key": "X-Frame-Options", "value": "DENY"},
      {"key": "Referrer-Policy", "value": "strict-origin-when-cross-origin"}
    ]}
  ]
}
```

## Migration steps

1. Creer le projet Astro dans un nouveau dossier (ou branche)
2. Copier public/ (fonts, images, robots.txt, llms.txt, favicon)
3. Supprimer l'ancien sitemap.xml (genere automatiquement par @astrojs/sitemap)
4. Migrer chaque article HTML → Markdown avec frontmatter
5. Implementer composants, layout, pages
6. Verifier toutes les URLs avec un crawl local
7. Deploy sur Vercel, verifier redirects claire-clavel.fr → claire-clavel-psychologue.fr

## Hors scope (pour plus tard)

- Photos de Claire Clavel (pas encore disponibles)
- Nouveaux articles (traumatisme, adolescent, Mon Soutien Psy)
- Inscriptions annuaires externes
- Backlinks partenaires
