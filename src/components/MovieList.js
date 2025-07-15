import React from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import "../App.css";

const MovieList = ({ movies }) => {
  const navigate = useNavigate();
  return (
    <div className="movie-list">
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))
      )}
    </div>
  );
};

export default MovieList; 