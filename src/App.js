import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import AddMovieForm from "./components/AddMovieForm";
import SearchBar from "./components/SearchBar";
import "./App.css";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Check if TMDb API key is configured
if (!TMDB_API_KEY) {
  console.error("TMDb API key is not configured. Please set REACT_APP_TMDB_API_KEY in your .env file.");
}

function Home({ movies, onSearch, onHomeSearchReset, page, totalPages, onPageChange, onAddMovie }) {
  const navigate = useNavigate();
  const handleHome = () => {
    onHomeSearchReset("Avengers");
    navigate("/");
  };
  return (
    <div>
      <h1>🎬 Movie Database</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 32 }}>
        <SearchBar onSearch={onSearch} />
        <button
          onClick={handleHome}
          style={{
            padding: '0.6rem 1.3rem',
            background: 'linear-gradient(90deg, #00ffe7 0%, #0ff 100%)',
            color: '#222',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontWeight: 700,
            fontFamily: 'inherit',
            boxShadow: '0 0 8px #00ffe7cc',
            transition: 'background 0.2s, color 0.2s',
            fontSize: '1rem',
          }}
        >
          🏠 Home
        </button>
      </div>
      <AddMovieForm onAddMovie={onAddMovie} />
      <div className="main-content">
        <MovieList movies={movies} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 16 }}>
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          style={{ padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', background: '#00ffe7', color: '#222', fontWeight: 700, cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1 }}
        >
          Previous
        </button>
        <span style={{ color: '#00ffe7', fontWeight: 700, fontSize: '1.1rem', alignSelf: 'center' }}>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          style={{ padding: '0.5rem 1.2rem', borderRadius: 6, border: 'none', background: '#00ffe7', color: '#222', fontWeight: 700, cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [customMovies, setCustomMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Avengers");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch movies from TMDb API
  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    setError("");
    axios
      .get(`${TMDB_BASE_URL}/search/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          query: searchTerm,
          page: page,
        },
      })
      .then((res) => {
        setMovies(res.data.results || []);
        setTotalPages(res.data.total_pages || 1);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movies.");
        setLoading(false);
      });
  }, [searchTerm, page]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  // Reset to page 1 on new search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  // Handle adding custom movies
  const handleAddMovie = (newMovie) => {
    // Convert the form data to match the expected movie structure
    const formattedMovie = {
      id: newMovie.id,
      title: newMovie.title,
      release_date: `${newMovie.year}-01-01`,
      overview: newMovie.description,
      poster_path: newMovie.poster.startsWith('http') ? null : newMovie.poster, // If it's a full URL, we'll handle it differently
      Poster: newMovie.poster.startsWith('http') ? newMovie.poster : null, // Store full URLs here
      isCustom: true // Flag to identify custom movies
    };
    setCustomMovies(prev => [formattedMovie, ...prev]);
  };

  // Combine API movies with custom movies for display
  const allMovies = [...customMovies, ...movies];

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              movies={allMovies}
              onSearch={handleSearch}
              searchTerm={searchTerm}
              onHomeSearchReset={handleSearch}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              onAddMovie={handleAddMovie}
            />
          }
        />
        <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
      </Routes>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </Router>
  );
}

function MovieDetailsPage() {
  const navigate = useNavigate();
  const movieId = window.location.pathname.split("/").pop();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`${TMDB_BASE_URL}/movie/${movieId}`, {
        params: {
          api_key: TMDB_API_KEY,
          append_to_response: "credits",
        },
      })
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch movie details.");
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return null;

  return (
    <div className="details-panel">
      <button onClick={() => navigate("/")} style={{ marginBottom: 16, background: "#00ffe7", color: "#222", border: "none", borderRadius: 6, padding: "0.5rem 1.2rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 8px #00ffe7cc" }}>🏠 Home</button>
      <MovieDetails movie={movie} />
    </div>
  );
}

export default App;
