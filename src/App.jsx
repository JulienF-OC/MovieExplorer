import { useState, useEffect } from "react";
import Title from "./Components/Title";
import Searchbar from "./Components/Searchbar";
import MovieCard from "./Components/MovieCard";
import MovieModal from "./Components/MovieModal";
import "./App.scss";

function App() {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [reset, setReset] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const ids = [
        "tt15239678",
        "tt0816692",
        "tt0499549",
        "tt5950044",
        "tt0083866",
        "tt11655566",
      ];

      const results = await Promise.all(
        ids.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
            .then((res) => res.json())
        )
      );

      setPopular(results);
    };

    fetchPopular();
  }, []);

  const handleResults = (results) => {
    setMovies(results);
    setHasSearched(true);
  };

  const handleReset = () => {
    setMovies([]);
    setHasSearched(false);
    setReset((prev) => !prev);
  };

  // Récupère les détails complets du film via l'API (pour avoir Plot, Director, etc.)
  const handleCardClick = async (movie) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch {
      setSelectedMovie(movie); // fallback sur les données déjà disponibles
    }
  };

  return (
    <>
      <section className="hero">
        <Title onReset={handleReset} />
        <Searchbar onResults={handleResults} resetQuery={reset} />
      </section>

      {hasSearched && (
        <section className="results-section">
          <h2 className="section-title">Résultats</h2>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={() => handleCardClick(movie)}
              />
            ))}
          </div>
        </section>
      )}

      {!hasSearched && (
        <section className="popular-section">
          <h2 className="section-title">
            Films Populaires
          </h2>
          <div className="popular-grid">
            {popular.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                popular
                onClick={() => handleCardClick(movie)}
              />
            ))}
          </div>
        </section>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;