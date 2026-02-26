import "./Searchbar.scss";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const Searchbar = ({ onResults, resetQuery }) => { 
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setQuery("");
    setError(null);
  }, [resetQuery]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        onResults(data.Search);
      } else {
        setError(data.Error);
        onResults([]);
      }
    } catch (err) {
      setError("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Searchbar-movies">
      <div className="Searchbar">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-wrapper">
            <label htmlFor="search" className="search-icon">
              <Search />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Rechercher un film..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn" disabled={loading}>
              {loading ? "..." : "Rechercher"}
            </button>
          </div>
        </form>
        {error && <p className="search-error">{error}</p>}
      </div>
    </section>
  );
};

export default Searchbar;