import { useState } from "react";
import Title from "./Components/Title";
import Searchbar from "./Components/Searchbar";
import MovieCard from "./Components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);

  return (
    <>
      <Title />
      <Searchbar onResults={setMovies} />

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </>
  );
}

export default App;