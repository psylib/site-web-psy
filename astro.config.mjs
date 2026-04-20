import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.claire-clavel-psychologue.fr',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('mentions-legales') &&
        !page.includes('confidentialite') &&
        !page.includes('merci') &&
        !page.includes('404'),
    }),
  ],
});
