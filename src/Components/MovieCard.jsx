import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
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