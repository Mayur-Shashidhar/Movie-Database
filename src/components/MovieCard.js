import React from "react";

const fallbackPoster = "https://via.placeholder.com/200x300.png?text=No+Image";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function getValidPoster(movie) {
  if (movie.poster_path) return TMDB_IMAGE_BASE + movie.poster_path;
  if (movie.Poster && movie.Poster !== "N/A") return movie.Poster;
  if (movie.poster && movie.poster !== "N/A") return movie.poster;
  return fallbackPoster;
}

const MovieCard = ({ movie, onClick }) => (
  <div className="movie-card" onClick={onClick} style={{ cursor: "pointer" }}>
    <img
      src={getValidPoster(movie)}
      alt={movie.title || movie.original_title || movie.name}
      className="movie-poster"
      onError={e => { e.target.onerror = null; e.target.src = fallbackPoster; }}
    />
    <div className="movie-info">
      <div className="movie-title">{movie.title || movie.original_title || movie.name}</div>
      <div className="movie-year">{(movie.release_date || movie.first_air_date || "").slice(0, 4)}</div>
    </div>
  </div>
);

export default MovieCard; 