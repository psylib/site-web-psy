# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static website for Claire Clavel, psychologue clinicienne, based in Seichamps (54280), near Nancy. No build step, no framework — pure HTML/CSS/JS deployed on Vercel. All content is in French.

## Files

- `index.html` — single-page site with all sections inline
- `styles.css` — all styles (versioned via `?v=N` query param on the `<link>` tag — increment when deploying CSS changes)
- `mentions-legales.html` / `confidentialite.html` — standalone legal pages sharing the same stylesheet
- `images/` — `.webp` photos of the cabinet + SVG/PNG logos

## Architecture

The site is a single HTML file. All JavaScript lives in an inline `<script>` at the bottom of `index.html` and handles:
- FAQ accordion (one open at a time, `aria-expanded` toggled)
- Mobile nav toggle
- Contact form: client-side validation then `fetch` POST to Formspree (`https://formspree.io/f/xreaooqy`), replaces form HTML with a success message on 2xx
- Smooth scroll + focus management for anchor links

CSS uses custom properties defined in `:root` for the full palette, type scale, and spacing scale. No utility framework.

## Design tokens (do not change without reason)

| Token | Value |
|---|---|
| `--clr-primary` | `#4a7c6f` (green) |
| `--clr-accent` | `#c9a96e` (gold) |
| `--clr-bg` | `#fafaf8` |
| `--font-serif` | Playfair Display |
| `--font-sans` | Inter |

## Key practitioner data (factual — do not invent or modify)

- Name: Claire Clavel
- Title: Psychologue Clinicienne
- ADELI: 54 94 1743 0
- Address: 2 Rue Emmanuel Héré, 54280 Seichamps
- Phone: 06 10 50 17 18
- Email: claire.clavel.psy@gmail.com
- Booking: Doctolib link in header and hero CTAs
- Hours: Lun–Ven 9h–17h30
- GPS: latitude 48.7147, longitude 6.2604

## SEO / structured data

- JSON-LD (`MedicalBusiness` schema) is inline in `<head>` of `index.html`
- Canonical URL: `https://www.claire-clavel-psychologue.fr/`
- OG + Twitter Card meta tags present
- Legal pages use `noindex`
- Vercel Analytics injected via `/_vercel/insights/script.js` (defer, no config needed)

## Conventions

- Language: French throughout (UI, copy, error messages, commit messages are fine in French or English)
- Images: use `.webp` and set `width`/`height` attributes; use `loading="lazy"` except for above-the-fold hero image
- Accessibility: keep skip link, `aria-label`s, `aria-expanded` on interactive disclosure widgets, `role="alert"` on dynamic error/success messages
