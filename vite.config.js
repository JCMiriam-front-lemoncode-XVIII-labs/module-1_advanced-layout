import { defineConfig } from 'vite';
import nunjucks from 'vite-plugin-nunjucks';
import path from 'path';
import fs from 'node:fs';

const catalog = JSON.parse(
  fs.readFileSync(new URL('./src/data/movies.json', import.meta.url), 'utf8'),
);
const bySlug = new Map(catalog.movies.map((movie) => [movie.slug, movie]));
const movieCatalog = {
  ...catalog,
  popular: catalog.popular.map((slug) => bySlug.get(slug)),
  categories: catalog.categories.map((category) => ({
    ...category,
    movies: category.movies.map((slug) => bySlug.get(slug)),
  })),
};

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    nunjucks({
      input: 'index.html',
      variables: { 'index.html': { movieCatalog } },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
