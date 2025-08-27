import React, { useEffect, useState } from "react";
import axios from "axios";

const fallbackPoster = "https://via.placeholder.com/200x300.png?text=No+Image";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

// Check if YouTube API key is configured
if (!YOUTUBE_API_KEY) {
  console.error("YouTube API key is not configured. Please set REACT_APP_YOUTUBE_API_KEY in your .env file.");
}

function getValidPoster(movie) {
  if (movie.poster_path) return TMDB_IMAGE_BASE + movie.poster_path;
  if (movie.Poster && movie.Poster !== "N/A") return movie.Poster;
  if (movie.poster && movie.poster !== "N/A") return movie.poster;
  return fallbackPoster;
}

const MovieDetails = ({ movie }) => {
  const poster = getValidPoster(movie);
  const title = movie.title || movie.original_title || movie.name;
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const plot = movie.overview || movie.Plot || movie.description;
  const genres = movie.genres ? movie.genres.map(g => g.name).join(", ") : null;
  // Director and cast from credits if available
  let director = null;
  let actors = null;
  if (movie.credits) {
    const crew = movie.credits.crew || [];
    director = crew.find((c) => c.job === "Director");
    const cast = movie.credits.cast || [];
    actors = cast.slice(0, 5).map(a => a.name).join(", ");
  }

  // State for YouTube trailer
  const [trailerId, setTrailerId] = useState(null);
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState("");

  useEffect(() => {
    if (!title || !year) return;
    setTrailerLoading(true);
    setTrailerError("");
    setTrailerId(null);
    const query = encodeURIComponent(`${title} ${year} Official Trailer`);
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${YOUTUBE_API_KEY}`
      )
      .then((res) => {
        if (
          res.data.items &&
          res.data.items.length > 0 &&
          res.data.items[0].id.kind === "youtube#video"
        ) {
          setTrailerId(res.data.items[0].id.videoId);
        } else {
          setTrailerError("No trailer found.");
        }
        setTrailerLoading(false);
      })
      .catch(() => {
        setTrailerError("Failed to fetch trailer.");
        setTrailerLoading(false);
      });
  }, [title, year]);

  return (
    <>
      <img
        src={poster}
        alt={title}
        className="details-poster"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackPoster;
        }}
      />
      <div className="details-title">{title}</div>
      <div className="details-year">{year}</div>
      {genres && <div style={{ color: "#0ff", marginBottom: 8 }}>Genre: {genres}</div>}
      {director && <div style={{ color: "#0ff", marginBottom: 8 }}>Director: {director.name}</div>}
      {actors && <div style={{ color: "#0ff", marginBottom: 8 }}>Actors: {actors}</div>}
      <div className="details-description">{plot}</div>
      <div className="details-trailer">
        {trailerLoading && <div>Loading trailer...</div>}
        {trailerId && (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerId}`}
            title="YouTube trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              minHeight: '300px',
              maxHeight: '500px',
              aspectRatio: '16/9'
            }}
          ></iframe>
        )}
        {trailerError && <div style={{ color: "#ff5252" }}>{trailerError}</div>}
      </div>
    </>
  );
};

export default MovieDetails; 