import "./MovieCard.scss";

const MovieCard = ({ movie, popular }) => {
  if (popular) {
    return (
      // card paysage avec image en fond
      <div
        className="movie-card--popular"
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
    <div className="movie-card">
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