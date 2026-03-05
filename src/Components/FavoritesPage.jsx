import MovieCard from "./MovieCard";
import "./FavoritesPage.scss";

const FavoritesPage = ({ favorites, onMovieClick, onBack }) => {
  return (
    <div className="favorites-page">
      <div className="favorites-page__header">
        <button className="favorites-page__back" onClick={onBack}>
          ← Retour
        </button>
        <h2 className="favorites-page__title">Mes Favoris</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="favorites-page__empty">
          <p>Aucun favori pour l'instant.</p>
          <p>Clique sur ❤️ sur un film pour l'ajouter !</p>
        </div>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => onMovieClick(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;