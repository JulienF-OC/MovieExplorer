import { useEffect } from "react";
import "./MovieModal.scss";

const MovieModal = ({ movie, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!movie) return null;

  const stars = Math.round(parseFloat(movie.imdbRating) / 2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>

        <div className="modal__left">
          <img
            className="modal__poster"
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"}
            alt={movie.Title}
          />
        </div>

        <div className="modal__right">
          <div className="modal__genres">
            {movie.Genre?.split(", ").map((g) => (
              <span key={g} className="modal__genre">{g}</span>
            ))}
          </div>

          <h2 className="modal__title">{movie.Title}</h2>
          <p className="modal__meta">{movie.Year} · {movie.Runtime} · {movie.Language?.split(",")[0]}</p>

          {movie.imdbRating && movie.imdbRating !== "N/A" && (
            <div className="modal__rating">
              <div className="modal__stars">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={`modal__star ${s <= stars ? "modal__star--filled" : ""}`} viewBox="0 0 24 24">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="modal__rating-value">{movie.imdbRating}/10</span>
            </div>
          )}

          <p className="modal__section-label">Synopsis</p>
          <p className="modal__plot">{movie.Plot !== "N/A" ? movie.Plot : "Aucun synopsis disponible."}</p>

          <div className="modal__details">
            {movie.Director && movie.Director !== "N/A" && (
              <div className="modal__detail">
                <span className="modal__detail-label">Réalisateur</span>
                <span className="modal__detail-value">{movie.Director}</span>
              </div>
            )}
            {movie.Actors && movie.Actors !== "N/A" && (
              <div className="modal__detail">
                <span className="modal__detail-label">Acteurs</span>
                <span className="modal__detail-value">{movie.Actors}</span>
              </div>
            )}
            {movie.Awards && movie.Awards !== "N/A" && (
              <div className="modal__detail">
                <span className="modal__detail-label">Récompenses</span>
                <span className="modal__detail-value">{movie.Awards}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;