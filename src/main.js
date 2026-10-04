import './main.scss';
import catalog from './data/movies.json';

const searchInput = document.querySelector('#catalog-search');
const searchStatus = document.querySelector('.search-status');
const movieCards = [...document.querySelectorAll('.catalog-card')];
const movieButtons = document.querySelectorAll('[data-movie]');
const moviesBySlug = new Map(catalog.movies.map((movie) => [movie.slug, movie]));

const movieDialog = document.querySelector('.movie-dialog');
const dialogTitle = movieDialog.querySelector('#movie-title');
const dialogMetadata = movieDialog.querySelector('.movie-dialog__meta');
const dialogOverview = movieDialog.querySelector('.movie-dialog__overview');
const dialogCloseButton = movieDialog.querySelector('.movie-dialog__close');

function normalizeSearch(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function filterMovies() {
  const query = normalizeSearch(searchInput.value.trim());
  let matchCount = 0;

  movieCards.forEach((card) => {
    const title = normalizeSearch(card.dataset.title);
    card.hidden = !title.includes(query);

    if (!card.hidden) {
      matchCount += 1;
    }
  });

  searchStatus.textContent = query ? `${matchCount} resultados en las categorías.` : '';
}

function formatMovieMetadata(movie) {
  return [
    movie.year,
    movie.runtime ? `${movie.runtime} min` : null,
    movie.genres?.join(' · '),
    movie.rating ? `TMDB: ${movie.rating.toFixed(1)}/10` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

function openMovieDetails(slug) {
  const movie = moviesBySlug.get(slug);

  dialogTitle.textContent = movie.title;
  dialogMetadata.textContent = formatMovieMetadata(movie);
  dialogOverview.textContent = movie.overview || 'Sinopsis no disponible.';

  movieDialog.showModal();
}

function closeOnBackdropClick(event) {
  const bounds = movieDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < bounds.left ||
    event.clientX > bounds.right ||
    event.clientY < bounds.top ||
    event.clientY > bounds.bottom;

  if (event.target === movieDialog && clickedOutside) {
    movieDialog.close();
  }
}

function replaceMissingArtwork(image) {
  const movieButton = image.closest('[data-movie]');

  if (!movieButton) {
    return;
  }

  const movie = moviesBySlug.get(movieButton.dataset.movie);
  const fallback = document.createElement('span');

  fallback.className = `${image.className} artwork-placeholder`;
  fallback.textContent = movie.title;
  image.replaceWith(fallback);
}

searchInput.addEventListener('input', filterMovies);
dialogCloseButton.addEventListener('click', () => movieDialog.close());
movieDialog.addEventListener('click', closeOnBackdropClick);

movieButtons.forEach((button) => {
  button.addEventListener('click', () => openMovieDetails(button.dataset.movie));
});

document.querySelectorAll('.movie-button img').forEach((image) => {
  image.addEventListener('error', () => replaceMissingArtwork(image), { once: true });
});
