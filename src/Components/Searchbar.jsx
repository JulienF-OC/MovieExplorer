import "./Searchbar.scss";
import {Search} from "lucide-react";
import { useState } from "react";


const Searchbar = () => {
 
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

          <button type="submit" className="search-btn">
            Rechercher
          </button>
          </div>

        </form>
      </div>

    </section>
  );
};

export default Searchbar