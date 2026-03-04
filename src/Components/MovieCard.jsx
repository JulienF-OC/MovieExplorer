import "./MovieCard.scss";

const MovieCard = ({ movie, popular, onClick }) => {
  if (popular) {
    return (
      <div
        className="movie-card--popular"
        onClick={onClick}
        style={{
          backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"})`,
        }}
      >
        <div className="movie-card--popular__overlay">
          <h3 className="movie-card--popular__title">{movie.Title}</h3>
          <p className="movie-card--popular__year">{movie.Year}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card" onClick={onClick}>
      <img
        className="movie-card__poster"
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
        alt={movie.Title}
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.Title}</h3>
        <p className="movie-card__year">{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;