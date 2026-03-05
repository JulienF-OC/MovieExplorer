import "./Navbar.scss";

const Navbar = ({ user, favoritesCount, onFavoritesClick, onLoginClick, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar__left" />
      <div className="navbar__actions">
        <button className="navbar__favorites" onClick={onFavoritesClick}>
          ❤️ Mes favoris
          {user && favoritesCount > 0 && (
            <span className="navbar__badge">{favoritesCount}</span>
          )}
        </button>
        {user ? (
          <button className="navbar__auth" onClick={onLogout}>
            Déconnexion
          </button>
        ) : (
          <button className="navbar__auth navbar__auth--login" onClick={onLoginClick}>
            Connexion
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;