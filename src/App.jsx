import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Title from "./Components/Title";
import Searchbar from "./Components/Searchbar";
import MovieCard from "./Components/MovieCard";
import MovieModal from "./Components/MovieModal";
import FavoritesPage from "./Components/FavoritesPage";
import AuthModal from "./Components/AuthModal";
import { useFavorites } from "./hooks/useFavorites";
import { useAuth } from "./hooks/useAuth";
import "./App.scss";

function App() {
  const [movies, setMovies] = useState([]);
  const [popular, setPopular] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [reset, setReset] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, loading, logout } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites(user);

  useEffect(() => {
    const fetchPopular = async () => {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const ids = [
        "tt15239678", "tt0816692", "tt0499549",
        "tt5950044", "tt0083866", "tt11655566",
      ];
      const results = await Promise.all(
        ids.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`).then((res) => res.json())
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
    setShowFavorites(false);
    setReset((prev) => !prev);
  };

  const handleCardClick = async (movie) => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
      const data = await res.json();
      setSelectedMovie(data);
    } catch {
      setSelectedMovie(movie);
    }
  };

  const handleFavoritesClick = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowFavorites(true);
    }
  };

  if (loading) return null;

  return (
    <>
      <Navbar
        user={user}
        favoritesCount={favorites.length}
        onFavoritesClick={handleFavoritesClick}
        onLoginClick={() => setShowAuthModal(true)}
        onLogout={logout}
        onReset={handleReset}
      />

      {showFavorites ? (
        <FavoritesPage
          favorites={favorites}
          onMovieClick={handleCardClick}
          onBack={() => setShowFavorites(false)}
        />
      ) : (
        <>
          <section className="hero">
            <Title />
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
                    onToggleFavorite={user ? toggleFavorite : () => setShowAuthModal(true)}
                    isFavorite={isFavorite(movie.imdbID)}
                  />
                ))}
              </div>
            </section>
          )}

          {!hasSearched && (
            <section className="popular-section">
              <h2 className="section-title">Films Populaires</h2>
              <div className="popular-grid">
                {popular.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    popular
                    onClick={() => handleCardClick(movie)}
                    onToggleFavorite={user ? toggleFavorite : () => setShowAuthModal(true)}
                    isFavorite={isFavorite(movie.imdbID)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}

export default App;